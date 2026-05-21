# Prompt — Add a new section component

Propose (and optionally implement) a new section component that fits the template's architecture.

## Use this when

- The 21 existing sections don't cover a specific need (e.g. event calendar, product configurator)
- You want to formalize a pattern that keeps recurring across sites
- You're extending the template for a specific industry not yet covered

## The prompt

--- PROMPT START ---

You add new section components to `projectsites-template@3.1.0`. Your job is to:

1. Confirm the new component is genuinely needed (not already covered)
2. Design its TypeScript props
3. Implement it following the conventions in `src/components/sections/AGENTS.md`
4. Export it from `src/components/sections/index.ts`
5. Document it in `docs/COMPONENTS.md`
6. Add it to `public/llms-full.txt`

## Input

A description of the section need, e.g.:

> "We need a class schedule grid for a yoga studio — days down the left, hours across the top, classes in the cells with instructor + level."

## Step 1 — Check existing components first

Before inventing, scan whether existing sections cover the need. The 21 components:

```
AnnouncementBanner  — dismissible top banner
BentoGrid           — asymmetric 12-col grid
BlogList            — featured + grid posts
CaseStudyGrid       — work samples with metrics
CodeBlock           — code snippet with copy
Comparison          — feature comparison table
CTASection          — closer block
FAQ                 — FAQPage JSON-LD disclosure widget
FeatureSplit        — image-left/right copy block
HeroCenter, HeroSplit — 2 hero variants
KineticHeadline     — scroll-driven variable-font headline
LogoCloud           — partner logos (marquee/grid)
Marquee             — infinite scroller
Newsletter          — signup with inline/bar variants
Pricing             — 3-tier table with monthly/yearly
ProcessSteps        — numbered "how it works"
Stats               — animated count-up rollup
Tabs                — accessible WAI-ARIA tabs
TeamGrid            — Person JSON-LD member cards
Timeline            — vertical/horizontal events
VideoEmbed          — privacy-first lazy video
```

Decision tree:

```
If the need is...                          → Use this
─────────────────────────────────────────────────────
Grid of features with hierarchy            BentoGrid
Tabular comparison                          Comparison
Stepped process                             ProcessSteps
Image + copy + bullets                      FeatureSplit
Code samples                                CodeBlock
Tabbed views                                Tabs
Date-based events list                      Timeline
Side-by-side variants                       Tabs OR Comparison
Photo gallery                               Use the auto Lightbox (just <img> tags)
```

If the need fits an existing component with a small extension, propose extending it (e.g. add `variant: 'grid' | 'list' | 'compact'` to an existing component) rather than inventing a new one.

If the need is genuinely new, proceed to Step 2.

## Step 2 — Design the TypeScript shape

Define the props interface:

```ts
export interface MyNewItem {
  // data shape — one per element
  id: string;
  // …fields specific to the section…
}

interface Props {
  /** Catalog of items to render. */
  items: MyNewItem[];
  /** Standard section-header props (these are always available). */
  eyebrow?: string;
  headline?: string;
  description?: string;
  /** …component-specific props… */
  className?: string;
}
```

Constraints:

- Item shape must be JSON-serializable (no functions, no React nodes in arrays)
- Component-specific props go BETWEEN the data prop and `className`
- Provide good defaults so the minimum-viable usage is one line

## Step 3 — Implement following the AGENTS.md skeleton

```tsx
import { /* lucide icons */ } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface MyNewItem {
  id: string;
  /* … */
}

interface Props {
  items: MyNewItem[];
  eyebrow?: string;
  headline?: string;
  description?: string;
  className?: string;
}

/**
 * 1-3 sentence JSDoc describing what this section does + when to use it.
 * Mention any JSON-LD it emits.
 */
export function MyNew({ items, eyebrow, headline, description, className }: Props) {
  return (
    <section className={cn('py-24 md:py-32 max-w-container-wide mx-auto px-6', className)}>
      {(eyebrow || headline) && (
        <div className="text-center mb-12 reveal-on-view">
          {eyebrow && <span className="text-accent text-sm font-mono tracking-widest uppercase">{eyebrow}</span>}
          {headline && <h2 className="text-3xl md:text-5xl font-bold font-heading mt-4 mb-4 text-text">{headline}</h2>}
          {description && <p className="text-text-muted max-w-2xl mx-auto">{description}</p>}
        </div>
      )}
      {/* …content… */}
    </section>
  );
}

export default MyNew;
```

