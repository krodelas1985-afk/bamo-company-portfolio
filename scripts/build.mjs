import { readFile, access, cp, mkdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const html = await readFile(resolve(root, 'index.html'), 'utf8');
const errors = [];
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
if (new Set(ids).size !== ids.length) errors.push('Duplicate HTML IDs.');
if ([...html.matchAll(/<h1\b/g)].length !== 1) errors.push('Expected one H1.');
const voidTags = new Set('area base br col embed hr img input link meta param source track wbr'.split(' '));
const stack = [];
for (const token of html.replace(/<!--[\s\S]*?-->/g, '').matchAll(/<(\/?)([a-z][a-z0-9-]*)\b[^>]*>/gi)) {
  const [, closing, rawTag] = token;
  const tag = rawTag.toLowerCase();
  if (voidTags.has(tag)) continue;
  if (closing) {
    if (stack.pop() !== tag) errors.push(`Unbalanced ${tag} tag.`);
  } else stack.push(tag);
}
if (stack.length) errors.push(`Unclosed tags: ${stack.join(', ')}`);
for (const [, reference] of html.matchAll(/\b(?:href|src)="([^"]*)"/g)) {
  if (!reference) continue; // Empty lightbox src is populated on opening.
  if (reference.startsWith('#')) {
    if (!ids.includes(reference.slice(1))) errors.push(`Missing anchor: ${reference}`);
  } else if (!/^(https?:|mailto:|tel:)/.test(reference)) {
    try { await access(resolve(root, reference)); }
    catch { errors.push(`Missing local asset: ${reference}`); }
  }
}
if (errors.length) throw new Error(errors.join('\n'));
console.log(`Markup, assets, ${ids.length} unique IDs and all local links verified.`);
if (!process.argv.includes('--check')) {
  const out = resolve(root, 'dist');
  await mkdir(out, { recursive: true });
  for (const entry of ['index.html', 'styles.css', 'script.js', 'assets']) {
    await cp(resolve(root, entry), resolve(out, entry), { recursive: true });
  }
  console.log('Static website built in dist/.');
}
