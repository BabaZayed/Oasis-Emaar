import type { Metadata } from "next";
import HomePageClient from "./home-page-client";

export const metadata: Metadata = {
  title: "The Oasis by Emaar | Authorized Agent — Ultra Luxury Waterfront Villas in Dubai",
  description:
    "Explore The Oasis by Emaar with an authorized sales agent. Premium waterfront community in Dubai featuring luxury villas, mansions, and branded residences across 9 exclusive clusters. Starting from AED 9.18M. 80/20 & 90/10 payment plans. UAE Golden Visa eligible. Crystal lagoon, private beaches, 25% green spaces.",
  keywords: [
    "Oasis Emaar",
    "The Oasis by Emaar",
    "Dubai real estate",
    "waterfront villas Dubai",
    "Emaar Properties",
    "luxury homes Dubai",
    "Dubai villas for sale",
    "lagoon community Dubai",
    "The Oasis Dubai",
    "Emaar Oasis",
    "off-plan properties Dubai",
    "Dubai waterfront properties",
    "luxury apartments Dubai",
    "Dubai mansions for sale",
    "Emaar off-plan",
    "crystal lagoon Dubai",
    "Dubai townhouses",
    "penthouse Dubai",
    "waterfront living Dubai",
    "Dubai property investment",
    "Emaar new launch Dubai",
    "Palmiera villas",
    "Lavita mansions",
    "Mirage villas Dubai",
    "Address Villas Tierra",
    "Palace Villas Ostra",
    "Mareva villas",
    "Palmiera 3 villas",
    "Palmeira Collective",
    "Adress Villas Tierra",
    "buy property Dubai",
    "Dubai freehold property",
    "UAE Golden Visa property",
    "Dubai luxury community",
    "Emaar authorized agent",
    "Dubai off-plan villas",
    "waterfront community Dubailand",
    "Emaar branded residences",
    "Dubai crystal lagoon community",
    "80/20 payment plan Dubai",
    "90/10 payment plan Dubai",
    "AED 9.18M villas Dubai",
    "Dubai property for foreigners",
    "DLD registration Dubai",
    "Emaar Properties PJSC",
    "Dubai real estate brokerage",
    "authorized sales agent Emaar",
    "Dubai waterfront investment",
    "luxury villa community Dubai 2025",
  ],
  openGraph: {
    title: "The Oasis by Emaar | Authorized Agent — Ultra Luxury Waterfront Villas in Dubai",
    description:
      "Explore The Oasis by Emaar with an authorized sales agent. Premium waterfront villas, mansions & branded residences across 9 clusters. Starting from AED 9.18M.",
    url: "https://oasisemaar.com",
    siteName: "Oasis Emaar — Authorized Agent",
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
    canonical: "https://oasisemaar.com",
    languages: {
      "en": "https://oasisemaar.com",
      "ar": "https://oasisemaar.com/ar",
      "zh": "https://oasisemaar.com/zh",
      "ru": "https://oasisemaar.com/ru",
      "fr": "https://oasisemaar.com/fr",
      "de": "https://oasisemaar.com/de",
    },
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

const faqPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  dateModified: "2026-05-19",
  mainEntity: [
    { "@type": "Question", name: "What is The Oasis by Emaar?", acceptedAnswer: { "@type": "Answer", text: "The Oasis by Emaar is a premium waterfront community in Dubai spanning 9.4 million square metres with over 7,000 residential units including villas, mansions, and branded residences. It features crystal-clear lagoons, water canals, and lush green parks, located just 20 minutes from Downtown Dubai." } },
    { "@type": "Question", name: "How much do villas cost at The Oasis Dubai?", acceptedAnswer: { "@type": "Answer", text: "Villa prices at The Oasis by Emaar start from AED 9.18M for Palmiera 3 four-bedroom villas and go up to AED 50M+ for Lavita ultra-luxury mansions. The price range across all nine clusters is AED 9.18M to AED 50M+, with mid-range options like Palmiera starting at AED 10.5M and Mirage starting at AED 15.8M." } },
    { "@type": "Question", name: "What is the payment plan for The Oasis by Emaar?", acceptedAnswer: { "@type": "Answer", text: "Most clusters at The Oasis offer an 80/20 payment plan: 10% on booking, 70% during construction, and 20% on handover. The Mirage cluster offers a 90/10 plan with just 10% on handover. Post-handover payment plans may also be available for select units." } },
    { "@type": "Question", name: "When will The Oasis by Emaar be completed?", acceptedAnswer: { "@type": "Answer", text: "Handover dates vary by cluster: Palmiera 3 is expected earliest (Q4 2028), followed by Palmiera, Lavita, and Palmeira Collective (Q1-Q2 2029). Address Villas Tierra is expected in June 2029, Palace Villas Ostra in September 2029, and Mirage in Q4 2029. The Mareva clusters have later handover dates (Q1-Q2 2031)." } },
    { "@type": "Question", name: "Who is the authorized agent for The Oasis by Emaar?", acceptedAnswer: { "@type": "Answer", text: "Oasis Emaar is an authorized sales agent for The Oasis by Emaar Properties. They are an independent licensed real estate brokerage offering expert guidance, exclusive inventory access, and personalized service. Contact: +971 52 691 9169 or sales@oasisemaar.com." } },
    { "@type": "Question", name: "What types of properties are available at The Oasis?", acceptedAnswer: { "@type": "Answer", text: "The Oasis offers 4 to 7 bedroom waterfront villas, ultra-luxury mansions, and branded residences (Address Hotels and Palace branded). Property types span nine distinct clusters including Palmiera (4BR villas), Lavita (6-7BR mansions), Mirage (5-6BR premium villas), and branded options like Address Villas Tierra and Palace Villas Ostra." } },
    { "@type": "Question", name: "Is The Oasis by Emaar a good investment?", acceptedAnswer: { "@type": "Answer", text: "The Oasis by Emaar is considered a strong investment due to its prime Dubai location, Emaar's track record of property appreciation, 100% freehold ownership for foreign buyers, UAE Golden Visa eligibility (AED 2M+), world-class amenities including a 3.5km crystal lagoon, and flexible payment plans. Emaar communities historically show significant capital appreciation." } },
    { "@type": "Question", name: "How do I buy a property at The Oasis Dubai?", acceptedAnswer: { "@type": "Answer", text: "To buy a property at The Oasis: 1) Contact an authorized agent like Oasis Emaar at +971 52 691 9169. 2) Discuss your requirements and budget. 3) Select from available inventory across 9 clusters. 4) Pay the booking amount (typically 10%). 5) Follow the construction-linked payment plan. 6) Complete handover and registration. An authorized agent provides exclusive inventory access and expert guidance throughout." } },
  ],
};

const speakableJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "The Oasis by Emaar — Authorized Sales Agent",
  url: "https://oasisemaar.com",
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
    { "@type": "ListItem", position: 1, item: { "@type": "RealEstateListing", name: "Adress Villas Tierra", description: "4-6 bedroom Address-branded villas from AED 13.16M", url: "https://oasisemaar.com/projects/adress-villas-tierra" } },
    { "@type": "ListItem", position: 2, item: { "@type": "RealEstateListing", name: "Lavita", description: "6-7 bedroom ultra-luxury waterfront mansions from AED 37M", url: "https://oasisemaar.com/projects/lavita" } },
    { "@type": "ListItem", position: 3, item: { "@type": "RealEstateListing", name: "Mareva", description: "4-6 bedroom waterfront villas from AED 13.47M", url: "https://oasisemaar.com/projects/mareva-1" } },
    { "@type": "ListItem", position: 4, item: { "@type": "RealEstateListing", name: "Mareva 2", description: "4-6 bedroom next-phase villas from AED 13.83M", url: "https://oasisemaar.com/projects/mareva-2" } },
    { "@type": "ListItem", position: 5, item: { "@type": "RealEstateListing", name: "Mirage", description: "5-6 bedroom premium villas from AED 15.8M", url: "https://oasisemaar.com/projects/mirage" } },
    { "@type": "ListItem", position: 6, item: { "@type": "RealEstateListing", name: "Palace Villas Ostra", description: "4-6 bedroom Palace-branded villas from AED 13.9M", url: "https://oasisemaar.com/projects/palace-villas-ostra" } },
    { "@type": "ListItem", position: 7, item: { "@type": "RealEstateListing", name: "Palmeira Collective", description: "Only 38 bespoke 4-bedroom villas from AED 11M", url: "https://oasisemaar.com/projects/palmeira-collective" } },
    { "@type": "ListItem", position: 8, item: { "@type": "RealEstateListing", name: "Palmiera", description: "4-bedroom contemporary villas from AED 10.5M", url: "https://oasisemaar.com/projects/palmiera" } },
    { "@type": "ListItem", position: 9, item: { "@type": "RealEstateListing", name: "Palmiera 3", description: "4-bedroom villas from AED 9.18M — earliest handover Q4 2028", url: "https://oasisemaar.com/projects/palmiera-3" } },
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
    { "@type": "HowToStep", position: 1, name: "Contact an Authorized Agent", text: "Reach out to Oasis Emaar, an authorized sales agent for The Oasis by Emaar. Call +971 52 691 9169, email sales@oasisemaar.com, or WhatsApp for immediate assistance.", url: "https://oasisemaar.com/contact" },
    { "@type": "HowToStep", position: 2, name: "Discuss Your Requirements and Budget", text: "Share your preferences including budget range (AED 9.18M to AED 50M+), desired bedrooms (4-7 BR), property type, and preferred handover timeline." },
    { "@type": "HowToStep", position: 3, name: "Select Your Preferred Cluster and Unit", text: "Review available inventory across 9 exclusive clusters from Palmiera 3 (AED 9.18M) to Lavita (AED 37M+).", url: "https://oasisemaar.com/availability" },
    { "@type": "HowToStep", position: 4, name: "Pay the Booking Amount", text: "Pay 10% of the property value as the booking amount to secure your unit." },
    { "@type": "HowToStep", position: 5, name: "Follow the Construction-Linked Payment Plan", text: "Most clusters follow an 80/20 plan. Mirage offers a 90/10 plan.", url: "https://oasisemaar.com/payment-plan" },
    { "@type": "HowToStep", position: 6, name: "Complete Handover and Registration", text: "Pay the final handover amount, complete DLD registration, and receive your Title Deed. Properties above AED 2M qualify for the UAE Golden Visa." },
  ],
};

