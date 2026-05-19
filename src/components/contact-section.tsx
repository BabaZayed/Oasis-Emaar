"use client";

import { useState } from "react";
import { PHONE_NUMBER, EMAIL, ADDRESS, WHATSAPP_LINK } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Mail, MapPin, MessageCircle, Clock, Send, Shield, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { trackLead, trackContact } from "@/lib/meta-pixel";

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

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", message: "", interest: "", budget: "", timeline: "", honeypot: "",
  });
  const [submitted, setSubmitted] = useState(false);
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
          propertyInterest: formData.interest,
          message: formData.message,
          formType: "contact",
          pageUrl: window.location.href,
          honeypot: formData.honeypot,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setSubmitted(true);

        // Meta Pixel tracking
        trackLead({
          formType: "contact",
          propertyInterest: formData.interest || undefined,
          budget: formData.budget || undefined,
        });
        trackContact({
          propertyInterest: formData.interest || undefined,
          budget: formData.budget || undefined,
        });

        toast({
          title: "Message Sent!",
          description: data.qualified
            ? "A senior consultant will contact you within 2 hours."
            : "Our team will contact you within 24 hours.",
        });
        setTimeout(() => {
          setSubmitted(false);
          setFormData({ name: "", email: "", phone: "", message: "", interest: "", budget: "", timeline: "", honeypot: "" });
        }, 5000);
      } else if (res.status === 429) {
        toast({ title: "Too Many Attempts", description: "Please wait before submitting again.", variant: "destructive" });
      } else {
        toast({ title: "Already Registered", description: data.message || "We have your details." });
      }
    } catch {
      toast({ title: "Error", description: "Please try again or contact us on WhatsApp.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    { icon: Phone, label: "Phone", value: PHONE_NUMBER, href: `tel:${PHONE_NUMBER.replace(/\s/g, "")}` },
    { icon: Mail, label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
    { icon: MapPin, label: "Address", value: ADDRESS, href: "#" },
    { icon: MessageCircle, label: "WhatsApp", value: "Chat with us", href: WHATSAPP_LINK },
  ];

  return (
    <section id="contact" className="py-20 sm:py-28 bg-[#F5F0E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <span className="font-body text-sm font-semibold tracking-[0.2em] uppercase text-[#C8A45C]">
            Get in Touch
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A2332] mt-3 mb-4">
            Contact Us
          </h2>
          <p className="font-body text-gray-500 max-w-2xl mx-auto">
            Ready to explore The Oasis? Fill in your details and our property consultants will reach out with personalized recommendations.
          </p>
          <div className="section-divider max-w-xs mx-auto mt-6" />
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#1A2332] rounded-xl p-6 sm:p-8 text-white">
              <h3 className="font-heading text-xl font-bold text-[#C8A45C] mb-6">Contact Information</h3>
              <div className="space-y-5">
                {contactInfo.map((info) => (
                  <a
                    key={info.label}
                    href={info.href}
                    target={info.href.startsWith("http") ? "_blank" : undefined}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#C8A45C]/20 transition-colors">
                      <info.icon className="w-5 h-5 text-[#C8A45C]" />
                    </div>
                    <div>
                      <p className="font-body text-xs text-white/50 uppercase tracking-wider">{info.label}</p>
                      <p className="text-white group-hover:text-[#C8A45C] transition-colors">{info.value}</p>
                    </div>
                  </a>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-[#C8A45C]" />
                  <span className="text-sm font-semibold">Office Hours</span>
                </div>
                <p className="text-sm text-white/60">Sunday - Thursday: 9:00 AM - 6:00 PM</p>
                <p className="text-sm text-white/60">Friday: 2:00 PM - 6:00 PM</p>
                <p className="text-sm text-white/60">Saturday: 10:00 AM - 4:00 PM</p>
              </div>
            </div>

            {/* Security Badge */}
            <div className="bg-white rounded-xl p-5 border border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="w-5 h-5 text-green-600" />
                <h4 className="font-bold text-[#1A2332] text-sm">Your Data Is Secure</h4>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                  <span>SSL encrypted connection</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                  <span>Data never shared with third parties</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                  <span>RERA licensed & regulated</span>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="bg-gradient-to-br from-[#2A3A52] to-[#1A2332] rounded-xl h-48 flex items-center justify-center">
              <div className="text-center text-white/40">
                <MapPin className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm">Interactive Map</p>
                <p className="text-xs">Al Quoz Street 21, Dubai</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-md p-6 sm:p-8">
              <h3 className="font-heading text-xl font-bold text-[#1A2332] mb-6">Send Us a Message</h3>

              {submitted ? (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-green-500" />
                  </div>
                  <h4 className="font-heading text-xl font-bold text-[#1A2332] mb-2">Message Sent!</h4>
                  <p className="text-gray-500">Our property consultant will contact you shortly with personalized options.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Honeypot - hidden from real users */}
                  <div className="absolute opacity-0 h-0 w-0 overflow-hidden" aria-hidden="true">
                    <Label htmlFor="contact-website">Website</Label>
                    <Input
                      id="contact-website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.honeypot}
                      onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contact-name">Full Name *</Label>
                      <Input
                        id="contact-name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact-phone">Phone / WhatsApp *</Label>
                      <Input
                        id="contact-phone"
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
                    <Label htmlFor="contact-email">Email Address *</Label>
                    <Input
                      id="contact-email"
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
                      <Label htmlFor="contact-interest">Property Interest</Label>
                      <Select value={formData.interest} onValueChange={(v) => setFormData({ ...formData, interest: v })}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select a project" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="oasis-villas">The Oasis Villas</SelectItem>
                          <SelectItem value="oasis-mansions">The Oasis Mansions</SelectItem>
                          <SelectItem value="oasis-creek">Oasis Creek Townhouses</SelectItem>
                          <SelectItem value="oasis-lagoon">Oasis Lagoon Residences</SelectItem>
                          <SelectItem value="oasis-heights">Oasis Heights Penthouses</SelectItem>
                          <SelectItem value="general">General Inquiry</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="contact-budget">Budget Range</Label>
                      <Select value={formData.budget} onValueChange={(v) => setFormData({ ...formData, budget: v })}>
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
                  </div>
                  <div>
                    <Label htmlFor="contact-timeline">Purchase Timeline</Label>
                    <Select value={formData.timeline} onValueChange={(v) => setFormData({ ...formData, timeline: v })}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="When are you planning to buy?" />
                      </SelectTrigger>
                      <SelectContent>
                        {timelineOptions.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="contact-message">Message</Label>
                    <Textarea
                      id="contact-message"
                      placeholder="Tell us about your requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={3}
                      className="mt-1"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={loading}
                    size="lg"
                    className="w-full gold-gradient text-[#1A2332] font-bold py-6 rounded-md hover:opacity-90"
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                  <p className="text-xs text-gray-400 text-center flex items-center justify-center gap-1">
                    <Shield className="w-3 h-3" /> Your information is secure and encrypted
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
