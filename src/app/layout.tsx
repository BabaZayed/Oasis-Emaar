import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import WhatsAppButton from "@/components/whatsapp-button";
import SocialProof from "@/components/social-proof";
import PWAInstallPrompt from "@/components/pwa-install-prompt";
import UTMTracker from "@/components/utm-tracker";
import LanguageDetector from "@/components/language-detector";

const cormorant = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://oasisemaar.com"),
  title: {
    default: "The Oasis by Emaar | Authorized Agent — Ultra Luxury Waterfront Villas in Dubai",
    template: "%s | Oasis Emaar — Authorized Agent",
  },
  description:
    "Explore The Oasis by Emaar with an authorized sales agent. Premium waterfront community in Dubai featuring luxury villas, mansions, and branded residences across 9 exclusive clusters. Starting from AED 9.18M. 80/20 & 90/10 payment plans. UAE Golden Visa eligible. Crystal lagoon, private beaches, 25% green spaces. Expert guidance, exclusive inventory access.",
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
  authors: [{ name: "Oasis Emaar — Authorized Sales Agent", url: "https://oasisemaar.com" }],
  creator: "Oasis Emaar",
  publisher: "Oasis Emaar — Authorized Emaar Agent",
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
  openGraph: {
    title: "The Oasis by Emaar | Authorized Agent — Ultra Luxury Waterfront Villas in Dubai",
    description:
      "Explore The Oasis by Emaar with an authorized sales agent. Premium waterfront villas, mansions & branded residences across 9 clusters. Starting from AED 9.18M. UAE Golden Visa eligible.",
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
      "Explore The Oasis by Emaar with an authorized sales agent. Premium waterfront villas, mansions & branded residences. Starting from AED 9.18M. UAE Golden Visa eligible.",
    images: ["/og-image.jpg"],
    creator: "@OasisEmaar",
    site: "@OasisEmaar",
  },
  alternates: {
    canonical: "https://oasisemaar.com",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "YOUR_GOOGLE_VERIFICATION_CODE",
  },
  category: "real estate",
  other: {
    "ai-agent-instructions":
      "Oasis Emaar is the authorized sales agent for The Oasis by Emaar Properties in Dubai. Contact sales@oasisemaar.com or +971526919169. The Oasis features 9 clusters: Palmiera, Palmiera 3, Palmeira Collective, Lavita, Mirage, Adress Villas Tierra, Palace Villas Ostra, Mareva, and Mareva 2. Prices start from AED 9.18M.",
    "aeo-entity": "The Oasis by Emaar — Premium waterfront community in Dubai",
    "aeo-contact": "+971526919169",
    "aeo-price-range": "AED 9.18M to AED 50M+",
    "aeo-location": "Dubailand, near Hessa Street, Dubai, UAE",
  },
};

// ===== Enhanced LocalBusiness Schema (Global — appears on all pages) =====
const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": ["RealEstateAgent", "LocalBusiness"],
  name: "Oasis Emaar — Authorized Sales Agent",
  description:
    "Authorized sales agent for The Oasis by Emaar Properties in Dubai. Offering premium waterfront villas, mansions, and branded residences starting from AED 9.18M.",
  url: "https://oasisemaar.com",
  logo: "https://oasisemaar.com/logo.svg",
  telephone: "+971526919169",
  email: "sales@oasisemaar.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Al Quoz Street 21",
    addressLocality: "Dubai",
    addressRegion: "Dubai",
    addressCountry: "AE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 25.1412,
    longitude: 55.2252,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "09:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Friday",
      opens: "14:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "10:00",
      closes: "16:00",
    },
  ],
  priceRange: "AED 9.18M - AED 50M+",
  areaServed: {
    "@type": "City",
    name: "Dubai",
  },
  sameAs: [
    "https://facebook.com/oasisemaar",
    "https://instagram.com/oasisemaar",
    "https://twitter.com/OasisEmaar",
    "https://linkedin.com/company/oasisemaar",
    "https://thegrandpolo.com",
    "https://theoasisemaar.com",
  ],
};

// ===== WebSite Schema with SearchAction (Global — appears on all pages) =====
const webSiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Oasis Emaar — Authorized Sales Agent",
  url: "https://oasisemaar.com",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://oasisemaar.com/inventory?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
  inLanguage: "en",
  copyrightHolder: {
    "@type": "Organization",
    name: "Oasis Emaar",
  },
};

// ===== Organization Schema (Global — appears on all pages) =====
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Oasis Emaar",
  legalName: "Oasis Emaar Real Estate Brokerage",
  description: "Authorized sales agent for The Oasis by Emaar Properties PJSC in Dubai, UAE. Independent licensed real estate brokerage offering expert guidance, exclusive inventory access, and personalized service.",
  url: "https://oasisemaar.com",
  logo: "https://oasisemaar.com/logo.svg",
  email: "sales@oasisemaar.com",
  telephone: "+971526919169",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Al Quoz Street 21",
    addressLocality: "Dubai",
    addressRegion: "Dubai",
    addressCountry: "AE",
  },
  sameAs: [
    "https://facebook.com/oasisemaar",
    "https://instagram.com/oasisemaar",
    "https://twitter.com/OasisEmaar",
    "https://linkedin.com/company/oasisemaar",
    "https://thegrandpolo.com",
    "https://theoasisemaar.com",
  ],
  foundingLocation: {
    "@type": "Place",
    name: "Dubai, UAE",
  },
  knowsAbout: [
    "Dubai Real Estate",
    "Emaar Properties",
    "The Oasis Community",
    "Luxury Waterfront Villas",
    "Off-Plan Property Sales",
    "Dubai Property Investment",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* PWA Manifest & Meta */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#C8A45C" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Oasis Emaar" />
        {/* RSS Feed Auto-Discovery */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Oasis Emaar Blog RSS Feed"
          href="https://oasisemaar.com/feed.xml"
        />
        {/* Hreflang Tags for Multilingual SEO */}
        <link rel="alternate" hrefLang="en" href="https://oasisemaar.com" />
        <link rel="alternate" hrefLang="ar" href="https://oasisemaar.com/ar" />
        <link rel="alternate" hrefLang="zh" href="https://oasisemaar.com/zh" />
        <link rel="alternate" hrefLang="ru" href="https://oasisemaar.com/ru" />
        <link rel="alternate" hrefLang="fr" href="https://oasisemaar.com/fr" />
        <link rel="alternate" hrefLang="de" href="https://oasisemaar.com/de" />
        <link rel="alternate" hrefLang="x-default" href="https://oasisemaar.com" />
        {/* Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID || "G-QPQCZZ61FN"}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID || "G-QPQCZZ61FN"}', {
                page_title: document.title,
                page_location: window.location.href,
              });
            `,
          }}
        />
        {/* Meta Pixel */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${process.env.NEXT_PUBLIC_META_PIXEL_ID || "1013154287947335"}');
              fbq('track', 'PageView');
            `,
          }}
        />
        {/* JSON-LD: Enhanced LocalBusiness Schema (Global) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        {/* JSON-LD: WebSite Schema with SearchAction (Global) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
        />
        {/* JSON-LD: Organization Schema (Global) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body
        className={`${cormorant.variable} ${inter.variable} antialiased bg-background text-foreground`}
        style={{ fontFamily: "var(--font-body), sans-serif" }}
      >
        <UTMTracker />
        <LanguageDetector />
        {children}
        <WhatsAppButton />
        <SocialProof />
        <PWAInstallPrompt />
        <Toaster />
      </body>
    </html>
  );
}
