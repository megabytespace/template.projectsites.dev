export interface AltAsset {
  src: string;
  alt: string;
  caption?: string;
  context?: string;
}

export function dedupeAltText<T extends AltAsset>(assets: T[]): T[] {
  const seen = new Map<string, number>();
  return assets.map((a) => {
    const base = (a.alt || '').trim();
    if (!base) {
      return { ...a, alt: deriveAltFromSrc(a.src) };
    }
    const key = base.toLowerCase();
    const count = seen.get(key) ?? 0;
    seen.set(key, count + 1);
    if (count === 0) return a;
    const suffix = a.caption ?? a.context ?? `image ${count + 1}`;
    return { ...a, alt: `${base} — ${suffix}` };
  });
}

export function findDuplicateAlts<T extends AltAsset>(assets: T[]): string[] {
  const seen = new Map<string, number>();
  const dupes = new Set<string>();
  for (const a of assets) {
    const k = (a.alt || '').trim().toLowerCase();
    if (!k) continue;
    seen.set(k, (seen.get(k) ?? 0) + 1);
    if ((seen.get(k) ?? 0) > 1) dupes.add(k);
  }
  return Array.from(dupes);
}

function deriveAltFromSrc(src: string): string {
  const file = src.split('/').pop() ?? src;
  const base = file.replace(/\.[a-z0-9]+$/i, '');
  return base
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
