"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Tag, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WHATSAPP_LINK, PHONE_NUMBER, inventoryItems } from "@/lib/data";
import Link from "next/link";
import { usePathname } from "next/navigation";

const languages = [
  { code: "en", label: "English", flag: "🇬🇧", href: "/" },
  { code: "ar", label: "العربية", flag: "🇸🇦", href: "/ar" },
  { code: "zh", label: "中文", flag: "🇨🇳", href: "/zh" },
  { code: "ru", label: "Русский", flag: "🇷🇺", href: "/ru" },
  { code: "fr", label: "Français", flag: "🇫🇷", href: "/fr" },
  { code: "de", label: "Deutsch", flag: "🇩🇪", href: "/de" },
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Inventory", href: "/inventory", badge: true },
  { label: "Projects", href: "/projects" },
  { label: "Marketplace", href: "/marketplace" },
  { label: "Sell Property", href: "/sell" },
  { label: "Floor Plans", href: "/floor-plans" },
  { label: "Payment Plan", href: "/payment-plan" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Reviews", href: "/#feedback" },
  { label: "FAQ", href: "/faq" },
  { label: "Listings", href: "/listings" },
  { label: "Contact", href: "/contact" },
];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const currentLang = languages.find(l => l.code !== "en" && pathname.startsWith(l.href)) || languages[0];

  // Click outside to close language dropdown
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    if (langOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [langOpen]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#1A2332]/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="flex flex-col">
                <span className="font-heading text-xl sm:text-2xl font-bold tracking-wider text-[#C8A45C]">
                  OASIS
                </span>
                <span className="text-[10px] sm:text-xs tracking-[0.15em] text-white/70 -mt-1">
                  EMAAR | AUTHORIZED AGENT
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));
                const isSellPage = link.href === "/sell";
                const isBadge = "badge" in link && link.badge;
                const availableCount = inventoryItems.filter((i) => i.status === "available").length;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`font-body px-3 py-2 text-sm transition-colors duration-200 rounded-md flex items-center gap-1.5 ${
                      isSellPage
                        ? "bg-emerald-600 text-white font-semibold hover:bg-emerald-700"
                        : isActive
                          ? "text-[#C8A45C]"
                          : "text-white/80 hover:text-[#C8A45C]"
                    }`}
                  >
                    {isSellPage && <Tag className="w-3.5 h-3.5" />}
                    {link.label}
                    {isBadge && (
                      <span className="bg-[#C8A45C] text-[#1A2332] text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                        {availableCount}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="hidden sm:flex flex-row items-center gap-2 text-white/80 hover:text-[#C8A45C] text-sm transition-colors whitespace-nowrap"
              >
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span className="whitespace-nowrap">{PHONE_NUMBER}</span>
              </a>
              {/* Language Switcher */}
              <div ref={langRef} className="relative hidden sm:block">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-1 p-2 text-white/80 hover:text-[#C8A45C] transition-colors rounded-md hover:bg-white/5"
                  aria-label="Switch language"
                >
                  <Globe className="w-5 h-5" />
                  <span className="text-[10px] font-bold bg-[#C8A45C] text-[#1A2332] px-1 py-0.5 rounded leading-none">
                    {currentLang.code.toUpperCase()}
                  </span>
                </button>
                {langOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-[#1A2332] border border-white/10 rounded-lg shadow-2xl overflow-hidden z-50">
                    {languages.map((lang) => (
                      <Link
                        key={lang.code}
                        href={lang.href}
                        onClick={() => setLangOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                          currentLang.code === lang.code
                            ? "text-[#C8A45C] bg-white/5"
                            : "text-white/80 hover:text-[#C8A45C] hover:bg-white/5"
                        }`}
                      >
                        <span className="text-lg">{lang.flag}</span>
                        <span>{lang.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <Link href="/availability">
                <Button
                  className="gold-gradient text-[#1A2332] font-semibold text-sm px-4 py-2 rounded-md hover:opacity-90 transition-opacity hidden sm:flex"
                >
                  Check Availability
                </Button>
              </Link>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 text-white hover:text-[#C8A45C] transition-colors"
              >
                {mobileOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setMobileOpen(false)}
            />
            <div className="absolute top-16 left-0 right-0 bg-[#1A2332] border-t border-white/10 shadow-2xl">
              <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href ||
                    (link.href !== "/" && pathname.startsWith(link.href));
                  const isSellPage = link.href === "/sell";
                  const isBadge = "badge" in link && link.badge;
                  const availableCount = inventoryItems.filter((i) => i.status === "available").length;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`px-4 py-3 rounded-md transition-colors flex items-center gap-2 min-h-[44px] ${
                        isSellPage
                          ? "bg-emerald-600 text-white font-semibold"
                          : isActive
                            ? "text-[#C8A45C] bg-white/5"
                            : "text-white/80 hover:text-[#C8A45C] hover:bg-white/5"
                      }`}
                    >
                      {isSellPage && <Tag className="w-4 h-4" />}
                      {link.label}
                      {isBadge && (
                        <span className="bg-[#C8A45C] text-[#1A2332] text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                          {availableCount}
                        </span>
                      )}
                    </Link>
                  );
                })}
                <div className="mt-4 pt-4 border-t border-white/10 px-4">
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    className="flex items-center gap-2 text-green-400 mb-3"
                  >
                    WhatsApp: {PHONE_NUMBER}
                  </a>
                  <Link href="/availability">
                    <Button
                      className="w-full gold-gradient text-[#1A2332] font-semibold py-3 rounded-md"
                    >
                      Check Availability
                    </Button>
                  </Link>
                  {/* Mobile Language Options */}
                  <div className="mt-3 pt-3 border-t border-white/10">
                    <p className="text-xs text-white/50 mb-2 px-1">Language</p>
                    <div className="grid grid-cols-2 gap-1">
                      {languages.map((lang) => (
                        <Link
                          key={lang.code}
                          href={lang.href}
                          onClick={() => setMobileOpen(false)}
                          className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm min-h-[44px] transition-colors ${
                            currentLang.code === lang.code
                              ? "text-[#C8A45C] bg-white/5"
                              : "text-white/80 hover:text-[#C8A45C] hover:bg-white/5"
                          }`}
                        >
                          <span>{lang.flag}</span>
                          <span>{lang.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
