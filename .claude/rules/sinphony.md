---
paths:
  - "src/styles/**"
  - "src/components/**"
  - "src/layouts/**"
---

# SINPHONY — Design System Rules

## Tokens
`src/styles/tokens.scss` is the single source of truth for all visual values — read it before writing any CSS. Never hardcode values that exist as tokens.

## Typefaces
- **Display:** Dazzed
- **Text:** IBM Plex Sans

## Color
Monochrome system — black, white, grays. One accent: `#7026C9`. Use it sparingly — it's the signal flare, not a palette.

## Breakpoints & Grid
- **xs** = default (mobile-first), **md** = `48rem` (768px), **xl** = `75rem` (1200px). Hardcoded in media queries.
- **xs:** 2-col grid. **md+:** 12-col grid. Column-gap: `0`.
- Max page width: `--site-max-width`.

## Type Mixins
`src/styles/_mixins.scss` — use `@include type($scale)` (all 5 props) or `@include type-size($scale)` (size only). Don't write type token properties by hand.

## Rules
- BEM-style class names.
- Think in systems: reusable patterns over one-off solutions.

## Sync
After any component change, run `npm run sync-docs` to keep the CLAUDE REFERENCE block current.
