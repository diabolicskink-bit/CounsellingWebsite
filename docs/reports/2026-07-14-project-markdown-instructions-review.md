# Project Markdown Instruction Framework Review

Date: 2026-07-14

Branch reviewed: `codex/ai-instructions-review`

Implementation status: Phases 1, 2, and 3 were completed on 2026-07-14. Phase 4 remains a recommendation.

## Executive Assessment

The project Markdown framework contains good decisions, but its operating model has become harder to follow than the underlying project warrants. The main problem is not the number of files by itself. It is that routing, authority, factual state, maintenance duties, and historical memory are repeated across several files without one explicit model for how they relate.

The result is a framework that asks an agent to read broadly but does not always make it clear which source wins. A routine task can be routed through two indexes, several domain documents, and three large trackers before planning begins. Meanwhile, the four tracker/history files account for about 59% of all words in the reviewed framework. That makes old or unrelated context unusually prominent.

The recommended direction is a smaller *active instruction surface*, not necessarily one giant document or the deletion of useful project memory:

1. Make `AGENTS.md` the sole repository-wide dispatcher and workflow rulebook.
2. Make `docs/project/README.md` an ownership and authority map, not a second dispatcher.
3. Define separate authority orders for requirements, factual implementation state, and design-system API status.
4. Keep current-scope files factual and move policy or temporary instructions to their proper owner.
5. Stop loading whole trackers by default; search them only when the task intersects their domain.
6. Move resolved tracker items and older task history outside the active reading path.
7. Remove manually duplicated or secondary rulebooks where they do not add a distinct responsibility.

This document began as a review. Implementation status is recorded above; recommendations not marked complete remain unimplemented.

## Scope

This review covers repository-owned Markdown that currently acts as project instruction, governance, factual scope, routing, maintenance guidance, or durable operating memory:

- `AGENTS.md`
- `PRODUCT.md`
- all Markdown under `docs/project/`
- all Markdown under `docs/design-system/`

It deliberately excludes:

- `.agents/skills/**` and all skill content or metadata;
- reports, plans, and checklists as subjects of content review;
- application code except where the Markdown framework assigns authority to it.

Reports, plans, and checklists are discussed only because the active documentation needs to state whether those artifacts are authoritative.

## Current Shape

The measurements in this section describe the framework at review time, before the Phase 2 consolidation.

The reviewed framework contains 20 Markdown files, about 27,076 words and 202 KB of text.

| Area | Files | Approximate words | Assessment |
| --- | ---: | ---: | --- |
| Root guidance and product mirror | 2 | 1,246 | Small, but contains both a universal dispatcher and a manual canonical-content mirror. |
| Project direction and current state | 4 | 4,409 | Valuable core material; `current-scope.md` carries too many kinds of information. |
| Trackers and task history | 4 | 16,023 | 59.2% of the entire corpus; active and historical material dominate agent reading. |
| Design-system documentation | 10 | 5,398 | Generally well partitioned, but contains overlapping routing, catalogues, and authority rules. |

The default reading path is much larger than these totals initially suggest:

- `AGENTS.md` requires the project hub first.
- The hub's “For most work” path then calls for product direction, current scope, all three trackers, and sometimes the task log.
- A UI task adds the design-system hub, `ai-rules.md`, design current scope, and both pattern catalogues.
- A public UI/copy task can therefore reach eight or more documents before task-specific source inspection.

The issue is compulsory breadth. Many of these documents remain useful when selected deliberately.

## What Is Working Well

Several parts should be preserved during cleanup:

- Project scope and design-system scope are explicitly separated.
- `writing-direction.md` has a strong, intelligible source order and clearly distinguishes approved direction from source copy and research material.
- The design documentation distinguishes active, page-scoped, dev-only, legacy, and reference layers. That is valuable protection against accidental reuse.
- The design-system promotion workflow correctly allows page-specific work to remain local until reuse is proven.
- `DEBT-*`, `LAUNCH-*`, and `SITE-*` have distinct intended roles and stable identifiers.
- Trackers repeatedly state that they are memory and triage, not authorization. The principle is right even though it is repeated too often.
- The branch and release workflow in `AGENTS.md` is concise, project-specific, and important enough to remain repository-wide.
- The task log correctly states that Git, not Markdown, is the detailed implementation history.

