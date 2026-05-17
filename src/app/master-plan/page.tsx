import type { Metadata } from "next";
import MasterPlanPageClient from "./master-plan-page-client";

export const metadata: Metadata = {
  title: "Master Plan - The Oasis by Emaar Community Layout",
  description:
    "Explore the master plan of The Oasis by Emaar — a 9.4 million sqm waterfront community featuring 9 clusters of luxury villas, mansions, and branded residences in Dubailand, Dubai.",
  keywords: [
    "Oasis Emaar master plan",
    "The Oasis community layout",
    "Emaar Dubailand master plan",
    "Oasis clusters map",
    "Dubai waterfront community plan",
    "Emaar Oasis site plan",
  ],
  openGraph: {
    title: "Master Plan | The Oasis by Emaar",
    description:
      "Explore the master plan of The Oasis by Emaar — a 9.4 million sqm waterfront community in Dubai.",
    url: "https://oasisemaar.com/master-plan",
    siteName: "Oasis Emaar",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "The Oasis by Emaar Master Plan" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Master Plan | The Oasis by Emaar",
    description:
      "Explore the master plan of The Oasis by Emaar — a 9.4 million sqm waterfront community in Dubai.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://oasisemaar.com/master-plan",
  },
};

export default function MasterPlanPage() {
  return <MasterPlanPageClient />;
}
