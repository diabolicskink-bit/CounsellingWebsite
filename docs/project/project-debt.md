# Project Debt Tracker

This is the living index for technical, security, routing, API, testing, deployment, design-system, and maintainability pressure that future AI coding sessions should keep visible. It tracks project health work, not new public-site scope.

Use stable IDs when discussing or working on these items, such as `DEBT-1`. Do not renumber existing items. When an item is resolved or superseded, move it to the archive section, keep its ID intact, and condense it to a short functional summary instead of preserving the active-item field list.

## How To Maintain This Tracker

- Add an item when project debt is important enough that future sessions should remember it across tasks.
- Update an item when related work changes its risk, priority, size, preferred direction, next action, status, or completion signal.
- When planning a `DEBT-*` implementation, first assess whether the item is too broad for one safe, behavior-preserving change. If it is, propose a split into smaller `DEBT-*` items instead of forcing one large implementation plan.
- If a split is accepted, preserve stable IDs by creating new `DEBT-*` items and either narrowing the original item or marking it `Superseded` with links to the replacement items.
- Split a broad item into smaller `DEBT-*` items when investigation finds a concrete, separately actionable slice. Link the parent and child items through `Notes` rather than forcing all detail into one broad card. Overlap is acceptable when it makes future work easier to find.
- Use `Related Items` for nearby `DEBT-*` or `SITE-*` items, with one short sentence explaining the relationship. Relationships may be parent/child, sibling slices, overlapping risk areas, or items that can affect each other.
- Use `Dependencies` only when another `DEBT-*` item must be resolved, narrowed, or explicitly decided before this item can be completed safely. Do not copy loose related items into dependencies. Use `None` when no prerequisite is known.
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

Each active item should include enough direction that a future session can choose a small, behavior-preserving slice without rediscovering the whole problem. `Priority Rationale` explains the rating, `Resolution Path` describes the likely sequence, `Resolved When` describes the signal for moving the item to the archive, `Related Items` records nearby tracker context, `Dependencies` records prerequisite `DEBT-*` work, and `Notes` captures living context that does not fit cleanly in canonical fields.

### DEBT-23 - Enquiry endpoint needs Vercel Firewall rate limiting

- `Priority`: `P1`
- `Size`: `M`
- `Priority Rationale`: This is `P1` because endpoint-level checks still allow a determined script to send many valid-looking requests unless the platform throttles repeated POSTs before email delivery. It is not `P0` because no active abuse incident is recorded and a conservative first rule can be added incrementally.
- `Status`: `Open`
- `Detected`: 2026-06-17
- `Source`: `DEBT-3` split after `DEBT-5` resolution
- `Area`: Security, Vercel Firewall, API, Email
- `Problem`: `POST /api/enquiry` has no edge or platform rate limit, so repeated valid-looking submissions can still invoke the serverless function and potentially burn email quota.
- `Why It Matters`: Application-level validation protects payload shape, but it does not reduce repeated request volume before function invocation or provider calls.
- `Preferred Direction`: Add a Vercel Firewall rate-limit rule scoped to `POST /api/enquiry`, keyed by IP, with a conservative fixed window and deny action once exceeded.
- `Resolution Path`: Confirm the intended threshold, add or stage the Vercel Firewall rule through the dashboard/CLI/API, verify the React form and endpoint-level native fallback handle a blocked request safely, and record the live rule details in project docs or the archive when resolved.
- `Next Action`: Choose a first threshold, likely a small number of submissions per IP per 10 minutes, then add the platform rule in log/observe mode first if the current Vercel plan and tooling make that practical.
- `Resolved When`: A deployed Vercel Firewall rate-limit rule protects `POST /api/enquiry`, blocked repeat submissions do not reach email delivery, and the public form still collapses blocked attempts into the generic safe failure state.
- `Related Items`:
  - `DEBT-3`: Archived code-level request-shape checks complement this platform edge limit.
  - `DEBT-5`: Archived generic public error handling defines what visitors should see when blocked submissions fail in the form.
  - `DEBT-10`: Archived direct API coverage can be extended for any local 429/form-failure handling that remains testable outside Vercel.
  - `DEBT-11`: Explicit delivery configuration and platform rate limiting both reduce operational ambiguity around public submissions.
  - `SITE-6`: Browser form-flow tests should keep the visible failure state working when platform blocks occur.
- `Dependencies`: `None`
- `Notes`:
  - Vercel Firewall configuration may live outside the repo. If the rule is added through the dashboard, record the exact rule name, path/method conditions, threshold, key, and action when resolving this item.
  - Avoid CAPTCHA or challenge flows as the first implementation unless rate limiting and request-shape checks prove insufficient. The enquiry form should remain low-friction for legitimate visitors.
  - If Bot Protection is enabled later, test it carefully against both React `fetch` submissions and endpoint-level native form posts.
