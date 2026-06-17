# Project Debt Tracker

This is the living index for technical, security, routing, API, testing, deployment, design-system, and maintainability pressure that future AI coding sessions should keep visible. It tracks project health work, not new public-site scope.

Use stable IDs when discussing or working on these items, such as `DEBT-1`. Do not renumber existing items. When an item is resolved or superseded, move it to the archive section, keep its ID intact, and condense it to a short functional summary instead of preserving the active-item field list.

## How To Maintain This Tracker

- Add an item when project debt is important enough that future sessions should remember it across tasks.
- Update an item when related work changes its risk, priority, size, preferred direction, next action, status, or completion signal.
- When planning a `DEBT-*` implementation, first assess whether the item is too broad for one safe, behavior-preserving change. If it is, propose a split into smaller `DEBT-*` items instead of forcing one large implementation plan.
- If a split is accepted, preserve stable IDs by creating new `DEBT-*` items and either narrowing the original item or marking it `Superseded` with links to the replacement items.
- Split a broad item into smaller `DEBT-*` items when investigation finds a concrete, separately actionable slice. Link the parent and child items through `Notes` rather than forcing all detail into one broad card. Overlap is acceptable when it makes future work easier to find.
- Use `Related Items` for nearby `DEBT-*` or `SITE-*` items, with one short sentence explaining the relationship. Relationships may be parent/child, sibling slices, overlapping risk areas, dependencies, or items that can affect each other.
- Use `Notes` as living tracker memory for item-specific context, including implementation considerations, extra guidance, additional thoughts, reminders, unresolved questions, risks, discoveries, and future-session hints.
- Notes may be bullets, paragraphs, or mixed, and may be edited, merged, expanded, rewritten, or pruned over time.
- If new information changes a canonical field such as priority, size, preferred direction, next action, or completion signal, update that field as well.
- Mark an item `Active` when current work is directly addressing it.
- Mark an item `Resolved` only when the tracked pressure is actually removed.
- Mark an item `Superseded` when another `DEBT-*` item or implemented direction replaces it.
- Before moving an item to the archive, transfer any remaining concrete work into an open linked `DEBT-*` item.
- When moving an item to the archive, keep only the `DEBT-*` heading and a few sentences that explain what actually changed, why the old item matters historically, and any follow-on context future sessions should know. Do not keep active-item fields such as priority, size, status, next action, resolution path, or links unless a detail is essential to understanding the archived change.
- Keep active items ordered by priority first, then ID.
- Keep this tracker compact. Link to deeper plans, docs, reports, or code areas instead of copying long analysis here.
- Do not treat this tracker as permission to implement a fix. It is memory and triage.

## Priority, Size, And Status

Priorities:

- `P0`: Urgent blocking risk.
- `P1`: High-value or release-trust issue.
- `P2`: Important maintainability or safety improvement.
- `P3`: Watchlist.

Sizes estimate the likely full resolution effort and blast radius for the tracked item, not just the next action. If an `XL` or `XXL` item is selected for implementation, first look for a smaller behavior-preserving slice or split.

Sizes:

- `XS`: Tiny doc, test, or one-call-site cleanup.
- `S`: Narrow change in one small area.
- `M`: Focused slice across a few files or tests.
- `L`: Multi-boundary change that needs careful planning.
- `XL`: Large effort that should usually be split.
- `XXL`: Roadmap-scale pressure that must be split before implementation.

Statuses:

- `Open`: Known, not currently being addressed.
- `Active`: Current work is directly addressing it.
- `Resolved`: The pressure has been removed.
- `Superseded`: Replaced by another tracked item or direction.

## Resolution Guardrails

- Preserve current visitor-facing behaviour unless a future task explicitly requests a behaviour change.
- Keep public copy, routes, layout, visual design, SEO, analytics, and form-flow behaviour unchanged unless the selected debt item directly requires that surface.
- Keep design-system scope and project scope separate. Visual/component system changes update `docs/design-system/current-scope.md`; public-site capability changes update `docs/project/current-scope.md`.
- Prefer small vertical fixes with focused verification over broad mechanical rewrites.
- Split broad items into smaller linked `DEBT-*` cards when implementation risk, ambiguity, or ownership boundaries become clearer.
- Keep server-owned validation, security, email delivery, public error handling, and deployment configuration explicit when touching API or build/deploy debt.
- Keep docs and tracker updates factual. Trackers record memory and triage; they do not authorize implementation by themselves.
- Do not use a debt item as permission to add new public-site scope, redesign the site, introduce new infrastructure, or expand design-system capabilities beyond the selected fix.

## Active Items

Each active item should include enough direction that a future session can choose a small, behavior-preserving slice without rediscovering the whole problem. `Priority Rationale` explains the rating, `Resolution Path` describes the likely sequence, `Resolved When` describes the signal for moving the item to the archive, `Related Items` records nearby tracker context, and `Notes` captures living context that does not fit cleanly in canonical fields.

### DEBT-1 - QA suite is not a trustworthy release gate

