"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { LockKeyholeOpen } from "lucide-react";

const THEMES = ["light", "warm-light", "dark", "warm-dark", "system"];

const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

const HOTKEYS = [
  { keys: ["shift", "H"], description: "Go home" },
  { keys: ["shift", "W"], description: "Writing" },
  { keys: ["shift", "P"], description: "Projects" },
  { keys: ["shift", "R"], description: "Resume" },
  { keys: ["shift", "T"], description: "Cycle theme" },
  { keys: ["{", "}"], description: "Prev / next" },
  { keys: ["shift", "C"], description: "Contact" },
  { keys: ["?"], description: "This cheat sheet" },
];

interface NavData {
  posts: string[];
  projects: string[];
}

function getAdjacentHref(
  pathname: string,
  navData: NavData | null,
  direction: -1 | 1
): string | null {
  if (!navData) return null;

  const writingMatch = pathname.match(/^\/writing\/(.+)$/);
  if (writingMatch) {
    const idx = navData.posts.indexOf(writingMatch[1]);
    if (idx === -1) return null;
    const next = navData.posts[idx + direction];
    return next ? `/writing/${next}` : null;
  }

  const projectMatch = pathname.match(/^\/projects\/(.+)$/);
  if (projectMatch) {
    const idx = navData.projects.indexOf(projectMatch[1]);
    if (idx === -1) return null;
    const next = navData.projects[idx + direction];
    return next ? `/projects/${next}` : null;
  }

  return null;
}

export function KeyboardShortcuts() {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [navData, setNavData] = useState<NavData | null>(null);
  const [showSheet, setShowSheet] = useState(false);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const konamiIndex = useRef(0);

  useEffect(() => {
    fetch("/api/nav")
      .then((r) => r.json())
      .then(setNavData);
  }, []);


  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        konamiIndex.current = 0;
        return;
      }

      // Konami tracking (ignore bare modifier keypresses)
      if (!["Shift", "Control", "Alt", "Meta"].includes(e.key)) {
        if (e.key === KONAMI[konamiIndex.current]) {
          konamiIndex.current += 1;
          if (konamiIndex.current === KONAMI.length) {
            konamiIndex.current = 0;
            setShowEasterEgg(true);
            setTimeout(() => {
              setShowEasterEgg(false);
              window.open(
                "https://www.figma.com/deck/FiUeGaGXunRqDGrThuqC9s/Case-Studies?node-id=1-42&viewport=-5100%2C11%2C0.34&t=T356xD333D9Z6Y0N-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1",
                "_blank"
              );
            }, 1500);
          }
        } else {
          konamiIndex.current = 0;
          // Check if this key starts the sequence
          if (e.key === KONAMI[0]) konamiIndex.current = 1;
        }
      }

      // ? — toggle cheat sheet
      if (e.key === "?") {
        setShowSheet((s) => !s);
        return;
      }

      // Escape — close cheat sheet
      if (e.key === "Escape") {
        setShowSheet(false);
        return;
      }

      if (!e.shiftKey) return;

      switch (e.key) {
        case "H":
          router.push("/");
          break;
        case "W":
          router.push("/writing");
          break;
        case "P":
          router.push("/projects");
          break;
        case "R":
          router.push("/resume");
          break;
        case "T": {
          const current = THEMES.indexOf(theme ?? "warm-light");
          setTheme(THEMES[(current + 1) % THEMES.length]);
          break;
        }
        case "C":
          window.dispatchEvent(new Event("hotkey:contact"));
          break;
        case "{": {
          const href = getAdjacentHref(pathname, navData, -1);
          if (href) router.push(href);
          break;
        }
        case "}": {
          const href = getAdjacentHref(pathname, navData, 1);
          if (href) router.push(href);
          break;
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [router, theme, setTheme, pathname, navData]);

  return (
    <>
      {/* Cheat sheet overlay */}
      {showSheet && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center"
          onClick={() => setShowSheet(false)}
        >
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
          <div
            className="relative rounded-2xl border border-border bg-background p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="mb-4 text-xs font-medium text-muted-foreground/60">
              Keyboard shortcuts
            </p>
            <div className="flex flex-col gap-2">
              {HOTKEYS.map(({ keys, description }) => (
                <div
                  key={description}
                  className="flex items-center justify-between gap-16"
                >
                  <span className="text-sm text-muted-foreground">
                    {description}
                  </span>
                  <div className="flex items-center gap-1">
                    {keys.map((k) => (
                      <kbd
                        key={k}
                        className="inline-flex min-w-[1.75rem] items-center justify-center rounded-md border border-border bg-muted px-2 py-1.5 font-mono text-sm font-medium text-foreground shadow-[0_2px_0_0_hsl(var(--border))]"
                      >
                        {k}
                      </kbd>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Easter egg */}
      {showEasterEgg && (
        <div className="pointer-events-none fixed inset-0 z-[200] flex items-center justify-center">
          <div className="rounded-2xl border border-border bg-background px-8 py-6 shadow-2xl">
            <div className="flex items-center gap-3">
              <LockKeyholeOpen className="h-5 w-5 text-muted-foreground" />
              <p className="text-sm font-medium text-foreground">
                Top secret archive unlocked
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