- `Links`: `api/enquiry.ts`, `vercel.json`, `src/components/EnquiryForm.tsx`

### DEBT-26 - Social sharing image metadata points at a missing asset

- `Priority`: `P1`
- `Size`: `XS`
- `Priority Rationale`: This is `P1` because the site advertises an OG/social image in generated metadata and tests, but the referenced asset is absent from `public/`, which can break social previews and release trust. It is not `P0` because core page rendering and enquiry flow are not blocked.
- `Status`: `Open`
- `Detected`: 2026-06-18
- `Source`: Fresh site debt review
- `Area`: Metadata, Assets, SEO, QA
- `Problem`: `src/data/routeMetadata.json` references `/og-vive-counselling.png`, and public-site tests expect that asset to be served, but `public/og-vive-counselling.png` is not present.
- `Why It Matters`: Social cards and generated Open Graph/Twitter metadata can point crawlers to a broken image, making shared links look unfinished and causing QA to fail when the asset check runs.
- `Preferred Direction`: Restore or regenerate the intended 1200x630 OG image asset, or update metadata/tests to point at an existing intentional social image.
- `Resolution Path`: Confirm the intended social card image, add the asset under `public/` or update the metadata path, then run the public-site asset and first-response metadata checks.
- `Next Action`: Decide whether `/og-vive-counselling.png` should be restored as the canonical social image or replaced with a new generated/social-card asset.
- `Resolved When`: The social image path in route metadata resolves successfully in the built site and generated OG/Twitter metadata points at the intended image.
- `Related Items`:
  - `SITE-3`: SEO and metadata QA should include social image expectations.
  - `SITE-4`: Performance and image delivery review may later check social image dimensions, format, and weight.
- `Dependencies`: `None`
- `Notes`:
  - `Test-Path public\og-vive-counselling.png` returned `False` during the review.
- `Links`: `src/data/routeMetadata.json`, `public/`, `tests/public-site.spec.ts`, `scripts/prerender-route-metadata.mjs`

### DEBT-8 - Route parity coverage needs explicit enforcement

- `Priority`: `P2`
- `Size`: `M`
- `Priority Rationale`: This is `P2` because duplicated route, metadata, redirect, prerender, and test expectations can drift without a clear failing check. It is not `P1` while the current route set is still small and local QA already covers key generated artifacts.
- `Status`: `Open`
- `Detected`: 2026-06-17
- `Source`: `docs/reports/2026-06-17-technical-code-review.md`
- `Area`: Routing, Metadata, Tests
- `Problem`: Public route expectations are repeated across route definitions, app registration, metadata JSON, prerendering, redirects, and tests without one explicit parity check that verifies those surfaces stay aligned.
- `Why It Matters`: It is easy to add, rename, or redirect a route without getting a clear local failure for missing metadata, prerender output, sitemap coverage, redirect expectations, or public-site test coverage.
- `Preferred Direction`: Add focused parity tests that enforce consistency across the current duplicated route surfaces while preserving the existing route implementation.
- `Resolution Path`: Identify the route surfaces that should agree today, add the smallest useful parity test around them, and keep failures specific enough that future route changes tell the maintainer what was missed.
- `Next Action`: Add a focused parity test for the current route, metadata, prerender, redirect, and public-site coverage surfaces.
- `Resolved When`: Public route changes fail clearly when metadata, prerendering, redirects, sitemap output, or tests are out of sync.
- `Related Items`:
  - `DEBT-1`: Route parity assertions can now build on the restored public-site QA gate.
  - `DEBT-6`: Archived production URL and fallback decisions need to match any future route manifest or parity test.
  - `DEBT-25`: Archived route-manifest consolidation was assessed as not worth pursuing for this small, mostly static site.
  - `SITE-3`: The SEO/metadata matrix is the visitor-facing counterpart to this technical route consistency work.
- `Dependencies`: `None`
- `Notes`:
  - Split from the old broad `DEBT-8` on 2026-06-18. The shared-manifest/source-of-truth question was assessed and closed in archived sibling item `DEBT-25`.
  - Brief breakdown assessment: do not split this further yet. It should be attempted as one focused parity-test slice first. If implementation reveals unrelated checks with different owners, split those then rather than pre-creating child items now.
- `Links`: `src/data/routes.ts`, `src/App.tsx`, `src/data/routeMetadata.json`, `tests/public-site.spec.ts`

### DEBT-9 - Type checking does not cover tests, scripts, or most config code

