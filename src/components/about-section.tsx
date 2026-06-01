"use client";

import { Building2, Award, Users, TrendingUp, Shield, Leaf, Handshake, Star, ExternalLink, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AGENCY_DISCLAIMER } from "@/lib/data";
import Link from "next/link";
import { useDict } from "@/lib/use-dict";

const stats = [
  { icon: Award, value: "9", label: "Exclusive Clusters" },
  { icon: Building2, value: "7,000+", label: "Residences" },
  { icon: Users, value: "9.4M", label: "Sqm Community" },
  { icon: TrendingUp, value: "AED 73B+", label: "Project Value" },
];

const reasons = [
  {
    icon: Handshake,
    title: "Authorised Emaar Agent",
    description: "We are an officially authorised sales agent for Emaar Properties, giving you direct access to The Oasis inventory, pricing, and pre-launch opportunities. Our relationship with Emaar ensures you receive accurate, up-to-date information and priority service throughout your purchase journey.",
  },
  {
    icon: Star,
    title: "Expert Market Knowledge",
    description: "With deep expertise across all 9 clusters at The Oasis, from the entry-level Palmiera 3 to the ultra-luxury Lavita mansions, we provide personalised guidance to match your lifestyle and investment goals. We understand the nuances of each cluster and can advise on the best options for your needs.",
  },
  {
    icon: Leaf,
    title: "Waterfront Living Redefined",
    description: "The Oasis is set across 9.4 million square metres of waterfront landscape featuring crystal-clear lagoons, water canals, and lush green parks. With 25% dedicated to green spaces, 1.5 million sqft of retail, and private beaches, it offers a resort-style lifestyle just 20 minutes from Downtown Dubai.",
  },
  {
    icon: Shield,
    title: "Secure Investment",
    description: "Emaar Properties is one of the world's most trusted developers with a proven track record. The Oasis offers 100% freehold ownership for all nationalities, flexible payment plans (80/20 and 90/10), and Golden Visa eligibility for properties above AED 2 million — making it an excellent investment opportunity.",
  },
];

const authoritativeResources = [
  {
    name: "Emaar Properties PJSC",
    url: "https://www.emaar.com",
    description: "Official website of the developer behind The Oasis, Downtown Dubai, and Dubai Mall",
  },
  {
    name: "Dubai Land Department (DLD)",
    url: "https://www.dubailand.gov.ae",
    description: "Government authority regulating real estate transactions and title deeds in Dubai",
  },
  {
    name: "RERA — Real Estate Regulatory Agency",
    url: "https://www.rpdubai.ae",
    description: "Dubai's real estate regulatory body that licenses brokers and protects buyer rights",
  },
  {
    name: "Dubai REST App",
    url: "https://dubairest.gov.ae",
    description: "Official Dubai government platform for real estate self-services and property verification",
  },
];

