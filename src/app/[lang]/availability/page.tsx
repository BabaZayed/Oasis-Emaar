import { type Metadata } from "next";
import { getDictionary } from "@/dictionaries";
import { langStaticParams, parseLang } from "@/lib/lang-utils";
import { SITE_URL } from "@/lib/site-config";
import AvailabilityPageClient from "@/app/availability/availability-page-client";

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
    title: dict.availability.title + " " + dict.availability.titleHighlight,
    description: dict.availability.subtitle,
    alternates: {
      canonical: `${SITE_URL}/${l}/availability`,
      languages: {
        en: `${SITE_URL}/availability`,
        ar: `${SITE_URL}/ar/availability`,
        zh: `${SITE_URL}/zh/availability`,
        ru: `${SITE_URL}/ru/availability`,
        fr: `${SITE_URL}/fr/availability`,
        de: `${SITE_URL}/de/availability`,
        "x-default": `${SITE_URL}/availability`,
      },
    },
  };
}

export default async function AvailabilityPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const l = parseLang(lang);
  return (
    <AvailabilityPageClient lang={l} />
  );
}
