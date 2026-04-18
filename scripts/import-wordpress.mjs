#!/usr/bin/env node
/**
 * WordPress → Astro content collection importer
 *
 * Reads posts, categories, tags, authors and featured media from a WordPress
 * site via the public REST API and writes Markdown files to src/content/blog/.
 *
 * Usage:
 *   WP_SITE_URL=https://example.nl node scripts/import-wordpress.mjs
 *   or set WP_SITE_URL in .env and run: npm run import:wp
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import TurndownService from 'turndown';

// --- Config ---
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const blogDir = path.join(projectRoot, 'src/content/blog');
const mediaDir = path.join(projectRoot, 'public/blog-media');

// Load .env (simple parser, avoids a dependency)
try {
  const env = await fs.readFile(path.join(projectRoot, '.env'), 'utf8');
  for (const line of env.split('\n')) {
    const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^['"]|['"]$/g, '');
  }
} catch {}

const SITE = process.env.WP_SITE_URL?.replace(/\/$/, '');
const PER_PAGE = parseInt(process.env.WP_PER_PAGE || '100', 10);
const AUTH = (process.env.WP_USERNAME && process.env.WP_APPLICATION_PASSWORD)
  ? 'Basic ' + Buffer.from(`${process.env.WP_USERNAME}:${process.env.WP_APPLICATION_PASSWORD}`).toString('base64')
  : null;

if (!SITE) {
  console.error('❌ WP_SITE_URL is not set. Copy .env.example to .env and fill it in.');
  process.exit(1);
}

const headers = AUTH ? { Authorization: AUTH } : {};

async function wpGet(endpoint, params = {}) {
  const url = new URL(`${SITE}/wp-json/wp/v2/${endpoint}`);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`WP ${endpoint} → ${res.status} ${res.statusText}`);
  const total = parseInt(res.headers.get('x-wp-totalpages') || '1', 10);
  const data = await res.json();
  return { data, totalPages: total };
}

async function wpGetAll(endpoint, params = {}) {
  const out = [];
  let page = 1;
  while (true) {
    const { data, totalPages } = await wpGet(endpoint, { ...params, per_page: PER_PAGE, page });
    out.push(...data);
    if (page >= totalPages) break;
    page++;
  }
  return out;
}

async function downloadMedia(url, filename) {
  await fs.mkdir(mediaDir, { recursive: true });
  const dest = path.join(mediaDir, filename);
  try { await fs.access(dest); return `/blog-media/${filename}`; } catch {}
  const res = await fetch(url);
  if (!res.ok) return null;
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.writeFile(dest, buf);
  return `/blog-media/${filename}`;
}

function slugify(s) {
  return s.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function estimateReadingTime(text) {
  const words = text.split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 220));
  return `${minutes} min`;
}

function escapeYaml(s) {
  if (!s) return '""';
  if (!/[:\-#&*!|>'"%@`\n]/.test(s) && s.length < 80) return `"${s.replace(/"/g, '\\"')}"`;
  // multi-line or special chars → block scalar
  return `"${s.replace(/"/g, '\\"').replace(/\n/g, ' ')}"`;
}

function stripHtml(html) {
  return html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

// --- Main ---
console.log(`📥 Importing from ${SITE}`);
await fs.mkdir(blogDir, { recursive: true });

const [posts, cats, tags, users, media] = await Promise.all([
  wpGetAll('posts', { status: 'publish', _embed: 'true' }),
  wpGetAll('categories'),
  wpGetAll('tags'),
  wpGetAll('users'),
  wpGetAll('media', { media_type: 'image' }).catch(() => []),
]);

console.log(`  • ${posts.length} posts, ${cats.length} categories, ${users.length} authors, ${media.length} images`);

const catById = Object.fromEntries(cats.map(c => [c.id, c]));
const tagById = Object.fromEntries(tags.map(t => [t.id, t]));
const userById = Object.fromEntries(users.map(u => [u.id, u]));
const mediaById = Object.fromEntries(media.map(m => [m.id, m]));

const turndown = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  emDelimiter: '_',
  bulletListMarker: '-',
});
// Preserve WP's <!--more--> as separator → strip out
turndown.addRule('wpMore', { filter: (n) => n.nodeType === 8, replacement: () => '' });

let written = 0;
for (const post of posts) {
  const title = stripHtml(post.title.rendered);
  const slug = post.slug || slugify(title);
  const author = userById[post.author];
  const authorName = author?.name || 'Redactie';
  const categoryName = catById[post.categories?.[0]]?.name || 'Algemeen';
  const tagNames = (post.tags || []).map(id => tagById[id]?.name).filter(Boolean);

  // Featured image
  let cover = null;
  let coverAlt = null;
  const fmId = post.featured_media;
  if (fmId && mediaById[fmId]) {
    const m = mediaById[fmId];
    const ext = path.extname(new URL(m.source_url).pathname) || '.jpg';
    const filename = `${slug}${ext}`;
    cover = await downloadMedia(m.source_url, filename);
    coverAlt = m.alt_text || title;
  }

  // Body
  const bodyMd = turndown.turndown(post.content.rendered);
  const plain = stripHtml(post.content.rendered);
  const excerpt = stripHtml(post.excerpt?.rendered || '').slice(0, 200);
  const readingTime = estimateReadingTime(plain);

  const frontmatter = [
    '---',
    `title: ${escapeYaml(title)}`,
    excerpt && `excerpt: ${escapeYaml(excerpt)}`,
    `pubDate: ${new Date(post.date).toISOString()}`,
    post.modified && `updatedDate: ${new Date(post.modified).toISOString()}`,
    `author: ${escapeYaml(authorName)}`,
    `authorInitial: ${escapeYaml(authorName.charAt(0))}`,
    `category: ${escapeYaml(categoryName)}`,
    tagNames.length && `tags: [${tagNames.map(t => escapeYaml(t)).join(', ')}]`,
    cover && `cover: ${escapeYaml(cover)}`,
    coverAlt && `coverAlt: ${escapeYaml(coverAlt)}`,
    `readingTime: ${escapeYaml(readingTime)}`,
    `wpId: ${post.id}`,
    post.sticky && `featured: true`,
    '---',
    '',
    bodyMd,
    '',
  ].filter(Boolean).join('\n');

  await fs.writeFile(path.join(blogDir, `${slug}.md`), frontmatter);
  written++;
  if (written % 10 === 0) console.log(`  ...${written}/${posts.length}`);
}

console.log(`✅ Wrote ${written} posts to src/content/blog/`);
console.log(`✅ Media saved to public/blog-media/`);
console.log(`\nNext: npm run dev and open http://localhost:4321/blog`);
