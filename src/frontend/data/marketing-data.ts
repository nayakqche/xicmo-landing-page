import type { ComponentType } from "react";
import { SITE_NAME } from "@/shared/site";
import {
  MAX_PLAN_CREDITS_LABEL,
  MAX_PLAN_PRICE_LABEL,
} from "@/shared/pricing";
import {
  BacklinkLogo,
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

export type AgentCard = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  /** Real channel/brand mark — same logos used inside the product sidebar. */
  icon: ComponentType<{ className?: string }>;
  accent: string;
};

/**
 * ONLY features that are live in the product today — every card here maps
 * 1:1 to a page in the app sidebar. Nothing speculative, no "coming soon".
 */
export const AGENTS: AgentCard[] = [
  {
    id: "seo",
    name: "SEO Agent",
    tagline: "Search-first growth",
    description:
      "Technical audits, keyword opportunities with country-level traffic estimates, and tracked rankings, wired to your real Search Console data.",
    icon: SeoLogo,
    accent: "from-emerald-500/20 to-teal-500/10",
  },
  {
    id: "geo",
    name: "GEO Agent",
    tagline: "AI search visibility",
    description:
      "Checks whether ChatGPT, Perplexity and friends cite your brand, scores it weekly, and tells you exactly what to fix.",
    icon: GeoLogo,
    accent: "from-purple-500/20 to-fuchsia-500/10",
  },
  {
    id: "content",
    name: "AI Content Writer",
    tagline: "Bulk blogs that ship themselves",
    description:
      "Up to 100 keywords per batch, real Pexels imagery, internal links, drip scheduling, and one-click publish to Webflow, WordPress, Wix or Framer.",
    icon: ContentLogo,
    accent: "from-pink-500/20 to-rose-500/10",
  },
  {
    id: "reddit",
    name: "Reddit Sales Agent",
    tagline: "Authentic community reach",
    description:
      "Locks onto your site, finds the subreddits that matter, and drafts human replies for threads where your buyers already hang out.",
    icon: RedditLogo,
    accent: "from-violet-500/20 to-purple-500/10",
  },
  {
    id: "hn",
    name: "Hacker News Agent",
    tagline: "Technical audiences",
    description:
      "Watches HN for threads your product belongs in and drafts comments that do not read like marketing.",
    icon: HackerNewsLogo,
    accent: "from-purple-500/20 to-fuchsia-500/10",
  },
  {
    id: "x",
    name: "X / Twitter Agent",
    tagline: "On-brand social presence",
    description:
      "Generates post and thread drafts in your voice, you edit, approve, and publish from one queue.",
    icon: XLogo,
    accent: "from-sky-500/20 to-blue-500/10",
  },
  {
    id: "linkedin",
    name: "LinkedIn Agent",
    tagline: "Professional positioning",
    description:
      "Paste any company or profile URL, scan its posts, and turn what works into drafts for your own page.",
    icon: LinkedinLogo,
    accent: "from-blue-600/20 to-indigo-500/10",
  },
  {
    id: "youtube",
    name: "YT Creators",
    tagline: "Creator partnerships on YouTube",
    description:
      "A creator search engine for YouTube channels in your niche, audience size, engagement, and contact details included.",
    icon: YoutubeLogo,
    accent: "from-red-500/20 to-rose-500/10",
  },
  {
    id: "instagram",
    name: "Insta Influencers",
    tagline: "Influencer discovery + outreach",
    description:
      "Find fresh creators from seed accounts or keywords, save them into named lists, and DM them with a personalised template.",
    icon: InstagramLogo,
    accent: "from-fuchsia-500/20 to-purple-500/10",
  },
  {
    id: "backlinks",
    name: "Backlink Marketplace",
    tagline: "Backlinks, handled",
    description:
      "Order vetted, high-quality backlinks and track every placement from one dashboard.",
    icon: BacklinkLogo,
    accent: "from-cyan-500/20 to-sky-500/10",
  },
  {
    id: "gsc",
    name: "Search Console",
    tagline: "Your search data, actionable",
    description:
      "Connects your GSC properties so impressions, clicks and ranking movements feed every other agent.",
    icon: GoogleSearchConsoleLogo,
    accent: "from-green-500/20 to-emerald-500/10",
  },
  {
    id: "ga4",
    name: "Google Analytics",
    tagline: "What is working, where to focus",
    description:
      "GA4 traffic, channels, devices and countries, matched per-site so multi-site workspaces never mix numbers.",
    icon: GoogleAnalyticsLogo,
    accent: "from-indigo-500/20 to-purple-500/10",
  },
];

