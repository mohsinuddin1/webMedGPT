import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('MedGPT Team'),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    tags: z.array(z.string()).default([]),
    shortAnswer: z.string().optional(),
    about: z.array(z.string()).default([]),
    mentions: z.array(z.string()).default([]),
    sources: z.array(z.object({
      name: z.string(),
      url: z.string(),
      description: z.string().optional(),
    })).default([]),
    readingTime: z.string().default('5 min read'),
    featured: z.boolean().default(false),
  }),
});

export const collections = { blog };
