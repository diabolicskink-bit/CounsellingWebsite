# Launch Readiness Tracker

This tracker owns launch gates, review passes, and acceptance checks. It is separate from `site-backlog.md`, which tracks concrete visitor-facing change work, and from `project-debt.md`, which tracks technical and maintainability pressure.

Use stable IDs when discussing or working on these items, such as `LAUNCH-1`. Do not renumber existing items. When a launch check finds concrete work, create or link the relevant `SITE-*` or `DEBT-*` item rather than turning the launch item into a mixed backlog card.

## Tracker Metadata

- `Next ID`: `LAUNCH-9`

## How To Maintain This Tracker

- Add an item when a launch-readiness review, sign-off, smoke check, matrix, or cross-site acceptance gate should stay visible.
- Keep launch items focused on review outcomes and acceptance conditions, not the detailed implementation of every gap they discover.
- Link found work to `SITE-*` for visitor-facing changes or `DEBT-*` for technical/project-health work.
- Use `Status` to show review progress; use linked items to show what needs changing.
- Move completed launch items to the archive only when the review is complete and unresolved gaps are either accepted, resolved, or tracked elsewhere.
- Keep active items ordered by priority first, then ID.
- Do not treat this tracker as permission to implement a fix. It is memory, readiness tracking, and sign-off support.

## Priority, Size, And Status

Priorities:

- `P1`: Launch-blocking or trust-critical gate.
- `P2`: Important launch confidence check.
- `P3`: Nice-to-have or post-launch readiness improvement.

Sizes:

- `XS`: Tiny confirmation or one-route smoke check.
- `S`: Narrow review over one route or feature.
- `M`: Focused review across several routes, states, or files.
- `L`: Whole-site or multi-boundary readiness pass.

Statuses:

- `Open`: Known launch check, not currently complete.
- `Active`: Current work is directly assessing or completing it.
- `Passed`: The launch check passed, with no required follow-up untracked.
- `Partial`: Some review is complete, but gaps remain or coverage is incomplete.
- `Blocked`: Cannot complete without owner input or external configuration.
- `Superseded`: Replaced by another launch item or implemented direction.

## Active Items

### LAUNCH-1 - Accessibility launch review

- `Priority`: `P1`
- `Size`: `M`
- `Status`: `Partial`
- `Source`: Supersedes `SITE-1`, `docs/checklists/accessibility-launch.md`
- `Launch Goal`: Make accessibility coverage visible enough that launch does not ship with unreviewed semantic structure, keyboard access, focus states, contrast, reduced-motion, or form clarity gaps.
- `Current State`: `docs/checklists/accessibility-launch.md` is the working route-by-route checklist artifact, and Home, Inclusion Hub, plus Contact/Fees have begun assessment. Contact gaps are now tracked as `SITE-20` and `SITE-21`.
- `Review Method`: Work through the checklist for each public route in browser, with axe where useful, keyboard checks for interactive states, mobile/reflow checks, and notes that link any concrete gap to `SITE-*` or `DEBT-*`.
- `Passes When`: Public routes have completed accessibility checklist entries, and every non-pass item is either resolved, accepted for launch, or linked to a concrete tracker item.
- `Linked Work`: `SITE-20`, `SITE-21`, `DEBT-29`, `DEBT-30`
- `Links`: `docs/checklists/accessibility-launch.md`, `docs/checklists/accessibility.md`, `tests/public-site.spec.ts`

### LAUNCH-2 - Responsive launch review

- `Priority`: `P2`
- `Size`: `M`
- `Status`: `Open`
- `Source`: Supersedes `SITE-2`, `docs/checklists/responsive-launch.md`, `docs/project/current-scope.md`
- `Launch Goal`: Make mobile and desktop layout expectations explicit so launch does not ship with broken reading, navigation, form, or hero behaviour at common viewport sizes.
- `Current State`: Responsive CSS exists across shared and page-scoped styles, and `docs/checklists/responsive-launch.md` is now the working route-by-route checklist artifact. Inclusion Hub has begun assessment, but there is no completed responsive readiness pass.
- `Review Method`: Work through the checklist for the shared shell, each public route, and the not-found route across representative mobile, tablet, desktop, and wide desktop viewports, with notes that link any concrete gap to `SITE-*` or `DEBT-*`.
- `Passes When`: Public routes have completed responsive checkpoints and any discovered concrete layout work is resolved or linked to `SITE-*` or `DEBT-*`.
- `Linked Work`: None yet.
- `Links`: `docs/checklists/responsive-launch.md`, `src/pages/`, `tests/public-site.spec.ts`

