# Project Debt Tracker

This is the living index for technical, security, routing, API, testing, deployment, design-system, and maintainability pressure that future AI coding sessions should keep visible. It tracks project health work, not new public-site scope.

Use stable IDs when discussing or working on these items, such as `DEBT-1`. Do not renumber existing items. When an item is resolved or superseded, move it to [the project debt archive](archive/project-debt-archive.md), keep its ID intact, and condense it to a short functional summary instead of preserving the active-item field list.

## Tracker Metadata

- `Next ID`: `DEBT-42`

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
- Before moving an item to the external archive, transfer any remaining concrete work into an open linked `DEBT-*` item.
- When moving an item to the external archive, keep only the `DEBT-*` heading and a few sentences that explain what actually changed, why the old item matters historically, and any follow-on context future sessions should know. Do not keep active-item fields such as priority, size, status, next action, resolution path, or links unless a detail is essential to understanding the archived change.
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
- Keep design-system scope and project scope separate. Supported-system changes update the relevant current-only catalogue under `docs/design-system/`; source-backed inherited implementation notes update `docs/design-system-legacy/`; public-site capability changes update `docs/project/current-scope.md`.
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
- `Links`: `api/enquiry.ts`, `vercel.json`, `src/pages/Contact.tsx`

### DEBT-37 - Design system needs source-backed reconciliation

- `Priority`: `P1`
- `Size`: `L`
- `Priority Rationale`: This remains `P1` because production still contains substantial inherited implementation from two rebuilds. The active catalogue is now trustworthy and current-only, but the retained source still needs incremental reconciliation as related work encounters it.
- `Status`: `Open`
- `Detected`: 2026-08-03
- `Source`: Design-system instruction and catalogue review
- `Area`: Design System, Documentation, Maintainability
- `Problem`: Shared-looking tokens, components, selector families, and page patterns remain in production outside the small promoted system. Their exact consumers and future direction are not fully reconciled after the two rebuilds.
- `Why It Matters`: Without a clean active/legacy boundary, maintainers may treat implementation existence or an old description as approval, expand obsolete styling, or remove compatibility code without verified consumers.
- `Preferred Direction`: Keep `docs/design-system/` limited to promoted current contracts. Reconcile inherited implementation incrementally as authorized work touches it; record useful source evidence in `docs/design-system-legacy/`, keep new styling page-local, and promote only in explicit shared-system scope.
- `Resolution Path`: For each selected token, component, selector family, or pattern, verify source and current consumers; preserve it outside the system, record or refine its legacy evidence, promote a clean semantic contract, or remove confirmed-dead source within separately authorized cleanup scope. Promotion removes the corresponding legacy entry and adds the complete contract to one active catalogue.
- `Next Action`: On the next authorized CSS, component, or design-system task, assess only the items that task touches. Add further `/design-system` specimens only when the same task completes a genuine promotion into an active catalogue.
- `Resolved When`: All retained shared-looking production implementation is either deliberately promoted, explicitly page-owned, or sufficiently understood in the legacy register that future work does not need the earlier catalogue to determine reuse or cleanup safety.
- `Related Items`:
  - `DEBT-13`: Legacy CSS cleanup depends on knowing whether a selector is genuinely dormant, retained for compatibility, or still route-reachable.
  - `DEBT-20`: Page-scoped typography classification is one source-backed slice of the wider catalogue reconciliation.
  - `DEBT-21`: Shared typography audit can supply verified foundation status to the reconciled catalogue.