The framework does not need to be rebuilt from nothing. It needs clearer ownership and a shorter active route through the material that already works.

## Priority Findings

| Priority | Finding | Main consequence |
| --- | --- | --- |
| P0 | There is no repository-wide authority model. | Agents can find multiple plausible instructions without knowing which one governs. |
| P0 | Design-system factual authority and approved API authority are conflated. | Source code, rendered examples, and written catalogues can point in different directions. |
| P0 | Default reading rules are over-broad. | Routine work loads unrelated trackers and historical context before planning. |
| P0 | The clarification rule does not state that its no-limit intent is specific to Planning Mode. | A useful override of the normal three-question planning limit can be misread as a general instruction to interrupt implementation. |
| P1 | Project `current-scope.md` mixes facts, architecture notes, policy, temporary instructions, and maintenance rules. | A supposedly factual document becomes a second governance layer and grows without a stable shape. |
| P1 | `PRODUCT.md` manually mirrors canonical content. | Two copies must remain synchronized and already differ in wording and structure. |
| P1 | Routing and update duties are repeated across root, project, and design-system files. | A small policy change requires coordinated edits and can leave contradictory remnants. |
| P1 | Active trackers contain their archives, and the task log is approaching changelog scale. | Resolved decisions remain in the normal context path and overwhelm current priorities. |
| P1 | `docs/design-system/ai-rules.md` behaves as a second compact rulebook. | Active layers, avoid rules, promotion rules, and update duties are maintained in multiple places. |
| P2 | Product, writing, and visual-principle documents restate some brand and anti-pattern guidance. | Ownership is less crisp and wording can drift. |
| P2 | Reports, plans, checklists, and historical artifacts have no single global authority classification. | Old analysis can be mistaken for current instruction. |

## Detailed Findings

### 1. There Is No Global Authority Model

`AGENTS.md` routes to canonical-looking documents, the project and design hubs each define local reading orders, `writing-direction.md` defines a copy source order, and `governance.md` defines a design source order. What is missing is a short repository-wide statement explaining the kinds of authority involved.

A single linear precedence list would still be insufficient because the project asks three different questions:

- **What should be done?** This is a requirements and policy question.
- **What currently exists?** This is a factual implementation question.
- **What is approved for reuse?** This is a governed API-status question.

Those questions legitimately have different answers. The framework currently tries to place them in one reading order, which creates ambiguity.

Recommended model within repository-controlled guidance:

| Question | Recommended order |
| --- | --- |
| Requirements and intent | Current user task -> `AGENTS.md` universal rules -> relevant domain policy -> an explicitly selected tracker item or plan. |
| Current implementation fact | Executable behaviour, tests, configuration, and source -> relevant current-scope summary -> task log and reports as historical evidence. |
| Approved reusable design API | Design governance and active catalogues -> design current scope -> implementation and rendered examples that have the documented active status. |

This model should also say that trackers, reports, plans, checklists, archives, and the task log do not silently become requirements.

### 2. The Design Source Order Is Internally Ambiguous

There is a real conflict between broad instructions:

- `AGENTS.md` says to use active design-system guidance before treating source files or rendered examples as reusable API.
- `docs/design-system/governance.md` says that, when design-system sources disagree, `src/styles.css`, active components, and rendered pages outrank written docs.
- The same governance list says a component counts as active only when two written documents say it is active.

The last two points are circular: the component layer outranks the docs only after the docs establish that the component belongs to that layer.

The intended distinction appears sound but is not written explicitly:

- source and rendered output are strongest evidence of what is actually implemented;
- governance and catalogues decide whether that implementation is approved reusable API.

`governance.md` should replace its single “source of truth” ladder with those two separate tests. `AGENTS.md` can then keep the concise instruction not to infer reusable API from file location or visual existence alone.

### 3. Mandatory Reading Is Too Broad

The project hub says that “for most work” agents should check all three trackers before creating plans. This makes sense as a defence against duplicate work, but the cost is high:

- `project-debt.md` is about 7,907 words;
- `site-backlog.md` is about 2,638 words;
- `launch-readiness.md` is about 1,845 words;
- all three include material unrelated to most individual tasks.

