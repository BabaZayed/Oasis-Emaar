import type { Metadata } from "next";
import WebPageSchema from "@/components/web-page-schema";
import PressKitClient from "./press-kit-client";

export const metadata: Metadata = {
  title: "Press & Media Kit — Oasis Emaar",
  description:
    "Official press kit for Oasis Emaar, authorised sales agent for The Oasis by Emaar Properties in Dubai. Download logos, access brand assets, embed widgets, and find media-ready facts and figures.",
  keywords: [
    "Oasis Emaar press kit",
    "Emaar Oasis media resources",
    "Oasis Dubai brand assets",
    "Emaar authorised agent badge",
    "Dubai real estate press",
    "Oasis Emaar logo download",
  ],
  openGraph: {
    title: "Press & Media Kit | Oasis Emaar",
    description:
      "Official press kit — logos, brand assets, embeddable widgets, and media-ready facts about The Oasis by Emaar.",
    url: "https://oasisemaar.com/press",
    siteName: "Oasis Emaar",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Oasis Emaar Press Kit" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Press & Media Kit | Oasis Emaar",
    description: "Official press kit — logos, brand assets, embeddable widgets, and media facts.",
    images: ["/og-image.jpg"],
  },
  alternates: { canonical: "https://oasisemaar.com/press" },
};

export default function PressPage() {
  return (
    <>
      <WebPageSchema
        name="Press & Media Kit — Oasis Emaar"
        description="Official press kit for Oasis Emaar, authorised sales agent for The Oasis by Emaar Properties in Dubai."
        url="https://oasisemaar.com/press"
        breadcrumbItems={[
          { name: "Home", url: "https://oasisemaar.com" },
          { name: "Press Kit", url: "https://oasisemaar.com/press" },
        ]}
      />
      <PressKitClient />
    </>
  );
}
