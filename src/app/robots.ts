import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "Googlebot",
        allow: "/",
        crawlDelay: 1,
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        crawlDelay: 1,
      },
      {
        userAgent: ["Twitterbot", "facebookexternalhit"],
        allow: "/",
      },
      // AI Crawlers — allowed for brand visibility
      {
        userAgent: [
          "ChatGPT-User",
          "ClaudeBot",
          "PerplexityBot",
          "Google-Extended",
          "Bytespider",
          "Applebot-Extended",
          "GPTBot",
          "Amazonbot",
          "YouBot",
        ],
        allow: "/",
      },
      {
        userAgent: "*",
        allow: "/",
        crawlDelay: 1,
        disallow: ["/api/leads", "/api/marketplace"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
