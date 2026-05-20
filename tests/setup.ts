/**
 * Vitest setup — runs before every test file.
 *
 * Provides jsdom polyfills that the brand resolver expects:
 *   - matchMedia (called by Lightbox / cursor.ts / animations)
 *   - IntersectionObserver
 *   - PointerEvent
 */
import '@testing-library/jest-dom/vitest';

if (typeof window !== 'undefined') {
  if (!window.matchMedia) {
    window.matchMedia = (query: string) =>
      ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => true,
      }) as MediaQueryList;
  }

  if (!('IntersectionObserver' in window)) {
    // @ts-expect-error — jsdom polyfill
    window.IntersectionObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  }
}
