# Separator (ui)

## 1. Metadata

| Field | Value |
|---|---|
| **Name** | Separator |
| **File** | `components/ui/separator.tsx` |
| **Category** | Layout / Primitive |
| **Status** | Available — not currently used in any page or component |
| **Exports** | `Separator` |

## 2. Overview

**When to use:** To visually divide sections of content with a thin 1px rule. Supports both horizontal (default) and vertical orientation. More semantically correct than `<hr>` when used for decorative layout purposes.

**When not to use:** Do not use where the `<hr>` element in MDX components already handles document-level separation. For spacing between sections, prefer margin/padding over a visual rule unless a clear visual break is needed.

## 3. Anatomy

```
─────────────────────  (horizontal, h-px w-full)
│  (vertical, h-full w-px)
```

Parts:
- **Root** — `bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px`

## 4. Tokens used

| Token | Tailwind class | Usage |
|---|---|---|
| `--token-border-default` | `bg-border` | Line colour (uses background, not border property) |

## 5. Props / API

```typescript
interface SeparatorProps {
  orientation?: "horizontal" | "vertical";  // default: "horizontal"
  decorative?: boolean;                      // default: true
  className?: string;
}
```

When `decorative={true}` (default), the element is hidden from assistive technology. Set `decorative={false}` when the separator has semantic meaning.

## 6. States

No interactive states. Static presentational element.

## 7. Code example

```tsx
import { Separator } from "@/components/ui/separator";

// Horizontal (default):
<Separator />

// Vertical:
<div className="flex h-8 items-center gap-4">
  <span>Left</span>
  <Separator orientation="vertical" />
  <span>Right</span>
</div>
```

## 8. Cross-references

- `mdxComponents` uses `<hr className="my-10 border-border" />` for document-level separators in MDX content — `Separator` is an alternative for JSX contexts
