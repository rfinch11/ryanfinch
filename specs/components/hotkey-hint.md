# HotkeyHint

## 1. Metadata

| Field | Value |
|---|---|
| **Name** | HotkeyHint |
| **File** | `components/hotkey-hint.tsx` |
| **Category** | Utility / Informational |
| **Status** | Active — used on homepage |
| **Export** | Named: `HotkeyHint` |

## 2. Overview

**When to use:** To display a keyboard shortcut hint inline in a UI, rendered as physical-looking key caps. Currently used on the homepage to hint at the `Shift ?` shortcut.

**When not to use:** Do not use for the full cheat sheet — that is handled by `KeyboardShortcuts`. Not suitable for mobile-only layouts (the homepage wraps this in `hidden lg:flex`).

## 3. Anatomy

```
[ shift ]  [ ? ]
```

Parts:
- **Wrapper** — `flex items-center gap-1`
- **Kbd element** — `inline-flex min-w-[1.75rem] items-center justify-center rounded-md border border-border bg-muted px-2 py-1.5 font-mono text-sm font-medium text-muted-foreground shadow-[0_2px_0_0_hsl(var(--border))]`

The component hard-codes the keys `["shift", "?"]`.

## 4. Tokens used

| Token | Tailwind class | Usage |
|---|---|---|
| `--token-border-default` | `border-border` | Key cap border |
| `--token-bg-muted` | `bg-muted` | Key cap background |
| `--token-text-muted` | `text-muted-foreground` | Key label text |
| `--token-shadow-key` | `shadow-[0_2px_0_0_hsl(var(--border))]` | Pressed-key depth effect |
| `--token-radius-md` | `rounded-md` | Key cap corner rounding |
| `--token-font-mono` | `font-mono` | Key label typeface |

## 5. Props / API

No props. The displayed keys (`["shift", "?"]`) are hardcoded.

If generalisation is needed in future, consider:

```typescript
interface HotkeyHintProps {
  keys: string[];
}
```

## 6. States

Only one state — static display. No hover, focus, or interactive states.

## 7. Code example

```tsx
import { HotkeyHint } from "@/components/hotkey-hint";

// On homepage (hidden on mobile):
<div className="hidden lg:flex items-center gap-3 text-muted-foreground/50">
  <HotkeyHint />
  <span className="text-sm">Konami for a good time</span>
</div>
```

## 8. Cross-references

- **KeyboardShortcuts** (`components/keyboard-shortcuts.tsx`) — contains an inline equivalent of the same kbd pattern directly in the cheat sheet overlay (not using HotkeyHint, a minor inconsistency)
- The homepage (`app/page.tsx`) also contains an inline `<kbd>` pattern distinct from HotkeyHint — uses `min-w-[1.25rem]` and `shadow-[0_1px_0_0_hsl(var(--border))]` (1px vs 2px)
