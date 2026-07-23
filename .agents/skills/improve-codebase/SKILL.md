---
name: improve-codebase
description: Inspect an existing repository directly to find and complete its strongest source-supported, behaviour-preserving maintainability improvement without minimizing the solution by diff size or file count. Use for cleanup runs or sweeps, open-ended codebase improvement, maintainability cleanup, structural refactoring, CSS cleanup, or a requested architecture, tooling, configuration, or test focus. If the best complete resolution cannot be implemented and verified safely in one pass, record project debt as the outcome instead of substituting a smaller change.
---

# Improve Codebase

Improve one coherent source-discovered maintainability problem at the scope its
best complete solution requires. Treat a well-supported debt record as a
completed outcome when implementation cannot be finished safely in the current
pass.

## Establish the boundary

- Follow the current task and repository instructions. Preserve unrelated
  worktree changes.
- Select one root maintainability problem per run. Define one problem by its
  coherent cause and complete end state, not by the number of symptoms, files,
  components, or layers involved. Resolve every related consequence required to
  establish that end state, even when the resulting refactor is broad.
- Stop after implementing and verifying that end state, or after recording it as
  project debt. Do not select or implement a second independent problem in the
  same run.
- Treat a cleanup run or sweep as authorization to implement the selected
  behaviour-preserving improvement. For review-only or diagnosis-only requests,
  report the finding and resolution direction without editing.
- Keep new features, public-copy changes, route changes, and visual redesign out
  of scope unless the task explicitly includes them.
- Preserve public behaviour, accessibility, data flow, copy, routes, and visual
  intent unless the task authorizes a change.

## Set the discovery focus

Use a repository-wide focus by default. Inspect any authored implementation
surface, including application code, styles, components, scripts, tests, API and
route code, build tooling, and configuration.

Narrow discovery only when the user requests one of these focus families:

- **CSS and visual-system architecture:** Inspect stylesheet ownership and
  global sprawl, cascade and override chains, duplication, selector and markup
  complexity, obsolete rules, tokens, responsive rules, and shared visual
  outcomes. Follow dependencies into TSX, components, tokens, configuration,
  tests, or other files and change them whenever the complete CSS resolution
  requires it. Treat requests for token alignment, dead CSS, legacy aliases,
  selector simplification, responsive consistency, spacing rhythm, or shared
  pattern work as this focus.
- **Modules, components, and shared logic:** Inspect mixed responsibilities,
  coupling, repeated transformations or state, awkward data flow, and duplicate
  behavioural contracts.
- **Scripts, tooling, and configuration:** Inspect repeated filesystem or route
  logic, inconsistent commands, obsolete compatibility paths, fragile process
  assumptions, and unclear tool responsibilities.
- **Test architecture:** Inspect duplicated setup, brittle selectors, unclear
  fixtures, unnecessarily broad assertions, and repeated test intent.

A focus limits where discovery begins, not which files the solution may change.

## Discover from source

1. Begin with executable source, styles, scripts, tests, and configuration.
2. Use searches, import and call-site traces, dependency relationships, tests,
   and local implementation evidence to identify credible opportunities.
3. Inspect enough of the selected focus to compare meaningful candidates. Do not
   stop at the first easy fix.
4. Do not use trackers, backlogs, reports, plans, task logs, current-scope
   documents, or archives to source or rank candidates.
5. Compare candidates by concrete maintenance cost, reach, clarity of the
   desired end state, completeness, regression risk, and available verification.
   Do not favour a small diff, low file count, or cosmetic tidiness.
6. Select the strongest evidence-backed opportunity that forms one coherent
   problem.

After selection, read only the domain guidance needed to preserve a contract,
understand an approved API, verify behaviour, or update factual documentation.

## Decide between implementation and debt

Define the best complete end state before editing. Let that end state determine
the necessary files and layers.

Implement it in the current pass when:

- the problem and intended architecture are understood;
- affected dependencies and call sites can be traced;
- no unresolved product, safety, or irreversible decision blocks the work;
- no external coordination or staged migration is required; and
- relevant behaviour can be verified credibly.

Do not classify work as too large merely because it crosses layers, touches many
files, or demands substantial implementation. When the complete resolution does
not meet the criteria above:

1. Do not implement a symptom, partial model, or smaller consolation cleanup.
2. Search the active project-debt tracker narrowly for the independently
   discovered problem.
3. Update the existing item when it represents the same pressure and the source
   inspection adds material evidence.
4. Otherwise create the next stable `DEBT-*` item using the tracker's normal
   fields. Cite the concrete source evidence, describe the best known resolution,
   explain why it cannot be completed safely in this pass, and name the next
   investigation or decision.
5. Stop. Treat the debt record as the cleanup outcome.

Record only durable, evidence-backed maintenance pressure. Do not create debt
for speculative concerns or stylistic preferences.

## Implement the complete resolution

- Make every change required to establish one clear model or responsibility.
- Remove obsolete callers, paths, compatibility layers, rules, and tests made
  unnecessary by the new end state. Do not leave known cleanup solely to shrink
  the diff.
- Introduce an abstraction only when it establishes a clear contract or removes
  demonstrated duplication, coupling, or complexity.
- Avoid converting simple code or CSS into an abstraction maze.
- Update factual documentation only when the completed work changes the state it
  owns.

## Verify and report

- Run the most relevant targeted tests and static checks for the affected
  surfaces.
- Run `npm run build` for code changes unless the task or environment explicitly
  prevents it.
- For CSS or visually risky work, inspect the affected rendered routes and
  responsive states with browser or screenshot checks.
- When verification fails, determine whether the selected change caused the
  failure. Fix regressions caused by the change. Leave unrelated or pre-existing
  failures untouched, report them with evidence, and do not expand the run into
  a second problem.
- Run `git diff --check`, inspect the complete diff, and confirm unrelated
  worktree changes remain untouched.
- Report the problem selected, why it was stronger than the alternatives
  inspected, the completed end state, and verification. If debt was the outcome,
  report the item and the exact reason implementation was deferred.
