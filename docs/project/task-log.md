# Task Log

Curated milestone history for durable project state. This is not a full changelog; Git remains the detailed implementation history.

## How To Use This Log

- Read this for important project milestones and durable context.
- Use `current-scope.md` for exact current scope.
- Use `project-debt.md` for technical pressure.
- Use `launch-readiness.md` for launch gates and review passes.
- Use `site-backlog.md` for concrete deferred visitor-facing change work.
- Use `docs/design-system/current-scope.md` for design-system scope.

## Admission Rule

- Add entries for public behaviour changes, documentation governance changes, major design-system state changes, deployment/testing posture changes, API/form milestones, or tracker creation/resolution.
- Skip routine bug fixes, tiny cleanup, pure investigations, and review-only notes unless they change durable project state.
- Keep entries to 2-4 bullets focused on what is now true.

## 2026-07-13 - Home Static Rendering And Hydration Added

- Changed: Generated Home HTML now contains the real React header, navigation, page sections, links, portrait, and footer before JavaScript rather than the temporary H1-only shell.
- Added: Explicit route/timestamp markers select `hydrateRoot` only for matching Home artifacts; unconverted, development, unknown, stale, and 404 paths retain the guarded `createRoot` fallback.
- Verified: Production-preview desktop/mobile tests cover raw and JavaScript-disabled content, warning-free hydration, SPA navigation, mismatch fallback, metadata, landmarks, and the controlled 404 contract.

## 2026-07-13 - Homepage Service Structured Data Added

- Added: The generated homepage JSON-LD graph now includes a `Service` for counselling and psychotherapy for adults.
- Linked: The Service identifies Vive Counselling as its provider and Australia as its service area, with an adult `PeopleAudience`.
- Deferred: Delivery channel, session pricing, duration, address, and local-business classification remain out until they are intentionally included and maintained.

## 2026-07-13 - Practitioner Credential Structured Data Added

- Added: Joel Griffiths' `Person` schema now records the exact Graduate Diploma in Counselling and Psychotherapy from Edith Cowan University and ACA Registered Counsellor – Level 1 status through `hasCredential`.
- Linked: The ACA credential uses Joel's public ACA profile as its verification URL and identifies the Australian Counselling Association as the recognizing organization.
- Aligned: The visible Working with Joel credential list now uses the same full qualification and registration wording as the structured data.

## 2026-07-13 - Homepage Person Structured Data Added

- Added: The generated homepage JSON-LD graph now identifies Joel Griffiths as a `Person`, links him to the Vive Counselling `Organization` through `worksFor`, and records Joel as the Organization's `founder`.
- Included: The Person uses the confirmed public name, counsellor title, practitioner-page URL, portrait, short description, and ACA public profile in `sameAs`.
- Deferred: Credential detail was initially held until its exact wording and verification were confirmed; it is now recorded in the later practitioner-credential milestone above.

## 2026-07-13 - Homepage Organization Structured Data Added

- Added: The generated homepage JSON-LD now links the existing `WebSite` entity to a minimal `Organization` entity for Vive Counselling.
- Included: The Organization uses only confirmed public identity details: business name, canonical URL, branded email, English enquiries contact point, 512px logo, short service description, and the Vive Counselling Kink Aware Professionals directory identity in `sameAs`.
- Deferred: `Person`, `Service`, credentials, address, and `LocalBusiness` / `ProfessionalService` schema remain out until their exact public representation is confirmed.

## 2026-07-10 - DEBT-19 Legacy Topic CSS Resolved

- Removed: Confirmed-dead `.issues-section*`, `.topic-grid`, and `.topic-card` base, contextual, hover, heading, and responsive rules from production CSS.
- Preserved: Public markup, behaviour, visual intent, and the active `.site-topic-grid` and `.site-topic-card` system remain unchanged.
- Closed: Archived `DEBT-19` and updated the CSS checklist, migration notes, and design-system scope to record the removal.

## 2026-07-09 - Homepage WebSite Structured Data Added

- Added: Generated homepage HTML now includes `WebSite` JSON-LD naming `Vive Counselling` at `https://vivecounselling.com.au/` so Google has a preferred site-name signal for search results.
- Preserved: Per-page title, description, canonical, Open Graph, Twitter, favicon, and static H1 metadata generation still come from the existing route metadata build path.
- Clarified: Organization, Person, and detailed counselling-service structured data remain deferred until public identity and credential details are final.

## 2026-07-08 - Static First-Response H1 Shells Added

