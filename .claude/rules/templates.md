---
paths:
  - "src/content/**/project-template*"
  - "src/content/**/article-template*"
  - "src/content/**/report-template*"
  - "src/pages/projects/[slug].astro"
  - "src/pages/articles/[slug].astro"
  - "src/pages/reports/[slug].astro"
  - "src/pages/partials/**"
---

# Templates — Source of Truth

Templates are the source of truth for all content types. Every project, article, and report instances from its template.

## Change Flow
**Component → Template → Content.** Structural changes go to the Astro component first, verify in the template, then apply to real content. Never change content without the component/template reflecting it first.

## Shared Components (`src/components/mdx/`)
- **PostSectionGroup** — wraps a chapter: divider + body with sub-sections
- **PostSection** — single sub-section (canvas + optional caption)
- **PostHeader** — title area below cover
- **PostText** — text block with optional heading
- **Figure** — image + optional caption
- **Video** — video + optional caption
- **ImageCarousel** — image carousel
- **Phone** — phone frame wrapper

Read each component file for the full props interface.

## Draft System
- `draft: true` in frontmatter = hidden from public index pages
- Draft pages still build and are accessible via direct URL
- Draft pages show /andamento back link; published pages don't

## Rules
- Never use raw HTML `<section>` tags — always use PostSection components.
- PostSection `bg` prop only supports `background-color` tokens. For `background-image`, use CSS classes or inline styles.
