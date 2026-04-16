# NavigationMenu (ui)

## 1. Metadata

| Field | Value |
|---|---|
| **Name** | NavigationMenu |
| **File** | `components/ui/navigation-menu.tsx` |
| **Category** | Navigation / Primitive |
| **Status** | Available — not currently used in any page (FloatingNav uses Popover instead) |
| **Exports** | `NavigationMenu`, `NavigationMenuList`, `NavigationMenuItem`, `NavigationMenuContent`, `NavigationMenuTrigger`, `NavigationMenuLink`, `NavigationMenuIndicator`, `NavigationMenuViewport`, `navigationMenuTriggerStyle` |

## 2. Overview

**When to use:** For a top-level horizontal navigation bar with dropdown content panels. Best suited for layouts where navigation is at the top of the page rather than floating.

**When not to use:** Do not use for the current floating pill navigation — `FloatingNav` with `Popover` is the established pattern for this site. Do not use for simple link lists without subnavigation.

## 3. Anatomy

```
NavigationMenu (root)
└── NavigationMenuList (flex row)
    └── NavigationMenuItem
        ├── NavigationMenuTrigger (with ChevronDown)
        └── NavigationMenuContent (animated panel)
NavigationMenuViewport (portal for content)
NavigationMenuIndicator (arrow pointing up from viewport)
NavigationMenuLink (styled link within content)
```

Parts:
- **Root** — `relative flex max-w-max flex-1 items-center justify-center`
- **List** — `group flex flex-1 list-none items-center justify-center gap-1`
- **Trigger** — `group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium hover:bg-accent focus:bg-accent`
- **Viewport** — `absolute bottom-full right-0 isolate z-50 flex justify-center` wrapper; inner: `bg-popover rounded-md border shadow h-[var(--radix-navigation-menu-viewport-height)]`
- **Indicator** — `h-1.5 top-full z-[1]`; inner diamond: `bg-border h-2 w-2 rotate-45 rounded-tl-sm shadow-md`

## 4. Tokens used

| Token | Tailwind class | Usage |
|---|---|---|
| `--token-bg-page` | `bg-background` | Trigger background, viewport bg fallback |
| `--token-bg-accent` | `bg-accent` | Trigger hover/focus state |
| `--token-bg-popover` | `bg-popover` | Viewport/content background |
| `--token-text-on-accent` | `hover:text-accent-foreground` | Trigger hover text |
| `--token-text-on-popover` | `text-popover-foreground` | Viewport text |
| `--token-text-muted` | `text-muted-foreground` | Link SVG icons |
| `--token-border-default` | `border` | Viewport border, indicator diamond |
| `--token-border-ring` | `focus-visible:ring-ring/50` | Trigger focus ring |
| `--token-shadow-base` | `shadow` | Viewport shadow |
| `--token-radius-base` | `rounded-md` | Trigger, viewport, content, link |
| `--token-z-dropdown` | `z-50` | Viewport stacking |
| `--token-z-nav-indicator` | `z-[1]` | Indicator stacking |
| `--token-duration-normal` | `duration-300` | Chevron rotation |

## 5. Props / API

### NavigationMenu

```typescript
interface NavigationMenuProps {
  viewport?: boolean;  // default: true — whether to render NavigationMenuViewport
  className?: string;
}
```

### NavigationMenuTrigger

Extends `NavigationMenuPrimitive.Trigger`. Automatically includes `ChevronDownIcon` that rotates on open.

### NavigationMenuLink

Extends `NavigationMenuPrimitive.Link`. Accepts `data-active={true}` for active state styling.

## 6. States

| State | Description |
|---|---|
| **Default** | `bg-background text-foreground` |
| **Trigger hover / focus** | `bg-accent text-accent-foreground` |
| **Trigger: menu open** | `data-[state=open]:bg-accent/50` |
| **Focus visible** | `focus-visible:ring-[3px] focus-visible:outline-1` |
| **Disabled** | `disabled:pointer-events-none disabled:opacity-50` |
| **Link active** | `data-[active=true]:bg-accent/50 text-accent-foreground` |
| **Viewport open** | `data-[state=open]:animate-in zoom-in-90 fade-in` |
| **Viewport closed** | `data-[state=closed]:animate-out zoom-out-95` |
| **Indicator visible** | `data-[state=visible]:animate-in fade-in` |

## 7. Code example

```tsx
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Projects</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink href="/projects/outta">Outta</NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
```

## 8. Cross-references

- **Popover** (`components/ui/popover.tsx`) — the currently used alternative for FloatingNav menus
- **FloatingNav** (`components/floating-nav.tsx`) — the primary navigation; could be refactored to use NavigationMenu if a top-bar layout is desired in the future
