# Elevation Foundation

## Overview

Elevation is expressed through Tailwind's shadow utilities and a backdrop blur pattern. The project does not use traditional layer elevation stacking via `z-index` alone — instead it combines shadow depth with backdrop blur to signal floating surfaces.

## Shadow scale

| Token | Tailwind class | CSS value | Used on |
|---|---|---|---|
| `--token-shadow-sm` | `shadow-sm` | `0 1px 2px 0 oklch(0 0 0 / 5%)` | (not currently used directly) |
| `--token-shadow-base` | `shadow` | `0 1px 3px 0 oklch(0 0 0 / 10%), 0 1px 2px -1px oklch(0 0 0 / 10%)` | NavigationMenu viewport |
| `--token-shadow-md` | `shadow-md` | `0 4px 6px -1px oklch(0 0 0 / 10%), 0 2px 4px -2px oklch(0 0 0 / 10%)` | Popover content |
| `--token-shadow-lg` | `shadow-lg` | `0 10px 15px -3px oklch(0 0 0 / 10%), 0 4px 6px -4px oklch(0 0 0 / 10%)` | FloatingNav, ThemeToggle dropdown, Lightbox modal |
| `--token-shadow-2xl` | `shadow-2xl` | `0 25px 50px -12px oklch(0 0 0 / 25%)` | KeyboardShortcuts overlay card, easter egg card |
| `--token-shadow-key` | `shadow-[0_2px_0_0_hsl(var(--border))]` | `0 2px 0 0 var(--border)` | Pressed kbd key effect (HotkeyHint, KeyboardShortcuts, homepage inline kbd) |

## Custom shadow: pressed key

`--token-shadow-key` is the only non-standard Tailwind shadow in the project. It simulates a physical key being raised on a keyboard by casting a 2px downward shadow using the border colour rather than black. This is used on all three `<kbd>` implementations.

Note: The homepage inline kbd uses a 1px version (`shadow-[0_1px_0_0_hsl(var(--border))]`) — a minor inconsistency vs. the 2px used in `HotkeyHint` and `KeyboardShortcuts`.

## Backdrop blur

Floating surfaces use `backdrop-blur-md` combined with a semi-transparent background (`bg-background/80`) to create a frosted-glass effect:

| Surface | Classes | Context |
|---|---|---|
| FloatingNav | `bg-background/80 backdrop-blur-md` | Bottom-of-screen navigation |
| ThemeToggle dropdown | `bg-background/80 backdrop-blur-md` | Theme picker |
| Keyboard overlay backdrop | `bg-background/80 backdrop-blur-sm` | Full-screen cheat sheet |
| Lightbox backdrop | `bg-background/80 backdrop-blur-sm` | Image lightbox |

The FloatingNav and ThemeToggle use `backdrop-blur-md`; overlay backdrops use the lighter `backdrop-blur-sm`.

## Z-index scale

| Token | Value | Used on |
|---|---|---|
| `--token-z-base` | 0 | Default document flow |
| `--token-z-nav-indicator` | 1 | NavigationMenuIndicator (`z-[1]`) |
| `--token-z-raised` | 10 | Timeline dot and writing nav scroll gradient (`z-10`) |
| `--token-z-dropdown` | 50 | FloatingNav (`z-50`), Lightbox controls, ThemeToggle panel |
| `--token-z-overlay` | 200 | KeyboardShortcuts overlay and easter egg (`z-[200]`) |

## Elevation hierarchy

From lowest to highest:

1. **Document** (z:0) — page content, timeline, articles
2. **Sticky/raised** (z:10) — writing nav gradient overlay, timeline dot
3. **Floating UI** (z:50) — FloatingNav, popover menus, lightbox, ThemeToggle
4. **Full-screen overlay** (z:200) — keyboard shortcuts sheet, easter egg

The gap between z:50 and z:200 is intentional — the shortcuts overlay must always appear above all floating navigation elements.
