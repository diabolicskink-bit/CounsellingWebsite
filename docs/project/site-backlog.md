# Site Backlog

This is the living tracker for concrete deferred visitor-facing change work: public UX, content, accessibility fixes, form-flow improvements, visual polish, and public operations changes. It is separate from `project-debt.md`, which tracks technical pressure.

Use stable IDs when discussing or working on these items, such as `SITE-1`. Do not renumber existing items. The `Classification` field is required so the backlog can be split later if one category becomes large enough to deserve its own tracker.

## Tracker Metadata

- `Next ID`: `SITE-35`

## How To Maintain This Backlog

- Add an item when a meaningful visitor-facing change is identified but intentionally left out of current scope.
- Keep items focused on one useful slice, not whole site-wide ambitions.
- Keep broad cross-site review records in the relevant owner-directed monitor or checklist rather than turning them into mixed SITE cards.
- Use `Classification` for future splitting. Suggested labels include `Accessibility`, `Responsive QA`, `SEO/Metadata`, `Performance`, `Analytics/Operations`, `Content`, `Form Flow`, and `Public UX`.
- Update an item when new work changes priority, status, first slice, dependencies, or completion signal.
- Move implemented or superseded items to [archive/site-backlog-archive.md](archive/site-backlog-archive.md) with a short functional summary.
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

### SITE-11 - Website privacy and counselling-boundaries note

- `Priority`: `P1`
- `Size`: `M`
- `Status`: `Open`
- `Classification`: `Content`
- `Source`: `Fresh site review, src/pages/Contact.tsx`
- `Visitor-Facing Goal`: Give visitors enough practical trust information to understand website tracking, enquiry-message handling, and the basic boundaries around online counselling.
- `Current State`: The site explains session fees and lengths, online delivery, and crisis limits, but it does not yet give a concise public note on website privacy/analytics, enquiry-message handling, records, or online-session platform/privacy setup. Microsoft Clarity can load when configured, the enquiry form is explicitly Clarity-masked, and first-party visit recording initializes Vercel BotID Basic so stored visits can carry a bot verdict and verified bot identity; there is no public analytics/cookie notice yet.
- `Why Deferred`: The wording needs owner confirmation so the site does not overpromise privacy, confidentiality, security, platform behaviour, or legal limits.
- `First Useful Slice`: Add a compact Contact practical-details note or footer-linked privacy note that separates website privacy/analytics from counselling confidentiality, explains how enquiry messages are handled, and states what online-session setup visitors should expect.
- `Implemented When`: A visitor can find a clear, accurate website privacy and counselling-boundaries note before submitting the enquiry form.
- `Notes`:
  - Keep "confidentiality" language tied to counselling sessions, records, and professional boundaries rather than using it as shorthand for website cookies or analytics.
- `Links`: `src/pages/Contact.tsx`, `src/components/SiteAnalytics.tsx`

### SITE-7 - Global reduced-motion baseline

- `Priority`: `P2`
- `Size`: `S`
- `Status`: `Open`
- `Classification`: `Accessibility`
- `Source`: `docs/reports/2026-06-17-technical-code-review.md`
- `Visitor-Facing Goal`: Respect reduced-motion preferences consistently across scrolling, transitions, and interactive shared components.
- `Current State`: Global smooth scrolling now falls back to immediate scrolling when reduced motion is requested, and several shared and page-owned components have local overrides. The generic shared `.button` still transitions and moves on hover, but it is not included in the current shared reduced-motion override.
- `Why Deferred`: The scrolling slice is complete; the remaining shared-transition audit should be made carefully so existing interaction state changes remain clear.
- `First Useful Slice`: Add the generic shared button to the reduced-motion treatment, then audit the remaining shared transitions and animations against existing component-level overrides.
- `Implemented When`: Reduced-motion preference disables smooth scrolling and avoids non-essential shared motion without breaking component states.
- `Notes`:
  - 2026-08-15: Added the root reduced-motion scroll override and browser coverage from the Crisis Support state-directory review. Broader transition coverage remains open.
- `Links`: `src/styles.css`, `docs/design-system/foundations.md`, `docs/design-system/governance.md`

### SITE-14 - Public availability status

