# Site Backlog

This is the living tracker for deferred visitor-facing site work: public UX, content, SEO, accessibility, performance, forms, analytics, and operations. It is separate from `project-debt.md`, which tracks technical pressure.

Use stable IDs when discussing or working on these items, such as `SITE-1`. Do not renumber existing items. The `Classification` field is required so the backlog can be split later if one category becomes large enough to deserve its own tracker.

## How To Maintain This Backlog

- Add an item when a meaningful visitor-facing improvement is identified but intentionally left out of current scope.
- Keep items focused on one useful slice, not whole site-wide ambitions.
- Use `Classification` for future splitting. Suggested labels include `Accessibility`, `Responsive QA`, `SEO/Metadata`, `Performance`, `Analytics/Operations`, `Content`, `Form Flow`, and `Public UX`.
- Update an item when new work changes priority, status, first slice, dependencies, or completion signal.
- Move implemented or superseded items to the archive with a short functional summary.
- Keep active items ordered by priority first, then ID.
- Do not treat this backlog as permission to implement work by itself.

## Priority, Size, And Status

Priorities:

- `P1`: High-value or trust-critical visitor-facing work.
- `P2`: Important improvement that can follow nearby foundations.
- `P3`: Long-term watchlist.

Sizes:

- `XS`: Tiny doc, content, test, or one-page update.
- `S`: Narrow change in one small area.
- `M`: Focused visitor-facing slice across a few files or tests.
- `L`: Multi-boundary change that needs careful planning.

Statuses:

- `Open`: Known future work, not currently planned.
- `Planned`: Selected for an upcoming implementation plan.
- `Active`: Current work is directly implementing it.
- `Implemented`: The item reached its completion signal.
- `Superseded`: Replaced by another item or direction.

## Active Items

### SITE-1 - Accessibility audit matrix

- `Priority`: `P1`
- `Size`: `M`
- `Status`: `Open`
- `Classification`: `Accessibility`
- `Source`: `docs/project/current-scope.md`, `docs/reports/2026-06-17-technical-code-review.md`
- `Visitor-Facing Goal`: Make accessibility coverage visible enough that future work can preserve semantic structure, keyboard access, focus states, contrast, reduced motion, and form clarity.
- `Current State`: Components and Playwright axe checks cover some accessibility concerns, but there is no route-by-route accessibility status matrix.
- `Why Deferred`: It is documentation and verification work that should follow the current QA cleanup.
- `First Useful Slice`: Add a matrix for public routes covering landmarks, heading structure, keyboard navigation, forms, focus states, contrast-sensitive components, and known exceptions.
- `Implemented When`: Public routes have an accessibility status matrix and at least one known gap is linked to a tracker item or resolved.
- `Notes`:
- `Links`: `tests/public-site.spec.ts`, `docs/project/project-debt.md`

### SITE-9 - ENM and polyamory page copy completion

- `Priority`: `P1`
- `Size`: `S`
- `Status`: `Open`
- `Classification`: `Content`
- `Source`: `Fresh launch-readiness review, src/pages/EnmPolyamoryCounselling.tsx`
- `Visitor-Facing Goal`: Make the ENM and polyamory page feel finished, specific, and trustworthy before launch.
- `Current State`: The public ENM/polyamory page still contains Latin placeholder paragraphs in the "Wherever you are in this" section, and the page needs a final proofread for visible placeholder or encoding artifacts.
- `Why Deferred`: This review is tracking launch work only; replacing the copy needs a focused content pass rather than a quick mechanical edit.
- `First Useful Slice`: Replace the four placeholder position paragraphs with final page-voice copy for jealousy/insecurity, hinge pressure, mismatched needs, and uncertainty/not-knowing.
- `Implemented When`: The ENM/polyamory page contains no placeholder or garbled public text, and the section reads as deliberately written rather than scaffolded.
- `Notes`:
  - The current placeholders are visible source text, not an abstract quality concern, so this is launch-completion work rather than general debt.
- `Links`: `src/pages/EnmPolyamoryCounselling.tsx`, `docs/project/product-direction.md`

### SITE-10 - Public contact identity and branded email decision

