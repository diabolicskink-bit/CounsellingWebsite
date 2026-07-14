# Task Log - June 2026

This file preserves June 2026 durable milestones moved out of the [active task log](../task-log.md). It is supporting history rather than current project state or permission to implement work.

## 2026-06-27 - SplitSection Legacy Layout Cleanup

- Changed: Removed unused `SplitSection` and the old `.section`, `.section--surface`, and `.split` production CSS hooks after source review found no render call sites.
- Changed: Design-system docs now point split-section composition back to active `site-*` section and split patterns instead of advertising `SplitSection`.
- Preserved: Active `.section-heading` and `.rich-text` shared classes remain for their separate review pass.

## 2026-06-27 - DEBT-18 Legacy Panel And Strip CSS Resolved

- Changed: Removed unused `.check-list` and `.fit-strip*` production CSS after the progressive CSS checklist usage pass found no live class references.
- Preserved: Active `.check-item` and `.icon-box` shared classes remain in place for later declaration, naming, and structure review.
- Closed: Archived `DEBT-18`; broader legacy CSS cleanup continues through `DEBT-13` and adjacent subgroup reviews.

## 2026-06-27 - Branded Contact Email Applied

- Changed: Public contact display and enquiry API fallback/failure messaging now use `joel@vivecounselling.com.au`.
- Closed: Archived `SITE-10`; production delivery variable hardening remains tracked in `DEBT-11`.

## 2026-06-27 - DEBT-28 Analytics Route Tracking Resolved

- Changed: Google Analytics now uses manual public-route `page_view` events for initial load and React Router navigation instead of relying on the initial config call alone.
- Added: `npm run qa:analytics` builds with a fake GA measurement ID and verifies route-change pageviews while intercepting third-party analytics URLs.
- Closed: Archived `DEBT-28`; `LAUNCH-5` remains open for final analytics environment policy and GA4 admin-setting sign-off.

## 2026-06-26 - Temporary Public Noindex Enabled

- Changed: Generated public route HTML now includes `noindex, nofollow`, and Vercel deployment config adds a matching `X-Robots-Tag` header.
- Changed: Pre-launch crawl artifacts no longer advertise indexable public URLs; `sitemap.xml` is intentionally empty and `robots.txt` allows crawling without linking the sitemap so page-level noindex can be read.
- Added: `SITE-23` tracks restoring indexability on the final custom domain when the owner is ready to launch.

## 2026-06-26 - Custom Domain Assigned In Vercel

- Changed: Assigned `vivecounselling.com.au` to the `counselling-website` Vercel project and configured `www.vivecounselling.com.au` as a 301 redirect to the apex domain.
- Preserved: `SITE_URL` still points metadata at the then-stable Vercel hostname, and the temporary noindex guard remains active until `SITE-23` is implemented.
- Pending: Registrar DNS propagation/configuration still needs to resolve before live custom-domain HTTPS and redirect checks can pass.

## 2026-06-23 - SITE-8 Shared Portrait Hero Treatment Resolved

- Changed: Promoted the repeated Joel portrait frame and overlaid name tag into the shared hero system with `.hero-media-note--portrait` and `.hero-media-note__tag`.
- Changed: Home, Working with Joel, and the rendered hero design-system page now use the shared portrait media treatment instead of page-specific tag/frame styling.
- Closed: Archived `SITE-8` after documenting the shared hero modifier in the design-system scope and page-pattern guidance.

## 2026-06-18 - Launch Readiness Tracker Added

- Added: Created `docs/project/launch-readiness.md` with stable `LAUNCH-*` IDs for launch gates, review passes, acceptance checks, and sign-off work.
- Changed: Moved broad review items out of active `SITE-*` tracking and archived the superseded SITE IDs with pointers to `LAUNCH-1` through `LAUNCH-8`.
- Clarified: `SITE-*` now owns concrete visitor-facing change work, while `LAUNCH-*` owns cross-site review and readiness tracking.

## 2026-06-18 - DEBT-31 Public Icon Set Replaced

