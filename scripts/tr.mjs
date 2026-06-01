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
if (!target) { console.error('Usage: node tr.mjs <ar|zh|ru|fr|de>'); process.exit(1); }

const enContent = fs.readFileSync(path.join(DICT_DIR, 'en.ts'), 'utf-8');
const m = enContent.match(/const en = (\{[\s\S]*\});\n\nexport/);
const enObj = eval(`(${m[1]})`);

function flatten(obj, p = '') {
  const r = {};
  for (const [k, v] of Object.entries(obj)) {
    const fk = p ? `${p}.${k}` : k;
    if (typeof v === 'string') r[fk] = v;
    else if (Array.isArray(v)) v.forEach((item, i) => {
      if (typeof item === 'string') r[`${fk}.${i}`] = item;
      else if (item && typeof item === 'object') Object.assign(r, flatten(item, `${fk}.${i}`));
    });
    else if (v && typeof v === 'object') Object.assign(r, flatten(v, fk));
  }
  return r;
}

function unflatten(flat) {
  const r = {};
  for (const [k, v] of Object.entries(flat)) {
    const parts = k.split('.');
    let c = r;
    for (let i = 0; i < parts.length - 1; i++) {
      const np = parts[i + 1];
      if (/^\d+$/.test(np)) { if (!c[parts[i]]) c[parts[i]] = []; c = c[parts[i]]; }
      else { if (!c[parts[i]]) c[parts[i]] = {}; c = c[parts[i]]; }
    }
    const lp = parts[parts.length - 1];
    if (/^\d+$/.test(lp)) c[parseInt(lp)] = v; else c[lp] = v;
  }
  return r;
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

async function main() {
  console.log(`Translating to ${target.name}...`);
  const zai = await ZAI.create();
  const flat = flatten(enObj);
  const entries = Object.entries(flat);
  console.log(`${entries.length} strings, batches of 15`);
  
  const tr = {};
  for (let i = 0; i < entries.length; i += 15) {
    const batch = entries.slice(i, i + 15);
    const j = JSON.stringify(Object.fromEntries(batch));
    console.log(`Batch ${Math.floor(i/15)+1}/${Math.ceil(entries.length/15)}...`);
    try {
      const c = await zai.chat.completions.create({
        messages: [
          { role: 'system', content: 'Return ONLY valid JSON. Same keys, translated values.' },
          { role: 'user', content: `Translate values to ${target.name}. Keep: Emaar, Oasis, Palmiera, Mareva, Lavita, Mirage, Address Villas Tierra, Palace Villas Ostra, Palmeira Collective, Palmiera 3, Mareva 2, Dubai, UAE, RERA, DLD, AED, numbers, currency. Luxury tone.\n${j}` }
        ],
        temperature: 0.3, max_tokens: 2000
      });
      const txt = (c.choices[0]?.message?.content || '').replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      Object.assign(tr, JSON.parse(txt));
    } catch (e) {
      console.error(`  Error: ${e.message?.substring(0, 80)}`);
      for (const [k, v] of batch) tr[k] = v;
    }
  }
  
  const merged = merge(enObj, unflatten(tr));
  const out = `import type { Dictionary } from "./en";\n\nconst ${langCode} = ${ser(merged, 0)} as Dictionary;\n\nexport default ${langCode};\n`;
  fs.writeFileSync(path.join(DICT_DIR, `${langCode}.ts`), out);
  console.log(`✓ ${langCode}.ts done!`);
}

main().catch(console.error);