The routing should be task-triggered:

- technical, security, routing, API, deployment, test, or maintainability work: search `project-debt.md` for the affected subsystem;
- cross-site launch review or sign-off: consult `launch-readiness.md`;
- deferred concrete visitor-facing work: consult `site-backlog.md`;
- project history: consult `task-log.md` only when it resolves a real ambiguity.

“Search for related items” is preferable to “read the tracker.” Stable IDs and consistent fields make targeted lookup practical.

### 4. Planning-Mode Clarification Intent Was Underspecified

The reviewed `AGENTS.md` said to ask as many clarifying questions as are genuinely useful and explicitly warned against limiting the count, but it did not name Planning Mode. The intended purpose was to override a normal three-question total limit during planning, not to encourage repeated interruptions during implementation.

The final rule needs two explicit behaviours:

> In Planning Mode, ask as many clarifying questions as are genuinely useful and do not cap the total at three. If the interface limits each prompt to three, use additional concise, grouped rounds.

> Outside Planning Mode, ask before acting when missing information would materially change the requested outcome, scope, safety, or an irreversible decision. Otherwise make a reasonable assumption, state it when useful, and proceed.

This preserves thorough planning while avoiding unnecessary approval-like friction during implementation.

### 5. Project `current-scope.md` Is Not Purely Factual

The file describes itself as factual, but its single 49-item “Included” list combines at least six responsibilities:

- route and navigation inventory;
- documentation organization;
- public-copy governance and a temporary positioning instruction;
- prerendering and hydration architecture;
- metadata, analytics, enquiry API, and deployment details;
- test coverage and test-maintenance policy.

Examples of mixed responsibility include the instruction to preserve the temporary `online` wording constraint, the statement that agents should review tests opportunistically rather than through a separate campaign, and links that assign governance ownership. Those are not merely facts about current capability.

Recommended change:

- retain the file as a factual current-state summary;
- organize it by stable subsystem headings rather than one flat list;
- move normative writing constraints to `writing-direction.md`;
- move maintenance policy to `AGENTS.md` or the owning tracker;
- keep deep implementation details only when they materially affect how future work must interact with the system;
- link to source/configuration for details that are cheaper to inspect than to maintain twice.

A useful shape would be: public routes and visibility; content status; rendering and metadata; forms and API; analytics and deployment; tests and release gates; known gaps; explicitly excluded scope.

### 6. `PRODUCT.md` Is an Unnecessary Manual Mirror

`PRODUCT.md` says that it mirrors `docs/project/product-direction.md` for frontend tooling and must be kept aligned. This creates a maintenance obligation without creating a second distinct owner.

The copies have already diverged in small ways. For example, the canonical document qualifies the accessibility baseline with “No project-specific accessibility standard has been set,” while the mirror omits that context. The canonical document also owns a link to writing guidance that the mirror presents differently. Neither difference is catastrophic, but they demonstrate the normal drift risk of manual mirrors.

Preferred options, in order:

1. Configure the tooling to read the canonical document.
2. Generate `PRODUCT.md` from the canonical source and verify it in a lightweight check.
3. If neither is possible, reduce `PRODUCT.md` to a short adapter that points to canonical documents rather than copying their content.

The mirror should not remain a second manually edited copy of product strategy.

### 7. Dispatch and Update Rules Are Duplicated

`AGENTS.md` and `docs/project/README.md` both contain task routing. They also both state the update triggers for current scope, debt, launch readiness, site backlog, the task log, and design-system scope. Similar update rules then appear again inside the individual scope, tracker, design hub, and governance documents.

Some local repetition is useful: an owner file should say how it is maintained. The present framework goes further and creates several complete summaries of the same matrix.

Recommended ownership:

- `AGENTS.md`: short task-to-owner routing and universal rules;
- project hub: document map, authority classes, and concise descriptions;
- each owner document: its own admission/update rule;
- no second full maintenance matrix in the project hub.

This leaves one global route and one local maintenance rule, rather than a cascade of restatements.

### 8. Active and Historical Tracker Material Are Interleaved

`project-debt.md` contains 15 active items followed by 19 archived items. `site-backlog.md` contains 10 active items followed by 13 archived or superseded items. The launch tracker currently has eight active items and an empty archive. The archive entries preserve useful history, but they stay in every normal read of the active tracker.

