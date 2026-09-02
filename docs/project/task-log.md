# Task Log

Curated milestone history for durable project state. This is not a full changelog; Git remains the detailed implementation history.

## How To Use This Log

- Read this for important project milestones and durable context.
- Use `current-scope.md` for exact current scope.
- Use `project-debt.md` for technical pressure.
- Use `site-backlog.md` for concrete deferred visitor-facing change work.
- Use `docs/design-system/` for the complete current reusable API and `docs/design-system-legacy/` only when inherited implementation evidence matters.
- Use [archive/task-log-2026-06.md](archive/task-log-2026-06.md) only when June 2026 milestone history matters.
- Treat dated workflow and skill entries as history, not current AI instructions; use the active skill and authority files they refer to.

## Admission Rule

- Add entries for public behaviour changes, documentation governance changes, major design-system state changes, deployment/testing posture changes, API/form milestones, or tracker creation/resolution.
- Skip routine bug fixes, tiny cleanup, pure investigations, and review-only notes unless they change durable project state.
- Keep entries to 2-4 bullets focused on what is now true.

## 2026-09-02 - First-Party Analytics Collection Expanded

- Added controlled `instagram_link_clicked`, `linkedin_link_clicked`, and `email_link_clicked` events for configured public social profiles and React-rendered email links, retaining each event's active visit and page-view association independently of GA and Clarity.
- Added request-derived coarse location to new visits: Australian traffic retains a validated state or territory code, overseas traffic retains only the country code, and the ledger stores no city, postcode, coordinates or raw IP address.
- Added migrations `0008_add_contact_link_events.sql` and `0009_add_visit_location.sql` plus focused API, migration and browser contracts. Preview and Production are independently migrated through `0009`, and the combined `staging` deployment reached Vercel `READY` before release.

## 2026-09-02 - Analytics Reporting Expanded

- Added a location-led daily diagnostic with a compact device mix, plus outbound-action and location signals on individual visit rows.
- Added route-attributed outbound counts to the Pages report and carried compact location and outbound signals through daily rows, enquiry context, visitor history, request details and chronological event timelines without treating social clicks as enquiries.
- Extended protected report contracts, reporting SQL, focused API coverage and private-dashboard browser coverage for the new data while preserving the owner-only analytics boundary.

## 2026-09-01 - Private Analytics Visual Boundary Clarified

- Closed `DEBT-41` without a source change after the owner clarified that the private dashboard may have its own CSS and visual language but does not require isolated browser, bundle, or stylesheet architecture.
- Updated repository guidance so analytics remains visually independent in direction without treating shared global styles or generic foundations as debt by themselves.

## 2026-08-31 - Public Reduced-Motion Baseline Completed

- Audited every public stylesheet, confirmed the page-owned and shared motion overrides, and added the remaining generic button lift to the reduced-motion fallback.
- Extended focused browser coverage for shared button and navigation motion, updated the accessibility monitor to `Pass`, and resolved and archived `SITE-7`.

## 2026-08-31 - Enquiry Contract And Reliability Pass

- Consolidated Contact-path values and field limits into the shared enquiry contract, removed the retired state-and-territory API, and made server validation reject overlong content instead of silently truncating it.
- Added visible required cues for the path choice and active fields, truthful native-form conditional labels, matching browser limits, and duplicate-submission protection.
- Moved best-effort enquiry analytics persistence off the delivery-critical path and repaired API, public-flow, native-form, analytics, origin, and email-safety coverage around the current form.
- Resolved and archived `SITE-21` after updating the Contact accessibility monitor.

## 2026-08-31 - Enquiry Form Opens With Shared Details

- Reordered the Contact form so name, email, and message are available immediately instead of being hidden behind an enquiry-path choice.
- Moved the appointment, consult, and general-enquiry decision after the shared message; appointment and consult requests now share the same availability and timezone questions, with a mobile number also collected for consults.
- Preserved the complete server-rendered form for visitors without JavaScript and kept the existing structured enquiry paths and submission handling.

## 2026-08-31 - Crisis Support Search And Source Signals Strengthened

- Aligned the page's prominent H1 and search description with urgent Australian mental health and crisis-support intent while keeping immediate-danger guidance first.
- Added a compact decision guide that distinguishes national crisis-line support from state or territory public mental health assessment without turning the page into generic long-form SEO copy.
- Made Vive Counselling's publishing role, official-source checking, review date, authorship, and modification date explicit in visible content and structured data.

## 2026-08-31 - Private Analytics Split Into Report Pages

- Replaced the single analytics page module with explicit lazy-loaded Daily, Pages, Enquiries, Keywords, and Excluded report pages behind one small owner-only shell.
- Centralized report loading, date controls, formatting, visit details, and visitor history while keeping each report's URL-backed state and workflow within its route.
- Added exhaustive runtime validation for every protected analytics report response shape and focused contract and keyword-sort coverage.

## 2026-08-28 - Analytics Test Suite Simplified

- Separated private analytics browser checks from the public-site Playwright suite and made the analytics QA runner select its blocked-host and enabled-host scenarios explicitly.
- Broadened the fast analytics gate to cover all recording endpoints, enquiry lifecycle events, retention, reporting, exclusions, hostname policy, migrations, and saved SQL contracts.
- Reorganized dashboard request parsing, endpoint transport, migration-runner, and ledger-schema tests around their distinct responsibilities while keeping detailed dashboard presentation with Preview owner review.

## 2026-08-25 - Visit Client Environment Capture Added

- Added visit-level capture for a bounded request user-agent, a server-derived desktop/mobile/tablet/unknown device type, and the browser's nullable `navigator.webdriver` value.
- Kept the three diagnostics immutable after the first visit insert and exposed them through the protected analytics reader and repository-owned Neon reporting queries.
- Added a daily traffic-signature summary, compact visit cues, and expanded per-visit request diagnostics in daily and retained-history views.
- Added focused API, SQL, and recorder browser coverage plus migration `0007_add_visit_client_environment.sql`; Preview and Production have each been migrated independently through the new schema.

## 2026-08-24 - Serverless Function Packaging Hardened

- Replaced seven hand-maintained Vercel function file inventories with one `api/**/*.ts` rule that packages the complete `src` tree for every serverless function.
- Removed the dependency-by-dependency maintenance path that repeatedly allowed valid runtime imports to be omitted from deployed functions.
- Kept one focused configuration contract for the broad packaging guarantee and moved verification of actual function initialization to a deployed Vercel preview.

## 2026-08-19 - Working With Joel Tabs Progressively Enhanced

- Changed the approach component so Psychodynamic, Attachment, and Integrative copy all exist in the generated HTML and remain readable as headed sections without JavaScript.
- Preserved the hydrated visual design while giving every tab its own retained, labelled panel and keeping pointer, Home, End, and wrapping arrow-key selection.
- Added focused JavaScript-disabled and hydrated interaction coverage, and archived resolved `DEBT-35`.

## 2026-08-19 - Scoped Code Quality Pass Added

- Added the repository-local `code-quality-pass` skill for holistic review and direct improvement of a user-supplied implementation surface or code change set.
- Defined named pages, features, files, and diffs as semantic boundaries that may include the relevant code, HTML, CSS, scripts, tests, configuration, callers, and dependencies without becoming repository-wide cleanup sweeps.
- Made simplicity, current evidence, and the site's small single-developer operating model the quality standard, resisting speculative abstractions, configurability, coordination machinery, dependencies, coverage, and stylistic churn.
- Required high-impact boundaries to have clear authoritative enforcement and focused behavioural verification, with additional defensive layers only for distinct realistic failure modes rather than hypothetical future maintainer edits.

## 2026-08-19 - Cleanup Sweep Skill Narrowed

- Renamed the repository-local `improve-codebase` skill to `cleanup-sweep` so its name and invocation token communicate the intended workflow.
- Limited its use to explicit cleanup-sweep requests; other review, cleanup, refactoring, CSS, and maintainability work follows the task's stated scope without invoking source-first problem selection.
- Preserved the sweep's existing one-problem selection, complete-resolution, verification, and project-debt outcome rules.

## 2026-08-17 - Keyword Journey Analytics Added

