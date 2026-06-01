/**
 * Single-language translation script
 * Usage: node scripts/translate-one.mjs <lang_code>
 * Example: node scripts/translate-one.mjs ar
 */

import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DICT_DIR = path.join(__dirname, '..', 'src', 'dictionaries');

const LANG_MAP = {
  ar: { name: 'Arabic', nativeName: 'العربية' },
  zh: { name: 'Chinese (Simplified)', nativeName: '中文' },
  ru: { name: 'Russian', nativeName: 'Русский' },
  fr: { name: 'French', nativeName: 'Français' },
  de: { name: 'German', nativeName: 'Deutsch' },
};

const langCode = process.argv[2];
if (!langCode || !LANG_MAP[langCode]) {
  console.error('Usage: node translate-one.mjs <ar|zh|ru|fr|de>');
  process.exit(1);
}

const targetLang = LANG_MAP[langCode];

// Read English dictionary
const enContent = fs.readFileSync(path.join(DICT_DIR, 'en.ts'), 'utf-8');
const enObjMatch = enContent.match(/const en = (\{[\s\S]*\});\n\nexport/);
if (!enObjMatch) { console.error('Parse error'); process.exit(1); }
const enObj = eval(`(${enObjMatch[1]})`);

function flattenObject(obj, prefix = '') {
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'string') {
      result[fullKey] = value;
    } else if (Array.isArray(value)) {
      value.forEach((item, idx) => {
        if (typeof item === 'string') {
          result[`${fullKey}.${idx}`] = item;
        } else if (typeof item === 'object' && item !== null) {
          Object.assign(result, flattenObject(item, `${fullKey}.${idx}`));
        }
      });
    } else if (typeof value === 'object' && value !== null) {
      Object.assign(result, flattenObject(value, fullKey));
    }
  }
  return result;
}

function unflattenObject(flat) {
  const result = {};
  for (const [key, value] of Object.entries(flat)) {
    const parts = key.split('.');
    let current = result;
    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i];
      const nextPart = parts[i + 1];
      if (/^\d+$/.test(nextPart)) {
        if (!current[part]) current[part] = [];
        current = current[part];
      } else {
        if (!current[part]) current[part] = {};
        current = current[part];
      }
    }
    const lastPart = parts[parts.length - 1];
    if (/^\d+$/.test(lastPart)) current[parseInt(lastPart)] = value;
    else current[lastPart] = value;
  }
  return result;
}

function deepMerge(target, source) {
  const result = { ...target };
  for (const key of Object.keys(source)) {
    if (source[key] instanceof Object && key in target && target[key] instanceof Object && !Array.isArray(source[key]) && !Array.isArray(target[key])) {
      result[key] = deepMerge(target[key], source[key]);
    } else {
      result[key] = source[key];
    }
  }
  return result;
}

function serializeToTs(obj, indent) {
  const pad = '  '.repeat(indent);
  const padInner = '  '.repeat(indent + 1);
  if (Array.isArray(obj)) {
    if (obj.length === 0) return '[]';
    const items = obj.map(item => {
      if (typeof item === 'string') return `${padInner}${JSON.stringify(item)}`;
      else if (typeof item === 'object' && item !== null) return `${padInner}${serializeToTs(item, indent + 1)}`;
      return `${padInner}${item}`;
    });
    return `[\n${items.join(',\n')}\n${pad}]`;
  }
  if (typeof obj === 'object' && obj !== null) {
    const entries = Object.entries(obj);
    if (entries.length === 0) return '{}';
    const items = entries.map(([key, value]) => {
      const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : JSON.stringify(key);
      if (typeof value === 'string') return `${padInner}${safeKey}: ${JSON.stringify(value)}`;
      else if (typeof value === 'object' && value !== null) return `${padInner}${safeKey}: ${serializeToTs(value, indent + 1)}`;
      return `${padInner}${safeKey}: ${value}`;
    });
    return `{\n${items.join(',\n')}\n${pad}}`;
  }
  return String(obj);
}

async function main() {
  console.log(`Translating to ${targetLang.name} (${targetLang.nativeName})...`);
  const zai = await ZAI.create();

  const flatEn = flattenObject(enObj);
  const stringEntries = Object.entries(flatEn);
  console.log(`Total strings: ${stringEntries.length}`);

  const batchSize = 25;
  const translated = {};

  for (let i = 0; i < stringEntries.length; i += batchSize) {
    const batch = stringEntries.slice(i, i + batchSize);
    const jsonString = JSON.stringify(Object.fromEntries(batch), null, 2);

    console.log(`Batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(stringEntries.length / batchSize)} (${batch.length} strings)...`);

    try {
      const completion = await zai.chat.completions.create({
        messages: [
          { role: 'system', content: 'You are a professional translator for a luxury real estate website. Return ONLY valid JSON with the same keys. No markdown, no code blocks.' },
          { role: 'user', content: `Translate the JSON values from English to ${targetLang.name} (${targetLang.nativeName}). Rules: Keep proper nouns unchanged (Emaar, Oasis, Palmiera, Mareva, Lavita, Mirage, Address Villas Tierra, Palace Villas Ostra, Palmeira Collective, Palmiera 3, Mareva 2, Dubai, UAE, RERA, DLD, AED). Keep numbers/currency unchanged. Maintain luxury real estate tone. Arabic: proper RTL text.\n\n${jsonString}` },
        ],
        temperature: 0.3,
        max_tokens: 4000,
      });

      const responseText = completion.choices[0]?.message?.content || '';
      const cleaned = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const parsed = JSON.parse(cleaned);
      Object.assign(translated, parsed);
      console.log(`  ✓ Batch done`);
    } catch (err) {
      console.error(`  ✗ Batch error:`, err.message?.substring(0, 100));
      for (const [key, value] of batch) translated[key] = value;
    }
  }

  const nestedTranslated = unflattenObject(translated);
  const merged = deepMerge(enObj, nestedTranslated);

  const tsContent = `import type { Dictionary } from "./en";\n\nconst ${langCode} = ${serializeToTs(merged, 0)} as Dictionary;\n\nexport default ${langCode};\n`;
  fs.writeFileSync(path.join(DICT_DIR, `${langCode}.ts`), tsContent, 'utf-8');
  console.log(`\n✓ ${langCode}.ts written!`);
}

main().catch(console.error);
