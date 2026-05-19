"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Home,
  Waves,
  Building2,
  Shield,
  CreditCard,
  Plane,
  MessageCircle,
  Phone,
  Mail,
  Star,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { WHATSAPP_LINK, PHONE_NUMBER, EMAIL } from "@/lib/data";
import Link from "next/link";

// ─── Feature Data ───
const features = [
  {
    icon: Waves,
    title: "Kristalllagune (3,5 km)",
    description:
      "Die größte Kristalllagune in einer Villa-Gemeinschaft Dubais mit privaten Stränden und Wassersportaktivitäten.",
  },
  {
    icon: Building2,
    title: "9 Wohncluster",
    description:
      "Neun exklusive Cluster, jeder mit eigenem Charakter — von zeitgenössischen Villen bis zu Ultra-Luxus-Anwesen.",
  },
  {
    icon: Star,
    title: "Marken-Residenzen (Address + Palace)",
    description:
      "Villen verwaltet von Address Hotels & Resorts und Palace Hotels, mit Concierge-Services und markengestalteter Ausstattung.",
  },
  {
    icon: Shield,
    title: "Emaar Qualitätsgarantie",
    description:
      "Entwickelt von Emaar Properties PJSC, dem größten Bauträger der VAE, bekannt für Exzellenz und Zuverlässigkeit.",
  },
  {
    icon: CreditCard,
    title: "Flexible Zahlungspläne (80/20, 90/10)",
    description:
      "Ratenzahlungspläne, die das Investment erleichtern, mit nur 10 bis 20 % bei Übergabe.",
  },
  {
    icon: Plane,
    title: "Golden Visa Berechtigung",
    description:
      "Jede Immobilie in The Oasis qualifiziert für das Golden Visa der VAE — 10 Jahre Aufenthalt für Sie und Ihre Familie.",
  },
];

// ─── Cluster Data ───
const clusters = [
  { name: "Palmiera", beds: "4 SZ", price: "ab 10,5M AED", tag: "Villen" },
  { name: "Palmiera 3", beds: "4 SZ", price: "ab 9,18M AED", tag: "Villen" },
  { name: "Mareva", beds: "4 SZ", price: "ab 13,47M AED", tag: "Villen" },
  { name: "Mareva 2", beds: "4 SZ", price: "ab 13,47M AED", tag: "Villen" },
  { name: "Mirage", beds: "5 SZ", price: "ab 15,8M AED", tag: "Premium" },
  { name: "Lavita", beds: "6 SZ", price: "ab 46,97M AED", tag: "Anwesen" },
  { name: "Address Villas Tierra", beds: "4 SZ", price: "ab 13,16M AED", tag: "Marke" },
  { name: "Palace Villas Ostra", beds: "4 SZ", price: "ab 13,9M AED", tag: "Marke" },
  { name: "Palmeira Collective", beds: "4 SZ", price: "ab 10,75M AED", tag: "Limitiert" },
];

// ─── FAQ Data (German) ───
const faqs = [
  {
    question: "Kann ich als deutscher Staatsbürger Immobilien in Dubai kaufen?",
    answer:
      "Ja, deutsche Staatsbürger können Immobilien in Dubai in Freehold-Zonen erwerben. The Oasis by Emaar befindet sich in einer Freehold-Zone, was bedeutet, dass Sie 100 % Eigentum ohne lokale Wohnsitzanforderung erwerben können. Der Prozess ist unkompliziert und wir begleiten Sie bei jedem Schritt — von der Auswahl bis zur Registrierung beim Dubai Land Department.",
  },
  {
    question: "Welche Zahlungspläne sind für The Oasis verfügbar?",
    answer:
      "The Oasis bietet flexible Zahlungspläne, darunter den 80/20-Plan (80 % während der Bauzeit, 20 % bei Übergabe) und den 90/10-Plan für bestimmte Cluster wie Mirage. Diese Pläne erleichtern das Investment mit an Baufortschritt gebundenen Ratenzahlungen.",
  },
  {
    question: "Was ist das Golden Visa der VAE und wie erhalte ich es?",
    answer:
      "Das Golden Visa der VAE ist ein 10-jähriges Aufenthaltsvisum für Immobilieninvestoren, deren Eigentum mindestens 2 Millionen AED erreicht. Alle Immobilien in The Oasis qualifizieren für das Golden Visa, das Ihnen und Ihrer Familie die Wohnsitznahme in den VAE ohne lokalen Sponsor ermöglicht.",
  },
  {
    question: "Was ist der Unterschied zwischen Marken-Residenzen und klassischen Villen?",
    answer:
      "Marken-Residenzen wie Address Villas Tierra und Palace Villas Ostra werden von Luxushotels (Address Hotels & Resorts und Palace Hotels) verwaltet. Sie umfassen vollständige Hotel-Services: Concierge, Reinigung, Zimmerservice und von der Marke gestaltete Innenausstattung. Klassische Villen bieten ein autonomes Wohnen mit Premium-Ausstattung, jedoch ohne Hotel-Services.",
  },
  {
    question: "Wann werden die Immobilien in The Oasis übergeben?",
    answer:
      "Die Übergabetermine variieren je nach Cluster. Palmiera 3 ist für Q4 2028 geplant, Palmiera und Lavita für Q1 2029, Mirage für Q4 2029 und die Mareva-Cluster für 2031. Wir können Ihnen bei Ihrer kostenlosen Beratung die genauen Termine für jeden Cluster nennen.",
  },
  {
    question: "Wie kann ich die Verfügbarkeit der Immobilien prüfen?",
    answer:
      "Als autorisierter Agent haben wir Zugriff auf das Echtzeit-Inventar von Emaar. Sie können die Verfügbarkeit direkt auf unserer Website prüfen oder uns über WhatsApp kontaktieren, um die neuesten Updates zu verfügbaren Einheiten, Preisen und Grundrissen zu erhalten.",
  },
];

