"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WHATSAPP_LINK, PHONE_NUMBER } from "@/lib/data";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Inventory", href: "/inventory" },
  { label: "Floor Plans", href: "/floor-plans" },
  { label: "Payment Plan", href: "/payment-plan" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Reviews", href: "/#feedback" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

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
                <span className="text-xl sm:text-2xl font-bold tracking-wider text-[#C8A45C]">
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
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-2 text-sm transition-colors duration-200 ${
                      isActive
                        ? "text-[#C8A45C]"
                        : "text-white/80 hover:text-[#C8A45C]"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="hidden sm:flex items-center gap-2 text-white/80 hover:text-[#C8A45C] text-sm transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="hidden md:inline">{PHONE_NUMBER}</span>
              </a>
              <Link href="/contact">
                <Button
                  className="gold-gradient text-[#1A2332] font-semibold text-sm px-4 py-2 rounded-md hover:opacity-90 transition-opacity hidden sm:flex"
                >
                  Register Interest
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
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`px-4 py-3 rounded-md transition-colors ${
                        isActive
                          ? "text-[#C8A45C] bg-white/5"
                          : "text-white/80 hover:text-[#C8A45C] hover:bg-white/5"
                      }`}
                    >
                      {link.label}
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
                  <Link href="/contact">
                    <Button
                      className="w-full gold-gradient text-[#1A2332] font-semibold py-3 rounded-md"
                    >
                      Register Interest
                    </Button>
                  </Link>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