- `Priority`: `P1`
- `Size`: `M`
- `Priority Rationale`: This is `P1` because the named site QA gate currently fails, so it cannot be trusted as a release signal. It is not `P0` because the failures are known stale expectations and diagnostics gaps rather than confirmed broken production behaviour.
- `Status`: `Open`
- `Detected`: 2026-06-17
- `Source`: `docs/reports/2026-06-17-technical-code-review.md`
- `Area`: Testing, QA
- `Problem`: `npm run qa:site` currently fails against stale expectations and generic console/network 404 noise.
- `Why It Matters`: A failing QA suite cannot reliably distinguish real regressions from stale tests.
- `Preferred Direction`: Update stale semantic expectations, capture failed request URLs, and make the suite pass for the current intended site behaviour.
- `Resolution Path`: First fix stale route/heading expectations and improve failed-request diagnostics. Then rerun the full site QA path and keep any newly discovered failures as separate focused items if they are unrelated.
- `Next Action`: Fix the stale H1/404 expectations and add clearer failed-request diagnostics.
- `Resolved When`: `npm run qa:site` passes locally and failures identify concrete app or asset problems.
- `Related Items`:
  - `SITE-1`: The accessibility audit matrix should build on a trustworthy QA suite rather than stale landmark or axe failures.
  - `SITE-2`: Responsive QA needs the same reliable test foundation before viewport coverage is expanded.
  - `SITE-5`: Analytics/test policy overlaps with this because third-party noise can hide real app failures in the QA output.
  - `DEBT-8`: Route parity work may add useful assertions once the current QA gate is passing.
- `Notes`:
- `Links`: `tests/public-site.spec.ts`, `docs/reports/2026-06-17-technical-code-review.md`

### DEBT-2 - Public routes expose nested main landmarks

- `Priority`: `P1`
- `Size`: `S`
- `Priority Rationale`: This is `P1` because nested main landmarks affect every public route and undermine accessibility confidence. It is small enough to fix directly, but not `P0` because the visual site still works.
- `Status`: `Open`
- `Detected`: 2026-06-17
- `Source`: `docs/reports/2026-06-17-technical-code-review.md`
- `Area`: Accessibility, Layout Structure
- `Problem`: `Layout` wraps routes in a `<main>` while pages also return `<main>`, creating nested main landmarks.
- `Why It Matters`: Landmark structure should be clear for assistive technology and automated accessibility tests.
- `Preferred Direction`: Choose one main-landmark owner and update page/layout markup consistently.
- `Resolution Path`: Decide whether `Layout` or individual pages own the single `<main>` landmark, update the narrower side consistently, and add or adjust tests to lock the contract.
- `Next Action`: Decide whether `Layout` or pages own `<main>`, then update the narrower side.
- `Resolved When`: Each route exposes one primary main landmark and relevant tests assert that contract.
- `Related Items`:
  - `SITE-1`: This is one concrete accessibility gap that should appear in, or be cleared before, the route-by-route accessibility matrix.
  - `DEBT-1`: The QA suite currently reports stale semantic expectations, so landmark cleanup and QA repair should avoid masking each other.
- `Notes`:
- `Links`: `src/components/Layout.tsx`, `src/pages/`

### DEBT-3 - Enquiry endpoint needs abuse hardening

- `Priority`: `P1`
- `Size`: `L`
- `Priority Rationale`: This is `P1` because the enquiry endpoint is public and abuse can create inbox or provider-quota harm. It is not `P0` because no active abuse incident is recorded and the first hardening slices can be incremental.
- `Status`: `Open`
- `Detected`: 2026-06-17
- `Source`: `docs/reports/2026-06-17-technical-code-review.md`
- `Area`: Security, API, Email
- `Problem`: The enquiry endpoint has a honeypot but no rate limiting, origin policy, bot protection, IP throttling, quota guard, or monitoring boundary.
- `Why It Matters`: The endpoint has a fixed recipient, but it can still spam the inbox or burn email quota.
- `Preferred Direction`: Add Vercel-suitable rate limiting or bot protection, validate expected origins, and keep diagnostics server-side.
- `Resolution Path`: Start with low-risk origin and request-shape checks, then add a Vercel-suitable rate-limit or bot-protection slice, and finally cover accepted and blocked submissions with direct API tests.
- `Next Action`: Pick the first hardening slice, likely origin validation plus a simple rate-limit strategy.
- `Resolved When`: Automated abuse is materially harder, legitimate submissions still work, and tests cover blocked and accepted submissions.
- `Related Items`:
  - `DEBT-4`: Structured server-side validation gives hardening rules a safer payload boundary to inspect.
  - `DEBT-5`: Public error handling must stay generic when abuse or provider failures are blocked.
  - `DEBT-10`: Direct API tests should cover accepted submissions and hardening rejections together.
  - `DEBT-11`: Explicit delivery configuration reduces operational ambiguity while hardening the public endpoint.
  - `SITE-6`: Visitor-facing form-flow tests should keep legitimate enquiry states working while abuse controls are added.
- `Notes`:
- `Links`: `api/enquiry.js`, `src/components/EnquiryForm.tsx`

### DEBT-4 - Enquiry validation and email rendering depend on client-built strings

