# Zeplin Post/Content Component Mapping

This document maps Zeplin Post/Content components to code. Grid positions follow the Figma XL template: **text starts at col 3**.

## Grid (XL breakpoint)

- **Text:** cols 3–12 (never col 1–2)
- **Post header:** title cols 3–6, intro cols 8–11 (col 7 = gap)
- **Media:** various (see below)

## Layout Variants

| Zeplin | Code | Grid (xl) |
|--------|------|-----------|
| **Text, 1 col** | `<PostSection layout="text">` + `<PostText>` | cols 3–12 |
| **Text, 2 col** | `<PostSection layout="text" col2>` + 2× `<PostText>` | left 3–6, right 9–12 |
| **Text, 3 col** | `<PostSection layout="text" col3>` + 3× `<PostText>` | 3–4, 7–8, 11–12 |
| **Figure, Full** | `<PostSection layout="full">` or `media="full"` | cols 1–12 |
| **Figure, Center Wide** | `<PostSection layout="big" media="center-wide">` | cols 3–10 |
| **Figure, Left** | `<PostSection layout="big" media="left">` | cols 1–4 |
| **Figure, Left Wide** | `<PostSection layout="big" media="left-wide">` | cols 1–10 |
| **Figure, Right** | `<PostSection layout="big" media="right">` | cols 7–12 |
| **Figure, Right Wide** | `<PostSection layout="big" media="right-wide">` | cols 5–12 |
| **Figure, Right Small** | `<PostSection layout="big" media="right-small">` | cols 9–12 |

## Breakpoints

- **xs** (< 768px): Mobile — 2-col grid, col2 shows 2 side by side, col3 stacks
- **md** (≥ 768px): Tablet — 12-col grid
- **xl** (≥ 1200px): Desktop — same 12-col, adjusted padding

## Known Zeplin Component IDs

Add IDs as you run `connect initialize` or `connect add-components`:

| Component | Zeplin ID |
|-----------|-----------|
| Post/Content Text 1 col xl | `699234fd2fcb55f2a2218952` |
| Post/Content Text 2 col xl | `699234ffb6f286c6efa32a02` |
| Post/Content Text 3 col xl | _(get from Zeplin)_ |
| Post/Content Figure 1 col xl | _(get from Zeplin)_ |
| Post/Content Figure 2 col xl | _(get from Zeplin)_ |
| Post/Content Figure 3 col xl | _(get from Zeplin)_ |
| Post/Content Figure Full xl | _(get from Zeplin)_ |
| … md, xs variants | _(get from Zeplin)_ |

## Adding More Components

```bash
export ZEPLIN_ACCESS_TOKEN=your_token
npx @zeplin/cli connect add-components \
  --project-id 699234f7b798fc79a1867673 \
  --component-id <COMPONENT_ID>
```

Then add the component ID to the appropriate entry in `.zeplin/components.json`.

## Publishing to Zeplin

```bash
npx @zeplin/cli connect
```

Note: There is no native Astro plugin. Components will show GitHub links. For code snippets, consider a custom plugin or Storybook with Astro.