The problem is especially visible where older `SITE-*` launch-review items were superseded by `LAUNCH-*`. The current category definitions are reasonably clear; the old overlap remains present in the primary file.

Recommended change:

- keep tracker metadata, field definitions, resolution guardrails, and active items in the primary files;
- move resolved and superseded items to `docs/project/archive/` or a single dated tracker archive;
- retain stable IDs and backlinks so searches still find historical decisions;
- do not route agents to the archive unless history is needed.

This is context partitioning, not deletion of memory.

### 9. The Task Log Has Become Close To a Changelog

`task-log.md` says it is curated and that Git is the detailed history. It nevertheless contains roughly 49 dated entries and 3,633 words, including many closely spaced implementation milestones.

The admission rule is sensible, but its practical threshold is permissive. This makes the log another large default context source and increases the effort required to decide whether a new change deserves an entry.

Recommended change:

- keep only recent, durable milestones in the active task log;
- archive older entries by year or project phase;
- record changes that alter future agents' assumptions, not every resolved implementation item;
- let tracker archives and Git hold item-level resolution history.

### 10. `ai-rules.md` Is a Second Design-System Rulebook

The file describes itself as a compact router, but it also owns substantive catalogues and policy: approved class families, prohibited layers, card choices, promotion rules, cleanup boundaries, scope-update duties, and verification requirements. Much of that material also appears in governance, current scope, component patterns, page patterns, or maintenance guidance.

Two coherent options exist:

- remove `ai-rules.md` after moving any unique verification rule to `governance.md` or `AGENTS.md`; or
- reduce it to a genuinely short preflight of links, with no active API catalogue and no duplicated policy.

Removing it is the cleaner option because `AGENTS.md` and the design-system hub already perform routing. If retained for convenience, it should be under about 20 lines and visibly non-canonical.

### 11. Product, Writing, and Visual Principles Need Sharper Boundaries

`product-direction.md`, `writing-direction.md`, and `foundations/principles.md` all discuss voice, trust, inclusion, anti-generic/anti-AI presentation, and the relationship between warmth and competence. Some repetition is helpful because words and visual design should share a direction. Full restatement is not.

Recommended ownership:

- product direction: audience, purpose, positioning, brand personality, high-level principles;
- writing direction: source order, copy status, voice mechanics, page structure, SEO language, review workflow;
- visual principles: visual consequences of the product direction, without re-owning copy rules.

The lower-level documents should link upward and translate the strategy into their medium rather than paraphrasing the whole strategy.

### 12. Supporting Artifacts Need One Explicit Classification

Individual documents say that SEO reports, old references, and plans are not mandatory instructions, but the project hub maps `docs/reports/`, `docs/plans/`, and `docs/checklists/` without one global authority statement.

Add a single classification to the project hub:

> Reports, plans, checklists, archives, and task history are supporting evidence or working memory. They do not override active project guidance or authorize work unless the current task explicitly adopts them.

This is particularly important because reports can accurately describe an earlier framework and become stale after later changes.

## File-By-File Assessment