- `Priority`: `P1`
- `Size`: `S`
- `Status`: `Open`
- `Classification`: `Public UX`
- `Source`: `Fresh launch-readiness review, src/data/enquiry.ts`, `src/pages/Contact.tsx`, `src/components/Layout.tsx`
- `Visitor-Facing Goal`: Make public contact details look intentional, credible, and aligned with the Vive Counselling brand.
- `Current State`: The public contact page, footer, and enquiry failure state display `diabolicskink@gmail.com`, while the site presents as Vive Counselling.
- `Why Deferred`: The right fix depends on a practice-owner decision and may involve email/domain setup outside this repository.
- `First Useful Slice`: Decide whether launch should use a branded Vive/domain email address, then update the public display address or document why the current address is intentional for launch.
- `Implemented When`: Public contact email, delivery email, and failure-state fallback are intentionally aligned or explicitly documented as separate.
- `Notes`:
  - `DEBT-11` tracks production delivery configuration; this card is about the visitor-facing trust signal of the displayed contact identity.
- `Links`: `src/data/enquiry.ts`, `src/pages/Contact.tsx`, `src/components/Layout.tsx`, `docs/project/project-debt.md`

### SITE-11 - Privacy, confidentiality, and online-session boundaries note

- `Priority`: `P1`
- `Size`: `M`
- `Status`: `Open`
- `Classification`: `Content`
- `Source`: `Fresh launch-readiness review, src/pages/Contact.tsx`, `src/components/EnquiryForm.tsx`
- `Visitor-Facing Goal`: Give visitors enough practical trust information to understand what happens when they send personal information or attend online counselling.
- `Current State`: The site explains fees, format, referral, cancellation, and crisis limits, but it does not yet give a concise public note on privacy, confidentiality limits, message handling, records, or the online-session platform/privacy setup.
- `Why Deferred`: The wording needs owner confirmation so the site does not overpromise confidentiality, security, platform behaviour, or legal limits.
- `First Useful Slice`: Add a compact Contact FAQ or practical-details note covering confidentiality in plain language, key limits, how enquiry messages are handled, and what online session setup visitors should expect.
- `Implemented When`: A visitor can find a clear, accurate privacy/confidentiality and online-session boundary note before submitting the enquiry form.
- `Notes`:
- `Links`: `src/pages/Contact.tsx`, `src/components/EnquiryForm.tsx`, `docs/project/product-direction.md`

### SITE-12 - Crisis and immediate-support resource block

- `Priority`: `P1`
- `Size`: `S`
- `Status`: `Open`
- `Classification`: `Content`
- `Source`: `Fresh launch-readiness review, src/pages/Contact.tsx`
- `Visitor-Facing Goal`: Make the site's crisis boundary useful, not merely protective, for someone who arrives needing urgent help.
- `Current State`: The Contact page states that Vive Counselling is not a crisis service and says to call `000` or contact a crisis support service, but it does not list concrete Australian crisis options.
- `Why Deferred`: This should be added deliberately near the contact/enquiry flow without turning the counselling site into a crisis-services directory.
- `First Useful Slice`: Add a small crisis-support note with `000` plus a short set of Australian support options such as Lifeline, Suicide Call Back Service, and 13YARN if appropriate.
- `Implemented When`: The crisis note gives immediate, concrete next steps while keeping the form clearly positioned as non-urgent contact.
- `Notes`:
- `Links`: `src/pages/Contact.tsx`, `docs/project/product-direction.md`

### SITE-13 - Final public copy and ethical-claims proofread

- `Priority`: `P1`
- `Size`: `M`
- `Status`: `Open`
- `Classification`: `Content`
- `Source`: `Fresh launch-readiness review, src/pages/`, `docs/project/product-direction.md`
- `Visitor-Facing Goal`: Launch with copy that is finished, accurate, ethical, and consistent across every public route.
- `Current State`: The site has strong page-level copy, but there is no tracked final proofread for placeholders, typos, visible encoding artifacts, outcome claims, inclusion language, credential wording, fee details, and repeated practical information.
- `Why Deferred`: A final copy pass should happen after the remaining launch content gaps are filled so the proofread is not wasted on unfinished sections.
- `First Useful Slice`: Review each public route against the product direction and counselling-copy constraints, then fix or explicitly waive any issue found.
- `Implemented When`: Home, Working with Joel, Inclusion, Kink/BDSM, ENM/polyamory, LGBTQIA+, Contact/Fees, and Not Found have completed a final content QA pass.
- `Notes`:
  - This is intentionally separate from `SITE-3`, which is about SEO and metadata QA rather than the human-read copy.
