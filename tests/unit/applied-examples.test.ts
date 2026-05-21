/**
 * Locks the worked examples in `examples/applied/` against regression.
 *
 * For every applied example, verifies:
 *   1. `_brand.json` parses + passes the Zod schema
 *   2. `_brand.json` produces ZERO soft-lint warnings (the prompt's Step 6 gate)
 *   3. No real `{PLACEHOLDER}` strings in any `.tsx.snippet.tsx` file
 *   4. No banned slop words in any `.tsx.snippet.tsx` file
 *   5. Has the canonical file set: `_brand.json`, `Home.tsx.snippet.tsx`,
 *      `VERIFICATION.md`, `README.md`
 *
 * Any future template change that breaks an applied example's brand schema,
 * or any future copy edit that introduces a banned word, will fail CI.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { brandSchema, lintBrand } from '@/brandSchema';

const repoRoot = resolve(__dirname, '../..');
const appliedDir = resolve(repoRoot, 'examples/applied');

const exampleDirs = readdirSync(appliedDir).filter((name) =>
  statSync(join(appliedDir, name)).isDirectory(),
);

// Real-placeholder regex — requires ≥1 uppercase letter inside braces.
// This excludes JSX numeric expressions like `{24}` and CSS aliases.
const PLACEHOLDER_RE = /\{[A-Z][A-Z_0-9]+\}/g;

const BANNED_WORDS = [
  'limitless','revolutionize','game-changing','cutting-edge','next-generation',
  'world-class','best-in-class','turnkey','synergy','disrupt','empower','seamless',
  'robust','scalable','leverage','utilize','facilitate','innovative','state-of-the-art',
  'paradigm','holistic','harness','foster','bolster','spearhead','delve','tapestry',
  'landscape','ecosystem','elevate','streamline','cornerstone','pivotal','myriad',
  'plethora','supercharge','unleash','unlock','transform','reimagine','redefine',
  'transcend','boundless',
];
const BANNED_RE = new RegExp(`\\b(${BANNED_WORDS.join('|')})\\b`, 'gi');

describe('applied worked examples', () => {
  it('finds at least 5 example directories', () => {
    expect(exampleDirs.length).toBeGreaterThanOrEqual(5);
  });

  describe.each(exampleDirs)('%s', (dir) => {
    const dirPath = join(appliedDir, dir);
    const brandPath = join(dirPath, '_brand.json');

    it('has the canonical file set', () => {
      expect(existsSync(brandPath), `${dir}: missing _brand.json`).toBe(true);
      expect(existsSync(join(dirPath, 'README.md')), `${dir}: missing README.md`).toBe(true);
      expect(existsSync(join(dirPath, 'VERIFICATION.md')), `${dir}: missing VERIFICATION.md`).toBe(true);

      const tsxFiles = readdirSync(dirPath).filter((f) => f.endsWith('.tsx'));
      expect(tsxFiles.length, `${dir}: needs ≥1 .tsx snippet`).toBeGreaterThan(0);
    });

    it('_brand.json passes the Zod schema', () => {
      const raw = JSON.parse(readFileSync(brandPath, 'utf8'));
      const result = brandSchema.safeParse(raw);
      if (!result.success) {
        const errors = result.error.issues
          .map((i) => `${i.path.join('.')}: ${i.message}`)
          .join('\n');
        throw new Error(`${dir}/_brand.json failed schema:\n${errors}`);
      }
    });

    it('_brand.json produces ZERO soft-lint warnings (Step 6 gate)', () => {
      const raw = JSON.parse(readFileSync(brandPath, 'utf8'));
      const warnings = lintBrand(raw);
      expect(warnings, `${dir} has lint warnings: ${JSON.stringify(warnings, null, 2)}`).toEqual([]);
    });

    it('no real {PLACEHOLDER} strings in .tsx snippets', () => {
      const tsxFiles = readdirSync(dirPath).filter((f) => f.endsWith('.tsx'));
      const violations: string[] = [];

      for (const file of tsxFiles) {
        const text = readFileSync(join(dirPath, file), 'utf8');
        const matches = text.match(PLACEHOLDER_RE) ?? [];
        if (matches.length > 0) {
          violations.push(`${file}: ${[...new Set(matches)].join(', ')}`);
        }
      }

      expect(violations, `${dir} has unsubstituted placeholders:\n${violations.join('\n')}`).toEqual([]);
    });

    it('no banned slop words in .tsx snippets', () => {
      const tsxFiles = readdirSync(dirPath).filter((f) => f.endsWith('.tsx'));
      const violations: string[] = [];

      for (const file of tsxFiles) {
        const text = readFileSync(join(dirPath, file), 'utf8');
        const matches = text.match(BANNED_RE) ?? [];
        if (matches.length > 0) {
          violations.push(`${file}: "${[...new Set(matches.map((m) => m.toLowerCase()))].join('", "')}"`);
        }
      }

      expect(violations, `${dir} has banned words:\n${violations.join('\n')}`).toEqual([]);
    });
  });
});