- Added the protected `/analytics/keywords` report with a 30-day default and a bounded date range, matched-keyword coverage, paid-visit totals, page depth, recorded active time, successful-enquiry visits, and a responsive ranked ledger.
- Added one aggregate read path over the existing visit, page-view, event, exclusion, and BotID data. Keyword rows retain match type, returning-visit context, and latest activity without exposing GCLIDs.
- Included the new route in the private no-index build shell and analytics navigation, with focused API, reader, route, and browser coverage.

## 2026-08-16 - Visible Page Time Added

- Added cumulative active seconds to each first-party page view, counting only while the page is visible and updating at 30-second intervals plus page-hide and route-exit flushes.
- Kept engagement writes bounded, identity-checked, and idempotent so later cumulative updates replace earlier measurements without creating heartbeat rows.
- Added active time to daily visit rows, page timelines, visitor history, and the compact route breakdown with total and average active-time reporting.
- Applied the sixth migration independently to Preview and Production as part of the staged release.

## 2026-08-16 - Fees Visit Attribution Added

- Kept Fees-labelled navigation and footer links on the Contact route while recording those arrivals under the virtual `/fees` page path in first-party analytics and GA.
- Left ordinary Contact, enquiry, and invitation links recorded as `/contact`, with the accepted virtual path constrained to the existing Fees alias.

## 2026-08-16 - Page-View Range Report Added

- Added a complete protected route breakdown linked from the daily page-view widget, defaulting to the dashboard's selected day.
- Added an inclusive date-range selector of up to 366 days with total views, visits, average pages per visit, and one compact ranked table for route share and per-route visit counts.
- Kept range reads to one aggregate database query with existing visitor exclusions and server-side bot filtering, while canonicalizing route casing before storage.
- Made the private analytics boundary case-insensitive in the browser and visit API so the complete subtree cannot create new first-party records under casing variants, and removed the existing private rows from Preview data.

## 2026-08-16 - Daily Analytics Signals Refined

- Reworked the private daily dashboard around visit-source composition, total and average page views, a four-route view ranking, and a compact returning-visits measure.
- Moved enquiry outcomes and contact-choice cues onto their visit rows, with successful retries taking precedence while expanded timelines retain every event.
- Exposed existing paid-ad codes on collapsed visit rows and removed stored GCLIDs from daily and visitor-history display without changing collection or reporting contracts.
- Reduced private-dashboard browser coverage to its core report and drill-down path while leaving data contracts, exclusions, and reporting queries with the existing API and repository tests.

## 2026-08-16 - Analytics Journeys And Exclusions Released

- Released the calendar-month enquiry ledger, visit-linked enquiry journeys, and reversible visitor exclusions from the verified `staging` candidate to Production.
- Applied migrations `0004_create_visit_event_ledger.sql` and `0005_create_analytics_visitor_exclusions.sql` to the separate Production database before deployment; Preview and Production are now independently current through migration `0005`.
- Confirmed the live protected analytics page and API accept the configured Production login and return successful responses.

## 2026-08-16 - Reversible Visitor Exclusions Added

- Added a persistent visitor-level exclusion list that omits all retained and future visits for selected IDs from daily and monthly reports without deleting their data.
- Added the protected Excluded visitors page and a visitor-history toggle for excluding or restoring IDs, with server-side filtering and environment-specific state in the existing Preview and Production databases.
- Renamed dashboard-facing browser labels to visitors, removed the browser-versus-person note, and extended retention cleanup to remove exclusion markers after their final retained visit expires.

## 2026-08-16 - Monthly Enquiry Ledger Added

- Added the protected `/analytics/enquiries` view with Australia/Perth calendar-month navigation, sent and failed totals, send rate, and a newest-first row for every recorded enquiry outcome.
- Connected each monthly outcome to the existing anonymous-browser journey, preserving its selected visit and event so the complete context remains available without creating a separate enquiry record.
- Kept explicit bots excluded by default and covered monthly request validation, report reads, route behaviour, navigation, summary figures, outcome rows, and journey drill-down.

## 2026-08-16 - Enquiry Journeys Added To First-Party Analytics

- Added a generic visit-event ledger and controlled write endpoint, with client-authored contact selection/form-start events and server-authored submit-attempt, sent, and failed outcomes tied to the existing visit and optional page view.
- Kept event recording best-effort around the existing enquiry delivery path: a sent event is recorded only after Resend accepts delivery, while analytics storage failures never change the visitor-facing enquiry outcome.
- Extended protected reports with daily enquiry activity and selectable, multi-visit browser histories that interleave page views and enquiry events; Preview carries the fourth migration while Production remains unchanged until release.

## 2026-08-16 - Separate Preview Analytics Restored

- Reused the existing fully migrated Preview Neon database and broadened Preview report authentication and recorder configuration from the `staging` branch to the Preview environment without changing Production resources.
- Added wildcard hostname support so Vercel-generated Preview URLs can record to the Preview ledger without a per-branch hostname override; Development remains disconnected from both deployed databases.
- Added a dedicated Preview migration command and documented the straightforward two-database model: one database for Production and one for Preview.

## 2026-08-15 - Bot Visibility Made Optional In Private Analytics

- Excluded visits explicitly identified by BotID as bots from dashboard figures, daily activity, and anonymous-browser history by default, while treating nullable unclassified verdicts as ordinary visits.
- Added an accessible, URL-backed `Include bots` toggle that applies consistently to figures and both report views without adding bot commentary beneath the headline numbers.
- Extended private-dashboard browser coverage for the default filter, the included-bot state, and the setting carried into visitor history.

## 2026-08-15 - Visit Bot Classification Prepared

- Added Vercel BotID Basic to the first-party visit recorder and write endpoint without blocking classified bots; failures remain best-effort and store an unclassified verdict.
- Added a third ledger migration for nullable bot verdict, verified name and category, with positive verdicts winning across later page observations and legacy rows remaining unclassified.
- Extended the protected report, dashboard and saved queries so explicit bots remain inspectable but are separated from headline visit, returning, page and source figures. The migration and deployed BotID flow remain pending Production application and live verification because testing was unavailable during this task.

## 2026-08-15 - Working With Joel Contact Paths Added

- Added a direct Get in touch action to the Working with Joel hero, with page-scoped responsive, focus, pointer, and reduced-motion treatment.
- Added the canonical Contact invitation as the page's closing section, making appointment, free consult, and general-enquiry options available after the issues index.
- Extended public-route coverage and the supported-component records to include both new contact paths.

## 2026-08-15 - Production Visit Ledger Isolated

- Retargeted every Vercel-managed Neon identifier, connection variable, and private-report Basic-auth credential to Production only; Development and Preview no longer receive a path capable of reading or writing the private visit ledger.
- Removed the obsolete `work/local-analytics` Preview recorder overrides and deleted the 20 Preview deployments created after the Production database credential was introduced, invalidating their retained runtime snapshots without touching Production or ledger data.
- Removed the retired Preview migration/verifier workflow, made future migration access an explicit Production env pull, scrubbed stale local non-production env snapshots, and archived `DEBT-38` as resolved.

## 2026-08-15 - Private Visit Analytics Connected

- Added the unlisted `/analytics` interface and protected `GET /api/analytics` function, with HTTP Basic Authentication applied to both through Vercel Routing Middleware.
- Connected daily Australia/Perth activity and complete anonymous-browser history to the retained Neon visit ledger, including stored page journeys, full stored referrers, repeat-visit sequence, and recognized ad attribution.
- Replaced the fictional dashboard fixtures with live API loading, failure, retry, empty-day, expandable-visit, and visitor-history states while keeping database credentials and read access server-side.
- Hardened the connected feature after whole-slice review: same-document writes are serialized and retry concurrent visibility, rejected page collisions no longer retain empty visits, preview verification cleans up its records, migration hashes are line-ending stable, and private reports receive a clean document boundary from third-party analytics.

## 2026-08-14 - First-Party Visit Ledger Released

