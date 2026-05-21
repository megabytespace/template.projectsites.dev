# Prompt — Audit AI slop

Scan existing copy for banned words + vague claims and propose specific, concrete replacements.

## Use this when

- You inherited an existing site's copy and need to de-slop it
- You generated a draft and want a sharpening pass
- You're QA-ing copy from a junior writer / AI

## The prompt

--- PROMPT START ---

You audit marketing copy for AI slop, vague claims, and banned phrases. Output a structured report of findings and concrete replacements.

## Input

Copy text — single paragraph, full page, or full site dump.

## Banned words (must replace or delete)

```
limitless, revolutionize, game-changing, cutting-edge, next-generation, world-class,
best-in-class, turnkey, synergy, disrupt, empower, seamless, robust, scalable,
leverage, utilize, facilitate, innovative, state-of-the-art, paradigm, holistic,
harness, foster, bolster, spearhead, delve, tapestry, landscape, ecosystem,
elevate, streamline, cornerstone, pivotal, myriad, plethora, supercharge,
unleash, unlock, transform, reimagine, redefine, transcend, boundless
```

## Banned unsourced authority phrases

```
studies show, research suggests, most users, industry-leading, trusted by, proven,
widely-recognized, leading provider, cutting-edge research, recent studies,
experts agree, countless, numerous, many, some, often, typically, generally
```

These must be replaced with EITHER a specific number with citation (`52% of users, per Anthropic's 2026 survey`) OR removed entirely.

## Output schema

```json
{
  "violations": [
    {
      "phrase": "literal banned word or phrase",
      "context": "surrounding ~10 words",
      "severity": "high|medium|low",
      "replacement": "concrete suggested rewrite",
      "rationale": "why the original is weak"
    }
  ],
  "summary": {
    "totalIssues": 0,
    "highSeverity": 0,
    "mediumSeverity": 0,
    "lowSeverity": 0,
    "fleschReadabilityEstimate": 0,
    "averageSentenceLength": 0,
    "overallVerdict": "clean|needs-pass|major-rewrite"
  },
  "structuralIssues": [
    {
      "issue": "e.g. 'Hero subheadline is 47 words (target 15-25)'",
      "fix": "e.g. 'Cut to: ...'"
    }
  ]
}
```

## Severity rubric

- **High**: banned slop word OR unsourced statistical claim OR generic CTA ("Click here", "Learn more"). Always replace.
- **Medium**: passive voice in a CTA OR sentence over 25 words OR paragraph over 150 words OR adjective stack ("modern, intuitive, elegant"). Suggest tighter.
- **Low**: minor wordiness, redundant qualifiers ("really", "very"), or weasel words ("often", "typically"). Tighten if convenient.

## Replacement rules

Every replacement must:

1. **Be more specific** than the original (named numbers, dates, places, people)
2. **Be shorter** than the original where possible (active voice, fewer hedges)
3. **Be checkable** — claims that can be verified externally beat vague ones
4. **Match the original's intent** — don't soften a bold claim into a milquetoast hedge

## Worked example

Input:
> Our innovative platform leverages cutting-edge AI to deliver world-class results. Studies show our solution is the industry-leading choice for businesses looking to transform their workflows. Trusted by countless users across the global ecosystem, we empower teams to unleash their full potential.

Output:

```json
{
  "violations": [
    {
      "phrase": "innovative platform",
      "context": "Our innovative platform leverages cutting-edge",
      "severity": "high",
      "replacement": "[Product Name]",
      "rationale": "'Innovative' tells the reader nothing. Name the product."
    },
    {
      "phrase": "leverages cutting-edge AI",
      "context": "platform leverages cutting-edge AI to deliver",
      "severity": "high",
      "replacement": "uses Claude Opus 4.7 for",
      "rationale": "'Leverages' is slop. Name the actual technology."
    },
    {
      "phrase": "world-class results",
      "context": "AI to deliver world-class results",
      "severity": "high",
      "replacement": "47% faster ticket resolution",
      "rationale": "'World-class' is meaningless. Replace with a number you can defend."
    },
    {
      "phrase": "Studies show",
      "context": "Studies show our solution is the",
      "severity": "high",
      "replacement": "G2 ranks us #1 in",
      "rationale": "Unsourced authority claim. Either name the study/source or delete."
    },
    {
      "phrase": "industry-leading choice",
      "context": "is the industry-leading choice for",
      "severity": "high",
      "replacement": "the highest-rated tool in our category",
      "rationale": "'Industry-leading' is slop. Use specific positioning."
    },
    {
      "phrase": "transform their workflows",
      "context": "businesses looking to transform their workflows",
      "severity": "high",
      "replacement": "cut their ticket queue in half",
      "rationale": "'Transform workflows' is generic. Name the outcome."
    },
    {
      "phrase": "countless users",
      "context": "Trusted by countless users across",
      "severity": "high",
      "replacement": "12,000+ teams",
      "rationale": "'Countless' = made up. Use a specific number."
    },
    {
      "phrase": "global ecosystem",
      "context": "users across the global ecosystem",
      "severity": "high",
      "replacement": "in 47 countries",
      "rationale": "'Global ecosystem' is slop. Use a number."
    },
    {
      "phrase": "empower teams",
      "context": "we empower teams to unleash",
      "severity": "high",
      "replacement": "help teams",
      "rationale": "'Empower' is slop."
    },
    {
      "phrase": "unleash their full potential",
      "context": "to unleash their full potential",
      "severity": "high",
      "replacement": "ship faster",
      "rationale": "'Unleash potential' is slop. Name the outcome."
    }
  ],
  "summary": {
    "totalIssues": 10,
    "highSeverity": 10,
    "mediumSeverity": 0,
    "lowSeverity": 0,
    "fleschReadabilityEstimate": 35,
    "averageSentenceLength": 22,
    "overallVerdict": "major-rewrite"
  },
  "structuralIssues": [
    {
      "issue": "Every claim is an unverifiable assertion.",
      "fix": "Replace with 2-3 concrete numbers, each citable."
    },
    {
      "issue": "Adjective-stacking — 4 banned words in 60 words.",
      "fix": "Cut all adjectives. Lead with the outcome."
    }
  ]
}
```

Rewritten version (suggested):

> [Product Name] uses Claude Opus 4.7 to cut ticket resolution time by 47% on average. G2 ranks us #1 in customer support automation. 12,000+ teams across 47 countries use us. Ship faster.

(58 words → 40 words. 0 banned words. 3 specific numbers. 1 named source.)

## Output strictly

Return ONLY the JSON report. No commentary. No markdown fences.

If the input has 0 violations, return:

```json
{
  "violations": [],
  "summary": { "totalIssues": 0, "highSeverity": 0, "mediumSeverity": 0, "lowSeverity": 0, "fleschReadabilityEstimate": 60, "averageSentenceLength": 0, "overallVerdict": "clean" },
  "structuralIssues": []
}
```

--- USER COPY BEGINS ---

[paste the copy you want to audit here]

--- USER COPY ENDS ---

--- PROMPT END ---
