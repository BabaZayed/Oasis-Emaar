"use client";

import SiteHeader from "@/components/site-header";
import HeroSection from "@/components/hero-section";
import ProjectsSection from "@/components/projects-section";
import BenefitsSection from "@/components/benefits-section";
import InventorySection from "@/components/inventory-section";
import FloorPlansSection from "@/components/floor-plans-section";
import PaymentPlanSection from "@/components/payment-plan-section";
import GallerySection from "@/components/gallery-section";
import AboutSection from "@/components/about-section";
import FAQSection from "@/components/faq-section";
import ContactSection from "@/components/contact-section";
import SiteFooter from "@/components/site-footer";
import WhatsAppButton from "@/components/whatsapp-button";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <ProjectsSection />
        <BenefitsSection />
        <InventorySection />
        <FloorPlansSection />
        <PaymentPlanSection />
        <GallerySection />
        <AboutSection />
        <FAQSection />
        <ContactSection />
      </main>
      <SiteFooter />
      <WhatsAppButton />
    </div>
  );
}
