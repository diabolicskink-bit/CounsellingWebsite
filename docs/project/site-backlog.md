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

### SITE-24 - Vite security and maintenance update

- `Priority`: `P1`
- `Size`: `S`
- `Status`: `Open`
- `Classification`: `Security`
- `Source`: `2026-08-16 dependency audit, npm outdated, npm audit`
- `Visitor-Facing Goal`: Keep the public-site development and build pipeline on a supported Vite release without known local-server path-disclosure issues.
- `Current State`: The lockfile installs Vite `8.0.8`. The npm advisory audit reports one high and one moderate vulnerability affecting Vite `8.0.0` through `8.0.15`; `8.2.1` is the current compatible target and also refreshes vulnerable transitive PostCSS and Nano ID versions.
- `Why Deferred`: The audit identified the update but did not alter dependencies; the generated client and SSR builds, prerendering, preview server, and browser suite need to be verified together after the lockfile changes.
- `First Useful Slice`: Update Vite to `8.2.1`, regenerate the lockfile, confirm the resolved PostCSS and Nano ID versions are outside their advisory ranges, and run the full site QA path.
- `Implemented When`: Vite resolves to at least `8.2.1`, the related npm advisories are absent, and the client build, SSR build, metadata prerender, preview server, and public browser tests pass.
- `Notes`:
  - Keep this same-major security update separate from unrelated framework migrations.
- `Links`: `package.json`, `package-lock.json`, `vite.config.ts`, `scripts/prerender-route-metadata.mjs`

### SITE-25 - Lighthouse security and maintenance update

- `Priority`: `P1`
- `Size`: `S`
- `Status`: `Open`
- `Classification`: `Security`
- `Source`: `2026-08-16 dependency audit, npm outdated, npm audit`
- `Visitor-Facing Goal`: Keep the site's performance and accessibility audit tooling trustworthy so release decisions are based on a maintained scanner stack.
- `Current State`: The project installs Lighthouse `13.1.0`. The npm audit reports high-severity findings through Lighthouse `13.4.0`, including vulnerable Puppeteer, Sentry/OpenTelemetry, archive-extraction, and supporting packages; `13.4.1` is the current compatible target.
- `Why Deferred`: Updating Lighthouse significantly reshapes its transitive dependency tree and should be checked against the repository's scripted Lighthouse runner before the new report is trusted.
- `First Useful Slice`: Update Lighthouse to `13.4.1`, regenerate the lockfile, run `npm run audit:lighthouse`, and review the resulting direct and transitive advisory state.
- `Implemented When`: Lighthouse resolves to at least `13.4.1`, its reported advisory chain is cleared, and the repository's scripted audit completes against a production build.
- `Notes`:
- `Links`: `package.json`, `package-lock.json`, `scripts/run-lighthouse.mjs`

### SITE-26 - React Router 7 security migration

- `Priority`: `P1`
- `Size`: `L`
- `Status`: `Open`
- `Classification`: `Security`
- `Source`: `2026-08-16 dependency audit, npm outdated, npm audit --omit=dev`
- `Visitor-Facing Goal`: Keep public and private route navigation, redirects, hydration, and direct-entry behaviour protected against the current React Router redirect, XSS, and SSR-hydration advisories.
- `Current State`: The lockfile installs `react-router-dom` and `react-router` `6.30.3` with `@remix-run/router` `1.23.2`. Updating to `6.30.4` fixes only part of the reported advisory set; the production-only audit still covers the v6 line, while `7.18.2` is the current fixed release.
- `Why Deferred`: This is a major-version migration across the shared browser entry, SSR/prerender path, navigation helpers, route definitions, analytics SPA tracking, private analytics routes, and browser tests.
- `First Useful Slice`: Inventory every Router API and redirect/navigation path, review the v7 migration requirements, then upgrade the router packages together and resolve compile-time changes before browser verification.
- `Implemented When`: The application resolves React Router DOM and React Router to at least `7.18.2`, the production npm audit no longer reports the router advisories, and public navigation, direct route loads, metadata prerendering, redirects, analytics pageviews, and protected `/analytics` flows pass proportionate QA.
- `Notes`:
  - Do not treat the compatible `6.30.4` patch as full completion; it does not clear the complete current advisory set.
- `Links`: `package.json`, `package-lock.json`, `src/main.tsx`, `src/entry-server.tsx`, `src/App.tsx`, `tests/public-site.spec.ts`

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

### SITE-27 - Axe Playwright accessibility-engine update

