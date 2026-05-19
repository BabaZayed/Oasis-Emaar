# Task 4: Fix Newsletter Integration + Add Referral/UTM Tracking

**Date:** 2026-05-19
**Status:** All tasks completed, build passing, lint clean

---

## Fix 1: Newsletter Integration (site-footer.tsx)

**Problem:** Footer newsletter form just cleared the email input — it didn't actually save or send the email anywhere.

**Changes Made:**

**`src/components/site-footer.tsx`** — Major update
- Added `useToast` import from `@/hooks/use-toast`
- Added `trackLead` import from `@/lib/meta-pixel`
- Added `Loader2` and `CheckCircle` icons from lucide-react
- Added state management: `isSubmitting` (loading) and `isSuccess` (success) states
- Created `handleNewsletterSubmit` async function that:
  - Submits to `/api/leads` with `formType: "newsletter"` and `email`
  - Shows success toast after submission
  - Tracks with Meta Pixel using `trackLead({ formType: "general", propertyInterest: "Newsletter" })`
  - Clears the email after successful submission
  - Shows error toast if submission fails (API error or network error)
  - Shows loading state (Loader2 spinner) while submitting
  - Shows success state (CheckCircle icon + "You're subscribed!" text) for 3 seconds
- Updated form: added `required` and `disabled` attributes on Input
- Updated Button: shows spinner when submitting, checkmark on success, "Join" normally
- Added success message text below form

**`src/app/api/leads/route.ts`** — Updated to support newsletter formType
- Added "newsletter" to the `formType` zod enum
- Made `name` and `phone` optional in the schema (newsletter only requires email)
- Added default values for newsletter submissions: name = "Newsletter Subscriber", phone = "0000000000"
- Updated spam detection to handle missing name/phone (skip for newsletter)
- Updated duplicate check: for newsletter, only check by email (not phone)
- Updated lead scoring: newsletter leads get minimal score of 10
- Updated Meta CAPI call to handle optional firstName

---

## Fix 2: UTM Referral Tracking System

**New File: `src/lib/utm-helpers.ts`**
- `UTMData` interface with: source, medium, campaign, term, content, ref, firstTouchTimestamp, landingPage
- `getUTMData()`: reads UTM data from localStorage key "oasis_utm"
- `getUTMString()`: builds a URL query string from stored UTM data

**New File: `src/components/utm-tracker.tsx`** — "use client" component
- On mount, reads UTM parameters from URL (utm_source, utm_medium, utm_campaign, utm_term, utm_content, ref)
- Stores them in localStorage under key "oasis_utm" with first-touch timestamp and landing page
- First-touch attribution: doesn't overwrite existing UTM data
- Fires Meta Pixel `fbq('trackCustom', 'UTM_Capture', { source, medium, campaign })` when UTM params found
- If no UTM params, preserves any existing localStorage data
- Renders nothing (returns null)

**`src/app/layout.tsx`** — Added UTMTracker
- Imported `UTMTracker` from `@/components/utm-tracker`
- Added `<UTMTracker />` before `{children}` in the body element

---

## Fix 3: Referral Share Links in Blog Posts

**`src/app/blog/[slug]/blog-post-client.tsx`** — Added Share & Track section
- Added `TrendingUp` icon import from lucide-react
- Added `referralCopied` state for the tracked URL copy button
- Computed `referralShareUrl`: `https://oasisemaar.com/blog/{slug}?utm_source=share&utm_medium=social&utm_campaign=blog_share`
- Created `handleCopyReferralLink` function to copy the tracked URL
- Added "Share & Track" section in desktop sidebar (after existing Share buttons):
  - Heading with TrendingUp icon
  - Brief text: "Share this link to track your referrals..."
  - Cream background box showing the tracked URL
  - "Copy Share Link" button (navy bg, shows Check icon on copy)
- Added identical "Share & Track" section in mobile share bar (after existing share buttons)

---

## Build & Lint Verification

- `bun run lint` — 0 errors, 1 pre-existing warning (social-proof.tsx)
- `npx next build` — Passed successfully (all 43 routes generated)
- Dev server running on port 3000
