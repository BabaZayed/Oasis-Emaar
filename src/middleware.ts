import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware: Domain redirects + Language routing
 *
 * 1. Redirects theoasisemaar.com and www.theoasisemaar.com to www.oasisemaar.com (301)
 * 2. No language redirects needed — [lang] dynamic routes handle all language paths
 *
 * IMPORTANT: We do NOT redirect www.oasisemaar.com → oasisemaar.com here
 * because Vercel's primary domain is configured as www.oasisemaar.com.
 */
export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const url = request.nextUrl;

  // Only redirect theoasisemaar.com variants → www.oasisemaar.com
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
