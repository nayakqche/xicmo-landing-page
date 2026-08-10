import type { ComponentType } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/frontend/components/ui/button";
import { Badge } from "@/frontend/components/ui/badge";
import { SiteAuditForm } from "@/frontend/components/marketing/site-audit-form";
import { SITE_NAME } from "@/shared/site";
import {
  ContentLogo,
  GeoLogo,
  GoogleAnalyticsLogo,
  GoogleSearchConsoleLogo,
  HackerNewsLogo,
  InstagramLogo,
  LinkedinLogo,
  RedditLogo,
  SeoLogo,
  XLogo,
  YoutubeLogo,
} from "@/frontend/components/brand-logos";

/** The channels Xicmo actually covers today — rendered as a live logo strip. */
const CHANNELS: Array<{
  label: string;
  Icon: ComponentType<{ className?: string }>;
}> = [
  { label: "SEO", Icon: SeoLogo },
  { label: "GEO", Icon: GeoLogo },
  { label: "Content", Icon: ContentLogo },
  { label: "Reddit", Icon: RedditLogo },
  { label: "Hacker News", Icon: HackerNewsLogo },
  { label: "X", Icon: XLogo },
  { label: "LinkedIn", Icon: LinkedinLogo },
  { label: "YouTube", Icon: YoutubeLogo },
  { label: "Instagram", Icon: InstagramLogo },
  { label: "Search Console", Icon: GoogleSearchConsoleLogo },
  { label: "Analytics", Icon: GoogleAnalyticsLogo },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-radial-fade"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]"
      />
      {/* Brand glow — echoes the purple X tile of the logo. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-10 -z-10 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-purple-600/20 via-fuchsia-500/10 to-primary/20 blur-3xl"
      />

      <div className="container flex flex-col items-center py-20 text-center md:py-28">
        <Badge
          variant="outline"
          className="mb-6 gap-1.5 border-primary/30 bg-primary/5 text-primary"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          12 agents live right now
        </Badge>

        <h1 className="max-w-4xl text-balance text-4xl font-semibold tracking-tight md:text-6xl lg:text-7xl">
          Your marketing team,
          <br />
          <span className="text-gradient">minus the headcount.</span>
        </h1>

        <p className="mt-6 max-w-2xl text-balance text-base text-muted-foreground md:text-lg">
          {SITE_NAME} runs SEO, AI-search visibility, content, Reddit, X,
          LinkedIn and influencer outreach for you — drafts everything,
          publishes only what you approve.
        </p>

        <div className="mt-10 flex w-full flex-col items-center gap-2">
          <SiteAuditForm compact />
          <p className="text-[0.6875rem] text-muted-foreground">
            Free site audit · no sign-up · live in 10 seconds
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button size="xl" asChild className="group">
            <Link href="/register">
              Get started free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
          <Button size="xl" variant="outline" asChild>
            <Link href="#agents">See what it does</Link>
          </Button>
        </div>

        {/* Live channel strip — real brand marks for every live channel. */}
        <div className="mt-14 w-full max-w-4xl">
          <p className="mb-4 flex items-center justify-center gap-1.5 text-[0.6875rem] font-medium uppercase tracking-widest text-muted-foreground">
            <Sparkles className="h-3 w-3 text-primary" />
            One workspace, every channel
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
            {CHANNELS.map(({ label, Icon }) => (
              <span
                key={label}
                className="group/ch inline-flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
                title={label}
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg border bg-card/80 shadow-sm transition-transform duration-200 group-hover/ch:-translate-y-0.5">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="hidden sm:inline">{label}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
