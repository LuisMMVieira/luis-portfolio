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

## Structure
Wrapper: `.article-page` > `.article-body`. Articles use a narrow measure for comfortable reading. The body is text-focused — less visual complexity than projects.

## Chart.js
Chart.js v4 is loaded via CDN in the article template. Available for data visualization if needed.

## Assets
- Images: `public/assets/articles/{slug}/images/`
- MDX paths: absolute `/assets/articles/{slug}/...`
