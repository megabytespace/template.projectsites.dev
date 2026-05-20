#!/usr/bin/env node
/**
 * Generate a branded 1200×630 OG image from `_brand.json`.
 *
 *   node scripts/og-image.mjs                # writes public/og-image.svg
 *   node scripts/og-image.mjs --png          # writes .png too (requires sharp)
 *
 * Output:
 *   public/og-image.svg   — vector source, always written
 *   public/og-image.png   — rasterized PNG, written if sharp is installed
 *
 * SVG-only is fine for most use cases — modern social platforms accept SVG.
 * For maximum compatibility (especially Twitter/X), generate the PNG too.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '..');
const brandPath = resolve(repoRoot, '_brand.json');
const outSvg = resolve(repoRoot, 'public/og-image.svg');
const outPng = resolve(repoRoot, 'public/og-image.png');

const wantsPng = process.argv.includes('--png');

const raw = JSON.parse(readFileSync(brandPath, 'utf8'));

// Resolve aliases — minimal version sufficient for OG.
function resolveStr(value, root, depth = 0) {
  if (depth > 8) return value;
  return value.replace(/\{([^}]+)\}/g, (_, path) => {
    const node = path.split('.').reduce((acc, k) => acc?.[k], root);
    if (node && typeof node === 'object' && '$value' in node) {
      const v = node.$value;
      return typeof v === 'string' ? resolveStr(v, root, depth + 1) : String(v);
    }
    return `{${path}}`;
  });
}

const v = (path) =>
  path.split('.').reduce((acc, k) => acc?.[k], raw)?.$value;

const business    = raw.business;
const name        = v('business.name')        || 'projectsites.dev';
const tagline     = v('business.tagline')     || 'Cinematic websites';
const description = v('business.description') || '';
const hue         = String(v('color.brandHue') ?? 240);
const chroma      = String(v('color.brandChroma') ?? 0.18);
const primary     = resolveStr(business ? raw.color.primary.$value : 'oklch(0.62 0.18 240)', raw);
const accent      = resolveStr(raw.color.accent.$value, raw);
const background  = resolveStr(raw.color.background.$value, raw);
const text        = resolveStr(raw.color.text.$value, raw);
const heading     = v('font.heading') || 'Space Grotesk';

const escape = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%"  stop-color="${background}" />
      <stop offset="100%" stop-color="${primary}" stop-opacity="0.15" />
    </linearGradient>
    <radialGradient id="orb1" cx="20%" cy="30%" r="40%">
      <stop offset="0%"  stop-color="${accent}" stop-opacity="0.25" />
      <stop offset="100%" stop-color="${accent}" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="orb2" cx="85%" cy="80%" r="50%">
      <stop offset="0%"  stop-color="${primary}" stop-opacity="0.30" />
      <stop offset="100%" stop-color="${primary}" stop-opacity="0" />
    </radialGradient>
    <pattern id="grid" width="64" height="64" patternUnits="userSpaceOnUse">
      <path d="M 64 0 L 0 0 0 64" fill="none" stroke="${text}" stroke-opacity="0.05" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)" />
  <rect width="1200" height="630" fill="url(#grid)" />
  <rect width="1200" height="630" fill="url(#orb1)" />
  <rect width="1200" height="630" fill="url(#orb2)" />

  <!-- Accent border -->
  <rect x="6" y="6" width="1188" height="618" fill="none" stroke="${accent}" stroke-opacity="0.4" stroke-width="2" rx="20" />

  <!-- Eyebrow chip -->
  <g transform="translate(80, 96)">
    <rect width="260" height="48" rx="24" fill="${accent}" fill-opacity="0.10" stroke="${accent}" stroke-opacity="0.35"/>
    <text x="130" y="31" text-anchor="middle" fill="${accent}" font-family="${heading}, system-ui, sans-serif"
          font-size="16" font-weight="500" letter-spacing="2" text-transform="uppercase">${escape(tagline.toUpperCase())}</text>
  </g>

  <!-- Headline -->
  <text x="80" y="320" fill="${text}"
        font-family="${heading}, system-ui, sans-serif"
        font-size="92" font-weight="800" letter-spacing="-3">${escape(name)}</text>

  <!-- Description -->
  <text x="80" y="400" fill="${text}" fill-opacity="0.65"
        font-family="${heading}, system-ui, sans-serif"
        font-size="28" font-weight="400">
    ${escape(description.length > 88 ? description.slice(0, 85) + '…' : description)}
  </text>

  <!-- Footer brand line -->
  <line x1="80" y1="528" x2="1120" y2="528" stroke="${text}" stroke-opacity="0.10" />
  <text x="80" y="572" fill="${text}" fill-opacity="0.55"
        font-family="${heading}, system-ui, sans-serif"
        font-size="20" font-weight="500" letter-spacing="3" text-transform="uppercase">
    ${escape(v('business.url') ?? 'projectsites.dev')}
  </text>
  <circle cx="1108" cy="566" r="14" fill="${accent}" />
  <circle cx="1078" cy="566" r="14" fill="${primary}" />

  <!-- Brand hue/chroma watermark for debugging -->
  <text x="1120" y="100" text-anchor="end" fill="${text}" fill-opacity="0.18"
        font-family="ui-monospace, monospace" font-size="13">oklch · h ${hue} · c ${chroma}</text>
</svg>
`;

writeFileSync(outSvg, svg);
console.log(`✓ Wrote ${outSvg}`);

if (wantsPng) {
  try {
    const sharp = (await import('sharp')).default;
    await sharp(Buffer.from(svg)).resize(1200, 630).png({ quality: 90 }).toFile(outPng);
    console.log(`✓ Wrote ${outPng}`);
  } catch (err) {
    console.warn(`! Could not write PNG (sharp not installed?). Run \`npm install --no-save sharp\` then retry.`);
    console.warn(`  ${err?.message ?? err}`);
    process.exit(0);
  }
}
