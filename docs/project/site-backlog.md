# Site Backlog

This is the living tracker for concrete deferred visitor-facing change work: public UX, content, accessibility fixes, form-flow improvements, visual polish, and public operations changes. It is separate from `launch-readiness.md`, which tracks launch gates and review passes, and `project-debt.md`, which tracks technical pressure.

Use stable IDs when discussing or working on these items, such as `SITE-1`. Do not renumber existing items. The `Classification` field is required so the backlog can be split later if one category becomes large enough to deserve its own tracker.

## Tracker Metadata

- `Next ID`: `SITE-23`

## How To Maintain This Backlog

- Add an item when a meaningful visitor-facing change is identified but intentionally left out of current scope.
- Keep items focused on one useful slice, not whole site-wide ambitions.
- Do not add broad launch gates, review passes, sign-off tasks, or "ensure X across the site" matrices here; use `launch-readiness.md` for `LAUNCH-*` items.
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

### SITE-20 - Contact enquiry form semantic heading

- `Priority`: `P1`
- `Size`: `S`
- `Status`: `Open`
- `Classification`: `Accessibility`
- `Source`: `docs/checklists/accessibility-launch.md`, Contact page accessibility assessment
- `Visitor-Facing Goal`: Make the Contact enquiry form reachable through semantic page navigation, not only through visual scanning.
- `Current State`: The Contact page has a visible "Enquiry" label above the form, but it is rendered as a styled span rather than a heading or named form landmark, so screen-reader heading navigation skips the form section.
- `Why Deferred`: This was identified during checklist assessment; the assessment updated tracking only and did not change page code.
- `First Useful Slice`: Make the form label semantic, for example by rendering it as an `h2` or by giving the form an accessible name with `aria-labelledby`, while preserving the current visual treatment.
- `Implemented When`: The Contact enquiry form is discoverable through semantic navigation, heading order remains coherent, and the Contact checklist heading-order item can move from `Partial` to `Pass`.
- `Notes`:
- `Links`: `src/components/EnquiryForm.tsx`, `src/pages/Contact.tsx`, `docs/checklists/accessibility-launch.md`

### SITE-21 - Contact form required-field clarity

- `Priority`: `P1`
- `Size`: `S`
- `Status`: `Open`
- `Classification`: `Accessibility`
- `Source`: `docs/checklists/accessibility-launch.md`, Contact page accessibility assessment
- `Visitor-Facing Goal`: Let visitors know which enquiry form fields and choices are required before they try to submit.
- `Current State`: The Contact form uses native `required` attributes and browser validation, but the visible labels do not mark required fields or explain required choices before submission.
- `Why Deferred`: This was identified during checklist assessment; the right fix should be small but deliberate so the form stays calm and readable.
- `First Useful Slice`: Add a concise required-field cue near the form and/or required labels, covering the always-required fields and the required radio choice groups without making the form feel noisy.
- `Implemented When`: Visitors can see what is required before submitting, native validation still works, and the Contact checklist required-field clarity item can move from `Partial` to `Pass`.
- `Notes`:
- `Links`: `src/components/EnquiryForm.tsx`, `src/data/enquiry.ts`, `docs/checklists/accessibility-launch.md`

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

### SITE-19 - Kink language table cell colour distinction

- `Priority`: `P2`
- `Size`: `S`
- `Status`: `Open`
- `Classification`: `Accessibility`
- `Source`: `User screenshot/review, src/pages/KinkBdsmCounselling.tsx, src/styles-kink-bdsm.css, WCAG 2.2 SC 1.4.1 and 1.4.11`
- `Visitor-Facing Goal`: Make the Kink & BDSM language table feel intentional and easy to scan, with cell colour differences that are actually distinguishable rather than almost invisible.
- `Current State`: The language field lists 16 terms and applies four page-scoped `nth-child` background groups. Local token research found the rendered mixes are clustered around `#ebeeeb`, `#edefeb`, `#eef1ed`, and `#f8f8f4`; text contrast is strong, but adjacent cell-background contrast is only about `1.01:1` to `1.10:1`, so most of the intended colour variation is hard to perceive.
- `Why Deferred`: This is a focused visual/accessibility polish task for the Kink/BDSM page, not part of the current backlog update.
- `First Useful Slice`: Decide whether the colours are decorative rhythm or meaningful grouping. If decorative, simplify or strengthen the cell rhythm within the existing palette; if meaningful, add a non-colour cue or clear grouping treatment and test it without relying on hue alone.
- `Implemented When`: The table has visibly distinct, on-brand cell treatments across desktop and mobile, preserves readable text contrast, and remains understandable in grayscale or colour-vision-deficiency checks.
- `Notes`:
  - W3C WCAG guidance says colour should not be the only visual means of distinguishing an element, and non-text visual information needed for understanding should have sufficient contrast against adjacent colours.
  - Keep this page-scoped unless the treatment proves useful for other inclusion-oriented language fields.
