---
paths:
  - "src/content/projects/**"
---

# Projects — Content Rules

Inherits from: `templates.md` (change flow, components), `sinphony.md` (tokens, grid).
Template: `src/content/projects/project-template.mdx` — **read it before creating or editing any project.**

## Instancing Rule
Every project is an instance of `project-template.mdx`. When creating a new project, copy the template structure exactly — same component order, same props pattern, same section hierarchy. Content changes freely; structure must match the template. When the template changes, all projects should be updated to reflect the new structure.

## Schema
Defined in `src/content/config.ts`. Fields: `title`, `subtitle?`, `cover`, `order`, `period?`, `draft?`, `theme?` (dark|light, default dark).

## Route
`/projects/[slug]` — rendered by `src/pages/projects/[slug].astro`. Uses close button (ESC / X), not back link.

## Available Components
Registered in `src/pages/projects/[slug].astro`:
- `PostSectionGroup` — chapter wrapper (divider + title + body)
- `PostSection` — sub-section with canvas grid
- `PostHeader` — title + subtitle + intro
- `PostText` — text block
- `Figure` — image + caption
- `ImageCarousel` — multi-image carousel
- `Video` — video + caption
- `Phone` — CSS-only phone device frame (props: `mode` light|dark, `intensity` strong|soft)
- `Divider` — visual separator

### PostSection Props Quick Reference
- **layout:** `small` | `big` | `canvas` | `full`
- **media:** `full` | `center-wide` | `center` | `left` | `left-wide` | `right` | `right-wide` | `right-small` | `2-left` | `2-right` | `2-center`
- **bg:** background-color token (e.g. `bg-elevated`)
- **padding:** spacing token (e.g. `spacing-xxl`)
- **caption:** sub-section caption (outside canvas)
- **slotGap:** spacing token for gap between slot children
- **overflow:** `clip` to contain overflow
- **scroll:** enables horizontal scroll on canvas

### Two-Column Layouts
When `media="2-*"`, wrap each column in `<div class="content-slot">` manually.

### Captions
Two levels: **figure caption** (inside Figure via `caption` prop) and **sub-section caption** (outside canvas via PostSection `caption` prop).

## Assets
- Images: `public/assets/projects/{slug}/images/` (with subfolders)
- Videos: `public/assets/projects/{slug}/videos/`
- MDX paths: absolute `/assets/projects/{slug}/...`

## Scroll Reveal
If a new custom element class is added, register it in `public/scripts/main.js` line ~203 selector list, or it will render invisible.
