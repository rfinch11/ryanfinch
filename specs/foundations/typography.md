# Typography Foundation

## Overview

The project uses a three-family system (display, sans, mono) with a comprehensive utility-class scale defined via `@utility` in `globals.css`. The scale is described as "Geist-inspired" and covers three semantic categories: **headings**, **copy** (body text), and **labels** (UI text).

## Font families

| Token | Value | Usage |
|---|---|---|
| `--token-font-display` | `"Jubel", serif` | Site wordmark ("FINCH"), company names in timeline |
| `--token-font-sans` | Geist Sans, system-ui | All body copy, UI, navigation |
| `--token-font-mono` | Geist Mono, ui-monospace | Code blocks, `<kbd>` keys |

**Jubel** is a custom local font loaded via `@font-face` in `globals.css` from `/fonts/Jubel-Regular.otf` at `font-weight: 400`. It is always used with `font-normal` (400 weight) and typically in uppercase.

**Geist Sans** and **Geist Mono** are loaded from Google Fonts via `next/font/google` in `app/layout.tsx` and injected as CSS variables `--font-geist-sans` and `--font-geist-mono`.

## Type scale — @utility classes

These classes are defined with `@utility` in `globals.css` and are available as Tailwind utilities directly in JSX.

### Headings

| Class | font-size | line-height | letter-spacing | font-weight |
|---|---|---|---|---|
| `text-heading-96` | 6rem (96px) | 1.05 | 0 | 700 |
| `text-heading-72` | 4.5rem (72px) | 1.1 | 0 | 700 |
| `text-heading-64` | 4rem (64px) | 1.1 | -0.04em | 700 |
| `text-heading-56` | 3.5rem (56px) | 1.12 | -0.035em | 700 |
| `text-heading-48` | 3rem (48px) | 1.15 | -0.03em | 600 |
| `text-heading-40` | 2.5rem (40px) | 1.2 | -0.025em | 600 |
| `text-heading-32` | 2rem (32px) | 1.25 | -0.02em | 600 |
| `text-heading-24` | 1.5rem (24px) | 1.33 | -0.015em | 600 |
| `text-heading-20` | 1.25rem (20px) | 1.4 | -0.01em | 600 |
| `text-heading-16` | 1rem (16px) | 1.5 | -0.005em | 600 |
| `text-heading-14` | 0.875rem (14px) | 1.43 | 0 | 600 |

### Copy (body text)

| Class | font-size | line-height | letter-spacing | font-weight |
|---|---|---|---|---|
| `text-copy-24` | 1.5rem (24px) | 1.5 | -0.01em | 400 |
| `text-copy-20` | 1.25rem (20px) | 1.5 | -0.005em | 400 |
| `text-copy-18` | 1.125rem (18px) | 1.55 | 0 | 400 |
| `text-copy-16` | 1rem (16px) | 1.6 | 0 | 400 |
| `text-copy-14` | 0.875rem (14px) | 1.6 | 0 | 400 |
| `text-copy-13` | 0.8125rem (13px) | 1.55 | 0 | 400 |

### Labels (UI text)

| Class | font-size | line-height | letter-spacing | font-weight |
|---|---|---|---|---|
| `text-label-20` | 1.25rem (20px) | 1.4 | 0 | 500 |
| `text-label-16` | 1rem (16px) | 1.5 | 0 | 500 |
| `text-label-14` | 0.875rem (14px) | 1.43 | 0 | 500 |
| `text-label-13` | 0.8125rem (13px) | 1.38 | 0 | 500 |
| `text-label-12` | 0.75rem (12px) | 1.33 | 0 | 500 |

## Usage patterns

### When to use each category

- **Headings** (`text-heading-*`): Page titles, section titles, company names, structured content hierarchy.
- **Copy** (`text-copy-*`): Prose paragraphs, descriptions, MDX article content, captions.
- **Labels** (`text-label-*`): Navigation items, badge text, dates, metadata, UI controls.

### Current usage by size

| Size | Used as |
|---|---|
| `text-heading-72` | Homepage hero wordmark ("FINCH") |
| `text-heading-32` | Page-level headings, logo header link, company names in timeline |
| `text-heading-24` | H2 in MDX articles |
| `text-heading-20` | H3 in MDX articles |
| `text-copy-16` | Body text, MDX paragraphs, homepage bio |
| `text-copy-14` | Sub-descriptions, gallery captions, timeline detail text |
| `text-label-14` | Date ranges, location tags, keyboard shortcut descriptions |
| `text-label-12` | Section headers in sidebar, "Writing" / "Highlights" uppercase labels |

### Hardcoded arbitrary values

Two locations use `text-[10px]` for the "NEW" badge:
- `components/floating-nav.tsx:153`
- `components/writing-sidebar.tsx:28,58`
- `app/writing/page.tsx:28`

This maps to `--token-size-10` (0.625rem). The badge is a special case where 10px is intentionally smaller than any named label size.

## Font weight reference

The project uses three semantic weights:

| Weight | Token | Classes | Usage |
|---|---|---|---|
| 400 | `--token-weight-regular` | `font-normal` | Copy, display/wordmark |
| 500 | `--token-weight-medium` | `font-medium` | Labels, kbd text |
| 600 | `--token-weight-semibold` | `font-semibold` | Headings 48px and below, badge text |
| 700 | `--token-weight-bold` | `font-bold` | Large headings 56px and above, timeline title bold |

## Letter spacing convention

Larger headings use negative letter spacing to maintain optical density at large sizes (Geist-inspired approach):

- 72px+: no tracking (0) — extreme sizes don't need tightening
- 64–56px: `-0.04em` to `-0.035em`
- 48–40px: `-0.03em` to `-0.025em`
- 32–20px: `-0.02em` to `-0.01em`
- 16px and below: 0 or very slight

**Exception:** uppercase labels with `tracking-wider` (`0.05em`) — used on "Writing" and "Highlights" section headers in the sidebar and timeline.
