# Accessibility (WCAG 2.2 AA)

The template targets WCAG 2.2 AA compliance. This file documents what's built in, what you must verify per site, and the legal deadlines.

## What's built in

| Feature | File | WCAG criterion |
| --- | --- | --- |
| Skip-to-main link | `src/components/SkipLink.tsx` | 2.4.1 Bypass Blocks |
| Single `<h1>` per page | `src/pages/*.tsx` | 2.4.6 Headings + 1.3.1 Info & Relationships |
| Focus rings via `:focus-visible` | `src/index.css` `:root` | 2.4.7 Focus Visible + 2.4.11 Focus Appearance |
| 44px touch targets (CTAs, nav, mobile menu button) | `src/components/Header.tsx`, `Button.tsx` | 2.5.8 Target Size |
| `aria-current="page"` on active nav link | `Header.tsx`, `Footer.tsx` | 4.1.2 Name, Role, Value |
| `aria-expanded` + `aria-controls` on mobile menu + FAQ | `Header.tsx`, `FAQ.tsx` | 4.1.2 |
| `aria-modal` + focus trap on Cmd+K palette | `CommandPalette.tsx` | 2.4.3 Focus Order |
| Esc returns focus to trigger | `CommandPalette.tsx` | 2.4.3 |
| `prefers-reduced-motion` kills all animation | `src/index.css` | 2.3.3 Animation from Interactions |
| `text-wrap: balance` on headings, `pretty` on body | `src/index.css` | 1.4.12 Text Spacing |
| `color-scheme` meta + per-mode `theme-color` | `index.html` | UA harmonization |
| Lightbox keyboard nav (Esc / Tab / ←→) | `src/components/Lightbox.tsx` (PhotoSwipe) | 2.1.1 Keyboard |
| Form labels visible + linked | `src/pages/Contact.tsx`, `Newsletter.tsx` | 1.3.1 + 3.3.2 Labels or Instructions |
| Skip-link first focus order | `Layout.tsx` (mounted before Header) | 2.4.3 Focus Order |
| Underline-on-hover for all links | `src/index.css` `.underline-hover` | 1.4.1 Use of Color |
| Accessibility statement page | `src/pages/Accessibility.tsx` | required by ADA Title II |

## What you MUST verify per site

These can't be guaranteed by the template — they depend on per-site content.

### Images

- [ ] **Every `<img>` has `alt`** — descriptive, never `alt=""` unless purely decorative
- [ ] **Decorative images** have `alt=""` AND `aria-hidden="true"`
- [ ] **Functional images** (icons in buttons) have `aria-label` on the parent button
- [ ] **Same alt text** across multiple images? Use `src/lib/altText.ts` `dedupeAltText()` to disambiguate

### Color contrast

- [ ] **Body text on background** ≥ 4.5:1
- [ ] **Large text** (24px+, or 18.6px+ bold) ≥ 3.0:1
- [ ] **UI elements** (buttons, form borders, focus rings) ≥ 3.0:1 against adjacent colors
- [ ] **Test in both themes** — light mode contrast can differ from dark

Test with Chrome DevTools → Inspect → "Color contrast" or `axe DevTools Pro`.

### Heading hierarchy

