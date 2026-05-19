import type { Metadata } from "next";
import BlogPageClient from "./blog-page-client";

export const metadata: Metadata = {
  title: "Blog — Dubai Real Estate Insights & The Oasis by Emaar",
  description:
    "Expert insights on Dubai real estate, The Oasis by Emaar investment analysis, payment plan guides, community comparisons, and off-plan buying advice. Stay informed with our latest articles.",
  keywords: [
    "dubai real estate blog",
    "oasis emaar blog",
    "dubai property investment guide",
    "emaar oasis investment",
    "off-plan dubai guide",
    "dubai waterfront communities",
    "emaar payment plans",
    "buy property dubai",
  ],
  openGraph: {
    title: "Blog — Dubai Real Estate Insights & The Oasis by Emaar",
    description:
      "Expert insights on Dubai real estate, The Oasis by Emaar investment analysis, payment plan guides, and community comparisons.",
    url: "https://oasisemaar.com/blog",
    type: "website",
  },
  alternates: {
    canonical: "https://oasisemaar.com/blog",
  },
};

export default function BlogPage() {
  return <BlogPageClient />;
}
