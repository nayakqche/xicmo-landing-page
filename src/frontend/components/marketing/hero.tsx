import type { ComponentType } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/frontend/components/ui/button";
import { Badge } from "@/frontend/components/ui/badge";
import { AnimatedShinyText } from "@/frontend/components/ui/animated-shiny-text";
import { AuroraBackground } from "@/frontend/components/ui/aurora-background";
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

/** The channels Xicmo actually covers today, rendered as a live logo strip. */
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
    <section className="relative -mt-24 overflow-visible">
      <AuroraBackground className="flex flex-col items-center pt-24">
        <div className="container relative z-10 flex flex-col items-center py-16 text-center md:py-24">
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
            LinkedIn and influencer outreach for you: drafts everything,
            publishes only what you approve.
          </p>

          <div className="mt-8 flex w-full flex-col items-center gap-2">
            <SiteAuditForm compact />
            <p className="text-[0.6875rem] text-muted-foreground">
              Free site audit. No sign-up. Live in 10 seconds
            </p>
          </div>

          <div className="mt-6">
            <Button
              size="xl"
              asChild
              className="group overflow-hidden px-8 md:min-w-56"
            >
              <Link href="/register">
                <span className="relative inline-block overflow-hidden">
                  <span className="flex items-center gap-2 transition-all duration-300 ease-in-out group-hover:-translate-y-full group-hover:opacity-0">
                    <AnimatedShinyText>Get started free</AnimatedShinyText>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                  <span className="absolute left-0 top-full flex items-center gap-2 whitespace-nowrap opacity-0 transition-all duration-300 ease-in-out group-hover:-translate-y-full group-hover:opacity-100">
                    <AnimatedShinyText>Start building growth</AnimatedShinyText>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </span>
              </Link>
            </Button>
          </div>

          <div className="mt-10 w-full max-w-5xl">
            <p className="mb-4 flex items-center justify-center gap-1.5 text-[0.6875rem] font-medium uppercase tracking-widest text-muted-foreground">
              <Sparkles className="h-3 w-3 text-primary" />
              One workspace, every channel
            </p>
            <div className="channel-carousel mask-fade-x">
              <div className="channel-carousel-track">
              {[...CHANNELS, ...CHANNELS].map(({ label, Icon }, index) => (
                <span
                  key={`${label}-${index}`}
                  className="channel-carousel-item group/ch inline-flex items-center gap-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  title={label}
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border bg-card/85 shadow-sm transition-transform duration-300 group-hover/ch:-translate-y-1">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span>{label}</span>
                </span>
              ))}
              </div>
            </div>
          </div>
        </div>
      </AuroraBackground>
    </section>
  );
}
