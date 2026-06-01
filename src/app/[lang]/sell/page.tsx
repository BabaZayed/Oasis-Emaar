import { type Metadata } from "next";
import { getDictionary } from "@/dictionaries";
import { langStaticParams, parseLang } from "@/lib/lang-utils";
import { SITE_URL } from "@/lib/site-config";
import SellClient from "@/app/sell/sell-client";

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
    title: dict.sell.title,
    description: dict.sell.subtitle,
    alternates: {
      canonical: `${SITE_URL}/${l}/sell`,
      languages: {
        en: `${SITE_URL}/sell`,
        ar: `${SITE_URL}/ar/sell`,
        zh: `${SITE_URL}/zh/sell`,
        ru: `${SITE_URL}/ru/sell`,
        fr: `${SITE_URL}/fr/sell`,
        de: `${SITE_URL}/de/sell`,
        "x-default": `${SITE_URL}/sell`,
      },
    },
  };
}

export default async function SellPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const l = parseLang(lang);
  return (
    <SellClient lang={l} />
  );
}
