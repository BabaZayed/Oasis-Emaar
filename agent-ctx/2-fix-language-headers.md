# Task 2: Fix Language Landing Pages — Add SiteHeader & SiteFooter

**Agent:** Main Agent  
**Date:** 2026-05-21  
**Status:** Completed

## Summary

Fixed all 5 language landing pages (/ar, /zh, /ru, /fr, /de) to include the shared SiteHeader and SiteFooter components. Previously, navigating to any language page resulted in a missing header (no navigation) and either a minimal footer or no footer at all, making it impossible to navigate back or switch languages.

## Changes

| File | Changes |
|------|---------|
| `src/app/ar/ar-page-client.tsx` | Added SiteHeader/SiteFooter imports, wrapped in fragment, added SiteHeader before RTL div, removed Simple Footer, added SiteFooter after div |
| `src/app/zh/zh-page-client.tsx` | Added SiteHeader/SiteFooter imports, wrapped in fragment, added SiteHeader before div, removed Simple Footer, added SiteFooter after div |
| `src/app/ru/ru-page-client.tsx` | Added SiteHeader/SiteFooter imports, wrapped in fragment, added SiteHeader before div, removed Simple Footer, added SiteFooter after div |
| `src/app/fr/fr-page-client.tsx` | Added SiteHeader/SiteFooter imports, wrapped in fragment, added SiteHeader before main, added lang="fr" + flex flex-col to main, added SiteFooter after main |
| `src/app/de/de-page-client.tsx` | Added SiteHeader/SiteFooter imports, wrapped in fragment, added SiteHeader before main, added lang="de" + flex flex-col to main, added SiteFooter after main |

## Verification

- `bun run lint` — 0 errors, 0 warnings
- Dev server running on port 3000
