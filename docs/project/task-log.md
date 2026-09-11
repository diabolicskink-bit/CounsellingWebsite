# Task Log

Selected milestones and decision context that help later work. Git retains detailed implementation history and earlier versions of these entries. This file holds the current month's milestones; completed months live in the [history archive](archive/README.md#task-history).

## How To Use This Log

- Search relevant history when continuing work or investigating why something changed; the log is optional context, not a prerequisite for every task.
- Use [current-scope.md](current-scope.md) for current system understanding and source owners, [AGENTS.md](../../AGENTS.md) for working rules, and the [project map](README.md) for specialist guidance. Dated descriptions of old workflows or design contracts do not override their current owners.
- Use [project debt](project-debt.md) and the [site backlog](site-backlog.md) for outstanding work. Historical verification and environment statements describe observations at that date, not present deployment status.
- Search this file and `archive/task-log-*.md` together when a topic spans months. The archive index gives each month's main subjects.

## Admission Rule

- Record a consequential capability, behaviour or runtime boundary, an owner decision with lasting consequences, a governance change, or a significant release/migration/verification milestone. Ask whether the entry will help a later agent understand a decision or avoid rediscovering an important constraint.
- Skip routine fixes, CSS or wording refinements, review-only notes and step-by-step task progress. Tracker creation or closure alone does not warrant a milestone; the tracker retains its own history.
- Usually use 2-4 bullets: the outcome, the reason or tradeoff when recorded, and a link to the relevant current owner or source. Preserve useful decision context rather than listing files, selectors and every check. Do not invent a rationale retrospectively.
- Include environment, release or verification details when they change what later work can safely assume. Distinguish implementation, local/mocked checks, Preview verification and confirmed Production release; retain consequential gaps in their current owner as well as dated history.

## Maintenance

- Put newest dates first. Consolidate related steps into one milestone when the combined outcome is more useful; use the last change date in its heading and name earlier dates where sequence matters. Keep separate decisions or releases distinct.
- When adding the first entry for a new month, move completed months to `archive/task-log-YYYY-MM.md` and update the archive index. Preserve links to moved entries or update their incoming references.
- Condense older history around decisions, outcomes and consequential transitions. Git preserves routine detail. Retain meaningful dates and tracker IDs; replace superseded pending statements with the recorded later outcome, and ensure unresolved work remains discoverable through its current owner. Routine log maintenance does not need its own milestone.

## 2026-09-10 - Staging Integration Made Owner-Directed

