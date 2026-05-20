"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { detectLang } from "@/lib/i18n";

/**
 * Dynamically sets the <html> lang and dir attributes based on the current route.
 * This ensures proper SEO and accessibility for language pages.
 */
export default function LanguageDetector() {
  const pathname = usePathname();
  const lang = detectLang(pathname);
  const isRTL = lang === "ar";

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("lang", lang);
    if (isRTL) {
      html.setAttribute("dir", "rtl");
    } else {
      html.removeAttribute("dir");
    }
  }, [lang, isRTL]);

  return null;
}
