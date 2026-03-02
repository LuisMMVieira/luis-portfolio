# Luis Portfolio — CLAUDE.md

## Goal
1:1 match between code and Figma designs. Use Figma MCP to pull design context before implementing anything. Don't approximate — get it right.

## Stack
- **Framework:** Astro
- **Styling:** SCSS (no Tailwind). BEM class names.
- **Components:** `.astro` files in `src/components/` and `src/components/mdx/`
- **Styles:** `src/styles/` — `tokens.scss`, `post.scss`, `grid.scss`, `main.scss`

## Breakpoints
| Name | Value     |
|------|-----------|
| xs   | default (mobile-first) |
| md   | `48rem` / 768px |
| xl   | `75rem` / 1200px |

## Grid
- **xs:** 2-col (`$grid-2`), `20px` padding-inline (`--grid-margin-xs`)
- **md+:** 12-col (`$grid-12`), `12px` padding-inline (`--grid-margin-md`)
- Column-gap: `0`. Margins come from `padding-inline`, not margin columns.
- Max page width: `--width-modal-max` (85rem / 1360px) at xl.

## Design Tokens (src/styles/tokens.scss)
- Colors: `--text-primary`, `--text-secondary`, `--bg-default`, `--border-default`, `--border-strong`
- Spacing: `--spacing-xs` (8px) → `--spacing-xl` (40px) → `--spacing-huge` (120px)
- Border: `--border-width-hairline` (0.66px), `--border-width-default` (1px)
- Type roles: `--type-title-{xl,l,m,s,xs}-*`, `--type-text-{l,m,s}-*`
- Fonts: `--font-family-display` (Dazzed), `--font-family-sans` (IBM Plex Sans)
- Single theme (no light/dark toggle); semantic tokens match the design token table

## Post Components (src/components/mdx/)
Used inside MDX project posts. All follow BEM + SCSS pattern.

| Component       | Class prefix      | Notes                          |
|-----------------|-------------------|--------------------------------|
| PostHeader      | `.post-header`    | title + subtitle + intro slot  |
| PostSection     | `.post-section`   | grid wrapper, layout props     |
| PostText        | `.post-text`      | heading + slot                 |
| PostDivider     | `.post-divider`   | hairline + optional label      |
| Figure          | `.post-figure`    | img + optional caption         |
| Video           | `.post-figure--video` | video with outline          |
| ImageCarousel   | `.image-carousel` | fading carousel (data-image-carousel) |
| ProjectCentered | —                 | centered layout variant        |

- **Horizontal image strip** (e.g. Unbox): `<div class="image-scroller">` with `<img>` children; styled in `post.scss`.
- **Cover hero** (e.g. Alf): `<div class="post-cover-hero" style="--cover-bg: url(...)">` with a Video inside.
- **Project modal:** homepage project cards open content in `ProjectModal`; post content is rendered from `src/content/projects/*.mdx` via `[slug].astro`.

PostSection layout prop values: `small` | `big` (default) | `full` | `text`
PostSection col props: `col2`, `col3`
PostSection media props: `full` | `center-wide` | `left` | `left-wide` | `right` | `right-wide` | `right-small`

## Figma MCP Workflow
1. User provides Figma URL → extract `fileKey` and `nodeId` (convert `-` to `:`)
2. Call `get_design_context` with `clientLanguages: typescript,css`, `clientFrameworks: astro`
3. Adapt output to SCSS + BEM — never use Tailwind or inline styles
4. Map Figma tokens to project tokens in `tokens.scss`
5. Add component styles to the relevant SCSS file (usually `post.scss`)

## Rules
- Never approximate. If unsure, pull the Figma node.
- Don't add features beyond what's asked.
- Don't create new files unless necessary — prefer editing existing ones.
- Styles go in `post.scss` (post components) or `main.scss` (global/page).
- Figma file key: `jpufpSygcQs3tE29WBsLWa` (MonSite)