export type CostRow = {
  label: string;
  without: string;
  withUs: string;
};

export const COST_COMPARISON: CostRow[] = [
  { label: "Full time marketing hire", without: "$5,000/mo", withUs: "included" },
  { label: "SEO agency", without: "$4,000/mo", withUs: "included" },
  { label: "Content writer", without: "$1,500/mo", withUs: "included" },
  { label: "Social media manager", without: "$1,500/mo", withUs: "included" },
  { label: "Reddit & community growth", without: "$1,000/mo", withUs: "included" },
  { label: "AI search visibility (GEO)", without: "not possible", withUs: "included" },
  { label: "24/7 availability", without: "not possible", withUs: "included" },
];

export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  {
    q: `What exactly does ${SITE_NAME} do for my business?`,
    a: "It functions as your entire marketing team: it analyzes your website, crafts a positioning strategy, finds relevant Reddit and Hacker News threads, writes blog posts and landing pages, optimizes for SEO and GEO (AI search), manages X/LinkedIn presence, and surfaces the highest-leverage action items every day. You stay in control and approve anything before it publishes.",
  },
  {
    q: "How does the Growth Agent analyze my website?",
    a: "We crawl your site (headings, metadata, schema, copy, page speed signals), pair it with your Google Search Console and Google Analytics data when connected, and then use an LLM to produce a strategy document — industry, ICP, voice, positioning — that every other agent uses as its source of truth.",
  },
  {
    q: "What is the difference between Free and Max?",
    a: `Free includes website analysis, the initial strategy document, Hacker News Agent access, and a small credit allowance. Max (${MAX_PLAN_PRICE_LABEL}/mo) unlocks the full agent suite (SEO, GEO, Content Writer, Reddit, X, LinkedIn, YouTube, Instagram, GSC, GA4), daily scheduled runs, and ${MAX_PLAN_CREDITS_LABEL} monthly credits. Some features have defined usage limits; extra usage can be purchased separately.`,
  },
  {
    q: "How does the Reddit community growth feature work?",
    a: "Connect Reddit via OAuth; the agent monitors subreddits relevant to your ICP, ranks threads by relevance using embeddings, and drafts community-native replies. Nothing is posted automatically — every draft goes into an approval queue first.",
  },
  {
    q: "What SEO capabilities are included?",
    a: "Daily technical audits (broken links, missing meta, schema gaps, slow pages), keyword opportunity discovery, ranking tracking, and AI-generated drafts for blog posts and landing pages targeting those keywords.",
  },
  {
    q: "What is GEO (AI Search Visibility)?",
    a: "GEO = Generative Engine Optimization. We regularly query the major AI answer engines with prompts relevant to your business, check whether your brand is cited, and compute a weekly GEO score so you can see trends and act on gaps.",
  },
  {
    q: "How long until I see results?",
    a: "Action items and drafts start appearing within minutes of onboarding. SEO and GEO improvements compound over weeks as Google and the LLM training data refresh. Most users report noticeable GSC and GEO movement within 2–4 weeks.",
  },
  {
    q: "Does the agent post content automatically?",
    a: "Only if you explicitly enable auto-publish per channel. By default, everything is draft-first: the agent fills an approval queue and you click publish.",
  },
  {
    q: "Can I cancel or change my plan anytime?",
    a: "Yes — manage your subscription from the billing page at any time. No contracts, no cancellation fees.",
  },
];
