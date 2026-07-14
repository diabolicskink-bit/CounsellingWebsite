# AI Instruction Framework Review

**Date:** 2026-07-14

**Audit snapshot:** `codex/ai-instructions-review` at `27834ec`

**Scope:** Repository-owned instructions, routing documents, installed agent skills, skill metadata, and harness-specific configuration. This is a review only; it does not implement the recommendations.

## Executive Summary

The project-specific guidance is not fundamentally bad. In fact, the newer project and design-system documents contain several strong decisions: they separate factual scope from backlogs, distinguish product strategy from writing practice, define active versus legacy UI layers, and repeatedly say that trackers are memory rather than permission.

The framework becomes unreliable when those documents interact with the repository's installed skills. Four broad skills can apply to the same public-page task, three of them give competing visual directions, and none clearly defers to the project's canonical guidance. Some conflicts are direct:

- the project explicitly accepts its active side-striped panels, while Impeccable says such borders are never intentional;
- the project deliberately uses Georgia with Inter/system sans and a shared eyebrow/hero-badge system, while installed skills ban or discourage those exact choices;
- the project calls for small, purposeful motion, while installed design skills encourage high-impact entrance animation and technically ambitious effects;
- the project uses em dashes in approved/current public copy, while Impeccable absolutely bans them;
- the user has already identified approval fatigue, while Impeccable requires a separate discovery exchange, visual probes in many cases, and explicit brief approval before ordinary implementation can start.

There is no repository-wide precedence rule that resolves these collisions. The design-system governance file has a local source order, and the writing guide has a public-copy source order, but neither covers installed skills or the whole repository. As a result, the effective answer depends on which harness discovers which skill and how it resolves equally forceful instructions.

The framework is also larger and less controlled than it appears. `.agents/skills/` contains 65 tracked files and about 3.7 MB of material, including 41 Markdown files and 35 Impeccable command references. `skills-lock.json` names three skills that are not installed and omits the installed `copywriter` skill. A manually maintained root `PRODUCT.md` duplicates the canonical product direction to satisfy one skill, while that same skill repeatedly asks for a new root `DESIGN.md` that would compete with the deliberately structured `docs/design-system/` system.

The best remediation is not another layer of instructions. It is to establish one short precedence rule, reduce the active skill set, make retained skills defer to repository guidance, and separate factual state, normative policy, workflow, and historical evidence more strictly.

## Overall Assessment

| Area | Assessment | Main reason |
| --- | --- | --- |
| Project-specific product and writing direction | Strong foundation | Clear audience, source order, restraint, and owner-wording rules. |
| Design-system documentation | Strong but locally inconsistent | Good active/legacy boundaries; source-of-truth order mixes factual implementation with normative policy. |
| Root routing | Serviceable but overloaded | Useful task routing, but no global precedence and a broad default reading burden. |
| Installed skills | High risk | Broad overlapping triggers, absolute generic rules, direct conflicts, and workflow friction. |
| Skill/configuration maintenance | Unreliable | Registry does not match disk; harness-specific settings are committed without an ownership policy. |
| Instruction verification | Weak | Links are currently sound, but there is no check for registry drift, mirror drift, precedence, or contradictory bans. |

## What Was Audited

### Root and harness surfaces

- [`AGENTS.md`](../../AGENTS.md)
- [`PRODUCT.md`](../../PRODUCT.md)
- [`skills-lock.json`](../../skills-lock.json)
- [`.claude/settings.json`](../../.claude/settings.json)
- [`.claude/settings.local.json`](../../.claude/settings.local.json)

### Project guidance

- [`docs/project/README.md`](../project/README.md)
- [`product-direction.md`](../project/product-direction.md)
- [`writing-direction.md`](../project/writing-direction.md)
- [`current-scope.md`](../project/current-scope.md)
- the operating rules and instruction-related history in the project debt, launch, backlog, and task-log files

### Design-system guidance

