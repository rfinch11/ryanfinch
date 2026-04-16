# Color Foundation

## Overview

The site uses a four-theme system: `light`, `dark`, `warm-light` (default), and `warm-dark`. All colours are expressed in OKLCH — a perceptually uniform colour space that guarantees consistent contrast ratios across themes.

Colours are defined in three places:

1. **`app/globals.css`** — raw OKLCH values assigned to shadcn/ui CSS custom properties per theme class (`:root`, `.dark`, `.warm-light`, `.warm-dark`).
2. **`tokens.css` Layer 1** — named primitive aliases (`--prim-*`) that document every raw value.
3. **`tokens.css` Layer 2** — semantic aliases (`--token-*`) that components consume.

## Theme system

| Class applied to `<html>` | Description |
|---|---|
| *(none / :root)* | Neutral light — pure white, near-black text |
| `.dark` | Neutral dark — near-black, near-white text |
| `.warm-light` | Warm off-white with sepia-tinted neutrals **(default theme)** |
| `.warm-dark` | Warm charcoal with warm-white text |

Theme selection is managed by `next-themes` with `attribute="class"`. The `@custom-variant dark` rule in `globals.css` makes `.dark *` and `.warm-dark *` both respond to the `dark:` Tailwind variant.

## Color scale

### Neutral greyscale (light + dark themes)

| Primitive | OKLCH | Approx hex | Role |
|---|---|---|---|
| `--prim-neutral-000` | `oklch(1 0 0)` | `#ffffff` | Pure white backgrounds |
| `--prim-neutral-025` | `oklch(0.985 0 0)` | `#f9f9f9` | Primary foreground, sidebar bg |
| `--prim-neutral-050` | `oklch(0.97 0 0)` | `#f5f5f5` | Secondary, muted, accent surfaces |
| `--prim-neutral-100` | `oklch(0.922 0 0)` | `#ebebeb` | Border, input |
| `--prim-neutral-200` | `oklch(0.708 0 0)` | `#b5b5b5` | Ring / focus indicator |
| `--prim-neutral-300` | `oklch(0.556 0 0)` | `#8c8c8c` | Muted foreground |
| `--prim-neutral-700` | `oklch(0.269 0 0)` | `#404040` | Dark secondary/muted/accent in dark mode |
| `--prim-neutral-800` | `oklch(0.205 0 0)` | `#313131` | Primary in light mode, card in dark mode |
| `--prim-neutral-900` | `oklch(0.145 0 0)` | `#1f1f1f` | Foreground in light mode |

### Warm neutrals (warm-light + warm-dark themes)

All warm values carry a tiny chroma (0.012–0.04) at hue 60–80, producing an imperceptible sepia warmth while remaining WCAG-safe.

| Token role | warm-light value | warm-dark value |
|---|---|---|
| Page background | `oklch(0.97 0.012 80)` | `oklch(0.16 0.015 75)` |
| Default text | `oklch(0.2 0.02 60)` | `oklch(0.95 0.015 80)` |
| Muted text | `oklch(0.5 0.03 70)` | `oklch(0.65 0.03 80)` |
| Border | `oklch(0.88 0.025 78)` | `oklch(0.9 0.04 80 / 12%)` |
| Primary | `oklch(0.25 0.025 65)` | `oklch(0.88 0.04 80)` |

### Destructive / error

| Theme | OKLCH | Notes |
|---|---|---|
| Light & warm-light | `oklch(0.577 0.245 27.325)` | Saturated red-orange |
| Dark & warm-dark | `oklch(0.704 0.191 22.216)` | Lighter, less saturated for dark backgrounds |

### Chart / data-vis palette

Six chart variables (`--chart-1` through `--chart-5`) are defined per theme. They are not used in current UI components but are available for future data visualisations. See `tokens.css` Layer 1 for full values.

## Semantic token map

| Token | resolves to shadcn var | Semantic role |
|---|---|---|
| `--token-bg-page` | `--background` | Page / body background |
| `--token-bg-card` | `--card` | Card / panel surface |
| `--token-bg-popover` | `--popover` | Popover / dropdown surface |
| `--token-bg-muted` | `--muted` | Muted surface (code blocks, kbd) |
| `--token-bg-accent` | `--accent` | Hover state background |
| `--token-text-default` | `--foreground` | Primary text |
| `--token-text-muted` | `--muted-foreground` | Secondary / placeholder text |
| `--token-text-on-primary` | `--primary-foreground` | Text on primary-coloured surfaces |
| `--token-link-text` | `--foreground` | Link text colour |
| `--token-link-decoration` | 30% `--muted-foreground` | Default underline colour |
| `--token-link-decoration-hover` | `--foreground` | Underline colour on hover |
| `--token-border-default` | `--border` | Standard border colour |
| `--token-border-ring` | `--ring` | Focus ring colour |
| `--token-badge-bg` | `--primary` | "NEW" badge background |
| `--token-badge-text` | `--primary-foreground` | "NEW" badge text |
| `--token-overlay` | 80% `--background` | Lightbox / modal backdrop |

## Usage rules

- Always reference `--token-*` variables; never reference `--background`, `--foreground`, etc. directly in new code.
- For Tailwind classes the project exposes these via `@theme inline` in `globals.css` — use `bg-background`, `text-foreground`, etc. as semantic class names (they already resolve through the layer).
- `muted-foreground/60` (60% opacity) is used for ultra-subdued text like popover section headers. Use sparingly.
- `muted-foreground/30` is used only for link underline decoration, never for readable text.

## Accessibility

All foreground-to-background pairings in the theme definitions have been selected to meet WCAG AA (4.5:1 for normal text) across all four themes. The `warm-light` default and `warm-dark` themes were specifically tuned to maintain contrast ratios while introducing warmth.