- `Priority`: `P2`
- `Size`: `M`
- `Priority Rationale`: This is `P2` because important tests, scripts, and config code still sit outside the main TypeScript safety net. It is not `P1` because runtime behaviour is covered partly by build and browser checks today.
- `Status`: `Open`
- `Detected`: 2026-06-17
- `Source`: `docs/reports/2026-06-17-technical-code-review.md`
- `Area`: TypeScript, Tooling, API
- `Problem`: The main TypeScript config covers `src` and the enquiry API, while tests, scripts, and most config files remain outside normal type checking.
- `Why It Matters`: Important build, deploy, test, and serverless code can drift without type feedback.
- `Preferred Direction`: Add dedicated typecheck coverage for tests, config, and scripts.
- `Resolution Path`: Add a separate typecheck path for tests and scripts first, then decide how much config code should join it without slowing ordinary builds.
- `Next Action`: Add a separate typecheck target for Playwright tests and project scripts.
- `Resolved When`: Tests, scripts, and key config files have an explicit type verification path in local checks or CI.
- `Related Items`:
  - `DEBT-1`: A broader typecheck path can strengthen the restored public-site release gate.
  - `DEBT-8`: Route metadata, prerender scripts, and tests are part of the non-`src` code that may need type or parity coverage.
  - `DEBT-10`: Archived API tests provide baseline runtime protection alongside the TypeScript enquiry endpoint.
  - `DEBT-16`: Runtime/package-manager pinning helps keep expanded tooling checks stable across environments.
- `Dependencies`: `None`
- `Notes`:
- `Links`: `tsconfig.json`, `tsconfig.node.json`, `tests/`, `scripts/`, `api/enquiry.ts`

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
  - `DEBT-5`: Archived generic public error handling gives missing-configuration failures their visitor-safe response shape.
  - `DEBT-10`: Archived direct API coverage already covers missing config and provider failure baselines that this item can extend.
- `Dependencies`: `None`
- `Notes`:
- `Links`: `api/enquiry.ts`, `src/data/enquiry.ts`

### DEBT-13 - Legacy CSS layers need focused cleanup

- `Priority`: `P2`
- `Size`: `L`
- `Priority Rationale`: This is `P2` because old CSS layers increase design-system ambiguity and cascade cost, but the broad item should be split into small cleanup cards before implementation.
- `Status`: `Open`
- `Detected`: 2026-06-17
- `Source`: `docs/reports/2026-06-17-technical-code-review.md`
- `Area`: Design System, CSS, Maintainability
- `Problem`: Older shared CSS layers such as `.image-panel`, `.fit-strip`, `.section`, `.feature-panel`, `.topic-card`, and related overrides still live in production CSS while most pages now use `site-*` and `hero-*`.
- `Why It Matters`: Legacy layers increase cascade surface area and make it harder to know which patterns are active, deprecated, or safe to copy.
- `Preferred Direction`: Use focused cleanup sweeps to audit actual usage, remove dead rules, quarantine legacy aliases, and preserve still-used pieces until replacements exist.
- `Resolution Path`: Treat this as a parent card. Use targeted usage scans to create or work through smaller linked debt items, remove only confirmed-dead rules, and preserve or document compatibility paths that are still needed.
- `Next Action`: Run one legacy CSS usage audit and pick the smallest safe removal or documentation pass.
- `Resolved When`: Known legacy CSS layers are either removed, explicitly retained, or documented as deprecated/reference-only without production ambiguity.
- `Related Items`:
  - `DEBT-14`: Archived `DEBT-14` resolved a side-stripe rule conflict in the same design-system CSS surface by removing the blanket prohibition rather than changing the UI.
  - `DEBT-15`: Global CSS bundling increases the impact of lingering legacy selectors.
  - `DEBT-17`: Archived card/component cleanup removed the generic legacy card source from this broader legacy CSS issue.
  - `DEBT-18`: This is the smaller panel/strip selector audit split from the same legacy CSS cluster.
  - `DEBT-19`: This is the smaller issue/topic grid audit that overlaps with active card patterns.
  - `DEBT-21`: Shared typography cleanup is another focused design-system CSS cleanup lane, though it is about type roles rather than legacy selector removal.
- `Dependencies`:
  - `DEBT-18`: Complete, retain, or supersede the concrete panel/strip selector slice before closing the broad legacy CSS parent.
  - `DEBT-19`: Complete, retain, or supersede the concrete issue/topic grid slice before closing the broad legacy CSS parent.
- `Notes`:
  - This is a broad cleanup parent. When a concrete slice is found, add a smaller linked `DEBT-*` item instead of expanding this card indefinitely.
  - Archived `DEBT-17` removed `src/components/Card.tsx`, generic `.card`, `.card-grid`, `.card-kicker`, and card-specific responsive hooks.
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
- `Dependencies`: `None`
- `Notes`:
- `Links`: `src/App.tsx`, `src/pages/`, `src/styles-*.css`

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
  - `DEBT-17`: Archived card cleanup removed the adjacent generic card selectors; this item keeps the remaining panel/strip slice separate.
  - `DEBT-19`: Old topic and panel selectors may be removed in adjacent dead-CSS sweeps if scans confirm they are unused.