- Changed: Generated public route HTML now includes a static `main` and route H1 fallback inside `#root` before React hydration, so non-JavaScript SEO checks can see a non-empty page heading.
- Changed: Route metadata now carries each route's expected H1, and public-site tests verify both the hydrated page H1 and the first-response fallback H1.
- Updated: The enquiry-form browser test now uses the current "Your enquiry" field label so the public-site QA gate matches the live accessible form label.

## 2026-07-08 - Static Rendering Follow-Up Debt Added

- Added: `DEBT-32` tracks replacing the tactical static H1 shell with full public-route static prerendering and React hydration.
- Added: `DEBT-33` tracks retiring the temporary H1 fallback shell after full prerendering exists.
- Linked: `LAUNCH-3` now points SEO readiness at both rendering follow-up items.

## 2026-07-08 - Contact Crisis FAQ Added

- Changed: The Contact/Fees FAQ now states that the form is not for emergency contact and gives concrete Australian crisis-support options: `000`, Lifeline, and Suicide Call Back Service.
- Preserved: The enquiry form remains positioned for non-urgent contact, with the FAQ and structured FAQ schema sharing the same plain-text answer.
- Closed: Archived `SITE-12`; remaining launch trust/practical-detail tracking now excludes the crisis-support resource item.

## 2026-07-08 - Temporary Vercel Production Host Retired

- Changed: Analytics now only runs on allowed hostnames, defaulting to the canonical Vive domain plus `www`; preview or local analytics collection requires an explicit `VITE_ANALYTICS_ALLOWED_HOSTS` override.
- Removed: Project docs no longer carry the retired temporary Vercel production hostname as a current-looking canonical target.
- Preserved: `npm run qa:analytics` still verifies Google Analytics route-change tracking and Microsoft Clarity script insertion by explicitly allowlisting the local QA host.

## 2026-07-08 - Microsoft Clarity Analytics Added

- Added: `SiteAnalytics` now loads Microsoft Clarity when analytics are enabled and `VITE_CLARITY_PROJECT_ID` is configured.
- Preserved: No cookie banner or local Clarity Consent API flow was added; normal Clarity cookies are allowed where Microsoft/project settings allow them, and the remaining analytics policy sign-off stays in `LAUNCH-5`.
- Added: The enquiry form is explicitly Clarity-masked, and `npm run qa:analytics` now verifies both GA route-change tracking and the Clarity script path with third-party analytics requests intercepted.

## 2026-07-08 - Design-System Icon Candidates Removed

- Removed: Deleted the historical `docs/design-system/icon-candidates/` and `docs/design-system/icon-candidates-ai/` export folders.
- Preserved: Active favicon, touch, and web-app icon assets remain in `public/`, with public-site tests still checking served icon dimensions.
- Changed: Design-system scope and migration notes now record historical icon candidates as removed reference material.

## 2026-07-08 - Social Preview Image Added

- Added: Generated the shared 1200x630 social preview image at `public/og-vive-counselling.png`.
- Changed: Social image alt metadata now describes the finished preview card, and public-site tests check the social image dimensions.
- Closed: Archived `DEBT-26`; the configured Open Graph/Twitter image path now resolves in the built site.

## 2026-07-08 - SEO Discoverability Review

- Added: Live SEO and discoverability review for the four currently allowed pages: Home, Working with Joel, Inclusion, and Contact.
- Confirmed: Allowed pages are indexable, canonicalised, present in the sitemap, allowed by robots, and scoring strongly in Lighthouse. Draft inclusion child pages remain excluded from search.
- Preserved: Remaining SEO and trust work is tracked through `DEBT-27`, `SITE-11`, `SITE-14`, `SITE-15`, `SITE-16`, and `SITE-17`.

## 2026-07-08 - Launch Indexing Enabled For Approved Pages

- Changed: Canonical metadata now defaults to `https://vivecounselling.com.au`, and the temporary site-wide `noindex, nofollow` metadata/header layer has been removed.
- Changed: `sitemap.xml` now advertises only Home, Working with Joel, Inclusion, and Contact/Fees; `robots.txt` allows crawling and points to that sitemap.
- Preserved: Draft Inclusion child pages remain direct review routes but stay out of production links, sitemap output, and indexing through route-level `noindex, nofollow`.

## 2026-07-08 - Inclusion Child Pages Made Draft-Linked

- Changed: Production UI no longer links to the Kink/BDSM, ENM/polyamory, or LGBTQIA+ Inclusion child pages from the header, Home page, or Inclusion hub; local development builds still show those links.
- Preserved: The child pages remain direct routes for review and carry route-level `noindex, nofollow` metadata while the broader site-wide pre-launch noindex layer remains active.
- Updated: `SITE-23` launch-indexing notes now preserve the draft child-page noindex policy until those pages are explicitly approved for public indexing.

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