| File | Current role | Assessment | Recommended disposition |
| --- | --- | --- | --- |
| `AGENTS.md` | Universal routing, work rules, Git workflow, update matrix | Necessary and still reasonably short, but mixes dispatch, content policy, collaboration preference, release policy, and duplicated maintenance rules. | Keep; add authority model, make the Planning Mode clarification override explicit, retain Git workflow, shorten duplicated update detail. |
| `PRODUCT.md` | Tool-facing product-direction mirror | Duplicate canonical content with manual synchronization and drift risk. | Generate, reduce to an adapter, or remove if tooling can read the canonical file. |
| `docs/project/README.md` | Project memory hub and second task router | Good map, but repeats `AGENTS.md` reading and maintenance rules. | Keep as ownership/authority map; remove the second general workflow. |
| `docs/project/product-direction.md` | Canonical strategy | Clear and appropriately project-specific. | Keep canonical; avoid duplicating its prose elsewhere. |
| `docs/project/writing-direction.md` | Operational copy governance | One of the strongest documents: clear source order, permissions, review rules, and boundaries. | Keep; move temporary or normative copy rules here when needed. |
| `docs/project/current-scope.md` | Factual whole-project state | Overloaded, flat, and partly normative. | Refactor by subsystem and restrict it to current state and meaningful operational constraints. |
| `docs/project/project-debt.md` | Technical pressure tracker | Strong item format and guardrails; extremely large because active and archive share one file. | Keep active tracker; move archive out of the default path. |
| `docs/project/launch-readiness.md` | Cross-site launch gates | Clear category and manageable active size. | Keep; consult only for launch-review work and use the same external archive convention later. |
| `docs/project/site-backlog.md` | Deferred visitor-facing changes | Useful distinction from debt, but archive contains historical category overlap with launch work. | Keep active backlog; move resolved/superseded entries to archive. |
| `docs/project/task-log.md` | Durable project history | Useful idea, but too close to a detailed changelog. | Keep recent milestone summary; archive older entries and tighten admission in practice. |
| `docs/design-system/README.md` | Design documentation hub | Good file map; repeats implementation and update information and routes through a redundant AI checklist. | Keep as design ownership map and task entry point; simplify after `ai-rules.md` decision. |
| `docs/design-system/ai-rules.md` | AI preflight and condensed design rules | Duplicates several owner documents and creates a second governance surface. | Prefer removal after promoting unique verification rules; otherwise reduce to links only. |
| `docs/design-system/governance.md` | Design authority, layers, promotion, cleanup | Important owner document, but its source order conflates implementation fact with approved API and is circular for components. | Keep; replace the single authority ladder with separate factual and reusable-API rules. |
| `docs/design-system/current-scope.md` | Factual design-system inventory | The correct concept and generally well segmented. | Keep factual; ensure catalogues own usage guidance and this file owns status only. |
| `docs/design-system/foundations/principles.md` | Visual intent | Useful, concise, but overlaps product and writing principles. | Keep as visual translation; link rather than restate verbal strategy. |
| `docs/design-system/foundations/tokens.md` | Token and typography guidance | Clear distinct technical role. | Keep. |
| `docs/design-system/patterns/components.md` | Active component catalogue | Essential to governed component reuse. | Keep; make it decisive for approved component API. |
| `docs/design-system/patterns/page-patterns.md` | Shared class and page-pattern catalogue | Valuable but partly repeated by `ai-rules.md`. | Keep as the canonical pattern catalogue. |
| `docs/design-system/maintenance/cleanup-sweeps.md` | Cleanup modes and boundaries | Distinct, task-specific operational guidance. | Keep; load only for cleanup tasks. |
| `docs/design-system/maintenance/migration-notes.md` | Legacy and migration context | Useful history, but overlaps design scope and project debt. | Keep only unresolved design-specific migration context; move resolved notes to archive or debt history. |

## Recommended Target Operating Model

The goal should be fewer compulsory documents and one owner per decision, not the smallest possible file count.

### Root

`AGENTS.md` should contain only:

1. repository authority and artifact classification;
2. task-based routing to the relevant owner document;
3. universal working rules, including separate Planning Mode and implementation-time clarification behaviour;
4. Git and release workflow;
5. a compact pointer explaining which tracker owns which kind of deferred state.

### Project Documentation

`docs/project/README.md` should be a neutral map:

- what each document owns;
- which documents are normative, factual, tracked work, or historical/supporting evidence;
- links to the design-system hub;
- no second “for most work” workflow and no repeated full update matrix.

The canonical active project set should remain:

- `product-direction.md`
- `writing-direction.md`
- `current-scope.md`
- `project-debt.md`
- `launch-readiness.md`
- `site-backlog.md`
- a short recent `task-log.md`

Resolved tracker items and older task history should live under an archive path that is searchable but not routed as required reading.

### Design-System Documentation

The design-system hub should route to distinct owners:

- `governance.md`: authority, promotion, reuse status, update duty;
- `current-scope.md`: factual status;
- foundations: visual principles and tokens;
- patterns: reusable component and class API;
- maintenance: cleanup procedure and unresolved migration context.

`ai-rules.md` should not remain a parallel catalogue. Its unique verification expectations can be owned by governance or the root rule relevant to UI implementation.

### Suggested Reading Paths