Apply these hard rules from `src/components/sections/AGENTS.md`:

- Outer `<section>` not `<div>`
- Centered on container (`max-w-container-wide mx-auto px-6`)
- Tailwind tokens only — never hex
- Reveal items via `.reveal-on-view` class
- `min-h-[44px]` on interactive elements (WCAG 2.5.8)
- `loading="lazy"` on every `<img>` except LCP
- Reduced-motion-safe — no JS animation that bypasses `prefers-reduced-motion`
- TypeScript strict — no `any`, no `@ts-ignore`

## Step 4 — Re-export

Add to `src/components/sections/index.ts`:

```ts
export { MyNew, type MyNewItem } from './MyNew';
```

Sort alphabetically with other exports.

## Step 5 — Document

### `docs/COMPONENTS.md` — append a section

```markdown
### MyNew

One-line description.

\`\`\`tsx
<MyNew
  eyebrow="..."
  headline="..."
  items={[
    { id: '1', /* ... */ },
  ]}
/>
\`\`\`

| Prop | Type | Required | Default |
| --- | --- | --- | --- |
| `items` | `MyNewItem[]` | yes | — |
| `eyebrow` | string | no | — |
| `headline` | string | no | — |
| `description` | string | no | — |
| `className` | string | no | — |
```

### `public/llms-full.txt` — add to component table + section reference list

### `docs/AI_GUIDE.md` — if it changes the section decision tree, add a row

## Step 6 — Test

```bash
npm run typecheck   # must pass
npm run build       # must pass
npm run dev         # smoke test
```

If you wrote ≥10 lines of non-trivial logic (e.g. keyboard navigation, state management), add a Vitest test in `tests/unit/`.

## Output schema

Return:

```
=== Decision ===
{ "needed": true | false, "alternativeUsingExisting": "...(if needed:false)..." }

=== Proposed component file ===
[only if needed:true — full src/components/sections/MyNew.tsx content]

=== index.ts patch ===
[only if needed:true — the export line to add]

=== Docs patch ===
[only if needed:true — the section to append to docs/COMPONENTS.md]

=== llms-full.txt patch ===
[only if needed:true — the row to add]

=== Verification ===
- Confirms TypeScript shape compiles
- Confirms outer <section>, container, Tailwind tokens, reveal class, min-h-[44px], lazy images
- States whether tests needed
```

## Worked example

Input: `"I need a course / class schedule grid for a yoga studio. Days down the left, time slots across the top, class cells with instructor + level + duration."`

Output:

```
=== Decision ===
{ "needed": true, "alternativeUsingExisting": null }

Reason: No existing section handles a 2D grid of time-keyed items. BentoGrid is asymmetric; Tabs is single-axis; Timeline is linear.

=== Proposed component file ===

[full ClassSchedule.tsx with: ScheduleItem type {id, day, time, title, instructor, level, duration, href?, fullCapacity?}, CSS grid laying out a 7-col × N-row table, mobile fallback to vertical "by day" list]

=== index.ts patch ===

export { ClassSchedule, type ScheduleItem } from './ClassSchedule';

=== Docs patch ===

### ClassSchedule

2D weekly schedule grid for yoga studios, gyms, dance schools.

...

=== llms-full.txt patch ===

| ClassSchedule | Weekly schedule grid for studios/gyms | container-wide | — |

=== Verification ===

- TypeScript compiles
- Outer <section> ✓
- max-w-container-wide ✓
- Tailwind tokens ✓
- min-h-[44px] on clickable cells ✓
- Mobile fallback ≤ 768px ✓
- Tests recommended for the day/time sort logic — added stub in tests/unit/ClassSchedule.test.ts
```

## Output strictly

Follow the schema above. No prose preamble.

--- USER REQUEST BEGINS ---

[append the description of the section you want to add]

--- USER REQUEST ENDS ---

--- PROMPT END ---
