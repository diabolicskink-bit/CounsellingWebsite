# Task Log - July 2026

Consolidated July milestones, ordered by the last dated change in each group. Earlier steps retain their dates where sequence matters. Entries describe historical decisions and observations; Git retains implementation detail and the original entries.

Use the [current system guide](../current-scope.md) for implementation and source owners, the [project map](../README.md) for current guidance, and the [archive index](README.md) for other months. The [active log](../task-log.md) owns admission and maintenance guidance.

## 2026-07-29 - IDE Visual Verification Established

- Added a repository-local managed-session helper using Playwright, installed Chrome and an isolated Vite port, with direct Playwright access also supported.
- Made [visual-verification.md](../visual-verification.md) the access-method owner. The [September alignment](../task-log.md#2026-09-10---ide-browser-workflow-aligned) subsequently updated the IDE route and automated browser selection.

## 2026-07-29 - Contact Confirmation Clarified

- Simplified successful form submissions to one focused confirmation with the owner-confirmed expectation that Joel usually replies within 24 hours.
- Preserved native fallback and status semantics; focused local rendered checks covered visibility and overflow.

## 2026-07-28 - Contact Analytics Consolidated In GA4

- On 20 July, added form-start and email intent events plus conversions emitted only after the enquiry API reported success. Visitor-entered data was excluded, failed sends produced no conversion, and analytics errors could not alter a successful form outcome.
- On 28 July, moved the contact-intent events into GA4 alongside page views, controlled `appointment` / `consult` / `question` selections and confirmed conversions. Removed Vercel Web Analytics and its dependency.
- Dedicated mocked-request checks covered enabled/disabled hosts, intent values, conversion payloads, failure suppression and Clarity loading. Current collection boundaries belong to the [analytics system guide](../current-scope.md#analytics-and-data-meaning).

## 2026-07-24 - Public Writing And Page-Copy Workflows Reworked

- Established [writing-direction.md](../writing-direction.md) and a project copywriter on 14 July, separating editorial method from practice facts and refusing to treat existing page copy or research outlines as approved templates. Added page-development artifacts on 16 July.
- From 22 to 24 July, removed repeated copy formulas and the single imagined-reader model, simplified page work into bounded planning or section artifacts, and introduced a separate cold review after drafting. These were intermediate methods, subsequently revised in August and September; current workflows live in [copywriter](../../../.agents/skills/copywriter/SKILL.md) and [develop-page-copy](../../../.agents/skills/develop-page-copy/SKILL.md).
- The former `product-direction.md` became a decision brief on 14 July, was reduced to practice facts on 22 July, and was removed on 23 July. Later practice references have their own history; the retired brief is not a source of current requirements.

## 2026-07-23 - Source-Selected Cleanup Moved To A Skill

- Moved the broad maintainability workflow into `improve-codebase`, selecting one source-supported problem and completing its behaviour-preserving resolution rather than selecting work by diff size or tracker priority.
- Unfinishable work retained a concrete debt outcome. The skill was renamed and its invocation narrowed in [August](task-log-2026-08.md#2026-08-19---scoped-quality-review-and-cleanup-sweeps-separated); the current owner is [cleanup-sweep](../../../.agents/skills/cleanup-sweep/SKILL.md).

## 2026-07-22 - Manual Review Monitors Replaced Readiness Tracking

- Replaced incomplete accessibility and responsive checklists and overlapping SEO documents with owner-directed [accessibility](../../checklists/accessibility-monitor.md), [responsive](../../checklists/responsive-monitor.md) and [SEO metadata](../../checklists/seo-metadata-monitor.md) monitors.
- Kept review dates and statuses tied to explicit inspection; automated regression coverage did not supply manual pass evidence or establish accessibility conformance.
- Retired the readiness tracker and its archive once the live site had these owners. Concrete work remained in `SITE-*`, `DEBT-*` and the relevant writing or operational workflow.

## 2026-07-22 - Planning Dialogue Preference Clarified

- Made Planning Mode actively exploratory, with useful grouped questions and no total question cap; implementation-time clarification remained tied to material consequences.
- Aligned website-design discovery with that preference. Current task and clarification rules belong to [AGENTS.md](../../../AGENTS.md).

## 2026-07-21 - Live-Site Baselines Accepted

- Accepted the existing performance, analytics and enquiry-flow checks as the live operating baselines. Copy refinement and concrete improvements continued through their normal owners without a separate final-review programme.
- Recorded passing live checks for apex-domain behaviour, redirects, canonical/social metadata, crawl artifacts, shared images and the controlled 404. Repeatable post-deploy smoke automation remained separate under `DEBT-24`; this dated result is not a current deployment check.

## 2026-07-20 - Structured Data Extended For Live Services

- Linked the specialist routes to the site-wide Organization and umbrella Service, adding route-specific service graphs, online enquiry and the then-confirmed AUD 120 / 50-minute offer.
- Kept the Organization address-free to avoid inferring or publishing a private location or incomplete address-dependent business schema. Adding the Google Business Profile identity depended on confirmation of its exact public URL.
- Build and metadata assertions covered the linked graph. Current service facts belong to [practice context](../practice-context.md), and emitted schema remains owned by source.

## 2026-07-20 - Specialist Routes Published And URLs Flattened

- On 18 July, published Kink/BDSM, ENM/polyamory and LGBTQIA+ as first-class linked, indexable routes, retiring their draft link gates and noindex rules. The LGBTQIA+ page had been rebuilt as a draft on 14 July.
- On 20 July, renamed the hub to `/inclusive-counselling` and flattened the specialist URLs to `/kink-bdsm-counselling`, `/polyamory-enm-counselling` and `/lgbtqia-affirming-counselling`.
- Permanently redirected the previously indexed `/inclusion` hub; the former unindexed child URLs did not receive redirects. Navigation, metadata, prerendering and sitemap contracts followed the new routes.

## 2026-07-17 - Audience And Market Research Separated

- Established the audience library on 16 July with parent dossiers for kink, ENM/polyamory and LGBTQIA+ clients. On 17 July, separated formal evidence and lived experiences from query, competitor, provider and market observations into distinct research skills and libraries.
- Allowed independent research streams to be delegated while keeping canonical synthesis, source IDs and dossier/index changes parent-owned. Working packets remained supporting material rather than canonical findings.
- Research remained evidence, not approved public copy or authorization to implement strategy. The [audience](../../research/README.md) and [market](../../market-research/README.md) indexes own present coverage and access rules.

## 2026-07-15 - Online-Delivery Positioning Restriction Retired

- Recorded completion of Google Business Profile verification and retired the temporary restriction on foregrounding online delivery that had been retained in the 14 July writing guidance.
- Updated Home to identify Joel, his Perth base, Australia-wide online counselling and the practice's specialist contexts. Current wording policy belongs to [writing direction](../writing-direction.md).

## 2026-07-14 - Design Direction Freed From Existing Page Patterns

- Made fresh design direction precede selection of existing components and page patterns, and strengthened the website-design method to explore structurally different concepts with choices grounded in the content and task.
- Removed `uncodixfy` and made Impeccable explicitly invoked so competing automatic visual prescriptions would not govern ordinary frontend work.
- The design-system authority model changed further in [August](task-log-2026-08.md#2026-08-05---current-only-design-system-established). Current identity anchors, creative scope and reuse rules belong to [AGENTS.md](../../../AGENTS.md) and [design governance](../../design-system/governance.md), rather than this historical relaxation.

## 2026-07-14 - Documentation Authority And Historical Archives Separated

- Made `AGENTS.md` the repository-wide rules owner and the project README the document map; separated current implementation understanding, writing policy and design-system authority.
- Classified trackers, reports, plans and task history as supporting evidence that could not override guidance or authorize additional work. Source and rendered behaviour established implementation facts, not reusable design-system approval.
- Moved resolved tracker records and June milestones into archives while retaining stable tracker IDs. Retired duplicated instruction owners and strategy mirrors.

## 2026-07-14 - Staging Integration Workflow Adopted

- Introduced long-lived `staging` between `work/*` branches and Production's `master`, with working-branch previews for isolated review and a staging preview for the combined release candidate.
- Preserved shared history when releasing staging into master, avoiding squash/rebase of the integration branch. Current Git rules belong to [AGENTS.md](../../../AGENTS.md).

## 2026-07-13 - Full Public Rendering Replaced The Temporary H1 Shell

- Added a tactical static main/H1 fallback on 8 July, then replaced it on 13 July with the complete React public page, navigation, media, forms and footer in generated HTML. The follow-up and retirement work had been tracked as `DEBT-32` and `DEBT-33`.
- Used route/timestamp markers to hydrate only matching artifacts, retaining guarded client rendering for development, unknown, stale and 404 paths. Builds failed when metadata lacked a matching component render.
- Standardised hero semantics on one concise H1 and a separate display paragraph, leaving H2 for page sections. Draft specialist pages gained static content before their 18 July publication.
- Accepted focused preview and artifact checks for completion; `DEBT-34` retained the separate test-maintenance concern, later resolved in August. Current rendering contracts belong to the [system guide](../current-scope.md#rendering-routing-and-discoverability).

## 2026-07-13 - Practice Identity Structured Data Established

- Added the site's `WebSite` identity on 9 July, then linked Organization, founder/practitioner Person, adult counselling Service and practitioner ProfilePage entities on 13 July.
- Reused a stable Joel identity across Home and Working with Joel, with the confirmed ECU graduate diploma, ACA Level 1 credential and public ACA verification link. Visible practitioner details were aligned with the schema.
- Held service delivery, pricing and address details until deliberately confirmed; the 20 July service milestone records the later expansion. Exact current markup belongs to source rather than this historical field list.

## 2026-07-13 - Dead Presentation And Asset History Removed

- Removed historical icon-candidate folders on 8 July, unused legacy issue/topic selectors on 10 July (`DEBT-19`), and unused spotlight selectors on 13 July (`DEBT-36`) after checking consumers.
- Preserved active public assets and presentation. These bounded removals did not classify every retained style as reusable or authorize further cleanup.

## 2026-07-08 - Analytics Host Boundary And Clarity Added

- Restricted analytics to allowed hosts, defaulting to the Vive apex and `www`, so retired temporary, local and Preview hosts required explicit opt-in.
- Added Microsoft Clarity with explicit enquiry-form masking and mocked loading checks alongside GA route tracking. No cookie banner or local Clarity Consent API flow was introduced; this was later accepted as the live baseline.

## 2026-07-08 - Public Indexing And Social Preview Enabled

- Switched canonical metadata to `https://vivecounselling.com.au`, removed the site-wide noindex guard, and advertised Home, Working with Joel, Inclusion and Contact in the sitemap. Specialist pages remained unlinked drafts with route-level noindex until 18 July.
- Added the shared social preview image and resolved `DEBT-26`. Live discoverability checks covered the four approved pages, with remaining SEO and trust work kept in the trackers.
- Added explicit emergency-contact guidance and national crisis options to the Contact FAQ, resolving `SITE-12`; the dedicated Crisis Support route followed in August.