- Changed: Replaced the public favicon, touch, and web-app icon PNGs with the approved folded-paper `v07` candidate at the referenced browser/device sizes.
- Changed: Updated `public/favicon.svg` to a compact vector sibling of the same folded-paper mark so SVG-capable browsers do not keep showing the old icon.
- Closed: Archived `DEBT-31` and added public-site checks for served PNG icon dimensions.

## 2026-06-18 - Checklists Added To Documents Reader

- Changed: Added `docs/checklists/` as a rendered markdown source for the dev Documents page alongside reports and plans.
- Added: Created `docs/checklists/accessibility-launch.md` as the human-readable launch accessibility checklist shell, now owned by `LAUNCH-1`, while keeping `docs/checklists/accessibility.md` as the earlier sample.
- Changed: Checklist status labels render as quiet coloured badges in the dev Documents reader while staying plain inline-code labels in markdown.
- Updated: Clarified the accessibility matrix idea as a launch checklist rather than a wide spreadsheet.

## 2026-06-17 - DEBT-6 Production URL And 404 Fallback Resolved

- Changed: Build-time route metadata then defaulted to the stable Vercel production hostname, kept `SITE_URL` as the future custom-domain override, and prevented production builds from using localhost or unique deployment URLs as canonicals.
- Changed: The prerender step now generates an app-powered noindex `404.html` fallback while preserving route-specific first-response metadata for known public routes.
- Closed: Archived `DEBT-6`; live Vercel post-deploy smoke testing remains open as `DEBT-24`.

## 2026-06-17 - DEBT-3 Enquiry Request-Shape Hardening Resolved

- Changed: Enquiry submissions now pass through a pre-parse request-shape guard that blocks unsupported content types, multipart posts, oversized declared bodies, and explicit cross-site fetch/origin/referer signals before validation or email delivery.
- Preserved: Valid JSON fetch submissions and endpoint-level URL-encoded native form posts still work, with blocked requests using the generic `DEBT-5` public error contract.
- Closed: Archived `DEBT-3`; Vercel Firewall rate limiting remains open under `DEBT-23`.

## 2026-06-17 - DEBT-17 Legacy Card Source Removed

- Changed: Removed unused `src/components/Card.tsx` plus dead generic `.card`, `.card-grid`, `.card-kicker`, and card-specific responsive CSS.
- Preserved: Active `.site-card*`, `.site-topic-card`, and `.site-fee-card` patterns remain the documented card API.
- Closed: Archived `DEBT-17`; broader legacy panel/strip and issue/topic selector work remains tracked separately.

## 2026-06-17 - DEBT-5 Safe Enquiry Error Contract Resolved

- Changed: Enquiry API failures now return generic visitor-safe public errors while provider, configuration, and runtime diagnostics stay in server logs.
- Changed: Endpoint-level URL-encoded native form posts now receive safe minimal HTML success or failure pages; full JavaScript-disabled public-page rendering remains out of scope.
- Closed: Archived `DEBT-5` and removed it as a prerequisite for `DEBT-3` enquiry endpoint hardening.

## 2026-06-17 - DEBT-7 Encoding Check Resolved

- Changed: Repaired the known CSS mojibake in the navigation submenu glyph and hero-system comment separators.
- Changed: Added `npm run check:encoding` for common mojibake markers and included it in `npm run qa` and `npm run qa:site`.
- Closed: Archived `DEBT-7` after the source scan and QA path had a repeatable encoding guard.

## 2026-06-17 - Enquiry API Moved To TypeScript

- Changed: Moved the serverless enquiry endpoint from `api/enquiry.js` to `api/enquiry.ts` with typed request, response, validation, and email-rendering boundaries.
- Changed: Included `api/` in the main TypeScript build and updated direct API tests to import the TypeScript endpoint.
- Updated: Narrowed `DEBT-9` to the remaining tests, scripts, and config type-checking gap.

## 2026-06-17 - DEBT-4 Structured Enquiry Payload Resolved

- Changed: Enquiry submissions now send structured JSON fields, and the API validates those fields before building the email subject, reply-to, plain text, and HTML output server-side.
- Changed: Added direct Node API tests for accepted submissions, invalid payloads, honeypot handling, missing delivery config, and provider failures, plus a top-level `npm run qa` aggregate gate.
- Closed: Archived `DEBT-4`, archived the baseline direct-test gap under `DEBT-10`, and split canonical server-owned timezone comparison notes into `DEBT-22`.