- `Priority`: `P1`
- `Size`: `L`
- `Priority Rationale`: This is `P1` because client-built email strings make validation, conditional form rules, and email rendering harder to trust at the main conversion point. It is not `P0` because current submissions can still be sent.
- `Status`: `Open`
- `Detected`: 2026-06-17
- `Source`: `docs/reports/2026-06-17-technical-code-review.md`
- `Area`: API, Forms, Validation
- `Problem`: The browser composes `subject`, `body`, and `replyTo`, while the API validates only those strings and reparses text rows for HTML email rendering.
- `Why It Matters`: Validation, email rendering, and conditional form rules should be server-owned so malformed or manipulated submissions fail safely.
- `Preferred Direction`: Send structured JSON fields from the client, validate allowed values server-side, and build subject/text/HTML email on the server.
- `Resolution Path`: Define the structured payload contract, update the client to send validated field values instead of composed email strings, move subject/body/reply-to construction server-side, and add direct API tests around accepted and rejected payloads.
- `Next Action`: Define the structured payload shape and server validation rules for the existing form fields.
- `Resolved When`: The API validates structured fields, produces email bodies from validated data, and tests cover invalid payloads and successful submissions.
- `Related Items`:
  - `DEBT-3`: Abuse hardening is more reliable once the API validates structured fields rather than client-composed strings.
  - `DEBT-5`: Error and fallback behaviour should be decided alongside the server-owned validation contract.
  - `DEBT-10`: API-level tests are the natural verification path for structured valid and invalid payloads.
  - `DEBT-11`: Server-side email rendering should align with explicit delivery configuration.
  - `SITE-6`: Public form-flow QA depends on the validation and response states chosen here.
- `Notes`:
  - This also covers review item 14: removing brittle text parsing from the email renderer by using one validated structured object for subject, reply-to, text email, HTML email, and timing notes.
- `Links`: `src/components/EnquiryForm.tsx`, `api/enquiry.js`, `src/data/enquiry.ts`

### DEBT-5 - Enquiry error handling and no-JavaScript fallback are inconsistent

- `Priority`: `P1`
- `Size`: `M`
- `Priority Rationale`: This is `P1` because public error shape and fallback behaviour affect visitor trust at the enquiry boundary. It is not `P0` because the JavaScript submission path can remain functional while the policy is clarified.
- `Status`: `Open`
- `Detected`: 2026-06-17
- `Source`: `docs/reports/2026-06-17-technical-code-review.md`
- `Area`: API, Forms, Public Errors
- `Problem`: Public API responses can expose technical details, and the form declares a native post fallback that the API does not actually support.
- `Why It Matters`: Visitors should receive safe, useful fallback messages, and the form should not imply progressive enhancement that is broken.
- `Preferred Direction`: Return generic public errors with detailed server logs, and either support native form posts or remove the implied fallback.
- `Resolution Path`: Choose the no-JavaScript/native-post policy, make public responses generic and non-diagnostic, keep detailed provider/config errors server-side, and test the chosen failure and fallback states.
- `Next Action`: Choose the no-JavaScript policy while hiding provider/env diagnostics from public responses.
- `Resolved When`: Visitor-facing errors are safe, fallback behaviour is intentional, and tests cover missing-env/provider failure/native-post policy.
- `Related Items`:
  - `DEBT-3`: Hardening failures should return safe public messages without leaking security or provider details.
  - `DEBT-4`: Validation shape determines which visitor-facing error states can be shown clearly.
  - `DEBT-10`: Direct API tests should cover generic public errors and detailed server-side failure paths.
  - `SITE-6`: Browser form-flow tests should verify the visible success, failure, validation, and fallback states.
- `Notes`:
- `Links`: `api/enquiry.js`, `src/components/EnquiryForm.tsx`

### DEBT-6 - Production URL and Vercel routing behaviour are not locked down

- `Priority`: `P1`
- `Size`: `M`
- `Priority Rationale`: This is `P1` because incorrect production URLs or routing assumptions can damage canonical metadata, sitemap output, sharing previews, and deployed deep links. It is not `P0` because the issue is configuration and verification pressure rather than a confirmed production outage.
- `Status`: `Open`
- `Detected`: 2026-06-17
- `Source`: `docs/reports/2026-06-17-technical-code-review.md`
- `Area`: Deployment, Routing, Metadata
- `Problem`: Production metadata can fall back to preview or localhost URLs, and local QA does not verify Vercel clean URL/fallback behaviour.
- `Why It Matters`: Canonicals, OG URLs, sitemap URLs, robots output, redirects, and unknown-route hydration need production-safe behaviour.
- `Preferred Direction`: Require canonical `SITE_URL` for production builds and explicitly verify Vercel routing/fallback behaviour.
- `Resolution Path`: Add production configuration validation for canonical URL generation, then verify the intended Vercel clean-URL and SPA fallback behaviour locally or on preview before changing redirects or rewrites.
- `Next Action`: Add production `SITE_URL` validation and decide the intended Vercel fallback strategy for SPA deep links.
- `Resolved When`: Production builds cannot emit preview/localhost canonicals by accident, and Vercel route behaviour is verified.
- `Related Items`:
  - `DEBT-8`: Route manifest or parity work should agree with the production URL and fallback strategy.
  - `DEBT-16`: Runtime and package-manager pinning can reduce environment drift while production build validation is tightened.
  - `SITE-3`: The public SEO/metadata matrix depends on locked-down canonical URLs, sitemap output, redirects, and noindex policy.
- `Notes`:
- `Links`: `scripts/prerender-route-metadata.mjs`, `src/data/routeMetadata.json`, `vercel.json`

### DEBT-7 - Encoding mojibake exists in source and rendered output

