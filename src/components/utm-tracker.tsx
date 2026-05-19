"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    fbq: {
      (track: string, event: string, params?: Record<string, unknown>): void;
      (method: "track" | "trackCustom", event: string, params?: Record<string, unknown>): void;
      push: (args: unknown[]) => void;
      loaded: boolean;
      version: string;
      queue: unknown[];
      callMethod?: (...args: unknown[]) => void;
    };
    _fbq: Window["fbq"];
  }
}

export default function UTMTracker() {
  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);

      const source = urlParams.get("utm_source");
      const medium = urlParams.get("utm_medium");
      const campaign = urlParams.get("utm_campaign");
      const term = urlParams.get("utm_term");
      const content = urlParams.get("utm_content");
      const ref = urlParams.get("ref");

      const hasUTMParams = source || medium || campaign || term || content || ref;

      if (hasUTMParams) {
        // Build UTM data object
        const utmData: Record<string, unknown> = {
          firstTouchTimestamp: Date.now(),
          landingPage: window.location.href.split("?")[0],
        };
        if (source) utmData.source = source;
        if (medium) utmData.medium = medium;
        if (campaign) utmData.campaign = campaign;
        if (term) utmData.term = term;
        if (content) utmData.content = content;
        if (ref) utmData.ref = ref;

        // Store in localStorage (first-touch wins — don't overwrite)
        const existing = localStorage.getItem("oasis_utm");
        if (!existing) {
          localStorage.setItem("oasis_utm", JSON.stringify(utmData));
        }

        // Fire Meta Pixel custom event
        try {
          if (window.fbq) {
            window.fbq("trackCustom", "UTM_Capture", {
              source: source || undefined,
              medium: medium || undefined,
              campaign: campaign || undefined,
            });
          }
        } catch (e) {
          console.warn("[UTM Tracker] Meta Pixel event failed:", e);
        }
      } else {
        // No UTM params — check if there's existing data and keep it
        // (first-touch attribution: don't clear existing data)
        const existing = localStorage.getItem("oasis_utm");
        if (!existing) {
          // No UTM data at all — nothing to do
        }
      }
    } catch (e) {
      console.warn("[UTM Tracker] Error reading UTM params:", e);
    }
  }, []);

  return null; // This component renders nothing
}
