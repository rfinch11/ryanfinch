# Token Reference

Master map of every CSS custom property in the project. Includes raw globals.css values, Layer 1 primitives, and Layer 2 alias tokens.

---

## 1. globals.css — Theme Variables

### :root (light mode — neutral)

| Variable | Value | Role |
|---|---|---|
| `--radius` | `0.625rem` | Base radius |
| `--background` | `oklch(1 0 0)` | Page background |
| `--foreground` | `oklch(0.145 0 0)` | Default text |
| `--card` | `oklch(1 0 0)` | Card surface |
| `--card-foreground` | `oklch(0.145 0 0)` | Card text |
| `--popover` | `oklch(1 0 0)` | Popover surface |
| `--popover-foreground` | `oklch(0.145 0 0)` | Popover text |
| `--primary` | `oklch(0.205 0 0)` | Primary action colour |
| `--primary-foreground` | `oklch(0.985 0 0)` | Text on primary |
| `--secondary` | `oklch(0.97 0 0)` | Secondary surface |
| `--secondary-foreground` | `oklch(0.205 0 0)` | Text on secondary |
| `--muted` | `oklch(0.97 0 0)` | Muted surface (code, kbd bg) |
| `--muted-foreground` | `oklch(0.556 0 0)` | Subdued text |
| `--accent` | `oklch(0.97 0 0)` | Hover background |
| `--accent-foreground` | `oklch(0.205 0 0)` | Text on accent hover |
| `--destructive` | `oklch(0.577 0.245 27.325)` | Error / danger |
| `--border` | `oklch(0.922 0 0)` | Border colour |
| `--input` | `oklch(0.922 0 0)` | Input border colour |
| `--ring` | `oklch(0.708 0 0)` | Focus ring colour |
| `--chart-1` | `oklch(0.646 0.222 41.116)` | Chart colour 1 (warm orange) |
| `--chart-2` | `oklch(0.6 0.118 184.704)` | Chart colour 2 (teal) |
| `--chart-3` | `oklch(0.398 0.07 227.392)` | Chart colour 3 (slate blue) |
| `--chart-4` | `oklch(0.828 0.189 84.429)` | Chart colour 4 (yellow) |
| `--chart-5` | `oklch(0.769 0.188 70.08)` | Chart colour 5 (amber) |
| `--sidebar` | `oklch(0.985 0 0)` | Sidebar background |
| `--sidebar-foreground` | `oklch(0.145 0 0)` | Sidebar text |
| `--sidebar-primary` | `oklch(0.205 0 0)` | Sidebar primary |
| `--sidebar-primary-foreground` | `oklch(0.985 0 0)` | Sidebar primary text |
| `--sidebar-accent` | `oklch(0.97 0 0)` | Sidebar hover |
| `--sidebar-accent-foreground` | `oklch(0.205 0 0)` | Sidebar hover text |
| `--sidebar-border` | `oklch(0.922 0 0)` | Sidebar border |
| `--sidebar-ring` | `oklch(0.708 0 0)` | Sidebar focus ring |

### .dark (neutral dark mode)

| Variable | Value |
|---|---|
| `--background` | `oklch(0.145 0 0)` |
| `--foreground` | `oklch(0.985 0 0)` |
| `--card` | `oklch(0.205 0 0)` |
| `--card-foreground` | `oklch(0.985 0 0)` |
| `--popover` | `oklch(0.205 0 0)` |
| `--popover-foreground` | `oklch(0.985 0 0)` |
| `--primary` | `oklch(0.922 0 0)` |
| `--primary-foreground` | `oklch(0.205 0 0)` |
| `--secondary` | `oklch(0.269 0 0)` |
| `--secondary-foreground` | `oklch(0.985 0 0)` |
| `--muted` | `oklch(0.269 0 0)` |
| `--muted-foreground` | `oklch(0.708 0 0)` |
| `--accent` | `oklch(0.269 0 0)` |
| `--accent-foreground` | `oklch(0.985 0 0)` |
| `--destructive` | `oklch(0.704 0.191 22.216)` |
| `--border` | `oklch(1 0 0 / 10%)` |
| `--input` | `oklch(1 0 0 / 15%)` |
| `--ring` | `oklch(0.556 0 0)` |
| `--chart-1` | `oklch(0.488 0.243 264.376)` |
| `--chart-2` | `oklch(0.696 0.17 162.48)` |
| `--chart-3` | `oklch(0.769 0.188 70.08)` |
| `--chart-4` | `oklch(0.627 0.265 303.9)` |
| `--chart-5` | `oklch(0.645 0.246 16.439)` |
| `--sidebar` | `oklch(0.205 0 0)` |
| `--sidebar-primary` | `oklch(0.488 0.243 264.376)` |

