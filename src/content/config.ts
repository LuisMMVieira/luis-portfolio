import { defineCollection, z } from "astro:content";

const themeField = (fallback: "dark" | "light") =>
  z.enum(["dark", "light"]).optional().default(fallback);

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    cover: z.string(),
    order: z.number(),
    period: z.string().optional(),
    draft: z.boolean().optional().default(false),
    theme: themeField("dark"),
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
    theme: themeField("light"),
  }),
});

const reports = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    date: z.date(),
    draft: z.boolean().optional().default(false),
    theme: themeField("dark"),
  }),
});

export const collections = { projects, articles, reports };
