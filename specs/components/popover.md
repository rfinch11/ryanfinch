# Popover (ui)

## 1. Metadata

| Field | Value |
|---|---|
| **Name** | Popover |
| **File** | `components/ui/popover.tsx` |
| **Category** | Overlay / Primitive |
| **Status** | Active — used in FloatingNav and ThemeToggle |
| **Exports** | `Popover`, `PopoverTrigger`, `PopoverContent`, `PopoverAnchor`, `PopoverHeader`, `PopoverTitle`, `PopoverDescription` |

## 2. Overview

**When to use:** For any contextual overlay that appears anchored to a trigger element — menus, mini-panels, info cards. Use when the content is more complex than a simple tooltip.

**When not to use:** Do not use for full-screen overlays (use a modal/dialog pattern). Do not use for persistent sidebars.

## 3. Anatomy

```
[PopoverTrigger]
      ↓
[PopoverContent]  (rendered in a Portal)
  ├── [PopoverHeader]
  │     ├── [PopoverTitle]
  │     └── [PopoverDescription]
  └── {children}
```

`PopoverContent` default styles: `bg-popover text-popover-foreground z-50 w-72 rounded-xl border p-4 shadow-md outline-hidden`. Includes Radix-managed open/close animations.

Parts:
- **PopoverContent** — `rounded-xl border shadow-md` panel in a portal
- **PopoverHeader** — `flex flex-col gap-1 text-sm`
- **PopoverTitle** — `font-medium`
- **PopoverDescription** — `text-muted-foreground`

## 4. Tokens used

| Token | Tailwind class | Usage |
|---|---|---|
| `--token-bg-popover` | `bg-popover` | Panel background |
| `--token-text-on-popover` | `text-popover-foreground` | Panel text |
| `--token-border-default` | `border` | Panel border |
| `--token-shadow-md` | `shadow-md` | Panel elevation |
| `--token-radius-xl` | `rounded-xl` | Panel corner rounding |
| `--token-z-dropdown` | `z-50` | Panel stacking |
| `--token-text-muted` | `text-muted-foreground` | Description text |

## 5. Props / API

### PopoverContent

```typescript
interface PopoverContentProps {
  align?: "start" | "center" | "end";  // default: "center"
  sideOffset?: number;                  // default: 4
  side?: "top" | "right" | "bottom" | "left";
  className?: string;
  // ...all Radix PopoverContent props
}
```

### Usage in FloatingNav

```tsx
<Popover>
  <PopoverTrigger asChild>
    <button>...</button>
  </PopoverTrigger>
  <PopoverContent side="top" align="start" sideOffset={12} className="w-56 p-1.5">
    {/* custom content */}
  </PopoverContent>
</Popover>
```

## 6. States

| State | CSS / Radix attribute |
|---|---|
| **Open** | `data-[state=open]` — `animate-in fade-in-0 zoom-in-95` + slide from relevant side |
| **Closed** | `data-[state=closed]` — `animate-out fade-out-0 zoom-out-95` |
| **Side: top** | `slide-in-from-bottom-2` |
| **Side: bottom** | `slide-in-from-top-2` |
| **Side: left** | `slide-in-from-right-2` |
| **Side: right** | `slide-in-from-left-2` |

## 7. Code example

```tsx
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

<Popover>
  <PopoverTrigger asChild>
    <button>Open</button>
  </PopoverTrigger>
  <PopoverContent className="w-48 p-2">
    <p className="text-sm text-muted-foreground">Content here</p>
  </PopoverContent>
</Popover>
```

## 8. Cross-references

- **FloatingNav** (`components/floating-nav.tsx`) — uses three Popover instances (Projects, Writing, Contact)
- **ScrollArea** (`components/ui/scroll-area.tsx`) — used inside FloatingNav's Writing popover
- **NavigationMenu** (`components/ui/navigation-menu.tsx`) — alternative navigation pattern using a different Radix primitive
