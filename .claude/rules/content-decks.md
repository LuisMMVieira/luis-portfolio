---
paths:
  - "src/pages/decks/**"
---

# Decks — Content Rules

Standalone Astro pages — not a content collection. Each deck is self-contained in `src/pages/decks/`. Canonical list: `src/pages/decks/index.astro`.

## Adding a New Deck
1. Create `src/pages/decks/{slug}.astro`
2. Import `BaseLayout` from `../../layouts/BaseLayout.astro`
3. Define slide data array in frontmatter
4. Register in `src/pages/decks/index.astro` and `src/pages/andamento/index.astro`

## Navigation
All decks include `/andamento` back link. Never linked from public pages.