- `Dependencies`: `None`
- `Notes`:
  - 2026-08-03: Removed all five rendered `/design-language/*` routes, their archive components, navigation, and archive-only styles. Git history retains that snapshot; it has no migration path or redirect into the separate source-backed workspace.
  - 2026-08-03: Added the first incremental lifecycle and item-record framework; no initial whole-system audit was required.
  - 2026-08-03: Added the separate `/design-system` development workspace and strict specimen frame without changing the written catalogues' authority.
  - 2026-08-03: Promoted `--cedar` as the first `Shared-supported` token after verifying its production role, consumers, and accessible light-surface pairings; its Foundations specimen is the workspace's first supported item.
  - 2026-08-05: Promoted the three-token portrait-material set after verifying identical semantic use across Home and Working with Joel, then replaced the duplicate page-local values with the shared production tokens. The Home-only stronger interaction tint remains page-local.
  - 2026-08-05: Promoted `--section-warm`, `--section-rule`, and `.site-section-warm` for the verified warm editorial sections across Home, Working with Joel, Inclusion, Contact, Kink and BDSM, ENM and polyamory, and LGBTQIA+. The shared pattern replaces repeated default padding, background, and lower-boundary declarations; responsive padding exceptions remain page-local. The former Introducing Joel sage glow was removed by owner direction, while the Inclusion chapter's sage left-hand overlay remains page-local.
  - 2026-08-14: Broadened the verified `--section-warm` and `--section-rule` material roles and promoted `--section-sage`, `--section-dark`, `--section-dark-soft`, and `--section-dark-rule`. Public content pages and the Documents workspace now consume those six foundations directly instead of retaining page-prefixed aliases; nearby colours with different values or roles remain local or inherited.
  - 2026-08-05: Replaced the mixed active inventory and lifecycle catalogue with current-only Foundations, Components, and Patterns catalogues. Inherited implementation evidence now lives in a separate non-authoritative legacy register and completed removal history stays in Git and the task log.
  - 2026-08-05: Promoted `.site-hero-background` as the shared dark surface for all seven public-route heroes and every development hero or cover. Removed the obsolete light `.hero-bg--default` helper, its unused noise asset, and the duplicated public and development hero background declarations while leaving hero structure, typography, actions, and responsive composition outside the promotion.
  - 2026-08-05: Promoted the no-prop `<ContactInvitation />` contract by explicit owner direction with Home as its first and currently only verified production consumer. The component now owns the canonical copy, Contact destination, accessible section relationship, interaction states, and responsive presentation; the former `home-closing*` implementation was removed. Rollout to the remaining non-Contact public pages is intentionally separate work.
  - 2026-08-11: Added the canonical `<ContactInvitation />` to all three Inclusion child routes as their final sections. Home and those three pages are now verified production consumers; any further non-Contact page rollout remains separate work.
  - 2026-08-05: Promoted `.site-reading` and `.site-reading--lead` after verifying the same prose and lead-paragraph jobs across Home and Working with Joel. Both routes and `<ContactInvitation />` now consume the shared classes; broader inherited type-token and raw-size reconciliation remains open.
  - 2026-08-05: Moved every currently promoted CSS implementation into the current-only `src/design-system/` source entry, split by Foundations, Components, and Patterns. Vite imports that entry once for production bundling; inherited CSS remains in `src/styles.css`, and the development catalogue stylesheet is explicitly named as workspace-only.
  - Keep public pages and their current visual treatment unchanged during reconciliation unless a separate task explicitly authorizes visitor-facing work.
  - Do not remove dormant CSS or promote a pattern merely to make the catalogue tidy. Record those as separately authorized implementation decisions.
- `Links`: `docs/design-system/`, `src/design-system/`, `src/styles.css`, `src/components/`

### DEBT-39 - Visit timelines need persisted causal ordering