- [`docs/design-system/README.md`](../design-system/README.md)
- [`governance.md`](../design-system/governance.md)
- `ai-rules.md` (reviewed here, then retired during the project-Markdown Phase 2 consolidation)
- [`current-scope.md`](../design-system/current-scope.md)
- the foundation, token, component, page-pattern, cleanup, and migration documents

### Installed skills

| Skill | Instruction footprint | Trigger breadth |
| --- | ---: | --- |
| `copywriter` | 1 Markdown file, 415 lines | Any task touching site content or language. |
| `frontend-design` | 1 Markdown file, 42 lines | Building or styling almost any frontend. |
| `impeccable` | 36 Markdown files, about 335 KB, plus scripts | Almost every form of frontend creation, review, refinement, or audit. |
| `uncodixfy` | 3 Markdown files, about 26 KB, plus images | Whenever HTML, CSS, React, Vue, Svelte, or other frontend code is generated. |

The audit read every skill entrypoint and examined the Impeccable references that control setup, shaping, implementation, product/design documentation, brand direction, and live mutation. The remaining Impeccable references were inventoried and searched for cross-cutting requirements and mutation behaviour.

### Integrity checks

- No broken relative Markdown links were found in the audited instruction surfaces.
- The checked-out worktree was clean before this report was added.
- The skill registry was compared with the actual `.agents/skills/` directories.
- The root product mirror was diffed against its stated canonical source.
- High-risk legal and advertising claims in the copywriting skill were compared with current primary guidance from the ACCC, Ahpra/Psychology Board, and PACFA.

## Current Effective Architecture

The intended architecture appears to be:

1. `AGENTS.md` routes agents to `docs/project/README.md`.
2. The project hub routes by task type.
3. Product, writing, current-scope, tracker, and design-system documents each own a domain.
4. Design-system governance and writing direction provide domain-specific source orders.
5. Skills provide specialist execution methods.

The effective architecture is different:

1. The harness loads `AGENTS.md` and may independently auto-activate one or more skills.
2. A UI task can trigger `frontend-design`, `impeccable`, and `uncodixfy` together.
3. A public-page task involving copy can trigger all four installed skills.
4. Those skills contain absolute rules that are not represented in the project routing graph.
5. No instruction tells the agent whether a project decision, a generic skill law, current code, a rendered example, or a generated root mirror wins outside the two narrow domain source orders.

This is why adding more detailed project guidance has not made behaviour reliably more consistent. It increases the number of instructions without resolving which instruction has authority.

## Detailed Findings

### F-01 — There is no repository-wide precedence model

**Severity: High**

`writing-direction.md:13-19` provides a useful conflict order for public wording. `docs/design-system/governance.md:11-26` provides a source order for design-system sources. Neither order mentions skills, root tool mirrors, harness settings, reports, trackers, or explicit project exceptions to generic skill rules.

This omission matters because the skills use forceful language such as “never,” “absolute bans,” “non-optional,” and “follow them strictly.” An agent cannot reliably infer that a quieter project-specific preference should override a skill's absolute rule, even when the project decision is newer and deliberate.

**Recommendation:** Add one short precedence section to `AGENTS.md`. Within repository-controlled guidance, it should establish:

1. the user's current explicit instruction;
2. `AGENTS.md` universal repository rules;
3. the canonical domain document routed by `AGENTS.md`;
4. factual current source/runtime state;
5. compatible skill methods;
6. examples, rendered demos, trackers, reports, and history.

It should state explicitly that repository-specific product, writing, and design-system decisions override generic aesthetic or workflow heuristics in installed skills. Platform-level safety and permission requirements remain outside the repository's control.

### F-02 — Installed visual skills directly contradict settled project decisions

**Severity: High**

The conflict is not merely a difference in taste. The table below shows instructions that cannot all be followed at once.

