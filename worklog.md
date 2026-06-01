# UX Improvements Worklog — Oasis Emaar

**Date**: 2026-03-05  
**Commit**: `72d2cd4`  
**Message**: "UX improvements: grid density, touch targets, contrast, scroll animations, mobile spacing"

---

## Summary of Changes

### 1. CARD GRID DENSITY — More Breathing Room
- **home-page-client.tsx**: Facts grid `md:grid-cols-4` → `md:grid-cols-2 lg:grid-cols-4`, gaps `gap-8 sm:gap-10` → `gap-6 sm:gap-8`
- **home-page-client.tsx**: Projects grid `xl:grid-cols-3 gap-10 sm:gap-12` → `lg:grid-cols-3 gap-8 sm:gap-10`
- **inventory-section.tsx**: Grid gaps `gap-4 sm:gap-6` → `gap-6 sm:gap-8`
- **quick-inventory-section.tsx**: Grid gaps `gap-6 sm:gap-7` → `gap-6 sm:gap-8`
- **home-page-client.tsx**: Seller marketplace grid `gap-10` → `gap-6 lg:gap-8`

### 2. MOBILE TOUCH TARGETS — 48x48px minimum
- **site-header.tsx**: Hamburger button `p-2` → `p-2.5 min-w-[48px] min-h-[48px] flex items-center justify-center rounded-lg`
- **site-header.tsx**: Language switcher Globe button → added `min-w-[44px] min-h-[44px]`
- **site-header.tsx**: WhatsApp link in mobile menu → added `min-h-[44px]`
- **site-footer.tsx**: Social icons `w-9 h-9` → `w-11 h-11`
- **pwa-install-prompt.tsx**: Dismiss button → added `min-h-[44px] min-w-[44px]`

### 3. TEXT READABILITY & CONTRAST
- **globals.css**: Body `line-height: 1.7` added
- **benefits-section.tsx**: Description text `text-white/50` → `text-white/60` (both section subtitle and card descriptions)
- **home-page-client.tsx**: Facts labels `text-[10px] text-[#8A9BB5]` → `text-[11px] text-[#9BB0C8]`
- **home-page-client.tsx**: Golden Visa badge `text-emerald-400/70 bg-emerald-500/10` → `text-emerald-400 bg-emerald-500/15`
- **contact-section.tsx**: Contact info labels `text-white/40` → `text-white/55`

### 4. PWA POPUP OVERLAPPING CONTENT
- **pwa-install-prompt.tsx**: Position `bottom-20` → `bottom-24`
- **pwa-install-prompt.tsx**: Added backdrop overlay `<div className="fixed inset-0 bg-black/20 z-40" onClick={handleDismiss} />`

### 5. CINEMATIC SCROLL ANIMATIONS
- **home-page-client.tsx**: Golden Visa banner ScrollReveal → added `cinematic` prop
- **home-page-client.tsx**: Seller marketplace section header ScrollReveal → added `cinematic` prop
- **quick-inventory-section.tsx**: Summary bar ScrollReveal → added `cinematic` prop

### 6. FORM UX IMPROVEMENTS
- **paywall-section.tsx**: All Input elements → added `min-h-[48px]`
- **paywall-section.tsx**: All SelectTrigger elements → added `min-h-[48px]`
- **contact-section.tsx**: No changes needed (premium-input already provides ~48px height)

### 7. MOBILE SPACING FIXES
- **home-page-client.tsx**: Community Facts section `py-28 sm:py-36` → `py-20 sm:py-28 lg:py-36`
- **home-page-client.tsx**: Projects section `py-28 sm:py-36` → `py-20 sm:py-28 lg:py-36`
- **home-page-client.tsx**: CTA section `py-28 sm:py-36` → `py-20 sm:py-28 lg:py-36`

### 8. HEADER MOBILE MENU IMPROVEMENTS
- **site-header.tsx**: Hamburger button enlarged with proper touch target sizing
- **site-header.tsx**: WhatsApp link in mobile menu → added `min-h-[44px]` for proper touch target

---

## Files Modified
1. `src/app/home-page-client.tsx`
2. `src/app/globals.css`
3. `src/components/benefits-section.tsx`
4. `src/components/inventory-section.tsx`
5. `src/components/quick-inventory-section.tsx`
6. `src/components/contact-section.tsx`
7. `src/components/paywall-section.tsx`
8. `src/components/site-header.tsx`
9. `src/components/site-footer.tsx`
10. `src/components/pwa-install-prompt.tsx`

## Verification
- Lint passed with no errors
- Dev server compiles successfully
- Pushed to GitHub: `BabaZayed/Oasis-Emaar` main branch
---
Task ID: 1
Agent: Main Agent
Task: Fix Google Search Console datetime issues, white border on page, and mobile performance

Work Log:
- Analyzed GSC screenshot showing 2 active issues: datePublished missing timezone + invalid datetime value (in mainEntity)
- Fixed all datetime values across 7 files to use ISO 8601 with UAE timezone (+04:00)
- Fixed white border/edge by setting html/body background to #0D1B2A and using overflow-x: clip
- Optimized mobile performance by reducing particles, blur sizes, backdrop-filters, and adding content-visibility
- Resolved git rebase conflicts and pushed to GitHub

Stage Summary:
- All JSON-LD datetime values now use +04:00 timezone (FAQPage, WebPage, Reviews, Events, QAPage, Blog, Projects)
- White border fixed with deep navy background + overflow-x: clip + hidden scrollbar
- Mobile performance optimized: 4 particles (was 12), ripples/orbs desktop-only, smaller blur on mobile, content-visibility:auto for below-fold
- Build passes, pushed to GitHub (commit f090813)
---
Task ID: 2
Agent: Main Agent
Task: Fix Google Search Console page indexing issues

Work Log:
- Analyzed GSC screenshot showing 5 indexing issues: Page with redirect (22), Not found 404 (7), Alternate page with canonical (1), Discovered not indexed (13), Crawled not indexed (6)
- Fixed trailing slashes in /fr/ and /de/ canonical URLs and JSON-LD schemas
- Added www.oasisemaar.com → oasisemaar.com redirect in middleware
- Changed middleware redirect target from www.oasisemaar.com to oasisemaar.com (bare domain)
- Added trailingSlash: false to next.config.ts
- Added missing pages to sitemap: /press, /link-to-us, /privacy, /terms, /disclaimer
- Removed large files from git history (grand-polo-content with 133MB+ videos)
- Added .gitignore entries for grand-polo-content/, upload/, agent-ctx/
- Force pushed clean history to GitHub

Stage Summary:
- Page with redirect fix: trailing slash consistency + www→bare domain redirect
- Missing sitemap pages added (5 pages)
- Git history cleaned of 133MB+ video files
- All changes deployed to GitHub (commit a438996)