- `Priority`: `P1`
- `Size`: `M`
- `Priority Rationale`: This is `P1` because the private dashboard presents interleaved page and enquiry-event journeys as ordered operational data, but request arrival order can differ from browser action order. The current same-document queue substantially reduces the normal client race, so this is not `P0`.
- `Status`: `Open`
- `Detected`: 2026-08-15
- `Source`: Local analytics code review
- `Area`: Analytics, Browser, API, Database, Reporting
- `Problem`: Page views and visit events contain UUIDs and server receipt timestamps but no shared per-visit causal sequence. Same-document browser observations are sent serially, yet overlapping requests across reloads, restored documents, copied sessions, and server-authored enquiry outcomes can still reach separate functions out of causal order; reporting then orders by server time and random UUID.
- `Why It Matters`: A landing page can appear after a later route, an enquiry outcome can be visually separated from its triggering attempt, `started_at` can reflect the first request received rather than the first page viewed, and the displayed journey can be misleading precisely when navigation is rapid or connectivity is uneven.
- `Preferred Direction`: Add a browser-assigned monotonic observation sequence scoped to each visit, define how server-authored outcomes relate to their triggering browser action, validate and store that contract, and order reports causally while retaining server timestamps as receipt times.
- `Resolution Path`: Define sequence behavior for page views, client events, server events, refreshes, BFCache restoration, sessionStorage copies, retries, and conflicting observations; add a migration and payload validation; update idempotent storage and report ordering; then cover deliberately reordered requests against a real Postgres instance.
- `Next Action`: Design the sequence/conflict contract and a database integration test that submits later sequence numbers before earlier ones.
- `Resolved When`: Page views and events render in causal order despite out-of-order function/database arrival, and concurrency is verified against Postgres rather than only scripted row mocks.
- `Related Items`:
  - `DEBT-38` (archived): Production credentials are isolated from non-production; a disposable database would still be needed for real concurrency verification.
- `Dependencies`: `None`
- `Notes`:
  - The current recorder serializes page and client-event fetches within one active document, and the repositories retry conflicts hidden by a concurrent statement snapshot. Those fixes prevent the common rapid-SPA loss but do not create a persisted causal sequence across documents and server-authored outcomes.
- `Links`: `src/components/VisitRecorder.tsx`, `src/utils/visitSession.ts`, `src/utils/visitEvents.ts`, `src/server/visits/repository.ts`, `src/server/visit-events/repository.ts`, `src/server/reporting/reader.ts`, `database/migrations/0001_create_visit_ledger.sql`, `database/migrations/0004_create_visit_event_ledger.sql`, `tests/api/visit-repository.test.mjs`, `tests/api/visit-event-repository.test.mjs`

### DEBT-40 - Analytics reporting reads need bounded pagination

- `Priority`: `P2`
- `Size`: `M`
- `Priority Rationale`: This is `P2` because current traffic is small and the route is authenticated, but daily, monthly, visitor-history, and excluded-visitor reads have no row or page-view bound. A noisy period, long retained visitor history, or write-endpoint abuse can eventually exceed function time, memory, or response limits.
- `Status`: `Open`
- `Detected`: 2026-08-15
- `Source`: Local analytics code review
- `Area`: Analytics, API, Database, Performance, Resilience
- `Problem`: The reporting APIs return every visit for a selected day, every outcome-bearing visit for a selected calendar month, every visit for a selected visitor, or every excluded visitor summary. Visit reports JSON-aggregate every associated page view and event in one response. The dashboard and contracts have no cursor, limit, truncation state, or continuation action.
- `Why It Matters`: A single oversized report can make the protected dashboard unavailable and amplify the existing absence of platform rate limiting on the public visit recorder.
- `Preferred Direction`: Add deterministic cursor pagination and explicit server-side limits for visits and page journeys, with dashboard continuation states that never imply a partial response is complete.
- `Resolution Path`: Choose operational limits from realistic traffic, extend the validated request/response contract with opaque cursors, keep ordering stable, add continuation UI, and test boundary/truncation behavior.
- `Next Action`: Measure current retained row/page counts and define the first daily, monthly, visitor-history, excluded-list, and per-visit page caps before changing the API contracts.
- `Resolved When`: Every analytics read has enforced deterministic bounds, the dashboard can continue through larger reports, and limit behavior is covered at the API and UI layers.
- `Related Items`:
  - `DEBT-38` (archived): The resolved deployment isolation prevents preview data from consuming production report capacity.
  - `DEBT-23`: The enquiry endpoint has a separate platform rate-limit need; the visit and visit-event endpoints need an equivalent operational decision.
- `Dependencies`: `None`
- `Notes`:
  - The protected Basic-auth boundary limits who can request reports but does not bound the amount of data a valid request can serialize.