- Released the reviewed `staging` candidate to Production with first-party visit recording enabled only on `vivecounselling.com.au` and `www.vivecounselling.com.au`; failures remain isolated from the visitor experience.
- Activated the protected daily 12-month retention schedule against the migrated Neon database while keeping all reporting server-side and outside the public API.
- Confirmed the live site responds successfully, the visit endpoint rejects reads, the deployed client contains the canonical-host recorder configuration, and Vercel reported no runtime errors immediately after release. Natural production records were subsequently confirmed in the ledger.

## 2026-08-14 - Editorial Material Palette Promoted

- Promoted: Warm paper, sage, deep and softened green, and matching light- and dark-surface rules now form one six-token `--section-*` foundation palette with documented semantic and contrast boundaries.
- Consolidated: Public editorial pages, shared specialist heroes, and the development Documents and Design System workspaces consume the shared foundations directly instead of carrying route-prefixed copies.
- Preserved: The lighter root page canvas, shared chrome and footer roles, Contact-specific rule opacities, and nearby page-owned dark greens remain distinct rather than being merged by literal colour alone.

## 2026-08-14 - First-Party Visit Ledger Production Configuration Prepared

- Connected the existing Vercel-managed Neon resource to Production while preserving Development and Preview, and confirmed the shared database remains current at two migrations.
- Added a separate sensitive Production retention secret and configured the future Production build to record only on the apex and `www` Vive hostnames.
- Removed the two synthetic Slice 7 visits and their three cascading page views from the shared database. No production deployment was made, so live visit collection has not started.

## 2026-08-14 - Public Browser Suite Simplified

- Reduced: The Playwright suite now has 37 focused cases in one Chromium project instead of 262 cases duplicated across desktop and mobile Chromium profiles.
- Removed: Broad copy, class-count, pixel-alignment, asset-byte, raw-markup, generated-metadata, and duplicate-artifact assertions no longer mirror page source and build implementation inside browser tests.
- Preserved: Route hydration and diagnostics, navigation and mobile focus/scroll behaviour, progressive enhancement, core first-response metadata, redirects, analytics privacy and events, enquiry success/error behaviour, responsive overflow, and axe coverage remain automated; detailed generated artifacts stay with the build generator and manual metadata monitor.
- Resolved: `DEBT-34` is archived under the new durable testing strategy.

## 2026-08-13 - First-Party Visit Ledger Preview Connected

- Connected a Vercel-managed Neon resource to Development and Preview only, added checksum-tracked transactional migrations, and applied the two visit-ledger migrations outside production.
- Enabled recording only on the protected `work/local-analytics` preview and confirmed browser-to-function-to-Neon storage with an exact referrer, paid attribution, ordered page views, and a second visit recognized as returning for the same anonymous browser.
- Confirmed the protected retention function runs against Preview with no eligible deletions. Production has no Neon connection and visit recording remains disabled until explicit owner approval.

## 2026-08-13 - First-Party Visit Ledger Reporting And Retention Defined

- Added: The repository now defines a read-only Postgres visit ledger that identifies the earliest retained browser visit as new, later visits as returning, classifies traffic, and totals page views.
- Added: Five Neon query templates cover newest-first inspection, anonymous-browser grouping, today's Australia/Perth overview, 30-day source/ad reporting, and one visit's ordered page sequence.
- Added: Anonymous browser IDs rotate after 12 calendar months, and a protected daily Vercel job removes visits older than 12 months with their related page views.
- Preserved: Reporting has no public read endpoint, no Neon resource has been provisioned, and production collection remains disabled pending preview testing and owner approval.

## 2026-08-13 - Public Route Parity Enforced

- Simplified: Public and development route constants now store final absolute hrefs, removing the repeated `routeHref()` conversion layer from navigation, pages, metadata lookups, redirects, and development tools.
- Consolidated: Prerendering and browser tests derive their route inventories from existing route contract maps rather than maintaining separate seven-route lists.
- Guarded: Direct script tests compare public route constants with metadata and validate redirect destinations; the production build continues to enforce metadata, rendered-route, and prerender-contract parity.
- Resolved: `DEBT-8` moved to the project debt archive without introducing a shared route manifest.

## 2026-08-13 - Dormant Inherited Presentation Layer Removed

- Removed: Unmounted global card, topic, checklist, fee, detail, CTA, list, and hero selector families plus their responsive rules and orphaned tokens no longer ship in production CSS.
- Simplified: The unused `SectionHeading` component and unconsumed tertiary `Button` variant were removed; live Working with Joel layout, tabs, portrait, and shared-shell styles remain intact.
- Reconciled: The active cedar evidence, development specimen, and living legacy registers now describe only current source and verified consumers.

## 2026-08-13 - Shared Reading Typography Tightened

- Updated: `.site-reading` now splits the difference between its previous scale and the Crisis Support emergency paragraph, using a restrained responsive `1.005–1.04rem` size and `1.63` line-height across its verified public-page consumers.
- Aligned: Crisis Support emergency guidance now consumes the shared reading role directly while retaining its page-owned emergency foreground colour.

## 2026-08-12 - Australian Crisis Support Route Added

- Added: `/crisis-support` now puts immediate-danger guidance and a direct `000` action before verified national crisis lines and state or territory public mental health services.
- Covered: The route includes Lifeline, Suicide Call Back Service, 13YARN, all eight state and territory locations, Victoria's area-based directory, and RuralLink for regional and remote Western Australia; every service name links to an official source and the verification date is public.
- Connected: Contact now directs urgent visitors away from the enquiry form to the dedicated route, and the shared footer gives Crisis Support a permanent site-wide entry point.
- Published: Route metadata, server prerendering, sitemap output, raw-output contracts, phone destinations, service counts, and accessibility smoke coverage now include the eighth public content route.

## 2026-08-11 - Homepage Specialist-Practice Section Rebuilt

- Replaced: The generic `Bring all of yourself` split section is now a direct `Inclusive practice` section centred on what Joel already knows before counselling begins.
- Rewritten: The introduction states Joel's kink and BDSM, ethical non-monogamy and polyamory, and LGBTQIA+ relevance directly, including the lived experience informing this work; each topic has its own practice-specific scope copy and first-class route.
- Redesigned: Three offset, overlapping editorial surfaces carry the specialist destinations without numbers or substitute category labels; the general Inclusion hub is a quiet secondary route, and the surfaces retain a small alternating offset when stacked on narrow screens.

## 2026-08-11 - Inclusion Child Pages Gain Closing Invitations

- Added: Kink and BDSM, ENM and polyamory, and LGBTQIA+ pages now close with the canonical `<ContactInvitation />` after their page-specific content.
- Preserved: The shared component retains its fixed appointment, free 15-minute consult, and general-enquiry wording, Contact destination, accessibility relationship, interaction states, and responsive treatment.
- Verified: Route coverage now asserts one final closing invitation and its `/contact` destination on all three child pages, including their prerendered HTML.

## 2026-08-06 - Homepage About Vive Copy Expanded

- Reframed: The first substantial Home section remains `About Vive`, opening
  with Joel and the practice before developing client concerns rather than
  using a colder concerns-only heading.
- Expanded: The narrative now gives separate weight to broad counselling,
  trauma and relationships, including perfectionism, people-pleasing, CPTSD,
  sexual trauma, sex and intimacy, and single or repeated traumatic
  experiences.
- Positioned: Kink, BDSM, ENM, polyamory and LGBTQIA+ affirming work now close
  the section as a concrete practice strength, alongside Joel's commitment to
  people whose identity, relationships, sex work or diagnosis have made
  suitable therapy harder to find.
- Removed: Detailed psychodynamic, attachment-informed and integrative method
  copy has left Home and remains available on Working with Joel.

## 2026-08-06 - Public-Copy Instruction Path Rebuilt

- Added: `practice-direction.md` now owns stable practice scope and positioning without supplying a reusable public-copy formula.
- Rebuilt: The copywriter path now gives client-facing recognition and commercial persuasion a positive role, uses the owner-approved “Known before you arrive. Not learned as you go.” line as bounded taste evidence, and avoids fixed creativity rituals.
- Simplified: Ordinary copy work no longer loads audience or market research unless the owner explicitly requests it, while `develop-page-copy` is limited to whole-page direction and durable handoffs rather than routine section drafting.
- Routed: Broader website-design and explicit Impeccable UX-writing paths now hand substantive public wording back to the project's writing authority and copywriter rather than applying a competing voice standard.

