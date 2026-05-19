import { blogPosts } from "@/lib/blog-data";

const BASE_URL = "https://oasisemaar.com";

export async function GET() {
  const items = blogPosts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${BASE_URL}/blog/${post.slug}</link>
      <guid isPermaLink="true">${BASE_URL}/blog/${post.slug}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author>sales@oasisemaar.com (${post.author})</author>
      <category>${post.category}</category>
      ${post.tags.map((tag) => `<category>${tag}</category>`).join("\n      ")}
    </item>`
    )
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
>
  <channel>
    <title>Oasis Emaar Blog — The Oasis by Emaar Properties Dubai</title>
    <link>${BASE_URL}/blog</link>
    <description>Expert insights on The Oasis by Emaar — investment analysis, payment plans, community comparisons, and buying guides for Dubai's premier waterfront community.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <managingEditor>sales@oasisemaar.com (Oasis Emaar)</managingEditor>
    <webMaster>sales@oasisemaar.com (Oasis Emaar)</webMaster>
    <copyright>Copyright ${new Date().getFullYear()} Oasis Emaar. All rights reserved.</copyright>
    <image>
      <url>${BASE_URL}/logo.svg</url>
      <title>Oasis Emaar Blog</title>
      <link>${BASE_URL}/blog</link>
    </image>
    ${items}
  </channel>
</rss>`;

  return new Response(rss.trim(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
