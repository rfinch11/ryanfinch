export function HotkeyHint() {
  return (
    <div className="flex items-center gap-1">
      {["shift", "?"].map((k) => (
        <kbd
          key={k}
          className="inline-flex min-w-[1.75rem] items-center justify-center rounded-md border border-border bg-muted px-2 py-1.5 font-mono text-sm font-medium text-muted-foreground shadow-[0_2px_0_0_hsl(var(--border))]"
        >
          {k}
        </kbd>
      ))}
    </div>
  );
}
