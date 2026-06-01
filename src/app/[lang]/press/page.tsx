import { type Metadata } from "next";
import { getDictionary } from "@/dictionaries";
import { langStaticParams, parseLang } from "@/lib/lang-utils";
import { SITE_URL } from "@/lib/site-config";
import PressKitClient from "@/app/press/press-kit-client";

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
    title: dict.press.title,
    description: dict.press.subtitle,
    alternates: {
      canonical: `${SITE_URL}/${l}/press`,
      languages: {
        en: `${SITE_URL}/press`,
        ar: `${SITE_URL}/ar/press`,
        zh: `${SITE_URL}/zh/press`,
        ru: `${SITE_URL}/ru/press`,
        fr: `${SITE_URL}/fr/press`,
        de: `${SITE_URL}/de/press`,
        "x-default": `${SITE_URL}/press`,
      },
    },
  };
}

export default async function PressPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const l = parseLang(lang);
  return (
    <PressKitClient lang={l} />
  );
}
