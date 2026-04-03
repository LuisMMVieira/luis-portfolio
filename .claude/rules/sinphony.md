---
paths:
  - "src/styles/**"
  - "src/components/**"
  - "src/layouts/**"
---

# SINPHONY — Design System Rules

Inherits from: root CLAUDE.md (architecture). Governs all visual decisions.

## Tokens
All tokens live in `src/styles/tokens.scss` — **read it before writing any CSS**. Never hardcode values that exist as tokens.

Naming patterns: `--text-*`, `--bg-*`, `--border-*`, `--spacing-*`, `--type-title-{hero,l,m,s,xs}-*`, `--type-text-{l,m,s}-*`. Borders, radius, motion — all tokenized.

Typefaces: `--font-family-display` (Dazzed), `--font-family-sans` (IBM Plex Sans). Single theme, no light/dark.

Emphasis color: only `--color-emphasis` with transparency shades (`--color-emphasis-transparency-high`, `--color-emphasis-transparency-mid`).

## Breakpoints & Grid
- **xs** = default (mobile-first), **md** = `48rem` (768px), **xl** = `75rem` (1200px). Hardcoded in media queries.
- **Grid margins:** 20px at all breakpoints.
- **xs:** 2-col grid. **md+:** 12-col grid. Column-gap: `0`.
- Max page width: `--site-max-width` (1360px).

## Style Ownership
| File | Owns |
|------|------|
| `tokens.scss` | All design tokens |
| `fonts.scss` | @font-face (Dazzed) + Google Fonts (IBM Plex Sans) |
| `reset.scss` | CSS reset |
| `grid.scss` | Grid variables and utilities |
| `main.scss` | Page styles, header, nav, homepage, Divider, andamento |
| `global.scss` | Cta, base elements, project page container |
| `post.scss` | All post/sub-section/canvas/figure/text/meta styles |
| `project-content.scss` | Project page layout |

## Rules
- Always use design tokens — no hardcoded values.
- BEM-style class names.
- Think in systems: reusable patterns over one-off solutions.
- Edit originals directly — never create `-v2` copies.
