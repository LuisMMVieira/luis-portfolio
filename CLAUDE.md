# Luis Portfolio — CLAUDE.md

## Goal
1:1 match between code and Figma designs. Use Figma MCP to pull design context before implementing anything. Don't approximate — get it right.

## Stack
- **Framework:** Astro (static output)
- **Styling:** SCSS (no Tailwind). BEM class names.
- **Components:** `.astro` files in `src/components/` and `src/components/mdx/`
- **Styles:** `src/styles/` — `tokens.scss`, `post.scss`, `grid.scss`, `main.scss`
- **Site URL:** `https://luisvieira.design`

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
- `container`: md = `grid-column: 1/-1` (full 12 cols), xl = `grid-column: 1/-1`
- `container--narrow`: md = `grid-column: 3/11` (8 cols), xl = `grid-column: 4/10` (6 cols)

## Design Tokens (src/styles/tokens.scss)

### Colors
- Text: `--text-primary`, `--text-secondary`, `--text-shy`
- Backgrounds: `--bg-default`, `--bg-elevated`, `--bg-sunken`
- Borders: `--border-default`, `--border-strong`
- Emphasis (purple): `--color-emphasis` · `--color-emphasis-transparency-mid` (50%) · `--color-emphasis-transparency-high` (30%)
- Neutral transparency: `--color-neutral-transparency-mid` · `--color-neutral-transparency-high`
- Buttons: `--button-primary-idle`, `--button-primary-hover`, `--button-secondary-idle`, `--button-secondary-hover`

### Spacing
`--spacing-none`(0) · `--spacing-xxxs`(2px) · `--spacing-xxs`(4px) · `--spacing-xs`(8px) · `--spacing-sm`(12px) · `--spacing-md`(20px) · `--spacing-ml`(30px) · `--spacing-lg`(40px) · `--spacing-xl`(56px) · `--spacing-xxl`(80px) · `--spacing-huge`(120px) · `--spacing-max`(180px)

### Border widths
`--border-width-hairline` (0.5px) · `--border-width-default` (1px) · `--border-width-thick` (1.5px)

### Typography
- Type roles: `--type-title-{xl,l,m,s,xs}-*`, `--type-text-{l,m,s}-*`, `--type-cta-*`
- Fonts: `--font-family-display` (Dazzed), `--font-family-sans` (IBM Plex Sans)
- Weights: `--font-weight-regular` (400), `--font-weight-medium` (500), `--font-weight-semibold` (600)
- Single theme (no light/dark toggle)

## Content Collections (src/content/config.ts)

### Projects
- **Schema:** `title`, `subtitle?`, `cover`, `order`, `period?`, `draft?`
- **Route:** `src/pages/partials/projects/[slug].astro` — renders inside `ProjectModal` on homepage
- **Content:** `src/content/projects/*.mdx`
- **Modal routing:** hash-based (`/#slug`). JS in `public/scripts/main.js` fetches `/partials/projects/{slug}/`

### Articles
- **Schema:** `title`, `subtitle?`, `date`, `cover?`, `draft?`
- **Route:** `src/pages/articles/[slug].astro` — standalone page
- **Header:** `ArticleHeader.astro` (`.article-header`)
- **Content wrapper:** `.article-page` > `.article-body`
- **Available components:** `Figure`, `Divider`

### Reports
- **Schema:** `title`, `subtitle?`, `date`, `draft?`
- **Route:** `src/pages/reports/[slug].astro` — standalone page
- **Header:** `ReportHeader.astro` (`.report-header`)
- **Content wrapper:** `.report-page` > `.report-body` (wider than article: cols 2/12 at md+xl)
- **Chart.js:** v4 CDN loaded via `<script slot="head">`, canvases use `data-chart-config` attribute
- **Available components:** `ReportSection`, `KpiGrid`, `KpiCard`, `ChartCard`, `DataTable`, `Callout`, `Annotation`, `Figure`, `Divider`

