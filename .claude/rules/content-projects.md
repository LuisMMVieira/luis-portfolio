---
paths:
  - "src/content/projects/**"
---

# Projects — Content Rules

Template: `src/content/projects/project-template.mdx` — read it before creating or editing any project.

## Change Flow
**Component → Template → Content.** Structural changes go to the component first, verify in the template, then apply to content. Never change content without the component/template reflecting it first.

## Components & Design System
Read `src/pages/components.astro` — stop at `// END CLAUDE REFERENCE`. Everything you need is in that block.
For design decisions — bg tokens, spacing, layout choices — read `.claude/rules/sinphony.md`.

## Schema
Defined in `src/content/config.ts`. Fields: `title`, `subtitle?`, `cover`, `order`, `period?`, `draft?`, `theme?` (dark|light, default dark).

## Route
`/projects/[slug]` — rendered by `src/pages/projects/[slug].astro`. Uses close button (ESC / X), not back link.

## Assets
- Images: `public/assets/projects/{slug}/images/`
- Videos: `public/assets/projects/{slug}/videos/`
- MDX paths: absolute `/assets/projects/{slug}/...`
