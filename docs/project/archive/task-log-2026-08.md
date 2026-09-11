# Task Log - August 2026

Consolidated August milestones, ordered by the last dated change in each group. Earlier steps retain their dates where sequence matters. Deployment and verification statements are dated observations, not fresh checks. Git retains implementation detail and the original entries.

Use the [current system guide](../current-scope.md) for implementation and source owners, the [project map](../README.md) for current guidance, and the [archive index](README.md) for other months. The [active log](../task-log.md) owns admission and maintenance guidance.

## 2026-08-31 - Enquiry Form And Delivery Contract Strengthened

- Made name, email and message available before the enquiry-path decision. Appointment and consult requests shared availability/timezone questions, with phone details also collected for consults; the full native form remained available without JavaScript.
- Centralised path values and limits, rejected overlong content instead of truncating it, removed the retired state/territory API, and aligned required cues, conditional labels and duplicate-submission protection.
- Moved best-effort analytics persistence off the email-delivery critical path. Focused API, native-form, public-flow, origin and email-safety coverage supported the change, and `SITE-21` was resolved.

## 2026-08-31 - Private Analytics Split Into Report Pages

- Split the owner-only dashboard into lazy-loaded Daily, Pages, Enquiries, Keywords and Excluded report pages. Each route retained its URL-backed workflow, with shared loading, formatting and visit-history behaviour.
- Added runtime validation of protected response shapes and focused contract/sort checks. Current report boundaries belong to the [analytics system guide](../current-scope.md#analytics-and-data-meaning).

## 2026-08-31 - Crisis Support Route And Source Context Established

- Added `/crisis-support` on 12 August with immediate-danger guidance, national crisis lines and state/territory public mental health services, official source links and a public verification date. Contact and the shared footer supplied permanent entry points.
- On 31 August, clarified the distinction between crisis-line support and public mental health assessment, and made the publisher, authorship and review date explicit in visible content and structured data.
- Route, prerendering, sitemap, phone-destination and focused accessibility checks accompanied the original implementation. This history does not verify current service details or availability.

## 2026-08-31 - Public Reduced-Motion Baseline Completed

- Audited public styles and added the remaining generic button-lift fallback, completing the recorded reduced-motion baseline.
- Updated the accessibility monitor after focused browser checks and resolved `SITE-7`; the [monitor](../../checklists/accessibility-monitor.md) retains review state.

## 2026-08-28 - Public And Analytics Verification Responsibilities Simplified

- On 14 August, replaced the duplicated desktop/mobile browser inventory with focused public scenarios, retaining meaningful hydration, navigation, progressive-enhancement, enquiry, privacy, overflow and accessibility checks. Detailed generated artifacts stayed with their source/build owners; `DEBT-34` was resolved.
- On 28 August, separated private-dashboard cases from the public browser suite and broadened the fast analytics gate around recording, lifecycle, retention, report, exclusion, host and migration contracts.
- Kept detailed dashboard presentation with Preview owner review. Current scope and browser restrictions belong to [AGENTS.md](../../../AGENTS.md), not the historical test inventory.

## 2026-08-25 - Visit Client Diagnostics Added

- Added bounded request user-agent, server-derived device category and nullable `navigator.webdriver` diagnostics, immutable after first visit insertion and exposed only through protected reporting.
- Added focused API, SQL and recorder checks. The task recorded migration `0007_add_visit_client_environment.sql` applied independently to Preview and Production.

## 2026-08-24 - Serverless Function Packaging Hardened

- Replaced per-function file inventories with one rule packaging the complete `src` tree for TypeScript API functions, removing the maintenance path that repeatedly omitted valid runtime imports.
- Retained a focused configuration contract and made deployed Preview initialization the evidence needed for actual function packaging. Local configuration checks alone did not prove deployment behaviour.

## 2026-08-19 - Practitioner Tabs Progressively Enhanced

- Made all three approach sections readable in generated HTML without JavaScript, with retained labelled panels and keyboard tab selection after hydration.
- Focused native/hydrated checks supported completion of `DEBT-35` while preserving the existing presentation.

## 2026-08-19 - Scoped Quality Review And Cleanup Sweeps Separated

- Added [code-quality-pass](../../../.agents/skills/code-quality-pass/SKILL.md) for holistic improvement of a named implementation surface, including relevant callers and dependencies, scaled to the small owner-operated site.
- Renamed `improve-codebase` to [cleanup-sweep](../../../.agents/skills/cleanup-sweep/SKILL.md) and limited source-selected sweeps to explicit invocation. Ordinary cleanup, review and refactoring retained the user's stated scope.

## 2026-08-17 - Kink And BDSM Page Redesigned

- Replaced three repeated heading-and-prose sections with distinct content forms: a five-term fluency index, a mirrored pair of opposite therapeutic misreadings, and a proportion statement giving kink the same weight as other reasons for counselling.
- Preserved the shared specialist hero, canonical Contact invitation, established identity anchors and substantive page copy. The page-scoped stylesheet was rebuilt mobile first around the new composition.
- Superseded `SITE-19` because the low-contrast terminology cells it tracked no longer existed; focused axe checks at 320, 390 and 1280 pixels recorded no violations.

## 2026-08-17 - Page And Paid-Keyword Reporting Added

- Added a bounded date-range page breakdown on 16 August and a paid-keyword report on 17 August over the existing visit, page, event, exclusion and bot data. Keyword reporting included coverage, depth, active time, enquiry visits and returning context without displaying GCLIDs.
- Kept reporting reads aggregated and made the private-route collection exclusion case-insensitive in the client and API; existing private rows were removed from Preview data.
- Refined daily reporting to keep outcomes with their visit context, let successful retries take precedence in summaries while preserving all timeline events, and hide stored GCLIDs from daily/history display without changing collection.

## 2026-08-16 - Active Time And Fees Attribution Added

- Added cumulative visible-page time, reported periodically and on hide/route exit. Bounded, identity-checked, idempotent updates replaced prior measurements rather than creating heartbeat rows; migration `0006` was recorded as applied independently to both databases during release.
- Distinguished Fees-labelled arrivals using the controlled virtual `/fees` path in first-party analytics and GA while continuing to render Contact. Ordinary Contact and enquiry links retained `/contact` attribution.

## 2026-08-16 - Enquiry Journeys And Reversible Exclusions Released

- Added a controlled visit-event ledger linking client contact choices/form starts and server submit attempts/outcomes to existing visits and optional page views. Sent events followed Resend acceptance; recording failures did not change visitor-facing enquiry outcomes.
- Added an Australia/Perth calendar-month enquiry report and interleaved multi-visit histories. Reversible visitor exclusions filtered retained and future visits server-side without deleting their data; retention removed exclusion markers after their last retained visit expired.
- Applied `0004_create_visit_event_ledger.sql` and `0005_create_analytics_visitor_exclusions.sql` to the separate Production database before releasing the staging candidate. Preview and Production were independently current through `0005` at that milestone.
- Recorded successful live protected-page/API authentication and responses after release. These checks preceded later reporting and schema changes.

## 2026-08-16 - Production And Preview Database Boundaries Separated

- On 15 August, restricted Production Neon credentials and report authentication to Production, scrubbed non-production environment snapshots, and deleted affected Preview deployments to invalidate their retained credentials. No Production ledger data was deleted; `DEBT-38` was resolved.
- On 16 August, restored Preview analytics against its own existing, fully migrated database, with environment-wide authentication, hostname support for generated Preview URLs and a dedicated migration command. Development stayed disconnected from both deployed databases.
- This replaced the temporary Production-only workflow with the two-database model. Current environment selection and migration procedure belong to [database/README.md](../../../database/README.md).

## 2026-08-15 - Bot Classification And Optional Visibility Added

- Added best-effort BotID classification without blocking bots: nullable/unclassified visits remained ordinary traffic, positive verdicts persisted, and explicit bots were excluded from report totals/history by default but could be included through a URL-backed toggle.
- The classification task prepared migration `0003` and recorded Production application/live BotID verification as outstanding at that point. Later release entries record newer schema versions; the original task did not itself verify the deployed BotID flow.

## 2026-08-15 - Private Visit Reporting Connected

- Connected unlisted `/analytics` and its read API to Neon behind Vercel HTTP Basic Authentication, replacing fictional fixtures with daily Australia/Perth activity and retained anonymous-visitor journeys. Credentials and read access stayed server-side.
- Added a clean document boundary excluding private reporting from third-party analytics. Serialized same-document writes, handled concurrent visibility and page collisions, and stabilised migration hashes; these changes did not establish ordering across every independent document.

## 2026-08-15 - Public Practice And Enquiry Paths Expanded

- Reworked Home's broad practice account on 6 August and specialist-practice section on 11 August, giving kink/BDSM, ENM/polyamory and LGBTQIA+ destinations explicit practice context while leaving detailed approach material on Working with Joel.
- Extended the promoted Contact invitation to specialist pages on 11 August and Working with Joel on 15 August, which also gained a direct hero contact action. The component rollout retained the appointment, consult and general-enquiry choices.

## 2026-08-14 - First-Party Visit Ledger Released

- On 13 August, defined retained new/returning visitor reporting, source/ad queries, 12-month browser-ID rotation and a protected daily retention job. Connected a non-production Neon resource with checksum-tracked transactional migrations and verified Preview writes, returning visits, page ordering and the retention endpoint.
- Prepared Production configuration and released the reviewed staging candidate on 14 August, allowing recording only on Vive's apex and `www`. Recording failures remained isolated from the visitor experience; reporting was server-side.
- Recorded successful live endpoint/host checks and no immediate Vercel runtime errors; natural Production rows were subsequently confirmed. The initially shared resource was separated from non-production access on 15 August, with independent Preview restored on 16 August.

## 2026-08-14 - Editorial Material Palette Expanded

- Promoted the six-token warm-paper, sage, green and rule palette with semantic/contrast contracts, consolidating matching consumers across public editorial pages and development document/catalogue surfaces.
- Preserved distinct canvas, navigation/footer and page-specific colour roles instead of merging values merely because they looked alike. Current tokens and roles live in [foundations](../../design-system/foundations.md).

## 2026-08-13 - Public Route Parity Enforced

- Made route constants carry final hrefs and derived prerender/test inventories from existing contracts. Added route/metadata and redirect-destination checks without introducing another shared route manifest, resolving `DEBT-8`.

## 2026-08-13 - Dormant Inherited Presentation Removed

- Removed unmounted card, topic, checklist, fee, detail, CTA and hero selector families, orphaned tokens, unused `SectionHeading` and the unused tertiary Button variant after consumer checks. Retained live page and shell implementation and reconciled the legacy register.

## 2026-08-12 - Code-Managed Article Publishing Added

- Added the public Articles index and statically rendered article routes with a typed content registry, Markdown bodies, dates, references, metadata and sitemap handling. Focused build, script and browser checks covered navigation, native content, unknown slugs and discoverability.
- Initially included optional React body presentations and noindexed sample publications. September work removed those states and standardised the publication model; current storage and publication rules belong to [article-publishing.md](../article-publishing.md).

## 2026-08-06 - Public-Copy Context And Research Use Clarified

- Added `practice-direction.md` as the then-current practice/positioning reference and simplified copy workflows so audience and market research required owner selection. Whole-page planning and durable handoffs remained distinct from ordinary section drafting.
- Routed public wording through the repository writing authority and copywriter. The practice reference was made factual and renamed in September; current owners are [practice context](../practice-context.md) and [writing direction](../writing-direction.md).

## 2026-08-05 - Current-Only Design System Established

- Replaced the mixed lifecycle catalogue with promoted-only Foundations, Components and Patterns, separating inherited implementation into the non-authoritative legacy register. Source presence and rendered examples did not establish reuse permission or safe removal.
- Moved promoted production CSS into `src/design-system/` while retaining one bundled stylesheet, with inherited shared CSS outside that source entry. Split the development workspace into category routes rendering real supported implementations.
- [Design governance](../../design-system/governance.md) became the owner of promotion/removal rules; completed removals belonged in Git and history rather than a retired-item catalogue.

## 2026-08-05 - Initial Shared Foundations And Contact Invitation Promoted

- Promoted `--cedar` on 3 August, then portrait materials, warm-section treatment, shared hero surface and body/lead reading roles on 5 August after checking semantic roles and consumers. The reading scale received a later adjustment on 13 August; exact values remain in source and current contracts.
- Promoted ContactInvitation as the first supported React component and migrated Home's closing section. Its later specialist/practitioner rollout is recorded above.
- Kept composition, measures, contextual treatments and unmatched colours page-owned. Removed the obsolete light hero helper and unused noise asset during migration; promotion did not extend to similar literals or adjacent inherited implementation.

## 2026-08-03 - Outdated Rendered Design Catalogue Retired

- Quarantined and then removed the five `/design-language/*` routes after checking that they had no Production consumers. Added a separate development-only `/design-system` workspace showing real implementations approved in written contracts; it did not restore or redirect the retired snapshot.
- Introduced source-backed migration governance and `DEBT-37`. The temporary mixed lifecycle model was superseded by the current-only catalogue split on 5 August; current authority remains with [design governance](../../design-system/governance.md).
