import { type LangCode, langCodes } from "@/lib/i18n";

// Only non-English languages for [lang] routes (English is at root)
export const langStaticParams = langCodes
  .filter((l) => l !== "en")
  .map((lang) => ({ lang }));

// Validate and sanitize the lang parameter
export function parseLang(lang: string): LangCode {
  if (langCodes.includes(lang as LangCode)) return lang as LangCode;
  return "en";
}
