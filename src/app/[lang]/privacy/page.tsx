import { type Metadata } from "next";
import { getDictionary } from "@/dictionaries";
import { langStaticParams, parseLang } from "@/lib/lang-utils";
import { SITE_URL } from "@/lib/site-config";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

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
    title: dict.privacy.title,
    description: dict.privacy.sections[0]?.content ?? "",
    alternates: {
      canonical: `${SITE_URL}/${l}/privacy`,
      languages: {
        en: `${SITE_URL}/privacy`,
        ar: `${SITE_URL}/ar/privacy`,
        zh: `${SITE_URL}/zh/privacy`,
        ru: `${SITE_URL}/ru/privacy`,
        fr: `${SITE_URL}/fr/privacy`,
        de: `${SITE_URL}/de/privacy`,
        "x-default": `${SITE_URL}/privacy`,
      },
    },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const l = parseLang(lang);
  const dict = await getDictionary(l);

  return (
    <main className="min-h-screen">
      <SiteHeader />
      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[#C8A45C] mb-4">
            {dict.privacy.title}
          </h1>
          <p className="text-white/50 text-sm mb-8">{dict.privacy.lastUpdated}</p>
          <div className="space-y-8">
            {dict.privacy.sections.map((section, idx) => (
              <div key={idx}>
                <h2 className="font-heading text-xl font-semibold text-white mb-3">
                  {section.title}
                </h2>
                <p className="text-white/70 leading-relaxed">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}
