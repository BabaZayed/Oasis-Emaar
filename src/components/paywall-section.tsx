"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Lock, CheckCircle, Crown, Eye, Download, Star, Shield, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  { value: "3m-5m", label: "AED 3M - 5M" },
  { value: "5m-10m", label: "AED 5M - 10M" },
  { value: "10m-20m", label: "AED 10M - 20M" },
  { value: "20m+", label: "AED 20M+" },
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

    // Honeypot check
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
      <section id="premium-access" className="py-20 sm:py-28 bg-gradient-to-br from-[#1A2332] via-[#2A3A52] to-[#1A2332] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 rounded-full gold-gradient flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-[#1A2332]" />
          </div>
          <span className="text-sm font-semibold tracking-[0.2em] uppercase text-[#C8A45C]">
            Premium Member
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-6">
            Your Premium Access Is Active
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto mb-8 text-lg">
            You have full access to all premium listings, downloadable brochures, and priority viewing requests. Our dedicated property consultant will be in touch with you shortly.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <Eye className="w-6 h-6 text-[#C8A45C] mx-auto mb-2" />
              <p className="text-sm font-semibold">All Listings</p>
              <p className="text-xs text-white/50 mt-1">Premium & standard</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <Download className="w-6 h-6 text-[#C8A45C] mx-auto mb-2" />
              <p className="text-sm font-semibold">Brochures</p>
              <p className="text-xs text-white/50 mt-1">Floor plans & specs</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <Crown className="w-6 h-6 text-[#C8A45C] mx-auto mb-2" />
              <p className="text-sm font-semibold">Priority</p>
              <p className="text-xs text-white/50 mt-1">First viewings access</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="premium-access" className="py-20 sm:py-28 bg-gradient-to-br from-[#1A2332] via-[#2A3A52] to-[#1A2332] text-white relative overflow-hidden">
      {/* Decorative lock icon background */}
      <div className="absolute inset-0 opacity-5">
        <Lock className="w-96 h-96 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <div className="w-16 h-16 rounded-full gold-gradient flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-[#1A2332]" />
          </div>
          <span className="text-sm font-semibold tracking-[0.2em] uppercase text-[#C8A45C]">
            Exclusive Access Required
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-4">
            Unlock Premium Listings & Pricing
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            Property prices, exclusive floor plans, and premium inventory are available to registered members only. Complete the form to get instant access.
          </p>
          <div className="section-divider max-w-xs mx-auto mt-6" />
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Benefits */}
          <div>
            <h3 className="text-xl font-bold text-[#C8A45C] mb-6">What You Get With Premium Access</h3>
            <div className="space-y-5">
              {premiumBenefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="flex items-start gap-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:bg-white/10 hover:border-[#C8A45C]/30 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-lg gold-gradient flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <benefit.icon className="w-5 h-5 text-[#1A2332]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">{benefit.title}</h4>
                    <p className="text-white/50 text-sm leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Urgency / Scarcity */}
            <div className="mt-6 bg-[#C8A45C]/10 border border-[#C8A45C]/30 rounded-xl p-4 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-[#C8A45C] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-[#C8A45C]">Limited Availability</p>
                <p className="text-xs text-white/50 mt-1">Over 60% of premium listings already reserved. Register now to secure your preferred unit before prices increase.</p>
              </div>
            </div>
          </div>

          {/* Registration Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 text-[#1A2332]">
            {submitted ? (
              <div className="py-12 text-center">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-[#1A2332] mb-3">Premium Access Unlocked!</h3>
                <p className="text-gray-500 mb-4">
                  Welcome aboard! You now have full access to all exclusive listings, pricing, brochures, and priority viewings.
                </p>
                <p className="text-sm text-gray-400">
                  A property consultant will contact you within 24 hours with personalized recommendations.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg gold-gradient flex items-center justify-center">
                    <Crown className="w-5 h-5 text-[#1A2332]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Register for Free Access</h3>
                    <p className="text-sm text-gray-500">No credit card required • Instant access</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
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

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="pw-name">Full Name *</Label>
                      <Input
                        id="pw-name"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="pw-phone">Phone / WhatsApp *</Label>
                      <Input
                        id="pw-phone"
                        type="tel"
                        placeholder="+971 XX XXX XXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="pw-email">Email Address *</Label>
                    <Input
                      id="pw-email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="pw-budget">Budget Range *</Label>
                      <Select value={formData.budget} onValueChange={(v) => setFormData({ ...formData, budget: v })} required>
                        <SelectTrigger className="mt-1">
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
                      <Label htmlFor="pw-timeline">Purchase Timeline *</Label>
                      <Select value={formData.timeline} onValueChange={(v) => setFormData({ ...formData, timeline: v })} required>
                        <SelectTrigger className="mt-1">
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
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="pw-nationality">Nationality</Label>
                      <Input
                        id="pw-nationality"
                        placeholder="e.g. Emirati, British, Indian"
                        value={formData.nationality}
                        onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="pw-interest">Property Interest</Label>
                      <Select value={formData.propertyInterest} onValueChange={(v) => setFormData({ ...formData, propertyInterest: v })}>
                        <SelectTrigger className="mt-1">
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
                    className="w-full gold-gradient text-[#1A2332] font-bold py-4 rounded-md hover:opacity-90 text-base"
                  >
                    {loading ? "Processing..." : <><Lock className="w-4 h-4 mr-2" /> Unlock Premium Access</>}
                  </Button>
                  <p className="text-xs text-gray-400 text-center">
                    🔒 Your information is encrypted and secure. We never share your data with third parties.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
