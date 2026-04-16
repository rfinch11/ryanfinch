# Border Radius Foundation

## Overview

The entire radius scale derives from a single base value: `--radius: 0.625rem` (10px), defined in `globals.css :root`. All other radii are calculated offsets from this base. This means the scale can be globally adjusted by changing one variable.

## Radius scale

| Token | Formula | Computed value | Tailwind equiv | Usage |
|---|---|---|---|---|
| `--token-radius-none` | `0` | 0px | `rounded-none` | Hard-edged dividers, `hr` |
| `--token-radius-sm` | `var(--radius) - 4px` | ~6px | `rounded-sm` | NavigationMenu indicator arrow |
| `--token-radius-md` | `var(--radius) - 2px` | ~8px | `rounded-md` | Kbd keys, writing sidebar links, popover links |
| `--token-radius-base` | `var(--radius)` | 10px | `rounded-lg` | Standard button/card radius, NavigationMenu viewport |
| `--token-radius-xl` | `var(--radius) + 4px` | 14px | `rounded-xl` | Project gallery cards, lightbox container, ThemeToggle dropdown |
| `--token-radius-2xl` | `var(--radius) + 8px` | 18px | `rounded-2xl` | KeyboardShortcuts overlay, easter egg panel |
| `--token-radius-3xl` | `var(--radius) + 12px` | 22px | (not currently used) | Reserved |
| `--token-radius-4xl` | `var(--radius) + 16px` | 26px | (not currently used) | Reserved |
| `--token-radius-full` | `9999px` | pill | `rounded-full` | Avatars, FloatingNav pill, "NEW" badge, icon buttons |

## Usage patterns

### Rounded-full (pill)
Used for:
- The main FloatingNav container
- All icon/text buttons inside FloatingNav
- Individual nav link buttons
- The ThemeToggle trigger button
- "NEW" badge spans
- The avatar image on the homepage
- Timeline expand/collapse button (desktop)
- Lightbox arrow navigation buttons

### Rounded-xl
Used for:
- Project gallery card links
- Project video container
- Gallery thumbnail images in timeline
- Lightbox modal container
- ThemeToggle dropdown panel

### Rounded-2xl
Used for:
- KeyboardShortcuts cheat sheet overlay card
- Easter egg notification panel

### Rounded-lg (base)
Used for:
- Standard popover content (Radix Popover default)
- Popover link hover items
- Gallery thumbnails in resume
- Code blocks (`<pre>` in MDX)

### Rounded-md
Used for:
- `<kbd>` key elements in HotkeyHint and KeyboardShortcuts
- Writing sidebar navigation links

### Rounded-sm
Used for:
- NavigationMenu indicator diamond/arrow element

## Base value rationale

`0.625rem` (10px) was chosen as the base because it provides a visually comfortable rounding at typical card sizes while the derived scale gives sufficient range from sharp (6px) to generously rounded (26px+). The `rounded-full` pill shape for the FloatingNav is an intentional design departure from the card-based scale.
