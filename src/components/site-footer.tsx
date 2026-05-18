"use client";

import { PHONE_NUMBER, EMAIL, ADDRESS, WHATSAPP_LINK } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Twitter, Linkedin, Youtube, MapPin, Phone, Mail, MessageCircle, ArrowUp } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Inventory", href: "/inventory" },
  { label: "Availability", href: "/availability" },
  { label: "Listings", href: "/listings" },
  { label: "Marketplace", href: "/marketplace" },
  { label: "Sell Property", href: "/sell" },
  { label: "Floor Plans", href: "/floor-plans" },
  { label: "Payment Plan", href: "/payment-plan" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Premium Access", href: "/#premium-access" },
  { label: "References", href: "/#references" },
  { label: "Reviews", href: "/#feedback" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export default function SiteFooter() {
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-[#1A2332] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-4">
              <span className="font-heading text-2xl font-bold tracking-wider text-[#C8A45C]">OASIS</span>
              <span className="font-body text-sm tracking-[0.15em] text-white/50 ml-2">EMAAR</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-2">
              Authorized sales agent for Emaar Properties' The Oasis community in Dubai. We are an independent real estate brokerage — not Emaar Properties directly.
            </p>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              All project information, specifications, and pricing are provided for marketing purposes and are subject to change by the developer. Images and renders are artistic impressions only.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#C8A45C]/20 transition-colors"
                >
                  <social.icon className="w-4 h-4 text-[#C8A45C]" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-body font-semibold text-[#C8A45C] mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-[#C8A45C] text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body font-semibold text-[#C8A45C] mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <div className="space-y-3">
              <a href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`} className="flex items-center gap-3 text-white/50 hover:text-[#C8A45C] text-sm transition-colors">
                <Phone className="w-4 h-4 flex-shrink-0" /> {PHONE_NUMBER}
              </a>
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 text-white/50 hover:text-[#C8A45C] text-sm transition-colors">
                <Mail className="w-4 h-4 flex-shrink-0" /> {EMAIL}
              </a>
              <a href={WHATSAPP_LINK} target="_blank" className="flex items-center gap-3 text-white/50 hover:text-[#C8A45C] text-sm transition-colors">
                <MessageCircle className="w-4 h-4 flex-shrink-0" /> WhatsApp
              </a>
              <div className="flex items-start gap-3 text-white/50 text-sm">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" /> {ADDRESS}
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-body font-semibold text-[#C8A45C] mb-4 text-sm uppercase tracking-wider">Newsletter</h4>
            <p className="text-white/50 text-sm mb-4">Stay updated with The Oasis project news and exclusive offers.</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setEmail("");
              }}
              className="flex gap-2"
            >
              <Input
                placeholder="Your email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/30 text-sm"
              />
              <Button type="submit" size="sm" className="gold-gradient text-[#1A2332] font-semibold px-4 rounded-md flex-shrink-0">
                Join
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} Oasis Emaar (Authorised Sales Agent). All rights reserved. We are an independent authorised real estate brokerage, NOT Emaar Properties PJSC. Emaar, The Oasis, Address, Palace, and related names are trademarks of Emaar Properties PJSC. All project information is subject to change by the developer. Artistic impressions only — actual products may differ.
          </p>
          <div className="flex items-center gap-4 text-xs text-white/30">
            <a href="#" className="hover:text-[#C8A45C] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#C8A45C] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[#C8A45C] transition-colors">Disclaimer</a>
          </div>
        </div>
      </div>

      {/* Back to Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-24 right-6 w-10 h-10 rounded-full bg-[#1A2332] text-[#C8A45C] shadow-lg flex items-center justify-center hover:bg-[#2A3A52] transition-colors z-40"
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </footer>
  );
}
