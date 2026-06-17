# Project Debt Tracker

This is the living tracker for technical, security, routing, API, testing, deployment, and maintainability pressure. It tracks project health work, not new public-site scope.

Use stable IDs when discussing or working on these items, such as `DEBT-1`. Do not renumber existing items. When an item is resolved or superseded, move it to the archive section, keep its ID intact, and condense it to a short functional summary.

## How To Maintain This Tracker

- Add an item when technical pressure is important enough that future sessions should remember it.
- Update an item when related work changes its priority, status, next action, risk, or resolution signal.
- Use `Notes` for living implementation context, discoveries, constraints, and future-session hints.
- Mark an item `Active` only when current work is directly addressing it.
- Mark an item `Resolved` only when the tracked pressure is actually removed.
- Keep active items ordered by priority first, then ID.
- Do not treat this tracker as permission to implement a fix. It is memory and triage.

## Priority, Size, And Status

Priorities:

- `P0`: Urgent blocking risk.
- `P1`: High-value or release-trust issue.
- `P2`: Important maintainability or safety improvement.
- `P3`: Watchlist.

Sizes:

- `XS`: Tiny doc, test, or one-call-site cleanup.
- `S`: Narrow change in one small area.
- `M`: Focused slice across a few files or tests.
- `L`: Multi-boundary change that needs careful planning.
- `XL`: Large effort that should usually be split.

Statuses:

- `Open`: Known, not currently being addressed.
- `Active`: Current work is directly addressing it.
- `Resolved`: The pressure has been removed.
- `Superseded`: Replaced by another tracked item or direction.

## Active Items

### DEBT-1 - QA suite is not a trustworthy release gate

- `Priority`: `P1`
- `Size`: `M`
- `Status`: `Open`
- `Source`: `docs/reports/2026-06-17-technical-code-review.md`
- `Area`: Testing, QA
- `Problem`: `npm run qa:site` currently fails against stale expectations and generic console/network 404 noise.
- `Why It Matters`: A failing QA suite cannot reliably distinguish real regressions from stale tests.
- `Preferred Direction`: Update stale semantic expectations, capture failed request URLs, and make the suite pass for the current intended site behaviour.
- `Next Action`: Fix the stale H1/404 expectations and add clearer failed-request diagnostics.
- `Resolved When`: `npm run qa:site` passes locally and failures identify concrete app or asset problems.
- `Notes`:
- `Links`: `tests/public-site.spec.ts`, `docs/reports/2026-06-17-technical-code-review.md`

### DEBT-2 - Public routes expose nested main landmarks

- `Priority`: `P1`
- `Size`: `S`
- `Status`: `Open`
- `Source`: `docs/reports/2026-06-17-technical-code-review.md`
- `Area`: Accessibility, Layout Structure
- `Problem`: `Layout` wraps routes in a `<main>` while pages also return `<main>`, creating nested main landmarks.
- `Why It Matters`: Landmark structure should be clear for assistive technology and automated accessibility tests.
- `Preferred Direction`: Choose one main-landmark owner and update page/layout markup consistently.
- `Next Action`: Decide whether `Layout` or pages own `<main>`, then update the narrower side.
- `Resolved When`: Each route exposes one primary main landmark and relevant tests assert that contract.
- `Notes`:
- `Links`: `src/components/Layout.tsx`, `src/pages/`

### DEBT-3 - Enquiry endpoint needs abuse hardening

- `Priority`: `P1`
- `Size`: `L`
- `Status`: `Open`
- `Source`: `docs/reports/2026-06-17-technical-code-review.md`
- `Area`: Security, API, Email
- `Problem`: The enquiry endpoint has a honeypot but no rate limiting, origin policy, bot protection, IP throttling, quota guard, or monitoring boundary.
- `Why It Matters`: The endpoint has a fixed recipient, but it can still spam the inbox or burn email quota.
- `Preferred Direction`: Add Vercel-suitable rate limiting or bot protection, validate expected origins, and keep diagnostics server-side.
- `Next Action`: Pick the first hardening slice, likely origin validation plus a simple rate-limit strategy.
- `Resolved When`: Automated abuse is materially harder, legitimate submissions still work, and tests cover blocked and accepted submissions.
- `Notes`:
- `Links`: `api/enquiry.js`, `src/components/EnquiryForm.tsx`

### DEBT-4 - Enquiry validation and email rendering depend on client-built strings

