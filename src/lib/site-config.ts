/**
 * Centralized site configuration
 * Change domain in ONE place and it propagates everywhere
 */

export const SITE_URL = "https://www.oasisemaar.com";
export const SITE_NAME = "Oasis Emaar — Authorized Agent";
export const SITE_PHONE = "+971526919169";
export const SITE_EMAIL = "sales@oasisemaar.com";

// Language codes used for hreflang
export const LANGUAGES = {
  en: SITE_URL,
  ar: `${SITE_URL}/ar`,
  zh: `${SITE_URL}/zh`,
  ru: `${SITE_URL}/ru`,
  fr: `${SITE_URL}/fr`,
  de: `${SITE_URL}/de`,
  "x-default": SITE_URL,
} as const;

// Helper to build hreflang alternates for any page path
export function getHreflangAlternates(path: string = "") {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const result: Record<string, string> = {};
  for (const [lang, base] of Object.entries(LANGUAGES)) {
    if (lang === "x-default" || lang === "en") {
      result[lang] = `${base}${cleanPath}`;
    } else {
      // Non-English languages: prepend language code to the path
      result[lang] = `${base}${cleanPath}`;
    }
  }
  return result;
}