- [ ] **One `<h1>` per page** (already enforced by template pattern — verify per page)
- [ ] **No skipped levels** (don't go `<h1>` → `<h3>`; use `<h2>` in between)
- [ ] **Section eyebrows are `<span>`, not `<h2>`** — they're not real headings

### Forms

- [ ] **Every input has a `<label>`** (visible or `sr-only` with `htmlFor`)
- [ ] **`autocomplete` attribute set** on email, name, phone, address (3.3.7 Redundant Entry)
- [ ] **`inputmode` for numeric inputs** — speeds up mobile keyboards
- [ ] **Error messages** are specific and actionable, not "Error 409"
- [ ] **Required fields** marked with `aria-required="true"` AND visible `*` or "Required"
- [ ] **Submit button** has clear label — never just "Submit"

### Keyboard navigation

- [ ] **Every interactive element reachable via Tab** (no `tabindex="-1"` on links/buttons)
- [ ] **No keyboard traps** (Esc always exits modals)
- [ ] **Focus visible at all times** when navigating with Tab
- [ ] **Logical focus order** matches visual order

Test: unplug your mouse and navigate the entire site with keyboard only.

### Motion + animation

- [ ] **`prefers-reduced-motion: reduce` respected** — verified via Chrome DevTools "Emulate CSS prefers-reduced-motion"
- [ ] **No auto-playing video** with sound
- [ ] **Marquees pause on hover** (already built in)
- [ ] **Parallax / scroll-driven effects** zero out under reduced motion
- [ ] **No 3+ flash per second** content (seizure-safe)

## WCAG 2.2 new criteria (added vs 2.1)

| Criterion | Status | How template handles |
| --- | --- | --- |
| 2.4.11 Focus Appearance (AA) | ✅ Auto | 3px accent outline via `:focus-visible` |
| 2.4.12 Focus Not Obscured (Min) (AA) | ⚠️ Manual | Avoid placing modals over focused inputs; verify on per-page basis |
| 2.5.7 Dragging Movements (AA) | ✅ Auto | No drag-only interactions (BeforeAfterSlider has keyboard alternative) |
| 2.5.8 Target Size (Min 24px) (AA) | ✅ Auto | All CTAs ≥44px; nav ≥44px; FAQ buttons ≥44px |
| 3.2.6 Consistent Help (A) | ✅ Auto | Contact link in header + footer on every page |
| 3.3.7 Redundant Entry (A) | ✅ Auto | `autocomplete` on all form fields |
| 3.3.8 Accessible Authentication (Min) (AA) | n/a | No auth in template |
| 3.3.9 Accessible Authentication (Enhanced) (AAA) | n/a | No auth in template |

## ADA legal deadlines

| Entity | Deadline | Standard |
| --- | --- | --- |
| State/local govt, ≥50K population | **April 26, 2027** | WCAG 2.1 AA |
| State/local govt, <50K + special districts | **April 26, 2028** | WCAG 2.1 AA |
| Federal-fund healthcare recipients (HHS §504) | **May 2026** | WCAG 2.1 AA |

The template's WCAG 2.2 AA target exceeds the 2.1 AA legal requirement.

## Testing tools

| Tool | Use |
| --- | --- |
| `@axe-core/playwright` | Automated test in E2E suite |
| Chrome DevTools → Lighthouse | Quick audit per page (target ≥95) |
| Chrome DevTools → Accessibility tree | Inspect ARIA structure |
| Chrome DevTools → "Emulate vision deficiencies" | Test color blindness + low vision |
| VoiceOver (macOS) `Cmd+F5` | Test screen reader on Safari |
| NVDA (Windows, free) | Test screen reader on Firefox/Chrome |
| TalkBack (Android) | Test on real mobile device |

### Running axe automatically

```bash
# In your E2E test setup
npm install -D @axe-core/playwright
```

```ts
// e2e/accessibility.spec.ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('home page has no axe violations', async ({ page }) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
```

Run at all 6 breakpoints (375, 390, 768, 1024, 1280, 1920).

### Manual review checklist

Axe can only catch ~30% of WCAG issues. The rest require human review:

- [ ] **2.4.11 Focus Appearance** — is the focus indicator clearly visible against every possible background?
- [ ] **2.4.12 Focus Not Obscured** — can a sticky header or banner ever cover the focused element?
- [ ] **2.5.7 Dragging** — is every drag-only interaction matched by a click/keyboard alternative?
- [ ] **3.2.6 Consistent Help** — is the contact mechanism in the same location on every page?
- [ ] **3.3.7 Redundant Entry** — does the form auto-fill known info on second submission?
- [ ] **Reading order** — does the screen reader read content in the visual order?
- [ ] **Heading hierarchy** — does the heading outline make sense without seeing the page?

## Accessibility statement

`src/pages/Accessibility.tsx` contains a starter statement. **Customize before shipping:**

- Last-updated date
- Specific accessibility measures (which guidelines, which tools)
- Contact path for accessibility feedback
- Response-time commitment (template says 2 business days)
- Conformance status (full / partial — be honest)

## Reduced motion

The template kills all animation when `prefers-reduced-motion: reduce` is set. Specifically:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  .animate-on-scroll, .reveal, .reveal-on-view { opacity: 1; transform: none; }
}
```

This applies to:

- Scroll-driven kinetic headlines
- Marquees
- Bento tile reveal
- Page transitions (View Transitions API also respects this)
- Click ripple cursor
- Cmd+K open animation

Test: Chrome DevTools → Cmd+Shift+P → "Show Rendering" → Emulate CSS media feature `prefers-reduced-motion`.

## Color blindness

- Don't convey information by color alone — pair with icons, text, or shapes
- Success / warning / danger states pair color with icons (`<Check>`, `<X>`, `<AlertCircle>`)
- Charts: use distinct shapes + patterns, not just color
- Test with Chrome DevTools → "Emulate vision deficiencies" → protanopia / deuteranopia / tritanopia / achromatopsia
