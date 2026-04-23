---
paths:
  - "src/content/reports/**"
---

# Reports — Content Rules

Template: `src/content/reports/report-template.mdx` — read it before creating or editing any report. Every component and pattern is in there with real data.

## Schema
Defined in `src/content/config.ts`. Fields: `title`, `subtitle?`, `date`, `draft?`, `theme?` (dark|light, default dark).

## Route
`/reports/[slug]` — rendered by `src/pages/reports/[slug].astro`.

## Components & Design System
Read `src/pages/components.astro` — stop at `// END CLAUDE REFERENCE`.

## Chart.js
Chart.js v4 loaded via CDN. Default color `#5B4FCF`. Read the inline script in `src/pages/reports/[slug].astro` for full defaults.

## Assets
- Images: `public/assets/reports/{slug}/images/`
- MDX paths: absolute `/assets/reports/{slug}/...`
