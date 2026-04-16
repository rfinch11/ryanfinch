# Spacing Foundation

## Overview

Spacing follows Tailwind CSS's default 4px base unit. All spacing values are multiples of `0.25rem` (4px). The project does not define custom spacing beyond Tailwind defaults, but the `tokens.css` Layer 2 documents a semantic 8-step scale and named page-layout tokens.

## Base unit

**1 spacing unit = 0.25rem = 4px**

All components use Tailwind spacing utilities (`p-4`, `gap-2`, `px-6`, etc.) which resolve to multiples of this unit.

## 8-step token scale

| Token | rem | px | Tailwind equiv | Common uses |
|---|---|---|---|---|
| `--token-space-1` | 0.25rem | 4px | `p-1`, `gap-1` | Tight gaps between nav items, badge padding |
| `--token-space-2` | 0.5rem | 8px | `p-2`, `gap-2` | Icon button padding, small gaps |
| `--token-space-3` | 0.75rem | 12px | `p-3` | Icon button padding (floating nav) |
| `--token-space-4` | 1rem | 16px | `p-4` | Standard padding, gap between items |
| `--token-space-6` | 1.5rem | 24px | `p-6`, `gap-6` | Section-level gaps, card padding |
| `--token-space-8` | 2rem | 32px | `p-8`, `gap-8` | Larger section gaps |
| `--token-space-12` | 3rem | 48px | `pt-12` | Resume main content top padding |
| `--token-space-16` | 4rem | 64px | `gap-16`, `py-16` | Column gap in writing layout, page vertical padding |
| `--token-space-24` | 6rem | 96px | `py-24` | Major section vertical rhythm |

## Page layout spacing

The project uses a consistent responsive page inset pattern across all pages:

```
px-6      → sm: px-12      → md: px-24      → lg: px-32
(24px)       (48px)           (96px)           (128px)
```

| Token | Value | Breakpoint |
|---|---|---|
| `--token-space-page-x-sm` | 1.5rem / 24px | Default (mobile) |
| `--token-space-page-x-md` | 3rem / 48px | `sm:` breakpoint |
| `--token-space-page-x-lg` | 6rem / 96px | `md:` breakpoint |
| `--token-space-page-x-xl` | 8rem / 128px | `lg:` breakpoint |
| `--token-space-page-y` | 4rem / 64px | All — `py-16` |
| `--token-space-section-y` | 6rem / 96px | All — `py-24` main sections |

## Notable fixed measurements

These are layout-only values that appear as Tailwind arbitrary values. They are intentional constraints for UI geometry, not general spacing tokens:

| Value | Context | Tailwind class |
|---|---|---|
| 240px | Writing sidebar fixed width on desktop | `grid-cols-[240px_1fr]` |
| 1.75rem (28px) | Minimum width of `kbd` key in hint/shortcut overlays | `min-w-[1.75rem]` |
| 1.25rem (20px) | Minimum width of inline `kbd` on homepage | `min-w-[1.25rem]` |
| 128px / 160px | Gallery thumbnail heights on resume timeline | `h-32` / `sm:h-40` |

## Writing layout grid gap

The writing article page uses `gap-16` (64px) between the sidebar column and the main content column. This is the largest gap in the system and is intentional to separate navigation from readable prose.

## Usage rules

- Use `--token-space-*` tokens when writing custom CSS; use Tailwind spacing utilities in JSX.
- Do not introduce new arbitrary `px` spacing values for layout concerns. Prefer the Tailwind scale.
- Viewport-based constraints (`max-h-[90vh]`, `max-h-[70vh]`) are permitted for modal/lightbox content and are not considered spacing violations.
- The `py-24` rhythm (`--token-space-section-y`) is a strong page-level convention — maintain it on all top-level pages.
