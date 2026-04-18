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
    wpId: z.number().optional(),
  }),
});

const events = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    type: z.enum(['Masterclass', 'Workshop', 'Meetup', 'Pod-call']),
    date: z.coerce.date(),
    endTime: z.string().optional(),
    location: z.string(),
    skoolUrl: z.string().url().optional(),
    skoolId: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

const experts = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    role: z.string(),
    tag: z.string(),
    photo: z.string().optional(),
    initial: z.string().max(2),
    stat: z.string(),
    since: z.string().optional(),
    order: z.number().default(99),
    active: z.boolean().default(true),
  }),
});

const pricing = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    desc: z.string(),
    price: z.string(),
    unit: z.string().default('/ maand'),
    tag: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(99),
    features: z.array(z.string()),
    cta: z.string().default('Start 14 dagen gratis'),
    ctaUrl: z.string().default('#'),
  }),
});

export const collections = { blog, events, experts, pricing };
