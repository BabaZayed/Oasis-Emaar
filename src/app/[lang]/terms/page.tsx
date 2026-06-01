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
    title: dict.terms.title,
    description: dict.terms.sections[0]?.content ?? "",
    alternates: {
      canonical: `${SITE_URL}/${l}/terms`,
      languages: {
        en: `${SITE_URL}/terms`,
        ar: `${SITE_URL}/ar/terms`,
        zh: `${SITE_URL}/zh/terms`,
        ru: `${SITE_URL}/ru/terms`,
        fr: `${SITE_URL}/fr/terms`,
        de: `${SITE_URL}/de/terms`,
        "x-default": `${SITE_URL}/terms`,
      },
    },
  };
}

export default async function TermsPage({
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
            {dict.terms.title}
          </h1>
          <div className="space-y-8">
            {dict.terms.sections.map((section, idx) => (
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
