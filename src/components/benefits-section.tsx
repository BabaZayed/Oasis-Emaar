"use client";

import { TreePine, ShoppingBag, Utensils, Waves, Building2, Eye } from "lucide-react";

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
    <section className="py-20 sm:py-28 bg-[#1A2332] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-sm font-semibold tracking-[0.2em] uppercase text-[#C8A45C]">
            Lifestyle
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-4">
            Benefits of Living at The Oasis
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            A community designed for those who seek the extraordinary in every aspect of life
          </p>
          <div className="section-divider max-w-xs mx-auto mt-6" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-[#C8A45C]/30 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-lg gold-gradient flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <benefit.icon className="w-6 h-6 text-[#1A2332]" />
              </div>
              <h3 className="text-lg font-bold text-[#C8A45C] mb-2">{benefit.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