## 2026-08-05 - Promoted CSS Separated From Inherited Source

- Separated: Every currently promoted CSS foundation, component treatment, and pattern now lives under the current-only `src/design-system/` production source entry; inherited shared CSS remains outside it.
- Bundled: `src/main.tsx` imports `src/design-system/index.css` once, preserving one Vite production CSS bundle rather than adding browser stylesheet requests for the source files.
- Clarified: The development catalogue stylesheet is now `src/styles-design-system-workspace.css`, making its tooling-only role distinct from the supported production system.
- Reconciled: Active catalogue implementation paths and governance now point to the new source structure while retaining the Markdown contracts as reuse authority.

## 2026-08-05 - Reading Typography Roles Promoted

- Promoted: `.site-reading` now owns the shared Inter-first body-prose family, responsive `1.01–1.08rem` size, weight `400`, and `1.64` line-height; `.site-reading--lead` adds the bounded darker-ink, weight-`500` opening-paragraph treatment.
- Migrated: All seven public content routes now use the supported roles for matching substantive prose instead of duplicate page-level typography declarations.
- Preserved: Page composition, measures, paragraph spacing, contextual dark-surface colour, and the smaller issues-index copy remain page-owned.
- Rendered: Foundations now shows both production classes as real specimens and documents their reuse boundaries.

## 2026-08-05 - Design-System Workspace Split By Catalogue

- Split: `/design-system` is now a concise operational overview, with Foundations, Components, and Patterns rendered on separate development-only category routes.
- Shared: One workspace shell owns the hero, catalogue navigation, specimen totals, active-page state, and written-authority links across all four pages.
- Preserved: Every supported specimen still renders from the real promoted implementation and links to its authoritative current-only catalogue record.

## 2026-08-05 - Contact Invitation Component Promoted

- Promoted: `<ContactInvitation />` is the first supported React component contract, with fixed visitor-facing copy and destination plus component-owned semantics, interaction states, and responsive presentation.
- Migrated: Home now renders the shared component as its final section; the former `ClosingCtaSection`, `HomeClosingCtaContent`, and `home-closing*` CSS were removed.
- Scoped: Home is the only verified production consumer today. Rollout to the other non-Contact public pages remains separate work.
- Rendered: The Components catalogue and `/design-system` workspace now expose the real production component.

## 2026-08-05 - Shared Hero Background Promoted

- Promoted: `.site-hero-background` now owns the dark-green gradient, clipping, isolation, and lower boundary used by every public-route hero while leaving hero layout, content, typography, actions, and responsive composition page-owned.
- Migrated: Home, Working with Joel, Inclusion, all three specialist routes, Contact, the Design System cover, Documents hero, and shared development test-bed hero now use the supported surface.
- Removed: Deleted the obsolete light `.hero-bg--default` helper, its unused noise asset, and repeated page-level hero background declarations after migrating all consumers.
- Rendered: Patterns now shows the real supported hero surface alongside the warm editorial-section contract.

## 2026-08-05 - Design-System Catalogues Separated From Legacy Evidence

- Simplified: `docs/design-system/` now contains current promoted contracts only, split into Foundations, Components, and Patterns under one operational governance file.
- Separated: Inherited tokens, components, and selector families now live in the non-authoritative `docs/design-system-legacy/` register; presence there neither grants reuse authority nor makes removal safe.
- Removed: The mixed design-system current-scope inventory, unreviewed catalogue entries, active removed-item records, and combined lifecycle status model no longer sit in the current system.
- Routed: Repository guidance, Documents, project debt, and `/design-system` record links now follow the active/legacy boundary; Git and this task log retain completed removal history without a retired-item catalogue.

## 2026-08-05 - Warm Editorial Section System Promoted

- Promoted: `--section-warm`, `--section-rule`, and `.site-section-warm` now provide one `Shared-supported` material, default rhythm, and lower boundary for verified primary light editorial sections across all seven public content routes.
- Simplified: The subtle sage glow was removed from the Working with Joel introduction; the Inclusion chapters retain their distinct page-local sage left-hand overlay over the shared warm base.
- Rendered: Foundations now contains six source-backed token specimens, and Patterns contains the real `.site-section-warm` implementation as its first supported specimen.
- Contained: Unused Home colour aliases and a redundant Inclusion wrapper background were removed; other light backgrounds, matching `#f2efe8` declarations, and dark section treatments remain outside this promotion.

## 2026-08-05 - Shared Portrait Colours Promoted

- Promoted: `--portrait-panel`, `--portrait-frame`, and `--portrait-footer-tint` now form a bounded `Shared-supported` material set for identified-person portrait treatments.
- Migrated: Home and Working with Joel use the new root tokens in place of duplicate page-local chocolate, frame, and footer-tint values, with no intended visual change.
- Rendered: Foundations now shows all four supported colours using their real production properties and records the portrait set's exact consumer and contrast boundaries.
- Contained: Home's stronger portrait-button interaction tint remains page-local because it has only one verified consumer.

## 2026-08-03 - First Shared-Supported Colour Promoted

- Promoted: `--cedar` is the first `Shared-supported` production token, with a bounded primary brand-accent role, verified route-reachable consumers, and recorded contrast on the site's light surfaces.
- Rendered: Foundations now contains the first `/design-system` specimen, using the real production custom property and linking back to its authoritative token record.
- Contained: Related colour tokens remain `Unreviewed`; this promotion does not authorize `--cedar-dark`, `--cedar-soft`, or visually similar literal values.

## 2026-08-03 - Source-Backed Design-System Workspace Established

- Added: A new development-only `/design-system` governance ledger explains the authority order and promotion gate, links to the written records through Documents, and begins with zero supported specimens.
- Guarded: `DesignSystemSpecimen` can frame only real production items already recorded as `Shared-supported`; candidates and unreviewed implementation remain page-local or in the test beds, and no parallel status registry was introduced.
- Separated: The new workspace uses its own page-scoped implementation and does not restore, redirect, or inherit the retired `/design-language/*` snapshot.
- Routed: The Dev menu now opens Design system first, Documents also reads `docs/design-system/`, and production-boundary coverage includes the new route.

## 2026-08-03 - Rendered Design Catalogue Retired

- Removed: The five `/design-language/*` development routes, their page modules, archive layout and sidebar, Dev-menu entry, route constants, and archive-only styling were deleted after source-usage checks found no production dependency.
- Preserved: The Documents route, Codex and Opus test beds, their Dev navigation, and Documents-specific `ds-*` layout/sidebar support remain available.
- Governed: Written lifecycle governance and item-level catalogues are now the only active design-system documentation; concise `Removed` records retain the catalogue's retirement state while Git preserves its detailed history.
- Tracked: `DEBT-37` remains open for incremental source-backed classification of the retained production system, independent of any rendered explorer.

## 2026-08-03 - Incremental Design-System Migration Governance Added

- Established: Design-system items now use the `Unreviewed`, `Page-local`, `Candidate`, `Shared-supported`, `Deprecated`, `Dormant`, `Historical/dev-only`, and `Removed` lifecycle, with source evidence and consumer records required as items are touched.
- Directed: New styling remains page-local by default; shared promotion requires explicit shared-system scope, while deprecated, dormant, historical, and unreviewed implementation cannot gain new consumers or be removed opportunistically.
- Routed: Existing written catalogues serve as the incremental item registers, current-scope summarizes verified changes, and `DEBT-37` remains open as the touch-as-you-go reconciliation umbrella. No production CSS, components, pages, or rendered catalogue routes changed.

## 2026-08-03 - Rendered Design Catalogue Quarantined

- Quarantined: All five development-only `/design-language/*` routes remain browsable as a historical archive, inherit one prominent outdated-catalogue notice, and use historical navigation, metadata, and sample framing.
- Removed: Prescriptive AI-maintainer comments and unverified current, canonical, authoritative, approved, and direct-reuse claims were removed or rewritten as descriptions of the earlier snapshot while demonstrations and class markup were preserved.
- Governed: Rendered catalogue pages no longer count as implementation evidence or reusable-API authority; future catalogue routes must remain nested beneath `DesignSystemArchiveLayout` while quarantine is active.
- Tracked: Added P1 `DEBT-37` for full source-backed reconciliation of implementation usage, written catalogues, classifications, and rendered examples.

