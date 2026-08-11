"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { Monitor, Moon, Sun } from "lucide-react";
import { flushSync } from "react-dom";
import { Button } from "@/frontend/components/ui/button";
import { cn } from "@/shared/utils";

const ORDER = ["light", "dark", "system"] as const;
type Mode = (typeof ORDER)[number];

const META: Record<Mode, { label: string; icon: typeof Sun }> = {
  light: { label: "Light", icon: Sun },
  dark: { label: "Dark", icon: Moon },
  system: { label: "System", icon: Monitor },
};

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => {
    ready: Promise<void>;
    finished: Promise<void>;
  };
};

function triangleClipPaths(
  rect: DOMRect,
  viewportWidth: number,
  viewportHeight: number
) {
  const cx = ((rect.left + rect.width / 2) / viewportWidth) * 100;
  const cy = ((rect.top + rect.height / 2) / viewportHeight) * 100;
  const spread = 150;

  return [
    `polygon(${cx}% ${cy}%, ${cx}% ${cy}%, ${cx}% ${cy}%)`,
    `polygon(${cx}% ${cy - spread}%, ${cx - spread}% ${cy + spread}%, ${cx + spread}% ${cy + spread}%)`,
  ] as const;
}

/** Header toggle uses a triangle View Transition between light and dark. */
export function ThemeToggle({ className }: { className?: string }) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const transitionRef = useRef(false);

  useEffect(() => setMounted(true), []);

  const shownMode = (resolvedTheme as "light" | "dark") ?? "light";
  const nextMode = shownMode === "dark" ? "light" : "dark";

  const handleToggle = useCallback(() => {
    if (!mounted || transitionRef.current) return;

    const root = document.documentElement;
    const viewTransitionDocument = document as ViewTransitionDocument;
    const applyTheme = () => {
      root.classList.toggle("dark", nextMode === "dark");
      root.style.colorScheme = nextMode;
      setTheme(nextMode);
    };

    if (
      !buttonRef.current ||
      typeof viewTransitionDocument.startViewTransition !== "function" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      applyTheme();
      return;
    }

    transitionRef.current = true;
    root.dataset.magicuiThemeVt = "active";
    root.style.setProperty("--magicui-theme-toggle-vt-duration", "650ms");

    const rect = buttonRef.current.getBoundingClientRect();
    const transition = viewTransitionDocument.startViewTransition(() => {
      flushSync(applyTheme);
    });

    transition.ready
      .then(() => {
        const [from, to] = triangleClipPaths(
          rect,
          window.innerWidth,
          window.innerHeight
        );

        root.animate(
          { clipPath: [from, to] },
          {
            duration: 650,
            easing: "cubic-bezier(.22,1,.36,1)",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      })
      .catch(() => undefined);

    transition.finished.finally(() => {
      delete root.dataset.magicuiThemeVt;
      root.style.removeProperty("--magicui-theme-toggle-vt-duration");
      transitionRef.current = false;
    });
  }, [mounted, nextMode, setTheme]);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className={cn("h-8 w-8", className)}
        aria-label="Toggle theme"
        disabled
      >
        <Sun className="h-4 w-4" />
      </Button>
    );
  }

  const Icon = shownMode === "dark" ? Moon : Sun;
  const label = `Switch to ${META[nextMode].label} mode (current: ${META[shownMode].label})`;

  return (
    <Button
      ref={buttonRef}
      variant="ghost"
      size="icon"
      className={cn("h-8 w-8", className)}
      aria-label={label}
      title={label}
      onClick={handleToggle}
    >
      <Icon className="h-4 w-4" />
    </Button>
  );
}

/**
 * Full-width footer row for the sidebar: shows the current theme with its
 * icon and name, and cycles on click. Reads as an intentional nav item
 * instead of a bare "Theme" label floating next to a lone icon.
 */
export function ThemeToggleRow() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const current: Mode = mounted ? ((theme as Mode) ?? "system") : "system";
  const idx = ORDER.indexOf(current);
  const next: Mode = ORDER[(idx + 1) % ORDER.length];
  const shownMode =
    current === "system" ? ((resolvedTheme as "light" | "dark") ?? "light") : current;
  const Icon = META[shownMode].icon;

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${META[next].label} mode (current: ${META[current].label})`}
      title={`Switch to ${META[next].label} mode`}
      disabled={!mounted}
      className="group flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border bg-background text-foreground/80 group-hover:text-foreground">
        <Icon className="h-3.5 w-3.5" aria-hidden />
      </span>
      <span className="font-medium">Theme</span>
      <span className="ml-auto text-[0.6875rem] capitalize text-muted-foreground">
        {mounted ? META[current].label : ""}
      </span>
    </button>
  );
}

/** Three-button picker for settings pages. */
export function ThemeSelect() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className="inline-flex items-center gap-1 rounded-lg border bg-background p-1 text-xs"
    >
      {ORDER.map((m) => {
        const Icon = META[m].icon;
        const active = (theme as Mode) === m;
        return (
          <button
            key={m}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => setTheme(m)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 transition-colors",
              active
                ? "bg-primary/15 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Icon className="h-3.5 w-3.5" aria-hidden />
            {META[m].label}
          </button>
        );
      })}
    </div>
  );
}
