import { NextResponse } from "next/server";

/**
 * MOCK. NOT THE REAL ENDPOINT. DO NOT MERGE THIS FILE BACK INTO THE MAIN APP.
 *
 * The hero's "audit my site" form posts here. In production this route runs a
 * real crawl and scores the page; that code lives in the main Xicmo repo and
 * is deliberately not in this one.
 *
 * Without a stub the form would just error, which makes the most visible
 * component on the page impossible to style in its success state. So this
 * returns a fixed, obviously-fake response after a short delay.
 *
 * The numbers below are invented and are labelled as such in the response, so
 * nothing here can be mistaken for a real audit result if it ever leaks into a
 * screenshot.
 */
export async function POST(req: Request) {
  let url = "example.com";
  try {
    const body = (await req.json()) as { url?: unknown };
    if (typeof body.url === "string" && body.url.trim()) url = body.url.trim();
  } catch {
    // Keep the placeholder.
  }

  // Roughly what the real crawl costs, so loading states get exercised.
  await new Promise((resolve) => setTimeout(resolve, 1200));

  return NextResponse.json({
    ok: true,
    mock: true,
    url,
    score: 72,
    grade: "B",
    summary:
      "Sample data from the local mock endpoint. The real audit lives in the main Xicmo app.",
    checks: [
      { id: "title", label: "Title tag", status: "pass", detail: "58 characters" },
      {
        id: "meta-description",
        label: "Meta description",
        status: "warn",
        detail: "Missing on the homepage",
      },
      { id: "h1", label: "Single H1", status: "pass", detail: "One H1 found" },
      {
        id: "og",
        label: "Open Graph tags",
        status: "fail",
        detail: "No og:image set",
      },
      {
        id: "schema",
        label: "Structured data",
        status: "pass",
        detail: "Organization and WebSite found",
      },
    ],
  });
}