- `Priority`: `P1`
- `Size`: `L`
- `Status`: `Open`
- `Source`: `docs/reports/2026-06-17-technical-code-review.md`
- `Area`: API, Forms, Validation
- `Problem`: The browser composes `subject`, `body`, and `replyTo`, while the API validates only those strings and reparses text rows for HTML email rendering.
- `Why It Matters`: Validation, email rendering, and conditional form rules should be server-owned so malformed or manipulated submissions fail safely.
- `Preferred Direction`: Send structured JSON fields from the client, validate allowed values server-side, and build subject/text/HTML email on the server.
- `Next Action`: Define the structured payload shape and server validation rules for the existing form fields.
- `Resolved When`: The API validates structured fields, produces email bodies from validated data, and tests cover invalid payloads and successful submissions.
- `Notes`:
  - This also covers review item 14: removing brittle text parsing from the email renderer by using one validated structured object for subject, reply-to, text email, HTML email, and timing notes.
- `Links`: `src/components/EnquiryForm.tsx`, `api/enquiry.js`, `src/data/enquiry.ts`

### DEBT-5 - Enquiry error handling and no-JavaScript fallback are inconsistent

- `Priority`: `P1`
- `Size`: `M`
- `Status`: `Open`
- `Source`: `docs/reports/2026-06-17-technical-code-review.md`
- `Area`: API, Forms, Public Errors
- `Problem`: Public API responses can expose technical details, and the form declares a native post fallback that the API does not actually support.
- `Why It Matters`: Visitors should receive safe, useful fallback messages, and the form should not imply progressive enhancement that is broken.
- `Preferred Direction`: Return generic public errors with detailed server logs, and either support native form posts or remove the implied fallback.
- `Next Action`: Choose the no-JavaScript policy while hiding provider/env diagnostics from public responses.
- `Resolved When`: Visitor-facing errors are safe, fallback behaviour is intentional, and tests cover missing-env/provider failure/native-post policy.
- `Notes`:
- `Links`: `api/enquiry.js`, `src/components/EnquiryForm.tsx`

### DEBT-6 - Production URL and Vercel routing behaviour are not locked down

- `Priority`: `P1`
- `Size`: `M`
- `Status`: `Open`
- `Source`: `docs/reports/2026-06-17-technical-code-review.md`
- `Area`: Deployment, Routing, Metadata
- `Problem`: Production metadata can fall back to preview or localhost URLs, and local QA does not verify Vercel clean URL/fallback behaviour.
- `Why It Matters`: Canonicals, OG URLs, sitemap URLs, robots output, redirects, and unknown-route hydration need production-safe behaviour.
- `Preferred Direction`: Require canonical `SITE_URL` for production builds and explicitly verify Vercel routing/fallback behaviour.
- `Next Action`: Add production `SITE_URL` validation and decide the intended Vercel fallback strategy for SPA deep links.
- `Resolved When`: Production builds cannot emit preview/localhost canonicals by accident, and Vercel route behaviour is verified.
- `Notes`:
- `Links`: `scripts/prerender-route-metadata.mjs`, `src/data/routeMetadata.json`, `vercel.json`

### DEBT-7 - Encoding mojibake exists in source and rendered output

- `Priority`: `P1`
- `Size`: `S`
- `Status`: `Open`
- `Source`: `docs/reports/2026-06-17-technical-code-review.md`
- `Area`: Encoding, Source Hygiene
- `Problem`: Source and rendered output contain mojibake sequences such as corrupted symbols in CSS content and footer output.
- `Why It Matters`: Encoding damage makes the site look unpolished and can hide future text corruption.
- `Preferred Direction`: Normalize affected files to UTF-8, replace corrupted sequences with intended text or ASCII, and add a lightweight detection check.
- `Next Action`: Fix the known CSS/footer mojibake and run a repository search for common corruption markers.
- `Resolved When`: Known mojibake is gone and future corruption is easy to detect.
- `Notes`:
- `Links`: `src/styles.css`, `docs/reports/2026-06-17-technical-code-review.md`

### DEBT-8 - Routes, metadata, prerendering, and tests are duplicated