- `Priority`: `P1`
- `Size`: `S`
- `Priority Rationale`: This is `P1` because visible encoding corruption makes the site and source look untrustworthy, but the known fix appears narrow and low-risk.
- `Status`: `Open`
- `Detected`: 2026-06-17
- `Source`: `docs/reports/2026-06-17-technical-code-review.md`
- `Area`: Encoding, Source Hygiene
- `Problem`: Source and rendered output contain mojibake sequences such as corrupted symbols in CSS content and footer output.
- `Why It Matters`: Encoding damage makes the site look unpolished and can hide future text corruption.
- `Preferred Direction`: Normalize affected files to UTF-8, replace corrupted sequences with intended text or ASCII, and add a lightweight detection check.
- `Resolution Path`: Fix the known corrupted strings, search for common mojibake markers, and add a lightweight check or repeatable search so future corruption is easy to catch.
- `Next Action`: Fix the known CSS/footer mojibake and run a repository search for common corruption markers.
- `Resolved When`: Known mojibake is gone and future corruption is easy to detect.
- `Related Items`:
  - `DEBT-1`: A trustworthy QA path may catch rendered encoding damage once stale failures are cleared.
  - `SITE-3`: Metadata and SEO copy should be included in any encoding scan so corrupted canonical or social text does not slip through.
- `Notes`:
- `Links`: `src/styles.css`, `docs/reports/2026-06-17-technical-code-review.md`

### DEBT-8 - Routes, metadata, prerendering, and tests are duplicated

- `Priority`: `P2`
- `Size`: `L`
- `Priority Rationale`: This is `P2` because duplicated route truth will keep creating drift as pages, metadata, redirects, tests, and prerendering change. It is not `P1` while the current route set is still small enough to manage with parity tests.
- `Status`: `Open`
- `Detected`: 2026-06-17
- `Source`: `docs/reports/2026-06-17-technical-code-review.md`
- `Area`: Routing, Metadata, Tests
- `Problem`: Public route data is repeated across route definitions, app registration, metadata JSON, prerendering, and tests.
- `Why It Matters`: Duplication makes it easy to add, rename, or redirect a route without updating metadata, sitemap, tests, or navigation expectations.
- `Preferred Direction`: Create one route manifest or add parity tests that enforce consistency across routes, metadata, prerender output, sitemap, navigation intent, and coverage.
- `Resolution Path`: Start with parity tests that expose route/metadata/prerender/test drift, then decide whether a shared manifest is warranted once the current duplication points are visible.
- `Next Action`: Add a focused parity test before a broader manifest refactor.
- `Resolved When`: Public route changes fail clearly when metadata, prerendering, redirects, or tests are out of sync.
- `Related Items`:
  - `DEBT-1`: Route parity assertions should be added after the failing QA gate is trustworthy enough to carry them.
  - `DEBT-6`: Production routing and canonical URL decisions need to match any route manifest or parity test.
  - `SITE-3`: The SEO/metadata matrix is the visitor-facing counterpart to this technical route consistency work.
- `Notes`:
- `Links`: `src/data/routes.ts`, `src/App.tsx`, `src/data/routeMetadata.json`, `tests/public-site.spec.ts`

### DEBT-9 - Type checking does not cover tests, scripts, config, or API code

- `Priority`: `P2`
- `Size`: `M`
- `Priority Rationale`: This is `P2` because important tests, scripts, config, and API code sit outside the main TypeScript safety net. It is not `P1` because runtime behaviour is covered partly by build and browser checks today.
- `Status`: `Open`
- `Detected`: 2026-06-17
- `Source`: `docs/reports/2026-06-17-technical-code-review.md`
- `Area`: TypeScript, Tooling, API
- `Problem`: The main TypeScript config covers `src`, while API, tests, scripts, and most config files are outside normal type checking.
- `Why It Matters`: Important build, deploy, test, and serverless code can drift without type feedback.
- `Preferred Direction`: Add dedicated typecheck coverage for tests/config/scripts and either migrate the API to TypeScript or protect it with focused validation tests.
- `Resolution Path`: Add a separate typecheck path for tests and scripts first, then decide whether API code should move to TypeScript or be protected by direct JavaScript tests and validation boundaries.
- `Next Action`: Add a separate typecheck target for Playwright tests and scripts, then assess the API path.
- `Resolved When`: Non-`src` project code has an explicit verification path in local checks or CI.
- `Related Items`:
  - `DEBT-1`: A broader typecheck path can strengthen release trust once the current QA gate is repaired.
  - `DEBT-8`: Route metadata, prerender scripts, and tests are part of the non-`src` code that may need type or parity coverage.
  - `DEBT-10`: API test coverage may be the safer first protection if the API remains JavaScript.
  - `DEBT-16`: Runtime/package-manager pinning helps keep expanded tooling checks stable across environments.
- `Notes`:
- `Links`: `tsconfig.json`, `tsconfig.node.json`, `tests/`, `scripts/`, `api/enquiry.js`

### DEBT-10 - Enquiry API lacks direct tests

