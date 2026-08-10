import Link from "next/link";
import { cn } from "@/shared/utils";

/**
 * Xicmo brand gradient — kept in sync with the favicon / apple-icon / OG
 * routes (src/app/icon.tsx, apple-icon.tsx, opengraph-image.tsx) so the
 * in-app mark, the browser-tab icon, and share previews all match.
 */
export const BRAND_GRADIENT =
  "linear-gradient(135deg, #7b2ff7 0%, #a920e0 50%, #d926d9 100%)";

/**
 * The Xicmo logo — the uploaded brand mark from /public. Backgrounds are
 * transparent so it drops onto any surface, and there are two wordmark
 * variants because the "ICMO" text is black:
 *   - /logo.png       black ICMO, shown on LIGHT surfaces
 *   - /logo-dark.png  white ICMO, shown on DARK surfaces
 *   - /logo-mark.png  just the purple tile (theme-agnostic), used when the
 *                     wordmark is hidden (collapsed sidebar, square cards).
 *
 * `showWordmark=false` renders only the square mark.
 */
export function Logo({
  className,
  showWordmark = true,
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  if (!showWordmark) {
    return (
      <Link
        href="/"
        aria-label="Xicmo home"
        className={cn("inline-flex shrink-0 items-center", className)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo-mark.png"
          alt="Xicmo"
          className="h-8 w-8 object-contain"
        />
      </Link>
    );
  }

  return (
    <Link
      href="/"
      aria-label="Xicmo home"
      className={cn("inline-flex shrink-0 items-center", className)}
    >
      {/* Light surfaces: original black wordmark. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.png"
        alt="Xicmo"
        className="h-8 w-auto object-contain dark:hidden"
      />
      {/* Dark surfaces: white wordmark. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo-dark.png"
        alt="Xicmo"
        className="hidden h-8 w-auto object-contain dark:block"
      />
    </Link>
  );
}
