"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  Building2,
  Award,
  Handshake,
  Users,
  TrendingUp,
  Globe,
  Clock,
  CheckCircle2,
  Phone,
} from "lucide-react";
import ScrollReveal from "@/components/scroll-reveal";
import { useDict, useLang } from "@/lib/use-dict";
import { langHref } from "@/lib/i18n";
import Link from "next/link";

const trustSignals = [
  {
    icon: ShieldCheck,
    title: "Authorised Emaar Agent",
    description:
      "Officially authorised by Emaar Properties PJSC to represent and sell The Oasis by Emaar. Direct access to developer pricing, inventory, and priority allocations.",
  },
  {
    icon: Award,
    title: "RERA Licensed Brokerage",
    description:
      "Licensed by the Real Estate Regulatory Agency (RERA) under the Dubai Land Department. Operating in full compliance with UAE real estate regulations.",
  },
  {
    icon: TrendingUp,
    title: "9 Clusters, 77+ Units Available",
    description:
      "Comprehensive coverage across all nine exclusive clusters at The Oasis — from Palmiera 3 entry-level villas to Lavita ultra-luxury mansions. Live inventory with real-time availability.",
  },
  {
    icon: Globe,
    title: "Serving International Buyers",
    description:
      "Our team serves buyers from over 40 countries in multiple languages. We assist with everything from property selection to DLD registration and UAE Golden Visa applications.",
  },
  {
    icon: Clock,
    title: "Established Local Presence",
    description:
      "Based in Dubai with direct relationships at Emaar's sales centre. We provide on-the-ground support including site visits, document processing, and post-purchase assistance.",
  },
  {
    icon: CheckCircle2,
    title: "Transparent Pricing & Process",
    description:
      "All prices shown are official Emaar list prices with no hidden markups. We provide clear guidance on payment plans, DLD fees, and the complete buying process from reservation to handover.",
  },
];

const partnerLogos = [
  { name: "Emaar Properties", icon: Building2 },
  { name: "Dubai Land Department", icon: Award },
  { name: "RERA Licensed", icon: ShieldCheck },
  { name: "Dubai Tourism", icon: Handshake },
  { name: "Global Investors", icon: Users },
];

function Shield(props: React.SVGProps<SVGSVGElement> & { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export default function ReferencesSection() {
  const t = useDict();
  const lang = useLang();

  return (
    <section id="references" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-12 sm:mb-16">
            <span className="font-body text-sm font-semibold tracking-[0.2em] uppercase text-[#C8A45C]">
              {t.references.label}
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A2332] mt-3 mb-4">
              {t.references.title}
            </h2>
            <p className="font-body text-gray-500 max-w-2xl mx-auto text-lg">
              {t.references.subtitle}
            </p>
            <div className="section-divider max-w-xs mx-auto mt-6" />
          </div>
        </ScrollReveal>

        {/* Trust Signals Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {trustSignals.map((signal, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <div className="bg-[#F5F0E8] rounded-xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
                {/* Icon */}
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#1A2332] to-[#2A3A52] flex items-center justify-center mb-5">
                  <signal.icon className="w-6 h-6 text-[#C8A45C]" />
                </div>

                {/* Title */}
                <h3 className="font-heading text-lg font-bold text-[#1A2332] mb-3">
                  {signal.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed flex-1 font-body">
                  {signal.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal delay={0.2}>
          <div className="text-center mb-16">
            <div className="inline-flex flex-col sm:flex-row items-center gap-4">
              <Link href={langHref(lang, "/contact")}>
                <Button
                  size="lg"
                  className="btn-gold-glow px-8 py-6 text-base font-semibold"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  {t.references.cta || "Speak With Our Team"}
                </Button>
              </Link>
              <a
                href="https://wa.me/971526919169"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#C8A45C]/30 text-[#1A2332] hover:bg-[#C8A45C]/10 px-8 py-6 text-base font-semibold"
                >
                  WhatsApp Us
                </Button>
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* Trusted By / Partner Logos */}
        <div className="border-t border-gray-200 pt-12">
          <p className="font-body text-center text-sm font-semibold tracking-[0.2em] uppercase text-gray-400 mb-8">
            {t.references.partnersLabel}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            {partnerLogos.map((partner, i) => (
              <div
                key={partner.name}
                className="flex flex-col items-center gap-2 text-gray-400 hover:text-[#C8A45C] transition-colors group"
              >
                <partner.icon className="w-8 h-8 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-medium text-center">
                  {t.references.partners[i]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
