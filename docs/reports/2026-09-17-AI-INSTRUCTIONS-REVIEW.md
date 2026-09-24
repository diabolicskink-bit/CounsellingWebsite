# Project AI Instructions Review

- Date: 2026-09-17
- Branch: `work/ai-instruction-review`
- Reviewed checkout: `a08dc51`
- Scope: Project instructions, their routing, supporting guidance, and relevant project configuration. Skills are excluded.

This records the original assessment and proposed direction; it does not authorize implementation by itself. The owner subsequently requested the R2 implementation and documentation consolidation, recorded in the follow-up under that finding. Other findings remain recommendations.

## Overall assessment

The instruction system has a sound basic architecture and fits the project substantially better than a generic coding-agent instruction file would. It communicates the realities of a small counselling website, distinguishes the public site from private analytics, preserves owner control over releases, and directs agents toward consequential verification rather than indiscriminate testing. Its distinction between implementation evidence, approved reusable API, owner preferences, and historical memory is particularly valuable.

The main weakness is that these distinctions are repeated across enough documents that some copies have diverged. An agent can find the relevant guidance and still receive incompatible advice or an inaccurate description of current behaviour. There are also a few gaps between what an operational procedure appears to guarantee and what its executable command actually guarantees.

The most consequential finding concerns database selection: the documented Preview migration command can use an ambient `DATABASE_URL` instead of the Preview file. The clearest documentation defects concern the definition of monthly enquiries, outdated foundation consumers, and competing verification requirements. The main structural improvements are to reduce duplicated policy, clarify the allowed use of inherited identity foundations, and establish a lightweight Git starting-state check.

This calls for a focused reconciliation, not a wholesale rewrite or a larger governance framework. Preserve the useful distinctions and the owner's deliberate preferences. Make each rule easier to find, execute, and maintain in one place.

## Scope and method

The review covered:

- Root instruction and discovery files: [AGENTS.md](../../AGENTS.md) and [PRODUCT.md](../../PRODUCT.md).
- The project document map, system guide, writing policy, practice context, article authoring and publishing guides, and IDE visual-verification guide.
- Design-system governance and current catalogues, plus the boundaries and records in the legacy register.
- Database and saved-query procedures, and test guidance.
- Maintenance instructions for debt, site backlog, task history, research indexes, reports, plans, and archives.
- The procedural portions of the CSS, accessibility, responsive, and SEO monitors. Their historical review records were supporting context, not a new audit of every recorded result.
- Project-level Codex and Claude configuration. Skill implementations, skill reference files, and the quality of skill workflows were not reviewed.

I traced representative tasks through the instructions and checked selected implementation owners where a documentation claim mattered. Those checks included package commands, the migration runner, browser helper and Playwright configuration, article rendering, the closing invitation, and enquiry reporting.

A local audit checked 202 relative Markdown links, including applicable section anchors, across 33 guidance and index files. It found no missing targets or unmatched anchors among those links. Links into skill directories and external websites were excluded. This establishes navigation integrity for that sample; it does not establish factual correctness.

The checked-out branch was based on a local `staging` that was nine commits behind the already-cached `origin/staging`. Comparing the endpoints showed differences in four article source files only, with no differences in the reviewed instruction files. No remote fetch, merge, rebase, or branch update was performed. The remote-tracking observation is local cached evidence, not a live statement about the remote repository.

No application build, browser audit, live database query, migration, email send, deployment, or external configuration change was needed or performed. A temporary environment-precedence probe used invented values and was removed afterward. It did not load project environment files or connect to a database.

## How the instruction system functions

| Layer | Intended function | Assessment |
| --- | --- | --- |
| `AGENTS.md` | Establish task interpretation, authority, scope, verification, release permissions, and routing | Strong owner-specific policy; carries too much repeated domain detail |
| `docs/README.md` | Map documents and explain ownership | Useful map; repeats several policies already stated at the root |
| `current-scope.md` | Explain the application, connected flows, boundaries, and source owners | Valuable technical orientation; needs reconciliation of a few exact claims |
| Writing and article guides | Separate practice facts, editorial preferences, article treatment, and publication mechanics | Good separation and generally restrained instructions |
| Design-system governance and catalogues | Distinguish supported reuse from implementation that merely exists | Clear approval model; some contracts and operating rules have drifted |
| Database, testing, and visual guides | Give task-specific procedures and explain their limits | Generally concrete; migration target selection needs correction |
| Trackers, logs, monitors, and indexes | Preserve context without turning old work into new authority | Sensible boundaries; a few maintenance procedures create unnecessary duplication |
| Agent configuration | Configure project tooling or permissions | Codex setup is explained; Claude permissions look like retained task history |