## 2026-07-29 - Contact Confirmation Simplified

- Changed: Successful Contact submissions now show one compact confirmation with the owner-confirmed expectation that Joel usually replies within 24 hours.
- Simplified: The duplicate success label, oversized display treatment, and separate “What happens next” row were removed while preserving the checkmark, focused status semantics, and native fallback response.
- Verified: The refreshed confirmation remains focused and fully visible at wide, intermediate, and narrow viewports without horizontal overflow.

## 2026-07-29 - IDE Visual Verification Stabilised

- Added: Codex IDE visual inspection now has a repository-local optional managed-session helper that launches Playwright against system Chrome and starts Vite on an isolated port; direct Playwright use remains supported.
- Routed: `docs/project/visual-verification.md` owns the IDE access instructions; the unsupported in-app Browser plugin is disabled for this repository, and the guide excludes both it and the unavailable `agent-browser` CLI.
- Preserved: Automated Playwright QA browser selection and the project's visual-review scope are unchanged.

## 2026-07-28 - Contact Analytics Consolidated In GA4

- Changed: GA4 now receives page views, first enquiry interaction, email-link clicks, all three controlled Contact-path selections, and confirmed enquiry conversions.
- Added: Contact selections report `appointment`, `consult`, or `question` through the controlled `contact_option` parameter; confirmed conversions retain controlled form and lead-source context without visitor-entered data.
- Removed: Vercel Web Analytics, its runtime component, dependency, and custom events are no longer part of the site analytics implementation.
- Verified: Dedicated analytics QA covers disabled and disallowed-host behaviour, all GA4 contact-intent values, failed-conversion suppression, successful conversions, route page views, and Clarity loading.

## 2026-07-24 - Copy Skills Rebuilt Around Editorial Commitment And Cold Review

- Rebuilt: `copywriter` now establishes a source envelope, commits to one supported editorial direction, drafts one coherent version, and loads its causal anti-default review only after the working draft is frozen.
- Consolidated: Six overlapping copywriter references are now four focused stages, while `develop-page-copy` delegates all editorial work to `copywriter` and keeps one concise contract for page-plan and section artifacts.
- Preserved: Reader-range discipline, task-supplied voice authority, exceptional claim checks, the full visible substantial-copy review loop, stable page-plan paths, and semantic design handoff remain active without creating a repository voice corpus.

## 2026-07-23 - Page-Copy Development Reduced To Two Artifact Passes

- Changed: `develop-page-copy` now produces either one high-level page plan without exact public copy or one bounded section's reviewed exact copy and semantic content-composition brief; section development can use a page plan or recover a provisional local brief from available page context.
- Removed: Automatic stage chaining and copy-only page assembly no longer belong to the skill; each invocation stops after its authorised page-plan or single-section artifact.
- Added: Section artifacts now hand exact working copy to `website-design` as strong but revisable source material while leaving visual composition, art direction, responsive behaviour, and implementation open.

## 2026-07-23 - Codebase Improvement Workflow Moved To Skill

- Added: The repository-local `improve-codebase` skill is now the sole procedural authority for source-first cleanup runs, including a broad CSS and visual-system focus that may change coupled implementation surfaces.
- Changed: Cleanup now selects the strongest code-discovered maintainability opportunity and implements its best complete behaviour-preserving resolution without treating diff size, file count, or the easiest fix as selection criteria.
- Required: When that resolution cannot be completed and verified safely in one pass, creating or updating the relevant `DEBT-*` card is the terminal outcome rather than a smaller consolation cleanup.

## 2026-07-23 - Practice Facts Brief Removed

- Removed: Deleted `docs/project/product-direction.md`; its five facts were not relocated into another brief or archived.
- Routed: Public-copy and research workflows now use owner decisions and relevant source or current-scope information without a separate product or practice-facts authority.
- Preserved: Earlier task-log entries remain as historical records of the former document and its changing role.

## 2026-07-22 - Copy Skills Rebuilt Around Reader Ranges

- Replaced: The copywriter and staged page-development workflows no longer construct one research-grounded pseudoperson as the representative reader or reuse an imagined internal state throughout drafting and review.
- Added: Specialist pages consider the meaningful range within their subject, including central and contextual relevance, while general pages use a proportionate cross-context check for readers with none, one, or several specialist or inclusion contexts.
- Simplified: Section work now explores directions briefly, commits to one complete draft, and prohibits automatic synthesis; reader research informs real writing decisions without becoming a page outline, mandatory recognition copy, prescribed visitor journey, or performance of specialist knowledge.
- Refocused: Practice and service facts now act as supplied constraints rather than a routine verification exercise; evidence ledgers and credential audits were removed from ordinary copy development, while explicit or consequential external-claim checks remain available as a narrow exception.

## 2026-07-22 - Readiness Tracker Retired

- Removed: Deleted the no-longer-needed readiness tracker and its archive now that the site is live and cross-site review state has permanent owners.
- Preserved: Accessibility, responsive, and SEO review state remains in owner-directed monitors; concrete work remains under `SITE-*`, `DEBT-*`, writing, or ordinary operational ownership.
- Cleaned: Removed the retired tracker identifiers, routing rules, links, and historical pointer language from current documentation and curated archives.

## 2026-07-22 - Accessibility Manual Monitor Added

- Replaced: The former incomplete checklist is now an owner-directed `accessibility-monitor.md` covering the shared shell, all seven current public routes, and not-found behaviour through a practical WCAG 2.2 AA lens without claiming formal conformance.
- Preserved: Defensible Home and Contact item statuses remain undated, the renamed Inclusion route starts fresh, and current accessibility gaps retain independent `SITE-*` / `DEBT-*` ownership.

## 2026-07-22 - Product Direction Reduced To Practice Facts

- Replaced: The facts-only brief supersedes the 2026-07-14 decision brief; `docs/project/product-direction.md` retains its compatibility path but now records only five stable facts about the practice, adult scope, approach, concern areas, and specialist contexts.
- Removed: Site purpose, audience categories, visitor decisions, positioning, success criteria, non-goals, accessibility policy, and delivery guidance no longer act as product or copy requirements and were not archived or relocated.
- Routed: Copy, design, research, and page-development guidance now consults the facts brief only when a task needs one of its stable facts; writing direction and current scope retain their separate responsibilities.

## 2026-07-22 - Responsive Manual Monitor Added

- Replaced: The former incomplete checklist is now an owner-directed `responsive-monitor.md` covering the shared shell, all seven current public routes, and not-found behaviour.
- Clarified: Each section starts unreviewed, uses a three-viewport standard plus a continuous width sweep, and records exceptional notes and last-checked dates only when explicitly reviewed; automated tests remain regression context rather than manual pass evidence.

## 2026-07-22 - Planning Dialogue Preference Clarified

- Changed: Planning Mode now actively encourages clarifying and preference questions, including non-blocking choices, without a total question cap; question rounds should build on available context and adapt to earlier answers.
- Aligned: Website-design discovery now follows the same exploratory planning preference, while implementation-time questions retain the material-impact threshold.

## 2026-07-22 - Public Writing Direction Simplified

- Simplified: Removed reusable copy examples and formula-like sentence, specialist-knowledge, warmth, keyword-placement, and final-review instructions that could make different pages repeat the same content or rhetorical shape.
- Preserved: The canonical guide still owns source authority, core voice, page-specific structure, natural search language, collaboration boundaries, and causal review of generic or AI-default writing.

## 2026-07-22 - SEO Metadata Monitor Consolidated

- Consolidated: Replaced the former checklist, metadata inventory, and Google-style preview document with one owner-directed `seo-metadata-monitor.md` covering current public routes, redirects, and not-found behaviour.
- Clarified: The monitor records optional metadata values, exceptional notes, and section-level last-checked dates only when explicitly reviewed; it has no automatic schedule and excludes external-service state.

## 2026-07-21 - Live-Site Baselines Accepted

