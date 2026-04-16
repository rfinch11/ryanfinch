# WorkTimeline

## 1. Metadata

| Field | Value |
|---|---|
| **Name** | WorkTimeline |
| **File** | `app/resume/work-timeline.tsx` |
| **Category** | Content / Interactive |
| **Status** | Active — used on the resume page |
| **Exports** | Named: `WorkTimeline` (also internal: `GalleryLightbox`) |

## 2. Overview

**When to use:** On the resume page (`app/resume/page.tsx`) to display the full work history as an interactive expandable timeline. This is a page-specific component.

**When not to use:** Do not use outside the resume page. The `WORK_HISTORY` data is currently hardcoded in this file; any content changes require editing the source file.

## 3. Anatomy

```
┌─────────────────────────────────────────────────────────┐
│  [Expand all / Collapse all — desktop: timeline button] │
│  │                                                       │
│  ●  ZOOX                           2023 — Present       │  ← collapsed
│  │                                                       │
│  ●  META ▼                         2019 — 2023          │  ← expanded ↓
│  │    Senior Manager, UX Research · Foster City         │
│  │    [gallery thumbnails row]                          │
│  │    Highlights                                        │
│  │      • Reels launch ↗                                │
│  │                                                       │
│  ●  FORD                           2017 — 2019          │
│  ●  CROWN                          2015 — 2017          │
│  ●  HEATHCO                        2013 — 2015          │
└─────────────────────────────────────────────────────────┘
```

### GalleryLightbox

```
┌───────────────────────────────────────────────────────┐
│  [backdrop — bg-background/80 backdrop-blur-sm]       │
│                                                       │
│  ←  ┌─────────────────────────────────────────────┐  →
│     │  [image/video — max-h-[70vh]]               │  │
│     │  Caption    [link ↗]   1/6                  │  │
│     └─────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────┘
```

Parts:
- **Timeline line** — `absolute left-0 top-0 bottom-0 w-px bg-border hidden md:block`
- **Timeline dot** — `h-2 w-2 rounded-full border transition-colors duration-300` — `border-foreground bg-foreground` when expanded, `border-border bg-background` when collapsed
- **Expand/collapse button (desktop)** — `absolute -top-7 -translate-x-1/2 rounded-full border border-border bg-background p-2.5 z-10`
- **Expand/collapse button (mobile)** — `text-label-14 text-muted-foreground transition-colors hover:text-foreground`
- **Company heading** — `font-display font-normal text-heading-32 uppercase text-foreground transition-colors group-hover:text-muted-foreground`
- **Date range** — `text-label-14 text-muted-foreground`
- **Accordion** — `grid motion-safe:transition-[grid-template-rows] motion-safe:duration-300 motion-safe:ease-out`
- **Title/location** — `text-copy-14 font-bold` + `text-label-14`
- **Description** — `text-copy-14 text-muted-foreground`
- **Gallery thumbnail** — `h-32 sm:h-40 rounded-lg transition-transform duration-200 group-hover/thumb:scale-105`
- **Highlights label** — `text-label-12 uppercase tracking-wider text-muted-foreground/60`
- **Link** — `text-foreground underline decoration-muted-foreground/30 underline-offset-2 transition-colors hover:decoration-foreground`
- **Lightbox modal** — `max-h-[90vh] max-w-3xl rounded-xl border border-border bg-background p-4 shadow-lg`
- **Lightbox arrow** — `rounded-full border border-border bg-background p-2.5 hidden sm:block`

## 4. Tokens used

| Token | Tailwind class | Usage |
|---|---|---|
| `--token-bg-page` | `bg-background` | Timeline dot fill, lightbox background, arrow buttons |
| `--token-text-default` | `text-foreground` | Company names, expanded dot border/fill, link text |
| `--token-text-muted` | `text-muted-foreground` | Dates, descriptions, location, arrow icons |
| `--token-border-default` | `border-border` | Timeline line, dots, lightbox, arrow buttons |
| `--token-overlay` | `bg-background/80` | Lightbox backdrop |
| `--token-shadow-lg` | `shadow-lg` | Lightbox modal shadow |
| `--token-radius-xl` | `rounded-xl` | Lightbox modal, gallery thumbnails |
| `--token-radius-base` | `rounded-lg` | Lightbox media, gallery thumbs |
| `--token-radius-full` | `rounded-full` | Timeline dot, expand button, lightbox arrows |
| `--token-z-dropdown` | `z-50` | Lightbox container and arrows |
| `--token-z-raised` | `z-10` | Desktop expand/collapse button |
| `--token-duration-slow` | `duration-300` | Timeline dot colour, accordion expand |
| `--token-duration-normal` | `duration-200` | Gallery thumb scale, expand icon opacity |
| `--token-easing-out` | `ease-out` | Accordion expand easing |

## 5. Props / API

No props. Work history data is hardcoded in `WORK_HISTORY` array inside the file.

```typescript
interface WorkEntry {
  id: string;
  company: string;
  dateRange: string;
  title: string;
  location: string;
  description: string;
  gallery: GalleryItem[];
  links: WorkLink[];
}

interface GalleryItem {
  src: string;
  type: "image" | "video" | "gif";
  caption?: string;
  link?: WorkLink;
}

interface WorkLink {
  label: string;
  href: string;
  description?: string;
}
```

## 6. States

### Timeline entry
| State | Description |
|---|---|
| **Collapsed** | Company name + date only visible; dot is `border-border bg-background` |
| **Expanded** | Full content visible; dot is `border-foreground bg-foreground`; accordion `gridTemplateRows: "1fr"` |
| **Hover (company button)** | Company name transitions to `text-muted-foreground`; expand icons fade in on desktop |

### Gallery thumbnail
| State | Description |
|---|---|
| **Default** | Static image |
| **Hover** | `scale-105` via `transition-transform duration-200` |
| **Clicked** | Opens GalleryLightbox |

### Lightbox
| State | Description |
|---|---|
| **Open** | Full-screen overlay with backdrop blur |
| **Navigate** | Arrow buttons, `ArrowLeft`/`ArrowRight` keyboard, swipe touch |
| **Close** | Click backdrop, click X button, or `Escape` key |
| **First item** | Previous arrow hidden |
| **Last item** | Next arrow hidden |
| **Mobile** | Arrow buttons hidden (`hidden sm:block`); swipe gesture active |

## 7. Code example

```tsx
// app/resume/page.tsx (already in place):
import { WorkTimeline } from "./work-timeline";

export default function ResumePage() {
  return (
    <main className="pt-12">
      <WorkTimeline />
    </main>
  );
}
```

## 8. Cross-references

- `app/resume/page.tsx` — the only consumer
- `lib/utils.ts` — uses `cn()` utility for conditional class merging
- `specs/foundations/motion.md` — documents the `motion-safe:` accordion animation pattern
