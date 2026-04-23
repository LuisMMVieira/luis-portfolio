---
paths:
  - "src/content/reports/**"
---

# Reports — Content Rules

Template: `src/content/reports/report-template.mdx` — read it before creating or editing any report. Every component and pattern is in there with real data.

## Schema
`src/content/config.ts` — `reports` collection.

## Route
`/reports/[slug]` — rendered by `src/pages/reports/[slug].astro`.

## Components & Design System
Read `src/pages/components.astro` — stop at `// END CLAUDE REFERENCE`.

## Chart.js
Chart.js v4 loaded via CDN. Global defaults set in `public/scripts/chart-init.js` (font color, border color, font family). Per-chart config is inline via `data-chart-config`.

## Assets
- Images: `public/assets/reports/{slug}/images/`
- MDX paths: absolute `/assets/reports/{slug}/...`
