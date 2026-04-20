---
paths:
  - "src/content/articles/**"
---

# Articles — Content Rules

Inherits from: `templates.md` (change flow, draft system), `sinphony.md` (tokens).
Template: `src/content/articles/article-template.mdx` — **read it before creating or editing any article.**

## Instancing Rule
Every article is an instance of `article-template.mdx`. When creating a new article, copy the template structure — same component usage, same wrapper pattern. Content and length vary freely; structural skeleton must match the template. When the template changes, all articles should be updated to reflect the new structure.

## Schema
Defined in `src/content/config.ts`. Fields: `title`, `subtitle?`, `date`, `cover?`, `covers?` (array for carousel), `draft?`, `theme?` (dark|light, default light).

## Route
`/articles/[slug]` — rendered by `src/pages/articles/[slug].astro`.

## Available Components
- `Figure` — image + caption
- `Video` — video + caption
- `Divider` — visual separator
- `ArticleHeader` — title + subtitle + date (auto-rendered by template, not used in MDX)

## Available Patterns
Every pattern below appears once in `article-template.mdx` with placeholder copy — copy the markup from there verbatim.

- **Sub Section wrapper** — every `##`-led section is wrapped in `<div class="article-subsection">`. Mirrors Figma's Sub Section frame: 56px top padding, 28px bottom padding, 56px inner row-gap. Net spacing between two consecutive sections = 84px (28 bottom + 56 top). Add `.article-subsection--divider` (empty wrapper) for a dedicated visual rule between major section groups.
- **Post Meta** — `<dl class="post-meta">` with `.post-meta__row` / `__label` / `__value` rows. Goes right after the intro paragraph, before the first Sub Section.
- **Figure widths** — three variants:
  - *Text-width* — `<figure class="post-figure article-finding--text-width">` (same column as prose)
  - *Wide* — `<Figure />` or `<figure class="post-figure">` (default, wider than prose)
  - *Full-width* — `<figure class="post-figure article-figure--full-width">` (edge to edge)
- **Research Finding callout** — `.article-finding` + `__nameplate` + `__text`. Add `.article-card` for the dark-card variant.
- **Stats callout** — `.article-finding__stats` with `.article-finding__stat` / `__stat-value` / `__stat-label`.
- **3-column figure row** — `.article-figure-row` inside a full-width `<figure>`.
- **Figure + text block (2-col)** — `.article-figure-with-text` wrapping a `.post-figure` and `.article-figure-with-text__body` (h3 + p).
- **Video gallery** — `.article-video-gallery` + `__main` / `__caption` / `__thumbs` / `__thumb` with `data-video-gallery` attribute (wired by `/scripts/main.js`).
- **Chart card** — `.report-chart-card` wrapping `<canvas data-chart-config='…'>`. Initialised by `/scripts/chart-init.js`.

## Structure
Wrapper: `.article-page` > `.article-body`. Articles use a narrow measure for comfortable reading. The body is text-focused — less visual complexity than projects.

## Chart.js
Chart.js v4 is loaded via CDN in the article template. Available for data visualization if needed.

## Assets
- Images: `public/assets/articles/{slug}/images/`
- MDX paths: absolute `/assets/articles/{slug}/...`
