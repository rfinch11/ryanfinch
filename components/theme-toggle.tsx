"use client";

import { useState, useRef, useEffect } from "react";
import { useTheme } from "next-themes";
import { Monitor, Moon, Sun, Sunrise, SunMoon } from "lucide-react";

const modes = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "warm-light", label: "Warm Light", icon: Sunrise },
  { value: "warm-dark", label: "Warm Dark", icon: SunMoon },
  { value: "system", label: "System", icon: Monitor },
] as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const current = modes.find((m) => m.value === theme) ?? modes[1];
  const CurrentIcon = current.icon;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="rounded-full border border-border p-2.5 text-muted-foreground transition-colors hover:text-foreground"
        aria-label="Toggle theme"
      >
        <CurrentIcon className="h-4 w-4" />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 flex flex-col gap-1 rounded-xl border border-border bg-background/80 p-1.5 shadow-lg backdrop-blur-md">
          {modes.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              onClick={() => {
                setTheme(value);
                setOpen(false);
              }}
              className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2.5 text-sm transition-colors ${
                theme === value
                  ? "bg-accent text-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
              aria-label={`Switch to ${label} mode`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
