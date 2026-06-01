"use client";

import { TreePine, ShoppingBag, Utensils, Waves, Building2, Eye } from "lucide-react";
import ScrollReveal from "@/components/scroll-reveal";
import { useDict } from "@/lib/use-dict";

const icons = [TreePine, ShoppingBag, Utensils, Waves, Building2, Eye];

export default function BenefitsSection() {
  const t = useDict();

  return (
    <section className="py-28 sm:py-36 bg-[#1A2332] text-white water-wave-bg relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-20 sm:mb-24">
            <span className="font-body text-sm font-semibold tracking-[0.2em] uppercase text-[#C8A45C]">
              {t.benefits.label}
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mt-4 mb-5 text-[#F0EDE6]">
              {t.benefits.title}
            </h2>
            <p className="font-body text-white/60 max-w-2xl mx-auto text-lg font-light">
              {t.benefits.subtitle}
            </p>
            <div className="luxury-divider mt-10">
              <span className="diamond" />
            </div>
          </div>
        </ScrollReveal>

        {/* Reduced density: 2 cols on lg instead of 3, more gap */}
        <div className="grid sm:grid-cols-2 gap-10 sm:gap-12">
          {t.benefits.items.map((benefit, index) => {
            const Icon = icons[index];
            return (
              <ScrollReveal key={benefit.title} delay={index * 0.1} cinematic duration={0.7}>
                <div className="bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] rounded-2xl p-10 sm:p-12 card-premium-hover group relative overflow-hidden">
                  {/* Subtle gradient border effect on hover */}
                  <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-[#C8A45C]/20 transition-all duration-500" />
                  
                  {/* Outlined icon with gold accents */}
                  <div className="w-16 h-16 rounded-xl border border-[#C8A45C]/20 flex items-center justify-center mb-6 group-hover:border-[#C8A45C]/40 group-hover:bg-[#C8A45C]/8 transition-all duration-500">
                    <Icon className="w-7 h-7 text-[#C8A45C]" />
                  </div>
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#F0EDE6] mb-3 group-hover:text-[#C8A45C] transition-colors duration-500">{benefit.title}</h3>
                  <p className="font-body text-white/60 text-base leading-relaxed font-light">{benefit.desc}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