The root file has approximately 2,788 whitespace-delimited words and the project map approximately 762. Reading both therefore costs about 3,550 words before task-specific guidance. The full system guide adds approximately 6,066 words, although its instruction to read the orientation and then relevant sections correctly avoids making the whole guide a prerequisite.

These counts are not a reason to impose an arbitrary length limit. The relevant question is whether a paragraph changes an agent's decision or merely restates a decision owned elsewhere. The system guide earns much of its length by explaining meaningful data and runtime boundaries. Repeated design-system and verification rules provide a better reduction target.

## What works well and should be preserved

### Task interpretation and owner authority

The task table explicitly distinguishes code reviews that include improvements from reviews of instructions, documentation, copy, or plans that return an assessment. It also preserves explicit review-only limits. This is a useful project-specific convention, even though other repositories may use the word “review” differently.

The rules to continue routine work, preserve unrelated changes, and avoid re-requesting authorization are appropriate. The root authority model is explicitly limited to repository guidance, so it does not incorrectly claim that a project document overrides platform instructions.

The Git action definitions are unusually clear. Commit, push, merge, and promote have different effects, and the destination determines where promotion stops. The default of leaving implementation uncommitted is an intentional owner checkpoint. It should not be removed simply to make agents appear more autonomous.

### Proportionate engineering

The instructions correctly connect effort to consequences. Enquiry delivery, private data, authentication, reporting calculations, and article saving receive more attention than routine wording or presentation changes. They discourage tests that merely freeze copy or reproduce implementation details.

The stop rule after relevant checks pass is useful. So are the distinctions between local mocks, a local build, deployed middleware, live database behaviour, provider-accepted email, and actual mailbox delivery. These distinctions prevent inflated completion claims.

### Public and private product boundaries

Private analytics is explicitly an owner-only tool with its own visual direction. The instructions allow sensible sharing of nonvisual contracts without requiring artificial bundle isolation. They also keep public tracking and private-route privacy checks separate from dashboard presentation review.

Owner-led dashboard browser testing is a coherent preference. The substantial-change Preview exception allows direct verification when local tests cannot answer an important question. This exception should remain, with its scope kept concrete.

### Evidence, writing, and memory

Practice context is background, not a compulsory content checklist. Existing copy is not automatically a voice model. Audience and market research are opt-in, while checking factual claims remains permitted. Article evidence, citation format, and implementation procedures have separate homes.

The system guide clearly identifies source owners and the major flows between browser, APIs, email, and storage. It explains important absences, such as the lack of booking, payments, a deployed CMS, and scheduled article publication, without turning those absences into an implied backlog.

Trackers and historical logs explicitly do not authorize new work. Their admission and archiving rules substantially reduce the risk of an agent treating a previous plan as today's brief.

### Browser workflow

The visual-verification guide specifies a concrete supported route, installed Chrome, isolated server ownership, readiness checks, cleanup, and bounded failure handling. It does not turn every dev-server start into a browser audit. The current tool catalogue exposes the specified persistent Node tool, and the inspected helper and Playwright configuration select Chrome as documented. No browser launch was needed to establish those source facts.

## Findings and recommendations

Priority here describes the value and consequences of correcting the instruction issue. It does not authorize changes, assign a release gate, or replace existing project tracker priorities.

| ID | Priority | Finding | Type |
| --- | --- | --- | --- |
| R1 | High | Migration recipes do not guarantee the selected environment | Confirmed operational mismatch |
| R2 | Medium | Monthly enquiry semantics are described inconsistently | Confirmed factual mismatch |
| R3 | Medium | Active foundation records retain obsolete consumers and roles | Confirmed catalogue drift |
| R4 | Medium | Design-system verification rules compete with root proportionality | Confirmed policy inconsistency |
| R5 | Medium | Identity preservation and inherited-reuse restrictions lack a clear practical boundary | Instruction ambiguity |
| R6 | Medium | Policy duplication increases reading cost and creates competing owners | Structural maintenance issue |
| R7 | Medium | Branch creation lacks a freshness and starting-state convention | Workflow gap observed in this task |
| R8 | Low | CSS review mixes evidence recording with mandatory source annotations | Process and maintenance ambiguity |
| R9 | Low | Tracked Claude permissions retain machine- and task-specific history | Configuration housekeeping |