- Accepted: Current performance and analytics implementations are the live operating baselines; future refinements remain ordinary operational, `SITE-*`, or `DEBT-*` work.
- Accepted: Current browser and API coverage is the live enquiry-flow QA baseline; concrete form improvements remain ordinary `SITE-*` work.
- Continued: Owner-led copy refinement remains under the writing direction and relevant `SITE-*` items rather than a separate final-copy review.
- Verified: Live apex-domain, redirect, canonical/social metadata, crawl-artifact, shared-image, and controlled-404 checks passed; repeatable live smoke-test automation remains separately tracked under `DEBT-24`.

## 2026-07-20 - Contact Intent And Conversion Analytics Added

- Added: Anonymous Vercel Analytics events now record the first meaningful enquiry-form input and email-link clicks without event properties, topic context, or visitor-entered data; these intent events are not sent to GA4.
- Added: Successful contact-form sends now emit GA4 `generate_lead` and Vercel Analytics `Enquiry submitted` events only after `/api/enquiry` returns success.
- Protected: Conversion payloads contain no visitor-entered form data, failed sends emit no conversion, and analytics errors cannot change the visitor's successful form outcome.
- Verified: The opt-in analytics QA path covers property-free contact-intent events, success-event payloads, failed-submission suppression, existing route tracking, and Clarity loading.

## 2026-07-20 - Structured Data Extended For Live Services

- Added: Each live Kink/BDSM, ENM/polyamory, and LGBTQIA+ route now emits a linked `WebPage` and route-specific `Service` graph using the stable site-wide Organization and umbrella counselling Service identities.
- Added: The umbrella and specialist Service entities record online enquiry as the delivery channel and the confirmed AUD 120 offer for a standard 50-minute session.
- Preserved: The Organization remains address-free rather than publishing or inferring a private location or emitting incomplete address-dependent `LocalBusiness` data; the approved Google Business Profile can join `sameAs` once its exact public profile URL is confirmed.
- Verified: The build and public-route metadata assertions cover the expanded JSON-LD graph alongside the existing `WebSite`, `Organization`, `Person`, `ProfilePage`, and visible-question `FAQPage` data.

## 2026-07-20 - Inclusive Counselling URLs Renamed And Flattened

- Changed: The Inclusion hub now uses `/inclusive-counselling`; its three topic pages use the flat `/kink-bdsm-counselling`, `/polyamory-enm-counselling`, and `/lgbtqia-affirming-counselling` routes.
- Preserved: The former indexed `/inclusion` hub permanently redirects to `/inclusive-counselling`; the three former unindexed topic URLs do not redirect.
- Updated: Navigation, page metadata, prerendering, sitemap coverage, route tests, and current project scope use the new URLs.

## 2026-07-18 - Inclusion Child Pages Published

- Changed: Kink/BDSM, ENM/polyamory, and LGBTQIA+ are now first-class public routes linked from the shared navigation, Home, and the Inclusion hub.
- Changed: All seven public content routes are indexable and included in the canonical sitemap; route-level child-page `noindex, nofollow` directives and draft-only link gates are retired while the controlled 404 remains noindexed.
- Verified: Production prerendering, public discovery assertions, route metadata, sitemap output, responsive overflow checks, and serious-impact accessibility smoke coverage now include all three child pages.
- Cleaned: Obsolete child-page review screenshots, the one-off browser script, stale draft-policy documentation, and resolved `SITE-9` tracking were removed or archived.

## 2026-07-17 - Audience And Market Research Skills Split

- Refocused: `audience-research` now builds broad, experience-rich audience
  understanding from formal evidence and public first-person material for
  downstream copywriting and page development rather than acting like an
  auditable research paper.
- Simplified: Future dossiers use evidence-shaped headings and one
  `ID` / `Source` / `Description` register while retaining concrete populations,
  sample sizes, percentages, comparisons, settings, and meaningful limitations
  beside the findings they support. Existing dossiers remain unchanged.
- Split: The freehand `market-segment-research` seed now preserves query,
  competitor, provider, directory, taxonomy, and visible-market research that
  no longer belongs in audience dossiers.

## 2026-07-17 - Audience Research Delegation Workflow Added

- Added: The `audience-research` skill may delegate independent evidence streams
  to subagents while keeping canonical synthesis, source-ID assignment, dossier
  changes, and index changes parent-owned.
- Established: Each subagent writes unrestricted substantive notes to one file
  in a dated per-task `docs/research/working/` folder; the parent reads and
  proportionately verifies every packet before selecting evidence to integrate.
- Clarified: Working packets remain non-canonical, Git-tracked, and retained for
  owner review. Other tasks ignore them unless the owner explicitly requests
  inspection or the same parent research task is continuing.
- Simplified: Audience dossiers no longer carry document statuses, creation or
  review metadata, or review logs. Research coverage and source-level dates
  retain the evidence context without a separate document lifecycle.

## 2026-07-16 - Staged Page Copy Development Skill Added

- Added: The project-local `develop-page-copy` skill formalises the visitor-first page-plan-then-section workflow for new and substantially rebuilt service pages.
- Foregrounded: The workflow begins by identifying the visitor, writing an evidence-grounded account from their page position, and returning to that visitor's hat before planning, section development, cold review, and assembly.
- Established: Page plans own the visitor journey, section jobs, boundaries, and handoffs; separate section workthroughs own conceptual choices, structurally different copy candidates, cold-reader testing, and a recommended working draft.
- Added: Copy decisions explicitly route through the project-local `copywriter` skill, while reusable artifact structures and quality gates reinforce sentence function, deletion, model glue, inclusion, claim integrity, research grounding, and full-page handoffs.

## 2026-07-16 - Audience Research Library Established

- Added: `docs/research/` now provides a mapped internal audience-research library, with parent dossiers for kink, ENM/polyamory, and LGBTQIA+ clients combining formal evidence, public web discussion, dated search or service observations, and source registers.
- Established: Audience dossiers can combine formal evidence, recurring public web discussion, dated search or market observations, and authorised owner or practice knowledge while keeping their source roles distinct.
- Clarified: Dossiers record evidence rather than public copy, product direction, SEO actions, or site-specific recommendations; subsegments remain within a broad parent dossier unless a distinct evidence base, recurring research need, maintainability problem, or owner request warrants extraction.
- Added: The project-local `audience-research` skill owns library setup, source-bound formal and public-web research, maintenance, and proportionate subsegment handling for later use by other skills.

## 2026-07-15 - Homepage Service Description Updated

- Changed: The homepage hero now identifies Joel Griffiths, his Perth base, online counselling for adults across Australia, common presenting concerns, and Vive's kink/BDSM-aware, ENM/poly-aware, and LGBTQIA+ affirming practice.
- Resolved: Google Business Profile verification is complete, so the temporary restriction on foregrounding online delivery has been retired.
- Clarified: Online counselling may be named where it helps visitors or search intent, but should not be repeated across the site merely for emphasis or SEO.

## 2026-07-14 - Design System Moved To Temporary Reference Status

- Changed: Fresh creation and redesign now establish visual direction before consulting the existing design system; its palette, typography, heroes, components, patterns, spacing, surfaces, and rendered examples are implementation reference rather than visual authority unless a task explicitly opts in.
- Removed: The shared hero is no longer canonical for new work, superficial resemblance no longer triggers shared-pattern extension, and fresh concepts are not required to preserve the existing paper-and-sage editorial character or include one memorable editorial move.
- Clarified: Pattern and component selection happens after concept selection. Existing semantic, accessibility, routing, data, and tested behaviour may remain required independently of current styling, while page-scoped or replacement visual implementation does not require system promotion.
- Preserved: The design-system documents still inventory current production code, shared behaviour, legacy boundaries, maintenance workflows, and deliberately reusable implementation for tasks that choose to use it.

## 2026-07-14 - Website Design Skill Strengthened Against Convergence

- Strengthened: From-scratch, open redesign, and explicitly distinctive work now require proportionate, structurally opposed concepts before high-fidelity implementation rather than accepting the first plausible direction.
- Added: The workflow now audits inherited defaults, whole-design transferability, content-form repetition, design-system templating, and whether conspicuous choices trace to real visitor, content, organisational, asset, interaction, or technical causes.
- Expanded: Anti-generic and visual-craft references now address counter-template convergence, reference provenance, macro page silhouette, prestige spacing, archetype misuse, and typography used as a substitute for design authorship without imposing a new banned-style list.
- Preserved: The existing visual and responsive review gate remains unchanged; the revised skill passes the official package validator.

