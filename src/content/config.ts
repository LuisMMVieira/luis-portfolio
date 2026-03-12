import { defineCollection, z } from "astro:content";

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    cover: z.string(),
    order: z.number(),
    period: z.string().optional(),
    draft: z.boolean().optional().default(false),
  }),
});

const articles = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    date: z.date(),
    cover: z.string().optional(),
    draft: z.boolean().optional().default(false),
  }),
});

const reports = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    date: z.date(),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = { projects, articles, reports };
