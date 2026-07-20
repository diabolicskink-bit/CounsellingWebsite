# Task Log

Curated milestone history for durable project state. This is not a full changelog; Git remains the detailed implementation history.

## How To Use This Log

- Read this for important project milestones and durable context.
- Use `current-scope.md` for exact current scope.
- Use `project-debt.md` for technical pressure.
- Use `launch-readiness.md` for launch gates and review passes.
- Use `site-backlog.md` for concrete deferred visitor-facing change work.
- Use `docs/design-system/current-scope.md` for design-system scope.
- Use [archive/task-log-2026-06.md](archive/task-log-2026-06.md) only when June 2026 milestone history matters.

## Admission Rule

- Add entries for public behaviour changes, documentation governance changes, major design-system state changes, deployment/testing posture changes, API/form milestones, or tracker creation/resolution.
- Skip routine bug fixes, tiny cleanup, pure investigations, and review-only notes unless they change durable project state.
- Keep entries to 2-4 bullets focused on what is now true.

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
- Preserved: The route remains a draft with route-level `noindex, nofollow` metadata and stays out of production navigation and the sitemap pending owner copy review and launch sign-off.
- Verified: Production build and prerendering pass. Final responsive and browser review is deferred while the owner works through the page section by section.

## 2026-07-14 - Product Direction Rebuilt As A Decision Brief

- Rebuilt: `product-direction.md` now separates practice context, site purpose, audiences, visitor decisions, positioning, success criteria, non-goals, accessibility, and the active positioning constraint.
- Removed: The unexplained register marker, adjective stacks, imagined visitor psychology, anti-reference catalogue, and slogan-like design principles no longer serve as product requirements or voice examples.
- Clarified: Product direction records strategy; writing guidance owns operational wording and voice, while current scope and source own exact implementation facts.
- Preserved: Inclusion as ordinary working knowledge, practical decision support, claim restraint, accessibility, and a clear enquiry path remain central product decisions.

## 2026-07-14 - Active Project History Partitioned

- Moved: Resolved and superseded `DEBT-*` and `SITE-*` summaries now live in dedicated archive files outside their active trackers; an empty `LAUNCH-*` archive establishes the same convention for completed launch gates.
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
- Linked: `LAUNCH-3` now points SEO readiness at both rendering follow-up items.

## 2026-07-08 - Contact Crisis FAQ Added

- Changed: The Contact/Fees FAQ now states that the form is not for emergency contact and gives concrete Australian crisis-support options: `000`, Lifeline, and Suicide Call Back Service.
- Preserved: The enquiry form remains positioned for non-urgent contact, with the FAQ and structured FAQ schema sharing the same plain-text answer.
- Closed: Archived `SITE-12`; remaining launch trust/practical-detail tracking now excludes the crisis-support resource item.

## 2026-07-08 - Temporary Vercel Production Host Retired

- Changed: Analytics now only runs on allowed hostnames, defaulting to the canonical Vive domain plus `www`; preview or local analytics collection requires an explicit `VITE_ANALYTICS_ALLOWED_HOSTS` override.
- Removed: Project docs no longer carry the retired temporary Vercel production hostname as a current-looking canonical target.
- Preserved: `npm run qa:analytics` still verifies Google Analytics route-change tracking and Microsoft Clarity script insertion by explicitly allowlisting the local QA host.

## 2026-07-08 - Microsoft Clarity Analytics Added

- Added: `SiteAnalytics` now loads Microsoft Clarity when analytics are enabled and `VITE_CLARITY_PROJECT_ID` is configured.
- Preserved: No cookie banner or local Clarity Consent API flow was added; normal Clarity cookies are allowed where Microsoft/project settings allow them, and the remaining analytics policy sign-off stays in `LAUNCH-5`.
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

## 2026-07-08 - Launch Indexing Enabled For Approved Pages

- Changed: Canonical metadata now defaults to `https://vivecounselling.com.au`, and the temporary site-wide `noindex, nofollow` metadata/header layer has been removed.
- Changed: `sitemap.xml` now advertises only Home, Working with Joel, Inclusion, and Contact/Fees; `robots.txt` allows crawling and points to that sitemap.
- Preserved: Draft Inclusion child pages remain direct review routes but stay out of production links, sitemap output, and indexing through route-level `noindex, nofollow`.

## 2026-07-08 - Inclusion Child Pages Made Draft-Linked

- Changed: Production UI no longer links to the Kink/BDSM, ENM/polyamory, or LGBTQIA+ Inclusion child pages from the header, Home page, or Inclusion hub; local development builds still show those links.
- Preserved: The child pages remain direct routes for review and carry route-level `noindex, nofollow` metadata while the broader site-wide pre-launch noindex layer remains active.
- Updated: `SITE-23` launch-indexing notes now preserve the draft child-page noindex policy until those pages are explicitly approved for public indexing.