- `Dependencies`: `None`
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
  - `DEBT-17`: Archived card cleanup removed the generic `.card` path; this item keeps the remaining issue/topic selector audit separate.
  - `DEBT-18`: Old issue/topic and panel/strip selectors appear in the same legacy CSS region and may be audited together.
  - `SITE-8`: If media/hero patterns are promoted later, this cleanup helps keep active design-system naming clearer.
- `Dependencies`: `None`
- `Notes`:
  - Overlaps with `DEBT-13`; archived `DEBT-17` removed only the generic card path, not the remaining issue/topic selectors.
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
- `Dependencies`:
  - `DEBT-21`: Audit shared production typography first so page-specific cleanup has stable shared roles to target.
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
- `Dependencies`: `None`
- `Notes`:
  - The old plan recommended fluid display/hero roles, mostly fixed body/label/card/form roles, and lightly responsive section headings. Use that as classification guidance, not as permission to re-scale the site.
  - Some raw values may remain appropriate for icons, nav details, compact metadata, or deliberately non-body roles.
- `Links`: `src/styles.css`, `docs/design-system/foundations/tokens.md`, `docs/design-system-old/type-scale-plan.md`

### DEBT-22 - Enquiry timezone comparison notes need server-owned handling

- `Priority`: `P2`
- `Size`: `M`
- `Priority Rationale`: This is `P2` because timezone comparison notes are useful booking context but should not block the safer structured enquiry payload. It is not `P1` while explicit state/timezone fields are still captured and sent in enquiry emails.
- `Status`: `Open`
- `Detected`: 2026-06-17
- `Source`: `DEBT-4` implementation planning
- `Area`: API, Forms, Email, Timezones
- `Problem`: The old enquiry flow generated a Perth business-hours comparison note in the browser while composing the whole email body. After structured server-side rendering, timezone/state values are trusted fields but the derived comparison note is not yet canonical server-owned output.
- `Why It Matters`: Booking logistics should use an explicit, testable timezone policy rather than browser-composed prose or automatic timezone guesses.
- `Preferred Direction`: Generate any Perth business-hours comparison note server-side from explicit submitted state/timezone values, using shared or duplicated canonical timezone helpers with tests for daylight-saving and non-Australian/unsure cases.
- `Resolution Path`: Decide the canonical state/timezone value model, move comparison-note generation to the API email renderer, and add direct API tests for representative winter/summer timezone outputs.
- `Next Action`: Define whether timezone payload values should remain abbreviations or move to stable region identifiers before reintroducing the comparison note.
- `Resolved When`: Enquiry emails include any intended timezone comparison note from server-owned logic, with tests covering accepted timezone/state values and seasonal offset changes.
- `Related Items`:
  - `DEBT-4`: Structured enquiry payloads now give this item the server-side field boundary it needs.
  - `DEBT-5`: Archived generic public error handling is the current boundary for any timezone field problems.
  - `DEBT-10`: Archived direct API coverage provides the harness for timezone-note rendering tests once the policy is chosen.
  - `SITE-6`: Form-flow QA may later verify the visible timezone/state choices that feed the email.
- `Dependencies`:
  - `DEBT-4`: Keep structured enquiry payload and server-rendered email content in place before adding derived timezone prose.
- `Notes`:
  - Do not use server IP geolocation as a source of truth. Browser timezone detection may be a convenience default later, but submitted explicit user-confirmed fields should drive email output.
- `Links`: `api/enquiry.ts`, `src/components/EnquiryForm.tsx`, `src/utils/timeZones.ts`

### DEBT-24 - Live Vercel deployment smoke testing is manual

- `Priority`: `P2`
- `Size`: `S`
- `Priority Rationale`: This is `P2` because repository-level build and artifact tests now lock down canonical metadata and fallback files, but live Vercel aliases, deployment protection, clean URLs, redirects, and custom 404 serving can still drift outside local QA.
- `Status`: `Open`
- `Detected`: 2026-06-17
- `Source`: `DEBT-6` implementation
- `Area`: Deployment, Routing, Metadata, QA
- `Problem`: Local QA verifies generated artifacts, but no automated or documented post-deploy smoke test verifies the current Vercel production or preview URL behaviour after deployment.
- `Why It Matters`: Vercel can differ from local preview for alias protection, clean URL redirects, platform 404 serving, and generated artifact delivery.
- `Preferred Direction`: Add a small live smoke script or documented checklist for a deployed Vercel URL that checks canonical metadata, `robots.txt`, `sitemap.xml`, `/about` and `/fees` redirects, clean URL behaviour, and an unknown path serving the app-powered 404 fallback.
- `Resolution Path`: Start with a script that accepts `PLAYWRIGHT_BASE_URL` or `VERCEL_SMOKE_URL`, avoids deployment by itself, and can run against a preview or production URL after deployment.
- `Next Action`: Decide whether the smoke check should be a local command, CI-only command, or Vercel post-deploy checklist.
- `Resolved When`: A repeatable live Vercel smoke check verifies the selected deployed URL without relying on manual browser inspection.
- `Related Items`:
  - `DEBT-6`: Archived repo-level canonical and 404 fallback lock-down created this live verification follow-up.
  - `DEBT-8`: Route-manifest or parity work can share route lists and redirect expectations with this smoke check.
  - `SITE-3`: Public SEO/metadata QA can reuse the live canonical, sitemap, robots, and noindex checks.