| Task type | Minimum active path |
| --- | --- |
| Small implementation task | `AGENTS.md` -> task-relevant source; consult `current-scope.md` only if system state or boundaries matter. |
| Public copy/content | `AGENTS.md` -> product direction -> writing direction -> affected page/source. |
| Shared UI or visual work | `AGENTS.md` -> design hub -> design current scope and relevant pattern; governance only when promotion/authority is involved. |
| Technical/API/routing/security | `AGENTS.md` -> project current scope -> targeted source/tests -> search related `DEBT-*` items. |
| Launch review | `AGENTS.md` -> relevant product/current-state docs -> launch tracker. |
| Deferred visitor-facing change | `AGENTS.md` -> relevant direction/current state -> site backlog item. |
| Historical investigation | Active owner docs first -> targeted task-log, archive, report, or Git history. |

## Proposed Cleanup Sequence

### Phase 1: Resolve Authority and Friction

Status: completed on 2026-07-14.

1. Add the three-part authority model to `AGENTS.md` or the project hub.
2. Make the unlimited-question intent explicit for Planning Mode while using a materiality rule outside Planning Mode.
3. Clarify that supporting artifacts and trackers do not override active guidance or authorize work.
4. Split design factual truth from approved reusable-API truth in `governance.md`.
5. Change tracker routing from “check all” to task-triggered targeted search.

This phase produces the largest usability improvement without moving much content.

### Phase 2: Consolidate Owners

Status: completed on 2026-07-14.

1. Make the project hub a document map rather than a second dispatcher.
2. Reorganize project `current-scope.md` by subsystem and move normative material to its owner.
3. Remove or drastically reduce `ai-rules.md`, preserving its unique verification expectations elsewhere.
4. Replace the manual `PRODUCT.md` mirror with a generated artifact or short adapter.
5. Remove repeated update matrices, leaving one global route and one local owner rule.

### Phase 3: Partition History

Status: completed on 2026-07-14.

1. Move archived `DEBT-*` and `SITE-*` entries outside active trackers.
2. Establish the same archive convention for `LAUNCH-*` when it gains resolved items.
3. Reduce the active task log to recent durable milestones and archive older entries.
4. Trim resolved design migration notes or link them to the corresponding historical debt item.

### Phase 4: Add Lightweight Checks

After restructuring, add a small documentation verification step that checks:

- relative Markdown links resolve;
- manual mirrors do not exist, or generated mirrors match;
- tracker IDs are unique;
- primary trackers do not regain inline archive sections if the archive split is adopted;
- canonical owner descriptions in the hubs still point to existing files.

The check should verify structure, not impose a complicated documentation framework of its own.

## Changes Not Recommended

- Do not collapse all guidance into one enormous `AGENTS.md`; that would trade navigation problems for universal context bloat.
- Do not delete tracker history merely to reduce word count; partition it outside the active path.
- Do not treat source code as the sole authority for approved reusable API. Existence and approval are different facts.
- Do not make every task load every product, design, tracker, and history document “just in case.”
- Do not make reports or plans canonical by default. Promote an accepted decision into its owning active document.
- Do not remove the branch/release workflow from repository-wide guidance; it is concise, stable, and genuinely universal for Git work here.

## Definition Of Done For A Future Restructure

The instruction framework can be considered clean when:

- an agent can determine the minimum reading path from `AGENTS.md` without first reading a second general workflow;
- requirements, current implementation facts, and approved reusable API each have an explicit authority rule;
- every durable instruction has one clear owner;
- `current-scope.md` files describe current state rather than becoming catch-all policy documents;
- trackers are consulted by task relevance and expose active work before history;
- reports, plans, checklists, archives, and task history are clearly non-authoritative unless adopted by the current task;
- no canonical product or design policy is manually mirrored in another file;
- design-system source existence cannot be mistaken for approved reusable API;
- routine work no longer requires reading unrelated trackers;
- documentation links and stable tracker IDs pass an automated structural check.

## Bottom Line

The framework's underlying decisions are mostly sound. The mess comes from too many repeated entry points, a missing distinction between kinds of authority, and historical material occupying the active reading path. The best cleanup is therefore selective: preserve the strong domain documents and stable tracker model, make root routing decisive, separate fact from policy, and move history out of the default context.
