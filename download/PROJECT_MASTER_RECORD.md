# Oasis Emaar — Complete Project Master Record
**Last Updated:** May 19, 2026
**Status:** All features implemented, deployed, and verified

---

## Project Overview

- **Website**: https://oasisemaar.com
- **Repository**: https://github.com/BabaZayed/Oasis-Emaar
- **Framework**: Next.js 16 (TypeScript) + Tailwind CSS 4 + shadcn/ui
- **Database**: Prisma ORM with SQLite
- **Deployment**: Vercel (auto-deploy from GitHub push)
- **Design System**: Navy (#1A2332), Gold (#C8A45C), Cream (#F5F0E8)

---

## Business Information

- **Business Name**: Oasis Emaar — Authorized Sales Agent
- **Legal Name**: Oasis Emaar Real Estate Brokerage
- **Address**: Al Quoz Street 21, Dubai, UAE
- **Phone**: +971 52 691 9169
- **WhatsApp**: +971526919169
- **Email**: sales@oasisemaar.com
- **Business Hours**: Sun-Thu 09:00-18:00, Fri 14:00-18:00, Sat 10:00-16:00 (GST)
- **RERA Licensed**: Yes

---

## Key Credentials & Environment Variables

| Variable | Value |
|----------|-------|
| NEXT_PUBLIC_META_PIXEL_ID | 1013154287947335 |
| META_CONVERSIONS_API_TOKEN | EAAzMLNdMX9EBRYGkZAe6iJTNZBljhA19Nd6ZC1KcaFjQep9L8c0xgvNsJSxxnGsKPk8eeZBI8RK2jp63Ex1NRw4caUk6gZBlifJyV5bTmX51KZA9F2tA3dlxMwIZAectklG1brVaR4UsJlwpTLNf3ojiSG0YFaSPYkjd5J7cbrfgw4GJaPEMbvuOgbpVzjQ4wZDZD |
| NEXT_PUBLIC_GA_ID | G-QPQCZZ61FN |
| GOOGLE_SHEETS_WEBHOOK_URL | https://script.google.com/macros/s/AKfycbxybY7jvQzQVEg7-37XInWg9Oj-UxtZIG2P0Fr4WVSCpL4QwPslrhasEmMN4vXXoQnPQg/exec |
| NEXT_PUBLIC_GOOGLE_VERIFICATION | (to be set) |
| ADMIN_API_KEY | (set via Vercel dashboard) |

---

## Complete File Structure

### Pages (src/app/)

| Path | Description |
|------|-------------|
| `page.tsx` | Homepage — Hero, Quick Inventory, Community Facts, Projects, Benefits, Paywall, References, Feedback, Seller Marketplace, CTA |
| `layout.tsx` | Root layout — Fonts, Meta Pixel, Google Analytics, 13 JSON-LD schemas |
| `globals.css` | Global styles, Tailwind config |
| `sitemap.ts` | Dynamic sitemap with 15 static + 9 project + blog pages |
| `faq/page.tsx` | FAQ page — FAQPage + Speakable + BreadcrumbList + QAPage + WebPage schemas |
| `projects/page.tsx` | Projects listing page |
| `projects/[slug]/page.tsx` | Project detail — RealEstateListing + BreadcrumbList + VideoObject schemas per cluster |
| `availability/page.tsx` | Availability checker |
| `availability/availability-page-client.tsx` | Availability client component |
| `inventory/page.tsx` | Full inventory page |
| `contact/page.tsx` | Contact page |
| `about/page.tsx` | About page |
| `gallery/page.tsx` | Gallery page |
| `blog/page.tsx` | Blog listing |
| `blog/[slug]/page.tsx` | Blog post detail |
| `master-plan/page.tsx` | Master plan page |
| `master-plan/master-plan-page-client.tsx` | Master plan client component |
| `floor-plans/page.tsx` | Floor plans page |
| `payment-plan/page.tsx` | Payment plan page |
| `sell/page.tsx` | Sell property page |
| `sell/sell-client.tsx` | Sell client component |
| `marketplace/page.tsx` | Buyer marketplace |
| `marketplace/marketplace-client.tsx` | Marketplace client component |
| `listings/page.tsx` | Listings page |
| `listings/listings-page-client.tsx` | Listings client component |
| `api/leads/route.ts` | Lead capture API — Google Sheets + Meta CAPI + lead scoring + spam detection |
| `api/route.ts` | Health check API |
| `api/ai-context/route.ts` | AI context API endpoint |
| `api/marketplace/route.ts` | Marketplace API |

### Components (src/components/)

| Component | Description |
|-----------|-------------|
| `hero-section.tsx` | Homepage hero with CTA |
| `quick-inventory-section.tsx` | Quick inventory with bedroom filters, cluster grouping |
| `projects-section.tsx` | Projects preview cards |
| `project-detail-page.tsx` | Full project detail page component |
| `project-facts-section.tsx` | Project facts grid |
| `floor-plans-section.tsx` | Floor plans display |
| `gallery-section.tsx` | Image gallery |
| `benefits-section.tsx` | Benefits section |
| `aeo-faq-section.tsx` | AEO-optimized FAQ accordion |
| `faq-section.tsx` | FAQ section component |
| `paywall-section.tsx` | Premium content paywall |
| `paywall-modal.tsx` | Paywall modal — Lead + CompleteRegistration events |
| `property-card.tsx` | Property listing card |
| `property-detail-modal.tsx` | Property detail modal (Sheet on mobile, Dialog on desktop) |
| `project-detail-modal.tsx` | Project detail modal |
| `inventory-section.tsx` | Full inventory with grid/list view, filters |
| `contact-section.tsx` | Contact form — Lead + Contact events |
| `feedback-section.tsx` | Customer feedback section |
| `references-section.tsx` | References/testimonials |
| `about-section.tsx` | About section |
| `stats-section.tsx` | Statistics section |
| `payment-plan-section.tsx` | Payment plan display |
| `site-header.tsx` | Navigation header with inventory badge |
| `site-footer.tsx` | Footer |
| `whatsapp-button.tsx` | Floating WhatsApp button — AddToWishlist event |
| `exit-intent-popup.tsx` | Exit intent popup — Lead event |
| `ui/` | 40+ shadcn/ui components |

### Data & Utilities (src/lib/)

| File | Description |
|------|-------------|
| `data.ts` | All project data, 76 inventory items, floor plans, master plan facts |
| `blog-data.ts` | 6 blog posts with full content |
| `meta-pixel.ts` | Meta Pixel event tracking utility (10 event types) |
| `db.ts` | Prisma database client |
| `utils.ts` | Utility functions |
| `paywall-store.ts` | Paywall state management |

### AI-Readable Files (public/)

| File | Description |
|------|-------------|
| `llms.txt` | AI-readable summary (177 lines) — condensed version |
| `llms-full.txt` | Comprehensive AI content (870+ lines) — extended version |
| `ai-agent.md` | AI agent instructions (134 lines) |
| `robots.txt` | Allows 9 AI crawlers, references AI files, blocks API routes |

### Static Assets (public/images/)

| Directory | Contents |
|-----------|----------|
| `projects/` | 9 project hero images |
| `gallery/` | 80+ gallery/render/factsheet images |
| `floorplans/` | 27 floor plan images (9 projects x 3 types) |
| `inventory/` | Lavita floor plans + cluster map |
| `maps/` | Master plan, Lavita, Palmeira Collective, Address Villas Tierra maps |
| Root | hero-oasis.png, hero-oasis-aerial.png, villa.png, mansion.png, penthouse.png, townhouse.png, apartment.png, og-image.jpg |

---

## AEO/AIO Optimization — Complete Inventory (100%)

### JSON-LD Structured Data Schemas

#### Homepage (layout.tsx) — 13 Schemas

| # | Schema Type | Purpose |
|---|-------------|---------|
| 1 | LocalBusiness + RealEstateAgent | Business entity with address, hours, price range |
| 2 | FAQPage | 8 FAQ Q&A pairs for Google rich results |
| 3 | SpeakableSpecification | Voice search optimization (xpath + cssSelector) |
| 4 | ItemList (9 properties) | All 9 clusters as RealEstateListings |
| 5 | WebSite + SearchAction | Sitelinks search box for Google |
| 6 | Organization | Business entity with knowsAbout, sameAs |
| 7 | HowTo (6 steps) | Step-by-step buying process guide |
| 8 | AggregateRating | 4.9/5 rating, 127 ratings, 98 reviews |
| 9 | ItemList (6 Reviews) | Individual Review schemas with authors, ratings, bodies |
| 10 | Residence + ApartmentComplex | Community entity with amenityFeature array |
| 11 | WebPage | Homepage page entity with author, publisher, primaryImage |
| 12 | EventSeries | Ongoing viewing/sales events with AggregateOffer |
| 13 | (Meta) | Open Graph + Twitter Card meta tags in Metadata export |

#### Project Detail Pages (projects/[slug]/page.tsx) — 2-3 Schemas Each

| # | Schema Type | Purpose |
|---|-------------|---------|
| 1 | RealEstateListing | Per-cluster listing with PriceSpecification, Offer, GeoCoordinates, amenityFeature |
| 2 | BreadcrumbList | Home > Projects > [Cluster Name] |
| 3 | VideoObject | Conditional — only if project has video in Google Drive |

#### FAQ Page (faq/page.tsx) — 5 Schemas

| # | Schema Type | Purpose |
|---|-------------|---------|
| 1 | FAQPage | 10 FAQ Q&A pairs (extended set) |
| 2 | SpeakableSpecification | Voice search for FAQ page |
| 3 | BreadcrumbList | Home > FAQ |
| 4 | QAPage | Community Q&A with accepted/suggested answers |
| 5 | WebPage | FAQ page entity |

**Total JSON-LD Schema Count**: 13 (homepage) + 27 (9 project pages x 3 each) + 5 (FAQ) = **45 structured data schemas**

### AI Crawler Access (robots.txt)

9 AI crawlers explicitly allowed:
1. ChatGPT-User
2. ClaudeBot
3. PerplexityBot
4. Google-Extended
5. Bytespider
6. Applebot-Extended
7. GPTBot
8. Amazonbot
9. YouBot

Plus standard: Googlebot, Bingbot, Twitterbot, facebookexternalhit

### AI-Readable Files

| File | Size | Content |
|------|------|---------|
| `llms.txt` | 177 lines | Condensed AI summary — business info, 9 clusters, FAQ, key pages |
| `llms-full.txt` | 870+ lines | Extended AI content — detailed profiles, inventory tables, payment examples, comparisons, blog summaries, floor plans, investment analysis |
| `ai-agent.md` | 134 lines | AI agent instructions — role, contact info, inquiry handling, disclaimers |

### Additional AEO Elements

- **Open Graph Meta Tags**: Full OG tags on every page (title, description, image, url, siteName, type, locale)
- **Twitter Card Meta Tags**: summary_large_image on every page
- **Canonical URLs**: Set on homepage, FAQ, and every project detail page
- **AI Agent Meta Tag**: Custom `ai-agent-instructions` meta tag in layout
- **Sitemap**: Dynamic XML sitemap with priorities and change frequencies for all pages
- **SearchAction**: WebSite schema with search target for Google sitelinks search

---

## Meta Pixel + Conversions API

### Pixel Setup
- **Pixel ID**: 1013154287947335
- **Location**: `src/app/layout.tsx` (client-side pixel code)
- **Conversions API**: `src/app/api/leads/route.ts` (server-side with SHA-256 hashed PII)

### Events Tracked

| Event | Trigger | Location |
|-------|---------|----------|
| PageView | Automatic on every page load | layout.tsx |
| Lead | Contact form submit | contact-section.tsx |
| Lead | Paywall modal submit | paywall-modal.tsx |
| Lead | Availability form submit | availability-page-client.tsx |
| Lead | Exit intent popup submit | exit-intent-popup.tsx |
| Contact | Contact form specifically | contact-section.tsx |
| ViewContent | Property detail page view | project-detail-page.tsx |
| InitiateCheckout | Paywall modal open | paywall-modal.tsx |
| CompleteRegistration | Paywall registration complete | paywall-modal.tsx |
| AddToWishlist | WhatsApp button click | whatsapp-button.tsx |
| Search | Availability filter usage | availability-page-client.tsx |
| PhoneCall (custom) | Phone number click | meta-pixel.ts |
| EmailClick (custom) | Email link click | meta-pixel.ts |

### CAPI (Server-Side)
- Fires on every lead form submission via `/api/leads`
- SHA-256 hashes: email, phone, first name
- Includes: client IP, user agent, event source URL, content name/category

---

## Google Analytics

- **GA4 Measurement ID**: G-QPQCZZ61FN
- **Location**: `src/app/layout.tsx` (gtag.js script)
- **Tracks**: Page views, page titles, page locations

---

## Lead Management System

### Lead Capture Flow
1. Form submitted → POST to `/api/leads`
2. Rate limiting (3 submissions/minute/IP)
3. Validation with Zod schema
4. Spam detection (honeypot, email patterns, fake phone, URLs in message)
5. Duplicate check (same email+phone within 24h)
6. Lead scoring (0-100 scale based on budget, timeline, phone, email, interest, nationality)
7. Save to SQLite database
8. Push to Google Sheets (GET webhook)
9. Fire Meta CAPI server-side Lead event
10. Return response with qualification status

### Lead Score Breakdown
| Factor | Max Points |
|--------|-----------|
| Budget (AED 10M+) | 30 |
| Timeline (immediate/1-3mo) | 20 |
| UAE phone (+971) | 15 |
| Business email | 10 |
| Specific property interest | 10 |
| GCC nationality | 5 |
| **Total** | **100** |

Qualified lead threshold: 40+ points

### Google Sheets Integration
- Webhook URL sends lead data as URL parameters via GET
- Fields: timestamp, name, email, phone, budget, timeline, nationality, propertyInterest, formType, message, pageUrl, leadScore, isQualified, source

---

## Inventory Data

### 76 Properties Across 5 Clusters

| Cluster | Units | Bedroom Types | Price Range |
|---------|-------|---------------|-------------|
| Palmiera 3 | 1 | 4BR | AED 11.83M |
| Mareva 2 | 30 | 4BR(16), 5BR(13), 6BR(1) | AED 13.88M - 27.99M |
| Mareva | 28 | 4BR(10), 5BR(7), 6BR(11) | AED 13.93M - 27.48M |
| Palmeira Collective | 12 | 4BR | AED 16.55M - 18.09M |
| Lavita | 2 | 6BR | AED 46.97M - 47.70M |

### 9 Project Clusters (Full Data)

| Project | Slug | Type | Starting Price | Bedrooms | Handover | Payment |
|---------|------|------|---------------|----------|----------|---------|
| Palmiera 3 | palmiera-3 | Villa | AED 9.18M | 4BR | Q4 2028 | 80/20 |
| Palmiera | palmiera | Villa | AED 10.5M | 4BR | Q1-Q2 2029 | 80/20 |
| Palmeira Collective | palmeira-collective | Villa | AED 11M | 4BR | Q1-Q2 2029 | 80/20 |
| Address Villas Tierra | adress-villas-tierra | Branded Villa | AED 13.16M | 4-6BR | Jun 2029 | 80/20 |
| Mareva | mareva-1 | Villa | AED 13.47M | 4-6BR | Q1-Q2 2031 | 80/20 |
| Mareva 2 | mareva-2 | Villa | AED 13.83M | 4-6BR | Q1-Q2 2031 | 80/20 |
| Palace Villas Ostra | palace-villas-ostra | Branded Villa | AED 13.9M | 4-6BR | Sep 2029 | 80/20 |
| Mirage | mirage | Premium Villa | AED 15.8M | 5-6BR | Q4 2029 | 90/10 |
| Lavita | lavita | Mansion | AED 46.97M | 6BR | Q1-Q2 2029 | 80/20 |

---

## Blog Content (6 Posts)

1. **Is The Oasis by Emaar a Good Investment in 2025?** — Investment analysis
2. **The Oasis by Emaar vs Dubai Hills — Complete Comparison** — Market analysis
3. **Emaar Payment Plans Explained — 80/20 vs 70/30** — Payment plans
4. **Dubai Waterfront Communities Comparison 2025** — Community comparison
5. **How to Buy Off-Plan Property in Dubai — Step by Step Guide** — Buying guide
6. **The Oasis by Emaar Master Plan — All 9 Clusters Explained** — Community overview

---

## Key Features Summary

### User-Facing
- Responsive design (mobile-first)
- Floating WhatsApp button
- Exit intent popup
- Premium content paywall with registration
- Property detail modal (Sheet on mobile, Dialog on desktop)
- Quick inventory section with bedroom filters
- Grid/list view toggle on inventory page
- Cluster filter, price range filter, property type filter
- Blog with full articles
- Availability checker
- Floor plans page per cluster
- Master plan with community facts
- Seller listing page
- Buyer marketplace
- Google Drive integration for brochures, floor plans, videos, factsheets

### Backend
- Lead scoring (0-100)
- Spam detection (honeypot, email patterns, fake phone, URL detection)
- Rate limiting (3/min/IP)
- Duplicate detection (24h window)
- Google Sheets webhook integration
- Meta Conversions API (server-side, SHA-256 PII)
- Prisma ORM with SQLite
- AI context API endpoint

### SEO/AEO/AIO
- 45 JSON-LD structured data schemas
- 9 AI crawlers allowed
- 3 AI-readable files (llms.txt, llms-full.txt, ai-agent.md)
- Open Graph + Twitter Card meta on every page
- Canonical URLs
- Dynamic XML sitemap
- Google SearchAction schema
- Voice search optimization (SpeakableSpecification)

### Tracking
- Meta Pixel (11 event types including custom)
- Meta Conversions API (server-side)
- Google Analytics 4

---

## Deployment Information

- **Hosting**: Vercel
- **Domain**: oasisemaar.com
- **DNS**: Cloudflare
- **CDN**: Vercel Edge Network
- **Build**: Next.js static + SSR
- **Auto-Deploy**: GitHub push to main branch triggers Vercel build

---

## Important Notes

1. **Disclaimer**: Oasis Emaar is an independent authorized sales agent, NOT Emaar Properties PJSC
2. **All prices subject to change** by Emaar Properties PJSC without notice
3. **Golden Visa**: All properties above AED 2M qualify
4. **Meta Pixel**: Takes ~30 minutes to detect in Events Manager after deployment
5. **CAPI**: Requires both NEXT_PUBLIC_META_PIXEL_ID and META_CONVERSIONS_API_TOKEN env vars
6. **Google Sheets**: Requires GOOGLE_SHEETS_WEBHOOK_URL env var
7. **Cluster maps**: Only 3 clusters have specific map images (adress-villas-tierra, lavita, palmeira-collective); others use masterplan fallback
8. **Lavita inventory**: Only 2 units (V-27 and V-47), both 6BR mansions at AED 46.97M - 47.70M

---

*This document serves as the complete master record of the Oasis Emaar project. Do not delete this file.*
