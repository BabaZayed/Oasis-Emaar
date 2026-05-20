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
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

// ─── Feature Data ───
const features = [
  {
    icon: Waves,
    title: "Lagon Cristal (3,5 km)",
    description:
      "Le plus grand lagon cristal d'une communauté de villas à Dubaï, offrant des plages privées et des activités nautiques.",
  },
  {
    icon: Building2,
    title: "9 Grappes Résidentielles",
    description:
      "Neuf grappes exclusives, chacune avec son caractère unique — des villas contemporaines aux mansions ultra-luxe.",
  },
  {
    icon: Star,
    title: "Résidences de Marque (Address + Palace)",
    description:
      "Des villas gérées par Address Hotels & Resorts et Palace Hotels, avec services de conciergerie et finitions signées.",
  },
  {
    icon: Shield,
    title: "Garantie de Qualité Emaar",
    description:
      "Développé par Emaar Properties PJSC, le plus grand promoteur des Émirats, reconnu pour l'excellence et la fiabilité.",
  },
  {
    icon: CreditCard,
    title: "Plans de Paiement Flexibles (80/20, 90/10)",
    description:
      "Des plans de paiement échelonnés qui facilitent l'investissement, avec seulement 10 à 20 % à la livraison.",
  },
  {
    icon: Plane,
    title: "Éligibilité au Golden Visa",
    description:
      "Toute propriété à The Oasis qualifie pour le Golden Visa des Émirats — résidence de 10 ans pour vous et votre famille.",
  },
];

// ─── Cluster Data ───
const clusters = [
  { name: "Palmiera", beds: "4 Ch.", price: "dès 10,5M AED", tag: "Villas" },
  { name: "Palmiera 3", beds: "4 Ch.", price: "dès 9,18M AED", tag: "Villas" },
  { name: "Mareva", beds: "4 Ch.", price: "dès 13,47M AED", tag: "Villas" },
  { name: "Mareva 2", beds: "4 Ch.", price: "dès 13,47M AED", tag: "Villas" },
  { name: "Mirage", beds: "5 Ch.", price: "dès 15,8M AED", tag: "Premium" },
  { name: "Lavita", beds: "6 Ch.", price: "dès 46,97M AED", tag: "Mansions" },
  { name: "Address Villas Tierra", beds: "4 Ch.", price: "dès 13,16M AED", tag: "Marque" },
  { name: "Palace Villas Ostra", beds: "4 Ch.", price: "dès 13,9M AED", tag: "Marque" },
  { name: "Palmeira Collective", beds: "4 Ch.", price: "dès 10,75M AED", tag: "Édition Limitée" },
];

// ─── FAQ Data (French) ───
const faqs = [
  {
    question: "Puis-je acheter une propriété à Dubaï en tant que résident français ?",
    answer:
      "Oui, les résidents français peuvent acheter des propriétés à Dubaï dans des zones freehold. The Oasis by Emaar est situé dans une zone freehold, ce qui signifie que vous pouvez être propriétaire à 100 % sans avoir besoin de résidence locale. Le processus est simple et nous vous guidons à chaque étape, de la sélection à l'enregistrement au Dubai Land Department.",
  },
  {
    question: "Quels sont les plans de paiement disponibles pour The Oasis ?",
    answer:
      "The Oasis propose des plans de paiement flexibles, notamment le plan 80/20 (80 % pendant la construction, 20 % à la livraison) et le plan 90/10 pour certains clusters comme Mirage. Ces plans facilitent l'investissement avec des paiements échelonnés liés aux étapes de construction.",
  },
  {
    question: "Qu'est-ce que le Golden Visa des Émirats et comment l'obtenir ?",
    answer:
      "Le Golden Visa des Émirats est un visa de résidence de 10 ans accordé aux investisseurs immobiliers dont la propriété atteint au moins 2 millions AED. Toutes les propriétés de The Oasis qualifient pour le Golden Visa, vous permettant de résider aux Émirats avec votre famille, sans sponsor local nécessaire.",
  },
  {
    question: "Quelle est la différence entre les résidences de marque et les villas classiques ?",
    answer:
      "Les résidences de marque comme Address Villas Tierra et Palace Villas Ostra sont gérées par des hôtels de luxe (Address Hotels & Resorts et Palace Hotels). Elles incluent des services hôteliers complets : conciergerie, ménage, room service, et des finitions intérieures signées par la marque. Les villas classiques offrent un cadre de vie autonome avec des équipements premium mais sans les services hôteliers.",
  },
  {
    question: "Quand les propriétés de The Oasis seront-elles livrées ?",
    answer:
      "Les dates de livraison varient selon le cluster. Palmiera 3 est prévu pour Q4 2028, Palmiera et Lavita pour Q1 2029, Mirage pour Q4 2029, et les clusters Mareva pour 2031. Nous pouvons vous fournir les dates exactes pour chaque cluster lors de votre consultation gratuite.",
  },
  {
    question: "Comment puis-je vérifier la disponibilité des propriétés ?",
    answer:
      "En tant qu'agent autorisé par Emaar, nous avons accès à l'inventaire en temps réel. Vous pouvez vérifier la disponibilité directement sur notre site ou nous contacter via WhatsApp pour obtenir les dernières mises à jour sur les unités disponibles, les prix et les plans d'étage.",
  },
];

