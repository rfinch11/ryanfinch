#!/usr/bin/env node
/**
 * token-audit.js — Design token compliance checker
 *
 * Scans all CSS and TSX/TS files for hardcoded visual values that should
 * instead reference --token-* CSS custom properties or Tailwind semantic classes.
 *
 * ERRORS (exit code 1):
 *   - Hardcoded hex colours (#rrggbb, #rgb)
 *   - Hardcoded rgb() / rgba() colours
 *   - Hardcoded oklch() colours (outside globals.css and tokens.css)
 *   - Hardcoded hsl() / hsla() colours (outside Tailwind shadow tricks)
 *
 * WARNINGS (printed but do not affect exit code):
 *   - Raw px font sizes used outside Tailwind config
 *   - Hardcoded box-shadow values (not referencing --border or --token-*)
 *   - Hardcoded transition durations in ms or s (outside motion tokens)
 *   - z-index values not in the approved token scale [0, 1, 10, 50, 200]
 *   - text-[<size>] arbitrary values that are not the approved 10px badge exception
 *
 * ALLOWED (not flagged):
 *   - Viewport constraints: max-h-[90vh], max-h-[70vh], max-h-[70vh]
 *   - Grid template definitions: grid-cols-[240px_1fr]
 *   - Inherited Radix UI CSS vars: h-[var(--radix-*)]
 *   - Geometric offsets: top-[1px], top-[60%]
 *   - min-w-[1.75rem], min-w-[1.25rem] (kbd key minimum widths)
 *   - rounded-[inherit] (ScrollArea viewport inheriting radius)
 *   - shadow-[0_*_0_0_hsl(var(--border))] (pressed key effect — uses token)
 *   - focus-visible:ring-[3px], focus-visible:outline-1 (Radix focus pattern)
 *   - Opacity modifiers on token colours: /30, /50, /60, /80
 *   - globals.css and tokens.css (source of truth — excluded from scan)
 *
 * Usage:
 *   node scripts/token-audit.js [--fix-report] [--no-warnings] [path...]
 *
 *   --fix-report   Print suggested token replacements
 *   --no-warnings  Suppress warnings, only show errors
 *   path...        Specific files or directories to scan (default: app/ components/)
 *
 * Exit codes:
 *   0 — No errors found (warnings may be present)
 *   1 — One or more errors found
 */

import { readFileSync, readdirSync, statSync, existsSync } from "fs";
import { join, extname, relative, resolve } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, "..");

// ─── Configuration ──────────────────────────────────────────────────────────

const SCAN_EXTENSIONS = new Set([".tsx", ".ts", ".css", ".scss"]);

// Files that are excluded from scanning (source of truth)
const EXCLUDED_FILES = new Set([
  "tokens.css",
  "globals.css",
  "node_modules",
  ".next",
  "dist",
]);

// Approved z-index values (matches --token-z-* scale)
const APPROVED_Z_INDEX = new Set([0, 1, 10, 50, 200]);

// ─── Rule definitions ────────────────────────────────────────────────────────

