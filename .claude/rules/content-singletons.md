---
paths:
  - "src/content/*.md"
---

# Content Singletons — Rules

Top-level homepage content: `about.md`, `background.md`, `beliefs.md`, `intro.md`, `values.md`, `work.md`. These are single Markdown files — not a collection — each consumed by a specific page under `src/pages/`.

## Voice
These are prose-heavy. For any copy edit, invoke the `draft-in-luis-voice` skill. Study `intro.md` and `about.md` for the register.

## Markup
Raw HTML with BEM-style class names is expected (see `intro.md`, `about.md`). Classes come from the site's SCSS — before inventing a new class, grep `src/styles/` to see if a matching one already exists.

## Design
For any visual decision — spacing, type, emphasis — follow `.claude/rules/sinphony.md`.
