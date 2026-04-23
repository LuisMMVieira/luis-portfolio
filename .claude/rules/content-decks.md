---
paths:
  - "src/pages/decks/**"
---

# Decks — Content Rules

Standalone Astro pages — not a content collection. Each deck is self-contained in `src/pages/decks/`.

## Current Decks
- `/decks/spaceship-search` — dark presentation deck
- `/decks/spaceship-search-light` — light variant
- `/decks/sword-deck` — interview storyboard deck

## Adding a New Deck
1. Create `src/pages/decks/{slug}.astro`
2. Import `BaseLayout` from `../../layouts/BaseLayout.astro`
3. Define slide data array in frontmatter
4. Add entry to `src/pages/decks/index.astro`
5. Add to the hardcoded list in `src/pages/andamento/index.astro` to appear in /andamento

## Navigation
All decks include `/andamento` back link. Never linked from public pages.