- `Priority`: `P2`
- `Size`: `XS`
- `Status`: `Open`
- `Classification`: `Accessibility`
- `Source`: `2026-08-16 dependency audit, npm outdated`
- `Visitor-Facing Goal`: Keep automated accessibility checks aligned with the current Axe rules and browser integration so regressions affecting visitors are detected reliably.
- `Current State`: The project installs `@axe-core/playwright` `4.11.2`; `4.13.0` is the current compatible release.
- `Why Deferred`: New Axe releases can introduce or refine rule results, so the update should be reviewed alongside the existing accessibility monitor rather than accepted as a lockfile-only change.
- `First Useful Slice`: Update `@axe-core/playwright` to `4.13.0`, run the focused accessibility/browser checks, and triage any changed findings against the monitor.
- `Implemented When`: `@axe-core/playwright` resolves to `4.13.0`, the relevant browser tests pass, and any newly surfaced accessibility finding is fixed or recorded accurately.
- `Notes`:
- `Links`: `package.json`, `package-lock.json`, `tests/public-site.spec.ts`, `docs/checklists/accessibility-monitor.md`

### SITE-28 - Node type definitions update and runtime alignment

- `Priority`: `P2`
- `Size`: `S`
- `Status`: `Open`
- `Classification`: `Technical Maintenance`
- `Source`: `2026-08-16 dependency audit, npm outdated, DEBT-16`
- `Visitor-Facing Goal`: Keep server, API, migration, and build code checked against Node definitions that match the project's intended runtime.
- `Current State`: The project installs `@types/node` `25.6.0`; `25.9.5` is available within the declared major line and `26.2.0` is the current latest major. The intended Node and npm versions are not yet declared in `package.json`.
- `Why Deferred`: Moving to the latest definitions without first confirming the deployment runtime could produce misleading type coverage; the compatible v25 update can be handled first.
- `First Useful Slice`: Update to `25.9.5`, run application and test typechecks, then decide whether `26.2.0` should follow as part of resolving the runtime/package-manager pinning work.
- `Implemented When`: Node type definitions are current for the explicitly supported runtime, the application and tests typecheck, and the relationship to `DEBT-16` is resolved or recorded.
- `Notes`:
  - Coordinate the v26 type migration with the supported Node runtime rather than selecting it only because it is latest.
- `Links`: `package.json`, `package-lock.json`, `tsconfig.json`, `tests/tsconfig.json`, `docs/project/project-debt.md`

### SITE-29 - Vite React plugin maintenance update

- `Priority`: `P2`
- `Size`: `XS`
- `Status`: `Open`
- `Classification`: `Technical Maintenance`
- `Source`: `2026-08-16 dependency audit, npm outdated`
- `Visitor-Facing Goal`: Keep React transformation and Fast Refresh tooling compatible with the maintained Vite build stack.
- `Current State`: The project installs `@vitejs/plugin-react` `6.0.1`; `6.0.5` is the current compatible release.
- `Why Deferred`: The update should be verified with both the development transform and production client/SSR builds rather than changed without checks.
- `First Useful Slice`: Update `@vitejs/plugin-react` to `6.0.5`, regenerate the lockfile, and run the build plus a focused development-server smoke check.
- `Implemented When`: The plugin resolves to `6.0.5`, React compilation and Fast Refresh remain functional, and the client and SSR builds pass.
- `Notes`:
  - This can be implemented beside `SITE-24`, but it remains independently verifiable.
- `Links`: `package.json`, `package-lock.json`, `vite.config.ts`

### SITE-30 - Playwright browser-testing update

- `Priority`: `P2`
- `Size`: `M`
- `Status`: `Open`
- `Classification`: `Technical Maintenance`
- `Source`: `2026-08-16 dependency audit, npm outdated`
- `Visitor-Facing Goal`: Keep end-to-end coverage representative of current browser behaviour so visitor-facing regressions are caught before release.
- `Current State`: The project installs Playwright `1.59.1`; `1.62.1` is the current compatible release.
- `Why Deferred`: Playwright upgrades can require matching browser binaries and can change browser behaviour, selectors, timing, screenshots, or test-runner expectations.
- `First Useful Slice`: Update Playwright to `1.62.1`, install the matching supported browser binary, typecheck the tests, and run the public-site and analytics QA paths proportionate to their boundaries.
- `Implemented When`: Playwright and its browser binary are aligned at `1.62.1`, test typechecking passes, and the relevant public-site and analytics suites complete without unexplained regressions.
- `Notes`:
- `Links`: `package.json`, `package-lock.json`, `playwright.config.ts`, `tests/public-site.spec.ts`, `scripts/run-analytics-qa.mjs`

### SITE-31 - Preview test orchestrator maintenance update

- `Priority`: `P2`
- `Size`: `XS`
- `Status`: `Open`
- `Classification`: `Technical Maintenance`
- `Source`: `2026-08-16 dependency audit, npm outdated`
- `Visitor-Facing Goal`: Keep automated preview-server startup and teardown reliable so browser QA continues to protect visitor-facing releases.
- `Current State`: The project installs `start-server-and-test` `3.0.2`; `3.0.12` is the current compatible release and is used by the site QA and Lighthouse scripts.
- `Why Deferred`: Process lifecycle changes can cause false test passes, hangs, or orphaned preview servers, so the update needs a real scripted run.
- `First Useful Slice`: Update `start-server-and-test` to `3.0.12`, regenerate the lockfile, and run one QA command plus the Lighthouse orchestration path.
- `Implemented When`: The package resolves to `3.0.12`, preview startup and teardown remain deterministic, and both a browser-QA invocation and Lighthouse invocation complete cleanly.
- `Notes`:
- `Links`: `package.json`, `package-lock.json`, `playwright.config.ts`, `scripts/run-lighthouse.mjs`

