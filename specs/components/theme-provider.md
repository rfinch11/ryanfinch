# ThemeProvider

## 1. Metadata

| Field | Value |
|---|---|
| **Name** | ThemeProvider |
| **File** | `components/theme-provider.tsx` |
| **Category** | Context / Infrastructure |
| **Status** | Active — wraps entire app in `app/layout.tsx` |
| **Export** | Named: `ThemeProvider` |

## 2. Overview

**When to use:** Once, at the root layout level. Provides the `next-themes` context that powers `useTheme()`, `ThemeToggle`, and `KeyboardShortcuts` theme cycling.

**When not to use:** Never render more than once. Never use as a section-level wrapper.

## 3. Anatomy

A thin wrapper over `NextThemesProvider` that passes all props through. No visual rendering.

## 4. Tokens used

None directly. This component enables the theme system that makes all `--token-*` variables resolve correctly.

## 5. Props / API

Accepts all props from `NextThemesProvider` (from `next-themes`). Current configuration in `app/layout.tsx`:

```tsx
<ThemeProvider
  attribute="class"           // applies theme as a class on <html>
  defaultTheme="warm-light"   // default: warm sepia light theme
  themes={["light", "dark", "warm-light", "warm-dark", "system"]}
  enableSystem                // allows "system" to follow OS preference
  disableTransitionOnChange   // prevents flash/transition on initial load
>
```

## 6. States

Not applicable — infrastructure component with no visual states.

## 7. Code example

```tsx
// app/layout.tsx (already in place):
import { ThemeProvider } from "@/components/theme-provider";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="warm-light"
          themes={["light", "dark", "warm-light", "warm-dark", "system"]}
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

The `suppressHydrationWarning` on `<html>` is required because `next-themes` modifies the class server-side vs. client-side.

## 8. Cross-references

- **ThemeToggle** (`components/theme-toggle.tsx`) — consumes `useTheme()`
- **KeyboardShortcuts** (`components/keyboard-shortcuts.tsx`) — consumes `useTheme()` for `Shift+T` cycling
- `app/globals.css` — defines the `.dark`, `.warm-light`, `.warm-dark` CSS classes that `next-themes` applies