- `Links`: `api/analytics.ts`, `src/server/reporting/request.ts`, `src/server/reporting/reader.ts`, `src/data/analyticsContract.ts`, `src/pages/Analytics.tsx`

### DEBT-41 - Private analytics presentation still depends on public styling

- `Priority`: `P2`
- `Size`: `M`
- `Priority Rationale`: This is `P2` because the owner has established strict visual independence between the private analytics product and the public site, while the current shared browser entry still lets public presentation affect the dashboard. The present interface remains usable, so this is an architectural boundary to resolve deliberately rather than an urgent outage.
- `Status`: `Open`
- `Detected`: 2026-08-16
- `Source`: Owner direction and source inspection
- `Area`: Analytics, CSS, Routing, Build, Maintainability
- `Problem`: The shared browser entry imports the public global and design-system styles for every route, including private analytics, and `styles-analytics.css` reads public font variables. The analytics stylesheet is imported from the lazy analytics page, but its absence from public-route output has not been made an explicit verified contract. The private interface therefore does not yet satisfy the required two-way visual implementation boundary.
- `Why It Matters`: Public visual changes can alter the private dashboard unintentionally, and unclear ownership may encourage future agents to reuse analytics presentation on the public site or public presentation in analytics.
- `Preferred Direction`: Give private analytics a self-contained presentation and runtime boundary whose routes do not load public visual layers and whose visual CSS, tokens, assets, and components are absent from public pages. Retain only genuinely nonvisual shared contracts, utilities, and tracking infrastructure.
- `Resolution Path`: Audit the current entry, route loading, generated CSS chunks, font ownership, assets, and visual component consumers; choose a dedicated private entry/document or an equivalently strict route-isolation strategy; replace public visual dependencies with analytics-owned foundations; then verify generated asset separation and the protected interface on Vercel Preview.
- `Next Action`: Trace the built CSS and runtime imports for public and private routes, then select the smallest architecture that guarantees two-way visual isolation without changing analytics behaviour or the public site's appearance.
- `Resolved When`: Private analytics renders without loading public presentation, public routes do not load analytics presentation, neither surface consumes the other's visual tokens, assets, or UI components, and focused build inspection plus owner verification on the database-backed Preview deployment confirms the separation.
- `Related Items`:
  - `DEBT-15`: Public page CSS is already globally bundled; resolving the private boundary must not silently turn that broader public-page issue into analytics scope.
- `Dependencies`: `None`
- `Notes`:
  - The repository-wide analytics instructions define the required direction now; this tracker item records the existing implementation gap and does not authorize the refactor by itself.
  - Keep the eventual solution proportionate to a single-owner internal tool. Do not introduce a generalized dashboard design system or multi-user administration architecture to resolve the CSS boundary.
  - Database-backed verification remains a Preview-and-owner workflow because no local analytics database is configured.
- `Links`: `src/main.tsx`, `src/App.tsx`, `src/pages/Analytics.tsx`, `src/styles-analytics.css`

### DEBT-9 - Type checking does not cover tests, scripts, or most config code

- `Priority`: `P2`
- `Size`: `M`
- `Priority Rationale`: This is `P2` because important tests, scripts, and config code still sit outside the main TypeScript safety net. It is not `P1` because runtime behaviour is covered partly by build and browser checks today.
- `Status`: `Open`
- `Detected`: 2026-06-17
- `Source`: `docs/reports/2026-06-17-technical-code-review.md`
- `Area`: TypeScript, Tooling, API
- `Problem`: The main TypeScript config covers `src` and the enquiry API, and a dedicated config now covers the Playwright public-site spec. Direct JavaScript tests, scripts, and most config files remain outside normal type checking.
- `Why It Matters`: Important build, deploy, test, and serverless code can drift without type feedback.
- `Preferred Direction`: Add dedicated typecheck coverage for tests, config, and scripts.
- `Resolution Path`: Add a separate typecheck path for tests and scripts first, then decide how much config code should join it without slowing ordinary builds.
- `Next Action`: Extend explicit type verification to the project scripts and key configuration files without weakening the dedicated Playwright check.
- `Resolved When`: Tests, scripts, and key config files have an explicit type verification path in local checks or CI.
- `Related Items`:
  - `DEBT-1`: A broader typecheck path can strengthen the restored public-site release gate.
  - `DEBT-8`: Route metadata, prerender scripts, and tests are part of the non-`src` code that may need type or parity coverage.
  - `DEBT-10`: Archived API tests provide baseline runtime protection alongside the TypeScript enquiry endpoint.
  - `DEBT-16`: Runtime/package-manager pinning helps keep expanded tooling checks stable across environments.