### R1: Migration recipes do not guarantee the selected environment

**Evidence.** [Database guidance](../../database/README.md), lines 3–17, instructs the agent to pull the intended environment into the matching file and run its migration command. [package.json](../../package.json), lines 8–9, implements these as Node commands using `--env-file`. The [migration runner](../../database/migrate.mjs), line 218, defaults its connection argument to `process.env.DATABASE_URL`.

An existing process environment value takes precedence over a value loaded using this option. I verified the behaviour on the installed Node `v24.14.1` with an invented variable: the file contained `preview`, the child process environment contained `production`, and the effective value was `production`.

**Consequence.** If an agent's shell already contains a Production `DATABASE_URL`, `npm run db:migrate:preview` can target Production despite following the documented file-selection procedure. This is a conditional risk, not evidence that the wrong database has been used. The filename and npm command label are not sufficient isolation.

The initial documentation example also places Production and Preview migration commands in one executable block, Production first. Its introductory wording does say to select the intended environment, but separate recipes would communicate that choice much more reliably.

**Recommended change.** Make environment selection explicit in the migration entry point and ensure the selected file supplies the connection independently of ambient `DATABASE_URL`. The repository already demonstrates this approach in [the database fixture test](../../tests/database/referrers.test.mjs), which parses `.env.preview.local` directly. The procedure should distinguish Preview from Production, identify the chosen environment without printing credentials, and explain that the Preview database is shared by active Preview deployments.

Until executable selection is corrected, the documentation should explicitly identify the ambient-variable hazard and require a verified target. A documentation-only claim that filenames enforce isolation would remain inaccurate. A focused regression test for conflicting ambient and file values would earn its maintenance cost because it protects a consequential environment boundary.

### R2: Monthly enquiry semantics are described inconsistently

**Follow-up, 2026-09-17:** The owner selected a common enquiry definition: successful form sends, email-link clicks and phone-link clicks; social clicks are excluded. The working-tree implementation now shares that definition across monthly, daily, referrer and keyword reporting. Monthly totals count events; attribution counts visits once. The analytics section in current scope was consolidated from 1,429 to 630 words around current functionality, essential data meaning and privacy boundaries. TypeScript, 17 focused analytics tests and two PostgreSQL fixture tests passed; the SQL fixtures use synthetic Preview data without reading or changing retained visitor records. Dashboard presentation remains an owner check. The evidence below describes the original review state.