## 2026-07-14 - LGBTQIA+ Counselling Page Rebuilt

- Rebuilt: `/inclusion/lgbtqia` now uses a subject-owned "default settings" comparison to contrast common assumptions with Joel's actual starting points, followed by concrete topics, native FAQs, and a direct enquiry close.
- Changed: The page opening now uses the shared hero contract and a single-column composition aligned with the Kink/BDSM page, grouping the display, support copy, practice facts, and enquiry action. The sections below it retain the page-scoped flat composition, high-contrast aubergine, yellow, and coral palette, contemporary sans typography, sharp rules, and content-shaped comparison layout.
- Preserved: The route remains a draft with route-level `noindex, nofollow` metadata and stays out of production navigation and the sitemap pending owner copy review and publication sign-off.
- Verified: Production build and prerendering pass. Final responsive and browser review is deferred while the owner works through the page section by section.

## 2026-07-14 - Product Direction Rebuilt As A Decision Brief

- Rebuilt: `product-direction.md` now separates practice context, site purpose, audiences, visitor decisions, positioning, success criteria, non-goals, accessibility, and the active positioning constraint.
- Removed: The unexplained register marker, adjective stacks, imagined visitor psychology, anti-reference catalogue, and slogan-like design principles no longer serve as product requirements or voice examples.
- Clarified: Product direction records strategy; writing guidance owns operational wording and voice, while current scope and source own exact implementation facts.
- Preserved: Inclusion as ordinary working knowledge, practical decision support, claim restraint, accessibility, and a clear enquiry path remain central product decisions.

## 2026-07-14 - Active Project History Partitioned

- Moved: Resolved and superseded `DEBT-*` and `SITE-*` summaries now live in dedicated archive files outside their active trackers.
- Partitioned: June 2026 milestones now live in a dated task-log archive, leaving the active task log focused on current-month durable history.
- Preserved: Stable tracker IDs and milestone text remain searchable through `docs/project/archive/`; archives are supporting history rather than active requirements.
- Trimmed: Resolved card-boundary and side-stripe migration detail now points to archived debt history instead of repeating completed decisions in active design migration notes.

## 2026-07-14 - Markdown Instruction Owners Consolidated

- Simplified: `docs/project/README.md` is now an ownership and authority map; `AGENTS.md` remains the sole repository-wide task router and global update matrix.
- Refactored: Project current scope is a factual subsystem inventory, while the active online-positioning instruction now lives with public writing guidance.
- Replaced: Root `PRODUCT.md` is a small discovery adapter pointing to canonical product and writing documents instead of a manually synchronized strategy mirror.
- Consolidated: The duplicate design AI checklist has been retired; design governance now owns its unique verification expectations, and repeated design-scope update rules have been removed from the hubs and factual inventory.

## 2026-07-14 - Markdown Instruction Authority Clarified

- Added: Repository guidance now distinguishes requirements and intent, current implementation facts, and approved reusable design-system API instead of relying on one implied source-of-truth order.
- Clarified: Planning Mode may ask as many useful questions as needed overall, using additional concise groups when an interface limits each prompt to three; outside Planning Mode, clarification is triggered by material impact. Tracker checks are task-specific rather than a prerequisite to ordinary work.
- Classified: Trackers, reports, plans, checklists, archives, and task history are supporting memory or evidence; they neither override active guidance nor authorize unrelated implementation.
- Clarified: Design governance now treats source and rendered behaviour as evidence of implementation while requiring documented active status before an implementation becomes reusable API.

## 2026-07-14 - Frontend Agent Skills Simplified

- Removed: The tracked `uncodixfy` agent skill and its `skills-lock.json` entry have been removed from the active repository instruction framework.
- Changed: Impeccable's trigger description and harness policy now require explicit invocation, with `policy.allow_implicit_invocation: false`; ordinary frontend work no longer auto-triggers it.
- Preserved: Explicit `$impeccable` or `/impeccable` invocations still use the full workflow, and future upstream refreshes should retain this local activation policy.
- Clarified: Project-specific design-system guidance remains authoritative for avoiding generic UI patterns; the removed skill's broad absolute rules no longer compete with documented typography, hero, layout, and component decisions.

## 2026-07-14 - Copy Development Skill Rebuilt

- Rebuilt: `.agents/skills/copywriter/` now guides briefing, angle exploration, structure, drafting, and review rather than prescribing a house voice or presenting preferences as universal copywriting rules.
- Routed: Project documentation remains authoritative for voice, facts, positioning, and public claims; the skill explicitly excludes meta-review of writing instructions, exact owner-supplied replacements, typo-only corrections, and copy-preserving technical implementation.
- Added: A conditional angle-prompt reference supports substantial or directionally unclear work without becoming a mandatory template; skill metadata was regenerated and the package passes the official skill validator.
- Enabled: Copywriter may activate implicitly when substantive copy expertise is useful; explicit invocation is not required, while its exclusions prevent incidental activation for unrelated or mechanical work.

## 2026-07-14 - Public Writing Guidance Added

- Added: `docs/project/writing-direction.md` now owns operational public-copy guidance, including source order, approved voice patterns, specialist-language principles, SEO integration, collaboration workflow, and an anti-AI final review.
- Clarified: Existing page source is implementation state rather than an approved voice corpus while public copy remains under active owner-led revision; SEO reports and sample outlines are research inputs rather than page templates.
- Routed: Root agent guidance, project documentation, the frontend product mirror, and design-system AI rules now direct public wording work through both product direction and the writing guide.
- Recorded: Online delivery remains factual but should not be foregrounded in visible copy or metadata while the current Google Business Profile verification and positioning constraint remains active.

## 2026-07-14 - Staging Integration Workflow Adopted

- Added: A long-lived `staging` branch now sits between working branches and the production `master` branch.
- Defined: New `work/*` branches normally start from `staging`, return to `staging` when complete, and reach production by merging the combined release candidate into `master` without squashing or rebasing the long-lived branch.
- Preserved: Vercel can continue creating previews for all non-production branches; the `staging` preview is the integrated release check, while working-branch previews remain available for isolated review.

## 2026-07-13 - Public Hero Heading Contract Migrated

- Changed: All seven metadata-backed public routes now use one concise `h1.hero-badge` followed by `p.hero-display`, reserving `h2` for actual page sections while preserving the existing visual hierarchy.
- Aligned: Shared CSS now owns the serif display typography directly, and rendered design-system examples, written guidance, and public-page tests use the same semantic contract.
- Verified: The production build prerendered all seven routes with the new hero markup, and generated heading outlines no longer include the expressive hero statements.

## 2026-07-13 - DEBT-36 Legacy Spotlight CSS Resolved

- Removed: The unused `.site-spotlight*` base, descendant, and responsive rules from production CSS after a focused source audit found no consumers.
- Preserved: Public markup, rendered appearance, behavior, and the remaining active `site-*` system are unchanged.
- Closed: Archived `DEBT-36` and updated the CSS checklist, migration notes, and design-system scope to record the removal.

## 2026-07-13 - Public Routes Gain Static Rendering And Hydration

- Changed: Generated HTML for all seven metadata-backed public routes now contains the real React header, navigation, page sections, links, media or form content, and footer before JavaScript; the duplicate public H1 metadata and temporary public-shell generator have been retired.
- Preserved: The three draft Inclusion child routes remain excluded from production navigation and sitemap output and retain `noindex, nofollow` while gaining static content and hydration.
- Added: Explicit route/timestamp markers select `hydrateRoot` only for matching route artifacts; development, unknown, stale, mismatched, and 404 paths retain the guarded `createRoot` fallback.
- Verified: The build fails if a metadata route lacks a component render. Focused production-preview coverage and artifact inspection were accepted as the migration completion baseline; no standalone broad final-test or page-by-page campaign remains. `DEBT-34` records that relevant tests should instead be reviewed when a page is already changing for other reasons.

## 2026-07-13 - Practitioner ProfilePage Structured Data Added