- `Priority`: `P2`
- `Size`: `M`
- `Priority Rationale`: This is `P2` because the enquiry API is the most sensitive integration point, but existing browser-level tests still provide some coverage of the visible flow.
- `Status`: `Open`
- `Detected`: 2026-06-17
- `Source`: `docs/reports/2026-06-17-technical-code-review.md`
- `Area`: API, Testing, Email
- `Problem`: Existing tests cover public pages and some browser behaviour, but not direct `/api/enquiry` outcomes such as honeypot handling, invalid payloads, missing environment variables, Resend failures, or native submission policy.
- `Why It Matters`: The enquiry endpoint is the most sensitive public integration point and needs fast, isolated tests in addition to browser-flow coverage.
- `Preferred Direction`: Add API-level tests with mocked Resend/fetch behaviour, then pair them with the public form-flow tests tracked in `SITE-6`.
- `Resolution Path`: Choose a direct API test harness, mock provider calls and environment configuration, cover success and rejection paths, then keep browser tests focused on visitor-visible form states.
- `Next Action`: Choose the API test harness and cover success, invalid payload, honeypot, missing config, and provider failure paths.
- `Resolved When`: `/api/enquiry` has direct tests for accepted and rejected submissions, and public form-flow browser tests cover the visible visitor states.
- `Related Items`:
  - `DEBT-3`: Hardening rules need direct tests for blocked and accepted submissions.
  - `DEBT-4`: Structured validation requires API-level tests for accepted and rejected payloads.
  - `DEBT-5`: Public error and fallback policies should be covered at the API boundary.
  - `DEBT-11`: Missing or invalid email delivery configuration should be tested directly.
  - `SITE-6`: Browser form-flow QA should complement these API tests by checking visitor-visible states.
- `Notes`:
- `Links`: `api/enquiry.js`, `src/components/EnquiryForm.tsx`, `docs/project/site-backlog.md`

### DEBT-11 - Email delivery configuration is implicit

- `Priority`: `P2`
- `Size`: `S`
- `Priority Rationale`: This is `P2` because implicit production delivery settings can cause subtle operational drift, but the likely fix is narrow configuration validation and documentation.
- `Status`: `Open`
- `Detected`: 2026-06-17
- `Source`: `docs/reports/2026-06-17-technical-code-review.md`
- `Area`: API, Configuration, Email
- `Problem`: The enquiry API can fall back to a hard-coded recipient while the public display email is configured separately in client data.
- `Why It Matters`: Production delivery settings should be explicit so submissions do not silently route to an unintended address or drift from the public contact details.
- `Preferred Direction`: Require `RESEND_API_KEY`, `ENQUIRY_FROM_EMAIL`, and `ENQUIRY_TO_EMAIL` in production, and document whether public display email and delivery recipient must match.
- `Resolution Path`: Define required production email environment variables, validate them before sending, and document the relationship between public display email and private delivery recipient.
- `Next Action`: Add production config validation and tests for missing required email settings.
- `Resolved When`: Production cannot use accidental email defaults, missing config fails safely, and public/delivery email relationship is documented.
- `Related Items`:
  - `DEBT-3`: Endpoint hardening and delivery configuration both reduce operational risk around public submissions.
  - `DEBT-4`: Server-side email rendering should use the same explicit delivery configuration.
  - `DEBT-5`: Missing configuration should fail with safe public errors and useful server-side diagnostics.
  - `DEBT-10`: Direct API tests should cover missing config and provider failure paths.
- `Notes`:
- `Links`: `api/enquiry.js`, `src/data/enquiry.ts`

### DEBT-13 - Legacy CSS layers need focused cleanup

- `Priority`: `P2`
- `Size`: `L`
- `Priority Rationale`: This is `P2` because old CSS layers increase design-system ambiguity and cascade cost, but the broad item should be split into small cleanup cards before implementation.
- `Status`: `Open`
- `Detected`: 2026-06-17
- `Source`: `docs/reports/2026-06-17-technical-code-review.md`
- `Area`: Design System, CSS, Maintainability
- `Problem`: Older shared CSS layers such as `.image-panel`, `.card`, `.fit-strip`, `.section`, `.feature-panel`, `.topic-card`, and related overrides still live in production CSS while most pages now use `site-*` and `hero-*`.
- `Why It Matters`: Legacy layers increase cascade surface area and make it harder to know which patterns are active, deprecated, or safe to copy.
- `Preferred Direction`: Use focused cleanup sweeps to audit actual usage, remove dead rules, quarantine legacy aliases, and preserve still-used pieces until replacements exist.
- `Resolution Path`: Treat this as a parent card. Use targeted usage scans to create or work through smaller linked debt items, remove only confirmed-dead rules, and preserve or document compatibility paths that are still needed.
- `Next Action`: Run one legacy CSS usage audit and pick the smallest safe removal or documentation pass.
- `Resolved When`: Known legacy CSS layers are either removed, explicitly retained, or documented as deprecated/reference-only without production ambiguity.
- `Related Items`:
  - `DEBT-14`: Archived `DEBT-14` resolved a side-stripe rule conflict in the same design-system CSS surface by removing the blanket prohibition rather than changing the UI.
  - `DEBT-15`: Global CSS bundling increases the impact of lingering legacy selectors.
  - `DEBT-17`: This is the smaller card/component cleanup slice split out of the broader legacy CSS issue.
  - `DEBT-18`: This is the smaller panel/strip selector audit split from the same legacy CSS cluster.
  - `DEBT-19`: This is the smaller issue/topic grid audit that overlaps with active card patterns.
  - `DEBT-21`: Shared typography cleanup is another focused design-system CSS cleanup lane, though it is about type roles rather than legacy selector removal.
- `Notes`:
  - This is a broad cleanup parent. When a concrete slice is found, add a smaller linked `DEBT-*` item instead of expanding this card indefinitely.
  - `DEBT-17` covers the specific `src/components/Card.tsx`, `.card`, and `.card-grid` cleanup slice discovered while resolving `DEBT-12`.
  - `DEBT-18` covers old panel/strip selectors found in the same legacy CSS cluster.
  - `DEBT-19` covers old issue/topic grid selectors that overlap with the active `site-topic-*` card system.
