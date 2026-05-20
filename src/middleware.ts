import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware: 301 Redirect for alternate domains
 *
 * When theoasisemaar.com is added as a domain to the Vercel project,
 * this middleware intercepts all requests and redirects them with a
 * 301 (permanent) status to the equivalent path on oasisemaar.com.
 *
 * This consolidates SEO authority onto oasisemaar.com while ensuring
 * users who type theoasisemaar.com still reach the correct content.
 *
 * Setup steps:
 * 1. Add theoasisemaar.com to your Vercel project domains
 * 2. Configure DNS: Add a CNAME record pointing theoasisemaar.com to cname.vercel-dns.com
 * 3. This middleware handles the redirect automatically
 */
export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const url = request.nextUrl;

  // Redirect theoasisemaar.com → oasisemaar.com (301 Permanent)
  // Covers both with and without www prefix
  if (
    host === "theoasisemaar.com" ||
    host === "www.theoasisemaar.com"
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