- Added: Generated `/working-with-joel` HTML now includes a `ProfilePage` whose `mainEntity` is Joel Griffiths.
- Unified: Homepage and practitioner-page graphs reuse the stable `https://vivecounselling.com.au/working-with-joel#joel-griffiths` Person identity; detailed credentials now live in the practitioner-page graph.
- Aligned: Visible copy identifies Joel as Vive Counselling's founder and names Edith Cowan University alongside the graduate diploma.

## 2026-07-13 - Homepage Service Structured Data Added

- Added: The generated homepage JSON-LD graph now includes a `Service` for counselling and psychotherapy for adults.
- Linked: The Service identifies Vive Counselling as its provider and Australia as its service area, with an adult `PeopleAudience`.
- Deferred: Delivery channel, session pricing, duration, address, and local-business classification remain out until they are intentionally included and maintained.

## 2026-07-13 - Practitioner Credential Structured Data Added

- Added: Joel Griffiths' `Person` schema now records the exact Graduate Diploma in Counselling and Psychotherapy from Edith Cowan University and ACA Registered Counsellor – Level 1 status through `hasCredential`.
- Linked: The ACA credential uses Joel's public ACA profile as its verification URL and identifies the Australian Counselling Association as the recognizing organization.
- Aligned: The visible Working with Joel credential list now uses the same full qualification and registration wording as the structured data.

## 2026-07-13 - Homepage Person Structured Data Added

- Added: The generated homepage JSON-LD graph now identifies Joel Griffiths as a `Person`, links him to the Vive Counselling `Organization` through `worksFor`, and records Joel as the Organization's `founder`.
- Included: The Person uses the confirmed public name, counsellor title, practitioner-page URL, portrait, short description, and ACA public profile in `sameAs`.
- Deferred: Credential detail was initially held until its exact wording and verification were confirmed; it is now recorded in the later practitioner-credential milestone above.

## 2026-07-13 - Homepage Organization Structured Data Added

- Added: The generated homepage JSON-LD now links the existing `WebSite` entity to a minimal `Organization` entity for Vive Counselling.
- Included: The Organization uses only confirmed public identity details: business name, canonical URL, branded email, English enquiries contact point, 512px logo, short service description, and the Vive Counselling Kink Aware Professionals directory identity in `sameAs`.
- Deferred: `Person`, `Service`, credentials, address, and `LocalBusiness` / `ProfessionalService` schema remain out until their exact public representation is confirmed.

## 2026-07-10 - DEBT-19 Legacy Topic CSS Resolved

- Removed: Confirmed-dead `.issues-section*`, `.topic-grid`, and `.topic-card` base, contextual, hover, heading, and responsive rules from production CSS.
- Preserved: Public markup, behaviour, visual intent, and the active `.site-topic-grid` and `.site-topic-card` system remain unchanged.
- Closed: Archived `DEBT-19` and updated the CSS checklist, migration notes, and design-system scope to record the removal.

## 2026-07-09 - Homepage WebSite Structured Data Added

- Added: Generated homepage HTML now includes `WebSite` JSON-LD naming `Vive Counselling` at `https://vivecounselling.com.au/` so Google has a preferred site-name signal for search results.
- Preserved: Per-page title, description, canonical, Open Graph, Twitter, favicon, and static H1 metadata generation still come from the existing route metadata build path.
- Clarified: Organization, Person, and detailed counselling-service structured data remain deferred until public identity and credential details are final.

## 2026-07-08 - Static First-Response H1 Shells Added

- Changed: Generated public route HTML now includes a static `main` and route H1 fallback inside `#root` before React hydration, so non-JavaScript SEO checks can see a non-empty page heading.
- Changed: Route metadata now carries each route's expected H1, and public-site tests verify both the hydrated page H1 and the first-response fallback H1.
- Updated: The enquiry-form browser test now uses the current "Your enquiry" field label so the public-site QA gate matches the live accessible form label.

## 2026-07-08 - Static Rendering Follow-Up Debt Added

- Added: `DEBT-32` tracks replacing the tactical static H1 shell with full public-route static prerendering and React hydration.
- Added: `DEBT-33` tracks retiring the temporary H1 fallback shell after full prerendering exists.
- Linked: SEO readiness work connected both rendering follow-up items.

## 2026-07-08 - Contact Crisis FAQ Added

- Changed: The Contact/Fees FAQ now states that the form is not for emergency contact and gives concrete Australian crisis-support options: `000`, Lifeline, and Suicide Call Back Service.
- Preserved: The enquiry form remains positioned for non-urgent contact, with the FAQ and structured FAQ schema sharing the same plain-text answer.
- Closed: Archived `SITE-12`; remaining Contact trust and practical-detail tracking now excludes the crisis-support resource item.

## 2026-07-08 - Temporary Vercel Production Host Retired

- Changed: Analytics now only runs on allowed hostnames, defaulting to the canonical Vive domain plus `www`; preview or local analytics collection requires an explicit `VITE_ANALYTICS_ALLOWED_HOSTS` override.
- Removed: Project docs no longer carry the retired temporary Vercel production hostname as a current-looking canonical target.
- Preserved: `npm run qa:analytics` still verifies Google Analytics route-change tracking and Microsoft Clarity script insertion by explicitly allowlisting the local QA host.

## 2026-07-08 - Microsoft Clarity Analytics Added

- Added: `SiteAnalytics` now loads Microsoft Clarity when analytics are enabled and `VITE_CLARITY_PROJECT_ID` is configured.
- Preserved: No cookie banner or local Clarity Consent API flow was added; normal Clarity cookies are allowed where Microsoft/project settings allow them. This implementation was later accepted as the live operating baseline.
- Added: The enquiry form is explicitly Clarity-masked, and `npm run qa:analytics` now verifies both GA route-change tracking and the Clarity script path with third-party analytics requests intercepted.

## 2026-07-08 - Design-System Icon Candidates Removed

- Removed: Deleted the historical `docs/design-system/icon-candidates/` and `docs/design-system/icon-candidates-ai/` export folders.
- Preserved: Active favicon, touch, and web-app icon assets remain in `public/`, with public-site tests still checking served icon dimensions.
- Changed: Design-system scope and migration notes now record historical icon candidates as removed reference material.

## 2026-07-08 - Social Preview Image Added

- Added: Generated the shared 1200x630 social preview image at `public/og-vive-counselling.png`.
- Changed: Social image alt metadata now describes the finished preview card, and public-site tests check the social image dimensions.
- Closed: Archived `DEBT-26`; the configured Open Graph/Twitter image path now resolves in the built site.

## 2026-07-08 - SEO Discoverability Review

- Added: Live SEO and discoverability review for the four currently allowed pages: Home, Working with Joel, Inclusion, and Contact.
- Confirmed: Allowed pages are indexable, canonicalised, present in the sitemap, allowed by robots, and scoring strongly in Lighthouse. Draft inclusion child pages remain excluded from search.
- Preserved: Remaining SEO and trust work is tracked through `DEBT-27`, `SITE-11`, `SITE-14`, `SITE-15`, `SITE-16`, and `SITE-17`.

## 2026-07-08 - Indexing Enabled For Approved Pages

- Changed: Canonical metadata now defaults to `https://vivecounselling.com.au`, and the temporary site-wide `noindex, nofollow` metadata/header layer has been removed.
- Changed: `sitemap.xml` now advertises only Home, Working with Joel, Inclusion, and Contact/Fees; `robots.txt` allows crawling and points to that sitemap.
- Preserved: Draft Inclusion child pages remain direct review routes but stay out of production links, sitemap output, and indexing through route-level `noindex, nofollow`.

## 2026-07-08 - Inclusion Child Pages Made Draft-Linked

- Changed: Production UI no longer links to the Kink/BDSM, ENM/polyamory, or LGBTQIA+ Inclusion child pages from the header, Home page, or Inclusion hub; local development builds still show those links.
- Preserved: The child pages remain direct routes for review and carry route-level `noindex, nofollow` metadata while the broader site-wide pre-launch noindex layer remains active.
- Updated: `SITE-23` indexing notes now preserve the draft child-page noindex policy until those pages are explicitly approved for public indexing.