- `Dependencies`: `None`
- `Notes`:
  - Do not make this smoke script deploy or promote by itself. Deployment should remain an explicit operator action unless a future CI/CD item decides otherwise.
  - Account for Vercel Deployment Protection: protected preview URLs may require MCP access, a bypass token, or a trusted automation source.
- `Links`: `vercel.json`, `tests/public-site.spec.ts`, `scripts/prerender-route-metadata.mjs`

### DEBT-27 - Runtime head metadata can drift after client-side navigation

- `Priority`: `P2`
- `Size`: `M`
- `Priority Rationale`: This is `P2` because first-response metadata is well covered, but hydrated navigation can leave stale canonical, social, or robots tags in the live DOM. It is not `P1` while crawlers primarily consume first-response HTML and current tests cover generated metadata artifacts.
- `Status`: `Open`
- `Detected`: 2026-06-18
- `Source`: Fresh site debt review
- `Area`: Metadata, Routing, SEO, Accessibility
- `Problem`: Public pages call `useDocumentMetadata`, which updates only `document.title` and the meta description. The richer generated head state for canonical, OG, Twitter, and robots metadata is owned separately by `scripts/prerender-route-metadata.mjs`, while `NotFound` manages `robots` through its own hook.
- `Why It Matters`: A visitor or bot that navigates within the hydrated app can see stale canonical/social metadata from the first loaded route, and a `noindex` robots tag can leak from a not-found route if head ownership is not centralized.
- `Preferred Direction`: Replace the narrow title/description hook with a route-aware head metadata helper that owns title, description, canonical, OG/Twitter tags, and route-specific robots state in one place.
- `Resolution Path`: Define the runtime head contract from `routeMetadata.json`, update public routes and `NotFound` to use the shared helper, and add a browser test that navigates between public and not-found routes while checking the live head.
- `Next Action`: Add a small failing test that starts on a not-found route, navigates to a public route, and verifies `robots` is removed and route metadata matches the destination.
- `Resolved When`: Hydrated route changes keep title, description, canonical, OG/Twitter tags, and robots policy aligned with the current route.
- `Related Items`:
  - `DEBT-8`: Route parity coverage can help keep runtime metadata expectations aligned with route metadata data.
  - `DEBT-26`: The runtime metadata helper should preserve the intended social image path once the missing asset is fixed.
  - `SITE-3`: Public SEO and metadata QA should include live DOM metadata where it matters.
- `Dependencies`: `None`
- `Notes`:
  - `NotFound` currently restores a pre-existing `robots` meta tag to its previous content; when the initial document is the app-powered `404.html`, that previous content can already be `noindex, nofollow`.
- `Links`: `src/hooks/useDocumentMetadata.ts`, `src/pages/NotFound.tsx`, `src/data/routeMetadata.json`, `scripts/prerender-route-metadata.mjs`, `tests/public-site.spec.ts`

### DEBT-28 - Google Analytics does not explicitly track SPA route changes

- `Priority`: `P2`
- `Size`: `S`
- `Priority Rationale`: This is `P2` because analytics are part of operational trust and content decisions, but the issue does not affect core visitor rendering or enquiry delivery.
- `Status`: `Open`
- `Detected`: 2026-06-18
- `Source`: Fresh site debt review
- `Area`: Analytics, Routing, Operations
- `Problem`: `SiteAnalytics` injects the Google Analytics script and initial `gtag('config', ...)`, but it does not listen to React Router location changes or explicitly send page views for client-side navigation.
- `Why It Matters`: On a single-page app, internal navigation can be undercounted or attributed unclearly unless GA route-change behaviour is intentional and tested.
- `Preferred Direction`: Decide the desired GA behaviour for SPA navigation, then add a small route-change pageview effect or document why the current provider behaviour is sufficient.
- `Resolution Path`: Confirm whether GA should receive a page view on each public route change, implement a location-aware tracking helper if needed, and keep analytics disabled in default QA builds.
- `Next Action`: Add an analytics route-change design note or test harness that can verify pageview calls without loading third-party scripts in QA.
- `Resolved When`: Google Analytics route-change behaviour is explicit, tested or documented, and does not reintroduce third-party noise into default QA.
- `Related Items`:
  - `SITE-5`: Analytics environment policy should stay aligned with any route-change tracking behaviour.
  - `DEBT-27`: Runtime metadata and analytics both depend on correct current-route awareness after client-side navigation.