### LAUNCH-3 - Public SEO and metadata launch review

- `Priority`: `P2`
- `Size`: `M`
- `Status`: `Partial`
- `Source`: Supersedes `SITE-3`, `docs/checklists/seo-metadata-launch.md`, `docs/project/current-scope.md`, `docs/reports/2026-06-17-technical-code-review.md`
- `Launch Goal`: Confirm public pages are discoverable, shareable, and semantically clear before launch.
- `Current State`: Metadata exists and is prerendered, and `docs/checklists/seo-metadata-launch.md` is now the working checklist artifact. Home, Working with Joel, Inclusion, and Contact/Fees are configured as indexable on the apex custom domain, while the draft Inclusion child pages keep route-level `noindex, nofollow` metadata and stay out of sitemap output. A 2026-07-08 live SEO/discoverability review confirmed the four allowed pages pass indexability, canonical, sitemap, robots, redirect, not-found, and Lighthouse SEO/page-experience checks. The shared social preview image now exists at the configured metadata path. Generated route HTML now includes a tactical static H1 fallback for non-JavaScript SEO tools, but full route static prerendering and later fallback-shell retirement are tracked by `DEBT-32` and `DEBT-33`. Remaining SEO/discoverability gaps are runtime metadata drift risk (`DEBT-27`), unconfirmed Search Console submission, absent site identity structured data, and trust/practical-detail work tracked by `SITE-11`, `SITE-14`, `SITE-15`, `SITE-16`, and `SITE-17`.
- `Review Method`: Work through the checklist for global metadata outputs, each public route, redirect routes, and the not-found route, with notes that link any concrete gap to `SITE-*` or `DEBT-*`.
- `Passes When`: Every public route has reviewed metadata expectations, and missing or incorrect required values are resolved or linked to `SITE-*` / `DEBT-*`.
- `Linked Work`: `DEBT-8`, `DEBT-27`, `DEBT-32`, `DEBT-33`, `LAUNCH-8`, `SITE-11`, `SITE-14`, `SITE-15`, `SITE-16`, `SITE-17`, `SITE-23`
- `Links`: `docs/checklists/seo-metadata-launch.md`, `docs/checklists/seo-metadata-inventory.md`, `docs/reports/2026-07-08-seo-discoverability-review.md`, `src/data/routeMetadata.json`, `scripts/prerender-route-metadata.mjs`, `docs/project/project-debt.md`

### LAUNCH-4 - Performance and image delivery launch review

- `Priority`: `P2`
- `Size`: `M`
- `Status`: `Open`
- `Source`: Supersedes `SITE-4`, `docs/reports/2026-06-17-technical-code-review.md`
- `Launch Goal`: Confirm the public site feels quick and stable enough for launch, especially around portraits, public assets, and route-level CSS/JS growth.
- `Current State`: Lighthouse tooling exists, portrait assets are served directly from `public`, and there are no enforced performance budgets.
- `Review Method`: Run Lighthouse or equivalent local checks, review public image delivery, confirm major media has appropriate dimensions/formats, and identify any launch-relevant performance regressions.
- `Passes When`: Performance review is complete, launch-blocking issues are resolved, and longer-term performance budget or image-delivery work is linked to `SITE-*` or `DEBT-*`.
- `Linked Work`: None yet.
- `Links`: `scripts/run-lighthouse.mjs`, `public/`, `src/pages/Home.tsx`, `src/pages/WorkingWithJoel.tsx`

### LAUNCH-5 - Analytics and environment launch policy review

- `Priority`: `P2`
- `Size`: `S`
- `Status`: `Open`
- `Source`: Supersedes `SITE-5`, `docs/reports/2026-06-17-technical-code-review.md`
- `Launch Goal`: Make analytics behaviour intentional before launch while preventing local/test third-party noise from hiding real regressions.
- `Current State`: Vercel Analytics remains enabled through the shared analytics gate only on allowed hostnames, Google Analytics sends explicit manual page views for public SPA route changes when configured, and Microsoft Clarity loads when `VITE_CLARITY_PROJECT_ID` is configured on an allowed hostname. The default host allowlist is the canonical apex domain plus `www`; preview/local analytics collection now requires an explicit `VITE_ANALYTICS_ALLOWED_HOSTS` override, which `npm run qa:analytics` supplies for local verification. No first-party cookie banner or local Clarity Consent API flow exists; the intended owner direction is to allow normal Clarity cookies where Microsoft/project settings allow them and rely on Clarity's regional no-consent behaviour where required. The enquiry form is explicitly Clarity-masked. Default QA stays analytics-quiet, while `npm run qa:analytics` verifies the enabled GA route-change path and Clarity script load with third-party analytics URLs intercepted.
- `Review Method`: Confirm analytics should remain production-host-only by default, confirm GA4 Enhanced Measurement/browser-history settings will not double-count the manual pageviews, confirm Microsoft Clarity dashboard settings for cookies, masking, and session recording are acceptable for the counselling site, document the policy, and link any remaining code, privacy notice, or test changes needed.
- `Passes When`: Analytics behaviour is environment-aware or explicitly accepted, GA4 admin settings are aligned with the manual SPA pageview implementation, Clarity cookie/masking/session-recording settings are intentional, and test failures identify app problems rather than third-party noise.
- `Linked Work`: `DEBT-28` archived; `SITE-11`
- `Links`: `.env.example`, `src/components/SiteAnalytics.tsx`, `src/components/EnquiryForm.tsx`, `tests/public-site.spec.ts`, `scripts/run-analytics-qa.mjs`

