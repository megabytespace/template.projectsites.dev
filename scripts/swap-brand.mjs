#!/usr/bin/env node
/**
 * Swap `_brand.json` for one of the industry presets in `examples/`.
 *
 *   node scripts/swap-brand.mjs                # interactive — lists presets
 *   node scripts/swap-brand.mjs saas           # swap to SaaS preset
 *   node scripts/swap-brand.mjs restaurant     # swap to restaurant preset
 *
 * Backs up the current `_brand.json` to `_brand.backup.json` before overwriting.
 * Validates the new preset before swapping. Fails safely on invalid presets.
 */
import { readFileSync, writeFileSync, readdirSync, existsSync, copyFileSync } from 'node:fs';
import { resolve, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
import { createInterface } from 'node:readline';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot  = resolve(__dirname, '..');
const examplesDir = resolve(repoRoot, 'examples');
const brandPath = resolve(repoRoot, '_brand.json');
const backupPath = resolve(repoRoot, '_brand.backup.json');

function listPresets() {
  return readdirSync(examplesDir)
    .filter((f) => f.startsWith('_brand.') && f.endsWith('.json'))
    .map((f) => basename(f, '.json').replace(/^_brand\./, ''))
    .sort();
}

async function pickInteractive(presets) {
  console.log('Available brand presets:\n');
  presets.forEach((p, i) => console.log(`  ${i + 1}.  ${p}`));
  console.log();

  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const answer = await new Promise((res) => rl.question('Pick a preset (number or name): ', res));
  rl.close();

  const trimmed = answer.trim();
  const byNum = parseInt(trimmed, 10);
  if (!Number.isNaN(byNum) && byNum >= 1 && byNum <= presets.length) {
    return presets[byNum - 1];
  }
  if (presets.includes(trimmed)) return trimmed;
  console.error(`✗ Not a valid preset: "${trimmed}"`);
  process.exit(1);
}

const presets = listPresets();
if (presets.length === 0) {
  console.error('✗ No presets found in examples/');
  process.exit(1);
}

let target = process.argv[2];
if (!target) {
  target = await pickInteractive(presets);
} else if (!presets.includes(target)) {
  console.error(`✗ Unknown preset: "${target}"`);
  console.error(`  Available: ${presets.join(', ')}`);
  process.exit(1);
}

const presetPath = resolve(examplesDir, `_brand.${target}.json`);

// Validate the preset before swapping.
console.log(`\n→ Validating preset "${target}"…`);
try {
  execSync(`node ${resolve(__dirname, 'validate-brand.mjs')} ${presetPath}`, { stdio: 'inherit' });
} catch {
  console.error(`✗ Preset "${target}" failed validation. Aborting swap.`);
  process.exit(1);
}

// Backup current _brand.json if it exists.
if (existsSync(brandPath)) {
  copyFileSync(brandPath, backupPath);
  console.log(`\n→ Backed up current _brand.json → _brand.backup.json`);
}

// Copy preset → _brand.json.
const presetContent = readFileSync(presetPath, 'utf8');
writeFileSync(brandPath, presetContent);
console.log(`→ Swapped to "${target}" preset.\n`);

console.log('Next steps:');
console.log('  1. Edit _brand.json — replace placeholder business name, URL, email, phone, etc.');
console.log('  2. npm run dev   # smoke test in the browser');
console.log('  3. npm run build # verify production build still passes');
console.log();
console.log('To restore previous brand: mv _brand.backup.json _brand.json');
