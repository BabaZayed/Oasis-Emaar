"use client";

import { PHONE_NUMBER, EMAIL, ADDRESS, WHATSAPP_LINK } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Twitter, Linkedin, Youtube, MapPin, Phone, Mail, MessageCircle, ArrowUp, ExternalLink, Loader2, CheckCircle } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { trackLead } from "@/lib/meta-pixel";
import { detectLang, footerT, headerT, type LangCode } from "@/lib/i18n";

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com/oasisemaar", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com/oasisemaar", label: "Instagram" },
  { icon: Twitter, href: "https://twitter.com/OasisEmaar", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com/company/oasisemaar", label: "LinkedIn" },
  { icon: Youtube, href: "https://youtube.com/@oasisemaar", label: "YouTube" },
];

const trustedResources = [
  { name: "Emaar Properties", url: "https://www.emaar.com" },
  { name: "Dubai Land Department", url: "https://www.dubailand.gov.ae" },
  { name: "RERA Dubai", url: "https://www.rpdubai.ae" },
  { name: "Dubai REST", url: "https://dubairest.gov.ae" },
  { name: "Dubai Tourism", url: "https://www.visitdubai.com" },
];

const partnerProperties = [
  { name: "Grand Polo Club & Resort by Emaar", url: "https://thegrandpolo.com", desc: "Polo-inspired luxury villas & resort community in Dubai" },
];

const alternateDomains = [
  { domain: "theoasisemaar.com", note: "Alternate URL for this website" },
];

