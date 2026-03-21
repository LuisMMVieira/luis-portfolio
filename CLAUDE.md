# Luis Portfolio — CLAUDE.md

## Goal
1:1 match between code and Figma designs. Use Figma MCP to pull design context before implementing anything. Don't approximate — get it right.

## Stack & Commands
- **Framework:** Astro (static output). **Layout:** `src/layouts/BaseLayout.astro`
- **Styling:** SCSS (no Tailwind). BEM class names.
- **Site URL:** `https://luisvieira.design`

```bash
npm run dev      # Astro dev server
npm run build    # Static build
npm run preview  # Preview production build
npm run lint     # ESLint (.js,.ts,.astro,.mdx)
npm run format   # Prettier (all files)
```

## Git Workflow
Work directly on `main`. No branches, no PRs. Solo project.

## Design Tokens
All tokens in `src/styles/tokens.scss` — read it before writing CSS.

**Naming patterns:**
- Colors: `--text-*`, `--bg-*`, `--border-*`, `--button-*`, `--color-emphasis*`, `--color-neutral-transparency-*`
- Spacing: `--spacing-{none,xxxs,xxs,xs,sm,md,ml,lg,xl,xxl,huge,max}`
- Type roles: `--type-title-{xl,l,m,s,xs}-*`, `--type-text-{l,m,s}-*`, `--type-cta-*`
- Fonts: `--font-family-display` (Dazzed), `--font-family-sans` (IBM Plex Sans)
- Weights: `--font-weight-{regular,medium,semibold}`
- Borders, radius, motion — all tokenized. Single theme, no light/dark.

## Breakpoints
xs = default (mobile-first), md = `48rem` (768px), xl = `75rem` (1200px). Hardcoded in media queries, not SCSS variables.

## Grid
- **Grid margins are 20px at all breakpoints** (`--grid-margin-xs` and `--grid-margin-md` are both `--spacing-md`). Same grid across pages and posts.
- **xs:** 2-col (`$grid-2`). **md+:** 12-col (`$grid-12`).
- Column-gap: `0`. Max page width: `--site-max-width`.
- `container`: full width. `container--narrow`: md = cols 3/11, xl = cols 4/10.

## Style Ownership
| File | Owns |
|------|------|
| `tokens.scss` | All design tokens |
| `fonts.scss` | @font-face (Dazzed) + Google Fonts import (IBM Plex Sans) |
| `reset.scss` | CSS reset |
| `grid.scss` | Grid variables and utilities |
| `main.scss` | Page styles, header, nav, homepage, Divider |
| `global.scss` | Cta, base elements |
| `post.scss` | Post and report component styles |
| `project-content.scss` | Project page layout |

## Content

### Homepage
Sections loaded from `src/content/*.md`: intro, work, beliefs, background, about, values.

### Projects (`src/content/projects/*.mdx`)
Route: `/projects/[slug]` — standalone page, close button → `history.back()`. Schema in `src/content/config.ts`.

### Articles (`src/content/articles/*.mdx`)
Route: `/articles/[slug]`. Wrapper: `.article-page` > `.article-body`. MDX components: `Figure`, `Divider`.

### Reports (`src/content/reports/*.mdx`)
Route: `/reports/[slug]`. Wrapper: `.report-page` > `.report-body`. Chart.js v4 via CDN, emphasis hex `#5B4FCF`. MDX components: `ReportSection`, `KpiGrid`, `KpiCard`, `ChartCard`, `DataTable`, `Callout`, `Annotation`, `Figure`, `Divider`.

## Post Components (`src/components/mdx/`)
BEM + SCSS in `post.scss`. Read component files for props.

**Hierarchy:** PostSectionGroup (section) → PostSection (sub section) → Canvas

Key components: `PostSectionGroup`, `PostHeader`, `PostSection`, `PostText`, `Figure`, `Video`, `ImageCarousel`, `Cta`, `Divider`

**PostSection layout:** `small` | `big` (default) | `canvas` | `full`
**PostSection media:** `full` | `center-wide` | `center` | `left` | `left-wide` | `right` | `right-wide` | `right-small`
**PostSection cols:** `col2`, `col3`

Report components in `src/components/mdx/report/` — read files for props.

## Dev Pages (no public links)
- `/andamento` — dev index with links to all templates and components
- `/components` — design system playground, uses `cp-*` classes (not post classes)

Templates at `src/content/{projects,articles,reports}/*-template.mdx` — `draft: true`, built but hidden from listings. Draft posts show purple debug outlines intentionally.

## Figma Workflow
Always use the `figma-design-weaver` skill for Figma URLs. Never call MCP tools directly.
- Map Figma to grid columns (xl: col = 98px = 1200px ÷ 12). Use explicit `grid-column` spans.
- Figma file key: `jpufpSygcQs3tE29WBsLWa`

## Assets
- Images: `public/assets/projects/{slug}/images/` (with subfolders)
- Videos: `public/assets/projects/{slug}/videos/`
- MDX paths: absolute `/assets/projects/{slug}/...`

## Rules
- Never approximate — if unsure, pull the Figma node.
- Don't add features beyond what's asked.
- Prefer editing existing files — don't create new ones unless necessary.
- Edit originals directly — never create `-v2` copies.
- Always use design tokens — no hardcoded colors, spacing, or border widths.
- Emphasis color: only `--color-emphasis` with transparency shades.
- Think in systems: reusable patterns over one-off solutions.
