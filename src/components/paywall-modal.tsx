"use client";

import { useState, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { trackLead, trackInitiateCheckout, trackCompleteRegistration } from "@/lib/meta-pixel";

function checkRegistered(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("oasis_registered") === "true";
}

export function PaywallModal({
  open,
  onClose,
  itemName,
}: {
  open: boolean;
  onClose: () => void;
  itemName: string;
}) {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", budget: "" });
  const [submitted, setSubmitted] = useState(false);
  const [isRegistered, setIsRegistered] = useState(checkRegistered);
  const { toast } = useToast();

  const checkReg = useCallback(() => {
    setIsRegistered(checkRegistered());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Meta Pixel tracking — fire before setting registered state
    trackLead({
      formType: "paywall",
      propertyInterest: itemName,
      budget: formData.budget || undefined,
    });
    trackCompleteRegistration({
      propertyName: itemName,
    });

    localStorage.setItem("oasis_registered", "true");
    setSubmitted(true);
    toast({
      title: "Access Granted!",
      description: "You now have access to all premium listings.",
    });
    setTimeout(() => {
      setSubmitted(false);
      setIsRegistered(true);
      onClose();
    }, 2000);
  };

  if (isRegistered) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-[#1A2332]">
              <CheckCircle className="w-5 h-5 text-green-500" />
              Registration Complete
            </DialogTitle>
            <DialogDescription>
              Our property consultant will contact you with details about {itemName} and other exclusive options.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-600 text-sm">
              Our property consultant will contact you shortly with detailed information about this property and exclusive viewing arrangements.
            </p>
          </div>
          <Button onClick={onClose} className="gold-gradient text-[#1A2332] font-semibold rounded-md">
            Continue Browsing
          </Button>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-[#1A2332]">
            <Lock className="w-5 h-5 text-[#C8A45C]" />
Register for Full Details
          </DialogTitle>
          <DialogDescription>
            Provide your details to receive pricing, floor plans, and availability for <strong>{itemName}</strong>. Our consultant will contact you with exclusive options.
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="py-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-[#1A2332] mb-2">Registration Successful!</h3>
            <p className="text-gray-500">Your premium access is now unlocked.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div>
              <Label htmlFor="pw-name">Full Name</Label>
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
              <Label htmlFor="pw-email">Email Address</Label>
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
            <div>
              <Label htmlFor="pw-phone">Phone Number</Label>
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
            <div>
              <Label htmlFor="pw-budget">Budget Range</Label>
              <Input
                id="pw-budget"
                placeholder="e.g. AED 5M - 10M"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="mt-1"
              />
            </div>
            <Button type="submit" className="w-full gold-gradient text-[#1A2332] font-bold py-3 rounded-md">
              Get Details
            </Button>
            <p className="text-xs text-gray-400 text-center">
              By registering, you agree to receive property details and communications about The Oasis by Emaar.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
