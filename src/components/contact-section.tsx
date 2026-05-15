"use client";

import { useState } from "react";
import { PHONE_NUMBER, EMAIL, ADDRESS, WHATSAPP_LINK } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Mail, MapPin, MessageCircle, Clock, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    interest: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast({
      title: "Message Sent!",
      description: "Our team will contact you within 24 hours.",
    });
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", phone: "", message: "", interest: "" });
    }, 3000);
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
          <span className="text-sm font-semibold tracking-[0.2em] uppercase text-[#C8A45C]">
            Get in Touch
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A2332] mt-3 mb-4">
            Contact Us
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Ready to explore The Oasis? Our property consultants are here to help you find your perfect home.
          </p>
          <div className="section-divider max-w-xs mx-auto mt-6" />
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#1A2332] rounded-xl p-6 sm:p-8 text-white">
              <h3 className="text-xl font-bold text-[#C8A45C] mb-6">Contact Information</h3>
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
                      <p className="text-xs text-white/50 uppercase tracking-wider">{info.label}</p>
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
              <h3 className="text-xl font-bold text-[#1A2332] mb-6">Send Us a Message</h3>

              {submitted ? (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-green-500" />
                  </div>
                  <h4 className="text-xl font-bold text-[#1A2332] mb-2">Message Sent!</h4>
                  <p className="text-gray-500">Our property consultant will contact you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contact-name">Full Name</Label>
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
                      <Label htmlFor="contact-phone">Phone Number</Label>
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
                    <Label htmlFor="contact-email">Email Address</Label>
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
                  <div>
                    <Label htmlFor="contact-interest">Property Interest</Label>
                    <Select
                      value={formData.interest}
                      onValueChange={(v) => setFormData({ ...formData, interest: v })}
                    >
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
                    <Label htmlFor="contact-message">Message</Label>
                    <Textarea
                      id="contact-message"
                      placeholder="Tell us about your requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={4}
                      className="mt-1"
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full gold-gradient text-[#1A2332] font-bold py-6 rounded-md hover:opacity-90"
                  >
                    Send Message
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