- `Priority`: `P2`
- `Size`: `L`
- `Status`: `Open`
- `Source`: `docs/reports/2026-06-17-technical-code-review.md`
- `Area`: Routing, Metadata, Tests
- `Problem`: Public route data is repeated across route definitions, app registration, metadata JSON, prerendering, and tests.
- `Why It Matters`: Duplication makes it easy to add, rename, or redirect a route without updating metadata, sitemap, tests, or navigation expectations.
- `Preferred Direction`: Create one route manifest or add parity tests that enforce consistency across routes, metadata, prerender output, sitemap, navigation intent, and coverage.
- `Next Action`: Add a focused parity test before a broader manifest refactor.
- `Resolved When`: Public route changes fail clearly when metadata, prerendering, redirects, or tests are out of sync.
- `Notes`:
- `Links`: `src/data/routes.ts`, `src/App.tsx`, `src/data/routeMetadata.json`, `tests/public-site.spec.ts`

### DEBT-9 - Type checking does not cover tests, scripts, config, or API code

- `Priority`: `P2`
- `Size`: `M`
- `Status`: `Open`
- `Source`: `docs/reports/2026-06-17-technical-code-review.md`
- `Area`: TypeScript, Tooling, API
- `Problem`: The main TypeScript config covers `src`, while API, tests, scripts, and most config files are outside normal type checking.
- `Why It Matters`: Important build, deploy, test, and serverless code can drift without type feedback.
- `Preferred Direction`: Add dedicated typecheck coverage for tests/config/scripts and either migrate the API to TypeScript or protect it with focused validation tests.
- `Next Action`: Add a separate typecheck target for Playwright tests and scripts, then assess the API path.
- `Resolved When`: Non-`src` project code has an explicit verification path in local checks or CI.
- `Notes`:
- `Links`: `tsconfig.json`, `tsconfig.node.json`, `tests/`, `scripts/`, `api/enquiry.js`

### DEBT-10 - Enquiry API lacks direct tests

- `Priority`: `P2`
- `Size`: `M`
- `Status`: `Open`
- `Source`: `docs/reports/2026-06-17-technical-code-review.md`
- `Area`: API, Testing, Email
- `Problem`: Existing tests cover public pages and some browser behaviour, but not direct `/api/enquiry` outcomes such as honeypot handling, invalid payloads, missing environment variables, Resend failures, or native submission policy.
- `Why It Matters`: The enquiry endpoint is the most sensitive public integration point and needs fast, isolated tests in addition to browser-flow coverage.
- `Preferred Direction`: Add API-level tests with mocked Resend/fetch behaviour, then pair them with the public form-flow tests tracked in `SITE-6`.
- `Next Action`: Choose the API test harness and cover success, invalid payload, honeypot, missing config, and provider failure paths.
- `Resolved When`: `/api/enquiry` has direct tests for accepted and rejected submissions, and public form-flow browser tests cover the visible visitor states.
- `Notes`:
- `Links`: `api/enquiry.js`, `src/components/EnquiryForm.tsx`, `docs/project/site-backlog.md`

### DEBT-11 - Email delivery configuration is implicit

- `Priority`: `P2`
- `Size`: `S`
- `Status`: `Open`
- `Source`: `docs/reports/2026-06-17-technical-code-review.md`
- `Area`: API, Configuration, Email
- `Problem`: The enquiry API can fall back to a hard-coded recipient while the public display email is configured separately in client data.
- `Why It Matters`: Production delivery settings should be explicit so submissions do not silently route to an unintended address or drift from the public contact details.
- `Preferred Direction`: Require `RESEND_API_KEY`, `ENQUIRY_FROM_EMAIL`, and `ENQUIRY_TO_EMAIL` in production, and document whether public display email and delivery recipient must match.
- `Next Action`: Add production config validation and tests for missing required email settings.
- `Resolved When`: Production cannot use accidental email defaults, missing config fails safely, and public/delivery email relationship is documented.
- `Notes`:
- `Links`: `api/enquiry.js`, `src/data/enquiry.ts`

### DEBT-12 - Design-system card boundary is unclear

- `Priority`: `P2`
- `Size`: `M`
- `Status`: `Open`
- `Source`: `docs/reports/2026-06-17-technical-code-review.md`
- `Area`: Design System, Components, CSS
- `Problem`: Written docs still point agents toward the shared `Card` component and `.card`, while the active production card language mostly lives in `.site-card`.
- `Why It Matters`: Future UI work can reuse or extend the wrong layer, keeping legacy component styling alive by accident.
- `Preferred Direction`: Retire, rewire, or clearly mark the old `Card` component and `.card` boundary, then update written docs and rendered examples.
- `Next Action`: Audit actual `Card` and `.card` usage before choosing whether to preserve, wrap, or deprecate it.
- `Resolved When`: Agents can tell when to use `Card`, `.card`, or `.site-card`, and design-system docs/examples match the real production-safe path.
- `Notes`:
- `Links`: `docs/design-system/components.md`, `docs/design-system/current-scope.md`, `src/components/Card.tsx`, `src/styles.css`

