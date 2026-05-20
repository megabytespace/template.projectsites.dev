/**
 * Tests the Zod schema + soft lints used by `npm run validate:brand`.
 *
 * Validates:
 *   - All 9 industry presets pass the schema
 *   - The default _brand.json passes the schema
 *   - Placeholder strings produce soft warnings (not errors)
 *   - Out-of-range hue / chroma produces warnings
 */
import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { brandSchema, validateBrand, lintBrand } from '@/brandSchema';

const repoRoot = resolve(__dirname, '../..');

describe('brand schema', () => {
  it('accepts the default _brand.json', () => {
    const raw = JSON.parse(readFileSync(resolve(repoRoot, '_brand.json'), 'utf8'));
    expect(() => brandSchema.parse(raw)).not.toThrow();
  });

  it('accepts every industry preset', () => {
    const presets = readdirSync(resolve(repoRoot, 'examples'))
      .filter((f) => f.startsWith('_brand.') && f.endsWith('.json'));

    expect(presets.length).toBeGreaterThanOrEqual(9);

    for (const file of presets) {
      const raw = JSON.parse(readFileSync(resolve(repoRoot, 'examples', file), 'utf8'));
      const result = brandSchema.safeParse(raw);
      if (!result.success) {
        const errors = result.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('\n');
        throw new Error(`Preset ${file} failed schema:\n${errors}`);
      }
    }
  });

  it('rejects a brand missing required fields', () => {
    const broken = { business: { name: { $value: 'x' } } };
    expect(() => brandSchema.parse(broken)).toThrow();
  });

  it('rejects unknown top-level keys (strict mode)', () => {
    const raw = JSON.parse(readFileSync(resolve(repoRoot, '_brand.json'), 'utf8'));
    raw.unexpectedTopKey = { $value: 'x' };
    expect(() => brandSchema.parse(raw)).toThrow();
  });
});

describe('lintBrand soft warnings', () => {
  it('flags unsubstituted placeholders in business fields', () => {
    const raw = JSON.parse(readFileSync(resolve(repoRoot, '_brand.json'), 'utf8'));
    const warnings = lintBrand(raw);
    // The default ships with `{BUSINESS_NAME}` etc. — expect warnings
    expect(warnings.some((w) => w.key.startsWith('business.') && /placeholder/.test(w.message))).toBe(true);
  });

  it('flags out-of-range brandHue', () => {
    const raw = JSON.parse(readFileSync(resolve(repoRoot, '_brand.json'), 'utf8'));
    raw.color.brandHue.$value = '999';
    const warnings = lintBrand(raw);
    expect(warnings.some((w) => w.key === 'color.brandHue')).toBe(true);
  });

  it('flags out-of-range brandChroma', () => {
    const raw = JSON.parse(readFileSync(resolve(repoRoot, '_brand.json'), 'utf8'));
    raw.color.brandChroma.$value = '0.99';
    const warnings = lintBrand(raw);
    expect(warnings.some((w) => w.key === 'color.brandChroma')).toBe(true);
  });

  it('does not flag a fully-customized SaaS preset for business placeholders', () => {
    const raw = JSON.parse(readFileSync(resolve(repoRoot, 'examples/_brand.saas.json'), 'utf8'));
    const warnings = lintBrand(raw);
    const placeholderWarnings = warnings.filter((w) => /placeholder/.test(w.message));
    expect(placeholderWarnings).toHaveLength(0);
  });
});

describe('validateBrand', () => {
  it('returns { brand, warnings } for valid input', () => {
    const raw = JSON.parse(readFileSync(resolve(repoRoot, 'examples/_brand.saas.json'), 'utf8'));
    const { brand, warnings } = validateBrand(raw);
    expect(brand).toBeDefined();
    expect(Array.isArray(warnings)).toBe(true);
  });

  it('throws on schema mismatch', () => {
    expect(() => validateBrand({ business: { name: 'wrong shape' } })).toThrow();
  });
});
