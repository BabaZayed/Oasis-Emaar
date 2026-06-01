import type { LangCode } from "@/lib/i18n";
import en from "./en";
import type { Dictionary } from "./en";

// Lazy-loaded dictionaries — only the requested language is bundled
const dictionaries: Record<LangCode, () => Promise<Dictionary>> = {
  en: () => import("./en").then((m) => m.default),
  ar: () => import("./ar").then((m) => m.default),
  zh: () => import("./zh").then((m) => m.default),
  ru: () => import("./ru").then((m) => m.default),
  fr: () => import("./fr").then((m) => m.default),
  de: () => import("./de").then((m) => m.default),
};

export async function getDictionary(lang: LangCode): Promise<Dictionary> {
  const loader = dictionaries[lang];
  if (!loader) return en;
  return loader();
}

// Synchronous version for client components
// Uses static imports so all dictionaries are available at runtime
import ar from "./ar";
import zh from "./zh";
import ru from "./ru";
import fr from "./fr";
import de from "./de";

const dictMap: Record<LangCode, Dictionary> = { en, ar, zh, ru, fr, de };

export function getDictionarySync(lang: LangCode): Dictionary {
  return dictMap[lang] || en;
}

export type { Dictionary };