- `Dependencies`: `None`
- `Notes`:
  - 2026-07-23: Added `tests/tsconfig.json` and `npm run typecheck:tests`; `qa`, `qa:site`, and `qa:analytics` now typecheck `tests/public-site.spec.ts` before browser testing.
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
  - 2026-06-27: Public display email and API fallback/failure messaging were aligned to `joel@vivecounselling.com.au`; this item remains open for production environment validation and documenting the intended `ENQUIRY_TO_EMAIL` / `ENQUIRY_FROM_EMAIL` relationship.
- `Links`: `api/enquiry.ts`, `src/data/enquiry.ts`

### DEBT-13 - Legacy CSS layers need focused cleanup

- `Priority`: `P2`
- `Size`: `L`
- `Priority Rationale`: This is `P2` because old CSS layers increase design-system ambiguity and cascade cost, but the broad item should be split into small cleanup cards before implementation.
- `Status`: `Open`
- `Detected`: 2026-06-17
- `Source`: `docs/reports/2026-06-17-technical-code-review.md`
- `Area`: Design System, CSS, Maintainability
- `Problem`: Older shared CSS layers such as `.stack` and related utilities still live in production CSS while most pages now use `site-*` and `hero-*`.
- `Why It Matters`: Legacy layers increase cascade surface area and make it harder to know which patterns are active, deprecated, or safe to copy.
- `Preferred Direction`: Use focused cleanup sweeps to audit actual usage, remove dead rules, quarantine legacy aliases, and preserve still-used pieces until replacements exist.
- `Resolution Path`: Treat this as a parent card. Use targeted usage scans to create or work through smaller linked debt items, remove only confirmed-dead rules, and preserve or document compatibility paths that are still needed.
- `Next Action`: Run one legacy CSS usage audit and pick the smallest safe removal or documentation pass.
- `Resolved When`: Known legacy CSS layers are either removed, explicitly retained, or documented as deprecated/reference-only without production ambiguity.
- `Related Items`:
  - `DEBT-14`: Archived `DEBT-14` resolved a side-stripe rule conflict in the same design-system CSS surface by removing the blanket prohibition rather than changing the UI.
  - `DEBT-15`: Global CSS bundling increases the impact of lingering legacy selectors.
  - `DEBT-17`: Archived card/component cleanup removed the generic legacy card source from this broader legacy CSS issue.
  - `DEBT-18`: Archived panel/strip selector cleanup removed one smaller slice from the same legacy CSS cluster.
  - `DEBT-19`: Archived issue/topic grid audit removed a dead selector cluster that overlapped with active card patterns.
  - `DEBT-21`: Shared typography cleanup is another focused design-system CSS cleanup lane, though it is about type roles rather than legacy selector removal.
