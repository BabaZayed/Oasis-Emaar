"use client";

import { useState, useEffect, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Clock, Gift, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { trackLead } from "@/lib/meta-pixel";

function checkDismissed(): boolean {
  if (typeof window === "undefined") return false;
  const dismissed = localStorage.getItem("oasis_exit_dismissed");
  if (!dismissed) return false;
  const timestamp = parseInt(dismissed);
  // Don't show again for 24 hours after dismissal
  return Date.now() - timestamp < 24 * 60 * 60 * 1000;
}

export default function ExitIntentPopup() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", honeypot: "" });
  const [submitted, setSubmitted] = useState(false);
  const [dismissed, setDismissed] = useState(checkDismissed);
  const { toast } = useToast();

  const handleMouseLeave = useCallback((e: MouseEvent) => {
    if (dismissed || submitted) return;
    // Only trigger when mouse leaves through the top of the viewport
    if (e.clientY <= 0) {
      setOpen(true);
    }
  }, [dismissed, submitted]);

  useEffect(() => {
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [handleMouseLeave]);

  const handleClose = () => {
    setOpen(false);
    localStorage.setItem("oasis_exit_dismissed", Date.now().toString());
    setDismissed(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check
    if (formData.honeypot) return;

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          formType: "exit_intent",
          pageUrl: window.location.href,
          honeypot: formData.honeypot,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setSubmitted(true);

        // Meta Pixel tracking
        trackLead({ formType: "exit_intent" });

        localStorage.setItem("oasis_registered", "true");
        toast({
          title: "Exclusive Access Granted!",
          description: data.qualified
            ? "A senior consultant will contact you within 2 hours."
            : "Our team will be in touch within 24 hours.",
        });
        setTimeout(() => {
          setOpen(false);
        }, 3000);
      } else {
        toast({
          title: "Already Registered",
          description: data.message || "We already have your details.",
        });
        setOpen(false);
      }
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly on WhatsApp.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleClose()}>
      <DialogContent className="max-w-lg p-0 overflow-hidden border-0">
        {/* Header Banner */}
        <div className="bg-gradient-to-br from-[#1A2332] to-[#2A3A52] text-white p-6 relative">
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 text-white/50 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center">
              <Gift className="w-5 h-5 text-[#1A2332]" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Wait — Exclusive Offer!</h3>
              <p className="text-white/60 text-xs">Limited time for serious buyers</p>
            </div>
          </div>
          <p className="text-white/80 text-sm leading-relaxed">
            Register now to receive <strong className="text-[#C8A45C]">exclusive pre-launch pricing</strong> and
            priority access to The Oasis premium waterfront properties before they sell out.
          </p>
          <div className="flex items-center gap-2 mt-3 text-xs text-white/50">
            <Clock className="w-3.5 h-3.5" />
            <span>Only 12 VIP slots remaining this month</span>
          </div>
        </div>

        {/* Form */}
        <div className="p-6">
          {submitted ? (
            <div className="py-6 text-center">
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <ArrowRight className="w-7 h-7 text-green-500" />
              </div>
              <h4 className="text-lg font-bold text-[#1A2332] mb-2">You&apos;re In!</h4>
              <p className="text-gray-500 text-sm">Your exclusive access is confirmed. Our property consultant will contact you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Honeypot - hidden from real users */}
              <div className="absolute opacity-0 h-0 w-0 overflow-hidden" aria-hidden="true">
                <Label htmlFor="exit-website">Website</Label>
                <Input
                  id="exit-website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="exit-name">Full Name</Label>
                <Input
                  id="exit-name"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="exit-email">Email Address</Label>
                <Input
                  id="exit-email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="exit-phone">Phone / WhatsApp</Label>
                <Input
                  id="exit-phone"
                  type="tel"
                  placeholder="+971 XX XXX XXXX"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="mt-1"
                />
              </div>
              <Button
                type="submit"
                className="w-full gold-gradient text-[#1A2332] font-bold py-4 rounded-md hover:opacity-90 text-base"
              >
                Get Exclusive Access Now
              </Button>
              <p className="text-xs text-gray-400 text-center">
                Your information is secure and will never be shared with third parties.
              </p>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
