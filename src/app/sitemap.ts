import { MetadataRoute } from "next";
import { projects } from "@/lib/data";
import { blogPosts } from "@/lib/blog-data";
import { SITE_URL } from "@/lib/site-config";

// Realistic last-modified dates so Google can tell what actually changed
const LAST_SITE_UPDATE = new Date("2026-06-04T12:00:00+04:00");

export default function sitemap(): MetadataRoute.Sitemap {
  // Static pages with priorities and images
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: LAST_SITE_UPDATE,
      changeFrequency: "daily",
      priority: 1.0,
      images: [`${SITE_URL}/og-image.jpg`],
    },
    {
      url: `${SITE_URL}/projects`,
      lastModified: LAST_SITE_UPDATE,
      changeFrequency: "daily",
      priority: 0.9,
      images: projects.slice(0, 3).map((p) => `${SITE_URL}${p.imageUrl}`),
    },
    {
      url: `${SITE_URL}/inventory`,
      lastModified: LAST_SITE_UPDATE,
      changeFrequency: "daily",
      priority: 0.9,
      images: [`${SITE_URL}/og-image.jpg`],
    },
    {
      url: `${SITE_URL}/master-plan`,
      lastModified: LAST_SITE_UPDATE,
      changeFrequency: "weekly",
      priority: 0.8,
      images: [`${SITE_URL}/images/gallery/gallery-masterplan.png`],
    },
    {
      url: `${SITE_URL}/floor-plans`,
      lastModified: LAST_SITE_UPDATE,
      changeFrequency: "weekly",
      priority: 0.8,
      images: [`${SITE_URL}/og-image.jpg`],
    },
    {
      url: `${SITE_URL}/payment-plan`,
      lastModified: LAST_SITE_UPDATE,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/gallery`,
      lastModified: LAST_SITE_UPDATE,
      changeFrequency: "weekly",
      priority: 0.7,
      images: [`${SITE_URL}/og-image.jpg`],
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: LAST_SITE_UPDATE,
      changeFrequency: "monthly",
      priority: 0.6,
      images: [`${SITE_URL}/og-image.jpg`],
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: LAST_SITE_UPDATE,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/faq`,
      lastModified: LAST_SITE_UPDATE,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/sell`,
      lastModified: LAST_SITE_UPDATE,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/marketplace`,
      lastModified: LAST_SITE_UPDATE,
      changeFrequency: "daily",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: LAST_SITE_UPDATE,
      changeFrequency: "weekly",
      priority: 0.8,
      images: [`${SITE_URL}/og-image.jpg`],
    },
    {
      url: `${SITE_URL}/availability`,
      lastModified: LAST_SITE_UPDATE,
      changeFrequency: "daily",
      priority: 0.9,
      images: [`${SITE_URL}/og-image.jpg`],
    },
    {
      url: `${SITE_URL}/listings`,
      lastModified: LAST_SITE_UPDATE,
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/press`,
      lastModified: LAST_SITE_UPDATE,
      changeFrequency: "monthly",
      priority: 0.5,
      images: [`${SITE_URL}/og-image.jpg`],
    },
    {
      url: `${SITE_URL}/link-to-us`,
      lastModified: LAST_SITE_UPDATE,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: new Date("2025-06-01T00:00:00+04:00"),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: new Date("2025-06-01T00:00:00+04:00"),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${SITE_URL}/disclaimer`,
      lastModified: new Date("2025-06-01T00:00:00+04:00"),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    // Multilingual landing pages
    { url: `${SITE_URL}/ar`, lastModified: LAST_SITE_UPDATE, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${SITE_URL}/zh`, lastModified: LAST_SITE_UPDATE, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${SITE_URL}/ru`, lastModified: LAST_SITE_UPDATE, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${SITE_URL}/fr`, lastModified: LAST_SITE_UPDATE, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${SITE_URL}/de`, lastModified: LAST_SITE_UPDATE, changeFrequency: "weekly" as const, priority: 0.9 },
  ];

  // Dynamic project pages with project images
  const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${SITE_URL}/projects/${project.slug}`,
    lastModified: LAST_SITE_UPDATE,
    changeFrequency: "weekly" as const,
    priority: 0.85,
    images: [`${SITE_URL}${project.imageUrl}`],
  }));

  // Dynamic blog pages with unique post images
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.75,
    images: [`${SITE_URL}${post.image}`],
  }));

  return [...staticPages, ...projectPages, ...blogPages];
}
