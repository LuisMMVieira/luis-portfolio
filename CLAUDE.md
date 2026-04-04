# Luis Portfolio — CLAUDE.md

## Goal
1:1 match between code and Figma designs. Figma is the source of truth. Use Figma MCP to pull design context before implementing anything. Don't approximate — get it right.

## Stack & Commands
- **Framework:** Astro (static output). **Layout:** `src/layouts/BaseLayout.astro`
- **Styling:** SCSS (no Tailwind). BEM-style class names.
- **Site URL:** `https://luisvieira.design`

```bash
npm run dev      # Astro dev server
npm run build    # Static build
npm run preview  # Preview production build
npm run lint     # ESLint (.js,.ts,.astro,.mdx)
npm run format   # Prettier (all files)
```

## Git Workflow
Work directly on `main`. No branches, no PRs. Solo project.

## Site Architecture

### Public
- **Home** — Hero, Intro, Work, Background, About (loaded from `src/content/*.md`)
- **/projects** — index + `/projects/[slug]` (content collection)
- **/articles** — index + `/articles/[slug]` (content collection)
- **/reports** — index + `/reports/[slug]` (content collection)
- **/decks** — index + standalone Astro pages

### Not Public
- **/andamento** — private dev index: all content (inc. drafts), SINPHONY, Templates, Documents
- **/andamento/kanban** — drag-and-drop kanban board (To Do, In Progress, On Hold, Done). Uses localStorage. Use this to track and plan work on this project.
- **/andamento/sitemap** — auto-generated visual sitemap / IA tree. Pulls from content collections at build time — always up to date.
- **/components** — design system playground

Index pages only show published content (`draft: false`). /andamento shows everything.

## Workflow
- Use `/andamento/kanban` to track and plan work. Check it regularly. Update it. Push Luis on it if it's going stale.
- Use `/andamento/sitemap` to understand the full site IA before structural changes.
- Change flow is defined in `.claude/rules/templates.md` — follow it.
- Design system rules live in `.claude/rules/sinphony.md` — read `src/styles/tokens.scss` before any visual work, critique, or CSS edit.

## Content Collections
Defined in `src/content/config.ts`: `projects`, `articles`, `reports`. Decks are standalone pages (not yet a collection).

## Figma Workflow
Always use the `figma-design-weaver` skill for Figma URLs. Never call MCP tools directly.
- Figma file key: `jpufpSygcQs3tE29WBsLWa`
- Map Figma columns to grid: xl col = ~98px (1200px ÷ 12).

## Granular Rules (`.claude/rules/`)
Rule files inherit from this root file. Don't duplicate what's here in rule files, and don't duplicate rule file content here. Each rule lives in exactly one place.

Detailed rules load automatically when you touch matching files:
- **sinphony.md** — design tokens, grid, breakpoints, style ownership → `src/styles/**`, `src/components/**`
- **templates.md** — change flow, Figma→code layer mapping, shared components → templates, `[slug].astro`
- **content-projects.md** — project components, PostSection props, assets, scroll reveal → `src/content/projects/**`
- **content-articles.md** — article structure, available components → `src/content/articles/**`
- **content-reports.md** — report components (KpiGrid, ChartCard, etc.), Chart.js config → `src/content/reports/**`
- **content-decks.md** — deck structure, how to add new decks → `src/pages/decks/**`

## Global Rules
- Figma is the source of truth — never approximate.
- NEVER eyeball a design when using the Figma MCP — always read the actual values from `get_design_context` output.
- Prefer editing existing files — don't create new ones unless necessary.
- Edit originals directly — never create `-v2` copies.
- Don't add features beyond what's asked.
