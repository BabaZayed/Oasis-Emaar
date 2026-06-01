import { type Metadata } from "next";
import { getDictionary } from "@/dictionaries";
import { langStaticParams, parseLang } from "@/lib/lang-utils";
import { SITE_URL } from "@/lib/site-config";
import ListingsPageClient from "@/app/listings/listings-page-client";

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
    title: dict.listings.title + " " + dict.listings.titleHighlight,
    description: dict.listings.subtitle,
    alternates: {
      canonical: `${SITE_URL}/${l}/listings`,
      languages: {
        en: `${SITE_URL}/listings`,
        ar: `${SITE_URL}/ar/listings`,
        zh: `${SITE_URL}/zh/listings`,
        ru: `${SITE_URL}/ru/listings`,
        fr: `${SITE_URL}/fr/listings`,
        de: `${SITE_URL}/de/listings`,
        "x-default": `${SITE_URL}/listings`,
      },
    },
  };
}

export default async function ListingsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const l = parseLang(lang);
  return (
    <ListingsPageClient lang={l} />
  );
}
