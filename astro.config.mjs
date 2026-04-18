import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
// import sitemap from '@astrojs/sitemap'; < -- Haal dit weg of zet er // voor

export default defineConfig({
  site: 'https://webwinkelcommunity.nl',
  integrations: [
    mdx(), 
    // sitemap() < -- Haal deze ook weg uit de lijst
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: true,
    },
  },
});