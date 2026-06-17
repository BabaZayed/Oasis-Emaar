import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "../globals.css";
import { Toaster } from "@/components/ui/toaster";
import WhatsAppButton from "@/components/whatsapp-button";
import SocialProof from "@/components/social-proof";
import PWAInstallPrompt from "@/components/pwa-install-prompt";
import UTMTracker from "@/components/utm-tracker";
import { SITE_URL, SITE_NAME, SITE_PHONE, SITE_EMAIL } from "@/lib/site-config";
import { langCodes, type LangCode } from "@/lib/i18n";
import { getDictionary } from "@/dictionaries";
import LanguageDetector from "@/components/language-detector";

// Global structured data (same schemas as root layout)
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
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"], opens: "09:00", closes: "18:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "14:00", closes: "18:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "10:00", closes: "16:00" },
  ],
  priceRange: "AED 9.2M - AED 50M+",
  areaServed: { "@type": "City", name: "Dubai" },
  sameAs: [
    "https://facebook.com/oasisemaar",
    "https://instagram.com/oasisemaar",
    "https://x.com/OasisEmaar",
    "https://linkedin.com/company/oasisemaar",
    "https://youtube.com/@oasisemaar",
  ],
};

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
  copyrightHolder: { "@type": "Organization", name: "Oasis Emaar" },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Oasis Emaar",
  legalName: "Oasis Emaar Real Estate Brokerage",
  description: "Authorized sales agent for The Oasis by Emaar Properties PJSC in Dubai, UAE.",
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
  areaServed: [
    { "@type": "City", name: "Dubai" },
    { "@type": "Country", name: "United Arab Emirates" },
  ],
};

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

const langLabels: Record<LangCode, string> = {
  en: "English",
  ar: "Arabic",
  zh: "Chinese",
  ru: "Russian",
  fr: "French",
  de: "German",
};

export async function generateStaticParams() {
  return langCodes
    .filter((l) => l !== "en") // English is at root
    .map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const safeLang = (lang || "ar") as LangCode;
  const dict = await getDictionary(safeLang);
  const langDir = safeLang === "ar" ? "rtl" : "ltr";

  return {
    title: {
      default: `The Oasis by Emaar | ${langLabels[safeLang]} — Ultra Luxury Waterfront Villas in Dubai`,
      template: `%s | Oasis Emaar — ${langLabels[safeLang]}`,
    },
    description: dict.common.checkAvailability + ". " + dict.hero.subtitle,
    alternates: {
      canonical: `${SITE_URL}/${safeLang}`,
      languages: {
        en: SITE_URL,
        ar: `${SITE_URL}/ar`,
        zh: `${SITE_URL}/zh`,
        ru: `${SITE_URL}/ru`,
        fr: `${SITE_URL}/fr`,
        de: `${SITE_URL}/de`,
        "x-default": SITE_URL,
      },
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const safeLang = (lang || "ar") as LangCode;
  const isRTL = safeLang === "ar";
  const langDir = isRTL ? "rtl" : "ltr";

  return (
    <html lang={safeLang} dir={langDir} suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#C8A45C" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Oasis Emaar" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Oasis Emaar Blog RSS Feed"
          href={`${SITE_URL}/feed.xml`}
        />
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
        {/* JSON-LD: Global structured data for language variants */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body
        className={`${cormorant.variable} ${inter.variable} antialiased text-foreground`}
        style={{ fontFamily: "var(--font-body), sans-serif", backgroundColor: "#0D1B2A" }}
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
