# AI Rules And Design-System Docs Structure Review - 2026-06-17

Scope: all files currently in `docs/design-system/`, plus their relationship to `AGENTS.md` and `docs/project/*`. This review focuses on AI-facing rule structure, documentation ownership, duplication, stale planning material, and what the design-system docs would look like if rebuilt with free rein.

Files reviewed:

- `AGENTS.md`
- `docs/project/README.md`
- `docs/project/current-scope.md`
- `docs/project/product-direction.md`
- `docs/project/project-debt.md`
- `docs/project/site-backlog.md`
- `docs/project/task-log.md`
- `docs/design-system/README.md`
- `docs/design-system/ai-rules.md`
- `docs/design-system/architecture.md`
- `docs/design-system/cleanup-sweeps.md`
- `docs/design-system/components.md`
- `docs/design-system/current-scope.md`
- `docs/design-system/design-export.md`
- `docs/design-system/design-export.json`
- `docs/design-system/principles.md`
- `docs/design-system/tokens.md`
- `docs/design-system/type-scale-plan.md`

## Executive Summary

The project now has two AI-facing documentation layers:

- a whole-project instruction layer rooted at `AGENTS.md` and `docs/project/`
- a visual/design-system layer under `docs/design-system/`

That split is directionally right. The project layer is new but mostly clean: it gives agents a place for product direction, current scope, debt, backlog, and task history. The design-system layer has the right instincts and mostly the right parts, but the boundaries between files have blurred.

The biggest structural issue is that `ai-rules.md` has become a second mini-manual. It repeats or partially owns architecture, prefix policy, cleanup routing, component selection, legacy handling, design principles, and documentation update rules. That makes it harder to know which file is canonical.

The second issue is that the folder contains three different kinds of docs without clearly marking them as such:

- Canonical operating docs: active rules and source-of-truth guidance.
- Current-state inventory: factual scope and legacy status.
- Reference or historical artifacts: design exports and completed plans.

Nothing in the folder obviously needs to be deleted immediately. But if rebuilt cleanly, several files would be renamed, folded together, or moved into a `reference/` or `archive/` subfolder so agents do not treat everything as equal operational guidance.

At the project level, the main risk is future duplication between `AGENTS.md` and `docs/project/README.md`. `AGENTS.md` should stay as the root bootstrap and non-negotiable instruction card; `docs/project/README.md` should own the fuller operating model.

## Findings

### 1. Root and project-level AI guidance is directionally right, but should stay thin

Severity: Medium  
Files: `AGENTS.md`, `docs/project/README.md`, `docs/project/current-scope.md`, `docs/project/project-debt.md`, `docs/project/site-backlog.md`, `docs/project/task-log.md`

The new project-level system solves a real problem: it separates whole-site/product governance from design-system governance. `AGENTS.md` points agents to `docs/project/README.md`, and `docs/project/README.md` gives reading order, tracker ownership, and update expectations.

This is a good structure. The risk is that `AGENTS.md` and `docs/project/README.md` will both grow into full manuals. They already overlap on reading order and update duties.

Recommended ownership:

- `AGENTS.md`: root bootstrap and non-negotiable repo rules only.
- `docs/project/README.md`: whole-project operating manual and reading order.
- `docs/project/current-scope.md`: factual current public-site/app scope.
- `docs/project/project-debt.md`: technical/design-system debt memory.
- `docs/project/site-backlog.md`: deferred visitor-facing work.
- `docs/project/task-log.md`: durable milestone history.

Recommendation: do not remove the project docs. Keep them. But if cleanup is done with free rein, make `AGENTS.md` shorter and make the project README the single project-level map.

### 2. `AGENTS.md` should not become a parallel project manual

Severity: Medium  
Files: `AGENTS.md`, `docs/project/README.md`, `docs/design-system/README.md`

