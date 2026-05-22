"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Lock, CheckCircle, Crown, Eye, Download, Star, Shield, AlertTriangle, ArrowRight, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ScrollReveal from "@/components/scroll-reveal";

function checkRegistered(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("oasis_registered") === "true";
}

const premiumBenefits = [
  {
    icon: Eye,
    title: "Exclusive Listings & Pricing",
    description: "Unlock premium waterfront properties with full pricing, floor plans, and investment returns not visible to the public.",
  },
  {
    icon: Download,
    title: "Download Brochures & Specs",
    description: "Access detailed floor plans, payment schedules, and comprehensive project brochures in high resolution PDF format.",
  },
  {
    icon: Crown,
    title: "Priority Viewings",
    description: "Be the first to schedule private viewings for new launches and off-plan releases before they sell out.",
  },
  {
    icon: Star,
    title: "Insider Pre-Launch Rates",
    description: "Get early-bird pricing and exclusive pre-launch rates available only to registered VIP members.",
  },
  {
    icon: Shield,
    title: "Dedicated Consultant",
    description: "A personal property consultant will guide you through the entire buying process from start to finish.",
  },
];

const budgetOptions = [
  { value: "9m-12m", label: "AED 9M - 12M" },
  { value: "12m-20m", label: "AED 12M - 20M" },
  { value: "20m-30m", label: "AED 20M - 30M" },
  { value: "30m+", label: "AED 30M+" },
];

const timelineOptions = [
  { value: "immediate", label: "Immediate / Ready to Buy" },
  { value: "1-3months", label: "Within 1-3 Months" },
  { value: "3-6months", label: "Within 3-6 Months" },
  { value: "6-12months", label: "Within 6-12 Months" },
  { value: "exploring", label: "Just Exploring" },
];

