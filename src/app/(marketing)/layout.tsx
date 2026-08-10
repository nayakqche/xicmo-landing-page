import { SiteHeader } from "@/frontend/components/marketing/site-header";
import { SiteFooter } from "@/frontend/components/marketing/site-footer";
import { SITE_NAME, PRODUCT_LINE } from "@/shared/site";
import {
  MAX_PLAN_CREDITS_LABEL,
  MAX_PLAN_PRICE_USD,
} from "@/shared/pricing";

/**
 * Marketing shell: header, footer and the structured data.
 *
 * Identical to the main app's version except for one line — the base URL is
 * read straight from `process.env.NEXT_PUBLIC_APP_URL` instead of through the
 * app's validated `@/shared/env` module, which imports the whole server-side
 * environment schema and does not belong in a frontend-only repo.
 *
 * NOTE: `NEXT_PUBLIC_*` must be read as a literal member access for Next.js to
 * inline it into the build. Destructuring `process.env` leaves it undefined in
 * the browser.
 */
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://xicmo.com";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const base = APP_URL.replace(/\/$/, "");
  // Organization + WebSite structured data on every marketing page —
  // the single highest-leverage GEO/AEO signal for LLM crawlers and
  // Google rich results. Facts only; nothing invented.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${base}/#organization`,
        name: SITE_NAME,
        url: `${base}/`,
        logo: `${base}/icon`,
        description: `${SITE_NAME} is an ${PRODUCT_LINE}: specialized AI agents for SEO, GEO, social, and content with human approval built in.`,
      },
      {
        "@type": "WebSite",
        "@id": `${base}/#website`,
        name: SITE_NAME,
        url: `${base}/`,
        publisher: { "@id": `${base}/#organization` },
      },
      {
        "@type": "SoftwareApplication",
        name: SITE_NAME,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        url: `${base}/`,
        offers: {
          "@type": "Offer",
          price: String(MAX_PLAN_PRICE_USD),
          priceCurrency: "USD",
          description: `Max plan: ${MAX_PLAN_CREDITS_LABEL} credits per month`,
        },
      },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