`AGENTS.md` currently includes product reading rules, scope/debt/backlog checks, UI rules, design-system update rules, and project-governance update rules. That is acceptable right now, but it is already close to duplicating the project README and design-system README.

Risk: future updates happen in `AGENTS.md` but not the project/design-system docs, or vice versa.

Recommended fix: keep `AGENTS.md` as a concise launcher:

- Start with `docs/project/README.md`.
- Read product direction before public content work.
- Read design-system README before UI/design work.
- Update current-scope/debt/backlog/task-log when relevant.
- Never treat trackers as permission to implement scope by themselves.

All detailed reading order and tracker policy should live in `docs/project/README.md`.

### 3. Project trackers are useful, but design-system debt now lives in project debt

Severity: Medium  
Files: `docs/project/project-debt.md`, `docs/design-system/current-scope.md`, `docs/design-system/cleanup-sweeps.md`

Design-system issues such as the card boundary, legacy CSS cleanup, and side-stripe rule conflicts are currently tracked as `DEBT-*` items in `docs/project/project-debt.md`. That is workable because they are maintainability pressure, not new visual scope.

However, if many design-system-specific debt items accumulate, the project debt tracker may become a mixed technical/design-system backlog.

Recommendation: keep design-system debt in `project-debt.md` for now. If it grows, split later into `docs/design-system/maintenance/migration-notes.md` or a design-system debt file that cross-links from project debt.

### 4. `ai-rules.md` is overgrown and treading on other docs

Severity: High  
Files: `ai-rules.md`, `architecture.md`, `cleanup-sweeps.md`, `components.md`, `principles.md`, `tokens.md`

`ai-rules.md` is labelled as a decision guide before visual code changes, but it currently contains:

- required reading rules
- prefix taxonomy
- source-of-truth assumptions
- new pattern creation rules
- cleanup workflow
- documentation page rules
- legacy/demo handling
- design principles
- accessibility principles
- hard visual prohibitions
- implementation order
- diagnostic questions

Most of those rules are useful. The problem is ownership. `architecture.md` should own the system model. `cleanup-sweeps.md` should own cleanup. `components.md` should own reusable patterns. `principles.md` should own visual intent. `tokens.md` should own type/colour/spacing rules. `ai-rules.md` should mostly route agents to those files and list the few high-risk guardrails that must be remembered in the moment.

Recommendation: rewrite `ai-rules.md` as a 2-3 page operational checklist. It should not be another design-system manual.

### 5. The same active/legacy layer policy appears in too many places

Severity: High  
Files: `README.md`, `architecture.md`, `current-scope.md`, `ai-rules.md`

Rules about `site-*`, `hero-*`, `ds-*`, `design-language-*`, `legacy-*`, `test-bed-*`, `opus-*`, `inc-lab-*`, and `site-hero-*` are repeated across several files.

This is important enough to mention in multiple places, but not with the current level of detail. The repeated wording increases drift risk. If one rule changes, four files may need updates.

Recommended ownership:

- `architecture.md`: canonical model for active, docs-only, legacy, and reference layers.
- `current-scope.md`: factual statement of which layers currently exist and what state they are in.
- `ai-rules.md`: short "do not use legacy layers in production" operational reminder.
- `README.md`: map to the above, not a policy copy.

### 6. `current-scope.md` is useful but too close to a rulebook

Severity: Medium  
Files: `current-scope.md`

The current-scope file is valuable. It tells future sessions what exists, what is partial, what is legacy, and what is out of scope. But it also carries some policy-like explanation, especially around legacy layers.

That is not wrong, but it should stay factual. When it needs to say "reference only" or "not production-safe", it can. When it starts explaining how to promote or work with a layer, that belongs in `architecture.md` or `cleanup-sweeps.md`.

Recommendation: preserve `current-scope.md`, but tighten it over time into an inventory/status ledger.

### 7. `components.md` has become both catalogue and rulebook

Severity: Medium-High  
Files: `components.md`, `project-debt.md`