const aggregateRatingJsonLd = {
  "@context": "https://schema.org",
  "@type": "AggregateRating",
  itemReviewed: { "@type": "RealEstateAgent", name: "Oasis Emaar — Authorized Sales Agent", address: { "@type": "PostalAddress", streetAddress: "Al Quoz Street 21", addressLocality: "Dubai", addressRegion: "Dubai", addressCountry: "AE" } },
  ratingValue: "4.9", bestRating: "5", worstRating: "1", ratingCount: "127", reviewCount: "98",
  description: "Oasis Emaar is rated 4.9 out of 5 based on 127 ratings from verified property buyers and investors in Dubai.",
};

const reviewsJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Oasis Emaar Customer Reviews",
  numberOfItems: 6,
  itemListElement: [
    { "@type": "ListItem", position: 1, item: { "@type": "Review", itemReviewed: { "@type": "RealEstateAgent", name: "Oasis Emaar — Authorized Sales Agent" }, author: { "@type": "Person", name: "Ahmed Al-Rashid", jobTitle: "CEO", worksFor: { "@type": "Organization", name: "Al-Rashid Holdings" } }, reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" }, reviewBody: "Outstanding service from start to finish. Oasis Emaar provided exclusive inventory access and guided me through the entire buying process at The Oasis by Emaar.", datePublished: "2025-11-15", publisher: { "@type": "Organization", name: "Oasis Emaar" } } },
    { "@type": "ListItem", position: 2, item: { "@type": "Review", itemReviewed: { "@type": "RealEstateAgent", name: "Oasis Emaar — Authorized Sales Agent" }, author: { "@type": "Person", name: "Sarah Mitchell", jobTitle: "Director", worksFor: { "@type": "Organization", name: "Prime Property Consultants" } }, reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" }, reviewBody: "Having advised international buyers on Dubai real estate for over 15 years, I can confidently say The Oasis by Emaar is one of the most compelling opportunities in the market today.", datePublished: "2025-10-20", publisher: { "@type": "Organization", name: "Oasis Emaar" } } },
    { "@type": "ListItem", position: 3, item: { "@type": "Review", itemReviewed: { "@type": "RealEstateAgent", name: "Oasis Emaar — Authorized Sales Agent" }, author: { "@type": "Person", name: "Khalid Al-Mansoori", jobTitle: "Managing Partner", worksFor: { "@type": "Organization", name: "Gulf Real Estate Group" } }, reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" }, reviewBody: "We've partnered with Emaar on multiple projects and The Oasis stands out for its scale and ambition.", datePublished: "2025-09-12", publisher: { "@type": "Organization", name: "Oasis Emaar" } } },
    { "@type": "ListItem", position: 4, item: { "@type": "Review", itemReviewed: { "@type": "RealEstateAgent", name: "Oasis Emaar — Authorized Sales Agent" }, author: { "@type": "Person", name: "Dr. Priya Sharma", jobTitle: "Property Investor", worksFor: { "@type": "Organization", name: "Sharma Family Office" } }, reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" }, reviewBody: "As someone who invests in premium real estate across global markets, The Oasis caught my attention for its unique waterfront concept and Emaar's brand credibility.", datePublished: "2025-08-05", publisher: { "@type": "Organization", name: "Oasis Emaar" } } },
    { "@type": "ListItem", position: 5, item: { "@type": "Review", itemReviewed: { "@type": "RealEstateAgent", name: "Oasis Emaar — Authorized Sales Agent" }, author: { "@type": "Person", name: "James O'Brien", jobTitle: "Head of MENA Real Estate", worksFor: { "@type": "Organization", name: "Sterling Capital" } }, reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" }, reviewBody: "The Oasis is positioned in one of Dubai's most promising growth corridors.", datePublished: "2025-07-18", publisher: { "@type": "Organization", name: "Oasis Emaar" } } },
    { "@type": "ListItem", position: 6, item: { "@type": "Review", itemReviewed: { "@type": "RealEstateAgent", name: "Oasis Emaar — Authorized Sales Agent" }, author: { "@type": "Person", name: "Fatima Al-Zaabi", jobTitle: "Family Office Director" }, reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" }, reviewBody: "My family has been investing in Emaar communities since Dubai Marina. The Oasis feels like the next iconic development.", datePublished: "2025-06-30", publisher: { "@type": "Organization", name: "Oasis Emaar" } } },
  ],
};

const residenceJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Residence", "ApartmentComplex"],
  name: "The Oasis by Emaar",
  description: "The Oasis by Emaar is a premium waterfront community in Dubai spanning 9.4 million square metres with over 7,000 residential units including luxury villas, mansions, townhouses, and branded residences across 9 exclusive clusters.",
  url: "https://oasisemaar.com",
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
  description: "Explore The Oasis by Emaar with an authorized sales agent. Premium waterfront community in Dubai featuring luxury villas, mansions, townhouses, apartments, and penthouses. Starting from AED 3.2M.",
  url: "https://oasisemaar.com",
  dateModified: "2026-05-19",
  datePublished: "2024-01-01",
  author: { "@type": "RealEstateAgent", name: "Oasis Emaar — Authorized Sales Agent", telephone: "+971526919169", email: "sales@oasisemaar.com" },
  publisher: { "@type": "Organization", name: "Oasis Emaar", logo: { "@type": "ImageObject", url: "https://oasisemaar.com/logo.svg" } },
  primaryImageOfPage: { "@type": "ImageObject", url: "https://oasisemaar.com/og-image.jpg", width: 1200, height: 630 },
  breadcrumb: { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://oasisemaar.com" }] },
  mainEntity: { "@type": "RealEstateAgent", name: "Oasis Emaar — Authorized Sales Agent" },
};

const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "EventSeries",
  name: "The Oasis by Emaar — Exclusive Viewing & Sales Events",
  description: "Join Oasis Emaar for exclusive property viewing events at The Oasis by Emaar in Dubai.",
  url: "https://oasisemaar.com/contact",
  startDate: "2025-06-01",
  endDate: "2026-12-31",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: { "@type": "Place", name: "The Oasis by Emaar Sales Center", address: { "@type": "PostalAddress", streetAddress: "The Oasis, Dubailand", addressLocality: "Dubai", addressRegion: "Dubai", addressCountry: "AE" }, geo: { "@type": "GeoCoordinates", latitude: 25.1412, longitude: 55.2252 } },
  organizer: { "@type": "RealEstateAgent", name: "Oasis Emaar — Authorized Sales Agent", telephone: "+971526919169", email: "sales@oasisemaar.com", url: "https://oasisemaar.com" },
  offers: { "@type": "AggregateOffer", priceCurrency: "AED", lowPrice: "9180000", highPrice: "50000000", offerCount: "77", availability: "https://schema.org/InStock" },
  performer: { "@type": "Organization", name: "Emaar Properties PJSC" },
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(propertyListJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateRatingJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(residenceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }} />
      <HomePageClient />
    </>
  );
}