// ─── Animation helpers ───
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6 },
};

export default function DePageClient() {
  return (
    <main className="min-h-screen" style={{ fontFamily: "var(--font-body), sans-serif" }}>
      {/* ════════════════════════════════════════════
          SECTION 1: HERO
      ════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#1A2332]">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A2332]/95 via-[#1A2332]/80 to-[#C8A45C]/10" />

        {/* Decorative blurs */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#C8A45C]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24">
          <motion.div {...fadeInUp}>
            <span className="inline-block px-4 py-1.5 mb-6 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase border border-[#C8A45C]/40 text-[#C8A45C] rounded-full">
              Autorisierter Emaar Verkaufsagent
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight tracking-tight"
          >
            The Oasis by Emaar
            <span className="block text-[#C8A45C]">Luxus-Villen in Dubai</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-body text-lg sm:text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-4 sm:mb-6 font-light"
          >
            9 Exklusive Cluster · Luxus-Wasserfront-Wohnen
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-body text-sm sm:text-base text-white/50 max-w-2xl mx-auto mb-8 sm:mb-12"
          >
            Zeitgenössische Villen · Wasserfront-Anwesen · Address & Palace Residenzen
            <br />
            <span className="text-[#C8A45C]/80">Ihr vertrauenswürdiger autorisierter Emaar-Partner</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/availability" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="gold-gradient text-[#1A2332] font-bold px-8 py-6 text-base rounded-md hover:opacity-90 transition-opacity w-full sm:w-auto"
              >
                Verfügbarkeit Prüfen
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="border-emerald-400 text-emerald-400 hover:bg-emerald-400/10 px-8 py-6 text-base rounded-md w-full sm:w-auto gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Kontakt
              </Button>
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto mt-12 sm:mt-16"
          >
            {[
              { icon: Home, value: "ab 9,18M AED", label: "Startpreis" },
              { icon: Building2, value: "7.000+", label: "Residenzen" },
              { icon: Waves, value: "3,5 km", label: "Kristalllagune" },
              { icon: Plane, value: "Golden Visa", label: "Berechtigt" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 sm:p-6"
              >
                <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#C8A45C] mx-auto mb-2" />
                <p className="font-heading text-lg sm:text-xl md:text-2xl font-bold text-white">
                  {stat.value}
                </p>
                <p className="font-body text-xs sm:text-sm text-white/50 uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 2: KEY FEATURES (6 Cards)
      ════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-[#F5F0E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-12 sm:mb-16">
            <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-[0.2em] uppercase border border-[#C8A45C]/40 text-[#C8A45C] rounded-full bg-[#C8A45C]/5">
              Warum The Oasis
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A2332] mb-4">
              Herausragende Merkmale
            </h2>
            <p className="font-body text-lg text-[#1A2332]/60 max-w-2xl mx-auto">
              Entdecken Sie, was The Oasis by Emaar zu einer der begehrtesten Gemeinschaften in Dubai macht.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-[#C8A45C]/10 hover:shadow-lg hover:border-[#C8A45C]/30 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-lg bg-[#1A2332] flex items-center justify-center mb-5 group-hover:bg-[#C8A45C] transition-colors duration-300">
                  <feature.icon className="w-7 h-7 text-[#C8A45C] group-hover:text-[#1A2332] transition-colors duration-300" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-[#1A2332] mb-2">
                  {feature.title}
                </h3>
                <p className="font-body text-sm text-[#1A2332]/60 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 3: CLUSTERS OVERVIEW (9 Grid)
      ════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-12 sm:mb-16">
            <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-[0.2em] uppercase border border-[#C8A45C]/40 text-[#C8A45C] rounded-full bg-[#C8A45C]/5">
              9 Exklusive Cluster
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A2332] mb-4">
              Die Cluster von The Oasis
            </h2>
            <p className="font-body text-lg text-[#1A2332]/60 max-w-2xl mx-auto">
              Jeder Cluster bietet einen einzigartigen Lebensstil — von zeitgenössischen Villen bis zu Ultra-Luxus-Wasserfront-Anwesen.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {clusters.map((cluster, idx) => (
              <motion.div
                key={cluster.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="bg-[#F5F0E8] rounded-xl p-6 border border-[#C8A45C]/10 hover:border-[#C8A45C]/30 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-heading text-xl font-semibold text-[#1A2332]">
                    {cluster.name}
                  </h3>
                  <Badge className="bg-[#1A2332] text-[#C8A45C] border-0 text-xs font-semibold">
                    {cluster.tag}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-[#1A2332]/60">
                  <span className="flex items-center gap-1.5">
                    <Home className="w-4 h-4 text-[#C8A45C]" />
                    {cluster.beds}
                  </span>
                  <span className="flex items-center gap-1.5 font-semibold text-[#1A2332]">
                    {cluster.price}
                  </span>
                </div>
                <div className="mt-4 pt-4 border-t border-[#1A2332]/10 flex items-center justify-between">
                  <span className="text-xs text-[#1A2332]/40 uppercase tracking-wider">Emaar Properties</span>
                  <Link
                    href="/availability"
                    className="text-[#C8A45C] text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    Details <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 4: FAQ (Accordion)
      ════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-[#F5F0E8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-12 sm:mb-16">
            <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-[0.2em] uppercase border border-[#C8A45C]/40 text-[#C8A45C] rounded-full bg-[#C8A45C]/5">
              Häufige Fragen
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A2332] mb-4">
              Ihre Fragen zu The Oasis
            </h2>
            <p className="font-body text-lg text-[#1A2332]/60">
              Antworten auf die häufigsten Fragen zum Immobilienkauf in Dubai und The Oasis by Emaar.
            </p>
          </motion.div>

          <motion.div {...fadeInUp}>
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, idx) => (
                <AccordionItem
                  key={idx}
                  value={`de-faq-${idx}`}
                  className="bg-white rounded-xl border border-[#C8A45C]/10 px-6 data-[state=open]:border-[#C8A45C]/30 data-[state=open]:shadow-md transition-all duration-300"
                >
                  <AccordionTrigger className="font-heading text-base sm:text-lg font-semibold text-[#1A2332] text-left hover:no-underline py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="font-body text-sm sm:text-base text-[#1A2332]/70 leading-relaxed pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 5: CTA
      ════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-[#1A2332] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C8A45C]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#C8A45C]/3 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeInUp}>
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-[0.2em] uppercase border border-[#C8A45C]/40 text-[#C8A45C] rounded-full">
              Kontakt
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Bereit, The Oasis zu Entdecken?
            </h2>
            <p className="font-body text-lg text-white/60 max-w-2xl mx-auto mb-10">
              Kontaktieren Sie unser Team autorisierter Agenten, um die Verfügbarkeit zu prüfen, Grundrisse zu erhalten und eine persönliche Besichtigung zu planen.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link href="/availability" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="gold-gradient text-[#1A2332] font-bold px-8 py-6 text-base rounded-md hover:opacity-90 transition-opacity w-full sm:w-auto"
                >
                  Verfügbarkeit Prüfen
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-emerald-400 text-emerald-400 hover:bg-emerald-400/10 px-8 py-6 text-base rounded-md w-full sm:w-auto gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp Kontakt
                </Button>
              </a>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 text-white/50">
              <a
                href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}
                className="flex items-center gap-2 hover:text-[#C8A45C] transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="font-body text-sm">{PHONE_NUMBER}</span>
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-2 hover:text-[#C8A45C] transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span className="font-body text-sm">{EMAIL}</span>
              </a>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span className="font-body text-sm text-white/50">Autorisierter Emaar Agent</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