`components.md` is mostly a useful catalogue. It describes React components and shared CSS patterns. But it also carries general reuse rules, major page exception rules, and side-stripe policy.

The biggest unresolved issue is still the `Card` / `.card` / `.site-card` boundary, tracked in `DEBT-12`. The docs currently say to consider `src/components/Card.tsx`, while the production card language is mostly `.site-card`.

Recommendation: keep `components.md` as the catalogue, but move broad reuse philosophy into `architecture.md` or `ai-rules.md`. Resolve `DEBT-12` before polishing this file.

### 8. `cleanup-sweeps.md` is strong, but `ai-rules.md` duplicates it

Severity: Medium  
Files: `cleanup-sweeps.md`, `ai-rules.md`

`cleanup-sweeps.md` is one of the clearest files. It defines named cleanup modes, good and bad targets, and the default "Do a cleanup run" behaviour.

The duplication problem is not inside `cleanup-sweeps.md`; it is that `ai-rules.md` repeats a mini cleanup workflow. That makes agents less likely to read the dedicated cleanup guide.

Recommendation: keep `cleanup-sweeps.md` as-is conceptually. In `ai-rules.md`, replace the cleanup section with a pointer plus two hard rules: one focused cleanup at a time, and cleanup is not redesign.

### 9. `tokens.md` is mostly in the right role

Severity: Low-Medium  
Files: `tokens.md`, `type-scale-plan.md`, `design-export.md`, `design-export.json`

`tokens.md` is a good canonical home for colour tokens, typography roles, and baseline spacing rules. It now includes the implemented type-role work that started as `type-scale-plan.md`.

The main risk is not `tokens.md` itself; it is that token/type guidance is also repeated in `type-scale-plan.md`, `design-export.md`, `design-export.json`, `ai-rules.md`, and `principles.md`.

Recommendation: keep `tokens.md` canonical. Treat `type-scale-plan.md` as a completed/historical plan or move it to archive. Treat design exports as reference only.

### 10. `type-scale-plan.md` looks like completed planning material

Severity: Medium  
Files: `type-scale-plan.md`, `tokens.md`, `current-scope.md`

`type-scale-plan.md` says the first implementation slice is complete and that the next pass should focus on reducing page-specific type overrides. Much of the durable type-role guidance now belongs in `tokens.md` and the current status belongs in `current-scope.md`.

It is still useful as history, but it no longer reads like an active canonical design-system rule file.

Recommendation: do not delete immediately. Move to `docs/design-system/archive/type-scale-plan.md` or convert it into a short `typography-debt`/cleanup item. If kept in place, label it clearly as historical/completed planning material.

### 11. `principles.md` is clear and should stay small

Severity: Low  
Files: `principles.md`

`principles.md` is one of the cleaner docs. It captures tone, visual strategy, hierarchy, composition, accessibility/trust, and decision bias without sprawling into implementation.

Recommendation: keep it. Use it as the design intent source. Do not let `ai-rules.md` restate it at length.

### 12. `design-export.md` and `design-export.json` are reference artifacts, not operating docs

Severity: Medium  
Files: `design-export.md`, `design-export.json`

These files preserve external/design-tool export material. They are useful if you still need a Stitch-compatible or machine-readable snapshot, but they are not canonical implementation guidance.

They contain their own rules, component examples, do/don't lists, and token metadata. This is fine as export content, but risky if agents read them as current operating instructions.

Recommendation: keep only if the export/reference use case matters. Move to `docs/design-system/reference/` and rename clearly if possible:

- `reference/design-export.md`
- `reference/design-export.json`

Add a top note that they are not updated during normal design-system work.

### 13. `README.md` should be a map, not another rules file

Severity: Medium  
Files: `README.md`

The README is a useful entry point, but it repeats active layer and legacy layer policy. It should mostly answer:

- what this folder is
- which file to read for which task
- what the canonical implementation sources are
- what not to treat as canonical