- `Dependencies`: `None`
- `Notes`:
  - Vercel Analytics may already handle SPA route changes separately; this item is specifically about the manually injected Google Analytics path.
- `Links`: `src/components/SiteAnalytics.tsx`, `src/App.tsx`, `tests/public-site.spec.ts`, `scripts/validate-analytics-env.mjs`

### DEBT-29 - Route changes lack focus restoration and a skip-link baseline

- `Priority`: `P2`
- `Size`: `S`
- `Priority Rationale`: This is `P2` because keyboard and screen-reader users can lose context on SPA route changes, but the fix should be narrow and behaviour-preserving.
- `Status`: `Open`
- `Detected`: 2026-06-18
- `Source`: Fresh site debt review
- `Area`: Accessibility, Routing, Navigation
- `Problem`: `ScrollToTop` scrolls to the top on pathname changes, but the shared shell does not move focus to the new page's main content or provide a skip link to bypass the repeated header navigation.
- `Why It Matters`: Visual scroll restoration is not enough for keyboard and assistive-technology users; after navigation, focus can remain on the old link/header area while the page content changes elsewhere.
- `Preferred Direction`: Add a production skip link and a small route-focus policy that moves focus to the main landmark or first heading after navigation without creating visible focus jumps for pointer users.
- `Resolution Path`: Add a skip link in `Layout`, give the main content a stable focus target, update route-change handling, and cover keyboard navigation in a focused browser test.
- `Next Action`: Prototype the smallest route-focus helper that cooperates with existing page-owned `<main>` elements.
- `Resolved When`: Keyboard users can bypass navigation and client-side route changes place focus on an appropriate page content target.
- `Related Items`:
  - `SITE-1`: The accessibility audit matrix should record route focus and bypass-navigation behaviour.
  - `SITE-7`: Reduced-motion and route-focus behaviour should both respect user accessibility preferences.
- `Dependencies`: `None`
- `Notes`:
  - Current public-site tests assert one main landmark, but they do not check focus movement or bypass navigation.
- `Links`: `src/components/Layout.tsx`, `src/components/ScrollToTop.tsx`, `src/pages/`, `tests/public-site.spec.ts`

### DEBT-30 - Shared navigation disclosure semantics are CSS-driven and untested

- `Priority`: `P2`
- `Size`: `M`
- `Priority Rationale`: This is `P2` because the header is the primary way visitors move through the site, and submenu/menu semantics affect keyboard and assistive-technology use. It is not `P1` while links remain present and the mobile menu exposes `aria-expanded`.
- `Status`: `Open`
- `Detected`: 2026-06-18
- `Source`: Fresh site debt review
- `Area`: Accessibility, Navigation, Tests
- `Problem`: Desktop submenus open through hover/focus CSS without explicit disclosure state such as `aria-haspopup`/`aria-expanded`, while the mobile menu opens and locks body scroll without focused tests for focus movement, escape behaviour, tab order, or return focus.
- `Why It Matters`: Navigation may be visually usable while remaining ambiguous to assistive technology, and regressions in keyboard access would be easy to miss because current tests do not exercise header navigation interactions.
- `Preferred Direction`: Audit the header against a clear navigation pattern, add only the semantics/focus handling that match that pattern, and cover the expected desktop and mobile keyboard flows with focused tests.
- `Resolution Path`: Decide whether desktop parent items are simple links with hover/focus submenus or true disclosure buttons, then align ARIA, focus lifecycle, Escape behaviour, and tests with that decision.
- `Next Action`: Add a navigation accessibility audit note or failing browser test for keyboard access to the Inclusion submenu and mobile menu open/close flow.
- `Resolved When`: Header navigation has documented semantics and tests for keyboard submenu access, mobile menu open/close, Escape handling, and focus return.
- `Related Items`:
  - `DEBT-29`: Skip-link and route-focus work covers page navigation context; this item covers the header menu interaction itself.
  - `SITE-1`: The accessibility audit matrix should include primary navigation behaviour.
  - `SITE-2`: Responsive QA should include the mobile menu layout and interaction path.
- `Dependencies`: `None`
- `Notes`:
  - Avoid turning the header into a complicated app-menu widget unless the audit shows that a simpler link-plus-submenu pattern cannot meet the site's needs.
- `Links`: `src/components/Layout.tsx`, `src/styles.css`, `tests/public-site.spec.ts`

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
  - `DEBT-1`: Stable runtime/tooling expectations help keep the restored QA gate reproducible across machines.
  - `DEBT-6`: Archived production build validation and fallback handling benefit from consistent runtime behaviour.
  - `DEBT-9`: Expanded typecheck and script coverage is easier to trust when Node and package-manager versions are pinned.