- `Links`: `src/pages/`, `src/data/routeMetadata.json`, `docs/project/product-direction.md`, `docs/project/site-backlog.md`

### SITE-18 - Custom launch domain and canonical public identity

- `Priority`: `P1`
- `Size`: `M`
- `Status`: `Open`
- `Classification`: `SEO/Metadata`
- `Source`: `Fresh launch-readiness review, docs/project/current-scope.md`, `src/data/routeMetadata.json`
- `Visitor-Facing Goal`: Launch on a public identity that feels finished and keeps canonical, share, and search signals aligned with the real practice.
- `Current State`: Production metadata defaults to the stable Vercel URL, and `SITE_URL` can override it when a custom canonical domain is ready.
- `Why Deferred`: The domain decision, DNS, Vercel configuration, and launch smoke check need owner confirmation and deployment access.
- `First Useful Slice`: Choose the launch canonical domain, configure it in Vercel, set `SITE_URL`, and verify generated canonical URLs, sitemap, robots, redirects, and social metadata against that domain.
- `Implemented When`: Public visitors, search crawlers, social previews, and generated metadata all use the intended launch domain rather than the temporary Vercel hostname.
- `Notes`:
  - `DEBT-24` covers live Vercel smoke-test automation; this card is about making the public launch identity itself intentional.
- `Links`: `docs/project/current-scope.md`, `src/data/routeMetadata.json`, `vercel.json`, `docs/project/project-debt.md`

### SITE-2 - Responsive QA matrix

- `Priority`: `P2`
- `Size`: `M`
- `Status`: `Open`
- `Classification`: `Responsive QA`
- `Source`: `docs/project/current-scope.md`
- `Visitor-Facing Goal`: Make mobile and desktop layout expectations explicit so page changes do not quietly break reading, navigation, forms, or hero composition.
- `Current State`: Responsive CSS exists across shared and page-scoped styles, but there is no formal matrix of viewports and page checks.
- `Why Deferred`: It should be added after the QA suite is trustworthy enough to support ongoing checks.
- `First Useful Slice`: Define a small viewport matrix for public routes and add manual or automated checks for navigation, hero readability, form layout, and footer behaviour.
- `Implemented When`: Public pages have documented responsive checkpoints and at least the highest-risk layout flows are covered.
- `Notes`:
- `Links`: `src/pages/`, `tests/public-site.spec.ts`

### SITE-3 - Public SEO and metadata QA matrix

- `Priority`: `P2`
- `Size`: `M`
- `Status`: `Open`
- `Classification`: `SEO/Metadata`
- `Source`: `docs/project/current-scope.md`, `docs/reports/2026-06-17-technical-code-review.md`
- `Visitor-Facing Goal`: Keep public pages discoverable, shareable, and semantically clear without relying on scattered route metadata checks.
- `Current State`: Metadata exists and is prerendered, but route metadata, canonicals, sitemap output, redirects, and tests are not governed by one visible matrix.
- `Why Deferred`: Technical manifest/parity work is tracked separately in `DEBT-8`.
- `First Useful Slice`: Add a public route matrix for title, description, canonical, noindex policy, redirect policy, sitemap inclusion, and OG image expectations.
- `Implemented When`: Every public route has visible metadata expectations and tests or scripts catch missing required values.
- `Notes`:
- `Links`: `src/data/routeMetadata.json`, `scripts/prerender-route-metadata.mjs`, `docs/project/project-debt.md`

### SITE-4 - Performance and image delivery review

- `Priority`: `P2`
- `Size`: `M`
- `Status`: `Open`
- `Classification`: `Performance`
- `Source`: `docs/reports/2026-06-17-technical-code-review.md`
- `Visitor-Facing Goal`: Keep the public site quick and stable, especially around portraits, public assets, and route-level CSS/JS growth.
- `Current State`: Lighthouse tooling exists, portrait assets are served directly from `public`, and there are no enforced performance budgets.
- `Why Deferred`: Current release trust issues in QA/API/routing are higher priority.
- `First Useful Slice`: Add Lighthouse thresholds or budgets, then review portrait image sizes, explicit dimensions, and modern format options.
- `Implemented When`: Performance budgets fail on meaningful regressions and major public images have documented delivery expectations.
- `Notes`:
  - This covers technical review items 23 and 25: Lighthouse budget enforcement and image delivery improvements for public portrait/media assets.
