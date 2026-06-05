"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Tag, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WHATSAPP_LINK, PHONE_NUMBER, inventoryItems } from "@/lib/data";
import {
  detectLang,
  langNames,
  langCodes,
  headerT,
  langHref,
  getPagePath,
  type LangCode,
} from "@/lib/i18n";
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
  const currentPagePath = getPagePath(pathname);

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

  // Close mobile menu on route change
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setMobileOpen(false);
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? "bg-[#0D1B2A]/95 backdrop-blur-xl shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
        dir={isRTL ? "rtl" : "ltr"}
      >
        {/* Gold bottom border on scroll */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-[1px] transition-opacity duration-700 ${
            scrolled
              ? "opacity-100"
              : "opacity-0"
          }`}
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(200, 164, 92, 0.4) 30%, rgba(200, 164, 92, 0.6) 50%, rgba(200, 164, 92, 0.4) 70%, transparent 100%)",
          }}
        />
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-20 gap-2 sm:gap-4 overflow-x-auto lg:overflow-visible scrollbar-none" style={{ WebkitOverflowScrolling: 'touch' }}>
            {/* Logo */}
            <Link href={currentLang === "en" ? "/" : `/${currentLang}`} className="flex items-center gap-2">
              <div className="flex flex-col">
                <span className={`font-heading font-bold tracking-wider gold-text transition-all duration-500 ${
                  scrolled ? "text-lg sm:text-2xl" : "text-xl sm:text-3xl"
                }`}>
                  OASIS
                </span>
                <span className={`text-[10px] sm:text-xs tracking-[0.15em] text-white/70 -mt-1 transition-all duration-500 ${
                  scrolled ? "" : "opacity-80"
                }`}>
                  {t.logoSubtitle}
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {t.nav.map((link, idx) => {
                const englishHref = headerT.en.nav[idx]?.href || link.href;
                const navHref = langHref(currentLang, englishHref);
                const isSellPage = englishHref === "/sell";
                const isInventory = englishHref === "/inventory";
                const isActive = currentPagePath === englishHref ||
                  (englishHref !== "/" && !englishHref.startsWith("/#") && currentPagePath.startsWith(englishHref));
                return (
                  <Link
                    key={englishHref}
                    href={navHref}
                    className={`font-body px-3 py-2 text-sm transition-all duration-300 rounded-md flex items-center gap-1.5 ${
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
            <div className="flex items-center gap-1 sm:gap-3 flex-shrink-0">
              {/* Phone number — always visible, slide header on mobile to see */}
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="flex items-center gap-1 text-[#C8A45C] hover:text-white text-xs sm:text-sm font-medium transition-colors whitespace-nowrap"
              >
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span className="whitespace-nowrap">{PHONE_NUMBER}</span>
              </a>
              {/* Language Switcher - ALWAYS VISIBLE */}
              <div ref={langRef} className="relative hidden sm:block">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-1 p-2 min-w-[44px] min-h-[44px] text-white/80 hover:text-[#C8A45C] transition-colors rounded-md hover:bg-white/5"
                  aria-label="Switch language"
                >
                  <Globe className="w-5 h-5" />
                  <span className="text-[10px] font-bold bg-[#C8A45C] text-[#1A2332] px-1 py-0.5 rounded leading-none">
                    {currentLang.toUpperCase()}
                  </span>
                </button>
                {langOpen && (
                  <div className={`absolute ${isRTL ? 'left-0' : 'right-0'} top-full mt-2 w-48 bg-[#1A2332]/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl overflow-hidden z-50`}>
                    {langCodes.map((code) => {
                      // Link to the same page in the selected language
                      const switchHref = langHref(code, currentPagePath);
                      return (
                        <Link
                          key={code}
                          href={switchHref}
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
                      );
                    })}
                  </div>
                )}
              </div>
              <Link href={langHref(currentLang, "/availability")}>
                <Button
                  className="btn-gold-glow text-[#1A2332] font-semibold text-sm px-5 py-2.5 rounded-md hidden sm:flex items-center gap-2"
                >
                  {t.checkAvailability}
                </Button>
              </Link>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2.5 min-w-[48px] min-h-[48px] flex items-center justify-center rounded-lg text-white hover:text-[#C8A45C] transition-colors"
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
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="fixed top-14 sm:top-20 left-0 right-0 z-40 lg:hidden"
            >
              <div className="bg-[#1A2332]/98 backdrop-blur-xl border-t border-[#C8A45C]/15 shadow-2xl max-h-[85vh] overflow-y-auto luxury-scroll">
                <nav className="max-w-7xl mx-auto px-4 py-6 flex flex-col" dir={isRTL ? "rtl" : "ltr"}>
                  {t.nav.map((link, idx) => {
                    const englishHref = headerT.en.nav[idx]?.href || link.href;
                    const navHref = langHref(currentLang, englishHref);
                    const isSellPage = englishHref === "/sell";
                    const isInventory = englishHref === "/inventory";
                    return (
                      <Link
                        key={englishHref}
                        href={navHref}
                        onClick={() => setMobileOpen(false)}
                        className={`px-4 py-3.5 rounded-lg transition-all duration-300 flex items-center gap-2 min-h-[44px] ${
                          isSellPage
                            ? "btn-gold text-[#0D1B2A] font-semibold my-2"
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
                  <div className="mt-6 pt-6 border-t border-white/10 px-4">
                    <a
                      href={WHATSAPP_LINK}
                      target="_blank"
                      className="flex items-center gap-2 text-green-400 mb-4 py-2 min-h-[44px]"
                    >
                      WhatsApp: {PHONE_NUMBER}
                    </a>
                    <Link href={langHref(currentLang, "/availability")} onClick={() => setMobileOpen(false)}>
                      <Button
                        className="w-full btn-gold-glow text-[#1A2332] font-semibold py-3.5 rounded-lg text-base"
                      >
                        {t.checkAvailability}
                      </Button>
                    </Link>
                    {/* Mobile Language Options - ALWAYS VISIBLE */}
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <p className="text-xs text-white/50 mb-3 px-1 tracking-wider uppercase">
                        {currentLang === "ar" ? "اللغة" : currentLang === "zh" ? "语言" : currentLang === "ru" ? "Язык" : currentLang === "fr" ? "Langue" : currentLang === "de" ? "Sprache" : "Language"}
                      </p>
                      <div className="grid grid-cols-2 gap-1.5">
                        {langCodes.map((code) => {
                          const switchHref = langHref(code, currentPagePath);
                          return (
                            <Link
                              key={code}
                              href={switchHref}
                              onClick={() => setMobileOpen(false)}
                              className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm min-h-[44px] transition-all duration-300 ${
                                currentLang === code
                                  ? "text-[#C8A45C] bg-white/5 border border-[#C8A45C]/20"
                                  : "text-white/80 hover:text-[#C8A45C] hover:bg-white/5"
                              }`}
                            >
                              <span>{langNames[code].flag}</span>
                              <span>{langNames[code].label}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