Recommendation: trim detailed policy from README after `architecture.md` and `ai-rules.md` are cleaned up.

### 14. `architecture.md` should become the canonical governance doc

Severity: Medium  
Files: `architecture.md`

`architecture.md` is currently close to the right role. It has purpose, source-of-truth hierarchy, layer model, rendered page roles, promotion workflow, cleanup workflow, and current-scope update rules.

This should be the canonical design-system governance doc. Some details from `README.md` and `ai-rules.md` should move here or link here.

Recommendation: keep and strengthen as the canonical ownership model. Avoid adding tactical checklists; those belong in `ai-rules.md` or `cleanup-sweeps.md`.

## Whole-Project File Disposition

| File | Current Function | Keep / Move / Fold | Recommended Future Role |
| --- | --- | --- | --- |
| `AGENTS.md` | Root AI bootstrap plus some project/design-system rules | Keep, trim | Minimal repo entry card pointing to project and design-system docs |
| `docs/project/README.md` | Whole-project operating manual | Keep, strengthen | Project reading order, tracker ownership, and maintenance rules |
| `docs/project/product-direction.md` | Product/audience/voice guidance | Keep | Canonical public content and brand direction |
| `docs/project/current-scope.md` | Public-site/app factual inventory | Keep, tighten | Current public-site/app scope ledger |
| `docs/project/project-debt.md` | Technical and maintainability debt tracker | Keep | Stable `DEBT-*` tracker; may later split design-system debt if it grows |
| `docs/project/site-backlog.md` | Deferred visitor-facing backlog | Keep | Stable `SITE-*` tracker with classification labels |
| `docs/project/task-log.md` | Durable milestone history | Keep | Curated project history, not a changelog |

## File-By-File Disposition

| File | Current Function | Keep / Move / Fold | Recommended Future Role |
| --- | --- | --- | --- |
| `README.md` | Entry point plus partial policy summary | Keep, trim | Folder map and reading guide |
| `ai-rules.md` | Large AI decision/rules manual | Keep, rewrite | Short operational checklist |
| `architecture.md` | Design-system governance and lifecycle | Keep, strengthen | Canonical ownership and workflow doc |
| `cleanup-sweeps.md` | Cleanup playbook | Keep | Dedicated cleanup guide |
| `components.md` | Component and pattern catalogue plus some rules | Keep, tighten | Catalogue of production-safe components/patterns |
| `current-scope.md` | Inventory plus some policy | Keep, tighten | Factual state ledger |
| `tokens.md` | Tokens and type baseline | Keep | Canonical token/type/spacing reference |
| `principles.md` | Design principles and visual tone | Keep | Canonical design intent source |
| `type-scale-plan.md` | Completed/partially historical typography plan | Move/archive or shorten | Historical plan or typography cleanup note |
| `design-export.md` | Reference design export with duplicate guidance | Move to reference | External/design-tool reference only |
| `design-export.json` | Machine-readable reference design export | Move to reference | External/design-tool reference only |

## Clean-Slate Structure With Free Rein

If rebuilding the whole AI/documentation structure from scratch, I would structure it like this:

```text
AGENTS.md
docs/
  project/
    README.md
    product-direction.md
    current-scope.md
    project-debt.md
    site-backlog.md
    task-log.md
    archive/
  reports/
  plans/
  design-system/
    README.md
    ai-rules.md
    governance.md
    current-scope.md
    foundations/
      principles.md
      tokens.md
      typography.md
    patterns/
      components.md
      heroes.md
      page-patterns.md
      forms.md
    maintenance/
      cleanup-sweeps.md
      migration-notes.md
    reference/
      design-export.md
      design-export.json
    archive/
      type-scale-plan.md
```

### Whole-Project Layer

`AGENTS.md`  
Root bootstrap only. It should be short enough that an agent actually follows it:

- Start at `docs/project/README.md`.
- Read product direction before public content changes.
- Read design-system README before UI/design changes.
- Update current scope, debt, backlog, and task log when relevant.

