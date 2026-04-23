# Luis Portfolio

## Goal
This is a portfolio, not a product. The design leads — the code follows.

These files point to sources of truth — they don't replace them. When in doubt, read the actual file.

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

## Rules
- Before creating or editing any content file, read the matching rule in `.claude/rules/`.
- For any visual decision — bg tokens, spacing, layout, type — read `.claude/rules/sinphony.md`.
