# GEO Audit Report: WebwinkelCommunity

**Audit Datum:** 18 april 2026
**URL:** https://webwinkelcommunity.nl
**Business Type:** Publisher / Community Platform (Dutch e-commerce community)
**CMS:** WordPress 6.9.4 met Rank Math PRO
**Pagina's Geanalyseerd:** Homepage, blog (20+ artikelen), kenniscentrum (169 artikelen), over-ons, contact, inner-circle, geverifieerde-webwinkels

---

## Executive Summary

**Overall GEO Score: 47/100 (Poor)**

WebwinkelCommunity heeft een solide technische basis (volledig server-rendered, alle AI-crawlers toegestaan, actieve sitemap) en produceert regelmatig inhoudelijk sterke content voor de Nederlandse e-commerce markt. Echter: de site is vrijwel onzichtbaar voor AI-systemen als citeerbron. De drie grootste blokkades zijn (1) nul externe brand authority — geen Wikipedia, geen Reddit, slechts 196 LinkedIn-volgers — waardoor AI-modellen de organisatie niet als erkende entiteit kennen; (2) ontbrekende `sameAs`-links in schema waardoor entity-koppeling onmogelijk is; en (3) een `llms.txt` die technisch bestaat maar raw CSS-code bevat in plaatsbeschrijvingen, wat AI-crawlers actief misleidt in plaats van helpt.

### Score Overzicht

| Categorie | Score | Gewicht | Gewogen Score |
|---|---|---|---|
| AI Citability | 58/100 | 25% | 14.5 |
| Brand Authority | 22/100 | 20% | 4.4 |
| Content E-E-A-T | 54/100 | 20% | 10.8 |
| Technical GEO | 62/100 | 15% | 9.3 |
| Schema & Structured Data | 34/100 | 10% | 3.4 |
| Platform Optimization | 47/100 | 10% | 4.7 |
| **Overall GEO Score** | | | **47/100** |

---

## Kritieke Issues (Direct Oplossen)

