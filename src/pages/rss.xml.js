import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = (await getCollection('blog'))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
  return rss({
    title: 'WebwinkelCommunity Blog',
    description: 'Praktische tactieken, case studies en founder stories voor webshop ondernemers.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.excerpt || post.data.description || '',
      link: `/blog/${post.slug}/`,
      author: post.data.author,
    })),
    customData: `<language>nl-nl</language>`,
  });
}