`docs/project/README.md`  
The whole-project operating manual. It owns reading order, tracker routing, and maintenance expectations.

`docs/project/product-direction.md`  
The project-level brand/content source. It should stay outside the design-system folder because it governs copy, audience, inclusion stance, and public positioning, not just visual design.

`docs/project/current-scope.md`  
Factual app/public-site scope. It should not become the design-system scope file and should not contain deep design-system policy.

`docs/project/project-debt.md`  
Technical and maintainability debt. It can include design-system maintenance debt for now, but if design-system debt grows, split that subset into `docs/design-system/maintenance/migration-notes.md` and link both ways.

`docs/project/site-backlog.md`  
Deferred visitor-facing work. Keep classification labels so it can split later without losing stable IDs.

`docs/project/task-log.md`  
Durable project memory. Keep curated and short.

### Design-System Layer

For the design-system folder alone, the proposed free-rein structure is:

```text
docs/design-system/
  README.md
  ai-rules.md
  governance.md
  current-scope.md
  foundations/
    principles.md
    tokens.md
    typography.md
  patterns/
    components.md
    heroes.md
    page-patterns.md
    forms.md
  maintenance/
    cleanup-sweeps.md
    migration-notes.md
  reference/
    design-export.md
    design-export.json
  archive/
      type-scale-plan.md
```

### What Each Design-System File Would Own

`README.md`  
Entry point only. It would contain a short folder map and "read this for that" table.

`ai-rules.md`  
A compact checklist for agents. It would not explain the whole system. It would say:

- read project direction first when public content is affected
- read governance for design-system ownership
- read components/patterns before adding UI
- read cleanup-sweeps for cleanup work
- never use legacy/doc-only classes in production
- update current-scope when design-system state changes

`governance.md`  
Renamed from `architecture.md`. This would own:

- source-of-truth hierarchy
- active/docs-only/legacy/reference layers
- promotion workflow
- page-scoped vs shared rules
- rendered design-system page roles
- update rules

`current-scope.md`  
Pure inventory:

- included
- partial
- legacy/reference
- not included
- explicitly out of scope

No long how-to sections.

`foundations/principles.md`  
Current `principles.md`, mostly unchanged.

`foundations/tokens.md`  
Colour, spacing, radius, shadow, motion, and source-of-truth tokens.

`foundations/typography.md`  
The stable pieces from `tokens.md` and `type-scale-plan.md` that explain type roles. This would replace the need for an active `type-scale-plan.md`.

`patterns/components.md`  
React component catalogue. It would be explicit about whether `Card` is active, legacy, or under review.

`patterns/heroes.md`  
Canonical hero system guidance. The current hero details are scattered across `components.md`, `tokens.md`, `ai-rules.md`, `current-scope.md`, and rendered examples.

`patterns/page-patterns.md`  
Shared page-level patterns like `site-grid`, `site-highlight`, `site-split`, CTA, trust strip, detail stack, topic cards, contact strip, fee card, principles, and rich text.

`patterns/forms.md`  
Enquiry form and future form pattern guidance. This would reduce the amount of form-specific detail inside `components.md`.

`maintenance/cleanup-sweeps.md`  
Current `cleanup-sweeps.md`, mostly unchanged.

`maintenance/migration-notes.md`  
Where active migration issues live: `Card` boundary, side-stripe exceptions, legacy CSS layers, route name `/design-language`, docs shell migration. This could also link to `DEBT-*` items rather than duplicate them.

`reference/design-export.md` and `reference/design-export.json`  
Reference-only exports. Not part of the normal AI reading path.

`archive/type-scale-plan.md`  
Historical plan after its durable content is folded into `foundations/typography.md` and current status is represented in `current-scope.md`.

## Minimum-Change Structure

If you do not want a folder reshuffle yet, the lower-risk version is:

