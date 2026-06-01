import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware: 301 Redirect for alternate domains
 *
 * Redirects theoasisemaar.com and www.theoasisemaar.com to the
 * canonical domain (www.oasisemaar.com) with a 301 (permanent) status.
 *
 * IMPORTANT: We do NOT redirect www.oasisemaar.com → oasisemaar.com here
 * because Vercel's primary domain is configured as www.oasisemaar.com.
 * Vercel automatically handles the www↔non-www redirect based on the
 * primary domain setting. Adding a conflicting redirect here would
 * create an infinite redirect loop.
 *
 * Path preservation: theoasisemaar.com/about → www.oasisemaar.com/about
 */
export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const url = request.nextUrl;

  // Only redirect theoasisemaar.com variants → www.oasisemaar.com
  // Do NOT redirect www.oasisemaar.com — Vercel handles that as the primary domain
  if (
    host === "theoasisemaar.com" ||
    host === "www.theoasisemaar.com"
  ) {
    const destination = new URL(url.pathname + url.search, "https://www.oasisemaar.com");
    return NextResponse.redirect(destination, 301);
  }

  return NextResponse.next();
}

// Run on all paths (needed to catch the host header on every request)
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|feed.xml|manifest.json|sw.js|workbox-*|icon-*).*)"],
};