- `Links`: `scripts/run-lighthouse.mjs`, `public/`, `src/pages/Home.tsx`, `src/pages/WorkingWithJoel.tsx`

### SITE-5 - Analytics and local/test policy

- `Priority`: `P2`
- `Size`: `S`
- `Status`: `Open`
- `Classification`: `Analytics/Operations`
- `Source`: `docs/reports/2026-06-17-technical-code-review.md`
- `Visitor-Facing Goal`: Keep analytics intentional while preventing local/test third-party failures from obscuring real site regressions.
- `Current State`: Google Tag Manager and Vercel Analytics are present, and tests can be affected by generic third-party or failed-request noise.
- `Why Deferred`: It should build on the restored QA suite from `DEBT-1`.
- `First Useful Slice`: Decide whether analytics should run in local, preview, and test contexts; document the policy and update tests or app loading accordingly.
- `Implemented When`: Analytics behaviour is environment-aware and test failures identify app problems rather than third-party noise.
- `Notes`:
  - This covers technical review item 22.
- `Links`: `index.html`, `src/App.tsx`, `tests/public-site.spec.ts`

### SITE-6 - Enquiry form public-flow QA

- `Priority`: `P2`
- `Size`: `M`
- `Status`: `Open`
- `Classification`: `Form Flow`
- `Source`: `docs/project/current-scope.md`, `docs/reports/2026-06-17-technical-code-review.md`
- `Visitor-Facing Goal`: Make the enquiry path easy to trust by verifying success, error, validation, fallback, and contact-instruction states from a visitor's point of view.
- `Current State`: The enquiry form has progressive choices, success and error UI, and direct submit behaviour, but there are no dedicated form-flow browser tests.
- `Why Deferred`: It follows the API validation and safe error-handling foundations resolved in archived `DEBT-4` and `DEBT-5`.
- `First Useful Slice`: Add a browser test that mocks `/api/enquiry` success and failure responses and verifies the visible public states.
- `Implemented When`: The main enquiry success and failure paths are covered by tests and public messages remain safe and useful.
- `Notes`:
  - Direct API-level enquiry tests are tracked separately in `DEBT-10`.
- `Links`: `src/components/EnquiryForm.tsx`, `src/data/enquiry.ts`, `docs/project/project-debt.md`

### SITE-7 - Global reduced-motion baseline

- `Priority`: `P2`
- `Size`: `S`
- `Status`: `Open`
- `Classification`: `Accessibility`
- `Source`: `docs/reports/2026-06-17-technical-code-review.md`
- `Visitor-Facing Goal`: Respect reduced-motion preferences consistently across scrolling, transitions, and interactive shared components.
- `Current State`: Global smooth scrolling is enabled, while reduced-motion handling is localised around specific components such as FAQ and broad tabs.
- `Why Deferred`: It is a focused accessibility baseline improvement that should be made carefully so existing interactions remain clear.
- `First Useful Slice`: Add a global `prefers-reduced-motion: reduce` baseline for scroll behaviour and broad shared transitions.
- `Implemented When`: Reduced-motion preference disables smooth scrolling and avoids non-essential shared motion without breaking component states.
- `Notes`:
- `Links`: `src/styles.css`, `docs/design-system/foundations/tokens.md`, `docs/design-system/ai-rules.md`

### SITE-8 - Shared portrait/media hero treatment

- `Priority`: `P2`
- `Size`: `M`
- `Status`: `Open`
- `Classification`: `Public UX`
- `Source`: `docs/reports/2026-06-17-technical-code-review.md`
- `Visitor-Facing Goal`: Keep portrait/media hero treatments consistent and intentional across public pages that use Joel portrait imagery or similar media notes.
- `Current State`: Home and Working with Joel repeat similar hero media and portrait tag styling through page-scoped CSS.
- `Why Deferred`: It should be handled as a small design-system promotion only after confirming the repeated pattern is meant to remain.
- `First Useful Slice`: Promote a shared `hero-media-note` portrait modifier, or document why the two page-specific treatments should stay separate.
- `Implemented When`: Repeated portrait/media styling is either shared through the hero system or intentionally documented as page-specific.
- `Notes`:
- `Links`: `src/styles-home.css`, `src/styles-working-with-joel.css`, `docs/design-system/patterns/page-patterns.md`, `docs/design-system/current-scope.md`

