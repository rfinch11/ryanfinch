# ThemeToggle

## 1. Metadata

| Field | Value |
|---|---|
| **Name** | ThemeToggle |
| **File** | `components/theme-toggle.tsx` |
| **Category** | Settings / Navigation |
| **Status** | Active — used on all pages |
| **Export** | Named: `ThemeToggle` |

## 2. Overview

**When to use:** In the top-right corner of every page header. Provides the user's primary control for switching between the four themes (Light, Dark, Warm Light, Warm Dark) and System preference.

**When not to use:** Do not place inside the FloatingNav. Do not render more than once per page. Do not use as a general dropdown pattern — use `Popover` from `components/ui/popover.tsx` instead.

## 3. Anatomy

```
┌────────────────────────────────────┐
│  [Trigger button — rounded-full]   │
│  [CurrentIcon h-4 w-4]             │
└────────────────────────────────────┘
        ↓ (when open)
┌─────────────────────────────────────┐
│  [Dropdown — rounded-xl, right-0]   │
│  ┌─────────────────────────────────┐│
│  │ ☀ Light                        ││
│  │ ☽ Dark                         ││
│  │ ↑ Warm Light                   ││
│  │ ☾ Warm Dark                    ││
│  │ ⊙ System                       ││
│  └─────────────────────────────────┘│
└─────────────────────────────────────┘
```

Parts:
- **Trigger** — `rounded-full border border-border p-2.5 text-muted-foreground transition-colors hover:text-foreground`
- **Dropdown** — `absolute right-0 top-full mt-2 rounded-xl border border-border bg-background/80 backdrop-blur-md shadow-lg z-50`
- **Mode button** — `flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm transition-colors`
- **Active mode** — `bg-accent text-foreground`
- **Inactive mode** — `text-muted-foreground hover:bg-accent hover:text-foreground`

## 4. Tokens used

| Token | Tailwind class | Usage |
|---|---|---|
| `--token-border-default` | `border-border` | Trigger border and dropdown border |
| `--token-text-muted` | `text-muted-foreground` | Trigger icon default; inactive mode text |
| `--token-text-default` | `text-foreground` | Trigger hover; active mode text |
| `--token-bg-page` | `bg-background/80` | Dropdown background (80% opacity) |
| `--token-bg-accent` | `bg-accent` | Active/hover mode item background |
| `--token-shadow-lg` | `shadow-lg` | Dropdown elevation |
| `--token-radius-full` | `rounded-full` | Trigger button shape |
| `--token-radius-xl` | `rounded-xl` | Dropdown panel shape |
| `--token-radius-base` | `rounded-lg` | Individual mode buttons |
| `--token-z-dropdown` | `z-50` | Dropdown stacking |
| `--token-duration-fast` | `transition-colors` | Hover transitions |

## 5. Props / API

No props. The component reads and writes theme state via `useTheme()` from `next-themes`.

```typescript
// Internal state
const [open, setOpen] = useState(false);

// Available themes
const modes = [
  { value: "light",      label: "Light",      icon: Sun      },
  { value: "dark",       label: "Dark",       icon: Moon     },
  { value: "warm-light", label: "Warm Light", icon: Sunrise  },
  { value: "warm-dark",  label: "Warm Dark",  icon: SunMoon  },
  { value: "system",     label: "System",     icon: Monitor  },
];
```

## 6. States

| State | Description |
|---|---|
| **Default (closed)** | Circular icon button; shows icon for current theme |
| **Trigger hover** | `text-foreground` |
| **Open** | Dropdown visible; outside click closes via mousedown listener |
| **Mode: active** | `bg-accent text-foreground` |
| **Mode: hover** | `hover:bg-accent hover:text-foreground` |
| **Mode: inactive** | `text-muted-foreground` |

## 7. Code example

```tsx
import { ThemeToggle } from "@/components/theme-toggle";

// In a page header:
<header className="flex items-center justify-end">
  <ThemeToggle />
</header>
```

## 8. Cross-references

- **ThemeProvider** (`components/theme-provider.tsx`) — must wrap the app for `useTheme()` to work
- **KeyboardShortcuts** (`components/keyboard-shortcuts.tsx`) — `Shift+T` cycles through themes programmatically
- `app/globals.css` — defines `.dark`, `.warm-light`, `.warm-dark` class-based themes that ThemeProvider applies
