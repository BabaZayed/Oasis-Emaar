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
            : "bg-[#0D1B2A]/80 backdrop-blur-md"
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

        {/* =============================================
            SLIDING HEADER WRAPPER
            Uses named CSS classes with !important overrides
            to guarantee horizontal scroll on ALL devices.
            ============================================= */}
        <div className="header-slide-wrapper">
          {/* Fade hints on edges */}
          <div className="header-fade-left" />
          <div className="header-fade-right" />

          {/* The scrollable track — single row, no wrapping */}
          <div className="header-slide-track">
            {/* Logo */}
            <Link
              href={currentLang === "en" ? "/" : `/${currentLang}`}
              className="header-logo"
            >
              <div className="flex flex-col">
                <span
                  className={`font-heading font-bold tracking-wider gold-text transition-all duration-500 ${
                    scrolled ? "text-lg sm:text-2xl" : "text-xl sm:text-3xl"
                  }`}
                >
                  OASIS
                </span>
                <span
                  className={`text-[9px] sm:text-xs tracking-[0.15em] text-white/70 -mt-1 transition-all duration-500 ${
                    scrolled ? "" : "opacity-80"
                  }`}
                >
                  {t.logoSubtitle}
                </span>
              </div>
            </Link>

            {/* Nav links — ALL 14 items, never hidden */}
            <nav className="header-nav">
              {t.nav.map((link, idx) => {
                const englishHref = headerT.en.nav[idx]?.href || link.href;
                const navHref = langHref(currentLang, englishHref);
                const isSellPage = englishHref === "/sell";
                const isInventory = englishHref === "/inventory";
                const isActive =
                  currentPagePath === englishHref ||
                  (englishHref !== "/" &&
                    !englishHref.startsWith("/#") &&
                    currentPagePath.startsWith(englishHref));
                return (
                  <Link
                    key={englishHref}
                    href={navHref}
                    className={`header-nav-item font-body px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm transition-all duration-300 rounded-md flex items-center gap-1 ${
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

            {/* Divider */}
            <div className="header-divider" />

            {/* Phone number — ALWAYS visible */}
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="header-phone"
            >
              <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>{PHONE_NUMBER}</span>
            </a>

            {/* Language Switcher */}
            <div ref={langRef} className="header-lang">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 p-1.5 sm:p-2 min-w-[36px] sm:min-w-[44px] min-h-[36px] sm:min-h-[44px] text-white/80 hover:text-[#C8A45C] transition-colors rounded-md hover:bg-white/5"
                aria-label="Switch language"
              >
                <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-[10px] font-bold bg-[#C8A45C] text-[#1A2332] px-1 py-0.5 rounded leading-none">
                  {currentLang.toUpperCase()}
                </span>
              </button>
              {langOpen && (
                <div
                  className={`absolute ${isRTL ? "left-0" : "right-0"} top-full mt-2 w-48 bg-[#1A2332]/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl overflow-hidden z-50`}
                >
                  {langCodes.map((code) => {
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

            {/* CTA Button */}
            <Link
              href={langHref(currentLang, "/availability")}
              className="header-cta"
            >
              <Button className="btn-gold-glow text-[#1A2332] font-semibold text-xs sm:text-sm px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-md flex items-center gap-1.5 whitespace-nowrap">
                {t.checkAvailability}
              </Button>
            </Link>

            {/* Hamburger — only for mobile dropdown */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="header-hamburger lg:hidden p-2 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-lg text-white hover:text-[#C8A45C] transition-colors"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu (hamburger dropdown) */}
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
              className="fixed top-14 sm:top-16 lg:top-20 left-0 right-0 z-40 lg:hidden"
            >
              <div className="bg-[#1A2332]/98 backdrop-blur-xl border-t border-[#C8A45C]/15 shadow-2xl max-h-[85vh] overflow-y-auto luxury-scroll">
                <nav
                  className="max-w-7xl mx-auto px-4 py-6 flex flex-col"
                  dir={isRTL ? "rtl" : "ltr"}
                >
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
                    <Link
                      href={langHref(currentLang, "/availability")}
                      onClick={() => setMobileOpen(false)}
                    >
                      <Button className="w-full btn-gold-glow text-[#1A2332] font-semibold py-3.5 rounded-lg text-base">
                        {t.checkAvailability}
                      </Button>
                    </Link>
                    {/* Mobile Language Options */}
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <p className="text-xs text-white/50 mb-3 px-1 tracking-wider uppercase">
                        {currentLang === "ar"
                          ? "اللغة"
                          : currentLang === "zh"
                            ? "语言"
                            : currentLang === "ru"
                              ? "Язык"
                              : currentLang === "fr"
                                ? "Langue"
                                : currentLang === "de"
                                  ? "Sprache"
                                  : "Language"}
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

      {/* =============================================
          CSS-FORCED HORIZONTAL SLIDE RULES
          Using !important to override ALL Tailwind,
          parent containers, and browser defaults.
          ============================================= */}
      <style jsx global>{`
        /* ──────────────────────────────────────────────
           RULE 1: FORCE SINGLE ROW FLOW
           .header-slide-track = the main flex row
           ────────────────────────────────────────────── */
        .header-slide-track {
          display: flex !important;
          flex-wrap: nowrap !important;
          flex-direction: row !important;
          align-items: center !important;
          height: 56px !important;
          gap: 4px !important;
          padding: 0 12px !important;
        }
        @media (min-width: 640px) {
          .header-slide-track {
            height: 64px !important;
            gap: 8px !important;
            padding: 0 24px !important;
          }
        }
        @media (min-width: 1024px) {
          .header-slide-track {
            height: 80px !important;
            gap: 12px !important;
            padding: 0 32px !important;
          }
        }

        /* ──────────────────────────────────────────────
           RULE 2: UNLOCK HORIZONTAL OVERFLOW
           .header-slide-wrapper = outer scroll container
           ────────────────────────────────────────────── */
        .header-slide-wrapper {
          position: relative !important;
          overflow-x: auto !important;
          overflow-y: hidden !important;
          -webkit-overflow-scrolling: touch !important;
        }

        /* ──────────────────────────────────────────────
           RULE 3: PREVENT MENU ITEMS FROM SHRINKING
           Every child inside the slide track
           ────────────────────────────────────────────── */
        .header-logo,
        .header-nav,
        .header-nav-item,
        .header-divider,
        .header-phone,
        .header-lang,
        .header-cta,
        .header-hamburger {
          flex-shrink: 0 !important;
          white-space: nowrap !important;
        }

        /* Nav wrapper: single row, never wrap */
        .header-nav {
          display: flex !important;
          flex-wrap: nowrap !important;
          flex-direction: row !important;
          align-items: center !important;
          gap: 2px !important;
        }
        @media (min-width: 640px) {
          .header-nav {
            gap: 4px !important;
          }
        }

        /* ──────────────────────────────────────────────
           RULE 4: REMOVE DESKTOP SCROLLBARS
           Hide scrollbar on every browser engine
           ────────────────────────────────────────────── */
        .header-slide-wrapper::-webkit-scrollbar {
          display: none !important;
          height: 0 !important;
          width: 0 !important;
        }
        .header-slide-wrapper {
          scrollbar-width: none !important;       /* Firefox */
          -ms-overflow-style: none !important;    /* IE/Edge */
        }

        /* ──────────────────────────────────────────────
           FADE HINTS ON EDGES
           Visual cue that more items exist off-screen
           ────────────────────────────────────────────── */
        .header-fade-left,
        .header-fade-right {
          position: absolute !important;
          top: 0 !important;
          bottom: 0 !important;
          width: 32px !important;
          z-index: 10 !important;
          pointer-events: none !important;
        }
        .header-fade-left {
          left: 0 !important;
          background: linear-gradient(to right, rgba(13, 27, 42, 0.95), transparent) !important;
        }
        .header-fade-right {
          right: 0 !important;
          background: linear-gradient(to left, rgba(13, 27, 42, 0.95), transparent) !important;
        }

        /* Individual element styles */
        .header-logo {
          display: flex !important;
          align-items: center !important;
          gap: 8px !important;
        }
        .header-divider {
          width: 1px !important;
          height: 24px !important;
          background: rgba(255, 255, 255, 0.15) !important;
        }
        .header-phone {
          display: flex !important;
          align-items: center !important;
          gap: 4px !important;
          color: #C8A45C !important;
          font-size: 11px !important;
          font-weight: 500 !important;
          text-decoration: none !important;
          transition: color 0.2s !important;
        }
        .header-phone:hover {
          color: white !important;
        }
        @media (min-width: 640px) {
          .header-phone {
            font-size: 14px !important;
            gap: 6px !important;
          }
        }
        @media (min-width: 768px) {
          .header-phone {
            font-size: 16px !important;
          }
        }
        .header-lang {
          position: relative !important;
        }
        .header-cta {
          text-decoration: none !important;
        }
        .header-hamburger {
          border: none !important;
          background: none !important;
          cursor: pointer !important;
        }
      `}</style>
    </>
  );
}
