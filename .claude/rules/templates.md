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

Templates are the source of truth for all content types. Every project, article, report, and deck instances from its template.

## Change Flow
**Component → Template → Content.** Structural changes go to the Astro component first, then verify in the template, then apply to real content. Never change content without the component/template reflecting it first.

## Figma → Code Architecture
The post system mirrors the Figma component hierarchy. Class names match Figma layer names so a designer inspecting the browser sees familiar names.

### Layer Mapping
| Figma layer | HTML class | Astro component |
|---|---|---|
| **Section** | `post-section` | `PostSectionGroup` |
| **Section Divider** | `post-section__divider` | *(inside PostSectionGroup)* |
| **Section Body** | `post-section__body` | *(inside PostSectionGroup)* |
| **Sub Section** | `post-subsection` | `PostSection` |
| **Canvas** | — | *(Figma wrapper; not rendered separately in code)* |
| **Canvas (css grid)** | `post-canvas` | *(inside PostSection)* |
| **Content (Place on section grid)** | `content-slot` | *(auto-generated)* |
| **Content/Figure** | `post-figure` | `Figure` |
| **Post Template: Header** | `post-header` | `PostHeader` |

## Shared Components (`src/components/mdx/`)
- **PostSectionGroup** — wraps chapter: divider + body with sub-sections
- **PostSection** — single sub-section (canvas + optional caption)
- **PostHeader** — title area below cover
- **Figure** — image + optional caption
- **PostText** — text block with optional heading
- **Video** — video + optional caption
- **ImageCarousel** — image carousel

Read each component file for the full TypeScript interface.

## Draft System
- `draft: true` in frontmatter = not shown in public index pages
- Draft pages still build and are accessible via direct URL
- Draft pages show /andamento back link; published pages don't
- Draft posts show purple debug outlines intentionally

## Rules
- Never use raw HTML `<section>` tags — always use PostSection components.
- PostSection `bg` prop only supports `background-color` tokens. For `background-image`, use CSS classes or inline styles.
