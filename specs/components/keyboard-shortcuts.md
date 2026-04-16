# KeyboardShortcuts

## 1. Metadata

| Field | Value |
|---|---|
| **Name** | KeyboardShortcuts |
| **File** | `components/keyboard-shortcuts.tsx` |
| **Category** | Utility / Overlays |
| **Status** | Active — mounted once in `app/layout.tsx` |
| **Export** | Named: `KeyboardShortcuts` |

## 2. Overview

**When to use:** Mounted once at the root layout level (`app/layout.tsx`). Provides global keyboard shortcuts for navigation, theme cycling, and a cheat sheet overlay. Also implements the Konami code easter egg.

**When not to use:** Never render more than once. Never render on a per-page basis — it is a layout-level singleton.

## 3. Anatomy

The component renders nothing visible by default. It conditionally renders two overlays:

### Cheat sheet overlay (triggered by `?`)

```
┌─────────────────────────────────────────────────────────┐
│  [Full-screen backdrop — bg-background/80 backdrop-blur]│
│                                                         │
│  ┌───────────────────────────────────────────┐          │
│  │  "Keyboard shortcuts"                      │          │
│  │  ┌────────────────────────┬────────────┐   │          │
│  │  │ Go home                │ [shift][H] │   │          │
│  │  │ Writing                │ [shift][W] │   │          │
│  │  │ ...                    │ ...        │   │          │
│  │  └────────────────────────┴────────────┘   │          │
│  └───────────────────────────────────────────┘          │
└─────────────────────────────────────────────────────────┘
```

### Easter egg panel (triggered by Konami code)

```
┌──────────────────────────────────────────────────┐
│  [Centered panel — rounded-2xl, shadow-2xl]       │
│  🔓  Top secret archive unlocked                  │
└──────────────────────────────────────────────────┘
```

Parts:
- **Backdrop** — `fixed inset-0 z-[200] flex items-center justify-center`
- **Overlay bg** — `absolute inset-0 bg-background/80 backdrop-blur-sm`
- **Cheat sheet card** — `relative rounded-2xl border border-border bg-background p-8 shadow-2xl`
- **Shortcut row** — `flex items-center justify-between gap-16`
- **Kbd key** — `rounded-md border border-border bg-muted px-2 py-1.5 font-mono text-sm font-medium text-foreground shadow-[0_2px_0_0_hsl(var(--border))]`
- **Section header** — `text-xs font-medium text-muted-foreground/60`

## 4. Tokens used

| Token | Tailwind class | Usage |
|---|---|---|
| `--token-overlay` | `bg-background/80` | Overlay backdrop |
| `--token-bg-page` | `bg-background` | Cheat sheet card and easter egg background |
| `--token-border-default` | `border-border` | Card border, kbd border |
| `--token-bg-muted` | `bg-muted` | Kbd key background |
| `--token-text-default` | `text-foreground` | Kbd text, easter egg text |
| `--token-text-muted` | `text-muted-foreground` | Shortcut descriptions, section header |
| `--token-shadow-2xl` | `shadow-2xl` | Card elevation |
| `--token-shadow-key` | `shadow-[0_2px_0_0_hsl(var(--border))]` | Kbd press effect |
| `--token-radius-2xl` | `rounded-2xl` | Card and easter egg panel shape |
| `--token-radius-md` | `rounded-md` | Kbd key shape |
| `--token-z-overlay` | `z-[200]` | Above all other UI |

## 5. Props / API

No props. All behaviour is driven by:
- `useRouter()` — for navigation shortcuts
- `usePathname()` — for prev/next article navigation
- `useTheme()` — for theme cycling
- `/api/nav` fetch — loads `posts` and `projects` slugs for `{`/`}` navigation

### Hotkeys defined

| Key | Action |
|---|---|
| `?` | Toggle cheat sheet |
| `Escape` | Close cheat sheet |
| `Shift+H` | Navigate to `/` |
| `Shift+W` | Navigate to `/writing` |
| `Shift+P` | Navigate to `/projects` |
| `Shift+R` | Navigate to `/resume` |
| `Shift+T` | Cycle to next theme |
| `Shift+{` | Navigate to previous article/project |
| `Shift+}` | Navigate to next article/project |
| `Shift+C` | Open Contact popover (dispatches `hotkey:contact`) |
| Konami code | Open secret archive in new tab (1.5s delay) |

## 6. States

| State | Description |
|---|---|
| **Idle** | No visible UI rendered |
| **Cheat sheet open** | Full-screen overlay with shortcut list; click backdrop or Escape to close |
| **Easter egg active** | Centered panel visible for 1500ms, then auto-dismisses and opens Figma link |

## 7. Code example

```tsx
// In app/layout.tsx (already in place):
import { KeyboardShortcuts } from "@/components/keyboard-shortcuts";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider ...>
          <KeyboardShortcuts />  {/* ← singleton, renders here */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

## 8. Cross-references

- **FloatingNav** (`components/floating-nav.tsx`) — listens for `hotkey:contact` event to open Contact popover
- **HotkeyHint** (`components/hotkey-hint.tsx`) — displays the `Shift ?` hint on the homepage; separate component
- **ThemeProvider** (`components/theme-provider.tsx`) — provides the `useTheme` context
- `app/api/nav/route.ts` — returns `{ posts: string[], projects: string[] }` for prev/next navigation
