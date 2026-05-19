import { Metadata } from "next";
import ListingsPageClient from "./listings-page-client";

export const metadata: Metadata = {
  title: "Property Listings | The Oasis by Emaar - Verified Inventory",
  description:
    "View and verify all 77 property listings at The Oasis by Emaar. Track availability status, mark verified properties, and export listings data.",
  keywords: [
    "The Oasis Emaar listings",
    "Emaar property verification",
    "The Oasis inventory",
    "Dubai property listings",
    "Emaar villa listings",
  ],
  openGraph: {
    title: "Property Listings | The Oasis by Emaar",
    description:
      "View and verify 77 luxury property listings across 9 clusters at The Oasis by Emaar, Dubai.",
    url: "https://oasisemaar.com/listings",
    siteName: "Oasis Emaar",
    type: "website",
  },
  alternates: {
    canonical: "https://oasisemaar.com/listings",
  },
};

export default function ListingsPage() {
  return <ListingsPageClient />;
}