### SITE-14 - Contact availability and reply-time expectations

- `Priority`: `P2`
- `Size`: `S`
- `Status`: `Open`
- `Classification`: `Form Flow`
- `Source`: `Fresh launch-readiness review, src/pages/Contact.tsx`, `src/data/enquiry.ts`
- `Visitor-Facing Goal`: Reduce uncertainty around what happens after a visitor sends a first enquiry.
- `Current State`: The Contact page invites enquiries and the success state says Joel will respond as soon as possible, but there is no specific reply-time expectation or current availability/new-client note.
- `Why Deferred`: The exact wording depends on the practice owner's real capacity and preferred promise.
- `First Useful Slice`: Add one practical line near the form, success state, or Contact FAQ that states the usual reply window and whether new enquiries are currently being considered.
- `Implemented When`: The enquiry flow sets a clear, accurate expectation for response timing and availability without creating pressure or overpromising.
- `Notes`:
- `Links`: `src/pages/Contact.tsx`, `src/data/enquiry.ts`

### SITE-15 - Rebate, payment, and fee-policy clarity

- `Priority`: `P2`
- `Size`: `S`
- `Status`: `Open`
- `Classification`: `Content`
- `Source`: `Fresh launch-readiness review, src/pages/Contact.tsx`, `src/data/routeMetadata.json`
- `Visitor-Facing Goal`: Let visitors understand the real cost and payment setup before enquiring.
- `Current State`: The Contact page states the session fee, length, free initial consult, no referral requirement, and cancellation policy, but it does not explicitly state Medicare/private-health rebate availability, payment method, or when payment is due.
- `Why Deferred`: Rebate and payment wording needs owner confirmation before becoming public.
- `First Useful Slice`: Confirm Medicare/private-health rebate policy and preferred payment wording, then add a concise Contact page note or FAQ item.
- `Implemented When`: Fee information answers session price, length, referral, rebate, payment timing/method, cancellation, and initial consult basics in one clear place.
- `Notes`:
- `Links`: `src/pages/Contact.tsx`, `src/data/routeMetadata.json`

### SITE-16 - Initial consult flow clarity

- `Priority`: `P2`
- `Size`: `S`
- `Status`: `Open`
- `Classification`: `Form Flow`
- `Source`: `Fresh launch-readiness review, src/pages/Contact.tsx`, `src/data/enquiry.ts`
- `Visitor-Facing Goal`: Help visitors understand the lower-commitment 15-minute consult option before choosing it in the enquiry form.
- `Current State`: The fee card and FAQ mention a free 15-minute initial consult, and the form lets visitors request one, but the site does not explain whether it is phone or video, what it is for, what it is not, or what happens afterward.
- `Why Deferred`: The practice owner should confirm the actual consult format and boundaries before launch copy is added.
- `First Useful Slice`: Add a brief FAQ answer or form-adjacent note explaining the consult format, purpose, and next step.
- `Implemented When`: A visitor can choose between a full-session enquiry and a consult request without guessing what the consult involves.
- `Notes`:
- `Links`: `src/pages/Contact.tsx`, `src/data/enquiry.ts`, `src/components/EnquiryForm.tsx`

### SITE-17 - Practice credentials and professional-identity detail

- `Priority`: `P2`
- `Size`: `S`
- `Status`: `Open`
- `Classification`: `Content`
- `Source`: `Fresh launch-readiness review, src/pages/WorkingWithJoel.tsx`
- `Visitor-Facing Goal`: Give visitors enough professional context to trust that the practice is real and accurately represented.
- `Current State`: Working with Joel lists `GradDip. Counselling and Psychotherapy` and `ACA Registered`, but there is no tracked decision about exact membership wording, registration level or number, public legal/practice details, supervision/insurance wording, or whether any of that should appear.
- `Why Deferred`: Credential and professional-identity details must be fact-checked by the practice owner before publication.
- `First Useful Slice`: Confirm the exact public credential line and decide whether to add an ACA membership number/link or other professional identity details.
- `Implemented When`: The public credential presentation is accurate, intentional, and easy to verify where verification details are appropriate.
- `Notes`:
- `Links`: `src/pages/WorkingWithJoel.tsx`, `docs/project/product-direction.md`

## Archive

No archived site backlog items yet.
