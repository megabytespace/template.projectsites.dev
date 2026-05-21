#!/usr/bin/env node
/**
 * Prompt-evals — score every worked example in `examples/applied/` against
 * the 7 gates from `PROMPT.md` Step 6 (sanity check).
 *
 *   npm run prompt-evals                # text report
 *   npm run prompt-evals -- --json      # JSON for CI / dashboards
 *   npm run prompt-evals -- --fail-fast # exit 1 on first failure
 *
 * Gates checked per example:
 *   G1 — Schema valid (Zod brandSchema.parse passes)
 *   G2 — Zero soft-lint warnings (placeholder strings, range violations)
 *   G3 — No real `{PLACEHOLDER}` strings in .tsx snippets
 *   G4 — No banned slop words in .tsx snippets
 *   G5 — Hero subheadline in target word range (15-25)
 *   G6 — Description length 120-156 chars (or empty)
 *   G7 — Has the canonical file set
 *
 * Score: 7/7 = perfect · 5-6/7 = needs-pass · ≤4/7 = major-rewrite
 *
 * This is the institutional version of the "Self-verification block" at the
 * end of every PROMPT.md run. It walks every applied example and reports
 * whether the prompt's protocol is holding.
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { resolve, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { z } from 'zod';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '..');
const appliedDir = resolve(repoRoot, 'examples/applied');

const wantJson     = process.argv.includes('--json');
const failFast     = process.argv.includes('--fail-fast');

// ─────────────────────────────────────────────────────────
// Schema (re-implemented inline; canonical source: src/brandSchema.ts)
// ─────────────────────────────────────────────────────────

const tokenString      = z.object({ $value: z.string(), $type: z.string().optional(), $description: z.string().optional() });
const tokenNumber      = z.object({ $value: z.union([z.number(), z.string()]), $type: z.string().optional(), $description: z.string().optional() });
const tokenBool        = z.object({ $value: z.boolean(), $type: z.string().optional(), $description: z.string().optional() });
const tokenNumberArray = z.object({ $value: z.array(z.number()), $type: z.string().optional(), $description: z.string().optional() });

const businessClassEnum = z.enum(['storefront','restaurant','medical','retail','salon','gym','auto-repair','saas','portfolio','nonprofit','legal','organization']);
const colorSchemeEnum   = z.enum(['dark','light','auto']);

const brandSchema = z.object({
  $schema: z.string().optional(),
  $description: z.string().optional(),
  business: z.object({
    name: tokenString, shortName: tokenString, tagline: tokenString,
    description: tokenString, url: tokenString,
    businessClass: z.object({ $value: z.union([businessClassEnum, z.string()]), $type: z.string().optional(), $description: z.string().optional() }),
    email: tokenString, phone: tokenString, address: tokenString, hours: tokenString,
  }),
  color: z.object({
    brandHue: tokenNumber, brandChroma: tokenNumber,
    primary: tokenString, primaryHover: tokenString,
    accent: tokenString, accentHover: tokenString,
    background: tokenString, surface: tokenString, surfaceElevated: tokenString,
    border: tokenString, text: tokenString, textMuted: tokenString, textSubtle: tokenString,
    success: tokenString, warning: tokenString, danger: tokenString, info: tokenString,
  }).catchall(tokenString),
  colorScheme: z.object({ $value: z.union([colorSchemeEnum, z.string()]), $type: z.string().optional(), $description: z.string().optional() }),
  font: z.object({ heading: tokenString, body: tokenString, mono: tokenString, weights: tokenNumberArray, fluidScale: tokenString }),
  radius:  z.object({ $description: z.string().optional() }).catchall(tokenString),
  spacing: z.object({ $description: z.string().optional() }).catchall(tokenString),
  shadow:  z.object({ $description: z.string().optional() }).catchall(tokenString),
  motion:  z.object({ easing: tokenString, duration: z.object({ fast: tokenString, base: tokenString, slow: tokenString, scroll: tokenString }) }),
  layout:  z.object({ containerWide: tokenString, containerNormal: tokenString, containerProse: tokenString }),
  social:  z.object({ $description: z.string().optional() }).catchall(tokenString),
  features:z.object({ $description: z.string().optional() }).catchall(tokenBool),
}).strict();

const BANNED_WORDS = [
  'limitless','revolutionize','game-changing','cutting-edge','next-generation','world-class','best-in-class',
  'turnkey','synergy','disrupt','empower','seamless','robust','scalable','leverage','utilize','facilitate',
  'innovative','state-of-the-art','paradigm','holistic','harness','foster','bolster','spearhead','delve',
  'tapestry','landscape','ecosystem','elevate','streamline','cornerstone','pivotal','myriad','plethora',
  'supercharge','unleash','unlock','transform','reimagine','redefine','transcend','boundless',
];
const BANNED_RE = new RegExp(`\\b(${BANNED_WORDS.join('|')})\\b`, 'gi');

const PLACEHOLDER_RE = /\{[A-Z][A-Z_0-9]+\}/g;

// ─────────────────────────────────────────────────────────
// Per-example scoring
// ─────────────────────────────────────────────────────────

function scoreExample(dirName) {
  const dir = join(appliedDir, dirName);
  const result = {
    example: dirName,
    score: 0,
    gates: {},
    issues: [],
  };

  // G7 — file set
  const hasBrand = existsSync(join(dir, '_brand.json'));
  const hasReadme = existsSync(join(dir, 'README.md'));
  const hasVerification = existsSync(join(dir, 'VERIFICATION.md'));
  const tsxFiles = existsSync(dir) ? readdirSync(dir).filter((f) => f.endsWith('.tsx')) : [];
  const fileSetOk = hasBrand && hasReadme && hasVerification && tsxFiles.length > 0;
  result.gates.G7_fileSet = fileSetOk;
  if (!fileSetOk) result.issues.push(`G7: Missing canonical files (brand=${hasBrand}, readme=${hasReadme}, verif=${hasVerification}, tsx=${tsxFiles.length})`);

  if (!hasBrand) {
    return result;
  }

  // G1 — schema valid
  let brand;
  try {
    const raw = JSON.parse(readFileSync(join(dir, '_brand.json'), 'utf8'));
    const r = brandSchema.safeParse(raw);
    result.gates.G1_schemaValid = r.success;
    if (!r.success) {
      result.issues.push(`G1: ${r.error.issues.length} schema errors`);
      return result;
    }
    brand = r.data;
  } catch (err) {
    result.gates.G1_schemaValid = false;
    result.issues.push(`G1: ${err.message}`);
    return result;
  }

  // G2 — zero soft-lint warnings
  const warnings = lintBrandInline(brand);
  result.gates.G2_zeroWarnings = warnings.length === 0;
  if (warnings.length > 0) {
    result.issues.push(`G2: ${warnings.length} soft warnings: ${warnings.map((w) => w.key).join(', ')}`);
  }

  // G3 — no real placeholders in .tsx
  const placeholderHits = [];
  for (const file of tsxFiles) {
    const text = readFileSync(join(dir, file), 'utf8');
    const hits = [...new Set(text.match(PLACEHOLDER_RE) ?? [])];
    if (hits.length > 0) placeholderHits.push(`${file}: ${hits.join(', ')}`);
  }
  result.gates.G3_noPlaceholders = placeholderHits.length === 0;
  if (placeholderHits.length > 0) result.issues.push(`G3: placeholders → ${placeholderHits.join('; ')}`);

  // G4 — no banned slop
  const slopHits = [];
  for (const file of tsxFiles) {
    const text = readFileSync(join(dir, file), 'utf8');
    const hits = [...new Set((text.match(BANNED_RE) ?? []).map((m) => m.toLowerCase()))];
    if (hits.length > 0) slopHits.push(`${file}: "${hits.join('", "')}"`);
  }
  result.gates.G4_noBannedSlop = slopHits.length === 0;
  if (slopHits.length > 0) result.issues.push(`G4: banned → ${slopHits.join('; ')}`);

  // G5 — hero subheadline 15-25 words
  let subWords = 0;
  for (const file of tsxFiles) {
    const text = readFileSync(join(dir, file), 'utf8');
    // Match `subheadline="..."` or `subheadline='...'`. Use double-quoted first.
    // Important: don't match `[^"']+` which would terminate the double-quoted
    // capture at an apostrophe inside the value (e.g. "you're").
    const m = text.match(/subheadline="([^"]+)"/) || text.match(/subheadline='([^']+)'/);
    if (m) {
      subWords = m[1].split(/\s+/).filter(Boolean).length;
      break;
    }
  }
  result.gates.G5_subheadlineLength = subWords === 0 || (subWords >= 15 && subWords <= 25);
  if (!result.gates.G5_subheadlineLength && subWords > 0) {
    result.issues.push(`G5: subheadline ${subWords} words (target 15-25)`);
  }

  // G6 — description length 120-156 chars
  const desc = brand.business.description.$value;
  result.gates.G6_descriptionLength = !desc || (desc.length >= 120 && desc.length <= 156);
  if (!result.gates.G6_descriptionLength) {
    result.issues.push(`G6: description ${desc.length} chars (target 120-156)`);
  }

  // Score = passing gates / 7
  result.score = Object.values(result.gates).filter(Boolean).length;
  return result;
}

function lintBrandInline(brand) {
  const warnings = [];
  for (const [k, v] of Object.entries(brand.business)) {
    if (typeof v.$value === 'string' && /^\{[A-Z_0-9]+\}$/.test(v.$value)) {
      warnings.push({ key: `business.${k}`, message: `placeholder` });
    }
  }
  const hue = Number(brand.color.brandHue.$value);
  if (Number.isFinite(hue) && (hue < 0 || hue > 360)) {
    warnings.push({ key: 'color.brandHue', message: 'out of range' });
  }
  const chroma = Number(brand.color.brandChroma.$value);
  if (Number.isFinite(chroma) && (chroma < 0 || chroma > 0.4)) {
    warnings.push({ key: 'color.brandChroma', message: 'out of range' });
  }
  const desc = brand.business.description.$value;
  if (typeof desc === 'string' && !desc.startsWith('{') && (desc.length < 50 || desc.length > 200)) {
    warnings.push({ key: 'business.description', message: `length ${desc.length}` });
  }
  return warnings;
}

// ─────────────────────────────────────────────────────────
// Run
// ─────────────────────────────────────────────────────────

const dirs = readdirSync(appliedDir).filter((n) => statSync(join(appliedDir, n)).isDirectory());

const reports = dirs.map(scoreExample);

const totalGates  = reports.length * 7;
const passedGates = reports.reduce((sum, r) => sum + r.score, 0);
const passRate    = totalGates > 0 ? Math.round((passedGates / totalGates) * 100) : 0;
const failingExamples = reports.filter((r) => r.score < 7);

if (wantJson) {
  console.log(JSON.stringify({ summary: { examples: reports.length, totalGates, passedGates, passRate }, reports }, null, 2));
  process.exit(failingExamples.length === 0 ? 0 : 1);
}

const green = (s) => `\x1b[32m${s}\x1b[0m`;
const red   = (s) => `\x1b[31m${s}\x1b[0m`;
const dim   = (s) => `\x1b[2m${s}\x1b[0m`;
const bold  = (s) => `\x1b[1m${s}\x1b[0m`;

console.log(bold('\nProjectSites — Prompt Evals'));
console.log(dim('Scoring every example in examples/applied/ against PROMPT.md Step 6 gates.\n'));

for (const r of reports) {
  const score = `${r.score}/7`;
  const colored = r.score === 7 ? green(score) : red(score);
  console.log(`  ${colored}  ${r.example}`);
  if (r.issues.length > 0) {
    for (const issue of r.issues) console.log(dim(`         ${issue}`));
  }
}

console.log('');
console.log(bold(`Summary: ${passedGates}/${totalGates} gates pass (${passRate}%)  ·  ${reports.length} examples scored`));

if (failingExamples.length === 0) {
  console.log(green('✓ All examples pass every gate.\n'));
  process.exit(0);
} else {
  console.log(red(`✗ ${failingExamples.length} example(s) below 7/7.\n`));
  if (failFast) process.exit(1);
  process.exit(0);
}
