---
paths:
  - "src/content/reports/**"
---

# Reports — Content Rules

Inherits from: `templates.md` (change flow, draft system), `sinphony.md` (tokens).
Template: `src/content/reports/report-template.mdx` — **read it before creating or editing any report.**

## Instancing Rule
Every report is an instance of `report-template.mdx`. When creating a new report, copy the template structure — same component hierarchy, same section/KPI/chart patterns. Data and content vary freely; structural skeleton must match the template. When the template changes, all reports should be updated to reflect the new structure.

## Schema
Defined in `src/content/config.ts`. Fields: `title`, `subtitle?`, `date`, `draft?`, `theme?` (dark|light, default dark).

## Route
`/reports/[slug]` — rendered by `src/pages/reports/[slug].astro`.

## Available Components
All in `src/components/mdx/report/` — read each file for full props:
- `ReportSection` — major section with number, title, description
- `ReportHeader` — title + subtitle + date (auto-rendered)
- `KpiGrid` — grid container for KPI cards (`cols` prop)
- `KpiCard` — single metric card
- `ChartCard` — Chart.js visualization wrapper
- `DataTable` — data table
- `Callout` — highlighted callout box
- `Annotation` — inline annotation
- `Figure` — image + caption
- `Divider` — visual separator

## Chart.js
Chart.js v4 loaded via CDN. Custom defaults applied in the report template:
- Default color: `#5B4FCF` (purple)
- Custom font, grid, and tooltip configuration
- Read `src/pages/reports/[slug].astro` inline script for full defaults

## Structure
Wrapper: `.report-page` > `.report-body`. Reports are data-heavy — KPI grids, charts, tables, callouts. More structured than articles.
