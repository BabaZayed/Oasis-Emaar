"use client";

import dynamic from "next/dynamic";

// Lazy-load heavy global components that don't need to be in the initial bundle
// This reduces the initial JS bundle by ~40-60KB (framer-motion + component code)

const WhatsAppButton = dynamic(() => import("@/components/whatsapp-button"), {
  ssr: false,
});

const SocialProof = dynamic(() => import("@/components/social-proof"), {
  ssr: false,
});

const PWAInstallPrompt = dynamic(() => import("@/components/pwa-install-prompt"), {
  ssr: false,
});

export default function LazyGlobalComponents() {
  return (
    <>
      <WhatsAppButton />
      <SocialProof />
      <PWAInstallPrompt />
    </>
  );
}
