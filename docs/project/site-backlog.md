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
- `Why Deferred`: It depends on the API validation/error-handling direction tracked in `DEBT-4` and `DEBT-5`.
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

## Archive

No archived site backlog items yet.