const RULES = [
  // ── ERRORS ──────────────────────────────────────────────────────────────

  {
    id: "no-hex-color",
    level: "error",
    description: "Hardcoded hex colour",
    pattern: /#([0-9a-fA-F]{3,8})\b(?!\s*[;,)])/g,
    // Allow #rrggbb inside hsl() for legacy shadow tricks handled by separate rule
    filter: (match, line) => {
      // Skip if inside shadow-[..._hsl(var(...))] patterns (token-based)
      if (line.includes("hsl(var(--")) return false;
      return true;
    },
    suggest: (match) => `Use --token-* CSS variable or a Tailwind semantic color class instead of ${match[0]}`,
  },

  {
    id: "no-rgb-color",
    level: "error",
    description: "Hardcoded rgb/rgba colour",
    pattern: /\brgba?\s*\(\s*\d/g,
    filter: () => true,
    suggest: () => "Use --token-* CSS variable or bg-*/text-* Tailwind class with opacity modifier",
  },

  {
    id: "no-raw-oklch",
    level: "error",
    description: "Hardcoded oklch() colour (outside globals.css/tokens.css)",
    pattern: /\boklch\s*\(/g,
    filter: () => true,
    suggest: () => "Reference a --token-* variable or a Tailwind semantic class instead",
  },

  {
    id: "no-raw-hsl",
    level: "error",
    description: "Hardcoded hsl/hsla colour",
    // Allow hsl(var(--...)) which is a CSS variable reference (token-based)
    pattern: /\bhsla?\s*\(\s*(?!\s*var\s*\()/g,
    filter: () => true,
    suggest: () => "Use a CSS variable: hsl(var(--token-*)) or a Tailwind color class",
  },

  // ── WARNINGS ─────────────────────────────────────────────────────────────

  {
    id: "no-raw-font-size-px",
    level: "warning",
    description: "Raw px font size (outside text-[10px] badge exception)",
    pattern: /\bfont-size\s*:\s*\d+px/g,
    filter: () => true,
    suggest: () => "Use a text-* utility class from the type scale (text-copy-*, text-heading-*, text-label-*)",
  },

  {
    id: "no-raw-text-arbitrary-px",
    level: "warning",
    description: "Arbitrary text-[<px>] value other than approved text-[10px]",
    // Match text-[Xpx] or text-[X.Xpx] but NOT text-[10px] (badge exception)
    pattern: /\btext-\[(?!10px\b)(\d+(?:\.\d+)?px)\]/g,
    filter: () => true,
    suggest: (match) => `text-[${match[1]}] — use a text-* scale utility. If 10px is needed, text-[10px] is the only approved exception (badge only).`,
  },

  {
    id: "no-hardcoded-shadow",
    level: "warning",
    description: "Potentially hardcoded box-shadow (not referencing a design token)",
    // Match shadow-[...] patterns; filter out those that reference CSS vars (token-based)
    pattern: /\bshadow-\[[^\]]+\]/g,
    filter: (match) => {
      const value = match[0];
      // Allow if it references a CSS variable (var(--...)) — token-based
      if (value.includes("var(--")) return false;
      // Allow named Tailwind shadows (shadow-sm, shadow-md, etc.) — not arbitrary
      return true;
    },
    suggest: () => "Use a Tailwind shadow utility (shadow-sm, shadow-md, shadow-lg, shadow-2xl) or shadow-[0_2px_0_0_hsl(var(--border))] for the key effect",
  },

  {
    id: "no-raw-duration",
    level: "warning",
    description: "Hardcoded transition duration not from approved scale (150ms/200ms/300ms)",
    // Match duration-NNN where NNN is not in the approved set
    pattern: /\bduration-(\d+)\b/g,
    filter: (match) => {
      const approved = new Set(["150", "200", "300"]);
      return !approved.has(match[1]);
    },
    suggest: (match) => `duration-${match[1]} — use duration-150 (fast), duration-200 (normal), or duration-300 (slow)`,
  },

  {
    id: "no-unapproved-z-index",
    level: "warning",
    description: "Z-index value not in approved token scale [0, 1, 10, 50, 200]",
    // Match z-[NNN] arbitrary z-index values
    pattern: /\bz-\[(\d+)\]/g,
    filter: (match) => !APPROVED_Z_INDEX.has(Number(match[1])),
    suggest: (match) => `z-[${match[1]}] — approved z-index values are: 0 (base), 1 (indicator), 10 (raised), 50 (dropdown), 200 (overlay)`,
  },

  {
    id: "no-raw-inline-style-color",
    level: "warning",
    description: "Inline style with potentially hardcoded colour",
    // Match style={{ color: "..." }} or style={{ backgroundColor: "..." }} with raw values
    pattern: /style=\{\{[^}]*(?:color|background(?:Color)?|borderColor)\s*:\s*["'](?!var\()[^"']+["']/g,
    filter: () => true,
    suggest: () => "Move colour values to a CSS class referencing --token-* variables",
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function isExcluded(filePath) {
  const parts = filePath.split("/");
  return parts.some((part) => EXCLUDED_FILES.has(part));
}

function getFiles(targetPaths, extensions) {
  const files = [];

  function walk(dir) {
    if (!existsSync(dir)) return;
    const entries = readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = join(dir, entry.name);
      if (isExcluded(full)) continue;
      if (entry.isDirectory()) {
        walk(full);
      } else if (extensions.has(extname(entry.name))) {
        files.push(full);
      }
    }
  }

  for (const target of targetPaths) {
    const full = resolve(ROOT, target);
    if (!existsSync(full)) {
      console.warn(`  WARNING: Path not found: ${target}`);
      continue;
    }
    const stat = statSync(full);
    if (stat.isDirectory()) {
      walk(full);
    } else if (extensions.has(extname(full))) {
      if (!isExcluded(full)) files.push(full);
    }
  }

  return files;
}

function scanFile(filePath, rules, showWarnings) {
  const content = readFileSync(filePath, "utf8");
  const lines = content.split("\n");
  const findings = [];

  for (const rule of rules) {
    if (!showWarnings && rule.level === "warning") continue;

    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
      const line = lines[lineIndex];
      const lineNum = lineIndex + 1;

      // Skip comment lines
      const trimmed = line.trim();
      if (trimmed.startsWith("//") || trimmed.startsWith("*") || trimmed.startsWith("/*")) {
        continue;
      }

      // Reset lastIndex for global regexes
      rule.pattern.lastIndex = 0;

      let match;
      while ((match = rule.pattern.exec(line)) !== null) {
        // Apply optional filter
        if (rule.filter && !rule.filter(match, line)) continue;

        const suggestion = rule.suggest ? rule.suggest(match) : null;

        findings.push({
          level: rule.level,
          ruleId: rule.id,
          description: rule.description,
          file: filePath,
          line: lineNum,
          col: match.index + 1,
          excerpt: line.trim().slice(0, 120),
          match: match[0],
          suggestion,
        });
      }

      // Reset for next line
      rule.pattern.lastIndex = 0;
    }
  }

  return findings;
}

// ─── Reporter ─────────────────────────────────────────────────────────────────

function report(findings, showSuggestions, rootDir) {
  if (findings.length === 0) {
    console.log("\n  No violations found.\n");
    return;
  }

  const errors = findings.filter((f) => f.level === "error");
  const warnings = findings.filter((f) => f.level === "warning");

  const byFile = {};
  for (const f of findings) {
    const rel = relative(rootDir, f.file);
    if (!byFile[rel]) byFile[rel] = [];
    byFile[rel].push(f);
  }

  // Sort files by error count descending
  const sortedFiles = Object.entries(byFile).sort(([, a], [, b]) => {
    const aErrors = a.filter((x) => x.level === "error").length;
    const bErrors = b.filter((x) => x.level === "error").length;
    return bErrors - aErrors;
  });

  console.log("");

  for (const [relPath, fileFndings] of sortedFiles) {
    const fileErrors = fileFndings.filter((f) => f.level === "error").length;
    const fileWarnings = fileFndings.filter((f) => f.level === "warning").length;
    const label = [
      fileErrors > 0 ? `${fileErrors} error${fileErrors > 1 ? "s" : ""}` : "",
      fileWarnings > 0 ? `${fileWarnings} warning${fileWarnings > 1 ? "s" : ""}` : "",
    ]
      .filter(Boolean)
      .join(", ");

    console.log(`  ${relPath}  [${label}]`);

    for (const f of fileFndings.sort((a, b) => a.line - b.line)) {
      const levelTag = f.level === "error" ? "ERROR  " : "WARN   ";
      console.log(`    ${levelTag} line ${String(f.line).padEnd(4)}  ${f.description}`);
      console.log(`           ${f.excerpt}`);
      if (showSuggestions && f.suggestion) {
        console.log(`    SUGGEST: ${f.suggestion}`);
      }
    }

    console.log("");
  }

  // Summary
  console.log(
    `  Summary: ${errors.length} error${errors.length !== 1 ? "s" : ""}, ${warnings.length} warning${warnings.length !== 1 ? "s" : ""} across ${sortedFiles.length} file${sortedFiles.length !== 1 ? "s" : ""}`
  );
  console.log("");

  // Hotspot table
  if (sortedFiles.length > 1) {
    console.log("  Hotspots (most violations):");
    for (const [relPath, fileFndings] of sortedFiles.slice(0, 5)) {
      const e = fileFndings.filter((f) => f.level === "error").length;
      const w = fileFndings.filter((f) => f.level === "warning").length;
      console.log(`    ${String(e + w).padStart(3)}  ${relPath}  (${e}E / ${w}W)`);
    }
    console.log("");
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function main() {
  const args = process.argv.slice(2);
  const showSuggestions = args.includes("--fix-report");
  const noWarnings = args.includes("--no-warnings");
  const pathArgs = args.filter((a) => !a.startsWith("--"));

  // Default scan targets
  const targets =
    pathArgs.length > 0
      ? pathArgs
      : ["app", "components"];

  console.log(`\n  token-audit — scanning: ${targets.join(", ")}`);
  console.log(`  Mode: ${noWarnings ? "errors only" : "errors + warnings"}${showSuggestions ? " + suggestions" : ""}\n`);

  const files = getFiles(targets, SCAN_EXTENSIONS);
  console.log(`  Found ${files.length} file${files.length !== 1 ? "s" : ""} to scan...`);

  const allFindings = [];
  for (const file of files) {
    const findings = scanFile(file, RULES, !noWarnings);
    allFindings.push(...findings);
  }

  report(allFindings, showSuggestions, ROOT);

  const errorCount = allFindings.filter((f) => f.level === "error").length;
  if (errorCount > 0) {
    console.log(`  FAILED: ${errorCount} error${errorCount > 1 ? "s" : ""} found. Fix before merging.\n`);
    process.exit(1);
  } else {
    console.log("  PASSED: No errors found.\n");
    process.exit(0);
  }
}

main();
