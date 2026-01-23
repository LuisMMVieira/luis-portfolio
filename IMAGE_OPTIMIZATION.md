# Image Optimization Guide

## Current State
Your images are currently in `public/` directory and referenced as static assets. They work but aren't automatically optimized.

## Why Optimize?
- **Smaller file sizes** (30-80% reduction)
- **Responsive images** (serve correct size for device)
- **Modern formats** (WebP with fallbacks)
- **Lazy loading** (better performance)
- **Automatic optimization** at build time

## How Astro Image Optimization Works

Astro has built-in image optimization using Sharp. To use it, images need to be in `src/` instead of `public/`.

### Example: Current vs Optimized

**Current (unoptimized):**
```astro
<!-- ProjectCard.astro -->
<img src="/assets/projects/spaceship/cover.png" alt="Spaceship" loading="lazy" />
```

**Optimized:**
```astro
---
import { Image } from 'astro:assets';
import spaceshipCover from '../assets/projects/spaceship/cover.png';
---

<Image
  src={spaceshipCover}
  alt="Spaceship"
  width={800}
  height={600}
  format="webp"
  quality={80}
/>
```

## Migration Steps (Gradual Approach)

### Phase 1: Setup (✓ Done)
- [x] Sharp installed (comes with Astro)
- [x] Ready to optimize

### Phase 2: Move Project Covers (Recommended First Step)
1. Create `src/assets/projects/` directory
2. Move cover images from `public/assets/projects/[project]/images/0 - cover/` to `src/assets/projects/[project]/`
3. Update content schema in `src/content/config.ts`:
```typescript
import { defineCollection, z, image } from "astro:content";

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    cover: image(), // Now accepts image imports!
    // ... rest of schema
  }),
});
```
4. Update project MDX files:
```mdx
---
title: "Spaceship"
cover: "../../assets/projects/spaceship/cover.png"
---
```
5. Update `ProjectCard.astro` to use Image component

### Phase 3: Optimize ProjectSection Images
For images within MDX content, you have two options:

**Option A: Import in frontmatter**
```mdx
---
title: "Spaceship"
images:
  searchFlow: "../../assets/projects/spaceship/search-flow.png"
  flowchart: "../../assets/projects/spaceship/flowchart.png"
---

<ProjectSection image={frontmatter.images.searchFlow} />
```

**Option B: Custom MDX Image Component**
Create `src/components/mdx/OptimizedImage.astro`:
```astro
---
import { Image } from 'astro:assets';
import { getImage } from 'astro:assets';

interface Props {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

const { src, alt, width, height } = Astro.props;
const imagePath = await import(`../../assets/${src}`);
---

<Image src={imagePath.default} alt={alt} width={width} height={height} />
```

### Phase 4: Bulk Migration (Optional)
Use a script to move all images and update references.

## Quick Win: Optimize Just the Covers

The easiest high-impact change is optimizing project cover images:

1. They're displayed on the main page (high visibility)
2. Only 3-5 images to migrate
3. Simple to update in ProjectCard component

**Estimated savings:**
- Current: ~3-5MB of PNG covers
- Optimized: ~500KB-1MB (80%+ reduction)

## Alternative: Keep in Public + Manual Optimization

If you want to keep images in `public/`:
1. Use tools like ImageOptim, Squoosh, or Sharp CLI
2. Manually create WebP versions
3. Use `<picture>` element for fallbacks

This gives you control but requires manual work for each image.

## Recommendation

**Start small:** Migrate just the project cover images first. This gives you the biggest performance win with minimal effort.

Once covers are done, decide if you want to migrate the rest or keep them in public/.
