"use client";

import { useState } from "react";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import WhatsAppButton from "@/components/whatsapp-button";
import { projects } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, Bed, Maximize, DollarSign, Phone, Mail, User, Shield, CheckCircle, ArrowRight, Home, Users, Star, Eye, BadgeCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

const propertyTypes = [
  { value: "villa", label: "Villa" },
  { value: "mansion", label: "Mansion" },
  { value: "townhouse", label: "Townhouse" },
  { value: "apartment", label: "Apartment" },
  { value: "penthouse", label: "Penthouse" },
  { value: "branded-villa", label: "Branded Villa" },
];

export default function SellPage() {
  const [formData, setFormData] = useState({
    propertyType: "",
    villaNumber: "",
    cluster: "",
    bedrooms: "",
    areaSqft: "",
    price: "",
    name: "",
    email: "",
    phone: "",
    whatsapp: "",
    description: "",
    honeypot: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.honeypot) return;

    if (!formData.propertyType) {
      toast({ title: "Missing Field", description: "Please select a property type.", variant: "destructive" });
      return;
    }
    if (!formData.cluster) {
      toast({ title: "Missing Field", description: "Please select a cluster/project.", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/marketplace", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          propertyType: formData.propertyType,
          villaNumber: formData.villaNumber,
          cluster: formData.cluster,
          bedrooms: parseInt(formData.bedrooms) || 0,
          areaSqft: parseInt(formData.areaSqft) || 0,
          price: parseInt(formData.price) || 0,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          whatsapp: formData.whatsapp || undefined,
          description: formData.description || undefined,
          honeypot: formData.honeypot,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
        toast({
          title: "Listing Submitted!",
          description: "Your listing has been submitted for verification.",
        });
      } else if (res.status === 429) {
        toast({ title: "Too Many Attempts", description: "Please wait before submitting again.", variant: "destructive" });
      } else {
        toast({ title: "Error", description: data.error || "Something went wrong.", variant: "destructive" });
      }
    } catch {
      toast({ title: "Error", description: "Please try again or contact us on WhatsApp.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-28 pb-16 sm:pt-36 sm:pb-20 bg-[#1A2332] relative overflow-hidden">
          <div className="absolute inset-0 hero-overlay" />
          <div className="absolute top-20 right-10 w-72 h-72 bg-[#C8A45C]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-56 h-56 bg-[#C8A45C]/5 rounded-full blur-3xl" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <span className="font-body text-sm font-semibold tracking-[0.2em] uppercase text-[#C8A45C]">
                Seller Marketplace
              </span>
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white mt-4 mb-6">
                List Your Property
              </h1>
              <p className="font-body text-white/60 text-lg max-w-2xl mx-auto">
                Reach thousands of potential buyers looking for properties at The Oasis by Emaar
              </p>
              <div className="section-divider max-w-xs mx-auto mt-8" />
            </div>
          </div>
        </section>

        {/* Why List With Us */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="font-body text-sm font-semibold tracking-[0.2em] uppercase text-[#C8A45C]">
                Sell With Confidence
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1A2332] mt-3 mb-4">
                Why List With Us?
              </h2>
              <div className="section-divider max-w-xs mx-auto mt-6" />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {[
                { icon: Users, title: "Reach Thousands of Buyers", desc: "Your property is showcased to our verified network of investors and homebuyers actively seeking Oasis properties." },
                { icon: Star, title: "Free Listing, No Hidden Fees", desc: "List your property completely free with zero commissions or hidden charges. You only deal directly with buyers." },
                { icon: BadgeCheck, title: "Professional Verification", desc: "Our team verifies every listing, building trust and credibility that attracts serious, qualified buyers." },
                { icon: Eye, title: "Featured Placement", desc: "Premium properties get featured placement on our homepage and marketing campaigns for maximum visibility." },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-[#F5F0E8] rounded-xl p-6 hover:shadow-md transition-all duration-300 group border border-transparent hover:border-[#C8A45C]/20 text-center"
                >
                  <div className="w-12 h-12 rounded-lg bg-[#1A2332] flex items-center justify-center mx-auto mb-4 group-hover:bg-[#C8A45C] transition-colors duration-300">
                    <item.icon className="w-5 h-5 text-[#C8A45C] group-hover:text-[#1A2332] transition-colors duration-300" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-[#1A2332] mb-2">{item.title}</h3>
                  <p className="font-body text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 py-6">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Shield className="w-5 h-5 text-[#C8A45C]" />
                <span>Verified Listings</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Users className="w-5 h-5 text-[#C8A45C]" />
                <span>7,000+ Community</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <CheckCircle className="w-5 h-5 text-[#C8A45C]" />
                <span>24hr Verification</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Eye className="w-5 h-5 text-[#C8A45C]" />
                <span>10,000+ Monthly Visitors</span>
              </div>
            </div>

            {/* Cross-link to marketplace */}
            <div className="mt-8 bg-[#1A2332] rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left">
              <div className="w-14 h-14 rounded-full bg-[#C8A45C]/20 flex items-center justify-center flex-shrink-0">
                <Building2 className="w-7 h-7 text-[#C8A45C]" />
              </div>
              <div className="flex-1">
                <h3 className="font-heading text-xl font-bold text-white mb-1">Looking to buy instead?</h3>
                <p className="font-body text-white/60 text-sm sm:text-base">Browse verified resale properties listed by current owners at The Oasis by Emaar.</p>
              </div>
              <Link href="/marketplace">
                <Button className="gold-gradient text-[#1A2332] font-bold px-6 py-3 rounded-md hover:opacity-90 flex-shrink-0">
                  Browse Marketplace <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-16 sm:py-24 bg-[#F5F0E8]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            {submitted ? (
              <Card className="border-0 shadow-2xl rounded-2xl">
                <CardContent className="p-8 sm:p-12 text-center">
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </div>
                  <h2 className="font-heading text-3xl font-bold text-[#1A2332] mb-4">
                    Your listing has been submitted for verification
                  </h2>
                  <p className="font-body text-gray-500 text-lg mb-6">
                    Our team will review your listing and contact you within 24 hours to verify the details before publishing it to the marketplace.
                  </p>
                  <div className="bg-[#F5F0E8] rounded-xl p-5 mb-8 max-w-md mx-auto">
                    <div className="flex items-center gap-3 mb-3">
                      <Shield className="w-5 h-5 text-[#C8A45C]" />
                      <span className="font-semibold text-[#1A2332] text-sm">What happens next?</span>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-600 text-left">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Our team will verify your property details</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>You will be contacted within 24 hours</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Once verified, your listing goes live on the marketplace</span>
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          propertyType: "",
                          villaNumber: "",
                          cluster: "",
                          bedrooms: "",
                          areaSqft: "",
                          price: "",
                          name: "",
                          email: "",
                          phone: "",
                          whatsapp: "",
                          description: "",
                          honeypot: "",
                        });
                      }}
                      className="gold-gradient text-[#1A2332] font-bold px-6 py-3 rounded-md hover:opacity-90"
                    >
                      List Another Property
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="border-[#1A2332] text-[#1A2332] hover:bg-[#1A2332] hover:text-white px-6 py-3 rounded-md"
                    >
                      <a href="/marketplace">
                        Browse Marketplace <ArrowRight className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-0 shadow-2xl rounded-2xl">
                <CardContent className="p-6 sm:p-10">
                  <div className="mb-8">
                    <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#1A2332] mb-2">
                      Property Details
                    </h2>
                    <p className="font-body text-gray-500">
                      Fill in the details below to list your property on our resale marketplace. Fields marked with * are required.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Honeypot - hidden from real users */}
                    <div className="absolute opacity-0 h-0 w-0 overflow-hidden" aria-hidden="true">
                      <Label htmlFor="sell-website">Website</Label>
                      <Input
                        id="sell-website"
                        tabIndex={-1}
                        autoComplete="off"
                        value={formData.honeypot}
                        onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                      />
                    </div>

                    {/* Property Information */}
                    <div>
                      <div className="flex items-center gap-2 mb-5">
                        <Home className="w-5 h-5 text-[#C8A45C]" />
                        <h3 className="font-heading text-lg font-bold text-[#1A2332]">Property Information</h3>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <Label htmlFor="propertyType">Property Type *</Label>
                          <Select value={formData.propertyType} onValueChange={(v) => setFormData({ ...formData, propertyType: v })}>
                            <SelectTrigger className="mt-1.5">
                              <SelectValue placeholder="Select property type" />
                            </SelectTrigger>
                            <SelectContent>
                              {propertyTypes.map((pt) => (
                                <SelectItem key={pt.value} value={pt.value}>{pt.label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="villaNumber">Villa / Unit Number *</Label>
                          <Input
                            id="villaNumber"
                            placeholder='e.g. "V-102", "M-45"'
                            value={formData.villaNumber}
                            onChange={(e) => setFormData({ ...formData, villaNumber: e.target.value })}
                            required
                            className="mt-1.5"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cluster">Cluster / Project *</Label>
                          <Select value={formData.cluster} onValueChange={(v) => setFormData({ ...formData, cluster: v })}>
                            <SelectTrigger className="mt-1.5">
                              <SelectValue placeholder="Select cluster" />
                            </SelectTrigger>
                            <SelectContent>
                              {projects.map((project) => (
                                <SelectItem key={project.id} value={project.id}>{project.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="bedrooms">Bedrooms *</Label>
                          <Input
                            id="bedrooms"
                            type="number"
                            min={1}
                            max={20}
                            placeholder="e.g. 4"
                            value={formData.bedrooms}
                            onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                            required
                            className="mt-1.5"
                          />
                        </div>
                        <div>
                          <Label htmlFor="areaSqft">Built-up Area (sqft) *</Label>
                          <Input
                            id="areaSqft"
                            type="number"
                            min={100}
                            placeholder="e.g. 8279"
                            value={formData.areaSqft}
                            onChange={(e) => setFormData({ ...formData, areaSqft: e.target.value })}
                            required
                            className="mt-1.5"
                          />
                        </div>
                        <div>
                          <Label htmlFor="price">Asking Price (AED) *</Label>
                          <Input
                            id="price"
                            type="number"
                            min={100000}
                            placeholder="e.g. 15000000"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            required
                            className="mt-1.5"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Seller Information */}
                    <div>
                      <div className="flex items-center gap-2 mb-5">
                        <User className="w-5 h-5 text-[#C8A45C]" />
                        <h3 className="font-heading text-lg font-bold text-[#1A2332]">Seller Information</h3>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <Label htmlFor="sellerName">Full Name *</Label>
                          <Input
                            id="sellerName"
                            placeholder="Your full name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            className="mt-1.5"
                          />
                        </div>
                        <div>
                          <Label htmlFor="sellerEmail">Email Address *</Label>
                          <Input
                            id="sellerEmail"
                            type="email"
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            className="mt-1.5"
                          />
                        </div>
                        <div>
                          <Label htmlFor="sellerPhone">Phone / WhatsApp *</Label>
                          <Input
                            id="sellerPhone"
                            type="tel"
                            placeholder="+971 XX XXX XXXX"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            required
                            className="mt-1.5"
                          />
                        </div>
                        <div>
                          <Label htmlFor="sellerWhatsapp">WhatsApp Number (if different)</Label>
                          <Input
                            id="sellerWhatsapp"
                            type="tel"
                            placeholder="+971 XX XXX XXXX"
                            value={formData.whatsapp}
                            onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                            className="mt-1.5"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <div className="flex items-center gap-2 mb-5">
                        <Building2 className="w-5 h-5 text-[#C8A45C]" />
                        <h3 className="font-heading text-lg font-bold text-[#1A2332]">Property Description</h3>
                      </div>
                      <div>
                        <Label htmlFor="description">Description (optional)</Label>
                        <Textarea
                          id="description"
                          placeholder="Describe your property — features, upgrades, view, furnishings, etc."
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          rows={4}
                          maxLength={2000}
                          className="mt-1.5"
                        />
                        <p className="text-xs text-gray-400 mt-1">{formData.description.length}/2000 characters</p>
                      </div>
                    </div>

                    {/* Submit */}
                    <div className="pt-2">
                      <Button
                        type="submit"
                        disabled={loading}
                        size="lg"
                        className="w-full gold-gradient text-[#1A2332] font-bold py-6 rounded-md hover:opacity-90 text-base"
                      >
                        {loading ? "Submitting..." : "Submit Listing for Verification"}
                      </Button>
                      <div className="mt-5 bg-[#1A2332]/5 rounded-xl p-4">
                        <div className="flex items-start gap-3">
                          <Shield className="w-5 h-5 text-[#C8A45C] flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-gray-600">
                            All listings are verified before publishing to ensure authenticity. Our team will contact you within 24 hours.
                          </p>
                        </div>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
      <WhatsAppButton />
    </div>
  );
}
