"use client";

import { useState, useEffect } from "react";
import { Download, X, Smartphone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { fbqTrackCustom } from "@/lib/meta-pixel";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const DISMISS_KEY = "oasis-pwa-dismissed";
const INSTALL_KEY = "oasis-pwa-installed";

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if already dismissed or installed
    try {
      if (localStorage.getItem(DISMISS_KEY) || localStorage.getItem(INSTALL_KEY)) {
        return;
      }
    } catch {
      // localStorage unavailable, continue
    }

    const handler = (e: Event) => {
      // Prevent the default mini-infobar
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Show our custom banner after a short delay
      setTimeout(() => setShowBanner(true), 3000);
    };

    window.addEventListener("beforeinstallprompt", handler);

    // Listen for successful install
    const installedHandler = () => {
      setShowBanner(false);
      try {
        localStorage.setItem(INSTALL_KEY, "true");
      } catch {
        // ignore
      }
      // Track PWA install with Meta Pixel
      fbqTrackCustom("PWA_Install");
    };

    window.addEventListener("appinstalled", installedHandler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.removeEventListener("appinstalled", installedHandler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setShowBanner(false);
        try {
          localStorage.setItem(INSTALL_KEY, "true");
        } catch {
          // ignore
        }
        fbqTrackCustom("PWA_Install");
      }
      setDeferredPrompt(null);
    } catch {
      // Prompt failed, ignore
    }
  };

  const handleDismiss = () => {
    setShowBanner(false);
    try {
      localStorage.setItem(DISMISS_KEY, "true");
    } catch {
      // ignore
    }
  };

  return (
    <AnimatePresence>
      {showBanner && deferredPrompt && (
        <>
          <div className="fixed inset-0 bg-black/20 z-40" onClick={handleDismiss} />
          <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 60 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-24 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm z-40"
        >
          <div className="bg-[#1A2332] border border-[#C8A45C]/30 rounded-xl shadow-2xl p-4 relative overflow-hidden">
            {/* Gold accent line at top */}
            <div className="absolute top-0 left-0 right-0 h-[2px] gold-gradient" />

            <div className="flex items-start gap-3">
              {/* Icon */}
              <div className="w-10 h-10 rounded-lg gold-gradient flex items-center justify-center flex-shrink-0">
                <Smartphone className="w-5 h-5 text-[#1A2332]" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-body font-semibold">
                  Install Oasis Emaar
                </p>
                <p className="text-gray-400 text-xs font-body mt-0.5 leading-relaxed">
                  Quick access to properties, floor plans, and availability — right from your home screen.
                </p>

                {/* Buttons */}
                <div className="flex items-center gap-2 mt-3">
                  <button
                    onClick={handleInstall}
                    className="inline-flex items-center gap-1.5 gold-gradient text-[#1A2332] font-body font-bold text-xs px-4 py-2 rounded-md hover:opacity-90 transition-opacity"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Install
                  </button>
                  <button
                    onClick={handleDismiss}
                    className="inline-flex items-center gap-1 text-gray-400 hover:text-gray-200 font-body text-xs transition-colors min-h-[44px] min-w-[44px]"
                  >
                    <X className="w-3.5 h-3.5" />
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