```text
docs/design-system/
  README.md              # trim to map
  ai-rules.md            # rewrite as checklist
  architecture.md        # canonical governance
  current-scope.md       # factual inventory
  principles.md          # keep
  tokens.md              # keep
  components.md          # tighten catalogue
  cleanup-sweeps.md      # keep
  type-scale-plan.md     # mark archived/historical or move later
  design-export.md       # mark reference-only
  design-export.json     # mark reference-only
```

This would fix most confusion without changing imports, links, or rendered docs.

## Recommended Cleanup Sequence

1. Decide whether to do the clean-slate folder structure or the minimum-change cleanup.
2. Trim `AGENTS.md` into a root bootstrap, with detailed reading order left in `docs/project/README.md`.
3. Add an explicit ownership table to `docs/project/README.md` covering project docs, design-system docs, reports, and plans.
4. Resolve `DEBT-12` enough to clarify `Card`, `.card`, and `.site-card`.
5. Resolve or document `DEBT-14` enough to clarify side-stripe exceptions.
6. Rewrite `docs/design-system/ai-rules.md` as a compact checklist.
7. Trim `docs/design-system/README.md` to a map and remove duplicated policy detail.
8. Keep `architecture.md` as the canonical governance doc, or rename it to `governance.md` if doing the clean-slate structure.
9. Move or clearly label `type-scale-plan.md` as historical after durable type guidance is represented in `tokens.md` or a new typography doc.
10. Move design export files into `reference/` or keep them with stronger reference-only labelling.
11. Tighten both current-scope files into factual state ledgers: project scope for app/site state, design-system scope for visual/component state.
12. Keep `docs/reports/` and `docs/plans/` as report/plan storage only; do not make the Documents route a general docs browser.

## Proposed Whole-Project Ownership Table

| Question | Canonical File |
| --- | --- |
| Where does an agent start? | `AGENTS.md`, then `docs/project/README.md` |
| What is the public product direction? | `docs/project/product-direction.md` |
| What does the site/app currently include? | `docs/project/current-scope.md` |
| Where is technical/API/routing/deployment debt tracked? | `docs/project/project-debt.md` |
| Where is deferred visitor-facing work tracked? | `docs/project/site-backlog.md` |
| Where is durable milestone history tracked? | `docs/project/task-log.md` |
| Where do generated reviews and audits live? | `docs/reports/` |
| Where do draft implementation plans live? | `docs/plans/` |
| Where does visual/design-system work start? | `docs/design-system/README.md` |

## Proposed Design-System Ownership Table

| Question | Canonical File |
| --- | --- |
| What should an AI read before UI work? | `ai-rules.md` |
| What is the source-of-truth hierarchy? | `architecture.md` / future `governance.md` |
| Which classes/layers are active or legacy? | `architecture.md` for policy, `current-scope.md` for current state |
| What components and patterns can I use? | `components.md` |
| What are the visual principles? | `principles.md` |
| What are the tokens and type roles? | `tokens.md` plus possible future `typography.md` |
| How do I do cleanup? | `cleanup-sweeps.md` |
| What exists right now? | `current-scope.md` |
| What is just reference/export material? | `reference/design-export.*` |
| What is historical planning? | `archive/type-scale-plan.md` |

## Bottom Line

I would not remove files simply because they were not central to the first report. With full review of the project and design-system guidance, the better recommendation is:

- Keep the new project layer and make `AGENTS.md` thinner, not bigger.
- Let `docs/project/README.md` own the whole-project operating model.
- Keep the useful canonical docs.
- Rewrite `ai-rules.md` into a short checklist.
- Make `architecture.md` the single governance source.
- Keep `current-scope.md` factual.
- Move exports to reference.
- Move completed plans to archive.
- Split foundations and patterns only if you want a cleaner long-term folder structure.

The current docs are not broken; they are over-crosslinked and over-repetitive. The cleanup should be about assigning each rule one home across the entire project, not only inside `docs/design-system/`.
