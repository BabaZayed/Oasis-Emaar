"use client";

import { usePathname } from "next/navigation";
import { detectLang, type LangCode } from "@/lib/i18n";
import { getDictionarySync, type Dictionary } from "@/dictionaries";

/**
 * React hook to get the translation dictionary for the current language.
 * Automatically detects language from the URL path.
 * 
 * Usage in components:
 * ```tsx
 * const t = useDict();
 * return <h1>{t.inventory.title}</h1>;
 * ```
 */
export function useDict(): Dictionary {
  const pathname = usePathname();
  const lang: LangCode = detectLang(pathname);
  return getDictionarySync(lang);
}

/**
 * Get the current language code from the URL path.
 */
export function useLang(): LangCode {
  const pathname = usePathname();
  return detectLang(pathname);
}
