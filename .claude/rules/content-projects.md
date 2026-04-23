---
paths:
  - "src/content/projects/**"
---

# Projects — Content Rules

Template: `src/content/projects/project-template.mdx` — read it before creating or editing any project.

## Voice
For narrative prose and project descriptions, invoke the `draft-in-luis-voice` skill.

## Components & Design System
Read `src/pages/components.astro` — stop at `// END CLAUDE REFERENCE`. Everything you need is in that block.
For design decisions — bg tokens, spacing, layout choices — read `.claude/rules/sinphony.md`.

## Schema
`src/content/config.ts` — `projects` collection.

## Route
`/projects/[slug]` — rendered by `src/pages/projects/[slug].astro`. Uses close button (ESC / X), not back link.

## Assets
- Images: `public/assets/projects/{slug}/images/`
- Videos: `public/assets/projects/{slug}/videos/`
- MDX paths: absolute `/assets/projects/{slug}/...`