### .warm-light (default theme — warm off-white)

| Variable | Value |
|---|---|
| `--background` | `oklch(0.97 0.012 80)` |
| `--foreground` | `oklch(0.2 0.02 60)` |
| `--primary` | `oklch(0.25 0.025 65)` |
| `--primary-foreground` | `oklch(0.96 0.015 80)` |
| `--muted` | `oklch(0.93 0.02 80)` |
| `--muted-foreground` | `oklch(0.5 0.03 70)` |
| `--accent` | `oklch(0.93 0.025 78)` |
| `--border` | `oklch(0.88 0.025 78)` |
| `--input` | `oklch(0.88 0.025 78)` |
| `--ring` | `oklch(0.65 0.04 75)` |

### .warm-dark (warm charcoal)

| Variable | Value |
|---|---|
| `--background` | `oklch(0.16 0.015 75)` |
| `--foreground` | `oklch(0.95 0.015 80)` |
| `--card` | `oklch(0.2 0.018 75)` |
| `--primary` | `oklch(0.88 0.04 80)` |
| `--muted` | `oklch(0.25 0.02 75)` |
| `--muted-foreground` | `oklch(0.65 0.03 80)` |
| `--border` | `oklch(0.9 0.04 80 / 12%)` |
| `--input` | `oklch(0.9 0.04 80 / 18%)` |

---

## 2. globals.css — @theme inline (Tailwind v4 mapping)

These map shadcn CSS properties to Tailwind's `--color-*` namespace, making them available as Tailwind utility classes:

| @theme variable | Maps to | Tailwind class |
|---|---|---|
| `--color-background` | `var(--background)` | `bg-background` |
| `--color-foreground` | `var(--foreground)` | `text-foreground` |
| `--color-primary` | `var(--primary)` | `bg-primary`, `text-primary` |
| `--color-primary-foreground` | `var(--primary-foreground)` | `text-primary-foreground` |
| `--color-muted` | `var(--muted)` | `bg-muted` |
| `--color-muted-foreground` | `var(--muted-foreground)` | `text-muted-foreground` |
| `--color-accent` | `var(--accent)` | `bg-accent` |
| `--color-accent-foreground` | `var(--accent-foreground)` | `text-accent-foreground` |
| `--color-border` | `var(--border)` | `border-border` |
| `--color-input` | `var(--input)` | `border-input` |
| `--color-ring` | `var(--ring)` | `ring-ring` |
| `--color-destructive` | `var(--destructive)` | `text-destructive` |
| `--color-card` | `var(--card)` | `bg-card` |
| `--color-card-foreground` | `var(--card-foreground)` | `text-card-foreground` |
| `--color-popover` | `var(--popover)` | `bg-popover` |
| `--color-popover-foreground` | `var(--popover-foreground)` | `text-popover-foreground` |
| `--color-secondary` | `var(--secondary)` | `bg-secondary` |
| `--color-secondary-foreground` | `var(--secondary-foreground)` | `text-secondary-foreground` |
| `--font-display` | `"Jubel", serif` | `font-display` |
| `--font-sans` | `var(--font-geist-sans)` | `font-sans` |
| `--font-mono` | `var(--font-geist-mono)` | `font-mono` |
| `--radius-sm` | `calc(var(--radius) - 4px)` | `rounded-sm` |
| `--radius-md` | `calc(var(--radius) - 2px)` | `rounded-md` |
| `--radius-lg` | `var(--radius)` | `rounded-lg` |
| `--radius-xl` | `calc(var(--radius) + 4px)` | `rounded-xl` |
| `--radius-2xl` | `calc(var(--radius) + 8px)` | `rounded-2xl` |
| `--radius-3xl` | `calc(var(--radius) + 12px)` | `rounded-3xl` |
| `--radius-4xl` | `calc(var(--radius) + 16px)` | `rounded-4xl` |

---

## 3. tokens.css Layer 2 — Project Alias Tokens

### Color tokens