- `Dependencies`: `None`
- `Notes`:
  - This is a broad cleanup parent. When a concrete slice is found, add a smaller linked `DEBT-*` item instead of expanding this card indefinitely.
  - Archived `DEBT-17` removed `src/components/Card.tsx`, generic `.card`, `.card-grid`, `.card-kicker`, and card-specific responsive hooks.
  - Archived `DEBT-18` removed the old panel/strip selector slice found in the same legacy CSS cluster.
  - 2026-06-27: Removed unused `SplitSection` plus the old generic `.section`, `.section--surface`, and `.split` production selectors after the CSS checklist found no source call sites and current section guidance pointed to `site-*` patterns.
  - 2026-07-10: Archived `DEBT-19` after removing the unused `.issues-section*`, `.topic-grid`, and `.topic-card` selector cluster while preserving the active `site-topic-*` system.
  - 2026-07-13: Removed the unused generic `.stack` helper after a focused source audit confirmed no runtime call sites; active stack outcomes remain covered by `.site-content-stack` and `.site-detail-stack`.
  - 2026-07-13: Removed the unused `.site-highlight__box` selector after confirming it had no runtime or dev-page call sites; the active `.site-highlight` band and shared panel patterns were preserved.
  - 2026-08-06: Audited the first ten shell/header class selectors in `src/styles.css`. All are active; `Layout` now composes `Container` for header containment, and duplicate shared-shell header-border and wordmark-colour declarations were removed while preserving composition, responsive behaviour, and public appearance.
  - 2026-08-13: Removed the source-confirmed dormant inherited presentation layer: unmounted card, topic, checklist, fee, detail, CTA, list, and hero selector families; their responsive rules and orphaned tokens; the unused `SectionHeading` component; and the unconsumed tertiary `Button` variant. Static source tracing now leaves only the live secondary button variant and development-document status modifiers without literal TS/TSX class references.
  - 2026-08-14: Removed the mounted but redundant `.site-copy-panel`, `.rich-text`, `.section-heading`, `.section-heading__copy`, and `.site-copy-flow` layer after tracing its only production consumer. Working with Joel now owns the affected layout directly and keeps the promoted `.site-reading` role for prose; broad-tab and development-hero selectors remain for their live consumers.
- `Links`: `src/styles.css`, `docs/design-system-legacy/patterns.md`

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
  - 2026-08-15: The Crisis Support review confirmed a concrete cascade-order failure: the production bundle placed page CSS before equal-specificity shared rules, leaving several colour and hero-spacing declarations inert. The route now uses deliberate higher specificity only for page-level semantic colour variables; redundant declarations were removed, and its hero retains the inherited `.hero-section` spacing. The broader bundling and scoping decision remains open.
- `Links`: `src/App.tsx`, `src/pages/`, `src/styles-*.css`

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
  - 2026-08-05: All seven public content routes now use `.site-reading` for matching substantive prose; Home and Working with Joel also use `.site-reading--lead` for their established opening paragraphs. Contextual dark-surface foregrounds and deliberate serif, heading, label, form, metadata, and compact-support roles remain page-owned. This debt stays open for the broader classification of remaining page-specific type rules.
  - 2026-08-15: Replaced the live Crisis Support `h2` and `h3` size overrides with the shared heading defaults after rendered desktop, intermediate, and mobile review. Page CSS retains layout, measure, compact service-copy sizing, and semantic colour responsibilities.
- `Links`: `src/styles-*.css`, `docs/design-system-legacy/foundations.md`, `docs/design-system-old/type-scale-plan.md`

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
  - 2026-08-05: The first audited shared slice promoted `.site-reading` and `.site-reading--lead` with exact values and verified consumers. The remaining raw shared sizes and inherited root type tokens are still outside the active system.
  - 2026-08-06: Deep-reviewed the ten inherited selectors in the low-specificity body-copy group. Five are dormant delete candidates; the five mounted selectors need focused follow-up around `.site-reading` overlap, stale component ownership, broad dormant rich-child coverage, route-heavy tab-panel overrides, or development-only CSS ownership. No selector was promoted or removed during this review.
  - 2026-08-13: Removed the five dormant low-specificity aliases, the unmounted rich-text descendants, the uncalled `SectionHeading` source, and orphaned type tokens. Mounted `.site-copy-flow`, `.section-heading__copy`, `.rich-text`, `.site-broad-tabs__content`, and development-only `.hero-copy-panel` behaviour remains unchanged for later focused ownership review.
  - 2026-08-14: Removed `.site-copy-flow`, `.section-heading__copy`, and `.rich-text` after confirming the promoted `.site-reading` role and page-owned layout already supplied their live outcomes. `.site-broad-tabs__content` and development-only `.hero-copy-panel` remain mounted for separate ownership review.
