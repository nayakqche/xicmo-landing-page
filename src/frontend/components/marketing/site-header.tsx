"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/frontend/components/ui/button";
import { ThemeToggle } from "@/frontend/components/ui/theme-toggle";
import { cn } from "@/shared/utils";
import { Logo } from "./logo";
import { OpenInLlm } from "./open-in-llm";

const NAV_LINKS = [
  { href: "/#agents", label: "Agents" },
  { href: "/pricing", label: "Pricing" },
  { href: "/tools", label: "Free Tools" },
  { href: "/blog", label: "Blog" },
  { href: "/changelog", label: "Changelog" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-3 z-40 w-full px-3 sm:top-4">
      <div className="container">
        <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-3 rounded-full border border-border/60 bg-background/85 px-3 py-2 shadow-lg shadow-foreground/5 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70">
          <div className="flex min-w-0 items-center gap-2">
            <div className="flex h-11 shrink-0 items-center rounded-full bg-card px-3 shadow-sm ring-1 ring-border/60">
              <Logo />
            </div>
            <nav className="hidden items-center gap-1 overflow-hidden rounded-full bg-muted/70 p-1 text-sm font-medium text-muted-foreground ring-1 ring-border/50 md:flex">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 transition-all duration-300 hover:text-foreground",
                    pathname === l.href || (l.href === "/#agents" && pathname === "/")
                      ? "mx-1 bg-background text-foreground shadow-sm"
                      : "hover:bg-background/70"
                  )}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex shrink-0 items-center gap-1.5 rounded-full bg-card/90 p-1.5 shadow-sm ring-1 ring-border/60">
            <Link
              href="/tools/private-chat"
              className="group/private hidden overflow-hidden rounded-full px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground xl:inline-flex"
            >
              <span className="relative block h-4 overflow-hidden leading-4">
                <span className="block transition-all duration-300 group-hover/private:-translate-y-full group-hover/private:opacity-0">
                  Looking for Private Chat?
                </span>
                <span className="absolute left-0 top-full whitespace-nowrap transition-all duration-300 group-hover/private:-translate-y-full">
                  Looking for Private Chat?
                </span>
              </span>
            </Link>
            <OpenInLlm />
            <ThemeToggle className="rounded-full" />
            <Button variant="ghost" size="sm" className="rounded-full" asChild>
              <Link href="/login">Sign in</Link>
            </Button>
            <Button size="sm" className="rounded-full px-4" asChild>
              <Link href="/register">Get started</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
