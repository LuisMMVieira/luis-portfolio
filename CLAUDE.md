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

## Figma intake
When a Figma URL is shared, before generating any code:
1. Use `figma-design-weaver` to read the design (MCP: `get_design_context`, `get_metadata`, `get_variable_defs`).
2. Check `src/components/` for an existing match — don't rebuild what exists.
3. Check `src/styles/tokens.scss` for any value you're about to hardcode.
4. Output `.astro` + SCSS (never raw HTML/CSS). Follow the Component → Template → Content flow in `.claude/rules/templates.md`.
5. For taste, invoke the `sinphony` skill alongside `.claude/rules/sinphony.md`.