- `Links`: `src/styles.css`, `docs/design-system/maintenance/cleanup-sweeps.md`, `docs/design-system/current-scope.md`

### DEBT-15 - Public page CSS is globally bundled and relies on naming discipline

- `Priority`: `P2`
- `Size`: `M`
- `Priority Rationale`: This is `P2` because global page CSS can create future cascade and bundle problems, but current naming discipline appears to keep the risk manageable.
- `Status`: `Open`
- `Detected`: 2026-06-17
- `Source`: `docs/reports/2026-06-17-technical-code-review.md`
- `Area`: CSS, Routing, Maintainability
- `Problem`: Public pages import global page styles, so page-scoped CSS joins one production cascade and bundle even when classes are disciplined.
- `Why It Matters`: As page CSS grows, accidental cross-page selectors, cascade surprises, and bundle growth become more likely.
- `Preferred Direction`: Keep page-root prefix rules strict for now, and consider route-level lazy loading or CSS Modules if page CSS continues to expand.
- `Resolution Path`: Document and enforce page-root naming expectations first, then revisit route-level CSS loading or stronger scoping only if page CSS growth creates concrete problems.
- `Next Action`: Document the page-root prefix rule and add this risk to future CSS cleanup considerations.
- `Resolved When`: Page-specific CSS either has an explicit naming/scoping policy that is followed, or a stronger scoping/lazy-loading strategy is adopted.
- `Related Items`:
  - `DEBT-13`: Legacy selectors in global CSS make the naming-discipline risk more expensive to manage.
  - `SITE-2`: Responsive QA can reveal cross-page cascade issues caused by global page CSS.
  - `SITE-4`: Performance and image delivery review may also need to consider route-level CSS/JS growth.
  - `SITE-8`: Shared portrait/media treatment may reduce duplicated page-scoped CSS if the pattern is promoted.
  - `DEBT-20`: Page-specific typography overrides are one concrete way global page CSS can drift from shared design-system roles.
- `Notes`:
- `Links`: `src/App.tsx`, `src/pages/`, `src/styles-*.css`

### DEBT-17 - Legacy Card component and card CSS need cleanup

- `Priority`: `P2`
- `Size`: `S`
- `Priority Rationale`: This is `P2` because the old card path is easy for future agents to copy, but the cleanup itself should be a small focused audit and removal slice.
- `Status`: `Open`
- `Detected`: 2026-06-17
- `Source`: `DEBT-12`, `docs/reports/2026-06-17-technical-code-review.md`
- `Area`: Design System, Components, CSS
- `Problem`: `src/components/Card.tsx` appears unused, while `.card`, `.card-grid`, `.card-kicker`, and related card selectors remain in production CSS as legacy compatibility code.
- `Why It Matters`: Dead or legacy card code can be copied by future work unless it is removed or explicitly retained.
- `Preferred Direction`: Run a focused usage audit, remove confirmed-dead component/CSS where safe, and split any larger discovered cleanup into new linked `DEBT-*` items.
- `Resolution Path`: Confirm source usage for the legacy component and selectors, remove confirmed-dead code in one small cleanup, and split any coupled responsive or adjacent selector work into linked debt if needed.
- `Next Action`: Run a targeted usage scan for `Card.tsx`, `.card`, `.card-grid`, `.card-kicker`, and related selectors, then remove only the confirmed-dead slice.
- `Resolved When`: The unused `Card` component and legacy card CSS are either removed, deliberately retained with documentation, or split into smaller tracked cleanup items.
- `Related Items`:
  - `DEBT-12`: The archived item resolved the AI instruction boundary; this item stores the remaining source cleanup work.
  - `DEBT-13`: This is a smaller concrete slice of the broad legacy CSS cleanup parent.
  - `DEBT-18`: Old panel/strip selectors sit near the same legacy CSS cluster and may share responsive cleanup.
  - `DEBT-19`: Old issue/topic card selectors overlap with card naming and active `site-topic-*` guidance.
- `Notes`:
  - This is the open implementation cleanup work split out after `DEBT-12` resolved the AI instruction boundary. `DEBT-13` remains the broad legacy CSS cleanup parent.
- `Links`: `src/components/Card.tsx`, `src/styles.css`, `docs/design-system/current-scope.md`, `docs/design-system/patterns/components.md`, `docs/design-system/maintenance/migration-notes.md`

### DEBT-18 - Legacy panel and strip CSS need usage audit

