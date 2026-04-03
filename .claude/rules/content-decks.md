---
paths:
  - "src/pages/decks/**"
---

# Decks — Content Rules

Inherits from: `sinphony.md` (tokens). Decks are standalone Astro pages, not a content collection (yet).

## Current Decks
- `/decks/spaceship-search` — dark presentation deck
- `/decks/spaceship-search-light` — light variant
- `/decks/sword-deck` — interview storyboard deck

## Structure
Each deck is a self-contained `.astro` file in `src/pages/decks/`. Slide data is defined as a const array in the frontmatter, then rendered in the template. No shared deck layout yet.

## Adding a New Deck
1. Create `src/pages/decks/{slug}.astro`
2. Import `BaseLayout` from `../../layouts/BaseLayout.astro`
3. Define slide data array in frontmatter
4. Add entry to the decks list in `src/pages/decks/index.astro`
5. The deck appears automatically in `/andamento` only if added to the hardcoded list in `src/pages/andamento.astro`

## Navigation
All decks include `/andamento` back link (top-left). Decks are backstage-only content — never linked from public pages.

## Future
Decks may become a proper content collection with schema, dynamic routes, and a deck-template. Until then, they're manual Astro pages.