### SITE-32 - React 19 application and type migration

- `Priority`: `P3`
- `Size`: `L`
- `Status`: `Open`
- `Classification`: `Technical Maintenance`
- `Source`: `2026-08-16 dependency audit, npm outdated`
- `Visitor-Facing Goal`: Move the public site and private analytics interface to the maintained React generation while preserving rendering, interaction, accessibility, and form behaviour.
- `Current State`: The project installs React and React DOM `18.3.1`, `@types/react` `18.3.28`, and `@types/react-dom` `18.3.7`. React and React DOM `19.2.8`, React types `19.2.18`, and React DOM types `19.2.4` are current; `@types/react` also has a compatible `18.3.31` patch available before the major migration.
- `Why Deferred`: React 19 is a coordinated runtime and type-system migration that can affect browser mounting, SSR/hydration, refs, effects, form behaviour, third-party peer compatibility, and tests across both public and private routes.
- `First Useful Slice`: Apply the compatible React 18 type patch, review React 19 and third-party peer requirements, then upgrade React, React DOM, and both type packages together and resolve compile-time issues before behavioural QA.
- `Implemented When`: All four packages resolve to compatible React 19 versions, application and test typechecks pass, SSR/prerender and hydration remain clean, and public navigation, enquiry submission states, analytics tracking, and private analytics interactions pass proportionate verification.
- `Notes`:
  - Keep React and React DOM on identical versions and keep their type packages on the matching major.
- `Links`: `package.json`, `package-lock.json`, `src/main.tsx`, `src/entry-server.tsx`, `src/App.tsx`, `tests/public-site.spec.ts`

### SITE-33 - Lucide React 1.x icon migration

- `Priority`: `P3`
- `Size`: `M`
- `Status`: `Open`
- `Classification`: `Technical Maintenance`
- `Source`: `2026-08-16 dependency audit, npm outdated`
- `Visitor-Facing Goal`: Keep site icons maintained and visually consistent without losing accessible names, intended sizing, or page-specific meaning.
- `Current State`: The project installs `lucide-react` `0.468.0`; `1.31.0` is the current major release.
- `Why Deferred`: This is a large version jump across visitor-facing icon consumers and needs API review plus visual inspection rather than an automatic version replacement.
- `First Useful Slice`: Inventory imported icons and shared wrappers, review the 1.x migration notes for renamed or changed exports, then upgrade and resolve source changes.
- `Implemented When`: `lucide-react` resolves to `1.31.0` or a newer approved 1.x release, all icon imports compile, accessible labelling remains correct, and representative public and analytics views show no sizing, stroke, alignment, or missing-icon regressions.
- `Notes`:
  - Preserve the strict visual boundary between public pages and private analytics while verifying their separate icon consumers.
- `Links`: `package.json`, `package-lock.json`, `src`

### SITE-34 - TypeScript 7 migration

- `Priority`: `P3`
- `Size`: `L`
- `Status`: `Open`
- `Classification`: `Technical Maintenance`
- `Source`: `2026-08-16 dependency audit, npm outdated`
- `Visitor-Facing Goal`: Keep compile-time checks effective on the maintained TypeScript generation without changing working visitor-facing behaviour accidentally.
- `Current State`: The manifest declares TypeScript `^5.7.2` and the lockfile installs `5.9.3`; `7.0.2` is the current major release.
- `Why Deferred`: A two-major compiler migration can change defaults, module resolution, library definitions, diagnostics, emit behaviour, and project-reference handling across application, test, API, and script code.
- `First Useful Slice`: Review TypeScript 6 and 7 migration notes and dependency compatibility, update the compiler in an isolated change, then resolve diagnostics without weakening strictness or broadening exclusions.
- `Implemented When`: TypeScript resolves to `7.0.2` or a newer approved 7.x release, application and test typechecks pass under the intended Node runtime, client and SSR builds succeed, and no configuration change silently reduces coverage.
- `Notes`:
  - Coordinate runtime-sensitive compiler and library choices with `DEBT-16`.
- `Links`: `package.json`, `package-lock.json`, `tsconfig.json`, `tests/tsconfig.json`, `docs/project/project-debt.md`

## Resolved Item Archive

Implemented and superseded `SITE-*` items live in [archive/site-backlog-archive.md](archive/site-backlog-archive.md). Search that file only when historical visitor-facing work or a retired stable ID matters.
