import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/app/theme-provider";
import { AgentationHelper } from "@/frontend/components/agentation-helper";
import { PRODUCT_LINE, SITE_NAME } from "@/shared/site";
import "./globals.css";

/**
 * Root layout for the standalone landing page.
 *
 * This is a TRIMMED copy of the layout in the main Xicmo app. The original
 * also mounts the auth session provider, analytics and cookie consent, all of
 * which reach into the application backend and none of which the landing page
 * needs. Keep those out of this repo: changes made here get carried back into
 * the main app by hand, and a stray backend import is the one thing that will
 * not survive the trip.
 */

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} — ${PRODUCT_LINE}`,
    template: `%s · ${SITE_NAME}`,
  },
  description: `${SITE_NAME} is an ${PRODUCT_LINE}: specialized AI agents for SEO, GEO, social and content, with human approval built in.`,
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${mono.variable} font-sans antialiased`}>
        <ThemeProvider>
          {children}
          <AgentationHelper />
          <Toaster position="top-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
