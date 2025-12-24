import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    cover: z.string(),
    order: z.number(),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = { projects };

