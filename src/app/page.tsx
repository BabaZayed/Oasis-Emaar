"use client";

import SiteHeader from "@/components/site-header";
import HeroSection from "@/components/hero-section";
import QuickInventorySection from "@/components/quick-inventory-section";
import BenefitsSection from "@/components/benefits-section";
import PaywallSection from "@/components/paywall-section";
import ReferencesSection from "@/components/references-section";
import FeedbackSection from "@/components/feedback-section";
import SiteFooter from "@/components/site-footer";
import WhatsAppButton from "@/components/whatsapp-button";
import ExitIntentPopup from "@/components/exit-intent-popup";
import Link from "next/link";
import Image from "next/image";
import { projects, formatPrice } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bed, Maximize, ArrowRight, Building2, Trees, Store, Waves, MapPin, Crown, ShieldCheck, Users, Tag, Eye, BadgeCheck, Star } from "lucide-react";

function ProjectPreviewCard({ project }: { project: typeof projects[0] }) {
  const statusColor =
    project.status === "Ready" ? "bg-green-500" :
    project.status === "Off-Plan" ? "bg-[#C8A45C]" :
    "bg-orange-500";

  return (
    <Link href={`/projects/${project.slug}`} className="block">
      <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 cursor-pointer h-full">
        <div className="relative h-56 sm:h-64 overflow-hidden">
          <Image
            src={project.imageUrl}
            alt={project.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500" />
          <Badge className={`absolute top-4 left-4 ${statusColor} text-white text-xs font-semibold`}>
            {project.status}
          </Badge>
          <Badge className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white text-xs font-medium border-0">
            {project.clusterTag}
          </Badge>
          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-white/80 text-sm font-medium">{project.tagline}</p>
          </div>
        </div>

        <CardContent className="p-5 sm:p-6">
          <h3 className="font-heading text-xl font-bold text-[#1A2332] mb-3">{project.name}</h3>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Bed className="w-4 h-4 text-[#C8A45C]" />
              <span>{project.bedrooms} Bed</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Maximize className="w-4 h-4 text-[#C8A45C]" />
              <span>{project.areaRange}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
            <span>Handover: {project.handover}</span>
            <span>·</span>
            <span>{project.paymentPlan} Plan</span>
          </div>

          <div className="flex items-end justify-between pt-4 border-t border-gray-100">
            <div>
              <p className="font-body text-xs text-gray-400 uppercase tracking-wider">Starting from</p>
              <p className="font-heading text-xl font-bold text-[#C8A45C]">{formatPrice(project.startingPrice)}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#1A2332] flex items-center justify-center group-hover:bg-[#C8A45C] transition-colors duration-300">
              <ArrowRight className="w-5 h-5 text-[#C8A45C] group-hover:text-[#1A2332] transition-colors duration-300" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />

        {/* Quick Inventory - Prominent after hero */}
        <QuickInventorySection />

        {/* Community Facts */}
        <section className="py-16 sm:py-20 bg-[#F5F0E8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <span className="font-body text-sm font-semibold tracking-[0.2em] uppercase text-[#C8A45C]">
                Project Facts
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A2332] mt-3 mb-4">
                The Oasis at a Glance
              </h2>
              <p className="font-body text-gray-500 max-w-2xl mx-auto text-lg">
                Key facts and figures about one of Dubai&apos;s most ambitious waterfront communities
              </p>
              <div className="section-divider max-w-xs mx-auto mt-6" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                { icon: Building2, label: "Community Size", value: "9.4M sqm" },
                { icon: Users, label: "Residences", value: "7,000+" },
                { icon: Trees, label: "Green Space", value: "25%" },
                { icon: Store, label: "Retail Space", value: "1.5M sqft" },
                { icon: Waves, label: "Crystal Lagoon", value: "3.5km" },
                { icon: Crown, label: "Developer", value: "Emaar Properties PJSC" },
                { icon: MapPin, label: "Location", value: "The Oasis, Dubailand" },
                { icon: ShieldCheck, label: "Golden Visa", value: "Eligible" },
              ].map((fact) => (
                <div
                  key={fact.label}
                  className="bg-white rounded-xl p-5 sm:p-6 text-center shadow-sm hover:shadow-md transition-all duration-300 border border-transparent hover:border-[#C8A45C]/20 group"
                >
                  <div className="w-12 h-12 rounded-lg bg-[#1A2332] flex items-center justify-center mx-auto mb-3 group-hover:bg-[#C8A45C] transition-colors duration-300">
                    <fact.icon className="w-5 h-5 text-[#C8A45C] group-hover:text-[#1A2332] transition-colors duration-300" />
                  </div>
                  <p className="font-body text-xs text-gray-400 uppercase tracking-wider mb-1">
                    {fact.label}
                  </p>
                  <p className={`font-heading text-base sm:text-lg font-bold ${
                    fact.label === "Golden Visa" ? "text-emerald-600" : "text-[#1A2332]"
                  }`}>
                    {fact.value}
                  </p>
                  {fact.label === "Golden Visa" && (
                    <span className="inline-block mt-1 text-[10px] font-body font-medium text-emerald-600/70 bg-emerald-50 rounded-full px-2 py-0.5">
                      AED 2M+ Properties
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Golden Visa Highlight */}
            <div className="mt-8 sm:mt-10 bg-[#1A2332] rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <div className="w-14 h-14 rounded-full bg-[#C8A45C]/20 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-7 h-7 text-[#C8A45C]" />
              </div>
              <div className="text-center sm:text-left">
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mb-1">
                  UAE Golden Visa Eligible
                </h3>
                <p className="font-body text-white/60 text-sm sm:text-base">
                  All properties at The Oasis qualify for the UAE Golden Visa programme for investments of AED 2 million and above. Secure your residency in the UAE with your dream home.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Preview - Show all 9 clusters */}
        <section id="projects" className="py-20 sm:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <span className="font-body text-sm font-semibold tracking-[0.2em] uppercase text-[#C8A45C]">
                9 Exclusive Clusters
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A2332] mt-3 mb-4">
                Discover The Oasis Collection
              </h2>
              <p className="font-body text-gray-500 max-w-2xl mx-auto text-lg">
                Nine distinctive clusters, each offering a unique perspective on luxury waterfront living in Dubai — from branded residences to ultra-exclusive limited editions
              </p>
              <div className="section-divider max-w-xs mx-auto mt-6" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {projects.map((project) => (
                <ProjectPreviewCard key={project.id} project={project} />
              ))}
            </div>
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

        {/* Seller Marketplace Section */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="font-body text-sm font-semibold tracking-[0.2em] uppercase text-emerald-600">
                Seller Marketplace
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A2332] mt-3 mb-4">
                List Your Property for Sale
              </h2>
              <p className="font-body text-gray-500 max-w-2xl mx-auto text-lg">
                Are you a current owner at The Oasis? List your property on our marketplace and reach thousands of verified buyers actively looking to invest.
              </p>
              <div className="section-divider max-w-xs mx-auto mt-6" />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {[
                { icon: Users, title: "Reach Thousands of Buyers", desc: "Your property is showcased to our verified network of investors and homebuyers actively seeking Oasis properties." },
                { icon: Star, title: "Free Listing, No Hidden Fees", desc: "List your property completely free with zero commissions or hidden charges. You only deal directly with buyers." },
                { icon: BadgeCheck, title: "Professional Verification", desc: "Our team verifies every listing, building trust and credibility that attracts serious, qualified buyers." },
                { icon: Eye, title: "Featured Placement", desc: "Premium properties get featured placement on our homepage and marketing campaigns for maximum visibility." },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-[#F5F0E8] rounded-xl p-6 hover:shadow-md transition-all duration-300 group border border-transparent hover:border-emerald-400/20 text-center"
                >
                  <div className="w-12 h-12 rounded-lg bg-emerald-600 flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-700 transition-colors duration-300">
                    <item.icon className="w-5 h-5 text-white group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-[#1A2332] mb-2">{item.title}</h3>
                  <p className="font-body text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Dual CTA */}
            <div className="bg-gradient-to-r from-[#1A2332] to-[#2A3A52] rounded-2xl p-8 sm:p-12 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              <div className="flex-1 text-center lg:text-left">
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-3">
                  Ready to Sell Your Oasis Property?
                </h3>
                <p className="font-body text-white/60 text-base sm:text-lg max-w-xl">
                  Whether you have a villa, mansion, or branded residence, our marketplace connects you with serious buyers. Listing is free and takes just a few minutes.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-4 flex-shrink-0">
                <Link href="/sell">
                  <Button
                    size="lg"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-6 text-base rounded-md gap-2 w-full sm:w-auto"
                  >
                    <Tag className="w-5 h-5" />
                    List Your Property Free
                  </Button>
                </Link>
                <Link href="/marketplace">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-[#C8A45C] text-[#C8A45C] hover:bg-[#C8A45C]/10 px-8 py-6 text-base rounded-md w-full sm:w-auto"
                  >
                    Browse Marketplace
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 sm:py-28 bg-[#1A2332] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="font-body text-sm font-semibold tracking-[0.2em] uppercase text-[#C8A45C]">
              Start Your Journey
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-6">
              Ready to Find Your Dream Home?
            </h2>
            <p className="font-body text-white/60 max-w-2xl mx-auto mb-10 text-lg">
              As an authorised Emaar sales agent, we offer exclusive access, expert guidance, and personalised service across all 9 clusters at The Oasis.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/availability">
                <Button
                  size="lg"
                  className="gold-gradient text-[#1A2332] font-bold px-8 py-6 text-base rounded-md hover:opacity-90 w-full sm:w-auto"
                >
                  Check Availability
                </Button>
              </a>
              <Link href="/inventory">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#C8A45C] text-[#C8A45C] hover:bg-[#C8A45C]/10 px-8 py-6 text-base rounded-md w-full sm:w-auto"
                >
                  Browse Inventory
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <WhatsAppButton />
      <ExitIntentPopup />
    </div>
  );
}
