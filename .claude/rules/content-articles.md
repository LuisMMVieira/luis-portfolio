---
paths:
  - "src/content/articles/**"
---

# Articles — Content Rules

Template: `src/content/articles/article-template.mdx` — read it before creating or editing any article. Every pattern is in there with real markup.

## Voice
For narrative prose, invoke the `draft-in-luis-voice` skill. Study `src/content/articles/spaceship-search.mdx` for rhythm.

## Schema
`src/content/config.ts` — `articles` collection.

## Route
`/articles/[slug]` — rendered by `src/pages/articles/[slug].astro`.

## Components & Design System
Read `src/pages/components.astro` — stop at `// END CLAUDE REFERENCE`.

## Assets
- Images: `public/assets/articles/{slug}/images/`
- MDX paths: absolute `/assets/articles/{slug}/...`