- `Dependencies`: `None`
- `Notes`:
- `Links`: `package.json`

### DEBT-31 - Favicon, touch, and app icon assets need quality and usage audit

- `Priority`: `P3`
- `Size`: `S`
- `Priority Rationale`: This is `P3` because low-quality favicon, touch, and app icon artwork can make the site feel less polished in browser tabs, bookmarks, home-screen shortcuts, or share surfaces, but it does not affect core page content, accessibility, or enquiry delivery.
- `Status`: `Open`
- `Detected`: 2026-06-18
- `Source`: User review note
- `Area`: Assets, Metadata, Brand, QA
- `Problem`: The icon assets (`favicon.svg`, `favicon-32x32.png`, `apple-touch-icon.png`, `icon-192.png`, and `icon-512.png`) appear visually weak, described as an off-centre "V" in a green shape, and their actual browser/device usage has not been audited.
- `Why It Matters`: These assets are small, but they appear in high-trust surfaces such as browser tabs, saved bookmarks, home-screen icons, and app install prompts. Poor or misaligned icon artwork can make the public site feel unfinished.
- `Preferred Direction`: Audit which icon files are referenced and actually used, then replace the favicon/touch/app icon set with centered, crisp, brand-consistent assets at the required sizes.
- `Resolution Path`: Confirm references in generated head metadata and `site.webmanifest`, inspect the rendered SVG and PNG icons at their native display sizes, regenerate the active icon set from an approved source, and update tests to verify references and dimensions rather than only existence.
- `Next Action`: Review `favicon.svg`, `favicon-32x32.png`, `apple-touch-icon.png`, `icon-192.png`, and `icon-512.png` visually at native display sizes and confirm which are consumed by the generated head and web manifest.
- `Resolved When`: The active favicon/touch/app icon set is visually aligned, centered, brand-consistent, referenced only where needed, and covered by asset checks that match the chosen icon policy.
- `Related Items`:
  - `DEBT-26`: Social sharing image and icon assets both affect off-page trust surfaces.
  - `SITE-3`: Public SEO/metadata QA can include icon and manifest asset expectations.
  - `SITE-4`: Performance/image review may include icon dimensions and file weights.
- `Dependencies`: `None`
- `Notes`:
  - Source search found icon references in `scripts/prerender-route-metadata.mjs`, `public/site.webmanifest`, and `tests/public-site.spec.ts`.
  - Current tests assert the icon files are served and listed, but do not verify visual quality, centering, dimensions, or whether all SVG/PNG variants are still necessary.
- `Links`: `public/apple-touch-icon.png`, `public/favicon-32x32.png`, `public/icon-192.png`, `public/icon-512.png`, `public/favicon.svg`, `public/site.webmanifest`, `scripts/prerender-route-metadata.mjs`, `tests/public-site.spec.ts`

## Archive

### DEBT-1 - QA suite is not a trustworthy release gate

Resolved on 2026-06-17 by updating stale public-site Playwright expectations for current page headings and not-found route behaviour, and by improving page diagnostics for console errors, failed responses, and failed requests.

The full `npm run qa:site` gate now passes locally. No new follow-up debt was created from this pass because the full public-site suite passed after the stale expectations and diagnostics gap were fixed.

### DEBT-2 - Public routes expose nested main landmarks

Resolved on 2026-06-17 by making page components the sole owners of the primary `<main>` landmark. `Layout` now renders the routed page directly between the shared header and footer instead of wrapping the outlet in an additional main.

The fix preserved routes, copy, visual design, API behaviour, and page-level `.site-page` wrappers. Public-site Playwright coverage now asserts one visible main landmark across canonical public routes and not-found boundary routes.

### DEBT-3 - Enquiry endpoint request-shape hardening

Resolved on 2026-06-17 by adding a pre-parse enquiry request guard. Valid JSON fetch submissions and endpoint-level URL-encoded native form posts still work, while missing or unsupported content types, multipart posts, oversized declared bodies, and explicit cross-site fetch/origin/referer signals are blocked before validation or email delivery.

Blocked requests reuse the archived `DEBT-5` generic public error contract and log only safe request metadata server-side. Platform-level rate limiting remains tracked separately under `DEBT-23`.

### DEBT-4 - Enquiry validation and email rendering depend on client-built strings

Resolved on 2026-06-17 by changing enquiry submissions to structured JSON fields and making the API validate those fields before building the email subject, reply-to, plain text, and HTML output server-side.

The old composed `{ subject, body, replyTo }` payload is now rejected by validation, and direct Node API tests cover successful submissions, invalid payloads, honeypot handling, missing delivery config, and provider failure. The derived Perth business-hours comparison note was intentionally split into `DEBT-22` so timezone policy can be cleaned up separately.

