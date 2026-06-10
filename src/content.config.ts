import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/**
 * Member names are used as join keys (the old Jekyll `slug`). Only a few
 * member files exist today, so award/project/patent `members` stay loose
 * strings (manual lookup + graceful fallback) instead of `reference()`,
 * which would fail the build on unmatched names.
 */
const memberNames = z.array(z.string()).optional();

const members = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/members" }),
  schema: z.object({
    name: z.string(),
    affiliation: z.string().nullish(),
    role: z.string().nullish(),
    type: z.string().nullish(),
    time: z.coerce.string().nullish(), // season string e.g. "24'25" — NOT a date
    echelon: z.union([z.string(), z.number()]).nullish(),
    grade: z.coerce.number().nullish(),
    image: z.string().nullish(),
    award: z.boolean().default(false),
    featured: z.boolean().default(false),
    description: z.string().nullish(),
    links: z
      .object({
        github: z.string().nullable().optional(),
        "home-page": z.string().nullable().optional(),
        bilibili: z.string().nullable().optional(),
        email: z.string().nullable().optional(),
      })
      .partial()
      .optional(),
  }),
});

const awards = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/awards" }),
  schema: z.object({
    name: z.string(),
    type: z.string().nullish(),
    prize: z.string().nullish(),
    date: z.coerce.date().optional(),
    members: memberNames,
    description: z.string().nullish(),
    detail: z.boolean().default(false),
  }),
});

const events = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/events" }),
  schema: z.object({
    name: z.string(),
    red: z.string(),
    blue: z.string(),
    red_score: z.coerce.number().default(0),
    blue_score: z.coerce.number().default(0),
    red_logo: z.string().nullish(),
    blue_logo: z.string().nullish(),
    date: z.coerce.date(),
    link: z.string().nullish(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/projects" }),
  schema: z.object({
    name: z.string(),
    type: z
      .string()
      .transform((s) => s.trim())
      .nullish(),
    date: z.coerce.date().optional(),
    members: memberNames,
    description: z.string().nullish(),
    image: z.string().nullish(),
  }),
});

const patents = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/patents" }),
  schema: z.object({
    name: z.string(),
    ID: z.string(),
    type: z
      .string()
      .transform((s) => s.trim()),
    members: z.array(z.string()),
    projects: z.array(z.string()).nullable().optional(),
    date: z.coerce.date().optional(),
  }),
});

/** Blog posts + team news share one shape (the old `post` layout). */
const postSchema = z.object({
  title: z.string(),
  date: z.coerce.date().optional(),
  author: z.string().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
});

const posts = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/posts" }),
  schema: postSchema,
});

const news = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/news" }),
  schema: postSchema,
});

export const collections = { members, awards, events, projects, patents, posts, news };