## 2026-06-17 - Debt Dependency Field Added

- Changed: Added a `Dependencies` field to active project debt items so prerequisite work is distinct from broader related context.
- Changed: Updated project debt maintenance guidance to keep loose relationships in `Related Items` and reserve `Dependencies` for true predecessor work.

## 2026-06-17 - DEBT-1 QA Gate Restored

- Changed: Updated stale public-site Playwright expectations for current page headings and not-found route behaviour.
- Changed: Added clearer page diagnostics for console errors, failed responses, and failed requests.
- Closed: Archived `DEBT-1` after `npm run qa:site` passed locally with the current public-site suite.

## 2026-06-17 - DEBT-2 Main Landmark Resolved

- Changed: Removed the redundant `Layout` main wrapper so page components own the single primary main landmark.
- Changed: Added public-site Playwright coverage for one visible main landmark across public routes and not-found boundary routes.
- Closed: Archived `DEBT-2` after the landmark contract was implemented and covered by tests.

## 2026-06-17 - Type-Scale Cleanup Debt Captured

- Changed: Assessed the old type-scale plan before deleting legacy design-system docs and split remaining typography cleanup into focused `DEBT-*` items.
- Preserved: The completed type-role foundation remains documented in the rebuilt design-system docs; no CSS or rendered design changes were made.

## 2026-06-17 - Design-System AI Docs Rebuilt

- Changed: Rebuilt `docs/design-system/` as a lean canonical AI/design-system instruction structure and moved the previous design-system docs aside for review.
- Changed: Split design-system guidance into clear ownership files for AI rules, governance, current scope, foundations, patterns, cleanup sweeps, and migration notes.
- Preserved: Public UI, source code, routes, rendered design-system pages, runtime behaviour, and historical reports are unchanged.

## 2026-06-17 - DEBT-14 Side-Stripe Rule Resolved

- Changed: Removed the blanket AI/design-system prohibition on 4px side stripes after visual review confirmed the active striped panels are intentional and acceptable.
- Preserved: Existing public UI, CSS, routes, and copy are unchanged; the resolution is documentation and tracker alignment only.
- Closed: Marked `DEBT-14` resolved and kept any unused-selector cleanup separate from the side-stripe rule decision.

## 2026-06-17 - Documents Reader Scope Restored

- Changed: Limited the dev Documents page back to `docs/reports/` and `docs/plans/` markdown only.
- Preserved: Project and design-system documentation remain canonical on disk, but they are not browsed through the dev Documents page.

## 2026-06-17 - Technical Review Tracker Coverage Completed

- Changed: Seeded the remaining 2026-06-17 technical review recommendations into `project-debt.md` and `site-backlog.md`.
- Changed: Added tracker coverage for direct enquiry API tests, explicit email delivery config, design-system card and CSS cleanup pressure, side-stripe rule conflicts, global CSS scoping risk, runtime/package-manager pinning, reduced motion, and shared portrait/media treatment.
- Preserved: Existing tracker items continue to own overlapping review findings for structured enquiry payloads, analytics policy, performance budgets, and public image delivery.

## 2026-06-17 - Project Governance Documentation

- Changed: Added `docs/project/` as the whole-project documentation home for product direction, current scope, technical debt, visitor-facing backlog, and durable task history.
- Changed: Moved root product and design export files into canonical documentation locations so project guidance and design-system references are separated.
- Changed: Seeded `DEBT-*` and `SITE-*` trackers from the technical review baseline while keeping the existing design-system docs as their own subsystem.

## 2026-06-17 - Technical Review Baseline

- Changed: Added a technical review report covering build/QA state, routing, API/enquiry risks, testing gaps, design-system cleanup candidates, deployment concerns, and performance follow-ups.
- Preserved: The report is an audit baseline, not an implementation plan by itself; durable follow-up work is tracked through `project-debt.md` and `site-backlog.md`.