- `Priority`: `P2`
- `Size`: `S`
- `Priority Rationale`: This is `P2` because the selectors appear unused and sit in the production cascade, but the safe next move is only a usage audit.
- `Status`: `Open`
- `Detected`: 2026-06-17
- `Source`: `DEBT-13`, local usage scan on 2026-06-17
- `Area`: Design System, CSS, Maintainability
- `Problem`: `.image-panel`, `.fit-strip`, `.feature-panel`, and `.two-column-panel` still exist in `src/styles.css`, but the usage scan found no obvious current page or component references outside the CSS itself.
- `Why It Matters`: Dead panel and strip selectors keep old layout language available for accidental reuse and add unnecessary cascade surface.
- `Preferred Direction`: Confirm whether these selectors are truly unused, then remove dead rules or document any retained compatibility case.
- `Resolution Path`: Search all source and docs for old panel/strip selectors, inspect related responsive rules, remove confirmed-dead CSS, and split any retained compatibility case into a narrower item.
- `Next Action`: Run a focused source search for the old panel/strip selectors and inspect nearby responsive rules before deleting anything.
- `Resolved When`: The old panel/strip selector cluster is removed, explicitly retained, or split into narrower cleanup items if hidden usage is found.
- `Related Items`:
  - `DEBT-13`: This is a concrete child slice of the broader legacy CSS cleanup parent.
  - `DEBT-15`: Removing unused global selectors reduces the risk created by the globally bundled CSS cascade.
  - `DEBT-17`: The old panel/strip rules sit near legacy card rules and may share responsive selectors.
  - `DEBT-19`: Old topic and panel selectors may be removed in adjacent dead-CSS sweeps if scans confirm they are unused.
- `Notes`:
  - Overlaps with `DEBT-13` as one concrete legacy CSS slice.
- `Links`: `src/styles.css`, `docs/design-system/maintenance/cleanup-sweeps.md`, `docs/design-system/maintenance/migration-notes.md`

### DEBT-19 - Legacy issue and topic grid CSS needs usage audit

- `Priority`: `P2`
- `Size`: `S`
- `Priority Rationale`: This is `P2` because legacy and active topic-card names overlap semantically, but a focused usage audit should clarify whether deletion is safe.
- `Status`: `Open`
- `Detected`: 2026-06-17
- `Source`: `DEBT-13`, local usage scan on 2026-06-17
- `Area`: Design System, CSS, Cards, Maintainability
- `Problem`: `.issues-section`, `.topic-grid`, and `.topic-card` still exist in `src/styles.css` alongside the active `.site-topic-grid` and `.site-topic-card` system.
- `Why It Matters`: Similar old and active topic-card names make it easy for future work to copy the wrong pattern.
- `Preferred Direction`: Confirm current usage, then remove dead legacy issue/topic selectors or document any retained compatibility case.
- `Resolution Path`: Search source and docs for the old issue/topic selectors, compare any real usage with the active `site-topic-*` system, then delete, retain, or split the cleanup based on what is found.
- `Next Action`: Run a focused source search for `.issues-section`, `.topic-grid`, and `.topic-card`, then compare any remaining need with the active `site-topic-*` system.
- `Resolved When`: Old issue/topic grid selectors are removed, explicitly retained, or split into narrower cleanup items if hidden usage is found.
- `Related Items`:
  - `DEBT-13`: This is a concrete child slice of the broader legacy CSS cleanup parent.
  - `DEBT-17`: Legacy issue/topic card naming overlaps with the legacy card cleanup lane.
  - `DEBT-18`: Old issue/topic and panel/strip selectors appear in the same legacy CSS region and may be audited together.
  - `SITE-8`: If media/hero patterns are promoted later, this cleanup helps keep active design-system naming clearer.
- `Notes`:
  - Overlaps with `DEBT-13` and the card cleanup lane in `DEBT-17`; keep cross-links rather than merging the items.
- `Links`: `src/styles.css`, `docs/design-system/patterns/page-patterns.md`, `docs/design-system/current-scope.md`, `docs/design-system/maintenance/migration-notes.md`

### DEBT-20 - Page-specific typography overrides need role audit

- `Priority`: `P2`
- `Size`: `M`
- `Priority Rationale`: This is `P2` because the type-role foundation is now documented, but page CSS can still drift through local font-size, fluid-size, and tracking overrides.
- `Status`: `Open`
- `Detected`: 2026-06-17
- `Source`: `docs/design-system-old/type-scale-plan.md`
- `Area`: Design System, CSS, Typography, Maintainability
- `Problem`: The old type-scale plan completed the shared role baseline, but remaining cleanup calls for reducing page-specific type overrides so page CSS mostly controls layout and measure, not basic type scale.
- `Why It Matters`: Local type sizes make new pages harder to build consistently and can reintroduce near-body one-offs that the type-role work was meant to remove.
- `Preferred Direction`: Audit page-scoped CSS for local font-size, clamp, and letter-spacing rules; convert clear duplicates to shared type roles while preserving deliberate editorial compositions.
- `Resolution Path`: Inventory page CSS typography rules, classify each as shared-role candidate or deliberate page-specific expression, then clean up one low-risk route group at a time with visual checks.
- `Next Action`: Run a focused typography scan across `src/styles-*.css`, pick one public route group, and remove or convert only the obvious duplicate type overrides.
- `Resolved When`: Public page CSS mostly adjusts layout, measure, and composition; remaining local type rules are deliberate and documented by role or page need.
- `Related Items`:
  - `DEBT-15`: Page-specific typography drift is one concrete risk created by globally bundled page CSS.
  - `DEBT-21`: Shared production typography should be audited first or alongside this so page cleanup has stable roles to target.
  - `SITE-2`: Responsive QA should catch visual regressions when local type overrides are reduced.
  - `SITE-8`: Shared portrait/media hero work may overlap with page-specific hero and support-copy type cleanup.
- `Notes`:
  - Do not treat this as a redesign or global re-scale. The first type-role implementation slice is already complete; this is follow-up cleanup.
  - Preserve page-specific type where a page has a genuine editorial composition, such as special hero title measures or unique visual moments.