- `Links`: `src/styles.css`, `docs/design-system-legacy/foundations.md`, `docs/design-system-old/type-scale-plan.md`

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
- `Links`: `api/enquiry.ts`, `src/pages/Contact.tsx`, `src/utils/timeZones.ts`

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
- `Next Action`: Re-run the canonical unknown-path and clean-URL smoke checks after the prerendering branch is deployed, then decide whether to preserve them as a local command, CI-only command, or post-deploy checklist.
- `Resolved When`: A repeatable live Vercel smoke check verifies the selected deployed URL without relying on manual browser inspection.
- `Related Items`:
  - `DEBT-6`: Archived repo-level canonical and 404 fallback lock-down created this live verification follow-up.
  - `DEBT-8`: Route-manifest or parity work can share route lists and redirect expectations with this smoke check.
  - `SITE-3`: Public SEO/metadata QA can reuse the live canonical, sitemap, robots, and noindex checks.
- `Dependencies`: `None`
- `Notes`:
  - Do not make this smoke script deploy or promote by itself. Deployment should remain an explicit operator action unless a future CI/CD item decides otherwise.
  - Account for Vercel Deployment Protection: protected preview URLs may require MCP access, a bypass token, or a trusted automation source.
  - 2026-07-13 manual baseline: the canonical host returned the generated generic fallback with HTTP 404 for an arbitrary path; `/404.html` returned a permanent clean-URL redirect to `/404`; both activated pages displayed the resulting browser pathname without console or page errors. The deployed bundle predates the prerendering branch's activation marker, so that exact observable contract remains pending deployment.
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
  - `DEBT-26`: Archived social image work means the runtime metadata helper should preserve the configured social image path.
  - `SITE-3`: Public SEO and metadata QA should include live DOM metadata where it matters.
- `Dependencies`: `None`
- `Notes`:
  - `NotFound` currently restores a pre-existing `robots` meta tag to its previous content; when the initial document is the app-powered `404.html`, that previous content can already be `noindex, nofollow`.
- `Links`: `src/hooks/useDocumentMetadata.ts`, `src/pages/NotFound.tsx`, `src/data/routeMetadata.json`, `scripts/prerender-route-metadata.mjs`, `tests/public-site.spec.ts`

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
  - `docs/checklists/accessibility-monitor.md`: Owner-directed accessibility review records route focus and bypass-navigation behaviour.
  - `SITE-7`: Reduced-motion and route-focus behaviour should both respect user accessibility preferences.
- `Dependencies`: `None`
- `Notes`:
  - Current public-site tests assert one main landmark, but they do not check focus movement or bypass navigation.
- `Links`: `src/components/Layout.tsx`, `src/components/ScrollToTop.tsx`, `src/pages/`, `tests/public-site.spec.ts`

### DEBT-30 - Shared navigation disclosure semantics remain incomplete

- `Priority`: `P2`
- `Size`: `M`
- `Priority Rationale`: This is `P2` because the header is the primary way visitors move through the site, and submenu/menu semantics affect keyboard and assistive-technology use. It is not `P1` while links remain present and the mobile menu exposes `aria-expanded`.
- `Status`: `Open`
- `Detected`: 2026-06-18
- `Source`: Fresh site debt review
- `Area`: Accessibility, Navigation, Tests
- `Problem`: Desktop submenus open through hover/focus CSS without explicit disclosure state such as `aria-haspopup`/`aria-expanded`. The mobile menu now has focused Escape, focus-return, and scroll-lock restoration coverage, but its initial focus and tab-order expectations have not received the same audit.
- `Why It Matters`: Navigation may be visually usable while remaining ambiguous to assistive technology, and the remaining desktop and mobile keyboard expectations are not yet explicit enough to prevent regressions.
- `Preferred Direction`: Audit the header against a clear navigation pattern, preserve the existing mobile close/focus baseline, add only the semantics and focus handling that match the chosen pattern, and cover the remaining desktop and mobile keyboard flows with focused tests.
- `Resolution Path`: Decide whether desktop parent items are simple links with hover/focus submenus or true disclosure buttons, then align ARIA, focus lifecycle, Escape behaviour, and tests with that decision.
- `Next Action`: Add a navigation accessibility audit note or failing browser test for keyboard access to the desktop Inclusion submenu and the mobile menu's initial-focus/tab-order flow.
- `Resolved When`: Header navigation has documented semantics and tests for keyboard submenu access, mobile menu open/close, Escape handling, and focus return.
- `Related Items`:
  - `DEBT-29`: Skip-link and route-focus work covers page navigation context; this item covers the header menu interaction itself.
  - `docs/checklists/accessibility-monitor.md`: Owner-directed accessibility review includes primary navigation behaviour.
  - `docs/checklists/responsive-monitor.md`: Owner-directed responsive review includes the mobile menu layout and interaction path.
