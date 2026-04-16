# Motion Foundation

## Overview

The project uses minimal, purposeful motion. All transitions are CSS-only (no JS animation libraries). Heavy or attention-seeking animations are avoided in favour of subtle state-change feedback. The `motion-safe:` Tailwind variant is used on the timeline accordion to respect the user's `prefers-reduced-motion` setting.

## Duration scale

| Token | Value | Tailwind equiv | Used for |
|---|---|---|---|
| `--token-duration-fast` | 150ms | (default Tailwind transition) | Colour/text transitions on hover |
| `--token-duration-normal` | 200ms | `duration-200` | Icon rotations, gallery scale, opacity fade |
| `--token-duration-slow` | 300ms | `duration-300` | Timeline dot colour, accordion expand |

## Easing

| Token | Value | Usage |
|---|---|---|
| `--token-easing-default` | `ease` | All standard transitions (`transition-colors`, `transition-opacity`, `transition-transform`) |
| `--token-easing-out` | `ease-out` | Timeline accordion grid-template-rows expansion |

## Transition patterns

### Colour/state transitions

The most common transition in the project. Applied to nearly every interactive element:

```
transition-colors
```

Affects `color`, `background-color`, `border-color`, and `text-decoration-color` at Tailwind's default 150ms with ease timing.

**Applied to:**
- All FloatingNav buttons (hover state)
- ThemeToggle button and menu items
- Writing sidebar links
- Header logo link
- All MDX `<a>` anchor links (decoration colour only)
- Timeline header buttons
- Timeline dot (`transition-colors duration-300` for the slower dot colour change)

### Transform transitions

```
transition-transform duration-200
```

**Applied to:**
- ChevronDown icon in FloatingNav writing scroll indicator (also `rotate-180` when at bottom)
- ChevronDown in NavigationMenuTrigger (`duration-300`)
- Gallery thumbnails on hover (`scale-105`)

### Opacity transitions

```
transition-opacity duration-200
```

**Applied to:**
- ChevronsUpDown expand icon in timeline — `opacity-0 group-hover:opacity-100` on desktop, always visible on mobile

### Accordion expansion (grid-template-rows)

The resume timeline uses a CSS grid trick for smooth accordion expansion:

```jsx
className="grid motion-safe:transition-[grid-template-rows] motion-safe:duration-300 motion-safe:ease-out"
style={{ gridTemplateRows: isExpanded ? "1fr" : "0fr" }}
```

This animates between a collapsed (0fr) and expanded (1fr) grid row. The `motion-safe:` prefix ensures users who prefer reduced motion see an instant expand with no jank. This is the only JS-state-driven animation in the project.

### Page transitions (Radix UI)

Popover and NavigationMenu components from Radix UI include built-in animation classes from `tw-animate-css`:

- `data-[state=open]:animate-in` / `data-[state=closed]:animate-out`
- `fade-in-0` / `fade-out-0`
- `zoom-in-95` / `zoom-out-95`
- `slide-in-from-*` / `slide-out-to-*`

These are Radix-managed and should not be overridden unless a design change is intentional.

## Reduced motion

Only the timeline accordion explicitly uses `motion-safe:`. All other transitions rely on Tailwind's default behaviour which does not automatically honour `prefers-reduced-motion`.

Future work: consider wrapping all `transition-*` classes with `motion-safe:` variants, or using a global CSS `@media (prefers-reduced-motion: reduce)` rule in `globals.css`.

## What is intentionally NOT animated

- Page navigations (Next.js handles via client router, no transition API used)
- Theme changes (`disableTransitionOnChange` is set on the ThemeProvider — no flash)
- Keyboard shortcut sheet appearance (instant)
- The easter egg notification (instant appearance with a 1.5s auto-dismiss timer)
