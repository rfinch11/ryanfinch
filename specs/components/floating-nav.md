# FloatingNav

## 1. Metadata

| Field | Value |
|---|---|
| **Name** | FloatingNav |
| **File** | `components/floating-nav.tsx` |
| **Category** | Navigation |
| **Status** | Active — used on all pages |
| **Export** | Named: `FloatingNav` |

## 2. Overview

**When to use:** As the primary site-wide navigation. FloatingNav should appear on every page. It is the sole navigation element for top-level destinations (Projects, Resume, Writing, Contact).

**When not to use:** Do not nest inside other floating containers. Do not use for section-level navigation within a page (see WritingSidebarDesktop for that use case).

## 3. Anatomy

```
┌─────────────────────────────────────────────────────┐
│  [Pill container — rounded-full, backdrop-blur-md]   │
│  ┌──────────┐ ┌────────┐ ┌──────────┐ ┌──────────┐  │
│  │ Projects │ │ Resume │ │ Writing  │ │ Contact  │  │
│  │ popover  │ │ direct │ │ popover  │ │ popover  │  │
│  └──────────┘ └────────┘ └──────────┘ └──────────┘  │
└─────────────────────────────────────────────────────┘
```

Parts:
- **Pill wrapper** — fixed, bottom-centered, `bottom-12 left-1/2 -translate-x-1/2`
- **Inner bar** — `rounded-full border border-border bg-background/80 backdrop-blur-md shadow-lg`
- **Nav button** — shared pattern: `rounded-full bg-transparent p-3 lg:px-4 lg:py-2 text-muted-foreground hover:bg-accent hover:text-foreground`
- **Icon** — Lucide icon, `h-5 w-5` mobile / `h-4 w-4` desktop
- **Label** — hidden on mobile (`max-w-0 opacity-0`), visible on `lg:` (`max-w-32 opacity-100`)
- **Chevron** — `ChevronUp h-3 w-3` on popover triggers, hidden on mobile
- **Projects popover** — thumbnail grid, links to `/projects/outta` and `/projects/sidebar`
- **Writing popover** — scrollable article list with gradient scroll indicator
- **Contact popover** — LinkedIn, GitHub, Email links with icons
- **"NEW" badge** — `bg-primary text-primary-foreground text-[10px] rounded-full`

## 4. Tokens used

| Token | Tailwind class | Usage |
|---|---|---|
| `--token-bg-page` | `bg-background/80` | Pill background with 80% opacity |
| `--token-border-default` | `border-border` | Pill border |
| `--token-text-muted` | `text-muted-foreground` | Button resting state text |
| `--token-text-default` | `text-foreground` | Button hover text |
| `--token-bg-accent` | `hover:bg-accent` | Button hover background |
| `--token-shadow-lg` | `shadow-lg` | Pill drop shadow |
| `--token-bg-popover` | `bg-popover` (via Popover) | Popover surface |
| `--token-badge-bg` | `bg-primary` | "NEW" badge background |
| `--token-badge-text` | `text-primary-foreground` | "NEW" badge text |
| `--token-radius-full` | `rounded-full` | Pill and button shape |
| `--token-z-dropdown` | `z-50` | Floating position |
| `--token-duration-fast` | `transition-colors` | Hover transitions |
| `--token-duration-normal` | `duration-200` | Scroll chevron rotation |

## 5. Props / API

```typescript
interface Article {
  slug: string;
  title: string;
  isNew?: boolean;
}

interface FloatingNavProps {
  articles?: Article[];  // defaults to []
}
```

The `articles` prop populates the Writing popover list. Projects are hardcoded in `PROJECT_ITEMS`. Contact links are hardcoded in `CONTACT_LINKS`.

## 6. States

| State | Description |
|---|---|
| **Default** | All buttons visible; labels hidden on mobile; popovers closed |
| **Button hover** | `bg-accent text-foreground` |
| **Popover open** | Radix Popover `data-[state=open]` — `animate-in zoom-in-95 fade-in-0 slide-in-from-bottom-2` |
| **Popover closed** | `animate-out zoom-out-95 fade-out-0` |
| **Writing scroll — not at bottom** | ChevronDown visible pointing down |
| **Writing scroll — at bottom** | ChevronDown rotated 180° |
| **Contact opened via hotkey** | `contactOpen` state set to `true` via `hotkey:contact` window event |

## 7. Code example

```tsx
// In any page:
import { FloatingNav } from "@/components/floating-nav";
import { getAllPosts } from "@/lib/writing";

export default function Page() {
  const articles = getAllPosts();
  return (
    <div>
      {/* page content */}
      <FloatingNav articles={articles} />
    </div>
  );
}
```

## 8. Cross-references

- **Popover** (`components/ui/popover.tsx`) — used for Projects, Writing, and Contact menus
- **ThemeToggle** (`components/theme-toggle.tsx`) — companion floating UI in the header
- **KeyboardShortcuts** (`components/keyboard-shortcuts.tsx`) — dispatches `hotkey:contact` event that opens the Contact popover
- **WritingSidebarDesktop** — provides the same writing list but in a sidebar context on desktop
