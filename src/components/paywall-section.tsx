"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, CheckCircle, Crown, Eye, Download, Star, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function checkRegistered(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("oasis_registered") === "true";
}

const premiumBenefits = [
  {
    icon: Eye,
    title: "Exclusive Listings",
    description: "Unlock premium waterfront properties, mansion estates, and penthouse collections not visible to the public.",
  },
  {
    icon: Download,
    title: "Download Brochures",
    description: "Access detailed floor plans, payment schedules, and comprehensive project brochures in high resolution.",
  },
  {
    icon: Crown,
    title: "Priority Viewings",
    description: "Be the first to schedule private viewings for new launches and off-plan releases before they sell out.",
  },
  {
    icon: Star,
    title: "Insider Pricing",
    description: "Get early-bird pricing and exclusive pre-launch rates available only to registered members.",
  },
  {
    icon: Shield,
    title: "Dedicated Consultant",
    description: "A personal property consultant will guide you through the entire buying process from start to finish.",
  },
];

export default function PaywallSection() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", budget: "" });
  const [submitted, setSubmitted] = useState(false);
  const [isRegistered, setIsRegistered] = useState(checkRegistered);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("oasis_registered", "true");
    setSubmitted(true);
    toast({
      title: "Premium Access Unlocked!",
      description: "You now have access to all exclusive listings, brochures, and priority viewings.",
    });
    setTimeout(() => {
      setIsRegistered(true);
    }, 2000);
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
    <section id="premium-access" className="py-20 sm:py-28 bg-gradient-to-br from-[#1A2332] via-[#2A3A52] to-[#1A2332] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <div className="w-16 h-16 rounded-full gold-gradient flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-[#1A2332]" />
          </div>
          <span className="text-sm font-semibold tracking-[0.2em] uppercase text-[#C8A45C]">
            Exclusive Access
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-4">
            Unlock Premium Listings
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            Register to access exclusive waterfront properties, detailed floor plans, pricing, and priority viewing appointments at The Oasis by Emaar.
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
                  Welcome aboard! You now have full access to all exclusive listings, brochures, and priority viewings.
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
                    <h3 className="text-xl font-bold">Register for Free</h3>
                    <p className="text-sm text-gray-500">No credit card required</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="reg-name">Full Name</Label>
                    <Input
                      id="reg-name"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="reg-email">Email Address</Label>
                    <Input
                      id="reg-email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="reg-phone">Phone Number</Label>
                    <Input
                      id="reg-phone"
                      type="tel"
                      placeholder="+971 XX XXX XXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="reg-budget">Budget Range</Label>
                    <Input
                      id="reg-budget"
                      placeholder="e.g. AED 5M - 15M"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full gold-gradient text-[#1A2332] font-bold py-6 rounded-md hover:opacity-90 text-base"
                  >
                    <Lock className="w-4 h-4 mr-2" /> Unlock Premium Access
                  </Button>
                  <p className="text-xs text-gray-400 text-center">
                    By registering, you agree to receive communications about The Oasis properties. We respect your privacy and never share your data.
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
