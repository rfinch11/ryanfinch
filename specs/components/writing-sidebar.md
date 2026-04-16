# WritingSidebar

## 1. Metadata

| Field | Value |
|---|---|
| **Name** | WritingSidebar (two exports: `WritingSidebarDesktop`, `WritingBottomNav`) |
| **File** | `components/writing-sidebar.tsx` |
| **Category** | Navigation / Layout |
| **Status** | Active — used on the writing article page |
| **Exports** | Named: `WritingSidebarDesktop`, `WritingBottomNav` |

## 2. Overview

**When to use:** On the writing article layout (`app/writing/[slug]/page.tsx`) to provide a persistent list of all articles. `WritingSidebarDesktop` shows on `lg:` and above as a sticky side column; `WritingBottomNav` shows below the article on mobile (`lg:hidden`).

**When not to use:** Do not use on the writing index page (`/writing`) — that page renders its own list directly. Do not use outside the writing section.

## 3. Anatomy

### WritingSidebarDesktop

```
┌─────────────────────────────┐
│  WRITING                    │  ← label-12, uppercase, tracking-wider
│  ─────────────────────────  │
│  Article Title One          │  ← active: bg-accent text-foreground
│  Article Title Two          │  ← inactive: text-muted-foreground
│  Article Title Three  [NEW] │  ← with NEW badge
│  ...                        │
└─────────────────────────────┘
```

- Positioned `sticky top-16` with `overflow-hidden`
- Fixed width from parent grid: `grid-cols-[240px_1fr]`

### WritingBottomNav

- Same list but rendered below the article (`mt-16 border-t border-border pt-8`)
- `lg:hidden` — only visible on mobile/tablet

Parts:
- **Section header `p`** — `text-label-12 text-muted-foreground mb-3 uppercase tracking-wider`
- **Nav list** — `flex flex-col gap-1`
- **Link (active)** — `flex items-center gap-2 rounded-md px-3 py-2 text-sm bg-accent text-foreground`
- **Link (inactive)** — `text-muted-foreground transition-colors hover:bg-accent hover:text-foreground`
- **"NEW" badge** — `inline-flex shrink-0 items-center rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-semibold leading-none text-primary-foreground`

## 4. Tokens used

| Token | Tailwind class | Usage |
|---|---|---|
| `--token-text-muted` | `text-muted-foreground` | Section label, inactive links |
| `--token-text-default` | `text-foreground` | Active link text |
| `--token-bg-accent` | `bg-accent` | Active / hover link background |
| `--token-border-default` | `border-border` | Bottom nav top border |
| `--token-badge-bg` | `bg-primary` | "NEW" badge background |
| `--token-badge-text` | `text-primary-foreground` | "NEW" badge text |
| `--token-radius-md` | `rounded-md` | Link item rounding |
| `--token-radius-full` | `rounded-full` | Badge shape |
| `--token-duration-fast` | `transition-colors` | Link hover transition |

## 5. Props / API

```typescript
interface Post {
  slug: string;
  title: string;
  isNew?: boolean;
}

interface WritingSidebarProps {
  posts: Post[];
  currentSlug: string;
}
```

Both `WritingSidebarDesktop` and `WritingBottomNav` accept identical props.

## 6. States

| State | Description |
|---|---|
| **Inactive link** | `text-muted-foreground` |
| **Inactive link hover** | `bg-accent text-foreground` |
| **Active link (current page)** | `bg-accent text-foreground` — no additional hover style needed |
| **With "NEW" badge** | Badge appended after title text when `post.isNew === true` |

## 7. Code example

```tsx
import { WritingSidebarDesktop, WritingBottomNav } from "@/components/writing-sidebar";
import { getAllPosts } from "@/lib/writing";

const allPosts = getAllPosts();

// In the writing article layout:
<div className="grid grid-cols-1 gap-16 lg:grid-cols-[240px_1fr]">
  <WritingSidebarDesktop posts={allPosts} currentSlug={slug} />
  <main className="max-w-2xl">
    {/* article content */}
    <WritingBottomNav posts={allPosts} currentSlug={slug} />
  </main>
</div>
```

## 8. Cross-references

- **FloatingNav** (`components/floating-nav.tsx`) — also displays a scrollable writing list in its Writing popover (no active state, compact format)
- `app/writing/page.tsx` — the writing index page renders a similar list directly without using this component
- `lib/writing.ts` — provides the `Post` type and `getAllPosts()` function