| Project decision | Conflicting installed instruction | Effect |
| --- | --- | --- |
| Active side-striped panels are intentional and valid (`docs/design-system/maintenance/migration-notes.md:41`; `project-debt.md:541-543`). | Impeccable calls any coloured side border over 1px “never intentional” (`impeccable/SKILL.md:107`). | A skill can undo a decision the project already audited and resolved. |
| Georgia headings plus Inter/system sans are the documented production baseline (`foundations/tokens.md:35-36`). | `frontend-design` says to avoid Inter (`SKILL.md:30,36`); Impeccable's brand reference puts Inter on a ban list (`brand.md:26-30`); Uncodixfy rejects mixed serif/sans as a premium shortcut (`SKILL.md:64`). | Routine UI work is pushed toward an unrequested type-system change that is explicitly out of scope. |
| `.hero-badge` and shared eyebrow treatments are active semantic and visual patterns (`foundations/tokens.md:38-39`; `page-patterns.md:66-69,94`). | Uncodixfy says no eyebrows, no uppercase labels, and even “No Headlines of any sort” (`SKILL.md:20,78,94,125`). | The skill rejects a heavily used, documented production subsystem. |
| Motion should be small, purposeful, and optional (`foundations/principles.md:39`); there is no broader motion system (`design-system/current-scope.md:62`). | `frontend-design` promotes high-impact page-load reveals and surprising scroll/hover states (`SKILL.md:32`); Impeccable's brand rules permit ambitious first-load motion (`brand.md:100-104`). | A normal polish task can expand into animation work outside current scope. |
| Controlled asymmetry is allowed when it clarifies the subject (`foundations/principles.md:21`). | `frontend-design` pushes unexpected layouts and grid breaking (`SKILL.md:33`), while Uncodixfy says no creative asymmetry and demands predictable structure (`SKILL.md:40-43`). | Two skills pull the same task in opposite directions, neither calibrated to the project. |
| The design should remain quiet, warm, and restrained (`product-direction.md:49`; `foundations/principles.md:17-20,44`). | Impeccable's brand register says “Go big or go home” and tells brand surfaces to use committed, full, or drenched colour (`brand.md:11,53-58`). `frontend-design` encourages dominant colour, gradient meshes, textures, dramatic shadows, custom cursors, and grain (`SKILL.md:31-34`). | Generic distinctiveness doctrine can overrule the counselling site's trust and reading goals. |
| Current public copy and the copywriting skill itself use em dashes. | Impeccable absolutely bans em dashes and even double hyphens (`SKILL.md:114-117`). | A combined UI/copy task has no compliant punctuation choice. |

The side-stripe conflict is especially revealing. The project closed `DEBT-14` specifically because an older blanket AI rule was wrong. The installed Impeccable skill silently reintroduces that same rule.

**Recommendation:** Do not try to document every exception in the project docs. Reduce the number of active generic UI skills. Retain at most one broad UI method, make it explicitly subordinate to the repository design system, and remove or scope any absolute rule that contradicts the project.

### F-03 — Skill triggers overlap so broadly that conflict is the default

**Severity: High**

The four skill descriptions are not complementary lanes:

- `frontend-design` covers building or styling any web UI.
- `impeccable` covers designing, critiquing, auditing, polishing, clarifying, optimizing, adapting, and almost every other UI action.
- `uncodixfy` applies whenever frontend code is generated.
- `copywriter` applies to any task touching site language, including headings, CTAs, forms, and page structure.

A request such as “polish this public page and adjust the heading” therefore matches all four. Each skill brings its own setup, aesthetic doctrine, copy rules, and verification expectations. The project has no activation matrix, exclusivity rule, or instruction to select the smallest compatible method.

**Recommendation:** Define skill boundaries in a small tracked manifest or `.agents/README.md`. Prefer explicit invocation for heavyweight workflow skills. A sensible target is:

- project docs always active through `AGENTS.md` routing;
- one UI skill, explicitly invoked for substantial design work rather than every TSX/CSS change;
- one thin copy skill, invoked for substantive copy work and subordinate to `writing-direction.md`;
- no separate anti-AI-aesthetic skill when that concern is already covered by project principles and the retained UI skill.

### F-04 — Impeccable structurally creates the approval fatigue the user has reported

**Severity: High**

Impeccable's setup is explicitly “non-optional” (`impeccable/SKILL.md:8-19`). Its craft path requires a separate user response approving a shape brief (`SKILL.md:17,27`). The shape reference normally requires one or more interview rounds, asks 2-3 questions per round, may require 2-4 generated visual probes, and then stops again for explicit confirmation (`shape.md:11-27,69-111`). It also requires agents to print a preflight status line before edits (`SKILL.md:21-25`).

That process may be useful for a new visual product. It is disproportionate for routine changes in an established site with documented direction. It also conflicts with the project's actual collaboration need: avoid unnecessary approval loops while still asking questions that materially affect scope or irreversible choices.

The broad trigger makes the problem worse. Impeccable is not limited to an explicit `$impeccable craft` request; it says to use the skill for ordinary polish, layout, copy clarification, responsive adaptation, and audits.

**Recommendation:** Make Impeccable explicit-invocation only, or fork it into a project-specific lighter workflow. Routine established-pattern work should proceed from documented constraints and reversible assumptions. Reserve a separate confirmed brief for genuinely new visual direction, large redesigns, or choices that would materially change scope.

### F-05 — Impeccable can create competing product and design authorities

**Severity: High**

The project deliberately stores product direction under `docs/project/` and design-system guidance under `docs/design-system/`. Impeccable instead requires a root `PRODUCT.md`, strongly recommends a root `DESIGN.md`, and nudges once per session when `DESIGN.md` is absent (`impeccable/SKILL.md:31-52`). Its `teach` and `document` references can write those files and can offer to append a generated “Design Context” section to `AGENTS.md`.

The current workaround is a nearly complete manual copy of `docs/project/product-direction.md` at root. `PRODUCT.md:3` calls the project document canonical and says the mirror must stay aligned, but the files already differ in structure and one accessibility qualification. There is no generation or validation step.

The absent root `DESIGN.md` is not a gap in this repository. It is a consequence of an intentional structured documentation model. If generated, Impeccable's document workflow says its tokens are normative, creating direct competition with `src/styles.css`, `docs/design-system/governance.md`, token docs, pattern docs, and current scope.

**Recommendation:** Modify the retained tool integration to read the canonical project paths directly. If tool compatibility absolutely requires root files, generate them from canonical sources, mark them generated/non-normative, and fail a check when they drift. Do not allow a skill to append governance content to `AGENTS.md` or introduce a new normative `DESIGN.md` outside the agreed document architecture.

### F-06 — The copywriting skill states legal and ethical claims too categorically

**Severity: High because the subject is regulated and trust-sensitive**

The copywriting skill labels its rules “hard constraints” and asserts that:

- all outcome language is prohibited under ACA guidelines and Australian Consumer Law;
- testimonials are ethically prohibited regardless of registration status;
- all superlatives/comparatives and urgency language are prohibited;
- the only reference needed is “ACA Code of Ethics (acaca.asn.au).”

The conservative house choices may be sensible, but the legal explanations are not adequately sourced and conflate different regimes.