| Token | Resolves via | When to use |
|---|---|---|
| `--token-bg-page` | `--background` | Body/page background in custom CSS |
| `--token-bg-card` | `--card` | Card surface backgrounds |
| `--token-bg-popover` | `--popover` | Dropdown/popover surfaces |
| `--token-bg-muted` | `--muted` | Code blocks, kbd backgrounds |
| `--token-bg-accent` | `--accent` | Hover/selected item backgrounds |
| `--token-text-default` | `--foreground` | Primary readable text |
| `--token-text-muted` | `--muted-foreground` | Secondary, helper, placeholder text |
| `--token-text-on-primary` | `--primary-foreground` | Text on primary-coloured buttons/badges |
| `--token-link-text` | `--foreground` | Inline link text colour |
| `--token-link-decoration` | 30% `--muted-foreground` | Default underline tint |
| `--token-link-decoration-hover` | `--foreground` | Underline on hover |
| `--token-border-default` | `--border` | Visible borders and dividers |
| `--token-border-ring` | `--ring` | Focus rings |
| `--token-badge-bg` | `--primary` | "NEW" badge background |
| `--token-badge-text` | `--primary-foreground` | "NEW" badge text |
| `--token-overlay` | 80% `--background` | Lightbox/modal backdrops |
| `--token-color-primary` | `--primary` | Primary interactive colour |
| `--token-color-destructive` | `--destructive` | Error/danger states |

### Spacing tokens

| Token | Value | Use when |
|---|---|---|
| `--token-space-1` | 0.25rem | Tiny gaps (nav item separators, badge padding) |
| `--token-space-2` | 0.5rem | Icon padding, tight gaps |
| `--token-space-3` | 0.75rem | Icon button padding |
| `--token-space-4` | 1rem | Standard padding and gaps |
| `--token-space-6` | 1.5rem | Section gaps, card padding |
| `--token-space-8` | 2rem | Larger section separation |
| `--token-space-12` | 3rem | Page section top offsets |
| `--token-space-16` | 4rem | Column gaps, page vertical padding |
| `--token-space-24` | 6rem | Major section vertical rhythm |
| `--token-space-page-x-sm` | 1.5rem | Mobile horizontal page inset |
| `--token-space-page-x-md` | 3rem | sm: horizontal page inset |
| `--token-space-page-x-lg` | 6rem | md: horizontal page inset |
| `--token-space-page-x-xl` | 8rem | lg: horizontal page inset |
| `--token-space-page-y` | 4rem | Page vertical padding (py-16) |
| `--token-space-section-y` | 6rem | Main section rhythm (py-24) |

### Typography tokens

| Token | Value | Use when |
|---|---|---|
| `--token-font-display` | `"Jubel", serif` | Wordmarks, company names in font-display |
| `--token-font-sans` | Geist Sans | Body copy default |
| `--token-font-mono` | Geist Mono | Code, kbd keys |
| `--token-size-32` | 2rem | Page-level h1 headings |
| `--token-size-16` | 1rem | Body text default |
| `--token-size-14` | 0.875rem | UI labels, captions |
| `--token-size-12` | 0.75rem | Sidebar section headers |
| `--token-size-10` | 0.625rem | "NEW" badge only |
| `--token-weight-regular` | 400 | Copy text, display font |
| `--token-weight-medium` | 500 | Labels, kbd |
| `--token-weight-semibold` | 600 | Sub-headings |
| `--token-weight-bold` | 700 | Large headings |

### Radius tokens

| Token | Value | Use when |
|---|---|---|
| `--token-radius-md` | ~8px | Kbd keys, list item links |
| `--token-radius-base` | 10px | Standard card/button rounding |
| `--token-radius-xl` | 14px | Gallery items, lightbox panels |
| `--token-radius-2xl` | 18px | Modal/overlay cards |
| `--token-radius-full` | 9999px | Pills, avatars, icon buttons |

### Elevation tokens

| Token | Tailwind | Use when |
|---|---|---|
| `--token-shadow-md` | `shadow-md` | Popover panels |
| `--token-shadow-lg` | `shadow-lg` | Floating nav, dropdowns |
| `--token-shadow-2xl` | `shadow-2xl` | Full-screen overlays |
| `--token-shadow-key` | `shadow-[0_2px_0_0_...]` | Keyboard key press effect |

### Z-index tokens

| Token | Value | Use when |
|---|---|---|
| `--token-z-raised` | 10 | Sticky overlaying elements within page flow |
| `--token-z-dropdown` | 50 | Popovers, floating elements, lightbox |
| `--token-z-overlay` | 200 | Full-screen interruptions |

### Motion tokens

| Token | Value | Use when |
|---|---|---|
| `--token-duration-fast` | 150ms | Colour state changes |
| `--token-duration-normal` | 200ms | Transform/opacity animations |
| `--token-duration-slow` | 300ms | Structural layout changes |
| `--token-easing-default` | `ease` | Standard interactive elements |
| `--token-easing-out` | `ease-out` | Expanding containers |
