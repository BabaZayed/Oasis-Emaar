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
import { useDict } from "@/lib/use-dict";

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

export default function ContactSection({ lang }: { lang?: import("@/lib/i18n").LangCode }) {
  const t = useDict();
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
          title: t.common.messageSent,
          description: data.qualified
            ? t.common.consultantWillContact
            : t.common.teamWillContact,
        });
        setTimeout(() => {
          setSubmitted(false);
          setFormData({ name: "", email: "", phone: "", message: "", interest: "", budget: "", timeline: "", honeypot: "" });
        }, 5000);
      } else if (res.status === 429) {
        toast({ title: t.common.tooManyAttempts, description: t.common.pleaseWait, variant: "destructive" });
      } else {
        toast({ title: t.common.alreadyRegistered, description: data.message || t.common.weHaveYourDetails });
      }
    } catch {
      toast({ title: t.common.error, description: t.common.pleaseTryAgainOrWhatsApp, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    { icon: Phone, label: t.contact.phone, value: PHONE_NUMBER, href: `tel:${PHONE_NUMBER.replace(/\s/g, "")}` },
    { icon: Mail, label: t.contact.email, value: EMAIL, href: `mailto:${EMAIL}` },
    { icon: MapPin, label: t.contact.address, value: ADDRESS, href: "https://www.google.com/maps/place/Al+Quoz+St+-+Dubai/@25.1412,55.2252,15z" },
    { icon: MessageCircle, label: t.contact.whatsapp, value: t.common.chatWithUs, href: WHATSAPP_LINK },
  ];

  return (
    <section id="contact" className="py-24 sm:py-32 bg-[#F5F0E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 sm:mb-20">
          <span className="font-body text-sm font-semibold tracking-[0.2em] uppercase text-[#C8A45C]">
            {t.contact.label}
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A2332] mt-3 mb-4">
            {t.contact.title}
          </h1>
          <p className="font-body text-gray-500 max-w-2xl mx-auto font-light">
            {t.contact.subtitle}
          </p>
          <div className="luxury-divider mt-8">
            <span className="diamond" />
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-14">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#1A2332] rounded-2xl p-7 sm:p-9 text-white relative overflow-hidden">
              {/* Subtle gold accent line at top */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C8A45C] to-transparent" />
              
              <h3 className="font-heading text-xl font-bold text-[#C8A45C] mb-7">{t.contact.contactInfo}</h3>
              <div className="space-y-6">
                {contactInfo.map((info) => (
                  <a
                    key={info.label}
                    href={info.href}
                    target={info.href.startsWith("http") ? "_blank" : undefined}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center flex-shrink-0 group-hover:bg-[#C8A45C]/15 group-hover:border-[#C8A45C]/20 transition-all duration-300">
                      <info.icon className="w-5 h-5 text-[#C8A45C]" />
                    </div>
                    <div>
                      <p className="font-body text-[10px] text-white/55 uppercase tracking-[0.2em] mb-0.5">{info.label}</p>
                      <p className="text-white/90 group-hover:text-[#C8A45C] transition-colors duration-300">{info.value}</p>
                    </div>
                  </a>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4 text-[#C8A45C]" />
                  <span className="text-sm font-semibold tracking-wide">{t.contact.officeHours}</span>
                </div>
                <p className="text-sm text-white/50 font-light">{t.contact.hoursWeekday}</p>
                <p className="text-sm text-white/50 font-light">{t.contact.hoursFriday}</p>
                <p className="text-sm text-white/50 font-light">{t.contact.hoursSaturday}</p>
              </div>
            </div>

            {/* Security Badge */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-5 h-5 text-green-600" />
                <h4 className="font-bold text-[#1A2332] text-sm">{t.common.dataSecure}</h4>
              </div>
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                  <span>{t.common.sslEncrypted}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                  <span>{t.common.dataNeverShared}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                  <span>{t.common.reraLicensed}</span>
                </div>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="rounded-2xl overflow-hidden h-48 border border-gray-200/80 shadow-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3612.7!2d55.2252!3d25.1412!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDA4JzI4LjMiTiA1NcKwMTMnMzAuNyJF!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Oasis Emaar Office Location — Al Quoz Street 21, Dubai"
              />
            </div>
          </div>

          {/* Contact Form - Premium styling */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg shadow-black/[0.04] p-8 sm:p-10 border border-gray-100">
              <h3 className="font-heading text-xl font-bold text-[#1A2332] mb-8">{t.contact.formTitle}</h3>

              {submitted ? (
                <div className="py-16 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-green-500" />
                  </div>
                  <h4 className="font-heading text-xl font-bold text-[#1A2332] mb-2">{t.common.messageSent}</h4>
                  <p className="text-gray-500 font-light">{t.contact.successMessage}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
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

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <Label htmlFor="contact-name" className="text-[#1A2332] text-sm font-medium mb-2 block tracking-wide">{t.common.fullName} *</Label>
                      <Input
                        id="contact-name"
                        placeholder={t.common.yourName}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="premium-input mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact-phone" className="text-[#1A2332] text-sm font-medium mb-2 block tracking-wide">{t.common.phoneWhatsApp} *</Label>
                      <Input
                        id="contact-phone"
                        type="tel"
                        placeholder="+971 XX XXX XXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                        className="premium-input mt-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="contact-email" className="text-[#1A2332] text-sm font-medium mb-2 block tracking-wide">Email Address *</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="premium-input mt-1"
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <Label htmlFor="contact-interest" className="text-[#1A2332] text-sm font-medium mb-2 block tracking-wide">Property Interest</Label>
                      <Select value={formData.interest} onValueChange={(v) => setFormData({ ...formData, interest: v })}>
                        <SelectTrigger className="premium-input mt-1">
                          <SelectValue placeholder="Select a project" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="palmiera-3">Palmiera 3</SelectItem>
                          <SelectItem value="palmiera">Palmiera</SelectItem>
                          <SelectItem value="palmiera-collective">Palmiera Collective</SelectItem>
                          <SelectItem value="mareva">Mareva</SelectItem>
                          <SelectItem value="mareva-2">Mareva 2</SelectItem>
                          <SelectItem value="mirage">Mirage</SelectItem>
                          <SelectItem value="address-villas-tierra">Address Villas Tierra</SelectItem>
                          <SelectItem value="palace-villas-ostra">Palace Villas Ostra</SelectItem>
                          <SelectItem value="lavita">Lavita</SelectItem>
                          <SelectItem value="general">General Inquiry</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="contact-budget" className="text-[#1A2332] text-sm font-medium mb-2 block tracking-wide">Budget Range</Label>
                      <Select value={formData.budget} onValueChange={(v) => setFormData({ ...formData, budget: v })}>
                        <SelectTrigger className="premium-input mt-1">
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
                    <Label htmlFor="contact-timeline" className="text-[#1A2332] text-sm font-medium mb-2 block tracking-wide">Purchase Timeline</Label>
                    <Select value={formData.timeline} onValueChange={(v) => setFormData({ ...formData, timeline: v })}>
                      <SelectTrigger className="premium-input mt-1">
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
                    <Label htmlFor="contact-message" className="text-[#1A2332] text-sm font-medium mb-2 block tracking-wide">Message</Label>
                    <Textarea
                      id="contact-message"
                      placeholder="Tell us about your requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={4}
                      className="premium-input mt-1 min-h-[120px]"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={loading}
                    size="lg"
                    className="w-full btn-gold-glow text-[#1A2332] font-bold py-7 rounded-lg text-base tracking-wide"
                  >
                    {loading ? t.common.sending : t.common.sendMessage}
                  </Button>
                  <p className="text-xs text-gray-400 text-center flex items-center justify-center gap-1.5 font-light">
                    <Shield className="w-3 h-3" /> {t.common.yourInfoSecure}
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
