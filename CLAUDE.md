# CLAUDE.md

This file provides context for AI assistants working on this codebase.

## Project Overview

Personal portfolio site for a digital product designer, built with **Astro 5** as a static site. Features MDX-based project content, a modal-based project viewer, Decap CMS integration, and a comprehensive SCSS design system using OKLCH colors.

## Tech Stack

- **Framework**: Astro 5 (static output, no SSR)
- **Language**: TypeScript / JavaScript
- **Content**: MDX via Astro Content Collections with Zod schema validation
- **Styling**: SCSS with scoped component styles (`<style lang="scss">`)
- **CMS**: Decap CMS (GitHub backend)
- **Image Processing**: Sharp
- **Deployment**: Static files to `dist/` (Vercel-ready)

## Commands

```bash
npm run dev           # Dev server at localhost:4321
npm run build         # Production build to dist/
npm run preview       # Preview production build
npm run lint          # ESLint check (.js, .ts, .astro)
npm run lint:fix      # Auto-fix lint issues
npm run format        # Prettier format all files
npm run format:check  # Check formatting
```

## Project Structure

```
src/
  pages/              # Routes (index.astro, partials/projects/[slug].astro)
  layouts/            # BaseLayout.astro (root HTML wrapper)
  components/         # Astro components (PascalCase)
    mdx/              # MDX-specific components (PostSection, Figure, etc.)
  content/            # Content collections
    config.ts         # Schema definitions (Zod)
    projects/         # Project MDX files
  styles/             # SCSS design system
    tokens.scss       # Design tokens (colors, spacing, typography)
    main.scss         # Main import file
public/
  admin/              # Decap CMS (config.yml + index.html)
  assets/projects/    # Project media files
  fonts/              # WOFF2 web fonts
  scripts/main.js     # Client-side JS (scroll spy, modal handler)
```

## Key Conventions

- **Components**: PascalCase filenames (e.g., `ProjectCard.astro`)
- **Content files**: lowercase with hyphens (e.g., `spaceship.mdx`)
- **Imports**: Use `@/*` path alias for `./src/*`
- **Styles**: Scoped SCSS in components; global tokens in `src/styles/tokens.scss`
- **Colors**: OKLCH color space with semantic tokens (`--bg-default`, `--text-primary`, etc.)
- **Typography**: `Dazzed` (display) + IBM Plex Sans (body) font stack
- **Grid**: Responsive 2-col (mobile) → 3-col (desktop: 240px | 640px | 240px)
- **Formatting**: Prettier with single quotes, 2-space indent, 100-char line width

## Content System

Projects use Astro Content Collections defined in `src/content/config.ts`:

```typescript
schema: z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  cover: z.string(),
  order: z.number(),
  draft: z.boolean().optional().default(false),
})
```

Project pages are rendered as partials (`src/pages/partials/projects/[slug].astro`) and loaded dynamically into a modal via fetch from client-side JS.

## Architecture Notes

- **Modal navigation**: Project cards trigger AJAX content loading with hash-based routing (`#projectslug`), content caching, and browser history integration
- **No testing framework**: No unit or e2e tests are configured
- **No environment variables**: Static site requires no env vars for dev or build
- **Site URL placeholder**: `astro.config.mjs` has `https://your-site-url.com` — update before production deployment
