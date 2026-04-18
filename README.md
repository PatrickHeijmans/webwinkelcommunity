# WebwinkelCommunity — Astro

Premium B2B community site + blog voor webshop ondernemers. Gebouwd met [Astro](https://astro.build).

## Quick start

```bash
npm install
cp .env.example .env   # vul WP_SITE_URL in
npm run dev            # → http://localhost:4321
```

## WordPress blog importeren

```bash
npm run import:wp
```

Het script haalt via `/wp-json/wp/v2/*` alle posts, categories, tags, auteurs en featured images op, converteert HTML → Markdown (via `turndown`), downloadt media naar `public/blog-media/` en schrijft `.md` bestanden met volledige frontmatter.

## Structuur

```
src/
├── components/           # Hero, Benefits, Experts, Events, Pricing, About, FinalCTA, Nav, Footer, PostCard
├── content/
│   ├── blog/             # Geïmporteerde / eigen posts (.md)
│   └── config.ts         # Blog schema
├── layouts/BaseLayout.astro
├── pages/
│   ├── index.astro       # Homepage (alle secties)
│   ├── blog/index.astro  # Blog overzicht
│   ├── blog/[...slug].astro  # Artikel detail
│   └── rss.xml.js        # RSS feed
├── styles/global.css     # Design tokens
└── i18n.ts               # NL/EN vertaalingen (uitbreidbaar)
```

## Deploy

### Optie 1: Cloudflare Pages (aanbevolen)
1. Push naar GitHub
2. Cloudflare dashboard → Pages → Connect Git
3. Build command: `npm run build` · Output: `dist`
4. DNS: point `webwinkelcommunity.nl` naar Cloudflare

### Optie 2: Vercel
1. Push naar GitHub
2. Import repo in Vercel — detectie is automatisch
3. Voeg `webwinkelcommunity.nl` toe als custom domain

### Optie 3: Netlify
1. `netlify.toml` met `build = "npm run build"` en `publish = "dist"`
2. Drag & drop `dist/` folder of connect git

## Pre-launch checklist

- [ ] Vervang placeholder images door echte foto's (members, events, experts)
- [ ] Update Skool URL in `Hero.astro`
- [ ] Legal pages: `/privacy`, `/voorwaarden`, `/cookies`
- [ ] Newsletter form koppelen aan Mailchimp/Klaviyo/Brevo
- [ ] Payment: Mollie of Stripe integratie voor lidmaatschappen
- [ ] Analytics: Plausible (privacy-friendly) of GA4
- [ ] OG images voor social shares
- [ ] 301 redirects van oude WP URLs → Astro slugs
- [ ] `astro build` draaien en `dist/` checken voor build errors
