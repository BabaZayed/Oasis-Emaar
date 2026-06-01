import { type Metadata } from "next";
import { getDictionary } from "@/dictionaries";
import { langStaticParams, parseLang } from "@/lib/lang-utils";
import { SITE_URL } from "@/lib/site-config";
import FloorPlansClient from "@/app/floor-plans/floor-plans-client";

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
    title: dict.floorPlans.title,
    description: dict.floorPlans.subtitle,
    alternates: {
      canonical: `${SITE_URL}/${l}/floor-plans`,
      languages: {
        en: `${SITE_URL}/floor-plans`,
        ar: `${SITE_URL}/ar/floor-plans`,
        zh: `${SITE_URL}/zh/floor-plans`,
        ru: `${SITE_URL}/ru/floor-plans`,
        fr: `${SITE_URL}/fr/floor-plans`,
        de: `${SITE_URL}/de/floor-plans`,
        "x-default": `${SITE_URL}/floor-plans`,
      },
    },
  };
}

export default async function FloorPlansPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const l = parseLang(lang);
  return (
    <FloorPlansClient lang={l} />
  );
}