- `Links`: `src/pages/KinkBdsmCounselling.tsx`, `src/styles-kink-bdsm.css`, `docs/design-system/foundations/principles.md`, `https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html`, `https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html`

### SITE-22 - Working With Joel hero support design polish

- `Priority`: `P2`
- `Size`: `S`
- `Status`: `Open`
- `Classification`: `Public UX`
- `Source`: User feedback on the Working With Joel hero support copy, `src/pages/WorkingWithJoel.tsx`
- `Visitor-Facing Goal`: Make the "Life is complicated" support copy feel visually intentional, emotionally grounded, and worthy of its prominent hero placement.
- `Current State`: The Working With Joel hero includes the copy "Life is complicated." followed by "Relationships, work, how you feel about yourself, the thing that's been sitting with you. It's all connected." The wording is directionally right, but the current visual treatment does not feel satisfying or resolved.
- `Why Deferred`: This is a focused design polish item rather than a copy rewrite or accessibility blocker, and it should be handled with a small visual pass instead of a quick tracker edit.
- `First Useful Slice`: Create one or two page-scoped treatment options for the hero support block, improving hierarchy, spacing, rhythm, and relationship to the portrait/credentials while preserving the copy unless the owner explicitly wants copy changes.
- `Implemented When`: The support copy has a deliberate, on-brand treatment across desktop and mobile, does not read like filler or a generic card, and the practice owner is happy with how it looks.
- `Notes`:
  - Keep the work page-scoped unless the treatment clearly belongs in the shared hero system.
- `Links`: `src/pages/WorkingWithJoel.tsx`, `src/styles-working-with-joel.css`, `docs/design-system/patterns/page-patterns.md`, `docs/project/product-direction.md`

## Archive

### SITE-1 - Launch accessibility checklist

Superseded by `LAUNCH-1`. The working checklist remains at `docs/checklists/accessibility-launch.md`; concrete visitor-facing gaps found during that review should be tracked as `SITE-*` or `DEBT-*` items.

### SITE-2 - Responsive QA matrix

Superseded by `LAUNCH-2`. Responsive route review is now launch-readiness work rather than a concrete SITE change card.

### SITE-3 - Public SEO and metadata QA matrix

Superseded by `LAUNCH-3`. Metadata review is now tracked as a launch-readiness gate; concrete metadata fixes should be tracked separately.

### SITE-4 - Performance and image delivery review

Superseded by `LAUNCH-4`. Performance and media delivery review is now tracked as a launch-readiness gate; concrete follow-up work should be linked from that review.

### SITE-5 - Analytics and local/test policy

Superseded by `LAUNCH-5`. Analytics environment policy is now tracked as launch-readiness work, with technical follow-up linked separately.

### SITE-6 - Enquiry form public-flow QA

Superseded by `LAUNCH-6`. Public enquiry-flow review is now tracked as launch-readiness work; concrete form changes remain in active SITE cards where needed.

### SITE-13 - Final public copy and ethical-claims proofread

Superseded by `LAUNCH-7`. Final cross-route copy proofing is now launch-readiness work; concrete copy changes remain as active `SITE-*` items.

### SITE-18 - Custom launch domain and canonical public identity

Superseded by `LAUNCH-8`. Domain and canonical identity sign-off is now tracked as launch-readiness work rather than a SITE change card.
