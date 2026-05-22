"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Tag, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WHATSAPP_LINK, PHONE_NUMBER, inventoryItems } from "@/lib/data";
import { detectLang, langNames, langCodes, headerT, type LangCode } from "@/lib/i18n";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const currentLang: LangCode = detectLang(pathname);
  const t = headerT[currentLang];
  const isRTL = currentLang === "ar";
  const availableCount = inventoryItems.filter((i) => i.status === "available").length;

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

  // Close mobile menu on route change (adjust state during render per React guidelines)
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setMobileOpen(false);
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0D1B2A]/95 backdrop-blur-lg shadow-lg border-b border-[#C8A45C]/10"
            : "bg-transparent"
        }`}
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link href={currentLang === "en" ? "/" : `/${currentLang}`} className="flex items-center gap-2">
              <div className="flex flex-col">
                <span className="font-heading text-xl sm:text-2xl font-bold tracking-wider gold-text">
                  OASIS
                </span>
                <span className="text-[10px] sm:text-xs tracking-[0.15em] text-white/70 -mt-1">
                  {t.logoSubtitle}
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {t.nav.map((link, idx) => {
                const isSellPage = link.href === "/sell";
                const isInventory = link.href === "/inventory";
                // Use the original English href for navigation
                const navHref = headerT.en.nav[idx]?.href || link.href;
                const isActive = pathname === navHref ||
                  (navHref !== "/" && pathname.startsWith(navHref));
                return (
                  <Link
                    key={navHref}
                    href={navHref}
                    className={`font-body px-3 py-2 text-sm transition-colors duration-200 rounded-md flex items-center gap-1.5 ${
                      isSellPage
                        ? "btn-gold text-[#0D1B2A] font-semibold hover:opacity-90"
                        : isActive
                          ? "text-[#C8A45C]"
                          : "text-white/80 hover:text-[#C8A45C]"
                    }`}
                  >
                    {isSellPage && <Tag className="w-3.5 h-3.5" />}
                    {link.label}
                    {isInventory && (
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
                    {currentLang.toUpperCase()}
                  </span>
                </button>
                {langOpen && (
                  <div className={`absolute ${isRTL ? 'left-0' : 'right-0'} top-full mt-2 w-48 bg-[#1A2332] border border-white/10 rounded-lg shadow-2xl overflow-hidden z-50`}>
                    {langCodes.map((code) => (
                      <Link
                        key={code}
                        href={langNames[code].href}
                        onClick={() => setLangOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                          currentLang === code
                            ? "text-[#C8A45C] bg-white/5"
                            : "text-white/80 hover:text-[#C8A45C] hover:bg-white/5"
                        }`}
                      >
                        <span className="text-lg">{langNames[code].flag}</span>
                        <span>{langNames[code].label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <Link href="/availability">
                <Button
                  className="gold-gradient text-[#1A2332] font-semibold text-sm px-4 py-2 rounded-md hover:opacity-90 transition-opacity hidden sm:flex"
                >
                  {t.checkAvailability}
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
            <div className="absolute top-16 left-0 right-0 bg-[#1A2332] border-t border-white/10 shadow-2xl max-h-[80vh] overflow-y-auto">
              <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col" dir={isRTL ? "rtl" : "ltr"}>
                {t.nav.map((link, idx) => {
                  const navHref = headerT.en.nav[idx]?.href || link.href;
                  const isSellPage = link.href === "/sell";
                  const isInventory = link.href === "/inventory";
                  return (
                    <Link
                      key={navHref}
                      href={navHref}
                      onClick={() => setMobileOpen(false)}
                      className={`px-4 py-3 rounded-md transition-colors flex items-center gap-2 min-h-[44px] ${
                        isSellPage
                          ? "btn-gold text-[#0D1B2A] font-semibold"
                          : "text-white/80 hover:text-[#C8A45C] hover:bg-white/5"
                      }`}
                    >
                      {isSellPage && <Tag className="w-4 h-4" />}
                      {link.label}
                      {isInventory && (
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
                  <Link href="/availability" onClick={() => setMobileOpen(false)}>
                    <Button
                      className="w-full gold-gradient text-[#1A2332] font-semibold py-3 rounded-md"
                    >
                      {t.checkAvailability}
                    </Button>
                  </Link>
                  {/* Mobile Language Options */}
                  <div className="mt-3 pt-3 border-t border-white/10">
                    <p className="text-xs text-white/50 mb-2 px-1">
                      {currentLang === "ar" ? "اللغة" : currentLang === "zh" ? "语言" : currentLang === "ru" ? "Язык" : currentLang === "fr" ? "Langue" : currentLang === "de" ? "Sprache" : "Language"}
                    </p>
                    <div className="grid grid-cols-2 gap-1">
                      {langCodes.map((code) => (
                        <Link
                          key={code}
                          href={langNames[code].href}
                          onClick={() => setMobileOpen(false)}
                          className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm min-h-[44px] transition-colors ${
                            currentLang === code
                              ? "text-[#C8A45C] bg-white/5"
                              : "text-white/80 hover:text-[#C8A45C] hover:bg-white/5"
                          }`}
                        >
                          <span>{langNames[code].flag}</span>
                          <span>{langNames[code].label}</span>
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
