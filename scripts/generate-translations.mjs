/**
 * Translation Generation Script
 * Uses z-ai-web-dev-sdk to translate the English dictionary to ar, zh, ru, fr, de
 * Run: node scripts/generate-translations.mjs
 */

import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DICT_DIR = path.join(__dirname, '..', 'src', 'dictionaries');

const LANGUAGES = [
  { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
  { code: 'zh', name: 'Chinese (Simplified)', nativeName: '中文' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
];

// Read English dictionary
const enContent = fs.readFileSync(path.join(DICT_DIR, 'en.ts'), 'utf-8');

// Extract the object from the TS file (between "const en = " and ";\n\nexport")
const enObjMatch = enContent.match(/const en = (\{[\s\S]*\});\n\nexport/);
if (!enObjMatch) {
  console.error('Could not parse English dictionary');
  process.exit(1);
}
const enObj = eval(`(${enObjMatch[1]})`);

// Flatten a nested object into dot-notation keys
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
          const flatItem = flattenObject(item, `${fullKey}.${idx}`);
          Object.assign(result, flatItem);
        }
      });
    } else if (typeof value === 'object' && value !== null) {
      Object.assign(result, flattenObject(value, fullKey));
    }
  }
  return result;
}

// Unflatten dot-notation keys back to nested object
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
    if (/^\d+$/.test(lastPart)) {
      current[parseInt(lastPart)] = value;
    } else {
      current[lastPart] = value;
    }
  }
  return result;
}

async function translateBatch(zai, strings, targetLang, targetNativeName) {
  const stringEntries = Object.entries(strings);
  const batchSize = 40;
  const translated = {};

  for (let i = 0; i < stringEntries.length; i += batchSize) {
    const batch = stringEntries.slice(i, i + batchSize);
    const jsonString = JSON.stringify(Object.fromEntries(batch), null, 2);

    const prompt = `You are a professional translator for a luxury real estate website in Dubai (The Oasis by Emaar). Translate the following JSON values from English to ${targetLang} (${targetNativeName}).

IMPORTANT RULES:
1. Only translate the VALUES, not the keys
2. Keep proper nouns unchanged: "Emaar", "Oasis", "Palmiera", "Mareva", "Lavita", "Mirage", "Address Villas Tierra", "Palace Villas Ostra", "Palmeira Collective", "Palmiera 3", "Mareva 2", "Dubai", "UAE", "RERA", "DLD", "AED"
3. Keep currency amounts and numbers unchanged (e.g., "AED 9.18M", "7,000+", "25%")
4. Keep URLs and technical terms unchanged
5. For Arabic: ensure proper Arabic text, RTL-compatible
6. Return ONLY valid JSON with the same keys
7. Maintain the professional luxury real estate tone

JSON to translate:
${jsonString}`;

    try {
      const completion = await zai.chat.completions.create({
        messages: [
          { role: 'system', content: 'You are a professional translator. Return only valid JSON. No markdown, no code blocks, just the JSON object.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.3,
        max_tokens: 4000,
      });

      const responseText = completion.choices[0]?.message?.content || '';
      const cleaned = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const parsed = JSON.parse(cleaned);
      Object.assign(translated, parsed);
      console.log(`  Batch ${Math.floor(i / batchSize) + 1}: translated ${batch.length} strings`);
    } catch (err) {
      console.error(`  Batch error at ${i}:`, err.message);
      for (const [key, value] of batch) {
        translated[key] = value;
      }
    }
  }

  return translated;
}

function generateTsFile(langCode, translatedObj) {
  const objStr = serializeToTs(translatedObj, 0);
  return `// ═══════════════════════════════════════════════════════════
// ${langCode.toUpperCase()} Dictionary — Auto-generated translation
// ═══════════════════════════════════════════════════════════

import type { Dictionary } from "./en";

const ${langCode} = ${objStr} as Dictionary;

export default ${langCode};
`;
}

function serializeToTs(obj, indent) {
  const pad = '  '.repeat(indent);
  const padInner = '  '.repeat(indent + 1);

  if (Array.isArray(obj)) {
    if (obj.length === 0) return '[]';
    const items = obj.map(item => {
      if (typeof item === 'string') {
        return `${padInner}${JSON.stringify(item)}`;
      } else if (typeof item === 'object' && item !== null) {
        return `${padInner}${serializeToTs(item, indent + 1)}`;
      }
      return `${padInner}${item}`;
    });
    return `[\n${items.join(',\n')}\n${pad}]`;
  }

  if (typeof obj === 'object' && obj !== null) {
    const entries = Object.entries(obj);
    if (entries.length === 0) return '{}';
    const items = entries.map(([key, value]) => {
      const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : JSON.stringify(key);
      if (typeof value === 'string') {
        return `${padInner}${safeKey}: ${JSON.stringify(value)}`;
      } else if (typeof value === 'object' && value !== null) {
        return `${padInner}${safeKey}: ${serializeToTs(value, indent + 1)}`;
      }
      return `${padInner}${safeKey}: ${value}`;
    });
    return `{\n${items.join(',\n')}\n${pad}}`;
  }

  return String(obj);
}

async function main() {
  console.log('Initializing z-ai-web-dev-sdk...');
  const zai = await ZAI.create();

  console.log('Flattening English dictionary...');
  const flatEn = flattenObject(enObj);
  console.log(`Total strings to translate: ${Object.keys(flatEn).length}`);

  for (const lang of LANGUAGES) {
    console.log(`\nTranslating to ${lang.name} (${lang.nativeName})...`);
    const startTime = Date.now();

    const translated = await translateBatch(zai, flatEn, lang.name, lang.nativeName);

    const nestedTranslated = unflattenObject(translated);
    const merged = deepMerge(enObj, nestedTranslated);

    const tsContent = generateTsFile(lang.code, merged);
    const outputPath = path.join(DICT_DIR, `${lang.code}.ts`);
    fs.writeFileSync(outputPath, tsContent, 'utf-8');

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log(`  ✓ ${lang.code}.ts written (${elapsed}s)`);
  }

  console.log('\n✓ All translations generated successfully!');
}

function deepMerge(target, source) {
  const result = { ...target };
  for (const key of Object.keys(source)) {
    if (
      source[key] instanceof Object &&
      key in target &&
      target[key] instanceof Object &&
      !Array.isArray(source[key]) &&
      !Array.isArray(target[key])
    ) {
      result[key] = deepMerge(target[key], source[key]);
    } else {
      result[key] = source[key];
    }
  }
  return result;
}

main().catch(console.error);
