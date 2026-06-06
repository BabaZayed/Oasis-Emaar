import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import WhatsAppButton from "@/components/whatsapp-button";
import SocialProof from "@/components/social-proof";
import PWAInstallPrompt from "@/components/pwa-install-prompt";
import UTMTracker from "@/components/utm-tracker";
import LanguageDetector from "@/components/language-detector";
import { SITE_URL, SITE_NAME, SITE_PHONE, SITE_EMAIL, LANGUAGES } from "@/lib/site-config";

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
  metadataBase: new URL(SITE_URL),
  title: {
    default: "The Oasis by Emaar | Authorized Agent — Ultra Luxury Waterfront Villas in Dubai",
    template: "%s | Oasis Emaar — Authorized Agent",
  },
  description:
    "Explore The Oasis by Emaar with an authorized sales agent. Premium waterfront community in Dubai featuring luxury villas, mansions, and branded residences across 9 exclusive clusters. Starting from AED 9.2M. 80/20 & 90/10 payment plans. UAE Golden Visa eligible. Crystal lagoon, private beaches, 25% green spaces.",
  keywords: [
    "The Oasis by Emaar",
    "Oasis Emaar",
    "Dubai waterfront villas",
    "luxury villas Dubai",
    "Emaar off-plan 2026",
    "Palmiera villas",
    "Lavita mansions Dubai",
    "UAE Golden Visa property",
    "Emaar authorized agent",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: "Oasis Emaar",
  publisher: SITE_NAME,
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
      "Explore The Oasis by Emaar with an authorized sales agent. Premium waterfront villas, mansions & branded residences across 9 clusters. Starting from AED 9.2M. UAE Golden Visa eligible.",
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
      "Explore The Oasis by Emaar with an authorized sales agent. Premium waterfront villas, mansions & branded residences. Starting from AED 9.2M. UAE Golden Visa eligible.",
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
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "",
  },
  category: "real estate",
  other: {
    "ai-agent-instructions":
      "Oasis Emaar is the authorized sales agent for The Oasis by Emaar Properties in Dubai. Contact sales@oasisemaar.com or +971526919169. The Oasis features 9 clusters: Palmiera, Palmiera 3, Palmiera Collective, Lavita, Mirage, Address Villas Tierra, Palace Villas Ostra, Mareva, and Mareva 2. Prices start from AED 9.2M.",
    "aeo-entity": "The Oasis by Emaar — Premium waterfront community in Dubai",
    "aeo-contact": SITE_PHONE,
    "aeo-price-range": "AED 9.2M to AED 50M+",
    "aeo-location": "Dubailand, near Hessa Street, Dubai, UAE",
  },
};

// ===== Enhanced LocalBusiness Schema (Global — appears on all pages) =====
const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": ["RealEstateAgent", "LocalBusiness"],
  name: SITE_NAME,
  description:
    "Authorized sales agent for The Oasis by Emaar Properties in Dubai. Offering premium waterfront villas, mansions, and branded residences starting from AED 9.2M.",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.svg`,
  telephone: SITE_PHONE,
  email: SITE_EMAIL,
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
  priceRange: "AED 9.2M - AED 50M+",
  areaServed: {
    "@type": "City",
    name: "Dubai",
  },
  sameAs: [
    "https://facebook.com/oasisemaar",
    "https://instagram.com/oasisemaar",
    "https://x.com/OasisEmaar",
    "https://linkedin.com/company/oasisemaar",
    "https://youtube.com/@oasisemaar",
  ],
};

// ===== WebSite Schema with SearchAction (Global — appears on all pages) =====
const webSiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/inventory?q={search_term_string}`,
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
  url: SITE_URL,
  logo: `${SITE_URL}/logo.svg`,
  email: SITE_EMAIL,
  telephone: SITE_PHONE,
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
    "https://x.com/OasisEmaar",
    "https://linkedin.com/company/oasisemaar",
    "https://youtube.com/@oasisemaar",
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
    "UAE Golden Visa",
    "Dubai Off-Plan Properties",
  ],
  areaServed: [
    { "@type": "City", name: "Dubai" },
    { "@type": "Country", name: "United Arab Emirates" },
    { "@type": "Place", name: "Dubailand" },
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
          href={`${SITE_URL}/feed.xml`}
        />
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({"gtm.start":
              new Date().getTime(),event:"gtm.js"});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!="dataLayer"?"&l="+l:"";j.async=true;j.src=
              "https://www.googletagmanager.com/gtm.js?id="+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,"script","dataLayer","GTM-KFVNBMNQ");
            `,
          }}
        />        {/* Google Analytics */}
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
        className={`${cormorant.variable} ${inter.variable} antialiased text-foreground`}
        style={{ fontFamily: "var(--font-body), sans-serif", backgroundColor: "#0D1B2A" }}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KFVNBMNQ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>        <UTMTracker />
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