### DEBT-13 - Legacy CSS layers need focused cleanup

- `Priority`: `P2`
- `Size`: `L`
- `Status`: `Open`
- `Source`: `docs/reports/2026-06-17-technical-code-review.md`
- `Area`: Design System, CSS, Maintainability
- `Problem`: Older shared CSS layers such as `.image-panel`, `.card`, `.fit-strip`, `.section`, `.feature-panel`, `.topic-card`, and related overrides still live in production CSS while most pages now use `site-*` and `hero-*`.
- `Why It Matters`: Legacy layers increase cascade surface area and make it harder to know which patterns are active, deprecated, or safe to copy.
- `Preferred Direction`: Use focused cleanup sweeps to audit actual usage, remove dead rules, quarantine legacy aliases, and preserve still-used pieces until replacements exist.
- `Next Action`: Run one legacy CSS usage audit and pick the smallest safe removal or documentation pass.
- `Resolved When`: Known legacy CSS layers are either removed, explicitly retained, or documented as deprecated/reference-only without production ambiguity.
- `Notes`:
- `Links`: `src/styles.css`, `docs/design-system/cleanup-sweeps.md`, `docs/design-system/current-scope.md`

### DEBT-14 - Side-stripe panel rules conflict with active patterns

- `Priority`: `P2`
- `Size`: `M`
- `Status`: `Open`
- `Source`: `docs/reports/2026-06-17-technical-code-review.md`
- `Area`: Design System, CSS, Documentation
- `Problem`: Design-system AI rules prohibit new 4px side stripes, but active shared patterns still use thick side-border treatments.
- `Why It Matters`: Contradictory rules encourage inconsistent future edits: agents may either preserve dated patterns forever or remove active styling without a deliberate decision.
- `Preferred Direction`: Normalize the active patterns away from thick side stripes or document the remaining uses as explicit existing exceptions.
- `Next Action`: Audit `.site-highlight__box`, `.site-copy-panel`, `.site-check-panel`, and `.site-fee-card` to decide which should change and which should remain exceptions.
- `Resolved When`: The rule and implementation agree, and future work has a clear policy for side-border emphasis.
- `Notes`:
- `Links`: `docs/design-system/ai-rules.md`, `src/styles.css`, `docs/design-system/components.md`

### DEBT-15 - Public page CSS is globally bundled and relies on naming discipline

- `Priority`: `P2`
- `Size`: `M`
- `Status`: `Open`
- `Source`: `docs/reports/2026-06-17-technical-code-review.md`
- `Area`: CSS, Routing, Maintainability
- `Problem`: Public pages import global page styles, so page-scoped CSS joins one production cascade and bundle even when classes are disciplined.
- `Why It Matters`: As page CSS grows, accidental cross-page selectors, cascade surprises, and bundle growth become more likely.
- `Preferred Direction`: Keep page-root prefix rules strict for now, and consider route-level lazy loading or CSS Modules if page CSS continues to expand.
- `Next Action`: Document the page-root prefix rule and add this risk to future CSS cleanup considerations.
- `Resolved When`: Page-specific CSS either has an explicit naming/scoping policy that is followed, or a stronger scoping/lazy-loading strategy is adopted.
- `Notes`:
- `Links`: `src/App.tsx`, `src/pages/`, `src/styles-*.css`

### DEBT-16 - Runtime and package-manager expectations are not pinned

- `Priority`: `P3`
- `Size`: `XS`
- `Status`: `Open`
- `Source`: `docs/reports/2026-06-17-technical-code-review.md`
- `Area`: Tooling, Build, Deployment
- `Problem`: The project uses modern Vite/plugin tooling but does not declare expected Node or package-manager versions in `package.json`.
- `Why It Matters`: Local, CI, and Vercel environments can drift and produce avoidable install or build differences.
- `Preferred Direction`: Add `engines.node` and `packageManager` entries that match the intended development and deployment environment.
- `Next Action`: Confirm the intended Node and npm versions, then pin them in `package.json`.
- `Resolved When`: Runtime and package-manager expectations are explicit and available to local tooling and deployment environments.
- `Notes`:
- `Links`: `package.json`

## Archive

No archived project debt yet.
