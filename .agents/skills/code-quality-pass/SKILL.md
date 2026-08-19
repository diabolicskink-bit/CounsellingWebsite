---
name: code-quality-pass
description: Holistically review and improve a user-specified implementation surface or code change set using senior engineering judgment. Use when the user asks to review, improve, simplify, clean up, or give a quality pass to named files, pages, components, features, HTML or templates, stylesheets, scripts, tests, configuration, or a working-tree, commit, branch, or pull-request diff. Unless the user explicitly asks for review-only findings, implement all justified in-scope improvements and verify the result. Do not use for repository-wide cleanup sweeps.
---

# Code Quality Pass

Leave the supplied code surface or change set in the strongest justified state
for its current requirements. Use senior engineering judgment rather than
checklist compliance. The best result is correct, simple, clear, cohesive,
maintainable, and proportionate to the problem.

## Own the supplied boundary

- Treat the user's named surface or change set as the selection boundary. Do not
  replace it with a repository-wide search for a different opportunity.
- Interpret a surface semantically. A page or feature may include its relevant
  application code, components, HTML or templates, CSS, scripts, tests, types,
  configuration, and data flow. A file may require inspecting its callers,
  dependencies, and contracts before it can be judged responsibly.
- For a change set, review both the diff and the resulting source state. Include
  the surrounding implementation needed to understand intent, integration,
  regressions, incomplete migrations, and whether the change is simpler than
  the code it replaces.
- Change adjacent files only when they are part of the same supplied surface or
  are necessary to complete, simplify, integrate, or verify its improvement.
  Preserve unrelated worktree changes and unrelated repository concerns.
- Infer a reasonable coherent boundary from the task and repository context.
  Ask only when materially different interpretations would produce different
  work.

Unless the user explicitly requests review-only findings, treat a code quality
pass as authorization to implement supported improvements within that boundary.
For review-only work, make no edits and report only material findings.

## Apply the quality bar

Consider the implementation as a whole and address every material issue within
scope rather than selecting one finding and stopping. Give greatest weight to:

- correctness, edge cases, failure behaviour, and preservation of intended
  behaviour;
- unnecessary complexity, indirection, duplication, and fragmented ownership;
- clear responsibilities, interfaces, data flow, names, and local reasoning;
- appropriate use of the language, platform, framework, and repository's actual
  supported contracts;
- accessibility, security, performance, reliability, and testability where they
  are relevant to the code under review; and
- removal of obsolete code, styles, compatibility paths, comments, tests, or
  configuration made unnecessary by the improved end state.

Preserve public behaviour, visual intent, copy, routes, data contracts, and
external interfaces unless the task authorizes a change or a clear defect must
be corrected. Keep feature work and visual redesign outside the pass unless the
user includes them.

## Resist overengineering

- Solve demonstrated current problems, not hypothetical future requirements.
- Prefer deleting, combining, flattening, or making a direct local correction
  over adding a layer, helper, option, dependency, or framework.
- Introduce an abstraction only when it clarifies a real contract or removes
  demonstrated semantic duplication, coupling, or complexity. Small readable
  duplication can be better than a premature abstraction.
- Do not replace straightforward working code merely with a more fashionable
  pattern, enforce consistency that erases useful differences, or add
  configurability without a present need.
- Keep defensive handling and tests proportionate to realistic risks. Do not
  manufacture edge cases, comments, or coverage solely to make the solution
  appear comprehensive.
- Every edit should have a concrete benefit that can be named. If the existing
  implementation is already strong, leave it alone rather than creating churn.

Stop when no material, evidence-backed improvement remains inside the supplied
boundary. There is no requirement to change every file or to pursue stylistic
perfection.

## Complete and verify the pass

Implement the coherent set of justified improvements, including necessary
call-site, style, test, and configuration updates. Remove superseded code rather
than leaving parallel approaches behind.

Verify behaviour in proportion to the affected surface and risk. Use the most
relevant static checks, tests, build checks, or rendered inspection; inspect the
complete resulting diff and run `git diff --check`. Fix regressions caused by
the pass without expanding into unrelated pre-existing problems.

Report the boundary reviewed, the material improvements made, the simplification
or quality reasoning behind them, and the verification performed. Mention any
important issue deliberately left unchanged because it was outside scope,
unsupported by evidence, or required a user decision.