- `Links`: `src/styles-*.css`, `docs/design-system/foundations/tokens.md`, `docs/design-system/current-scope.md`, `docs/design-system-old/type-scale-plan.md`

### DEBT-21 - Shared production typography needs raw-size and fluid-rule audit

- `Priority`: `P2`
- `Size`: `S`
- `Priority Rationale`: This is `P2` because shared production CSS still contains raw or fluid typography rules that may bypass the documented type-role system, but the safe next step is a narrow audit.
- `Status`: `Open`
- `Detected`: 2026-06-17
- `Source`: `docs/design-system-old/type-scale-plan.md`
- `Area`: Design System, CSS, Typography, Maintainability
- `Problem`: After the shared type-role implementation, `src/styles.css` still contains raw `font-size` values and some fluid `clamp(...)` rules that should be classified as role-backed, deliberate exceptions, or cleanup candidates.
- `Why It Matters`: Shared selectors teach future page work. If shared typography mixes role tokens with unexplained raw sizes, future agents may copy the wrong pattern.
- `Preferred Direction`: Audit shared production selectors before page-specific cleanup, convert clear duplicates to type-role variables, and document deliberate exceptions where a raw or fluid value remains.
- `Resolution Path`: Search `src/styles.css` for `font-size`, `letter-spacing`, and fluid `clamp(...)` rules, classify each shared selector by role, then make one small conversion pass at a time with visual verification.
- `Next Action`: Run a shared typography audit on `src/styles.css` and identify the first low-risk group of raw sizes that can move to existing type roles.
- `Resolved When`: Shared production typography either uses documented type roles or has clear, deliberate exceptions; future page work can choose type roles without guessing.
- `Related Items`:
  - `DEBT-13`: This is a focused design-system CSS cleanup lane that should stay small like the other legacy cleanup slices.
  - `DEBT-20`: Page-specific typography cleanup depends on the shared roles being stable and clear.
  - `SITE-2`: Responsive QA should cover any shared type changes across compact and desktop viewports.
- `Notes`:
  - The old plan recommended fluid display/hero roles, mostly fixed body/label/card/form roles, and lightly responsive section headings. Use that as classification guidance, not as permission to re-scale the site.
  - Some raw values may remain appropriate for icons, nav details, compact metadata, or deliberately non-body roles.
- `Links`: `src/styles.css`, `docs/design-system/foundations/tokens.md`, `docs/design-system-old/type-scale-plan.md`

### DEBT-16 - Runtime and package-manager expectations are not pinned

- `Priority`: `P3`
- `Size`: `XS`
- `Priority Rationale`: This is `P3` because runtime/package-manager drift is real but lower urgency than visitor-facing, API, QA, and design-system ambiguity. The likely fix is tiny once the intended versions are confirmed.
- `Status`: `Open`
- `Detected`: 2026-06-17
- `Source`: `docs/reports/2026-06-17-technical-code-review.md`
- `Area`: Tooling, Build, Deployment
- `Problem`: The project uses modern Vite/plugin tooling but does not declare expected Node or package-manager versions in `package.json`.
- `Why It Matters`: Local, CI, and Vercel environments can drift and produce avoidable install or build differences.
- `Preferred Direction`: Add `engines.node` and `packageManager` entries that match the intended development and deployment environment.
- `Resolution Path`: Confirm the intended Node and npm versions, add explicit metadata to `package.json`, and verify install/build behaviour in the normal local path.
- `Next Action`: Confirm the intended Node and npm versions, then pin them in `package.json`.
- `Resolved When`: Runtime and package-manager expectations are explicit and available to local tooling and deployment environments.
- `Related Items`:
  - `DEBT-1`: Stable runtime/tooling expectations help make the QA gate reproducible across machines.
  - `DEBT-6`: Production build validation and deployment routing assumptions depend on consistent runtime behaviour.
  - `DEBT-9`: Expanded typecheck and script coverage is easier to trust when Node and package-manager versions are pinned.
- `Notes`:
- `Links`: `package.json`

## Archive

### DEBT-14 - Side-stripe panel rules conflict with active patterns

Resolved on 2026-06-17 after a visual audit confirmed the active striped panels are intentional and not a UI problem. The issue was the blanket AI/design-system rule against 4px side stripes, which conflicted with good existing shared panel/card patterns.

The resolution removed the side-stripe prohibition from active design-system guidance and the design export, while leaving public UI, CSS, routes, and copy unchanged. Existing `.site-copy-panel`, `.site-check-panel`, and `.site-fee-card` side-stripe treatments remain valid shared patterns; the unused `.site-highlight__box` question belongs to broader legacy CSS cleanup if it matters later.

Visual audit report: `docs/reports/2026-06-17-debt-14-side-stripe-visual-audit.md`.

### DEBT-12 - Design-system card boundary is unclear

Resolved on 2026-06-17 by clarifying the AI-facing card boundary in the repository guidance and design-system docs. Active card work now points to `.site-card`, `.site-card--link`, `.site-card__*`, `.site-topic-card`, `.site-fee-card`, and deliberate page-scoped compositions; `Card.tsx`, `.card`, and `.card-grid` are no longer described as active card API.

The remaining source cleanup did not disappear with this instruction-level fix. It was split into open implementation debt under `DEBT-17`, with broader legacy CSS context linked from `DEBT-13`. Future discoveries can split into additional smaller `DEBT-*` items rather than reopening this archived boundary item.
