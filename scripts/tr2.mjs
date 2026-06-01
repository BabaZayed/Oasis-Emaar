import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DICT_DIR = path.join(__dirname, '..', 'src', 'dictionaries');

const langCode = process.argv[2];
const LANG_MAP = {
  ar: { name: 'Arabic', nativeName: 'العربية' },
  zh: { name: 'Chinese (Simplified)', nativeName: '中文' },
  ru: { name: 'Russian', nativeName: 'Русский' },
  fr: { name: 'French', nativeName: 'Français' },
  de: { name: 'German', nativeName: 'Deutsch' },
};

const target = LANG_MAP[langCode];
if (!target) { console.error('Usage: node tr2.mjs <ar|zh|ru|fr|de>'); process.exit(1); }

const enContent = fs.readFileSync(path.join(DICT_DIR, 'en.ts'), 'utf-8');
const m = enContent.match(/const en = (\{[\s\S]*\});\n\nexport/);
const enObj = eval(`(${m[1]})`);

// Extract top-level sections for batch translation
const sections = Object.keys(enObj);
console.log(`Sections: ${sections.join(', ')}`);

function ser(obj, ind) {
  const pad = '  '.repeat(ind), pi = '  '.repeat(ind + 1);
  if (Array.isArray(obj)) {
    if (!obj.length) return '[]';
    return `[\n${obj.map(i => typeof i === 'string' ? `${pi}${JSON.stringify(i)}` : i && typeof i === 'object' ? `${pi}${ser(i, ind + 1)}` : `${pi}${i}`).join(',\n')}\n${pad}]`;
  }
  if (obj && typeof obj === 'object') {
    const e = Object.entries(obj);
    if (!e.length) return '{}';
    return `{\n${e.map(([k, v]) => {
      const sk = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(k) ? k : JSON.stringify(k);
      return `${pi}${sk}: ${typeof v === 'string' ? JSON.stringify(v) : v && typeof v === 'object' ? ser(v, ind + 1) : v}`;
    }).join(',\n')}\n${pad}}`;
  }
  return String(obj);
}

function merge(t, s) {
  const r = { ...t };
  for (const k of Object.keys(s)) {
    if (s[k] instanceof Object && k in t && t[k] instanceof Object && !Array.isArray(s[k]) && !Array.isArray(t[k]))
      r[k] = merge(t[k], s[k]);
    else r[k] = s[k];
  }
  return r;
}

async function main() {
  console.log(`Translating to ${target.name}...`);
  const zai = await ZAI.create();
  
  const translated = {};
  
  // Translate each top-level section
  for (const section of sections) {
    const sectionData = enObj[section];
    const jsonStr = JSON.stringify(sectionData, null, 2);
    console.log(`Translating section: ${section} (${jsonStr.length} chars)...`);
    
    try {
      const c = await zai.chat.completions.create({
        messages: [
          { role: 'system', content: 'Return ONLY valid JSON. Same structure, translated values. No markdown.' },
          { role: 'user', content: `Translate ALL string values from English to ${target.name}. Rules: Keep proper nouns unchanged (Emaar, Oasis, Palmiera, Mareva, Lavita, Mirage, Address Villas Tierra, Palace Villas Ostra, Palmeira Collective, Palmiera 3, Mareva 2, Dubai, UAE, RERA, DLD, AED). Keep numbers, currency amounts, percentages unchanged. Maintain luxury real estate tone. For arrays of objects, translate title and desc fields.\n\n${jsonStr}` }
        ],
        temperature: 0.3, max_tokens: 4000
      });
      const txt = (c.choices[0]?.message?.content || '').replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const parsed = JSON.parse(txt);
      translated[section] = parsed;
      console.log(`  ✓ ${section} done`);
    } catch (e) {
      console.error(`  ✗ ${section} error: ${e.message?.substring(0, 100)}`);
      translated[section] = sectionData; // Fallback to English
    }
  }
  
  const merged = merge(enObj, translated);
  const out = `import type { Dictionary } from "./en";\n\nconst ${langCode} = ${ser(merged, 0)} as Dictionary;\n\nexport default ${langCode};\n`;
  fs.writeFileSync(path.join(DICT_DIR, `${langCode}.ts`), out);
  console.log(`\n✓ ${langCode}.ts written!`);
}

main().catch(console.error);