**Evidence.** The [system guide's route table](../reference/SYSTEM.md#private-reporting) says `/analytics/enquiries` includes successful sends and phone- and email-click signals. Its [reporting semantics](../reference/SYSTEM.md#reporting-semantics), line 195, then describes successful form sends and phone clicks as enquiry signals and says email/social clicks remain separate outbound actions.

The [monthly report implementation](../../src/pages/analytics/EnquiriesAnalyticsPage.tsx), lines 53–67, includes email-link clicks in its event selection and total enquiry count. The [monthly reporting query](../../src/server/reporting/queries.ts) also selects `email_link_clicked`. By contrast, the referrer and keyword enquiry-visit queries use successful sends and phone clicks.

**Consequence.** An incoming agent could “correct” the monthly report to match the detailed guide, or extend email attribution into reports that intentionally use a narrower definition. The same term currently describes different calculations, making precise documentation important.

**Recommended change.** Document the current distinctions per report: monthly enquiry events include email clicks; referrer and keyword enquiry visits use their own event set and deduplication rules. Explain what a link click proves and what it does not. If the owner wants a unified definition, that is a separate reporting-behaviour decision. This review is not evidence that the implementation should be changed to match the stale paragraph.

### R3: Active foundation records retain obsolete consumers and roles

**Evidence.** In [supported foundations](../design-system/FOUNDATIONS.md), the `--section-warm` record still describes the primary action in a dark closing invitation; `--section-sage` still describes that action's interaction state. `--section-dark` and `--section-dark-rule` also list the shared invitation as a consumer.

The current [component contract](../design-system/COMPONENTS.md#contact-invitations) describes an earth-tan invitation, and [its CSS](../../src/design-system/components.css), beginning at line 176, uses `#c7ae8f` for the surface, cedar for the primary action, a local dark-green hover value, and `--section-rule` for boundaries. The foundation entries have retained the previous design's relationships.

There is a smaller precision problem in the `.site-reading` record, whose verified consumers include “article prose.” Current [article paragraph rendering](../../src/pages/articles/ArticleMarkdown.tsx) emits `.article-page__paragraph`, with an article-owned size and line-height in [article styles](../../src/pages/articles/articles.css). The article hero abstract still uses `.site-reading`, so that retained consumer should be named accurately.

**Consequence.** The project makes these catalogues the authority for deliberate reuse. Outdated contract text is therefore more consequential than an old screenshot or task-log entry: it can send the next implementation toward an obsolete design or cause an agent to misclassify current source as noncompliant.

**Recommended change.** Reconcile the affected foundation records from current source and approved component contracts. When a supported component changes, search the other active catalogues for references to that component and its roles, rather than updating only its own record. Keep consumer descriptions concise enough to maintain. This does not require a separate dependency registry, catalogue generator, or exhaustive consumer-list test.

### R4: Design-system verification rules compete with root proportionality

**Evidence.** [AGENTS.md](../../AGENTS.md), lines 41–44, calls for the smallest useful checks and says development-only presentation changes normally need source inspection and the smallest relevant static check. The [design-system governance verification section](../guidance/DESIGN.md#verification), lines 119–120, instead requires a full build for CSS, component, or rendered-workspace changes unless the task explicitly excludes it, and direct inspection for visual or interaction changes.

A minor presentation edit to the development-only `/design-system` workspace falls under both instructions. One defaults to focused static verification; the other defaults to build and direct inspection.

**Consequence.** The root authority rule provides a way to resolve the conflict, so this is not an unsolvable hierarchy. It is still poor operational guidance: an agent must decide whether the specialist rule is an intentional extra requirement or an outdated rule overridden by the root. Different agents can do materially different amounts of work for the same edit.

**Recommended change.** Make the governance section explicitly defer to the root scope policy. Distinguish production contract or CSS changes, which may require a build and inspection of affected consumers, from presentation-only changes to the development workspace. Preserve consumer verification where a shared change actually affects public behaviour. Remove the unconditional build requirement for every workspace presentation edit.

The article guide's separate requirement to run `qa:site` before a new publication is better understood as a specific publication gate, not automatically another contradiction. If that cost is intentional, label it as an explicit exception to routine checks. If it is not intentional, revise it separately after deciding what confidence article publication needs.

### R5: Identity preservation and inherited-reuse restrictions lack a clear practical boundary

**Evidence.** [AGENTS.md](../../AGENTS.md), line 101, requires preservation of established font families, type roles and scale, colours and semantic roles, shared navigation/footer, and the accessibility baseline. Lines 108–116 make the active catalogues the only reusable API and restrict broadening inherited implementation.

The [legacy foundations register](../design-system/legacy/FOUNDATIONS.md) explicitly lists the font stacks, most type-scale tokens, key foreground colours, and global baseline as unpromoted. The [legacy component register](../design-system/legacy/COMPONENTS.md) similarly records `Container` and `Layout` outside the supported system.

**Consequence.** A new public page must preserve the site's identity, but the instructions do not give a sufficiently direct route for deciding which existing primitives may be intentionally used to do that. An agent may inherit defaults, copy literal values into page-local CSS, ask for a wider promotion task, or reuse a legacy token despite the restriction. Those choices produce different maintenance outcomes.

This is an ambiguity rather than proof that matching the identity is impossible. Existing shell composition and inherited browser styles still work. The problem appears when new page code deliberately references a foundation or shared-looking component.

**Recommended change.** Define the permitted identity baseline and the distinction between continuing the application shell, inheriting global defaults, and adding deliberate consumers of a reusable visual API. The owner can either authorize a small stable foundation contract or explicitly document a temporary compatibility boundary. Do not silently promote all legacy tokens or components.

Keep the content-specific creative direction and page-local experimentation rules. They express a deliberate preference. Clarify that exploring two directions is part of the design thinking, not automatically a requirement to implement two prototypes or seek an extra approval checkpoint.

### R6: Policy duplication increases reading cost and creates competing owners

**Evidence.** The root says it owns working rules and instructs maintainers to avoid parallel procedures. However, design-system authority, exclusions, promotion, withdrawal, rendered specimens, and legacy handling are repeated across its final sections, the project map, the design-system README, and governance. Verification and test philosophy also appear in the root, current scope, test README, and specialist guides.

Some repetition is useful. A short warning beside a dangerous action is more reliable than a distant link. The issue is the replication of complete operating rules, especially when multiple files sound equally authoritative. R3 and R4 show that drift has already happened.

**Consequence.** Routine work spends more context re-establishing policy, while maintainers must remember multiple copies when a rule changes. Highly detailed design restrictions occupy the root even for work on enquiry validation, database queries, or a simple documentation edit.

**Recommended change.** Retain a short root statement of the decision and its owner, then keep the full domain procedure in one location. In particular:

- Keep task interpretation, authority, unrelated-change preservation, release permissions, and concise verification principles in `AGENTS.md`.
- Keep the design-system approval and migration procedure in governance; the root needs the reuse boundary and a link.
- Let the project README function primarily as a task-to-document map.
- Keep executable selections and coverage limits with the test guide and `package.json`; current scope should explain their functional significance rather than become a second detailed command manual.
- Keep private analytics' essential owner-only and Preview-authority decisions easy to discover, even if supporting details move to one clearly named section elsewhere.

Do not solve this by replacing useful prose with terse slogans, introducing many tiny files, or moving critical permissions into an obscure appendix. Reduction should follow responsibility, not a word target.

### R7: Branch creation lacks a freshness and starting-state convention

**Evidence.** The [Git workflow](../../AGENTS.md#git-and-release-workflow) says to create `work/*` branches from `staging`, but does not say whether that means the local branch as-is or a base reconciled with the remote-tracking state.

This task illustrates the omission. The branch was created from local `staging`; subsequent inspection showed it was nine commits behind the cached `origin/staging`. The difference happened to be article source only, so it did not invalidate the reviewed instruction files. It could affect other implementation tasks.

**Consequence.** Literal compliance can start new work from an unexpectedly old base. Conversely, an agent trying to be helpful might automatically update or rebase an existing working branch when preserving it was intended.

**Recommended change.** Add a short starting-state rule: inspect branch, working-tree state, and divergence before creating a new branch; check remote freshness when relevant and available; use an appropriate current staging base for new work; preserve existing work; and report meaningful uncertainty when operating offline. Distinguish starting a new branch from continuing an existing branch. Do not make rebasing, resetting, or rewriting history an automatic remedy.

This is a workflow improvement, not a request to update this review branch. The report remains on the branch the owner selected.

### R8: CSS review mixes evidence recording with mandatory source annotations

**Evidence.** The [CSS review workflow](../checklists/CSS-REVIEW.md#review-workflow) says to keep review and implementation separate, then requires every reviewed leaf to receive a source comment above its selector containing `Used` and `Consumers`.

**Consequence.** A checklist review can create code-file changes even when the intended deliverable is recorded evidence. The consumer list is also duplicated in source comments, checklist records, and potentially the legacy register or active catalogue. Consumer lists can become stale without the CSS rule itself changing.

Explicit “do not edit” instructions still win under the root policy. This is therefore not an unavoidable permission violation. It is a confusing default and a source of unnecessary maintenance.

**Recommended change.** Record audit evidence in the checklist during a checklist review. Add source comments only where they explain a durable implementation constraint, and make those comments an explicit part of an authorized implementation change. Avoid mandatory usage inventories immediately above every selector. Existing annotations can be assessed when their source is next touched; they do not warrant a broad cleanup on their own.

### R9: Tracked Claude permissions retain machine- and task-specific history

**Evidence.** [.claude/settings.json](../../.claude/settings.json) contains exact commands tied to an old `CounsellingWebsite` path, reading a particular dev log, inspecting one rendered hero, and diffing particular page files. These look like permissions accumulated during earlier tasks rather than a deliberately maintained project access policy.

**Consequence.** The file is difficult to interpret as reusable project setup and includes a path that does not match this checkout. It may be inert for the current Codex workflow. This review did not verify Claude's runtime matching semantics, so it does not claim that every selector is invalid or that these permissions introduce a security vulnerability.

**Recommended change.** Decide whether Claude remains a supported project workflow. If it does, retain only intentional project-level permissions and put machine-local conveniences in the appropriate local configuration. If it does not, consider retiring the historical configuration. Avoid replacing narrow historical entries with broad execution permissions merely to shorten the file.

## Additional observations and tradeoffs

### Preview authority is useful but relies on judgement

“Substantial analytics changes” is necessarily a judgement call. The existing conditions already narrow it: local checks cannot adequately verify the change, and a Preview is warranted. That is a reasonable exception to leaving work uncommitted.

A useful clarification would ask the agent to state the specific unresolved question before using that exception, such as a deployed authentication boundary or real SQL behaviour. It should not introduce another permission request where the current task already authorizes the Preview. No blanket removal of the exception is recommended.

### Shared-system authorization could be explained through examples

Governance requires the current task to explicitly include shared-system work before material changes. That is defensible, but a task naming the shared component and requesting its redesign should be treated as concrete authorization for that component. Agents should not require the owner to repeat a special phrase such as “design-system work.”

The current task-first authority and permission rules already support this interpretation. An example would make it easier to apply without weakening the protection against unrelated promotions.

### Temporary and historical wording needs a small reconciliation

The project map refers to a “temporary open-design period,” while the root presents the creative direction as the current default. No review date or end condition is given. Decide whether the direction is a standing preference or a temporary policy; describe it consistently.

The database guide includes an undated statement that retention was exercised during Preview setup. The system guide is generally much better at marking dated observations, although “has not been applied as part of this implementation” depends on a task context that will become obscure. Retain useful observations with dates or move historical detail to its existing history owner. Do not add a new operational status ledger for this alone.

### Tracker maintenance can be lighter without losing memory

The debt tracker has detailed fields, relationships, splitting rules, statuses, and archive procedures. These can help a large or consequential item, but a small item should not need an essay in every field. Its “split if accepted” and direct “split a broad item” instructions could also distinguish proposing a change in scope from merely organising an already-authorized item.

The task-log admission rule is good. Monthly archiving is a deliberate tradeoff: it keeps the active file readable but can make a small first-of-month entry involve a larger documentation diff. Preserve links when moving entries and keep that maintenance bounded. No automatic log entry is warranted for this review itself.

### Practice facts and implementation facts are appropriately different

The practice-context file sends agents to source for current fees, credentials, and arrangements. That is an efficient way to find the published values. It should not be interpreted as independent proof that a credential, service claim, or external legal/clinical statement is true. The writing policy already requires checking consequential uncertainty, so this is a clarification to preserve rather than a new research requirement for every copy edit.

### Do not mistake deliberate preferences for defects

Several rules are restrictive because they encode owner decisions: no routine dashboard browser audit, no automatic commit after implementation, no default audience research, no automatic promotion of attractive shared-looking CSS, and creative exploration for fresh design. Their restrictiveness alone is not a reason to remove them.

Likewise, the absence of local analytics storage and unpinned Node/npm versions are known implementation constraints, not newly discovered instruction failures. The guide identifies them and routes relevant work to existing debt. This review does not turn them into additional implementation scope.

## Recommended structure

Retain the present overall document layout. Most owners are already in the right place. Reconcile and simplify their responsibilities before considering new files.

| Owner | Keep here | Move, shorten, or avoid |
| --- | --- | --- |
| `AGENTS.md` | Authority, task modes, preservation of unrelated work, concise verification principles, Git authorization, essential product boundaries, task routing | Full design-system migration procedure; repeated test-method detail; long catalogue exclusions |
| Project README | A compact map of task types, document owners, and relevant entry points | Repeated policy prose and temporary-status commentary |
| Current scope | Application flows, meaningful data definitions, runtime boundaries, source ownership, known limits | Duplicate operating procedures; stale consumer descriptions; ambiguous historical status |
| Test README | Coverage ownership, focused commands, their prerequisites and limits | A second independently maintained version of every root verification rule |
| Visual-verification guide | Supported tooling, readiness, capture, cleanup, failure handling | Task-scope mandates or automatic audit requirements |
| Database README | Environment selection, migration order, compatibility, concrete executable procedure | Ambiguous combined environment recipes and undated setup history |
| Design-system governance | Approval model, promotion/withdrawal, compatibility boundaries, catalogue and specimen duties | Competing global verification defaults |
| Active catalogues | Accurate current contracts and concise verified consumer evidence | Previous designs, historical migration narratives, inferred reuse approval |
| Trackers and task log | Deferred work and consequential decisions, respectively | Routine task transcripts and duplicated source inventories |

A useful root reading order would be: interpret the request, identify the relevant domain owner, inspect source and current state, perform the authorized work, choose proportionate verification, and report the result. This is a decision sequence, not a requirement to create a plan artifact or checklist for every task.

Avoid adding nested `AGENTS.md` files solely to reduce root length. Cross-cutting issues such as public tracking, analytics privacy, shared components, and article publishing already span directories. More automatically loaded policy layers could make precedence harder to understand.

## Representative task walkthroughs

These are instruction-level checks of how an agent should reason, not executed application tests or new standing procedures.

| Task | Expected path through the instructions | Assessment |
| --- | --- | --- |
| Correct an exact supplied typo | Root scope rules, target source, minimal relevant check; leave uncommitted | Clear; no editorial or browser process should be added automatically |
| Review project instructions | Root assessment mode, relevant guidance, findings; write a report only when requested | Clear; this report follows that path |
| Change private-dashboard spacing | Private analytics policy, relevant source, focused static check, owner presentation verification | Clear and proportionate |
| Change report calculations | Shared contract/query/UI owners, focused behavioural or SQL checks, Preview only for an unresolved need | Good routing; R2 makes exact current semantics unreliable until corrected |
| Add a database-dependent report | Database procedure plus shared Preview compatibility and analytics verification | R1 weakens the environment boundary despite correct high-level policy |
| Add or redesign a public page | Preserve identity, develop content-specific direction, inspect allowed reuse, implement locally | R5 leaves some primitive choices ambiguous |
| Adjust `/design-system` workspace presentation | Root development-only check policy and design-system governance | R4 gives competing verification defaults |
| Publish a new article | Writing guide, manifest/template procedure, publication checks, separately authorized Git release | Strong; describe the full QA requirement as an intentional publication gate |
| Start a new working branch | Inspect current work and branch from staging | R7 leaves freshness unspecified |
| Review a CSS checklist leaf | Inspect source, record evidence and a decision | R8 adds source edits and a duplicate consumer inventory |
| Promote to Production | Necessary scoped commits and merges through staging to master, then pushes | Clear; report Git actions accurately without claiming a deployment check |

For a future instruction revision, rerun these representative decisions mentally against the revised prose. That will expose practical regressions more cheaply than tests that lock the exact wording of documentation.

## Suggested implementation order

1. **Correct the operational boundary.** Address the migration command's environment selection and align its documentation. Treat this as a focused tooling change with a meaningful boundary test, not just an editorial edit.
2. **Reconcile confirmed documentation drift.** Correct monthly enquiry definitions, the affected foundation records, and design-system verification precedence. These are bounded corrections with source references already identified above.
3. **Clarify two owner-facing choices.** Establish the intended inherited identity/reuse boundary and the convention for a current staging base. Preserve existing authorization rather than introducing extra approval steps.
4. **Reduce duplicated policy.** Trim root and map repetition after the authoritative rules are correct. Keep task routing and consequential permissions prominent.
5. **Tidy secondary procedures when useful.** Review CSS audit annotations, old Claude permission entries, and temporary or historical wording. These do not need to block unrelated work.

Do not combine this into an application cleanup, site redesign, analytics redesign, or skill rewrite. A good result would make the existing working model easier to follow while retaining its owner-specific intent.

## Verification and limits

The findings are supported by local instruction reading, cross-document comparison, targeted source inspection, a relative-link audit, and the isolated Node environment-precedence probe. They do not establish Production deployment state, actual database selection in prior sessions, provider configuration, Claude runtime behaviour, or the quality of excluded skills.

The reviewed instruction links were navigable. The documented package command selections and the inspected Chrome configuration were consistent in the areas checked. The report identifies the concrete exceptions and ambiguities rather than assuming the whole instruction system is unreliable.

Recommended completion criteria for an authorized follow-up are:

- The migration target cannot silently change because of an ambient connection variable.
- The system guide describes each report's actual enquiry definition precisely.
- Active catalogue roles and consumers match their current approved implementation.
- A development-workspace presentation task leads to one clear verification decision.
- An agent can preserve identity on a new page without inventing a promotion or compatibility policy.
- New branch setup makes meaningful divergence visible while preserving existing work.
- Detailed policy has one owner, with short routing statements elsewhere.
- Reviews and documentation maintenance do not create unrequested code annotations or broad audit work.

No instruction edits, application fixes, commits, pushes, merges, or deployments were performed as part of this assessment.
