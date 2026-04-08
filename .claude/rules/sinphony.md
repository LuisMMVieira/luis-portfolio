---
paths:
  - "src/styles/**"
  - "src/components/**"
  - "src/layouts/**"
  - "src/content/**"
  - "src/pages/**"
---

# SINPHONY — Design System Rules

Inherits from root CLAUDE.md. Governs all visual decisions.

## Tokens
`src/styles/tokens.scss` is the single source of truth for all visual values — **read it before writing any CSS**. Never hardcode values that exist as tokens.

The token file defines: colors (with dark/light theme overrides via `[data-theme]`), spacing scale, type scale (titles + text), borders, radius, and motion. Read the file — don't memorize values here.

## Breakpoints & Grid
- **xs** = default (mobile-first), **md** = `48rem` (768px), **xl** = `75rem` (1200px). Hardcoded in media queries.
- **xs:** 2-col grid. **md+:** 12-col grid. Column-gap: `0`.
- Max page width: `--site-max-width`. Grid margins defined in `grid.scss`.

## Style Ownership
| File | Owns |
|------|------|
| `tokens.scss` | All design tokens |
| `_mixins.scss` | Type mixins (`type`, `type-size`) |
| `fonts.scss` | @font-face + Google Fonts imports |
| `reset.scss` | CSS reset |
| `grid.scss` | Grid variables and utilities |
| `main.scss` | Page styles, header, nav, homepage, andamento, kanban, sitemap |
| `global.scss` | CTA, base elements, project page container, design system utilities (`.cp-tag`, `.cp-nowrap`) |
| `post.scss` | All post/sub-section/canvas/figure/text/meta styles |
| `project-content.scss` | Project page layout |

## Type Mixins
`src/styles/_mixins.scss` provides `@include type($scale)` (all 5 props) and `@include type-size($scale)` (size-only override). Use these instead of writing title token properties by hand.

## Rules
- BEM-style class names.
- Think in systems: reusable patterns over one-off solutions.
