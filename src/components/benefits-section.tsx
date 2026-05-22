"use client";

import { TreePine, ShoppingBag, Utensils, Waves, Building2, Eye } from "lucide-react";
import ScrollReveal from "@/components/scroll-reveal";

const benefits = [
  {
    icon: TreePine,
    title: "Green Oasis",
    description: "25% of the community dedicated to clean, green spaces, jogging tracks, and airy parks for an active, healthy lifestyle.",
  },
  {
    icon: ShoppingBag,
    title: "Retail Boulevard",
    description: "1.5 million square feet of premium retail space featuring luxury brands and world-class shopping experiences.",
  },
  {
    icon: Utensils,
    title: "Dining Destinations",
    description: "A diverse range of restaurants and cafes offering cuisines from around the world, right at your doorstep.",
  },
  {
    icon: Waves,
    title: "Crystal Lagoons",
    description: "Private beaches and crystal-clear lagoons providing resort-style water living within your community.",
  },
  {
    icon: Building2,
    title: "Spacious Residences",
    description: "From large mansions to spacious villas and apartments, each home offers generous living spaces with premium finishes.",
  },
  {
    icon: Eye,
    title: "Breathtaking Views",
    description: "Stunning views of water canals, lakes, parks, and the Dubai skyline from every residence in the community.",
  },
];

export default function BenefitsSection() {
  return (
    <section className="py-28 sm:py-36 bg-[#1A2332] text-white water-wave-bg relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-20 sm:mb-24">
            <span className="font-body text-sm font-semibold tracking-[0.2em] uppercase text-[#C8A45C]">
              Lifestyle
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mt-4 mb-5 text-[#F0EDE6]">
              Benefits of Living at The Oasis
            </h2>
            <p className="font-body text-white/50 max-w-2xl mx-auto text-lg font-light">
              A community designed for those who seek the extraordinary in every aspect of life
            </p>
            <div className="luxury-divider mt-10">
              <span className="diamond" />
            </div>
          </div>
        </ScrollReveal>

        {/* Reduced density: 2 cols on lg instead of 3, more gap */}
        <div className="grid sm:grid-cols-2 gap-10 sm:gap-12">
          {benefits.map((benefit, index) => (
            <ScrollReveal key={benefit.title} delay={index * 0.1} cinematic duration={0.7}>
              <div className="bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] rounded-2xl p-10 sm:p-12 card-premium-hover group relative overflow-hidden">
                {/* Subtle gradient border effect on hover */}
                <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-[#C8A45C]/20 transition-all duration-500" />
                
                {/* Outlined icon with gold accents */}
                <div className="w-16 h-16 rounded-xl border border-[#C8A45C]/20 flex items-center justify-center mb-6 group-hover:border-[#C8A45C]/40 group-hover:bg-[#C8A45C]/8 transition-all duration-500">
                  <benefit.icon className="w-7 h-7 text-[#C8A45C]" />
                </div>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#F0EDE6] mb-3 group-hover:text-[#C8A45C] transition-colors duration-500">{benefit.title}</h3>
                <p className="font-body text-white/50 text-base leading-relaxed font-light">{benefit.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