export default function SiteFooter() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const pathname = usePathname();
  const lang: LangCode = detectLang(pathname);
  const t = footerT[lang];
  const headerNav = headerT[lang].nav;
  const isRTL = lang === "ar";

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          formType: "newsletter",
          pageUrl: window.location.href,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
        setEmail("");
        trackLead({ formType: "general", propertyInterest: "Newsletter" });
        toast({
          title: t.newsletterSuccess,
          description: "",
        });
        setTimeout(() => setIsSuccess(false), 3000);
      } else {
        toast({
          title: "Something went wrong",
          description: data.error || "Please try again later.",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Network error",
        description: "Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-[#0D1B2A] text-white" dir={isRTL ? "rtl" : "ltr"}>
      {/* Gold accent line at very top */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-[#C8A45C] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-5">
              <span className="font-heading text-2xl font-bold tracking-wider gold-text">OASIS</span>
              <span className="font-body text-sm tracking-[0.15em] text-white/50 ml-2">EMAAR</span>
            </div>
            <p className="text-[#8A9BB5] text-sm leading-relaxed mb-2 font-light">
              {t.brandDesc}
            </p>
            <p className="text-[#8A9BB5] text-sm leading-relaxed mb-7 font-light">
              {t.brandDisclaimer}
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-11 h-11 rounded-lg bg-white/[0.06] border border-white/[0.06] flex items-center justify-center hover:bg-[#C8A45C]/15 hover:border-[#C8A45C]/20 transition-all duration-300"
                >
                  <social.icon className="w-4 h-4 text-[#C8A45C]" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-body font-semibold text-[#C8A45C] mb-5 text-sm uppercase tracking-[0.2em]">{t.quickLinks}</h4>
            <ul className="space-y-2.5">
              {headerNav.map((link, idx) => {
                const navHref = headerT.en.nav[idx]?.href || link.href;
                return (
                  <li key={navHref}>
                    <Link
                      href={navHref}
                      className="text-white/50 hover:text-[#C8A45C] text-sm transition-colors duration-300 font-light"
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body font-semibold text-[#C8A45C] mb-5 text-sm uppercase tracking-[0.2em]">{t.contact}</h4>
            <div className="space-y-3.5">
              <a href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`} className="flex items-center gap-3 text-white/50 hover:text-[#C8A45C] text-sm transition-colors duration-300 font-light">
                <Phone className="w-4 h-4 flex-shrink-0" /> {PHONE_NUMBER}
              </a>
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 text-white/50 hover:text-[#C8A45C] text-sm transition-colors duration-300 font-light">
                <Mail className="w-4 h-4 flex-shrink-0" /> {EMAIL}
              </a>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/50 hover:text-[#C8A45C] text-sm transition-colors duration-300 font-light">
                <MessageCircle className="w-4 h-4 flex-shrink-0" /> WhatsApp
              </a>
              <a
                href="https://www.google.com/maps/place/Al+Quoz+St+-+Dubai/@25.1412,55.2252,15z"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-white/50 hover:text-[#C8A45C] text-sm transition-colors duration-300 font-light"
              >
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" /> {ADDRESS}
              </a>
            </div>

            {/* Trusted Resources */}
            <h4 className="font-body font-semibold text-[#C8A45C] mb-4 mt-8 text-sm uppercase tracking-[0.2em]">{t.trustedResources}</h4>
            <ul className="space-y-2.5">
              {trustedResources.map((resource) => (
                <li key={resource.name}>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-white/40 hover:text-[#C8A45C] text-xs transition-colors duration-300 font-light"
                  >
                    <ExternalLink className="w-3 h-3 flex-shrink-0" />
                    {resource.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore More Properties */}
          <div>
            <h4 className="font-body font-semibold text-[#C8A45C] mb-5 text-sm uppercase tracking-[0.2em]">{t.exploreMore}</h4>
            <ul className="space-y-3.5">
              {partnerProperties.map((property) => (
                <li key={property.name}>
                  <a
                    href={property.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    <span className="flex items-center gap-1.5 text-white/70 hover:text-[#C8A45C] text-sm font-medium transition-colors duration-300">
                      <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
                      {property.name}
                    </span>
                    <span className="text-white/40 text-xs block ml-5 group-hover:text-white/60 transition-colors duration-300 font-light">{property.desc}</span>
                  </a>
                </li>
              ))}
            </ul>
            {/* Alternate Domain — SEO cross-domain signal */}
            <div className="mt-5 pt-4 border-t border-white/10">
              <p className="text-white/30 text-xs mb-2 font-light">Also accessible at:</p>
              {alternateDomains.map((alt) => (
                <a
                  key={alt.domain}
                  href={`https://${alt.domain}`}
                  className="flex items-center gap-1.5 text-white/40 hover:text-[#C8A45C] text-xs transition-colors duration-300 font-light"
                >
                  <ExternalLink className="w-3 h-3 flex-shrink-0" />
                  {alt.domain}
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter - more prominent */}
          <div>
            <h4 className="font-body font-semibold text-[#C8A45C] mb-5 text-sm uppercase tracking-[0.2em]">{t.newsletter}</h4>
            <p className="text-white/50 text-sm mb-5 font-light leading-relaxed">{t.newsletterDesc}</p>
            <form
              onSubmit={handleNewsletterSubmit}
              className="space-y-3"
            >
              <Input
                placeholder={t.newsletterPlaceholder}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubmitting}
                className="bg-white/[0.06] border-white/[0.1] text-white placeholder:text-white/25 text-sm disabled:opacity-50 h-11 rounded-lg focus:border-[#C8A45C]/40 focus:ring-[#C8A45C]/20 transition-all duration-300"
              />
              <Button
                type="submit"
                size="sm"
                disabled={isSubmitting || isSuccess}
                className="btn-gold-glow text-[#1A2332] font-semibold px-5 py-2.5 rounded-lg w-full disabled:opacity-50"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : isSuccess ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  t.newsletterJoin
                )}
              </Button>
            </form>
            {isSuccess && (
              <p className="text-emerald-400 text-xs mt-3 font-body">{t.newsletterSuccess}</p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-white/30 font-light">
            &copy; {new Date().getFullYear()} {t.copyright}
          </p>
          <div className="flex items-center gap-5 text-xs text-white/30">
            <Link href="/privacy" className="hover:text-[#C8A45C] transition-colors duration-300 font-light">{t.privacy}</Link>
            <Link href="/terms" className="hover:text-[#C8A45C] transition-colors duration-300 font-light">{t.terms}</Link>
            <Link href="/disclaimer" className="hover:text-[#C8A45C] transition-colors duration-300 font-light">{t.disclaimer}</Link>
          </div>
        </div>
      </div>

      {/* Back to Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-28 right-6 w-11 h-11 rounded-full bg-[#0D1B2A]/90 backdrop-blur-sm text-[#C8A45C] shadow-lg border border-[#C8A45C]/15 flex items-center justify-center hover:bg-[#1B2D45] hover:border-[#C8A45C]/30 transition-all duration-300 z-40"
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </footer>
  );
}