### 1. Organization schema heeft nul `sameAs` links
**Pagina:** Sitewide (alle pagina's via Rank Math global settings)
**Impact:** Alle AI-platforms (ChatGPT, Gemini, Bing Copilot)

De `sameAs`-property ontbreekt volledig in het Organization-schema. De LinkedIn-, Facebook- en Twitter/X-profielen staan wél in de footer-HTML maar zijn nergens in de structured data gedeclareerd. Zonder `sameAs` kan geen enkel AI-model WebwinkelCommunity als bekende organisatie-entiteit herkennen.

**Fix:** Rank Math → Titles & Meta → Global Settings → Knowledge Graph → Social Profiles. Voeg toe:
- `https://www.linkedin.com/company/webwinkelcommunity/`
- `https://www.facebook.com/webwinkelcommunity/`
- `https://twitter.com/webwinkelcommun`

---

### 2. Person schema `sameAs` verwijst naar eigen site
**Pagina:** Sitewide (alle pagina's via auteur-schema)
**Impact:** ChatGPT entity resolution, E-E-A-T autoriteit

De Person-schema voor Patrick Heijmans bevat `"sameAs": ["https://webwinkelcommunity.nl"]` — dit is de eigen organisatiepagina, niet een extern profiel. Dit levert nul cross-platform entity-linking op.

**Fix:** WordPress → Users → Patrick → Social Profiles in Rank Math. Vervang door Patrick's LinkedIn-profiel URL en eventuele persoonlijke social accounts.

---

### 3. `llms.txt` bestaat maar bevat corrupted content
**Pagina:** https://webwinkelcommunity.nl/llms.txt
**Impact:** ChatGPT web search, Perplexity AI

Het bestand retourneert HTTP 200 maar de inner-circle entry bevat raw scoped CSS-code in de paginabeschrijving in plaats van natural language tekst. Dit misleidt AI-crawlers actief.

**Fix:** Herbouw het bestand met schone Markdown-beschrijvingen (zie template onder Technical GEO sectie).

---

### 4. Nul externe bronvermelding in alle artikelen
**Pagina:** Alle blog- en kenniscentrum-pagina's
**Impact:** E-E-A-T Trustworthiness, AI citability

Elk geanalyseerd artikel citeert nul externe bronnen. Claims worden gedaan zonder verwijzing naar CBS, Thuiswinkel.org, Emerce of platform-documentatie. AI-systemen én Google's Quality Raters gebruiken citatiepraktijken als directe vertrouwensindicator.

**Fix:** Voeg minimaal 2-3 outbound citations toe per artikel naar aantoonbare industrie-databronnen.

---

### 5. Geen affiliate/gesponsord content disclosure
**Pagina:** Alle artikelen; about-pagina vermeldt wél een affiliateprogramma
**Impact:** GDPR/ACM compliance, Google Quality Rater Guidelines, Trustworthiness

De site heeft een affiliateprogramma maar geen enkele disclosure is zichtbaar op individuele artikelen. Dit is een compliance-risico (ACM-richtlijnen voor reclame-identificatie) én een directe E-E-A-T-afbreuk.

**Fix:** Voeg een vaste disclosure-banner toe aan alle artikelen met commerciële relaties. Publiceer ook een editorial standards pagina.

---

## High Priority Issues (Oplossen binnen 1 week)

| # | Issue | Pagina's | Platforms |
|---|---|---|---|
| H1 | Geen Wikipedia/Wikidata-aanwezigheid voor de organisatie | — | ChatGPT, Gemini, Bing Copilot |
| H2 | Brand authority 22/100 — geen Reddit, 196 LinkedIn-volgers | — | Alle platforms |
| H3 | Homepage citability 28/100 — puur marketingtekst, geen data | Homepage | Alle platforms |
| H4 | Ontbrekende `og:image` en `twitter:image` op homepage | Homepage | Perplexity, Bing Copilot |
| H5 | Ontbrekende security headers: HSTS, X-Frame-Options, X-Content-Type-Options | Sitewide | — |
| H6 | Geen FAQPage schema op 169 kenniscentrum-artikelen | Kenniscentrum | Google AIO, Gemini |
| H7 | BlogPosting `headline` bevat " - WebwinkelCommunity" suffix | Alle blogposts | Google AIO |
| H8 | Person schema mist `jobTitle`, `description`, `knowsAbout` | Sitewide | ChatGPT, AIO |
| H9 | Geen zichtbare "Laatst bijgewerkt" datum op artikelen | Blog, Kenniscentrum | Perplexity, Bing |
| H10 | Geen BreadcrumbList schema op enige pagina | Sitewide | Google AIO, Gemini |

---

## Medium Priority Issues (Oplossen binnen 1 maand)

| # | Issue | Pagina's |
|---|---|---|
| M1 | Identieke artikel-template op elke post (AI-productie signaal) | Blog |
| M2 | IndexNow niet geactiveerd (Rank Math PRO ondersteunt het natively) | — |
| M3 | Geen Bing Webmaster Tools verificatie (msvalidate.01 ontbreekt) | Homepage |
| M4 | jQuery en jQuery Migrate laden synchroon in `<head>` (render-blocking) | Sitewide |
| M5 | Verkeerde schema-types: Contact-pagina als `Article`, Kenniscentrum als `Article` | /contact/, /kenniscentrum/ |
| M6 | Geen `speakable` specification in BlogPosting schema | Alle blogposts |
| M7 | Anonieme case study zonder bedrijfsnaam, sector of platform | Groeiplan artikel |
| M8 | Blog en kenniscentrum niet onderling gelinkt (content silos) | Blog, Kenniscentrum |
| M9 | Meta description typo ("recourses" i.p.v. "resources") + te kort (119 chars) | Homepage |
| M10 | Geen vergelijkingstabellen op webshop-software en keurmerken pagina's | /webshop-software/, /keurmerken/ |
| M11 | Oprichtingsjaar discrepantie: site zegt 2013, LinkedIn zegt 2014 | Homepage, LinkedIn |
| M12 | Antwoordparagrafen na H2-headings te lang (>100 woorden) voor AIO extractie | Blog |

---

## Low Priority Issues (Optimaliseer wanneer mogelijk)

| # | Issue |
|---|---|
| L1 | YouTube-kanaal niet bevestigd of aanwezig (ontbreekt als Google ecosystem signaal) |
| L2 | WordPress `<meta name="generator">` tag lekt versienummer (6.9.4) |
| L3 | `local-sitemap.xml` stale lastmod van 2024-03-05 (>2 jaar geleden) |
| L4 | `Permissions-Policy` header dekt geen camera, microfoon, geolocation |
| L5 | Trustindex Google Reviews widget is JS-rendered — niet zichtbaar voor AI-crawlers |
| L6 | Sleak chatbot script laadt zonder `async` of `defer` |
| L7 | LinkedIn company page heeft slechts 196 volgers voor een community platform |
| L8 | Geen `isAccessibleForFree: true` of `keywords` array in BlogPosting schema |

---

## Categorie Deep Dives

### AI Citability — 58/100

**Sterkste citeerbare blokken:**

| Passage | Score | Locatie |
|---|---|---|
| E-commerce groeiplan metrics (+0.6% conversie, +9% AOV, -11% retour, email 7%→16%) | 79/100 | Groeiplan artikel |
| Checkout sprint structuur (Week 1-4 tabel + abandoned checkout timing) | 71/100 | Checkout artikel |
| SEO publicatieritme template (wekelijks/maandelijks/kwartaal cadans) | 70/100 | SEO-contentmodel artikel |

**Zwakste blokken:**
- Homepage value propositions ("Exclusieve kennisdeling", "24/7 ondersteuning"): **28/100** — pure marketing copy, nul data
- Founder statement zonder metrics: **37/100**
- Kenniscentrum categorienavigatie: **25/100** — alleen labels, geen inhoud

**Structurele sterkte:** H2-per-tip patroon (25 H2's in conversie-artikel), vraag-gebaseerde headings ("Hoe begin ik een webshop?"), kenniscentrum "Wat is..."-structuur zijn sterk voor AI-extractie.

**Structurele zwakte:** Eerste paragraaf na H2 is gemiddeld 100-125 woorden. Google AI Overviews wil een direct antwoord in 40-60 woorden direct na de heading, gevolgd door uitleg.

---

### Brand Authority — 22/100

| Platform | Status | Details |
|---|---|---|
| Wikipedia | Afwezig | Geen artikel voor WebwinkelCommunity of Patrick Heijmans |
| Wikidata | Afwezig | Geen entiteit gevonden |
| Reddit | Afwezig | Nul discussies of vermeldingen gevonden |
| YouTube | Onbevestigd | Niet detecteerbaar (EU consent gate) |
| LinkedIn | Aanwezig maar dun | 196 volgers, opgericht 2014 (discrepantie met site) |
| Facebook | Aanwezig | Pagina gedetecteerd, niet in schema gelinkt |
| Twitter/X | Aanwezig | @webwinkelcommun — niet in schema gelinkt |
| KVK | Aanwezig | 58489282 — geeft baseline entity-legitimiteit |
| Vakpers (Emerce, Twinkle) | Niet gevonden | Geen detecteerbare persvermelding |

**Kern van het probleem:** AI-modellen (met name ChatGPT en Gemini) bouwen entity-profielen op basis van wat derden over een organisatie zeggen. WebwinkelCommunity wordt nergens door derden geciteerd op platforms die AI-modellen raadplegen. De organisatie is dus niet "onbekend" maar "onbevestigd" voor AI-systemen.

**Pad naar verbetering:** Wikipedia-aanwezigheid vereist eerst citeerbare externe redactionele vermeldingen (Emerce, Twinkle Magazine, Thuiswinkel.org). Haal een artikel of interview in een erkend e-commerce medium → gebruik dat als Wikipedia-referentie.

---

### Content E-E-A-T — 54/100

| Dimensie | Score | Kernbevinding |
|---|---|---|
| Experience | 11/25 | Één anonieme case study met echte metrics; rest zijn generieke scenario's zonder benoemde klanten, platforms of tijdsframes |
| Expertise | 13/25 | Patrick Heijmans als vaste auteur met relevante marktkennis; geen verifieerbare credentials, geen externe author-aanwezigheid |
| Authoritativeness | 14/25 | 12 jaar operationeel, KVK-registratie, 169 kenniscentrum-artikelen; nul externe citaties of media-vermeldingen |
| Trustworthiness | 15/25 | HTTPS, volledig contactadres, KVK+BTW gepubliceerd, privacy/terms aanwezig; geen editorial standards, geen affiliate disclosure |

**AI Content Indicator:** De identieke artikel-template (`Intro / [Probleem] / [Framework] / Valkuilen en oplossingen / 30/60/90-dagen actieplan / CTA`) verschijnt op alle geanalyseerde blogposts, wat duidt op AI-geassisteerde productie met menselijke review. Dit is niet inherent slecht, maar het ontbreken van originele data, anonieme case studies en template-herhaling bij hoge publicatiefrequentie (4 artikelen in 9 dagen) vormt een zwakte voor citability.

---

### Technical GEO — 62/100

**Sterktes:**
- Volledig server-rendered WordPress (geen SPA-shell) — AI-crawlers zien complete HTML
- HTTP/2 + HTTP/3 (QUIC) via LiteSpeed
- Sitemap-index met 4 sub-sitemaps, correct gedeclareerd in robots.txt
- Alle AI-crawlers zijn technisch toegestaan (wildcard User-Agent)
- `<html lang="nl-NL">` correct ingesteld
- Hero-afbeelding heeft `fetchpriority="high"` en expliciete dimensies

**Render-blocking risico's:**
- jQuery + jQuery Migrate synchroon in `<head>` (geen `defer`)
- `clonable-subfolder-ajax-middleware-js` synchroon
- Sleak chatbot script zonder `defer`/`async`
- Font Awesome dubbel geladen (CDN + lokaal)

**Security header gaps:**

| Header | Status |
|---|---|
| HSTS | Ontbreekt |
| X-Frame-Options | Ontbreekt |
| X-Content-Type-Options | Ontbreekt |
| CSP | Aanwezig maar leeg (`upgrade-insecure-requests;` only) |
| Referrer-Policy | Correct (`strict-origin-when-cross-origin`) |

**llms.txt status:** Het bestand bestaat (HTTP 200) maar bevat in de inner-circle entry raw scoped CSS-code in plaats van een paginabeschrijving. Herbouw vereist.

**Aanbevolen llms.txt template:**
```markdown
# WebwinkelCommunity

> De onafhankelijke Nederlandstalige community voor webwinkelondernemers.
> Opgericht in 2013 door Patrick Heijmans. Gericht op kennisdeling,
> netwerken en praktische tools voor webshop groei.

## Kennisbank
- [E-commerce Kennisbank](https://webwinkelcommunity.nl/kenniscentrum/): 169 praktische gidsen over SEO, conversie, betaalmethodes, logistiek, klantenservice en meer.

## Blog
- [Blog](https://webwinkelcommunity.nl/blog/): Artikelen over e-commerce strategie, groeiplannen en webshop optimalisatie.

## Community
- [Geverifieerde Webwinkels](https://webwinkelcommunity.nl/geverifieerde-webwinkels/): Directory van geverifieerde Nederlandse webwinkels.
- [Inner Circle](https://webwinkelcommunity.nl/inner-circle/): Premium membership voor serieuze e-commerce ondernemers.

## Over
- [Over WebwinkelCommunity](https://webwinkelcommunity.nl/over-ons/): Achtergrond, missie en het team achter het platform.
- [Contact](https://webwinkelcommunity.nl/contact/): Contactgegevens en formulier.

## Optional
- [Sitemap](https://webwinkelcommunity.nl/sitemap_index.xml): Volledige inhoudsindex.
```

---

### Schema & Structured Data — 34/100

**Schema types aanwezig:**

| Type | Pagina's | Status |
|---|---|---|
| Organization | Sitewide | Aanwezig maar incompleet — geen `sameAs`, `description`, `address` in schema |
| WebSite + SearchAction | Homepage | Correct geïmplementeerd |
| BlogPosting | Blogposts | Aanwezig maar `headline` bevat " - WebwinkelCommunity" suffix |
| WebPage | Meerdere | Correct |
| Person (Patrick Heijmans) | Sitewide | `sameAs` verwijst naar eigen site — broken |
| Article | Homepage, Contact, Kenniscentrum | **Semantisch incorrect** — Contact/Homepage zijn geen Article-types |
| ImageObject | Postpagina's | Correct |

**Volledig afwezig:**
- `BreadcrumbList` — op geen enkele pagina
- `FAQPage` — op geen van de 169 kenniscentrum-artikelen
- `speakable` — nergens geïmplementeerd
- `ContactPage` type voor /contact/
- `AboutPage` type voor /over-ons/
- `Organization.sameAs` — de meest kritieke ontbrekende property

**Hoogste impact fix (15 minuten werk):**
In Rank Math → Titles & Meta → Global Settings → Knowledge Graph voeg social profiles toe. Dit genereert automatisch `sameAs` op de Organization-entiteit op elke pagina.

---

### Platform Optimization — 47/100

| Platform | Score | Sterkste Signaal | Grootste Gap |
|---|---|---|---|
| Google AI Overviews | 52/100 | Rank Math schema, vraag-H2 structuur | Geen FAQPage schema, antwoorden te lang |
| ChatGPT Web Search | 38/100 | Server-rendered content toegankelijk | Geen Wikipedia, geen Organization sameAs |
| Perplexity AI | 46/100 | Kenniscentrum als primaire bron (169 artikelen) | Forum achter login, llms.txt corrupt |
| Google Gemini | 50/100 | Topicale diepte via kenniscentrum | Geen YouTube kanaal, geen BreadcrumbList |
| Bing Copilot | 39/100 | LinkedIn aanwezigheid (Microsoft-eigendom) | Geen IndexNow, geen msvalidate.01 |

---

## Quick Wins — Implementeer Deze Week

1. **Voeg `sameAs` toe aan Organization schema in Rank Math** — 15 minuten, impact op alle AI-platforms. Rank Math → Global Settings → Knowledge Graph → Social Profiles.

2. **Herstel `llms.txt`** — 1-2 uur. Verwijder de entry met CSS-code, schrijf schone natural language beschrijvingen voor alle secties. Gebruik de template hierboven.

3. **Voeg `og:image` toe aan homepage** — 10 minuten in Rank Math. Gebruik het bestaande hero-beeld op 1200×630px. Voorkomt lege preview-cards in AI-antwoorden.

4. **Herstel meta description** — Corrigeer "recourses" → "resources" en verleng naar 150-160 tekens. Rank Math → Titles & Meta → Homepage.

5. **Activeer IndexNow in Rank Math PRO** — onder 10 minuten. Rank Math → General Settings → IndexNow. Zorgt dat Bing (en Copilot) nieuwe content direct indexeert.

6. **Voeg Bing Webmaster Tools verificatie toe** — 5 minuten. Genereer msvalidate.01 meta tag via Bing Webmaster Tools en voeg toe via Rank Math.

7. **Voeg security headers toe via .htaccess of LiteSpeed config:**
   ```apache
   Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
   Header always set X-Frame-Options "SAMEORIGIN"
   Header always set X-Content-Type-Options "nosniff"
   ```

8. **Fix Person schema `sameAs`** — 5 minuten. WordPress → Users → Patrick → Social Profiles in Rank Math. Vervang huidige waarde door Patrick's echte LinkedIn-URL.

---

## 30-Dagen Actieplan

### Week 1: Schema & Technische Basislaag
- [ ] Organization `sameAs` toevoegen in Rank Math (LinkedIn, Facebook, Twitter/X)
- [ ] Person `sameAs` corrigeren naar externe profielen
- [ ] `llms.txt` herbouwen met schone beschrijvingen
- [ ] `og:image` + `twitter:image` toevoegen aan homepage
- [ ] Security headers toevoegen (HSTS, X-Frame-Options, X-Content-Type-Options)
- [ ] IndexNow activeren in Rank Math PRO
- [ ] Bing Webmaster Tools verificatie
- [ ] Meta description typo fixen + uitbreiden

### Week 2: Content Vertrouwen & E-E-A-T
- [ ] Affiliate disclosure toevoegen aan alle artikelen (sticky banner of inline)
- [ ] Editorial standards pagina publiceren
- [ ] "Laatst bijgewerkt" datum zichtbaar maken in artikel-body (niet alleen in schema)
- [ ] BlogPosting `headline` suffix fixen in Rank Math schema instellingen
- [ ] `jobTitle`, `description`, `knowsAbout` toevoegen aan Person schema
- [ ] Uitgebreide auteur-biografie publiceren op `/author/patrick/`

### Week 3: Schema Uitbreiding
- [ ] FAQPage schema activeren op top 20 kenniscentrum-artikelen via Rank Math FAQ-blok
- [ ] BreadcrumbList inschakelen sitewide via Rank Math → Titles & Meta → Breadcrumbs
- [ ] ContactPage schema toepassen op /contact/
- [ ] AboutPage schema toepassen op /over-ons/
- [ ] `speakable` toevoegen aan BlogPosting template
- [ ] `isAccessibleForFree: true` en `keywords` array toevoegen aan alle blogposts

### Week 4: Citability & Content Kwaliteit
- [ ] Top 10 blog-artikelen herschrijven: direct antwoord (40-60 woorden) direct na elke H2
- [ ] 2-3 externe bronverwijzingen per artikel toevoegen (CBS, Thuiswinkel.org, Emerce)
- [ ] Vergelijkingstabellen bouwen op `/webshop-software/` en `/keurmerken/` pagina's
- [ ] Bidirectionele links leggen tussen blog-artikelen en kenniscentrum-entries
- [ ] Anonieme case study uitbreiden met sector, platform en tijdsframe (indien mogelijk)
- [ ] Homepage value propositions vervangen door data-gedreven claims (leden, artikelen, jaar)

---

## Appendix: Geanalyseerde Pagina's

| URL | Type | Kernissues |
|---|---|---|
| https://webwinkelcommunity.nl/ | Homepage | og:image ontbreekt, citability 28/100, Article schema incorrect |
| https://webwinkelcommunity.nl/blog/ | Blog index | Publicatiedatums niet zichtbaar in listing |
| https://webwinkelcommunity.nl/over-ons/ | About | WebPage i.p.v. AboutPage schema, geen team credentials |
| https://webwinkelcommunity.nl/contact/ | Contact | Article schema incorrect, ContactPage type ontbreekt |
| https://webwinkelcommunity.nl/kenniscentrum/ | KB index | Article schema incorrect, CollectionPage type vereist |
| https://webwinkelcommunity.nl/inner-circle/ | Sales | llms.txt entry bevat CSS-code |
| Blog: e-commerce groeiplan artikel | BlogPosting | Headline suffix, anonieme case study, geen bronvermeldingen |
| Blog: checkout optimalisatie artikel | BlogPosting | Headline suffix, geen bronvermeldingen |
| Blog: SEO-contentmodel artikel | BlogPosting | Identieke template-structuur als andere posts |
| Blog: lifecycle email artikel | BlogPosting | Identieke template-structuur als andere posts |
| https://webwinkelcommunity.nl/robots.txt | Config | Geen AI-crawler specifieke directives |
| https://webwinkelcommunity.nl/llms.txt | Config | Bestaat maar bevat corrupted content (raw CSS) |
| https://webwinkelcommunity.nl/sitemap_index.xml | Config | Correct, local-sitemap stale (2024-03-05) |

---

*Rapport gegenereerd door 5 parallelle GEO-analyse subagents op 18 april 2026.*
*Methodologie: GEO Audit Skill v1.0 — AI Citability (25%) + Brand Authority (20%) + Content E-E-A-T (20%) + Technical GEO (15%) + Schema (10%) + Platform Optimization (10%)*