## Post Components (src/components/mdx/)
Used inside MDX project posts. All follow BEM + SCSS pattern. Styles in `post.scss`.

### Hierarchy: Section → Sub Section → Canvas
- **PostSectionGroup** (Section): wrapper with divider + body slot for sub sections
- **PostSection** (Sub Section): grid wrapper with layout/media props — lives inside PostSectionGroup
- **Canvas**: the grid container inside each PostSection (`.post-canvas`)

| Component          | Class prefix              | Notes                                 |
|--------------------|---------------------------|---------------------------------------|
| PostSectionGroup   | `.post-section-group`     | section wrapper: divider + body slot  |
| PostHeader         | `.post-header`            | title + subtitle + intro slot         |
| PostSection        | `.post-section`           | sub section grid wrapper, layout props|
| PostText           | `.post-text`              | heading + slot                        |
| Figure             | `.post-figure`            | img + optional caption                |
| Video              | `.post-figure--video`     | video with outline                    |
| ImageCarousel      | `.image-carousel`         | fading carousel (data-image-carousel) |

### PostSectionGroup spacing
| Breakpoint | Divider padding-top | Divider padding-inline |
|------------|--------------------|-----------------------|
| xs         | `--spacing-xxl` (80px) | `--grid-margin-xs` (20px) |
| md         | `--spacing-xxl` (80px) | `--grid-margin-md` (12px) |
| xl         | `--spacing-huge` (120px) | `--grid-margin-md` (12px) |

### PostSection (sub section) spacing
| Breakpoint | padding-top | padding-bottom |
|------------|------------|---------------|
| xs/md      | `--spacing-lg` (40px) | `--spacing-sm` (12px) |
| xl         | `--spacing-xl` (56px) | `--spacing-sm` (12px) |

### PostHeader spacing
| Breakpoint | padding-top | padding-bottom | title-subtitle gap |
|------------|------------|---------------|-------------------|
| xs         | `--spacing-md` (20px) | `--spacing-md` (20px) | `--spacing-xs` (8px) |
| md         | `--spacing-ml` (30px) | `--spacing-ml` (30px) | `--spacing-xs` (8px) |
| xl         | `--spacing-lg` (40px) | `--spacing-lg` (40px) | `--spacing-md` (20px) |

- Title scales: `type-title-m` (xs) → `type-title-l` (md) → `type-title-xl` (xl)
- Subtitle: `type-text-m` at all breakpoints
- Wrapper grid-column: `1/-1` (xs) → `3/11` (md) → `4/10` (xl)

- **Horizontal image strip** (e.g. Unbox): `<div class="image-scroller">` with `<img>` children; styled in `post.scss`.
- **Cover hero** (e.g. Alf): `<div class="post-cover-hero" style="--cover-bg: url(...)">` with a Video inside.
- **Project modal:** homepage project cards open content in `ProjectModal`; post content is rendered from `src/content/projects/*.mdx` via partials.

PostSection layout prop values: `small` | `big` (default) | `canvas` | `full`
- `canvas` has the same section padding as `big` (section owns padding, canvas child has zero padding). Use `bg` prop for background color on canvas.
PostSection col props: `col2`, `col3`
PostSection media props: `full` | `center-wide` | `center` | `left` | `left-wide` | `right` | `right-wide` | `right-small`

## Report Components (src/components/mdx/report/)
Used inside MDX report posts. All follow BEM + SCSS pattern. Styles in `post.scss`.

| Component     | Class prefix          | Props                              |
|---------------|-----------------------|------------------------------------|
| ReportHeader  | `.report-header`      | `title`, `subtitle?`, `date`       |
| ReportSection | `.report-section`     | `number`, `title`, `description?`  |
| KpiGrid       | `.report-kpi-grid`    | `cols?` (default 3)                |
| KpiCard       | `.report-kpi-card`    | `label`, `value`, `sub?`           |
| ChartCard     | `.report-chart-card`  | `title`, `subtitle?`, `chartId`, `chartConfig` (JSON string) |
| DataTable     | `.report-data-table`  | `caption?`                         |
| Callout       | `.report-callout`     | `title?`                           |
| Annotation    | `.report-annotation`  | `number`, `title`, `text`          |