export default function PaywallSection() {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", budget: "", timeline: "", nationality: "", propertyInterest: "", honeypot: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isRegistered, setIsRegistered] = useState(checkRegistered);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) return;

    setLoading(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          budget: formData.budget,
          timeline: formData.timeline,
          nationality: formData.nationality,
          propertyInterest: formData.propertyInterest,
          formType: "paywall",
          pageUrl: window.location.href,
          honeypot: formData.honeypot,
        }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("oasis_registered", "true");
        setSubmitted(true);
        toast({
          title: "Premium Access Unlocked!",
          description: data.qualified
            ? "A senior consultant will contact you within 2 hours with exclusive options."
            : "You now have access to all exclusive listings. Our team will be in touch within 24 hours.",
        });
        setTimeout(() => setIsRegistered(true), 2000);
      } else if (res.status === 429) {
        toast({
          title: "Too Many Attempts",
          description: "Please wait a minute before trying again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Already Registered",
          description: data.message || "We already have your details. Our team will contact you soon!",
        });
        localStorage.setItem("oasis_registered", "true");
        setIsRegistered(true);
      }
    } catch {
      toast({
        title: "Connection Error",
        description: "Please try again or contact us on WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (isRegistered && !submitted) {
    return (
      <section id="paywall" className="py-28 sm:py-36 bg-gradient-to-br from-[#1A2332] via-[#2A3A52] to-[#1A2332] text-white relative overflow-hidden">
        {/* Decorative ambient glow */}
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-[#C8A45C]/[0.03] rounded-full blur-[120px]" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <ScrollReveal cinematic>
            <div className="w-24 h-24 rounded-full gold-gradient flex items-center justify-center mx-auto mb-8 shadow-lg shadow-[#C8A45C]/20">
              <CheckCircle className="w-12 h-12 text-[#1A2332]" />
            </div>
            <span className="font-body text-sm font-semibold tracking-[0.25em] uppercase text-[#C8A45C]">
              Premium Member
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold mt-4 mb-6 text-[#F0EDE6]">
              Your Premium Access Is Active
            </h2>
            <p className="font-body text-white/50 max-w-2xl mx-auto mb-12 text-lg font-light leading-relaxed">
              You have full access to all premium listings, downloadable brochures, and priority viewing requests. Our dedicated property consultant will be in touch with you shortly.
            </p>
            <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {[
                { icon: Eye, label: "All Listings", sub: "Premium & standard" },
                { icon: Download, label: "Brochures", sub: "Floor plans & specs" },
                { icon: Crown, label: "Priority", sub: "First viewings access" },
              ].map((item) => (
                <div key={item.label} className="bg-white/[0.05] backdrop-blur-sm border border-white/[0.08] rounded-2xl p-8 card-premium-hover group">
                  <item.icon className="w-8 h-8 text-[#C8A45C] mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                  <p className="font-heading text-lg font-semibold text-[#F0EDE6]">{item.label}</p>
                  <p className="font-body text-xs text-white/40 mt-1 uppercase tracking-wider">{item.sub}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    );
  }

  return (
    <section id="paywall" className="py-28 sm:py-36 bg-gradient-to-br from-[#0D1B2A] via-[#1B2D45] to-[#0D1B2A] text-white relative overflow-hidden water-wave-bg">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C8A45C]/[0.04] rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/[0.03] rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-16 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C8A45C]/20 bg-[#C8A45C]/5 backdrop-blur-sm mb-6">
              <Lock className="w-4 h-4 text-[#C8A45C]" />
              <span className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-[#C8A45C]">
                Exclusive Access Required
              </span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold mt-2 mb-5 text-[#F0EDE6]">
              Unlock Premium Listings
            </h2>
            <p className="font-body text-white/50 max-w-2xl mx-auto text-lg font-light leading-relaxed">
              Property prices, exclusive floor plans, and premium inventory are available to registered members only. Complete the form to get instant access.
            </p>
            <div className="luxury-divider mt-10">
              <span className="diamond" />
            </div>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">
          {/* Benefits — Left Column (2/5) */}
          <div className="lg:col-span-2">
            <ScrollReveal direction="left" duration={0.7}>
              <h3 className="font-heading text-2xl font-bold text-[#F0EDE6] mb-3">What You Get</h3>
              <p className="font-body text-white/40 text-sm mb-8 font-light">Premium membership is free and gives you instant access to exclusive content.</p>
              
              <div className="space-y-4">
                {premiumBenefits.map((benefit, i) => (
                  <ScrollReveal key={benefit.title} delay={i * 0.08} duration={0.5}>
                    <div className="premium-benefit-item group">
                      <div className="w-10 h-10 rounded-lg border border-[#C8A45C]/20 flex items-center justify-center flex-shrink-0 group-hover:border-[#C8A45C]/40 group-hover:bg-[#C8A45C]/10 transition-all duration-500">
                        <benefit.icon className="w-5 h-5 text-[#C8A45C]" />
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-[#F0EDE6] text-sm mb-0.5 group-hover:text-[#C8A45C] transition-colors duration-300">{benefit.title}</h4>
                        <p className="font-body text-white/40 text-xs leading-relaxed">{benefit.description}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              {/* Urgency */}
              <ScrollReveal delay={0.5}>
                <div className="mt-8 bg-[#C8A45C]/8 border border-[#C8A45C]/20 rounded-xl p-5 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-[#C8A45C] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-body text-sm font-semibold text-[#C8A45C]">Limited Availability</p>
                    <p className="font-body text-xs text-white/40 mt-1 leading-relaxed">Over 60% of premium listings already reserved. Register now to secure your preferred unit before prices increase.</p>
                  </div>
                </div>
              </ScrollReveal>
            </ScrollReveal>
          </div>

          {/* Registration Form — Right Column (3/5) */}
          <div className="lg:col-span-3">
            <ScrollReveal direction="right" duration={0.7} delay={0.15}>
              <div className="premium-paywall-card">
                {submitted ? (
                  <div className="py-16 px-8 text-center">
                    <div className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-12 h-12 text-green-500" />
                    </div>
                    <h3 className="font-heading text-3xl font-bold text-[#1A2332] mb-3">Premium Access Unlocked!</h3>
                    <p className="font-body text-gray-500 mb-4 text-lg font-light">
                      Welcome aboard! You now have full access to all exclusive listings, pricing, brochures, and priority viewings.
                    </p>
                    <p className="font-body text-sm text-gray-400">
                      A property consultant will contact you within 24 hours with personalized recommendations.
                    </p>
                  </div>
                ) : (
                  <div className="p-8 sm:p-10">
                    {/* Form Header */}
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 rounded-xl bg-[#0D1B2A] flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-[#C8A45C]" />
                      </div>
                      <div>
                        <h3 className="font-heading text-2xl font-bold text-[#1A2332]">Register for Free Access</h3>
                        <p className="font-body text-sm text-gray-400 mt-0.5">No credit card required &middot; Instant access</p>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      {/* Honeypot - hidden from real users */}
                      <div className="absolute opacity-0 h-0 w-0 overflow-hidden" aria-hidden="true">
                        <Label htmlFor="pw-website">Website</Label>
                        <Input
                          id="pw-website"
                          tabIndex={-1}
                          autoComplete="off"
                          value={formData.honeypot}
                          onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                        />
                      </div>

                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <Label htmlFor="pw-name" className="font-body text-xs font-semibold text-[#1A2332]/70 uppercase tracking-wider mb-2 block">Full Name *</Label>
                          <Input
                            id="pw-name"
                            placeholder="Your full name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            className="premium-paywall-input"
                          />
                        </div>
                        <div>
                          <Label htmlFor="pw-phone" className="font-body text-xs font-semibold text-[#1A2332]/70 uppercase tracking-wider mb-2 block">Phone / WhatsApp *</Label>
                          <Input
                            id="pw-phone"
                            type="tel"
                            placeholder="+971 XX XXX XXXX"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            required
                            className="premium-paywall-input"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="pw-email" className="font-body text-xs font-semibold text-[#1A2332]/70 uppercase tracking-wider mb-2 block">Email Address *</Label>
                        <Input
                          id="pw-email"
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                          className="premium-paywall-input"
                        />
                      </div>
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <Label htmlFor="pw-budget" className="font-body text-xs font-semibold text-[#1A2332]/70 uppercase tracking-wider mb-2 block">Budget Range *</Label>
                          <Select value={formData.budget} onValueChange={(v) => setFormData({ ...formData, budget: v })} required>
                            <SelectTrigger className="premium-paywall-input mt-0">
                              <SelectValue placeholder="Select budget" />
                            </SelectTrigger>
                            <SelectContent>
                              {budgetOptions.map((opt) => (
                                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="pw-timeline" className="font-body text-xs font-semibold text-[#1A2332]/70 uppercase tracking-wider mb-2 block">Purchase Timeline *</Label>
                          <Select value={formData.timeline} onValueChange={(v) => setFormData({ ...formData, timeline: v })} required>
                            <SelectTrigger className="premium-paywall-input mt-0">
                              <SelectValue placeholder="When are you buying?" />
                            </SelectTrigger>
                            <SelectContent>
                              {timelineOptions.map((opt) => (
                                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <Label htmlFor="pw-nationality" className="font-body text-xs font-semibold text-[#1A2332]/70 uppercase tracking-wider mb-2 block">Nationality</Label>
                          <Input
                            id="pw-nationality"
                            placeholder="e.g. Emirati, British, Indian"
                            value={formData.nationality}
                            onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                            className="premium-paywall-input"
                          />
                        </div>
                        <div>
                          <Label htmlFor="pw-interest" className="font-body text-xs font-semibold text-[#1A2332]/70 uppercase tracking-wider mb-2 block">Property Interest</Label>
                          <Select value={formData.propertyInterest} onValueChange={(v) => setFormData({ ...formData, propertyInterest: v })}>
                            <SelectTrigger className="premium-paywall-input mt-0">
                              <SelectValue placeholder="Select property type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="villa">Villa</SelectItem>
                              <SelectItem value="mansion">Mansion</SelectItem>
                              <SelectItem value="townhouse">Townhouse</SelectItem>
                              <SelectItem value="apartment">Apartment</SelectItem>
                              <SelectItem value="penthouse">Penthouse</SelectItem>
                              <SelectItem value="general">General Interest</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        disabled={loading || !formData.budget || !formData.timeline}
                        className="w-full btn-gold-glow text-[#0D1B2A] font-bold py-5 rounded-xl text-base tracking-wide mt-2"
                      >
                        {loading ? (
                          "Processing..."
                        ) : (
                          <>
                            <Lock className="w-4 h-4 mr-2" />
                            Unlock Premium Access
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </>
                        )}
                      </Button>
                      <p className="text-xs text-gray-400 text-center mt-3 flex items-center justify-center gap-1.5">
                        <Shield className="w-3.5 h-3.5" />
                        Your information is encrypted and secure. We never share your data.
                      </p>
                    </form>
                  </div>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
