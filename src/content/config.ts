import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    excerpt: z.string().optional(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Redactie'),
    authorInitial: z.string().optional(),
    authorRole: z.string().optional(),
    category: z.string().default('Algemeen'),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    readingTime: z.string().optional(),
    featured: z.boolean().default(false),
    wpId: z.number().optional(), // original WordPress post ID, handy for mapping
  }),
});

export const collections = { blog };
