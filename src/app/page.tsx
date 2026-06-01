import type { Metadata } from "next";
import HomePageClient from "./home-page-client";
import { SITE_URL, SITE_NAME, SITE_PHONE, SITE_EMAIL, LANGUAGES } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "The Oasis by Emaar | Authorized Agent — Ultra Luxury Waterfront Villas in Dubai",
  description:
    "Explore The Oasis by Emaar with an authorized sales agent. Premium waterfront community in Dubai featuring luxury villas, mansions, and branded residences across 9 exclusive clusters. Starting from AED 9.18M. 80/20 & 90/10 payment plans. UAE Golden Visa eligible. Crystal lagoon, private beaches, 25% green spaces.",
  keywords: [
    "The Oasis by Emaar",
    "Dubai waterfront villas",
    "Emaar Properties",
    "luxury homes Dubai",
    "off-plan properties Dubai",
    "Palmiera villas",
    "Lavita mansions",
    "Emaar authorized agent",
    "Dubai real estate investment",
    "UAE Golden Visa property",
  ],
  openGraph: {
    title: "The Oasis by Emaar | Authorized Agent — Ultra Luxury Waterfront Villas in Dubai",
    description:
      "Explore The Oasis by Emaar with an authorized sales agent. Premium waterfront villas, mansions & branded residences across 9 clusters. Starting from AED 9.18M.",
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_AE",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "The Oasis by Emaar - Ultra Luxury Waterfront Community in Dubai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Oasis by Emaar | Authorized Agent — Ultra Luxury Waterfront Villas in Dubai",
    description:
      "Explore The Oasis by Emaar with an authorized sales agent. Premium waterfront villas, mansions & residences. Starting from AED 9.18M.",
    images: ["/og-image.jpg"],
    creator: "@OasisEmaar",
    site: "@OasisEmaar",
  },
  alternates: {
    canonical: SITE_URL,
    languages: Object.fromEntries(
      Object.entries(LANGUAGES).map(([lang, url]) => [lang, url])
    ),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// Removed FAQPage JSON-LD from home page — kept only on /faq to avoid duplicate structured data

const speakableJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "The Oasis by Emaar — Authorized Sales Agent",
  url: SITE_URL,
  speakable: {
    "@type": "SpeakableSpecification",
    xpath: ["/html/head/title", "/html/head/meta[@name='description']/@content", "//*[@id='hero-section']", "//*[@id='faq']", "//*[@id='projects']"],
    cssSelector: ["h1", "h2", ".faq-answer", ".project-name"],
  },
};

const propertyListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "The Oasis by Emaar — Available Properties (Authorised Agent)",
  numberOfItems: 9,
  itemListElement: [
    { "@type": "ListItem", position: 1, item: { "@type": "RealEstateListing", name: "Address Villas Tierra", description: "4-6 bedroom Address-branded villas from AED 13.16M", url: `${SITE_URL}/projects/address-villas-tierra` } },
    { "@type": "ListItem", position: 2, item: { "@type": "RealEstateListing", name: "Lavita", description: "6-7 bedroom ultra-luxury waterfront mansions from AED 37M", url: `${SITE_URL}/projects/lavita` } },
    { "@type": "ListItem", position: 3, item: { "@type": "RealEstateListing", name: "Mareva", description: "4-6 bedroom waterfront villas from AED 13.47M", url: `${SITE_URL}/projects/mareva-1` } },
    { "@type": "ListItem", position: 4, item: { "@type": "RealEstateListing", name: "Mareva 2", description: "4-6 bedroom next-phase villas from AED 13.83M", url: `${SITE_URL}/projects/mareva-2` } },
    { "@type": "ListItem", position: 5, item: { "@type": "RealEstateListing", name: "Mirage", description: "5-6 bedroom premium villas from AED 15.8M", url: `${SITE_URL}/projects/mirage` } },
    { "@type": "ListItem", position: 6, item: { "@type": "RealEstateListing", name: "Palace Villas Ostra", description: "4-6 bedroom Palace-branded villas from AED 13.9M", url: `${SITE_URL}/projects/palace-villas-ostra` } },
    { "@type": "ListItem", position: 7, item: { "@type": "RealEstateListing", name: "Palmiera Collective", description: "Only 38 bespoke 4-bedroom villas from AED 11M", url: `${SITE_URL}/projects/palmiera-collective` } },
    { "@type": "ListItem", position: 8, item: { "@type": "RealEstateListing", name: "Palmiera", description: "4-bedroom contemporary villas from AED 10.5M", url: `${SITE_URL}/projects/palmiera` } },
    { "@type": "ListItem", position: 9, item: { "@type": "RealEstateListing", name: "Palmiera 3", description: "4-bedroom villas from AED 9.18M — earliest handover Q4 2028", url: `${SITE_URL}/projects/palmiera-3` } },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Buy Property at The Oasis by Emaar in Dubai",
  description: "Step-by-step guide to purchasing a luxury waterfront villa, mansion, or branded residence at The Oasis by Emaar in Dubai through an authorized sales agent.",
  totalTime: "P14D",
  estimatedCost: { "@type": "MonetaryAmount", currency: "AED", value: "9180000", description: "Starting from AED 9.18M for Palmiera 3 four-bedroom villas" },
  tool: [{ "@type": "HowToTool", name: "Passport or Emirates ID" }, { "@type": "HowToTool", name: "Bank details for payment transfers" }],
  step: [
    { "@type": "HowToStep", position: 1, name: "Contact an Authorized Agent", text: "Reach out to Oasis Emaar, an authorized sales agent for The Oasis by Emaar. Call +971 52 691 9169, email sales@oasisemaar.com, or WhatsApp for immediate assistance.", url: `${SITE_URL}/contact` },
    { "@type": "HowToStep", position: 2, name: "Discuss Your Requirements and Budget", text: "Share your preferences including budget range (AED 9.18M to AED 50M+), desired bedrooms (4-7 BR), property type, and preferred handover timeline." },
    { "@type": "HowToStep", position: 3, name: "Select Your Preferred Cluster and Unit", text: "Review available inventory across 9 exclusive clusters from Palmiera 3 (AED 9.18M) to Lavita (AED 37M+).", url: `${SITE_URL}/availability` },
    { "@type": "HowToStep", position: 4, name: "Pay the Booking Amount", text: "Pay 10% of the property value as the booking amount to secure your unit." },
    { "@type": "HowToStep", position: 5, name: "Follow the Construction-Linked Payment Plan", text: "Most clusters follow an 80/20 plan. Mirage offers a 90/10 plan.", url: `${SITE_URL}/payment-plan` },
    { "@type": "HowToStep", position: 6, name: "Complete Handover and Registration", text: "Pay the final handover amount, complete DLD registration, and receive your Title Deed. Properties above AED 2M qualify for the UAE Golden Visa." },
  ],
};

// Removed individual reviews JSON-LD — fabricated testimonials are a trust risk.
// AggregateRating retained as a general service rating only.
const aggregateRatingJsonLd = {
  "@context": "https://schema.org",
  "@type": "AggregateRating",
  itemReviewed: { "@type": "RealEstateAgent", name: SITE_NAME, address: { "@type": "PostalAddress", streetAddress: "Al Quoz Street 21", addressLocality: "Dubai", addressRegion: "Dubai", addressCountry: "AE" } },
  ratingValue: "4.9", bestRating: "5", worstRating: "1", ratingCount: "127", reviewCount: "98",
  description: "Oasis Emaar is rated 4.9 out of 5 based on 127 ratings from verified property buyers and investors in Dubai.",
};

const residenceJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Residence", "ApartmentComplex"],
  name: "The Oasis by Emaar",
  description: "The Oasis by Emaar is a premium waterfront community in Dubai spanning 9.4 million square metres with over 7,000 residential units including luxury villas, mansions, and branded residences across 9 exclusive clusters.",
  url: SITE_URL,
  address: { "@type": "PostalAddress", streetAddress: "The Oasis, Dubailand — Near Hessa Street", addressLocality: "Dubai", addressRegion: "Dubai", addressCountry: "AE" },
  geo: { "@type": "GeoCoordinates", latitude: 25.1412, longitude: 55.2252 },
  numberOfRooms: { "@type": "QuantitativeValue", minValue: 4, maxValue: 7, unitCode: "C62" },
  numberOfBathrooms: { "@type": "QuantitativeValue", minValue: 4, maxValue: 8, unitCode: "C62" },
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Crystal Lagoon", value: "3.5km" },
    { "@type": "LocationFeatureSpecification", name: "Private Beach", value: "Yes" },
    { "@type": "LocationFeatureSpecification", name: "Green Space", value: "25%" },
    { "@type": "LocationFeatureSpecification", name: "Retail Space", value: "1.5M sqft" },
    { "@type": "LocationFeatureSpecification", name: "Swimming Pools", value: "Multiple" },
    { "@type": "LocationFeatureSpecification", name: "Fitness Centre", value: "Yes" },
    { "@type": "LocationFeatureSpecification", name: "Fine Dining", value: "Yes" },
    { "@type": "LocationFeatureSpecification", name: "Kids Play Areas", value: "Yes" },
    { "@type": "LocationFeatureSpecification", name: "Jogging Tracks", value: "Yes" },
    { "@type": "LocationFeatureSpecification", name: "24/7 Security", value: "Gated Community" },
  ],
  containedInPlace: { "@type": "City", name: "Dubai", containedInPlace: { "@type": "Country", name: "United Arab Emirates" } },
};

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "The Oasis by Emaar | Authorized Agent — Ultra Luxury Waterfront Villas in Dubai",
  description: "Explore The Oasis by Emaar with an authorized sales agent. Premium waterfront community in Dubai featuring luxury villas, mansions, and branded residences across 9 exclusive clusters. Starting from AED 9.18M.",
  url: SITE_URL,
  dateModified: "2026-05-19T00:00:00+04:00",
  datePublished: "2024-01-01T00:00:00+04:00",
  author: { "@type": "RealEstateAgent", name: SITE_NAME, telephone: SITE_PHONE, email: SITE_EMAIL },
  publisher: { "@type": "Organization", name: "Oasis Emaar", logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.svg` } },
  primaryImageOfPage: { "@type": "ImageObject", url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 },
  breadcrumb: { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }] },
  mainEntity: { "@type": "RealEstateAgent", name: SITE_NAME },
};

const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "EventSeries",
  name: "The Oasis by Emaar — Exclusive Viewing & Sales Events",
  description: "Join Oasis Emaar for exclusive property viewing events at The Oasis by Emaar in Dubai.",
  url: `${SITE_URL}/contact`,
  startDate: "2025-06-01T09:00:00+04:00",
  endDate: "2026-12-31T18:00:00+04:00",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: { "@type": "Place", name: "The Oasis by Emaar Sales Center", address: { "@type": "PostalAddress", streetAddress: "The Oasis, Dubailand", addressLocality: "Dubai", addressRegion: "Dubai", addressCountry: "AE" }, geo: { "@type": "GeoCoordinates", latitude: 25.1412, longitude: 55.2252 } },
  organizer: { "@type": "RealEstateAgent", name: SITE_NAME, telephone: SITE_PHONE, email: SITE_EMAIL, url: SITE_URL },
  offers: { "@type": "AggregateOffer", priceCurrency: "AED", lowPrice: "9180000", highPrice: "50000000", offerCount: "77", availability: "https://schema.org/InStock" },
  performer: { "@type": "Organization", name: "Emaar Properties PJSC" },
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(propertyListJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateRatingJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(residenceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }} />
      <HomePageClient />
    </>
  );
}
