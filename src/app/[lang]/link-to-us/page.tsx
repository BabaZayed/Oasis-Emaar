import { type Metadata } from "next";
import { getDictionary } from "@/dictionaries";
import { langStaticParams, parseLang } from "@/lib/lang-utils";
import { SITE_URL } from "@/lib/site-config";
import LinkToUsClient from "@/app/link-to-us/link-to-us-client";

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
    title: dict.linkToUs.title + " " + dict.linkToUs.titleHighlight,
    description: dict.linkToUs.subtitle,
    alternates: {
      canonical: `${SITE_URL}/${l}/link-to-us`,
      languages: {
        en: `${SITE_URL}/link-to-us`,
        ar: `${SITE_URL}/ar/link-to-us`,
        zh: `${SITE_URL}/zh/link-to-us`,
        ru: `${SITE_URL}/ru/link-to-us`,
        fr: `${SITE_URL}/fr/link-to-us`,
        de: `${SITE_URL}/de/link-to-us`,
        "x-default": `${SITE_URL}/link-to-us`,
      },
    },
  };
}

export default async function LinkToUsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const l = parseLang(lang);
  return (
    <LinkToUsClient lang={l} />
  );
}