- `Dependencies`: `None`
- `Notes`:
  - Avoid turning the header into a complicated app-menu widget unless the audit shows that a simpler link-plus-submenu pattern cannot meet the site's needs.
  - `tests/public-site.spec.ts` now verifies that Escape closes the mobile menu, restores focus to the toggle, resets `aria-expanded`, and restores the previous body overflow value.
- `Links`: `src/components/Layout.tsx`, `src/styles.css`, `tests/public-site.spec.ts`

### DEBT-35 - Working with Joel approach copy depends on JavaScript

- `Priority`: `P2`
- `Size`: `S`
- `Priority Rationale`: This is `P2` because Working with Joel is an indexable, trust-building page and two of its three approach explanations are absent from the first response and from JavaScript-disabled visits. Hydrated visitors can use the tabs normally, so this is not a complete page failure.
- `Status`: `Open`
- `Detected`: 2026-07-13
- `Source`: Working with Joel `DEBT-34` test review.
- `Area`: Rendering, Progressive Enhancement, Accessibility, SEO
- `Problem`: `BroadTabPanel` renders only the active item's panel. Static rendering therefore includes all three tab buttons but only the initial Psychodynamic copy; the Attachment and Integrative explanations do not exist in raw HTML and cannot be reached without JavaScript.
- `Why It Matters`: Core practitioner-approach content should remain available to crawlers, assistive workflows, and visitors when the client bundle is delayed or unavailable. A row of inert tabs also implies content that a JavaScript-disabled visitor cannot open.
- `Preferred Direction`: Preserve the current hydrated tab experience while making every approach explanation available in the first response and without JavaScript. Keep one canonical copy source and retain deterministic server/browser markup, valid tab semantics, and the current visual design.
- `Resolution Path`: Prototype progressive enhancement in `BroadTabPanel` or a page-scoped wrapper so all panels are represented in static markup, inactive panels become visually hidden only when the tab behaviour is active, and hydration does not add or remove initial nodes.
- `Next Action`: Design the smallest deterministic all-panel render contract, then add a failing raw/no-JavaScript assertion for Attachment and Integrative copy before changing the component.
- `Resolved When`: All three approach explanations exist in generated HTML and remain reachable without JavaScript, while hydrated pointer and keyboard tab behaviour passes without recoverable errors.
- `Related Items`:
  - `DEBT-34`: The page-level test review exposed this rendering gap and now protects the existing hydrated tab contract.
- `Dependencies`: `None`
- `Notes`:
  - The current hydrated control has connected tab/tabpanel semantics and supports click, Home, End, and wrapping arrow-key selection. The gap is pre-JavaScript content availability, not the normal hydrated interaction.
  - Avoid duplicating approach prose in a separate fallback block; duplicated content would create maintenance and accessibility ambiguity.
- `Links`: `src/components/BroadTabPanel.tsx`, `src/pages/WorkingWithJoel.tsx`, `tests/public-site.spec.ts`

## Resolved Item Archive

Resolved and superseded `DEBT-*` items live in [archive/project-debt-archive.md](archive/project-debt-archive.md). Search that file only when historical implementation or a retired stable ID matters.
