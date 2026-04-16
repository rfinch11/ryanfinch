# MdxComponents

## 1. Metadata

| Field | Value |
|---|---|
| **Name** | mdxComponents |
| **File** | `components/mdx-components.tsx` |
| **Category** | Content / Typography |
| **Status** | Active — used on all writing and project MDX pages |
| **Export** | Named constant: `mdxComponents` |

## 2. Overview

**When to use:** Pass as the `components` prop to `<MDXRemote>` on any page that renders MDX content. Applies consistent visual treatment to all standard HTML elements produced by MDX.

**When not to use:** Do not render this in non-MDX contexts. Do not override individual elements inline — extend the components object or create a new variant.

## 3. Anatomy

Maps these HTML elements to styled React components:

| MDX element | Rendered as | Typography class | Color |
|---|---|---|---|
| `h1` | `<h1>` | `text-heading-32` | (foreground default) |
| `h2` | `<h2>` | `text-heading-24` | (foreground default) |
| `h3` | `<h3>` | `text-heading-20` | (foreground default) |
| `p` | `<p>` | `text-copy-16` | `text-muted-foreground` |
| `a` | `<a>` | (inherits copy size) | `text-foreground` with underline |
| `ul` | `<ul>` | `text-copy-16` | `text-muted-foreground` |
| `ol` | `<ol>` | `text-copy-16` | `text-muted-foreground` |
| `li` | `<li>` | `pl-1` offset | (inherits from ul/ol) |
| `blockquote` | `<blockquote>` | `text-copy-16` | `text-muted-foreground`, italic |
| `code` | `<code>` | `text-copy-14` | (inherits) |
| `pre` | `<pre>` | `text-copy-14` | (inherits) |
| `hr` | `<hr>` | — | `border-border` |
| `strong` | `<strong>` | `font-semibold` | `text-foreground` |

## 4. Tokens used

| Token | Tailwind class | Usage |
|---|---|---|
| `--token-text-default` | `text-foreground` | Headings, links, strong text |
| `--token-text-muted` | `text-muted-foreground` | Body paragraphs, lists, blockquote |
| `--token-bg-muted` | `bg-muted` | `<code>` and `<pre>` backgrounds |
| `--token-border-default` | `border-border` | `<hr>` and `<blockquote>` left border |
| `--token-link-decoration` | `decoration-muted-foreground/30` | Default underline colour |
| `--token-link-decoration-hover` | `hover:decoration-foreground` | Underline colour on hover |
| `--token-radius-base` | `rounded-lg` | `<pre>` code block shape |
| `--token-radius-md` | `rounded` | Inline `<code>` shape |
| `--token-duration-fast` | `transition-colors` | Link underline hover transition |

## 5. Props / API

The export is a plain object conforming to `MDXComponents` from `mdx/types`:

```typescript
import type { MDXComponents } from "mdx/types";
export const mdxComponents: MDXComponents = { ... };
```

No runtime props. Pass to `<MDXRemote>`:

```tsx
<MDXRemote source={content} components={mdxComponents} />
```

## 6. States

### Link states
| State | Style |
|---|---|
| **Default** | `text-foreground underline decoration-muted-foreground/30 underline-offset-2` |
| **Hover** | `decoration-foreground` (underline darkens) |

External links (href starts with `http`) automatically get `target="_blank" rel="noopener noreferrer"`.

### Heading spacing
All headings use `mt-10 first:mt-0` (h1, h2) or `mt-8 first:mt-0` (h3) — removes top margin from the first element.

### Lists
`ul` uses `list-disc pl-6 space-y-2`. `ol` uses `list-decimal pl-6 space-y-2`.

### Blockquote
Left-bordered (`border-l-2 border-border`), indented (`pl-6`), italic body copy.

## 7. Code example

```tsx
// app/writing/[slug]/page.tsx
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx-components";

export default async function PostPage({ params }) {
  const post = getPostBySlug(slug);
  return (
    <article className="mt-8">
      <MDXRemote source={post.content} components={mdxComponents} />
    </article>
  );
}
```

## 8. Cross-references

- Used by `app/writing/[slug]/page.tsx` for article rendering
- Used by `app/projects/[slug]/page.tsx` for project content rendering
- `specs/foundations/typography.md` — defines the full type scale these components reference
