"use client";

import SiteHeader from "@/components/site-header";
import HeroSection from "@/components/hero-section";
import QuickInventorySection from "@/components/quick-inventory-section";
import BenefitsSection from "@/components/benefits-section";
import PaywallSection from "@/components/paywall-section";
import ReferencesSection from "@/components/references-section";
import FeedbackSection from "@/components/feedback-section";
import SiteFooter from "@/components/site-footer";
import ExitIntentPopup from "@/components/exit-intent-popup";
import Link from "next/link";
import Image from "next/image";
import { projects, formatPrice } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Bed, Maximize, ArrowRight, Building2, Trees, Store, Waves, MapPin, Crown, ShieldCheck, Users, Tag, Eye, BadgeCheck, Star } from "lucide-react";
import ScrollReveal from "@/components/scroll-reveal";

function ProjectPreviewCard({ project }: { project: typeof projects[0] }) {
  const statusColor =
    project.status === "Ready" ? "bg-emerald-500" :
    project.status === "Off-Plan" ? "gold-gradient" :
    "bg-amber-500";

  return (
    <Link href={`/projects/${project.slug}`} className="block group">
      <div className="overflow-hidden rounded-2xl bg-[#0D1B2A] border border-[#C8A45C]/10 gold-border-glow">
        <div className="relative h-64 sm:h-72 overflow-hidden">
          <Image
            src={project.imageUrl}
            alt={project.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 image-overlay-luxury" />
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColor} ${project.status === 'Off-Plan' ? 'text-[#0D1B2A]' : 'text-white'}`}>
              {project.status}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium border border-[#C8A45C]/30 text-[#C8A45C] bg-[#0D1B2A]/50 backdrop-blur-sm">
              {project.clusterTag}
            </span>
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#F0EDE6] mb-1">{project.name}</h3>
            <p className="text-[#C8A45C] text-sm font-medium tracking-wide">{project.tagline}</p>
          </div>
        </div>

        <div className="p-6 sm:p-7">
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div className="flex items-center gap-2">
              <Bed className="w-4 h-4 text-[#C8A45C]" />
              <span className="text-sm text-[#8A9BB5]">{project.bedrooms} Bed</span>
            </div>
            <div className="flex items-center gap-2">
              <Maximize className="w-4 h-4 text-[#C8A45C]" />
              <span className="text-sm text-[#8A9BB5]">{project.areaRange}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-[#8A9BB5]/60 mb-6">
            <span>Handover: {project.handover}</span>
            <span className="text-[#C8A45C]/30">·</span>
            <span>{project.paymentPlan} Plan</span>
          </div>

          <div className="flex items-end justify-between pt-5 border-t border-[#C8A45C]/10">
            <div>
              <p className="font-body text-[10px] text-[#8A9BB5] uppercase tracking-[0.2em] mb-1.5">Starting from</p>
              <p className="font-heading text-2xl sm:text-3xl font-bold gold-text">{formatPrice(project.startingPrice)}</p>
            </div>
            <div className="w-11 h-11 rounded-xl bg-[#C8A45C]/10 flex items-center justify-center group-hover:bg-[#C8A45C] transition-all duration-500">
              <ArrowRight className="w-5 h-5 text-[#C8A45C] group-hover:text-[#0D1B2A] transition-colors duration-500" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

const facts = [
  { icon: Building2, label: "Community Size", value: "9.4M sqm" },
  { icon: Users, label: "Residences", value: "7,000+" },
  { icon: Trees, label: "Green Space", value: "25%" },
  { icon: Store, label: "Retail Space", value: "1.5M sqft" },
  { icon: Waves, label: "Crystal Lagoon", value: "3.5km" },
  { icon: Crown, label: "Developer", value: "Emaar Properties PJSC" },
  { icon: MapPin, label: "Location", value: "The Oasis, Dubailand" },
  { icon: ShieldCheck, label: "Golden Visa", value: "Eligible" },
];

export default function HomePageClient() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />

        {/* Quick Inventory - Prominent after hero */}
        <QuickInventorySection />

        {/* Community Facts */}
        <section className="py-20 sm:py-28 lg:py-36 bg-water-section water-wave-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <ScrollReveal>
              <div className="text-center mb-20 sm:mb-24">
                <span className="section-label">Project Facts</span>
                <h2 className="section-heading text-4xl sm:text-5xl md:text-6xl text-[#F0EDE6] mt-4 mb-5">
                  The Oasis at a Glance
                </h2>
                <p className="font-body text-[#8A9BB5] max-w-2xl mx-auto text-lg font-light">
                  Key facts and figures about one of Dubai&apos;s most ambitious waterfront communities
                </p>
                <div className="luxury-divider mt-10">
                  <span className="diamond" />
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2} cinematic>
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 stagger-children">
              {facts.map((fact) => (
                <div key={fact.label} className="glass-card-premium p-8 sm:p-10 text-center card-premium-hover group">
                  <div className="w-14 h-14 rounded-xl bg-[#C8A45C]/8 border border-[#C8A45C]/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-[#C8A45C]/15 group-hover:border-[#C8A45C]/20 transition-all duration-500">
                    <fact.icon className="w-6 h-6 text-[#C8A45C] group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <p className="font-body text-[11px] text-[#9BB0C8] uppercase tracking-[0.2em] mb-2">{fact.label}</p>
                  <p className={`font-heading text-xl sm:text-2xl font-bold ${fact.label === "Golden Visa" ? "text-emerald-400" : "text-[#F0EDE6]"}`}>
                    {fact.value}
                  </p>
                  {fact.label === "Golden Visa" && (
                    <span className="inline-block mt-1.5 text-[10px] font-body font-medium text-emerald-400 bg-emerald-500/15 rounded-full px-2.5 py-0.5">
                      AED 2M+ Properties
                    </span>
                  )}
                </div>
              ))}
            </div>
            </ScrollReveal>

            {/* Golden Visa Banner */}
            <ScrollReveal delay={0.4} cinematic>
            <div className="mt-14 glass-card-premium p-10 sm:p-12 flex flex-col sm:flex-row items-center gap-6 sm:gap-8 animate-luxury-glow">
              <div className="w-16 h-16 rounded-full bg-[#C8A45C]/15 flex items-center justify-center flex-shrink-0 border border-[#C8A45C]/10">
                <ShieldCheck className="w-8 h-8 text-[#C8A45C]" />
              </div>
              <div className="text-center sm:text-left">
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#F0EDE6] mb-2">
                  UAE Golden Visa Eligible
                </h3>
                <p className="font-body text-[#8A9BB5] text-base sm:text-lg leading-relaxed font-light">
                  All properties at The Oasis qualify for the UAE Golden Visa programme for investments of AED 2 million and above. Secure your residency in the UAE with your dream home.
                </p>
              </div>
            </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Projects Preview - Show all 9 clusters */}
        <section id="projects" className="py-20 sm:py-28 lg:py-36 bg-cream-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="text-center mb-20 sm:mb-24">
                <span className="section-label">9 Exclusive Clusters</span>
                <h2 className="section-heading text-4xl sm:text-5xl md:text-6xl text-[#0D1B2A] mt-4 mb-5">
                  Discover The Oasis Collection
                </h2>
                <p className="font-body text-gray-500 max-w-2xl mx-auto text-lg font-light">
                  Nine distinctive clusters, each offering a unique perspective on luxury waterfront living
                </p>
                <div className="luxury-divider mt-10">
                  <span className="diamond" />
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15} cinematic>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
              {projects.map((project, i) => (
                <ScrollReveal key={project.id} delay={i * 0.08} duration={0.7}>
                  <ProjectPreviewCard project={project} />
                </ScrollReveal>
              ))}
            </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Benefits Preview */}
        <BenefitsSection />

        {/* Premium Access / Paywall Section */}
        <PaywallSection />

        {/* References / Testimonials */}
        <ReferencesSection />

        {/* User Feedback / Reviews */}
        <FeedbackSection />

        {/* Seller Marketplace Section - refined and subtle */}
        <section className="py-24 sm:py-32 bg-cream-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal cinematic>
              <div className="text-center mb-16">
                <span className="section-label">Seller Marketplace</span>
                <h2 className="section-heading text-4xl sm:text-5xl md:text-6xl text-[#0D1B2A] mt-4 mb-5">
                  List Your Property for Sale
                </h2>
                <p className="font-body text-gray-500 max-w-2xl mx-auto text-lg font-light">
                  Are you a current owner at The Oasis? List your property on our marketplace and reach thousands of verified buyers actively looking to invest.
                </p>
                <div className="luxury-divider mt-10">
                  <span className="diamond" />
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2} cinematic>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12">
              {[
                { icon: Users, title: "Reach Thousands of Buyers", desc: "Your property is showcased to our verified network of investors and homebuyers actively seeking Oasis properties." },
                { icon: Star, title: "Free Listing, No Hidden Fees", desc: "List your property completely free with zero commissions or hidden charges. You only deal directly with buyers." },
                { icon: BadgeCheck, title: "Professional Verification", desc: "Our team verifies every listing, building trust and credibility that attracts serious, qualified buyers." },
                { icon: Eye, title: "Featured Placement", desc: "Premium properties get featured placement on our homepage and marketing campaigns for maximum visibility." },
              ].map((item) => (
                <div
                  key={item.title}
                  className="glass-card-light p-8 hover:shadow-lg card-premium-hover group text-center"
                >
                  <div className="w-12 h-12 rounded-lg border border-[#C8A45C]/20 bg-[#C8A45C]/5 flex items-center justify-center mx-auto mb-5 group-hover:bg-[#C8A45C] group-hover:border-[#C8A45C] transition-all duration-500">
                    <item.icon className="w-5 h-5 text-[#C8A45C] group-hover:text-[#0D1B2A] transition-colors duration-500" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-[#0D1B2A] mb-2">{item.title}</h3>
                  <p className="font-body text-sm text-gray-500 leading-relaxed font-light">{item.desc}</p>
                </div>
              ))}
            </div>
            </ScrollReveal>

            {/* Dual CTA */}
            <ScrollReveal delay={0.3}>
            <div className="bg-[#0D1B2A] rounded-2xl p-10 sm:p-14 flex flex-col lg:flex-row items-center gap-8 lg:gap-12 border border-[#C8A45C]/10 relative overflow-hidden">
              {/* Subtle decorative glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#C8A45C]/[0.03] rounded-full blur-[80px]" />
              <div className="flex-1 text-center lg:text-left relative z-10">
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#F0EDE6] mb-3">
                  Ready to Sell Your Oasis Property?
                </h3>
                <p className="font-body text-[#8A9BB5] text-base sm:text-lg max-w-xl font-light">
                  Whether you have a villa, mansion, or branded residence, our marketplace connects you with serious buyers. Listing is free and takes just a few minutes.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-4 flex-shrink-0 relative z-10">
                <Link href="/sell">
                  <Button
                    size="lg"
                    className="btn-gold-glow px-8 py-6 text-base gap-2 w-full sm:w-auto"
                  >
                    <Tag className="w-5 h-5" />
                    List Your Property Free
                  </Button>
                </Link>
                <Link href="/marketplace">
                  <Button
                    size="lg"
                    className="btn-outline-gold px-8 py-6 text-base w-full sm:w-auto bg-transparent"
                  >
                    Browse Marketplace
                  </Button>
                </Link>
              </div>
            </div>
            </ScrollReveal>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 sm:py-28 lg:py-36 bg-water-dark text-white relative overflow-hidden water-wave-bg">
          {/* Decorative elements */}
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#C8A45C]/[0.04] rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cyan-500/[0.04] rounded-full blur-[120px]" />

          <ScrollReveal cinematic>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <span className="section-label">Start Your Journey</span>
            <h2 className="section-heading text-4xl sm:text-5xl md:text-6xl text-[#F0EDE6] mt-4 mb-6 hero-text-shadow">
              Ready to Find Your Dream Home?
            </h2>
            <p className="font-body text-[#8A9BB5] max-w-2xl mx-auto mb-14 text-lg font-light">
              As an authorised Emaar sales agent, we offer exclusive access, expert guidance, and personalised service across all 9 clusters.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <Link href="/availability">
                <Button size="lg" className="btn-gold-glow px-12 py-7 text-base w-full sm:w-auto tracking-wide">
                  Check Availability
                </Button>
              </Link>
              <Link href="/inventory">
                <Button size="lg" className="btn-outline-gold px-12 py-7 text-base w-full sm:w-auto bg-transparent tracking-wide">
                  Browse Inventory
                </Button>
              </Link>
            </div>
          </div>
          </ScrollReveal>
        </section>
      </main>
      <SiteFooter />
      <ExitIntentPopup />
    </div>
  );
}