export default function AboutSection({ lang }: { lang?: import("@/lib/i18n").LangCode }) {
  const t = useDict();
  return (
    <section id="about" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <span className="font-body text-sm font-semibold tracking-[0.2em] uppercase text-[#C8A45C]">
            {t.about.label}
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A2332] mt-3 mb-4">
            {t.about.title}
          </h1>
          <p className="font-body text-gray-500 max-w-2xl mx-auto">
            {t.about.description}
          </p>
          <div className="section-divider max-w-xs mx-auto mt-6" />
        </div>

        {/* Story */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h3 className="font-heading text-2xl font-bold text-[#1A2332] mb-4">{t.about.whyChooseTitle}</h3>
              <p className="font-body text-gray-600 leading-relaxed mb-4">
                The Oasis by Emaar is a master-planned waterfront community that represents the next chapter in Dubai&apos;s evolution as a global destination for luxury living. Spanning over 9.4 million square metres, this visionary development is home to more than 7,000 residences across nine distinctive clusters, each surrounded by crystal-clear lagoons, water canals, and lush green parks.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                As your authorised{" "}
                <a
                  href="https://www.emaar.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C8A45C] hover:underline inline-flex items-center gap-0.5"
                >
                  Emaar
                  <ExternalLink className="w-3 h-3" />
                </a>{" "}
                sales agent, we provide exclusive access to inventory, priority viewings, and expert guidance across all clusters — from the accessible luxury of{" "}
                <Link href="/projects/palmiera-3" className="text-[#C8A45C] hover:underline">Palmiera 3</Link>{" "}
                to the ultra-exclusive{" "}
                <Link href="/projects/lavita" className="text-[#C8A45C] hover:underline">Lavita mansions</Link>{" "}
                and branded residences by{" "}
                <a
                  href="https://www.addresshotels.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C8A45C] hover:underline inline-flex items-center gap-0.5"
                >
                  Address Hotels
                  <ExternalLink className="w-3 h-3" />
                </a>{" "}
                and{" "}
                <a
                  href="https://www.palacehotels.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C8A45C] hover:underline inline-flex items-center gap-0.5"
                >
                  Palace
                  <ExternalLink className="w-3 h-3" />
                </a>
                . We are not Emaar Properties directly, but an independent brokerage authorised to sell on their behalf.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Whether you are seeking a family home, a branded investment, or an ultra-luxury estate, our team offers personalised service and deep market knowledge to help you make the right decision within The Oasis community.
              </p>
            </div>
            <div className="bg-gradient-to-br from-[#1A2332] to-[#2A3A52] rounded-xl p-8 sm:p-10 text-white h-full flex flex-col justify-center">
              <h4 className="font-heading text-xl font-bold text-[#C8A45C] mb-6">{t.about.oasisCardTitle}</h4>
              <p className="font-body text-white/70 leading-relaxed mb-6">
                {t.about.oasisCardDesc}
              </p>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <stat.icon className="w-5 h-5 text-[#C8A45C] mx-auto mb-1" />
                    <p className="font-heading text-lg font-bold">{stat.value}</p>
                    <p className="font-body text-xs text-white/50">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div>
          <h3 className="font-heading text-2xl font-bold text-center text-[#1A2332] mb-8">
            {t.about.whyChooseSubtitle}
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {reasons.map((reason, idx) => (
              <div
                key={idx}
                className="bg-[#F5F0E8] rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-12 h-12 rounded-lg gold-gradient flex items-center justify-center mb-4">
                  <reason.icon className="w-6 h-6 text-[#1A2332]" />
                </div>
                <h4 className="font-heading font-bold text-[#1A2332] mb-2">{t.about.reasons[idx]?.title || reason.title}</h4>
                <p className="font-body text-sm text-gray-600 leading-relaxed">{t.about.reasons[idx]?.desc || reason.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Internal Cross-Links — Explore The Oasis */}
        <div className="mt-16 bg-[#F5F0E8] rounded-xl p-8 sm:p-10">
          <h3 className="font-heading text-2xl font-bold text-[#1A2332] mb-2 text-center">
            {t.about.exploreTitle}
          </h3>
          <p className="font-body text-gray-500 text-center mb-8 max-w-2xl mx-auto">
            {t.about.exploreSubtitle}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {t.about.exploreLinks.map((link, idx) => {
              const paths = ["/projects", "/payment-plan", "/availability", "/faq", "/floor-plans", "/gallery", "/blog", "/contact"];
              return (
                <Link
                  key={idx}
                  href={paths[idx]}
                  className="flex items-center justify-between bg-white rounded-lg p-4 hover:shadow-md transition-shadow group"
                >
                  <div>
                    <p className="font-heading font-bold text-[#1A2332] text-sm">{link.title}</p>
                    <p className="text-xs text-gray-500">{link.desc}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#C8A45C] group-hover:translate-x-1 transition-transform" />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Authoritative Resources — Outbound Links */}
        <div className="mt-12">
          <h3 className="font-heading text-xl font-bold text-[#1A2332] mb-2 text-center">
            {t.about.resourcesTitle}
          </h3>
          <p className="font-body text-gray-500 text-sm text-center mb-6 max-w-xl mx-auto">
            {t.about.resourcesSubtitle}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {t.about.resources.map((resource, idx) => {
              const urls = ["https://www.emaar.com", "https://www.dubailand.gov.ae", "https://www.rpdubai.ae", "https://dubairest.gov.ae"];
              return (
                <a
                  key={idx}
                  href={urls[idx]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors group"
                >
                  <ExternalLink className="w-4 h-4 text-[#C8A45C] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-heading font-bold text-[#1A2332] text-sm group-hover:text-[#C8A45C] transition-colors">{resource.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{resource.desc}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 bg-gray-50 rounded-lg p-6 text-center">
          <p className="text-xs text-gray-400 leading-relaxed max-w-4xl mx-auto">{AGENCY_DISCLAIMER}</p>
        </div>

        <div className="text-center mt-8">
          <Button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            size="lg"
            className="gold-gradient text-[#1A2332] font-bold px-8 py-6 rounded-md hover:opacity-90"
          >
            {t.about.scheduleViewing}
          </Button>
        </div>
      </div>
    </section>
  );
}
