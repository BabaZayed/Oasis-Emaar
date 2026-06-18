"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Shield, FileText, Globe, Building2, Wallet, ArrowRight } from "lucide-react";

export default function GuidePageClient() {
  const [step, setStep] = useState<"form" | "success">("form");
  const [form, setForm] = useState({ name: "", email: "", phone: "", country: "", interest: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/guide-download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStep("success");
    } catch {}
    setLoading(false);
  };

  if (step === "success") {
    return (
      <div className="min-h-screen bg-[#0D1B2A] flex items-center justify-center px-4">
        <Card className="max-w-lg w-full bg-white/5 border-[#C8A45C]/20 text-center p-8">
          <Download className="w-12 h-12 text-[#C8A45C] mx-auto mb-4" />
          <h1 className="font-heading text-2xl font-bold text-white mb-2">Your Guide Is Ready</h1>
          <p className="text-white/60 mb-6">
            The 2026 Dubai Luxury Real Estate Wealth & Tax Relocation Guide has been sent to your email.
            A Bijon RE consultant will follow up within 2 hours with personalised insights.
          </p>
          <div className="space-y-3">
            <a
              href="https://wa.me/971526919169?text=I%20have%20downloaded%20the%20Relocation%20Guide.%20I%20would%20like%20to%20schedule%20a%20private%20consultation%20with%20Ahmed%20regarding%20exclusive%20allocations."
              target="_blank"
              className="block w-full bg-[#C8A45C] hover:bg-[#B8933F] text-[#0D1B2A] font-bold text-center py-4 px-6 rounded-md transition-colors"
            >
              Schedule Your Private Consultation →
            </a>
            <p className="text-sm text-white/40">
              📞 <a href="tel:+971526919169" className="text-[#C8A45C] hover:underline">+971 52 691 9169</a>
            </p>
          </div>
        </Card>
      </div>
    );
  }

  const stats = [
    { icon: Wallet, label: "0% Property Tax", sub: "vs 5-12% in Europe" },
    { icon: Building2, label: "8-12% Appreciation", sub: "Dubai luxury segment 2026" },
    { icon: Globe, label: "10-Year Golden Visa", sub: "AED 2M+ investment" },
  ];

  return (
    <div className="min-h-screen bg-[#0D1B2A]">
      {/* Hero */}
      <section className="relative py-20 px-4 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-[#C8A45C]/5 to-transparent" />
        <div className="relative max-w-3xl mx-auto">
          <span className="text-[#C8A45C] text-sm font-semibold tracking-widest uppercase mb-4 block">
            Exclusive Download
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            The 2026 Dubai Luxury Real Estate<br />
            <span className="text-[#C8A45C]">Wealth & Tax Relocation Guide</span>
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto mb-8">
            The definitive guide for high-net-worth individuals relocating capital from Europe and the UK
            to Dubai&apos;s most exclusive waterfront communities.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            {stats.map((s) => (
              <div key={s.label} className="bg-white/5 border border-white/10 rounded-lg px-6 py-4">
                <s.icon className="w-5 h-5 text-[#C8A45C] mx-auto mb-1" />
                <p className="text-white font-semibold text-sm">{s.label}</p>
                <p className="text-white/50 text-xs">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="max-w-lg mx-auto px-4 pb-20">
        <Card className="bg-white/5 border-[#C8A45C]/20 p-8">
          <div className="flex items-center gap-2 mb-6">
            <Shield className="w-5 h-5 text-[#C8A45C]" />
            <span className="text-white/60 text-sm">Your data is encrypted and never shared</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-white/80 text-sm mb-1 block">Full Name *</label>
              <Input
                required
                placeholder="Your full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/30"
              />
            </div>
            <div>
              <label className="text-white/80 text-sm mb-1 block">Email Address *</label>
              <Input
                required
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/30"
              />
            </div>
            <div>
              <label className="text-white/80 text-sm mb-1 block">Phone / WhatsApp *</label>
              <Input
                required
                type="tel"
                placeholder="+971 5X XXX XXXX"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/30"
              />
            </div>
            <div>
              <label className="text-white/80 text-sm mb-1 block">Current Country of Residence *</label>
              <Input
                required
                placeholder="e.g. United Kingdom, France, Germany"
                value={form.country}
                onChange={(e) => setForm({ ...form, country: e.target.value })}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/30"
              />
            </div>
            <div>
              <label className="text-white/80 text-sm mb-1 block">Investment Interest</label>
              <select
                value={form.interest}
                onChange={(e) => setForm({ ...form, interest: e.target.value })}
                className="w-full bg-white/10 border border-white/20 text-white rounded-md px-3 py-2 text-sm"
              >
                <option value="" className="bg-[#0D1B2A]">Select your primary interest</option>
                <option value="capital_relocation" className="bg-[#0D1B2A]">Capital Relocation to Dubai</option>
                <option value="golden_visa" className="bg-[#0D1B2A]">Golden Visa via Property</option>
                <option value="investment_portfolio" className="bg-[#0D1B2A]">Investment Portfolio Diversification</option>
                <option value="second_home" className="bg-[#0D1B2A]">Second Home / Lifestyle</option>
                <option value="tax_optimization" className="bg-[#0D1B2A]">Tax Optimization Strategy</option>
                <option value="general" className="bg-[#0D1B2A]">General Inquiry</option>
              </select>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#C8A45C] hover:bg-[#B8933F] text-[#0D1B2A] font-bold py-6 text-base"
            >
              {loading ? "Processing..." : "Download the Free Guide"} <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>

          <div className="flex items-center gap-4 mt-6 pt-6 border-t border-white/10 justify-center">
            <div className="flex items-center gap-1 text-xs text-white/40">
              <FileText className="w-3 h-3" /> 24-page guide
            </div>
            <div className="flex items-center gap-1 text-xs text-white/40">
              <Shield className="w-3 h-3" /> SSL encrypted
            </div>
            <div className="flex items-center gap-1 text-xs text-white/40">
              <Globe className="w-3 h-3" /> RERA licensed
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