### LAUNCH-6 - Enquiry form public-flow launch QA

- `Priority`: `P2`
- `Size`: `M`
- `Status`: `Partial`
- `Source`: Supersedes `SITE-6`, `docs/project/current-scope.md`, `docs/reports/2026-06-17-technical-code-review.md`
- `Launch Goal`: Make the enquiry path easy to trust by verifying success, error, validation, fallback, and contact-instruction states from a visitor's point of view.
- `Current State`: The enquiry form has progressive choices, success and error UI, direct submit behaviour, and direct API tests, but there are no dedicated form-flow browser tests. Contact manual accessibility checks covered mocked success and failure states.
- `Review Method`: Use mocked `/api/enquiry` browser checks for success and failure responses, validate visible public states, and decide whether browser tests are needed before launch.
- `Passes When`: Main enquiry success and failure paths are reviewed from the public UI, visible messages remain safe and useful, and any missing automated coverage is accepted or tracked.
- `Linked Work`: `SITE-20`, `SITE-21`, `DEBT-10`
- `Links`: `src/components/EnquiryForm.tsx`, `src/data/enquiry.ts`, `tests/api/`

### LAUNCH-7 - Final public copy and ethical-claims proofread

- `Priority`: `P1`
- `Size`: `M`
- `Status`: `Open`
- `Source`: Supersedes `SITE-13`, `src/pages/`, `docs/project/product-direction.md`
- `Launch Goal`: Launch with copy that is finished, accurate, ethical, and consistent across every public route.
- `Current State`: The site has strong page-level copy, but there is no completed final proofread for placeholders, typos, visible encoding artifacts, outcome claims, inclusion language, credential wording, fee details, and repeated practical information.
- `Review Method`: Review each public route against product direction and counselling-copy constraints, then fix, accept, or link each found issue.
- `Passes When`: Home, Working with Joel, Inclusion, Kink/BDSM, ENM/polyamory, LGBTQIA+, Contact/Fees, and Not Found have completed final content QA, and concrete changes are resolved or tracked as `SITE-*`.
- `Linked Work`: `SITE-9`, `SITE-15`, `SITE-17`
- `Links`: `src/pages/`, `src/data/routeMetadata.json`, `docs/project/product-direction.md`

### LAUNCH-8 - Custom launch domain and canonical public identity readiness

- `Priority`: `P1`
- `Size`: `M`
- `Status`: `Partial`
- `Source`: Supersedes `SITE-18`, `docs/project/current-scope.md`, `src/data/routeMetadata.json`
- `Launch Goal`: Launch on a public identity that feels finished and keeps canonical, share, and search signals aligned with the real practice.
- `Current State`: `vivecounselling.com.au` is registered, assigned to the Vercel project, and configured as the apex canonical domain. `www.vivecounselling.com.au` is assigned as a 301 redirect to the apex, DNS resolves to Vercel, route metadata now defaults to the apex domain while preserving `SITE_URL` override support, and the old temporary production Vercel hostname has been removed from the project in Vercel.
- `Review Method`: Confirm the launch canonical domain, configure DNS/Vercel as needed, set `SITE_URL`, and verify canonical URLs, sitemap, robots, redirects, and social metadata against that domain.
- `Passes When`: Public visitors, search crawlers, social previews, and generated metadata all use the intended launch domain rather than the temporary Vercel hostname.
- `Linked Work`: `DEBT-24`, `SITE-23`
- `Links`: `docs/project/current-scope.md`, `src/data/routeMetadata.json`, `vercel.json`, `docs/project/project-debt.md`

## Archive

No archived launch readiness items yet.