### DEBT-5 - Enquiry error handling and no-JavaScript fallback are inconsistent

Resolved on 2026-06-17 by removing temporary public diagnostic detail from enquiry API and form failures. Public JSON errors are now generic, provider/configuration/runtime details are logged server-side, and the React form no longer renders technical failure detail to visitors.

The endpoint now accepts URL-encoded native form posts and returns safe minimal HTML success or failure pages for those submissions. Full JavaScript-disabled public-page rendering remains out of scope because the current Vite app still renders the contact form through client-side React.

### DEBT-6 - Production URL and Vercel routing behaviour are not locked down

Resolved on 2026-06-17 at the repository level by locking the default canonical origin to `https://counselling-website-seven.vercel.app`, preserving `SITE_URL` as the future custom-domain override, and preventing production builds from falling back to unique Vercel deployment URLs or localhost origins.

The build now generates an app-powered `404.html` fallback with noindex metadata while preserving route-specific first-response HTML for known public routes. Local script and public-site tests cover the canonical origin policy, generated metadata artifacts, sitemap, robots, and 404 fallback. Live Vercel post-deploy smoke testing was intentionally split into `DEBT-24`.

### DEBT-7 - Encoding mojibake exists in source and rendered output

Resolved on 2026-06-17 by repairing the known mojibake in `src/styles.css`, including the rendered navigation submenu glyph and corrupted hero-system comment separators.

Future corruption is guarded by `npm run check:encoding`, which scans project text files for common mojibake markers and now runs as part of both `npm run qa` and `npm run qa:site`. Generated and third-party output directories are intentionally excluded from the source scan.

### DEBT-10 - Enquiry API lacks direct tests

Resolved on 2026-06-17 by adding direct Node API tests for `/api/enquiry` with mocked Resend/fetch behaviour. Coverage now includes accepted general, appointment, and consult submissions; invalid structured payloads; legacy composed payload rejection; honeypot short-circuiting; missing delivery configuration; and provider failure.

The remaining visitor-visible form-flow browser coverage stays tracked in `SITE-6`, and future hardening/configuration work can extend the API tests added here instead of reopening this baseline coverage item.

### DEBT-14 - Side-stripe panel rules conflict with active patterns

Resolved on 2026-06-17 after a visual audit confirmed the active striped panels are intentional and not a UI problem. The issue was the blanket AI/design-system rule against 4px side stripes, which conflicted with good existing shared panel/card patterns.

The resolution removed the side-stripe prohibition from active design-system guidance and the design export, while leaving public UI, CSS, routes, and copy unchanged. Existing `.site-copy-panel`, `.site-check-panel`, and `.site-fee-card` side-stripe treatments remain valid shared patterns; the unused `.site-highlight__box` question belongs to broader legacy CSS cleanup if it matters later.

Visual audit report: `docs/reports/2026-06-17-debt-14-side-stripe-visual-audit.md`.

### DEBT-12 - Design-system card boundary is unclear

Resolved on 2026-06-17 by clarifying the AI-facing card boundary in the repository guidance and design-system docs. Active card work now points to `.site-card`, `.site-card--link`, `.site-card__*`, `.site-topic-card`, `.site-fee-card`, and deliberate page-scoped compositions; `Card.tsx`, `.card`, and `.card-grid` are no longer described as active card API.

The remaining source cleanup was split into `DEBT-17` and later resolved there by removing the unused legacy card component and generic card CSS. Broader legacy CSS cleanup context remains linked from `DEBT-13`, and future discoveries can split into additional smaller `DEBT-*` items rather than reopening this archived boundary item.

### DEBT-17 - Legacy Card component and card CSS need cleanup

Resolved on 2026-06-17 by confirming that the legacy `Card` component and generic card selectors had no active source usage, then removing `src/components/Card.tsx`, `.card`, `.card-grid`, `.card-kicker`, `.card-title--small`, the `.issues-section .card*` overrides, and card-specific responsive hooks from production CSS.

The active card API remains `.site-card`, `.site-card--link`, `.site-card__*`, `.site-card-grid`, `.site-topic-card`, `.site-fee-card`, and deliberate page-scoped compositions. Broader legacy CSS cleanup remains tracked under `DEBT-13`, with panel/strip selectors in `DEBT-18` and issue/topic selectors in `DEBT-19`.

### DEBT-25 - Shared public route manifest may be needed

Closed on 2026-06-18 after assessment found that a shared route manifest would likely add more architecture than value for this small, mostly static counselling practice site. The public route set is not expected to grow much, and route registration, navigation, redirects, metadata, sitemap, prerendering, and tests overlap without all wanting the same data shape.

Route drift prevention remains tracked under `DEBT-8`, which should add focused parity coverage. If future route churn makes the current duplication materially painful, a new debt item can revisit manifest consolidation with fresh evidence.
