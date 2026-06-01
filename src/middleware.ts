import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware: 301 Redirect for alternate domains
 *
 * When theoasisemaar.com or www.oasisemaar.com is accessed,
 * this middleware intercepts all requests and redirects them with a
 * 301 (permanent) status to the equivalent path on the canonical domain
 * (oasisemaar.com — non-www).
 *
 * This consolidates SEO authority onto the canonical domain while ensuring
 * users who type alternate domains still reach the correct content.
 * Path preservation: theoasisemaar.com/about → oasisemaar.com/about
 */
export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const url = request.nextUrl;

  // Redirect theoasisemaar.com and www variants → oasisemaar.com (301 Permanent)
  // All traffic should consolidate on the bare domain (no www)
  if (
    host === "theoasisemaar.com" ||
    host === "www.theoasisemaar.com" ||
    host === "www.oasisemaar.com"
  ) {
    const destination = new URL(url.pathname + url.search, "https://oasisemaar.com");
    return NextResponse.redirect(destination, 301);
  }

  return NextResponse.next();
}

// Run on all paths (needed to catch the host header on every request)
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|feed.xml|manifest.json|sw.js|workbox-*|icon-*).*)"],
};