- The [ACCC's current guidance](https://www.accc.gov.au/consumers/advertising-and-promotions/false-or-misleading-claims) requires claims to be truthful, accurate, supportable, and not misleading. It does not create the blanket wording bans stated by the skill and notes that some obvious puffery is not generally treated as misleading.
- [Ahpra's advertising guidance](https://www.ahpra.gov.au/Resources/Advertising-hub/Advertising-guidelines-and-other-guidance/Advertising-guidelines.aspx) concerns regulated health services under the National Law. Its testimonial restriction is tied to regulated services and clinical aspects; it is not evidence for a universal rule covering every counsellor regardless of registration context.
- PACFA publishes separate [guidelines for advertising counselling and psychotherapy services](https://pacfa.org.au/common/Uploaded%20files/PCFA/Documents/Documents%20and%20Forms/Guidelines-for-advertising-counselling-and-psychotherapy-services.pdf), demonstrating that counselling-specific professional guidance needs to be identified precisely rather than inferred from Ahpra rules.

The skill is also internally imprecise: “Psychologist” being a protected title is correctly raised, but the surrounding rules do not distinguish the practitioner's actual memberships, the service being advertised, statutory obligations, professional-code obligations, and conservative project policy.

**Recommendation:** Separate three categories: legal requirement, professional-membership requirement, and Vive house policy. Cite exact current documents, version dates, and sections. Have the practitioner or an appropriate professional review the resulting compliance section. Until then, keep conservative wording rules as project policy but do not describe them as universal law.

### F-07 — The copywriting skill duplicates and sometimes bypasses the newer writing authority

**Severity: Medium-High**

`writing-direction.md` now clearly owns public voice, source order, approved patterns, SEO integration, and collaboration workflow. The older `copywriter` skill still contains 415 lines of overlapping doctrine but never says that the project writing guide wins.

Examples:

- The skill tells agents to read adjacent pages so new copy fits the whole (`copywriter/SKILL.md:20-28`), while the project explicitly says current page source is factual/layout context, not an approved voice corpus (`writing-direction.md:7-9`).
- It mandates a six-stage pre-drafting process for any copy task (`SKILL.md:201-239`), which is excessive for a label or single sentence.
- It declares one CTA universally right and another wrong (`SKILL.md:343-344`) rather than treating current project wording and the page's actual action as authoritative.
- It uses forceful conversion claims such as “recognition is the only hook that works” and describes friction as “killing” enquiries without evidence (`SKILL.md:319-341`).

The newer writing guide is more calibrated, more project-specific, and clearer about owner approval. The skill should be a craft method, not a second voice constitution.

**Recommendation:** Rewrite the skill as a thin adapter: load `product-direction.md`, `writing-direction.md`, and current facts; use a proportionate structure-first review method; defer all voice, factual, ethical, and exact-wording decisions to the canonical docs and current user instruction.

### F-08 — Design-system “source of truth” mixes descriptive truth with normative authority

**Severity: Medium-High**

`docs/design-system/governance.md:11-26` says that when sources disagree, production CSS comes first, then active components, rendered design-system pages, written docs, dev CSS, page CSS, and legacy material.

This is reasonable if the question is “what is currently rendered?” It is unsafe if the question is “what should an agent reuse or preserve?” Source code can contain accidental drift and legacy selectors. Rendered dev pages can contain candidate/reference examples. The same governance document says a component is active only when written scope and component docs say so, which makes the hierarchy partly circular.

**Recommendation:** Split the order into two explicit questions:

- **Factual implementation state:** source and rendered output establish what exists.
- **Normative design-system API:** governance, current-scope status, tokens, and pattern catalogues establish what may be reused or extended.

When those disagree, agents should report drift or update the appropriate source as part of the requested change; accidental implementation should not silently overrule policy.

### F-09 — The default reading graph is too broad for routine work

**Severity: Medium**

`AGENTS.md:3` says every agent starts at the project hub. The hub's “For most work” path asks agents to read product direction, writing direction when language may be affected, current scope, three trackers before planning, and task history when relevant. UI work then adds the design-system hub, AI rules, current scope, and pattern catalogues. Auto-triggered skills add hundreds of lines more.

The documents are individually sensible, but the routing graph makes small tasks pay the context cost of the whole governance system. Large context also increases the chance that an incidental tracker note or generic skill slogan outweighs the few rules that actually matter.

**Recommendation:** Make the root route task-minimal. A git-only task should need only Git workflow. A narrow CSS fix should need the active design-system rule and affected pattern, not all project trackers. “Check for an existing related item” is enough; do not require all trackers before any plan.

### F-10 — Registry state does not match installed skill state

**Severity: Medium**

The actual installed directories are:

- `copywriter`
- `frontend-design`
- `impeccable`
- `uncodixfy`

`skills-lock.json` instead lists six entries. It includes `color-expert`, `gpt-taste`, and `redesign-existing-projects`, which have no installed directory, and omits `copywriter`, which is installed and active.

This makes the lock file unreliable for reproduction, upgrades, removal, and review. It is also unclear whether the lock means “desired,” “previously installed,” or “currently active.”

**Recommendation:** Decide and document the lock file's contract, then reconcile it automatically. Store active/disabled status, source, resolved revision or release, content hash, and whether a skill is locally maintained. Add a check that compares the manifest with installed directories.

### F-11 — Update rules encourage cascading documentation churn

**Severity: Medium**

Ownership and update statements are repeated across `AGENTS.md`, the project hub, current-scope files, the design-system hub, AI rules, governance, and task-log admission rules. This caused the recent writing-guidance change to touch the root guidance, product mirror, multiple project docs, multiple design docs, and task log.

Some repetition is useful routing. The current structure goes further: a documentation governance change can trigger a current-scope update because documentation structure changed, a task-log entry because governance changed, and mirror updates because tooling depends on a duplicate. The cost makes future drift more likely, not less.

**Recommendation:** Give each change one canonical record and keep other files as stable pointers. Update factual scope only when current factual scope changes. Update task history only for genuinely durable state. Do not mirror detailed ownership prose across several files.

### F-12 — `current-scope.md` contains normative agent instructions

**Severity: Medium**

The project current-scope file correctly describes itself as a factual inventory (`current-scope.md:3`), but it also says that agents should preserve a temporary copy-positioning constraint (`lines 16-18`) and prescribes when page tests should be reviewed (`line 42`). Its final update rule also participates in governance.

The temporary positioning fact belongs in scope, but the instruction about how agents must act belongs in writing direction or root working rules. Mixing the two makes it harder to know whether a sentence is evidence about the current site or a command.

**Recommendation:** Keep current scope declarative. Move workflow and behavioural rules to their owning instruction document, leaving a link where needed.

### F-13 — Harness-specific permissions are committed without a portability policy

**Severity: Medium**

Both `.claude/settings.json` and `.claude/settings.local.json` are tracked. The “local” file is therefore not local. The shared settings include an absolute path under one Windows user's profile and grant command patterns that differ from permissions used by other agents and harnesses.

This does not currently expose a secret, but it creates machine-specific behaviour, leaks a workstation path, and makes approval experience depend on the selected tool. It also obscures whether these files are project policy or a historical local convenience.

**Recommendation:** Remove the tracked local settings file, eliminate absolute user paths, and document which harness configurations are intentionally shared. Keep permissions narrow and portable. Treat harness permission config as execution configuration, not product or design guidance.

### F-14 — Vendored skills create a large, mutable instruction and script surface

**Severity: Medium**

The repository vendors about 3.7 MB across 65 skill files. Impeccable alone has 35 command references and scripts that can load or rewrite context, inject live variants, patch development CSP, start helpers, pin commands into multiple harness directories, and clean old skill installations. These capabilities are not inherently wrong, but they are much broader than “design advice.”

The project has no documented review/update policy for this vendor code. An upstream reinstall can also overwrite local conflict fixes. Uncodixfy carries both `SKILL.md` and a near-duplicate `Uncodixfy.md` that already differ by one instruction line, illustrating internal package drift.

**Recommendation:** Treat external skills as dependencies: pin a reviewed revision, document why each is present, review changes before upgrades, and avoid locally patching an upstream copy without declaring a fork. Remove unused package assets and skills from the active repository surface where practical.

### F-15 — There is no instruction integrity gate

**Severity: Medium-Low**

The current relative links pass. Encoding checks include `.agents`. There is no equivalent check for:

- installed directories versus `skills-lock.json`;
- `PRODUCT.md` mirror drift;
- forbidden absolute workstation paths in shared configuration;
- newly introduced root instruction surfaces;
- duplicate normative ownership claims;
- retained skills acknowledging repository precedence.

Automated checks cannot decide nuanced conflicts, but they can stop the mechanical drift that currently hides them.

**Recommendation:** Add a small `check:agent-guidance` script after the framework is simplified. Keep it mechanical: link integrity, manifest parity, generated-mirror parity if a mirror remains, and portable config checks.

### F-16 — Some installed instruction content is low-quality or self-undermining

**Severity: Low, but it affects trust and consistency**

Uncodixfy includes hostile or vague rules such as “Everything you are used to doing” being forbidden, “No Headlines of any sort,” instructions about hidden reasoning, random palette selection, and domain-general bans derived from dashboard examples. It simultaneously promotes “normal” predictable UI and conflicts with `frontend-design` and Impeccable's demand for memorable, unexpected work.

This is not a stable design standard. It is a reaction to common AI patterns expressed as absolutes. The project's own design principles cover the useful parts more precisely.

**Recommendation:** Remove this skill from the active project framework rather than trying to reconcile each sentence.

## What Is Working Well

The review should not lose the useful structure while simplifying it.

1. **The writing source order is strong.** Owner wording first, then approved project patterns, then product direction, then current source as factual/layout context, then reports as research is a clear and practical hierarchy.
2. **The project/design-system boundary is explicit.** Separate current-scope files and update duties reduce accidental UI-system promotion.
3. **Trackers are repeatedly denied permission status.** This is an important guard against agents implementing unrelated backlog items.
4. **The design-system active/legacy distinction is useful.** It prevents the mere existence of a component or class from making it reusable API.
5. **One-off UI is allowed to remain page-scoped.** This avoids premature abstraction and generic page flattening.
6. **Review versus implementation is distinguished.** The root and writing guide correctly say that a request for analysis does not authorize file edits.
7. **The Git/release workflow is concise and operational.** It gives future agents a usable branch model without requiring deployment changes.
8. **Links are currently healthy.** The problem is authority and overlap, not a broken navigation graph.

## Recommended Target Architecture

### 1. Root dispatcher: `AGENTS.md`

Keep it short and universal. It should contain:

- the precedence rule;
- task-based reading routes;
- the minimal autonomy/clarification rule;
- review-versus-implementation boundaries;
- Git/release workflow;
- concise update routing.

It should not duplicate product voice, design doctrine, tracker schemas, or skill manuals.

### 2. Canonical domain policy

- `docs/project/product-direction.md`: audience, positioning, product purpose, stable brand intent.
- `docs/project/writing-direction.md`: public writing, owner wording, inclusion language, SEO wording, and verified house/compliance policy.
- `docs/design-system/governance.md`: normative UI API, promotion, and conflict handling.
- design foundations/pattern files: the specific reusable rules.

### 3. Factual state

- `docs/project/current-scope.md`: what the app/site currently does.
- `docs/design-system/current-scope.md`: what visual API currently exists and its status.

These files should not issue general behavioural commands.

### 4. Optional execution methods

Skills should explain how to perform work, not redefine what the project is.

- Keep no more than one broad UI skill.
- Make heavyweight design discovery explicit-invocation only.
- Keep a thin copy method only if it defers to the canonical project docs.
- Do not retain a separate anti-AI design skill full of project-incompatible absolutes.

### 5. Memory and evidence

- Trackers: future work and pressure, never automatic scope.
- Task log: durable historical state.
- Reports and plans: evidence and proposals, never normative unless promoted into a canonical document.
- Current source: factual evidence, not automatically approved voice or reusable design API.

### 6. Tool compatibility outputs

If a tool requires `PRODUCT.md` or `DESIGN.md`, either teach it the canonical paths or generate compatibility outputs. A compatibility file must not become another manually edited authority.

## Prioritised Remediation Plan

### Priority 0 — Resolve authority and active conflicts

1. Add the repository-wide precedence rule to `AGENTS.md`.
2. Choose one active broad UI skill. Disable/remove `uncodixfy`; remove or narrow `frontend-design`; make Impeccable explicit-only or fork it.
3. Remove the retained skill's direct conflicts with side stripes, typography, hero labels, punctuation, motion, and project scope.
4. Replace the broad clarifying-question/approval posture with: ask only when missing information would materially change scope, create an irreversible choice, or produce a meaningfully different result; otherwise state a reversible assumption and proceed.
5. Reconcile `skills-lock.json` with what is actually active.

### Priority 1 — Remove duplicate authorities

6. Make Impeccable read canonical project/design docs instead of requiring parallel root doctrine.
7. Eliminate the manual `PRODUCT.md` mirror or generate/validate it.
8. Prevent automatic creation of a competing normative root `DESIGN.md`.
9. Rewrite `copywriter` as a thin project adapter and separate conservative house rules from verified legal/professional requirements.
10. Move normative instructions out of current-scope documents.
11. Remove tracked local Claude settings and absolute workstation paths.

### Priority 2 — Make the simplified framework maintainable

12. Add a documented active-skill manifest and ownership/update policy.
13. Add `check:agent-guidance` for link, registry, mirror, and portability checks.
14. Prune duplicate vendored instruction files and unused assets.
15. Review the framework after several real tasks, focusing on unnecessary questions, duplicated doc edits, and cases where agents still choose generic skill doctrine over project decisions.

## File-by-File Disposition

| File or area | Recommended disposition |
| --- | --- |
| `AGENTS.md` | Keep; shorten routing; add global precedence and proportionate clarification rule. |
| `docs/project/README.md` | Keep as map; reduce “most work” reading burden and avoid repeating update policy in full. |
| `product-direction.md` | Keep canonical. |
| `writing-direction.md` | Keep canonical; add only reviewed compliance distinctions if needed. |
| `docs/project/current-scope.md` | Keep factual; remove agent-behaviour wording. |
| Project trackers/task log | Keep as memory/history; do not load by default unless relevant. |
| `PRODUCT.md` | Replace with generated compatibility output or teach the tool canonical paths. |
| Design-system README/governance | Keep; split factual implementation order from normative API authority. |
| `docs/design-system/ai-rules.md` | Keep only if it remains a short router/checklist; avoid duplicating catalogues. |
| Design-system scope/foundation/pattern docs | Keep. They are the strongest part of the visual guidance. |
| `copywriter` skill | Rewrite as a thin adapter; remove unsupported legal absolutes and universal CTA/process claims. |
| `frontend-design` skill | Remove or restrict to explicit greenfield exploration; it is poorly matched to this established design system. |
| `impeccable` skill | Explicit-only or project fork; remove approval-heavy default and generic absolute conflicts. |
| `uncodixfy` skill | Remove from active framework. Its useful concerns already exist in better project language. |
| `skills-lock.json` | Reconcile and define as the authoritative active dependency manifest. |
| `.claude/settings.json` | Keep only portable, intentional shared settings. |
| `.claude/settings.local.json` | Stop tracking. |

## Conclusion

The mess is not primarily caused by the number of project documents. Those documents are mostly converging on a reasonable model. The core problem is that the repository has both a project-specific instruction system and a second, implicit system made of broad third-party skills. The second system is larger, more forceful, and not subordinate to the first.

The next cleanup should therefore avoid writing another comprehensive guide. Establish authority, remove overlapping skills, make retained methods project-aware, and validate the few mechanical relationships that remain. That will reduce both inconsistent output and the repeated clarification/approval burden without weakening the project's useful safeguards against scope drift.
