import type { NextConfig } from "next";

/**
 * Minimal config for the standalone landing page.
 *
 * The main Xicmo app's next.config carries redirects, image hosts and headers
 * that only make sense alongside the application routes. Nothing from it is
 * needed to work on this page, so none of it is here.
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
