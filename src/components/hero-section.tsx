"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown, Home, Building2, Ruler, Waves } from "lucide-react";
import { formatPrice } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

const stats = [
  { icon: Home, label: "Starting From", value: formatPrice(9180000) },
  { icon: Building2, label: "Residences", value: "7,000+" },
  { icon: Ruler, label: "Total Area", value: "9.4M sqm" },
  { icon: Waves, label: "Crystal Lagoon", value: "3.5 km" },
];

export default function HeroSection() {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/hero-oasis-real.png"
        alt="The Oasis by Emaar - Luxury Waterfront Community"
        fill
        className="object-cover"
        priority
        quality={90}
      />

      {/* Luxury Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D1B2A]/70 via-[#0D1B2A]/40 to-[#0D1B2A]/90" />

      {/* Water-inspired decorative particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#C8A45C]/10 animate-water-particle"
            style={{
              width: `${8 + i * 4}px`,
              height: `${8 + i * 4}px`,
              left: `${15 + i * 14}%`,
              bottom: `${10 + i * 8}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${4 + i * 0.5}s`,
            }}
          />
        ))}
        {/* Gold dust particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`dust-${i}`}
            className="absolute rounded-full bg-[#D4AF37]/20 animate-float"
            style={{
              width: `${3 + (i % 3) * 2}px`,
              height: `${3 + (i % 3) * 2}px`,
              left: `${5 + i * 11}%`,
              top: `${20 + (i % 4) * 15}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i * 0.3}s`,
            }}
          />
        ))}
      </div>

      {/* Decorative blurs */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#C8A45C]/[0.03] rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/[0.03] rounded-full blur-[100px]" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <span className="inline-block px-5 py-2 mb-8 text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase border border-[#C8A45C]/30 text-[#C8A45C] rounded-full backdrop-blur-sm bg-white/[0.03]">
            Authorised Emaar Sales Agent
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[#F0EDE6] mb-4 sm:mb-6 leading-[0.95] tracking-tight"
        >
          The Oasis
          <span className="block gold-text mt-1">by Emaar</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-body text-lg sm:text-xl md:text-2xl text-[#8A9BB5] max-w-3xl mx-auto mb-3 font-light"
        >
          9 Exclusive Clusters · Ultra-Luxury Waterfront Living · Dubai
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-body text-sm sm:text-base text-[#8A9BB5]/70 max-w-2xl mx-auto mb-10 sm:mb-14"
        >
          Address Villas Tierra · Lavita · Mareva · Mirage · Palmiera · Palace Villas Ostra
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14 sm:mb-20"
        >
          <Link href="/projects" className="w-full sm:w-auto">
            <Button size="lg" className="btn-gold px-10 py-7 text-base w-full sm:w-auto">
              Explore All 9 Clusters
            </Button>
          </Link>
          <Link href="/availability" className="w-full sm:w-auto">
            <Button size="lg" className="btn-outline-gold px-10 py-7 text-base w-full sm:w-auto bg-transparent">
              Check Availability
            </Button>
          </Link>
        </motion.div>

        {/* Stats with glass-morphism */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5 max-w-4xl mx-auto"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="glass-card p-5 sm:p-7 text-center card-luxury-hover"
            >
              <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#C8A45C] mx-auto mb-3" />
              <p className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-[#F0EDE6] mb-1">
                {stat.value}
              </p>
              <p className="font-body text-xs sm:text-sm text-[#8A9BB5] uppercase tracking-[0.15em]">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
        onClick={() => scrollTo("#projects")}
      >
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <ChevronDown className="w-8 h-8 text-[#C8A45C]/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
