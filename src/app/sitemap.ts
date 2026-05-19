import { MetadataRoute } from "next";
import { projects } from "@/lib/data";
import { blogPosts } from "@/lib/blog-data";

const BASE_URL = "https://oasisemaar.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Static pages with priorities and images
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
      images: [`${BASE_URL}/og-image.jpg`],
    },
    {
      url: `${BASE_URL}/projects`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
      images: projects.slice(0, 3).map((p) => `${BASE_URL}${p.imageUrl}`),
    },
    {
      url: `${BASE_URL}/inventory`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
      images: [`${BASE_URL}/og-image.jpg`],
    },
    {
      url: `${BASE_URL}/master-plan`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
      images: [`${BASE_URL}/images/gallery/gallery-masterplan.png`],
    },
    {
      url: `${BASE_URL}/floor-plans`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
      images: [`${BASE_URL}/og-image.jpg`],
    },
    {
      url: `${BASE_URL}/payment-plan`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/gallery`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
      images: [`${BASE_URL}/og-image.jpg`],
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
      images: [`${BASE_URL}/og-image.jpg`],
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/sell`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/marketplace`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
      images: [`${BASE_URL}/og-image.jpg`],
    },
    {
      url: `${BASE_URL}/availability`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
      images: [`${BASE_URL}/og-image.jpg`],
    },
    {
      url: `${BASE_URL}/listings`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/feed.xml`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.4,
    },
    // Multilingual landing pages
    { url: `${BASE_URL}/ar`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${BASE_URL}/zh`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${BASE_URL}/ru`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${BASE_URL}/fr`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${BASE_URL}/de`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.9 },
  ];

  // Dynamic project pages with project images
  const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${BASE_URL}/projects/${project.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
    images: [`${BASE_URL}${project.imageUrl}`],
  }));

  // Dynamic blog pages with OG images
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.75,
    images: [`${BASE_URL}/og-image.jpg`],
  }));

  return [...staticPages, ...projectPages, ...blogPages];
}