Chart.js uses hex `#5B4FCF` for the emphasis color (canvas doesn't support oklab).

## Divider (src/components/Divider.astro)
Site-wide separator, styled in `main.scss`.

- **Props:** `label?`, `spaceAbove?` (default `'xl'`), `spaceBelow?` (default `'xl'`), `variant?` (`'work'` removes spacing)
- **Spacing modifiers:** `divider--above-{token}` / `divider--below-{token}` — generated from `$spacing-keys` in `main.scss`
- **Valid tokens:** `none`, `xxxs`, `xxs`, `xs`, `sm`, `md`, `ml`, `lg`, `xl`, `xxl`, `huge`, `max`

## Template Files
Reference templates for each content type. All set to `draft: true` — pages build but are excluded from listings.

| Template | File | URL |
|----------|------|-----|
| Project  | `src/content/projects/project-template.mdx` | `/#project-template` (modal) |
| Article  | `src/content/articles/article-template.mdx` | `/articles/article-template` |
| Report   | `src/content/reports/report-template.mdx`   | `/reports/report-template`   |

## Private/Dev Pages
No public links point to these. Accessible only by direct URL.

| Page | URL | Purpose |
|------|-----|---------|
| Andamento | `/andamento` | Dev index — links to all templates and components |
| Components | `/components` | Design system reference with interactive playground |

All dev pages use `hideHeader={true}` and a floating icon button linking back to `/andamento`.

### Components Page Layout (`src/pages/components.astro`)
Uses its own `cp-*` classes for page layout — **never** use post classes (`PostSection`, `.post-page`, `.post-section__cols`) for the page structure itself. Post classes are only used inside `.cp-post-context` preview wrappers where actual post components are being demonstrated.

| Class | Purpose |
|-------|---------|
| `.components-page` | Page wrapper (max-width, padding) |
| `.cp-page-header` | Page title + subtitle |
| `.cp-section` | Showcase section (padding, flex column, gap) |
| `.cp-cols` | Two-column card layout (stacks at xs, row at md+) |
| `.cp-card` | Card with controls + preview |
| `.cp-post-context` | Wrapper for post component previews (provides `.post-page` context) |
| `.cp-bp-frame` | Breakpoint simulation frame (container queries) |

## Figma MCP Workflow
**Default:** Always use the `figma-design-weaver` skill when a Figma URL is shared. It's the principal workflow for any design-to-code task — trigger it first, then adapt the output to this project's patterns.

1. User provides Figma URL → extract `fileKey` and `nodeId` (convert `-` to `:`)
2. Call `get_design_context` with `clientLanguages: typescript,css`, `clientFrameworks: astro`
3. Map Figma elements to grid columns: at xl, page col = 98px (1200px frame ÷ 12). Always assign explicit `grid-column` spans; do not use `margin: auto` centering shortcuts.
4. Adapt output to SCSS + BEM — never use Tailwind or inline styles
5. Map Figma tokens to project tokens in `tokens.scss`
6. Add component styles to the relevant SCSS file (usually `post.scss`)
- Figma file key: `jpufpSygcQs3tE29WBsLWa` (MonSite)

## Rules
- Never approximate. If unsure, pull the Figma node.
- Don't add features beyond what's asked.
- Don't create new files unless necessary — prefer editing existing ones.
- Styles go in `post.scss` (post/report components) or `main.scss` (global/page).
- Always use design tokens — no hardcoded colors, spacing, or border widths.
- Emphasis color only uses the purple (`--color-emphasis`) with transparency shades — no other accent colors.