- Updated [AGENTS.md](../../AGENTS.md#git-and-release-workflow) so completed work remains on its working branch until the owner explicitly requests staging integration as part of the release flow. Task completion, passing checks and Preview approval alone do not trigger a merge.
- Aligned the dashboard handoff with that boundary and made the Production-release instruction conditional on the owner's release request.

## 2026-09-10 - Milestone History Curated

- Consolidated June-August history into monthly summaries and reduced repeated September milestones, preserving significant decisions, rollout dates and verification limits while leaving implementation detail in Git.
- Tightened admission around lasting decision value, added monthly archiving and consolidation guidance, and linked historical subjects to current owners so old instructions remain distinguishable from active guidance.

## 2026-09-10 - Consult CTA First-Party Event Added

- Added a property-free `consult_cta_clicked` event when visitors activate the primary “Request a free consult” action in the shared Contact invitation; its existing page-view association identifies the source page without adding CTA metadata.
- Added the forward-only `0011_add_consult_cta_event.sql` migration and focused API, migration, browser, and private-timeline labelling coverage. The event remains first-party only; Preview and Production independently applied `0011` before the Production code release.

## 2026-09-10 - IDE Browser Workflow Aligned

- Made persistent Node, repository Playwright and installed Chrome the explicit IDE route, disabling four competing Vercel browser/verification skills while retaining other Vercel capabilities.
- Aligned automated Playwright tests with installed Chrome to remove the managed-browser download dependency. Retained bounded helper execution, cleanup, launch diagnostics and error capture before navigation.
- Rebuilt [visual-verification.md](visual-verification.md) around readiness, grouped captures and cause-based troubleshooting; [AGENTS.md](../../AGENTS.md) retained ownership of verification scope.

## 2026-09-10 - Agent Working Rules Reorganized

- Reorganized [AGENTS.md](../../AGENTS.md) around task modes, relevant reading, engineering, Git flow and maintenance. Code reviews included justified fixes by default, while findings-only requests and documentation/copy assessments remained read-only unless changes were requested.
- Made focused, proportionate checks the default and placed dashboard browser verification with the owner through working-branch Preview when needed. Agents retained source and contract checks plus verification of affected public tracking/privacy boundaries.
- Removed mandatory site-backlog consultation and duplicated specialist procedures while preserving the working-branch to staging to master flow.

## 2026-09-10 - Public Writing Policy Rebuilt

- Rebuilt [writing direction](writing-direction.md) around natural writing, the commercial role of practice/service copy, proportionate factual checks and editorial freedom. Removed standing page-content hierarchies and placement instructions.
- Added [article-writing.md](article-writing.md) for authoring, evidence and APA references, separating it from [publication procedures](article-publishing.md). Recorded the owner's article preference as a blend of postgraduate research writing and a compelling blog article.
- Aligned routing and copywriter guidance without treating existing articles as fixed templates or assuming all public writing serves the same sales purpose.

## 2026-09-10 - Practice Reference Made Factual

- Replaced `practice-direction.md` with [practice-context.md](practice-context.md), preserving practice facts, expertise, lived experience, commitments and approach while removing messaging priorities and page-placement rules.
- Updated document and skill routing to the factual role. The separate public-writing milestone records the subsequent policy revision.

## 2026-09-10 - Agent System Guide Rebuilt

- Rebuilt [current-scope.md](current-scope.md) around capabilities, connected flows, source ownership, runtime/privacy boundaries and verification instead of granular page-presentation descriptions.
- Added source-backed context about local/deployed runtimes, rendering, enquiries, analytics, dates, configuration and migrations. Kept the Production migration difference as a dated observation requiring rechecking.

## 2026-09-10 - Phone Enquiries Added To Private Reporting

- Classified Contact phone-number clicks as enquiry signals across daily visits, monthly reporting, timelines and paid-keyword attribution while retaining the precise `phone_link_clicked` event in stored data.
- Separated form sends, phone enquiries, failed outcomes and form send rate; a number click did not prove a call was placed or answered. Current definitions belong to the [analytics system guide](current-scope.md#analytics-and-data-meaning).
- Recorded `0010_add_phone_link_event.sql` applied independently to Production ahead of deployment, bringing both environments through `0010` at this milestone. The consult CTA entry records the subsequent `0011` migration.

## 2026-09-09 - Contact Phone Analytics Added

- Added controlled `phone_link_clicked` events to GA4 and the first-party ledger for Joel's Contact-page phone link; crisis-support numbers remained excluded.
- Added `0010_add_phone_link_event.sql` and focused API, migration and browser contracts. The task recorded Preview at `0010` and Production at `0009` pending release; the [10 September phone-reporting milestone](#2026-09-10---phone-enquiries-added-to-private-reporting) records the subsequent Production application. Current recorded environment state belongs to the [system guide](current-scope.md#runtime-configuration-and-deployment).

## 2026-09-09 - Copywriter Rebuilt Around Natural Writing

- Rebuilt [copywriter](../../.agents/skills/copywriter/SKILL.md) around idiomatic wording, connected prose, functional context and proportionate expression; ordinary useful ideas no longer had to demonstrate originality or memorability.
- Established broad editorial freedom within the brief and fidelity for narrower edits, recasting owner-taste notes as reusable feedback and removing old page instructions, rejection lists and published-copy voice templates.
- Limited automatic invocation to editorial work on public-facing wording; other work required explicit invocation. Aligned writing and page-copy routing with this boundary.

## 2026-09-09 - Article Presentation And Sample States Removed

- Removed unused custom-presentation and sample states so every published article used one shared shell and appeared as an indexable sitemap entry. This retired the optional presentation mechanism introduced in August and used briefly for perfectionism in September.
- Centralised document title/robots metadata and made visible and structured breadcrumbs follow Articles to the current title, avoiding topic hierarchy without matching archive routes.
- Updated [article publishing](article-publishing.md), the system guide and ArticleHero's [component contract](../design-system/components.md) to match the simplified model.

## 2026-09-09 - Contact Invitation Redesigned

- Replaced the compact closing invitation across its five consumers with the owner-selected two-part invitation/fees composition and closing action row, recomposed in reading order on narrower screens.
- Preserved the consult explanation, contact choices and individual/couples fees within the shared [ContactInvitation contract](../design-system/components.md).

## 2026-09-09 - Public Route Metadata Refined

- Implemented the owner-selected search/social wording review, clarifying Australia-wide online delivery and distinct route purposes while preserving explicitly approved metadata.
- Expanded practice, practitioner, service and offer descriptions in structured data. Current emitted metadata and its owners are mapped in [current scope](current-scope.md#rendering-routing-and-discoverability).

## 2026-09-09 - Kink-Aware Therapy Article Expanded

- Revised the article twice that day, ending with the owner-supplied expanded account of disclosure, therapist competence, wellbeing, relationships, trauma, consent and counselling, supported by 22 linked references.
- Set the visible/metadata title to `Kink-Aware Therapy and the Psychology of BDSM`, replaced the abstract/search description and preserved the canonical route and recorded substantive revision date. [Article publishing](article-publishing.md) owns the content workflow.

## 2026-09-09 - Self-Critical Perfectionism Article Republished

- Replaced the earlier publication with the supplied expanded draft and 20 linked sources, restored it to the Articles index, and set its publication date to 9 September while retaining the canonical route and concise metadata title.
- Returned it to standard Markdown and removed its page-specific React body/styles. The optional presentation mechanism was subsequently retired in the separate article-model milestone above.

## 2026-09-04 - Article Citations Made Addressable

- Linked the kink article's in-text citations to stable author/year reference anchors that survive bibliography reordering and the local editor.
- Added visible selected-reference feedback after in-page jumps. The citation and reference model is documented in [article publishing](article-publishing.md).

## 2026-09-04 - Direct Phone Contact Added

- Added Joel's public number as an accessible `tel:` link beside email, with direct contact details and practice hours beneath the enquiry introduction.
- Kept the form as the primary Contact route; subsequent phone tracking and reporting have separate milestones above.

## 2026-09-04 - Kink Article Search Language And Route Changed

- Adopted `kink-aware therapy` as the primary visible/search phrase and moved the article to `/articles/kink-aware-therapy`, permanently redirecting its former URL.
- Updated canonical, sitemap, structured-data and internal route sources, added a specialist-service link, and recorded the substantive revision date.

## 2026-09-04 - Unintended Web-App Installation Removed

- Removed the web-app manifest and discovery link so mobile browsers no longer received metadata promoting Vive as an installable standalone app.
- Retained favicon, touch/device icons and browser theme metadata.

## 2026-09-02 - First-Party Analytics Collection Expanded

- Added controlled Instagram, LinkedIn and email-link events linked to the active visit/page independently of GA and Clarity. Added request-derived coarse location: Australian state/territory or overseas country, with no stored city, postcode, coordinates or raw IP.
- Added migrations `0008_add_contact_link_events.sql` and `0009_add_visit_location.sql` with focused contracts. The task recorded Preview and Production independently migrated through `0009`, and the combined staging deployment ready before release. Current procedure belongs to [database/README.md](../../database/README.md).

## 2026-09-02 - Analytics Reporting Expanded

- Added location, device and outbound-action signals to daily reporting, Pages, enquiry context and retained visitor timelines without treating social clicks as enquiries.
- Extended protected report shapes, SQL and focused checks while preserving owner-only access. Current data meanings belong to the [analytics system guide](current-scope.md#analytics-and-data-meaning).

## 2026-09-02 - Sample Articles Removed

- Removed the ant and dinosaur sample publications and their templates/presentations; their former URLs used the ordinary Not Found boundary.
- The generic sample/presentation capability remained temporarily, then was retired on 9 September as recorded above.

## 2026-09-02 - Self-Critical Perfectionism Article First Published

- Added the supplied article with 17 references and an optional metadata-title override so the concise search title could differ from the visible headline.
- Added a page-specific reading treatment later that day. The 9 September republication replaced the content/reference set and returned the body to standard Markdown.

## 2026-09-02 - Article Publishing Language Standardised

- Standardised the domain on article terminology across source, routes, types and documentation, with `/articles` and `/articles/:slug` as the public route contract.
- Aligned collection/article structured data, navigation, analytics, prerendering and sitemap handling. Breadcrumb hierarchy was subsequently corrected on 9 September; [article publishing](article-publishing.md) describes the current contract.

## 2026-09-01 - Local Article Editor Added

- Added development-only `/article-editor` for existing Markdown bodies and structured reference fields, supporting reference addition, removal and alphabetical ordering.
- Restricted saving to the selected article's body/reference template through a localhost-only Vite endpoint. Metadata stayed source-only and the editor was excluded from Production; [article publishing](article-publishing.md) owns editing boundaries.

## 2026-09-01 - Article Body And Reference Model Established

- Separated typed per-article body/reference modules from the lightweight publication manifest and pairing registry, making references structured content with one renderer.
- Established a dedicated centred reading composition below ArticleHero. Reference handling evolved that day from numbered Markdown entries to an unnumbered hanging-indent ledger with visible source URLs, with APA 7 as the editorial convention.
- Current content structure and reference rules belong to [article publishing](article-publishing.md) and [article writing](article-writing.md).

## 2026-09-01 - Shared Hero And Naming Contracts Promoted

- Established the `site-*` public CSS namespace, role-based component names and owned token prefixes while leaving feature-local styles outside the public API.
- Promoted `.site-hero`, its eyebrow/statement roles and ArticleHero after checking consumers; consolidated shared frame/foreground roles while retaining page-owned composition. Standardised the supported surface as `.site-hero-surface` and moved promoted source/specimens out of the legacy register.
- Current naming and reuse authority belong to [design governance](../design-system/governance.md) and its active catalogues.

## 2026-09-01 - Article Publishing Foundation Strengthened

- Separated lightweight metadata from article bodies and lazy-loaded public article pages in the browser while preserving complete synchronous build-time rendering.
- Validated required metadata, ordered real dates, matching bodies and sitemap modification dates, with focused script/browser coverage. The then-supported custom-presentation field was removed on 9 September; [article publishing](article-publishing.md) owns today's schema.

## 2026-09-01 - Private Analytics Visual Boundary Clarified

- Closed `DEBT-41` without a source change after the owner clarified that dashboard CSS and visual direction could be independent without requiring separate browser, bundle or stylesheet architecture.
- Updated [AGENTS.md](../../AGENTS.md) so sharing global styles or generic foundations alone did not constitute dashboard debt.
