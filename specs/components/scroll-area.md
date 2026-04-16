# ScrollArea (ui)

## 1. Metadata

| Field | Value |
|---|---|
| **Name** | ScrollArea |
| **File** | `components/ui/scroll-area.tsx` |
| **Category** | Layout / Primitive |
| **Status** | Active — available; used in FloatingNav writing list area |
| **Exports** | `ScrollArea`, `ScrollBar` |

## 2. Overview

**When to use:** When content may overflow a fixed-height container and needs a styled scrollbar. Provides consistent cross-browser scrollbar appearance via Radix UI's ScrollArea primitive.

**When not to use:** Do not use for full-page scroll — only for constrained containers. Not needed for content that should naturally grow with its container.

## 3. Anatomy

```
┌─────────────────────────────────────────┐
│  ScrollAreaPrimitive.Root               │
│  └── Viewport (size-full rounded-inherit)│
│       └── {children}                    │
│  └── ScrollBar (vertical or horizontal) │
│       └── Thumb (bg-border rounded-full)│
└─────────────────────────────────────────┘
```

Parts:
- **Root** — `relative` container
- **Viewport** — `size-full rounded-[inherit]` with focus ring
- **ScrollBar (vertical)** — `h-full w-2.5 border-l border-l-transparent`
- **ScrollBar (horizontal)** — `h-2.5 flex-col border-t border-t-transparent`
- **Thumb** — `bg-border relative flex-1 rounded-full`

## 4. Tokens used

| Token | Tailwind class | Usage |
|---|---|---|
| `--token-border-default` | `bg-border` | Scrollbar thumb colour |
| `--token-border-ring` | `focus-visible:ring-ring/50` | Viewport focus ring |
| `--token-radius-full` | `rounded-full` | Scrollbar thumb shape |
| `--token-duration-fast` | `transition-colors` | Scrollbar colour transition |

## 5. Props / API

```typescript
// ScrollArea
interface ScrollAreaProps extends React.ComponentProps<typeof ScrollAreaPrimitive.Root> {
  className?: string;
  children: React.ReactNode;
}

// ScrollBar
interface ScrollBarProps extends React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar> {
  orientation?: "vertical" | "horizontal";  // default: "vertical"
  className?: string;
}
```

## 6. States

| State | Description |
|---|---|
| **Default** | Scrollbar hidden until hovering or active |
| **Focus** | Viewport has `focus-visible:ring-[3px] focus-visible:outline-1` |
| **Scrolling** | Thumb position reflects scroll percentage |

## 7. Code example

```tsx
import { ScrollArea } from "@/components/ui/scroll-area";

<ScrollArea className="h-64 w-full">
  {/* long list of items */}
</ScrollArea>
```

## 8. Cross-references

- **FloatingNav** (`components/floating-nav.tsx`) — the writing popover uses a native `overflow-y-auto` scroll with a gradient fade, not this ScrollArea component (a pattern worth noting for consistency review)
- **Popover** (`components/ui/popover.tsx`) — ScrollArea can be nested inside PopoverContent for long lists
