import { type Metadata } from "next";
import { getDictionary } from "@/dictionaries";
import { langStaticParams, parseLang } from "@/lib/lang-utils";
import { SITE_URL } from "@/lib/site-config";
import MasterPlanPageClient from "@/app/master-plan/master-plan-page-client";

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
    title: dict.masterPlan.title,
    description: dict.masterPlan.subtitle,
    alternates: {
      canonical: `${SITE_URL}/${l}/master-plan`,
      languages: {
        en: `${SITE_URL}/master-plan`,
        ar: `${SITE_URL}/ar/master-plan`,
        zh: `${SITE_URL}/zh/master-plan`,
        ru: `${SITE_URL}/ru/master-plan`,
        fr: `${SITE_URL}/fr/master-plan`,
        de: `${SITE_URL}/de/master-plan`,
        "x-default": `${SITE_URL}/master-plan`,
      },
    },
  };
}

export default async function MasterPlanPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const l = parseLang(lang);
  return (
    <MasterPlanPageClient lang={l} />
  );
}
