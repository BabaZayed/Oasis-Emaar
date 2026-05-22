"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown, Home, Building2, Ruler, Waves, ShieldCheck } from "lucide-react";
import { formatPrice } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

const stats = [
  { icon: Home, label: "Starting From", value: formatPrice(9180000) },
  { icon: Building2, label: "Residences", value: "7,000+" },
  { icon: Ruler, label: "Total Area", value: "9.4M sqm" },
  { icon: Waves, label: "Crystal Lagoon", value: "3.5 km" },
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax: background zooms/shifts on scroll
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.7]);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0"
        style={{ scale: bgScale, y: bgY }}
      >
        <Image
          src="/images/hero-oasis-real.png"
          alt="The Oasis by Emaar - Luxury Waterfront Community"
          fill
          className="object-cover"
          priority
          quality={90}
        />
      </motion.div>

      {/* Luxury Overlay with scroll fade */}
      <motion.div
        className="absolute inset-0"
        style={{ opacity: overlayOpacity }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D1B2A]/75 via-[#0D1B2A]/40 to-[#0D1B2A]/92" />
      </motion.div>

      {/* Water-inspired decorative particles - enhanced */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Larger water ripples */}
        {[...Array(4)].map((_, i) => (
          <div
            key={`ripple-${i}`}
            className="absolute rounded-full border border-[#C8A45C]/8"
            style={{
              width: `${120 + i * 60}px`,
              height: `${120 + i * 60}px`,
              left: `${20 + i * 18}%`,
              bottom: `${5 + i * 10}%`,
              animation: `water-ripple ${5 + i * 1.5}s ease-out infinite`,
              animationDelay: `${i * 1.2}s`,
            }}
          />
        ))}
        {/* Gold dust particles - more numerous */}
        {[...Array(12)].map((_, i) => (
          <div
            key={`dust-${i}`}
            className="absolute rounded-full bg-[#D4AF37]/25 animate-float"
            style={{
              width: `${2 + (i % 4) * 2}px`,
              height: `${2 + (i % 4) * 2}px`,
              left: `${3 + i * 8}%`,
              top: `${15 + (i % 5) * 14}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${4 + i * 0.4}s`,
            }}
          />
        ))}
        {/* Larger floating orbs */}
        {[...Array(3)].map((_, i) => (
          <div
            key={`orb-${i}`}
            className="absolute rounded-full animate-float-slow"
            style={{
              width: `${6 + i * 3}px`,
              height: `${6 + i * 3}px`,
              background: `radial-gradient(circle, rgba(200, 164, 92, ${0.15 + i * 0.05}) 0%, transparent 70%)`,
              left: `${25 + i * 25}%`,
              top: `${30 + i * 15}%`,
              animationDelay: `${i * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Decorative blurs - enhanced */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-[#C8A45C]/[0.04] rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/[0.04] rounded-full blur-[120px]" />
      <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] bg-[#C8A45C]/[0.02] rounded-full blur-[80px]" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        {/* Authorised Emaar Sales Agent Badge - more prominent */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="inline-flex items-center gap-2 px-6 py-2.5 mb-8 text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase border border-[#C8A45C]/30 text-[#C8A45C] rounded-full backdrop-blur-md bg-[#0D1B2A]/30 shadow-lg shadow-[#C8A45C]/5">
            <ShieldCheck className="w-4 h-4" />
            Authorised Emaar Sales Agent
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-heading text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-[#F0EDE6] mb-4 sm:mb-6 leading-[0.95] tracking-tight hero-text-shadow"
        >
          The Oasis
          <span className="block mt-2 gold-shimmer-text">by Emaar</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-body text-xl sm:text-2xl md:text-3xl text-[#8A9BB5] max-w-3xl mx-auto mb-3 font-light tracking-wide"
        >
          9 Exclusive Clusters · Ultra-Luxury Waterfront Living · Dubai
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-body text-sm sm:text-base text-[#8A9BB5]/60 max-w-2xl mx-auto mb-12 sm:mb-16 tracking-wide"
        >
          Address Villas Tierra · Lavita · Mareva · Mirage · Palmiera · Palace Villas Ostra
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 mb-16 sm:mb-24"
        >
          <Link href="/projects" className="w-full sm:w-auto">
            <Button size="lg" className="btn-gold-glow px-12 py-7 text-base w-full sm:w-auto tracking-wide">
              Explore All 9 Clusters
            </Button>
          </Link>
          <Link href="/availability" className="w-full sm:w-auto">
            <Button size="lg" className="btn-outline-gold px-12 py-7 text-base w-full sm:w-auto bg-transparent tracking-wide">
              Check Availability
            </Button>
          </Link>
        </motion.div>

        {/* Stats with premium glass-morphism */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="glass-card-premium p-6 sm:p-8 text-center card-luxury-hover group"
              style={{ animationDelay: `${1.2 + i * 0.1}s` }}
            >
              <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#C8A45C] mx-auto mb-3 group-hover:scale-110 transition-transform duration-500" />
              <p className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-[#F0EDE6] mb-1.5 tracking-tight">
                {stat.value}
              </p>
              <p className="font-body text-[10px] sm:text-xs text-[#8A9BB5] uppercase tracking-[0.2em]">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator - more refined */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer group"
        onClick={() => scrollTo("#projects")}
      >
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}>
          <div className="flex flex-col items-center gap-2">
            <span className="font-body text-[10px] tracking-[0.2em] uppercase text-[#C8A45C]/40 group-hover:text-[#C8A45C]/70 transition-colors">Scroll</span>
            <ChevronDown className="w-6 h-6 text-[#C8A45C]/40 group-hover:text-[#C8A45C]/70 transition-colors" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
