---
paths:
  - "src/styles/**"
  - "src/components/**"
  - "src/layouts/**"
---

# SINPHONY — Design System Rules

## Taste
For brand taste and principles — composition instincts, typographic feel, what "looks like Luis" — invoke the `sinphony` skill. This file owns the code rules; the skill owns the taste.

## Tokens
`src/styles/tokens.scss` is the single source of truth for all visual values — read it before writing any CSS. Never hardcode values that exist as tokens.

## Type Mixins
`src/styles/_mixins.scss` — use `@include type($scale)` (all 5 props) or `@include type-size($scale)` (size only). Don't write type token properties by hand.

## Accent
Monochrome system. One accent: `#7026C9`. Use it sparingly — it's the signal flare, not a palette.

## Rules
- BEM-style class names.
- Think in systems: reusable patterns over one-off solutions.

## Foundations
Typefaces, breakpoints, grid, spacing scale, type scales — all enumerated in the CLAUDE REFERENCE block of `src/pages/components.astro`. That block is auto-generated on `dev`/`build` from `scripts/sync-docs.mjs` — treat it as the current truth.
