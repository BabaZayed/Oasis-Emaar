import { type Metadata } from "next";
import { getDictionary } from "@/dictionaries";
import { langStaticParams, parseLang } from "@/lib/lang-utils";
import { SITE_URL } from "@/lib/site-config";
import HomePageClient from "@/app/home-page-client";

export function generateStaticParams() {
  return langStaticParams;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const l = parseLang(lang);
  const dict = await getDictionary(l);

  const langLabels: Record<string, string> = {
    ar: "Arabic",
    zh: "Chinese",
    ru: "Russian",
    fr: "French",
    de: "German",
  };

  return {
    title: {
      default: `The Oasis by Emaar | ${langLabels[l] || l} — Ultra Luxury Waterfront Villas in Dubai`,
      template: `%s | Oasis Emaar — ${langLabels[l] || l}`,
    },
    description: dict.common.checkAvailability + ". " + dict.hero.subtitle,
    alternates: {
      canonical: `${SITE_URL}/${l}`,
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

export default async function LangHomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const l = parseLang(lang);

  return (
    <main className="min-h-screen">
      <HomePageClient lang={l} />
    </main>
  );
}