// ─── Animation helpers ───
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-60px" },
  transition: { staggerChildren: 0.1 },
};

export default function FrPageClient() {
  return (
    <>
      <SiteHeader />
      <main lang="fr" className="min-h-screen flex flex-col" style={{ fontFamily: "var(--font-body), sans-serif" }}>
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
              Agent de Vente Autorisé Emaar
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight tracking-tight"
          >
            L&apos;Oasis by Emaar
            <span className="block text-[#C8A45C]">Villas de Luxe à Dubaï</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-body text-lg sm:text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-4 sm:mb-6 font-light"
          >
            9 Grappes Exclusives · Vie de Luxe en Bord de Mer
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-body text-sm sm:text-base text-white/50 max-w-2xl mx-auto mb-8 sm:mb-12"
          >
            Villas contemporaines · Mansions waterfront · Résidences Address & Palace
            <br />
            <span className="text-[#C8A45C]/80">Votre Partenaire Emaar Autorisé de Confiance</span>
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
                Vérifier la Disponibilité
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
                Contactez-nous WhatsApp
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
              { icon: Home, value: "dès 9,18M AED", label: "Prix de Départ" },
              { icon: Building2, value: "7 000+", label: "Résidences" },
              { icon: Waves, value: "3,5 km", label: "Lagon Cristal" },
              { icon: Plane, value: "Golden Visa", label: "Éligible" },
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
              Pourquoi The Oasis
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A2332] mb-4">
              Des Atouts d&apos;Exception
            </h2>
            <p className="font-body text-lg text-[#1A2332]/60 max-w-2xl mx-auto">
              Découvrez ce qui rend The Oasis by Emaar l&apos;une des communautés les plus recherchées à Dubaï.
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
              9 Grappes Exclusives
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A2332] mb-4">
              Les Grappes de The Oasis
            </h2>
            <p className="font-body text-lg text-[#1A2332]/60 max-w-2xl mx-auto">
              Chaque grappe offre un style de vie unique — des villas contemporaines aux mansions ultra-luxe en bord de mer.
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
                    Détails <ArrowRight className="w-4 h-4" />
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
              Questions Fréquentes
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A2332] mb-4">
              Vos Questions sur The Oasis
            </h2>
            <p className="font-body text-lg text-[#1A2332]/60">
              Réponses aux questions les plus courantes sur l&apos;achat immobilier à Dubaï et The Oasis by Emaar.
            </p>
          </motion.div>

          <motion.div {...fadeInUp}>
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, idx) => (
                <AccordionItem
                  key={idx}
                  value={`fr-faq-${idx}`}
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
              Contactez-nous
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Prêt à Découvrir The Oasis ?
            </h2>
            <p className="font-body text-lg text-white/60 max-w-2xl mx-auto mb-10">
              Contactez notre équipe d&apos;agents autorisés pour vérifier la disponibilité, obtenir les plans d&apos;étage et planifier une visite personnalisée.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link href="/availability" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="gold-gradient text-[#1A2332] font-bold px-8 py-6 text-base rounded-md hover:opacity-90 transition-opacity w-full sm:w-auto"
                >
                  Vérifier la Disponibilité
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
                  Contactez-nous WhatsApp
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
                <span className="font-body text-sm text-white/50">Agent Autorisé Emaar</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      </main>
      <SiteFooter />
    </>
  );
}
