import { type Metadata } from "next";
import { getDictionary } from "@/dictionaries";
import { langStaticParams, parseLang } from "@/lib/lang-utils";
import { SITE_URL } from "@/lib/site-config";
import MarketplaceClient from "@/app/marketplace/marketplace-client";

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
  return {
    title: dict.marketplace.title,
    description: dict.marketplace.subtitle,
    alternates: {
      canonical: `${SITE_URL}/${l}/marketplace`,
      languages: {
        en: `${SITE_URL}/marketplace`,
        ar: `${SITE_URL}/ar/marketplace`,
        zh: `${SITE_URL}/zh/marketplace`,
        ru: `${SITE_URL}/ru/marketplace`,
        fr: `${SITE_URL}/fr/marketplace`,
        de: `${SITE_URL}/de/marketplace`,
        "x-default": `${SITE_URL}/marketplace`,
      },
    },
  };
}

export default async function MarketplacePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const l = parseLang(lang);
  return (
    <MarketplaceClient lang={l} />
  );
}
