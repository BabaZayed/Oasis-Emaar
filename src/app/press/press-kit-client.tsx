"use client";

import { useState } from "react";
import { Copy, Check, Code, Download, ExternalLink, Shield, Building2, Users, TrendingUp, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const embedBadges = [
  {
    name: "Authorised Agent Badge",
    description: "Embed this badge on your website to show you work with an authorised Emaar agent",
    preview: (
      <div className="bg-[#1A2332] rounded-lg px-4 py-3 inline-flex items-center gap-3">
        <div className="w-8 h-8 rounded gold-gradient flex items-center justify-center text-[#1A2332] font-bold text-xs">OE</div>
        <div>
          <p className="text-[#C8A45C] font-bold text-xs leading-tight">OASIS EMAAR</p>
          <p className="text-white/50 text-[10px] leading-tight">Authorised Sales Agent</p>
        </div>
      </div>
    ),
    code: `<a href="https://oasisemaar.com" target="_blank" rel="noopener noreferrer" title="Oasis Emaar — Authorised Emaar Sales Agent">
  <div style="display:inline-flex;align-items:center;gap:12px;background:#1A2332;border-radius:8px;padding:12px 16px;text-decoration:none;">
    <div style="width:32px;height:32px;border-radius:6px;background:linear-gradient(135deg,#C8A45C,#E8D4A0);display:flex;align-items:center;justify-content:center;color:#1A2332;font-weight:bold;font-size:11px;">OE</div>
    <div>
      <div style="color:#C8A45C;font-weight:bold;font-size:12px;font-family:sans-serif;line-height:1.2;">OASIS EMAAR</div>
      <div style="color:rgba(255,255,255,0.5);font-size:10px;font-family:sans-serif;line-height:1.2;">Authorised Sales Agent</div>
    </div>
  </div>
</a>`,
  },
  {
    name: "Property Listing Widget",
    description: "Embed a live The Oasis property listing on your website or blog",
    preview: (
      <div className="bg-[#1A2332] rounded-lg p-4 max-w-xs">
        <p className="text-[#C8A45C] font-bold text-sm mb-1">The Oasis by Emaar</p>
        <p className="text-white/60 text-xs mb-2">77 waterfront properties available</p>
        <div className="flex gap-1.5 mb-2">
          <span className="bg-[#C8A45C]/20 text-[#C8A45C] text-[9px] px-1.5 py-0.5 rounded">4BR Villa from AED 9.18M</span>
          <span className="bg-[#C8A45C]/20 text-[#C8A45C] text-[9px] px-1.5 py-0.5 rounded">6BR Mansion from AED 46.97M</span>
        </div>
        <p className="text-white/40 text-[10px]">oasisemaar.com</p>
      </div>
    ),
    code: `<a href="https://oasisemaar.com/inventory" target="_blank" rel="noopener noreferrer" title="The Oasis by Emaar — Waterfront Properties">
  <div style="background:#1A2332;border-radius:8px;padding:16px;max-width:300px;text-decoration:none;">
    <div style="color:#C8A45C;font-weight:bold;font-size:14px;font-family:sans-serif;margin-bottom:4px;">The Oasis by Emaar</div>
    <div style="color:rgba(255,255,255,0.6);font-size:12px;font-family:sans-serif;margin-bottom:8px;">77 waterfront properties available</div>
    <div style="display:flex;gap:6px;margin-bottom:8px;flex-wrap:wrap;">
      <span style="background:rgba(200,164,92,0.2);color:#C8A45C;font-size:9px;padding:2px 6px;border-radius:4px;font-family:sans-serif;">4BR Villa from AED 9.18M</span>
      <span style="background:rgba(200,164,92,0.2);color:#C8A45C;font-size:9px;padding:2px 6px;border-radius:4px;font-family:sans-serif;">6BR Mansion from AED 46.97M</span>
    </div>
    <div style="color:rgba(255,255,255,0.4);font-size:10px;font-family:sans-serif;">oasisemaar.com</div>
  </div>
</a>`,
  },
  {
    name: "Text Link (SEO-Friendly)",
    description: "Simple text link with descriptive anchor text — best for blog posts and articles",
    preview: (
      <span className="text-[#C8A45C] underline decoration-[#C8A45C]/30 underline-offset-2 text-sm">
        The Oasis by Emaar — Authorised Sales Agent
      </span>
    ),
    code: `<a href="https://oasisemaar.com" target="_blank" rel="noopener noreferrer">The Oasis by Emaar — Authorised Sales Agent</a>`,
  },
];

const pressFacts = [
  { icon: Building2, label: "Community Size", value: "9.4 million sqm" },
  { icon: Users, label: "Total Residences", value: "7,000+" },
  { icon: TrendingUp, label: "Price Range", value: "AED 9.18M – 50M+" },
  { icon: MapPin, label: "Location", value: "Dubailand, Near Hessa Street" },
  { icon: Building2, label: "Developer", value: "Emaar Properties PJSC" },
  { icon: Users, label: "Clusters", value: "9 Distinct Clusters" },
];

const mediaContacts = [
  { label: "Press Email", value: "sales@oasisemaar.com", href: "mailto:sales@oasisemaar.com" },
  { label: "Phone", value: "+971 52 691 9169", href: "tel:+971526919169" },
  { label: "WhatsApp", value: "Chat with us", href: "https://wa.me/971526919169" },
];

export default function PressKitClient() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = async (code: string, index: number) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="min-h-screen bg-white pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-12">
          <span className="font-body text-sm font-semibold tracking-[0.2em] uppercase text-[#C8A45C]">
            Press & Media
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A2332] mt-3 mb-4">
            Media Kit & Brand Assets
          </h1>
          <p className="font-body text-gray-500 max-w-2xl mx-auto">
            Official resources for journalists, bloggers, and partners. Download logos, embed widgets on your website, and access media-ready facts about The Oasis by Emaar.
          </p>
          <div className="section-divider max-w-xs mx-auto mt-6" />
        </div>

        {/* Quick Facts */}
        <div className="bg-[#1A2332] rounded-xl p-6 sm:p-8 mb-12">
          <h2 className="font-heading text-xl font-bold text-[#C8A45C] mb-6">Quick Facts for Press</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {pressFacts.map((fact) => (
              <div key={fact.label} className="text-center">
                <fact.icon className="w-5 h-5 text-[#C8A45C] mx-auto mb-1.5" />
                <p className="font-heading text-lg font-bold text-white">{fact.value}</p>
                <p className="font-body text-xs text-white/40">{fact.label}</p>
              </div>
            ))}
          </div>
          <p className="text-white/30 text-xs mt-6 text-center">
            All facts are sourced from Emaar Properties PJSC and are subject to change. Please verify current details before publishing.
          </p>
        </div>

        {/* Embeddable Badges & Widgets */}
        <div className="mb-12">
          <h2 className="font-heading text-2xl font-bold text-[#1A2332] mb-2 flex items-center gap-2">
            <Code className="w-6 h-6 text-[#C8A45C]" />
            Embeddable Widgets & Badges
          </h2>
          <p className="text-gray-500 mb-8">
            Copy and paste these embed codes into your website or blog to link to Oasis Emaar. Each widget includes a backlink to our site and helps visitors discover The Oasis by Emaar.
          </p>

          <div className="space-y-8">
            {embedBadges.map((badge, index) => (
              <div key={badge.name} className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="p-6 sm:p-8">
                  <h3 className="font-heading text-lg font-bold text-[#1A2332] mb-1">{badge.name}</h3>
                  <p className="text-sm text-gray-500 mb-6">{badge.description}</p>

                  {/* Preview */}
                  <div className="bg-gray-50 rounded-lg p-6 mb-4 flex items-center justify-center min-h-[80px]">
                    {badge.preview}
                  </div>

                  {/* Code */}
                  <div className="relative">
                    <div className="bg-[#1A2332] rounded-lg p-4 overflow-x-auto">
                      <pre className="text-sm text-green-400 font-mono whitespace-pre-wrap break-all">
                        <code>{badge.code}</code>
                      </pre>
                    </div>
                    <Button
                      onClick={() => handleCopy(badge.code, index)}
                      size="sm"
                      className="absolute top-2 right-2 bg-[#C8A45C] text-[#1A2332] hover:opacity-90"
                    >
                      {copiedIndex === index ? (
                        <><Check className="w-3.5 h-3.5 mr-1" /> Copied!</>
                      ) : (
                        <><Copy className="w-3.5 h-3.5 mr-1" /> Copy Code</>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Logo Download Section */}
        <div className="mb-12">
          <h2 className="font-heading text-2xl font-bold text-[#1A2332] mb-2 flex items-center gap-2">
            <Download className="w-6 h-6 text-[#C8A45C]" />
            Logo & Brand Assets
          </h2>
          <p className="text-gray-500 mb-6">
            Download the Oasis Emaar logo for use in articles, publications, and partner websites. Please maintain the original proportions and do not alter the logo.
          </p>

          <div className="grid sm:grid-cols-3 gap-4">
            {/* Dark background logo */}
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <div className="bg-[#1A2332] p-8 flex items-center justify-center h-40">
                <div className="text-center">
                  <p className="font-heading text-2xl font-bold tracking-wider text-[#C8A45C]">OASIS</p>
                  <p className="text-[10px] tracking-[0.15em] text-white/50">EMAAR | AUTHORISED AGENT</p>
                </div>
              </div>
              <div className="p-3 text-center">
                <p className="text-xs text-gray-500">On dark background</p>
              </div>
            </div>

            {/* Light background logo */}
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <div className="bg-white p-8 flex items-center justify-center h-40 border-b border-gray-100">
                <div className="text-center">
                  <p className="font-heading text-2xl font-bold tracking-wider text-[#C8A45C]">OASIS</p>
                  <p className="text-[10px] tracking-[0.15em] text-[#1A2332]/50">EMAAR | AUTHORISED AGENT</p>
                </div>
              </div>
              <div className="p-3 text-center">
                <p className="text-xs text-gray-500">On light background</p>
              </div>
            </div>

            {/* Cream background logo */}
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <div className="bg-[#F5F0E8] p-8 flex items-center justify-center h-40">
                <div className="text-center">
                  <p className="font-heading text-2xl font-bold tracking-wider text-[#C8A45C]">OASIS</p>
                  <p className="text-[10px] tracking-[0.15em] text-[#1A2332]/50">EMAAR | AUTHORISED AGENT</p>
                </div>
              </div>
              <div className="p-3 text-center">
                <p className="text-xs text-gray-500">On cream background</p>
              </div>
            </div>
          </div>

          <div className="mt-4 bg-gray-50 rounded-lg p-4 flex items-start gap-3">
            <Shield className="w-5 h-5 text-[#C8A45C] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-[#1A2332]">Brand Usage Guidelines</p>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                The Oasis Emaar logo may be used by media outlets, partners, and affiliates for editorial and informational purposes only. The logo must not be modified, rotated, or used in a way that implies endorsement by Emaar Properties PJSC. Oasis Emaar is an independent authorised sales agent and is not Emaar Properties PJSC. For commercial use beyond editorial, please contact us first.
              </p>
            </div>
          </div>
        </div>

        {/* Media Contact */}
        <div className="bg-[#F5F0E8] rounded-xl p-6 sm:p-8 mb-12">
          <h2 className="font-heading text-xl font-bold text-[#1A2332] mb-4">Media Contact</h2>
          <p className="text-gray-600 text-sm mb-6">
            For press inquiries, interview requests, high-resolution images, or fact verification, please contact our team:
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {mediaContacts.map((contact) => (
              <a
                key={contact.label}
                href={contact.href}
                target={contact.href.startsWith("http") ? "_blank" : undefined}
                rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-center gap-3 bg-white rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-lg gold-gradient flex items-center justify-center">
                  <ExternalLink className="w-4 h-4 text-[#1A2332]" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">{contact.label}</p>
                  <p className="font-semibold text-[#1A2332] text-sm">{contact.value}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* How to Link to Us — Best Practices */}
        <div>
          <h2 className="font-heading text-2xl font-bold text-[#1A2332] mb-4">How to Link to Us</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-5">
              <h3 className="font-heading font-bold text-[#1A2332] mb-2">For Bloggers & Journalists</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Use descriptive anchor text like &quot;The Oasis by Emaar — authorised agent&quot;
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Link to the most relevant page (projects, blog, FAQ)
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Embed our badge or widget for a visual reference
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Reference our blog articles as data sources
                </li>
              </ul>
            </div>
            <div className="border border-gray-200 rounded-lg p-5">
              <h3 className="font-heading font-bold text-[#1A2332] mb-2">For Partners & Affiliates</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Add our badge to your partner or referral page
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Use the property listing widget on your site
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Cross-promote via blog guest posts
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Share our articles on social media with backlinks
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