- `Priority`: `P2`
- `Size`: `S`
- `Status`: `Open`
- `Classification`: `Form Flow`
- `Source`: `Fresh site review, src/pages/Contact.tsx`, `src/data/enquiry.ts`
- `Visitor-Facing Goal`: Let a visitor know whether Joel is currently accepting new enquiries when that information can be kept accurate.
- `Current State`: The completed reply-time slice says Joel usually replies within 24 hours after a successful submission. Contact publishes practice hours but no current availability or new-client status.
- `Why Deferred`: The remaining availability wording depends on whether the practice owner wants to publish a changing operational status.
- `First Useful Slice`: If a public availability note would be useful and maintainable, add one concise current-status line near the enquiry path.
- `Implemented When`: The enquiry path carries a clear, accurate and maintainable new-client availability status, or the owner has deliberately decided that a changing public status would not be reliable enough to publish.
- `Notes`: `2026-07-29`: Owner confirmed the usual 24-hour reply expectation; the success state and native response now publish it.
- `Links`: `src/pages/Contact.tsx`, `src/data/enquiry.ts`

### SITE-15 - Rebate, payment, and fee-policy clarity

- `Priority`: `P2`
- `Size`: `S`
- `Status`: `Open`
- `Classification`: `Content`
- `Source`: `Fresh site review, src/pages/Contact.tsx`, `src/data/routeMetadata.json`
- `Visitor-Facing Goal`: Let visitors understand the real cost and payment setup before enquiring.
- `Current State`: The Contact page states the individual and couples fees, session length, and free initial consult. It does not state whether a referral is needed, whether Medicare or private-health rebates are available, how payment is made, or when payment is due.
- `Why Deferred`: Rebate and payment wording needs owner confirmation before becoming public.
- `First Useful Slice`: Confirm the referral, Medicare/private-health rebate, payment-method, and payment-timing facts, then add one concise Contact practical-details entry.
- `Implemented When`: Fee information answers session price, length, referral, rebate, payment timing/method, and initial consult basics in one clear place.
- `Notes`:
- `Links`: `src/pages/Contact.tsx`, `src/data/routeMetadata.json`

### SITE-16 - Initial consult flow clarity

- `Priority`: `P2`
- `Size`: `S`
- `Status`: `Open`
- `Classification`: `Form Flow`
- `Source`: `Fresh site review, src/pages/Contact.tsx`, `src/data/enquiry.ts`
- `Visitor-Facing Goal`: Help visitors understand the lower-commitment 15-minute consult option before choosing it in the enquiry form.
- `Current State`: The Contact enquiry introduction and fee strip mention a free 15-minute initial consult, and the form lets visitors request one, but the site does not explain whether it is phone or video, what it is for, what it is not, or what happens afterward.
- `Why Deferred`: The practice owner should confirm the actual consult format and boundaries before public copy is added.
- `First Useful Slice`: Add a brief form-adjacent or practical-details note explaining the consult format, purpose, and next step.
- `Implemented When`: A visitor can choose between a full-session enquiry and a consult request without guessing what the consult involves.
- `Notes`:
- `Links`: `src/pages/Contact.tsx`, `src/data/enquiry.ts`

### SITE-17 - Practice credentials and professional-identity detail

- `Priority`: `P2`
- `Size`: `S`
- `Status`: `Open`
- `Classification`: `Content`
- `Source`: `Fresh site review, src/pages/WorkingWithJoel.tsx`
- `Visitor-Facing Goal`: Give visitors enough professional context to trust that the practice is real and accurately represented.
- `Current State`: Working with Joel displays “GradDip. Counselling and Psychotherapy” and “ACA Registered”. The generated `ProfilePage` / `Person` graph carries the full qualification, Edith Cowan University, and full ACA Level 1 credential details, and uses Joel's public ACA profile in `sameAs` and as the registration credential URL. A registration number, visible external-profile link, and any supervision or insurance wording remain undecided.
- `Why Deferred`: Remaining professional-identity details must be fact-checked and intentionally approved before publication.
- `First Useful Slice`: Decide whether the page should visibly link to the ACA profile or show a registration number, and whether supervision or insurance details belong in public copy.
- `Implemented When`: The public credential presentation is accurate, intentional, and easy to verify where verification details are appropriate.
- `Notes`:
- `Links`: `src/pages/WorkingWithJoel.tsx`, `src/data/routeMetadata.json`, `scripts/prerender-route-metadata.mjs`

## Resolved Item Archive

Implemented and superseded `SITE-*` items live in [archive/site-backlog-archive.md](archive/site-backlog-archive.md). Search that file only when historical visitor-facing work or a retired stable ID matters.
