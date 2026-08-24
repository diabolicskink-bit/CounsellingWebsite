---
name: code-quality-pass
description: Holistically review and improve the structure, readability, maintainability, simplicity, and behaviour of a user-specified implementation surface or code change set using senior engineering judgment. Use when the user asks to review, improve, simplify, clean up, or give a quality pass to named files, pages, components, features, HTML or templates, stylesheets, scripts, tests, configuration, or a working-tree, commit, branch, or pull-request diff. Unless the user explicitly asks for review-only findings, implement all justified in-scope improvements and verify the result. Do not use for repository-wide cleanup sweeps.
---

# Code Quality Pass

Take senior-level ownership of the supplied code surface or change set and leave
it in the strongest justified state for its current requirements. This is not
primarily a bug hunt, style audit, or search for one isolated improvement.
Working code may still warrant meaningful structural improvement.

Judge the result along two inseparable dimensions:

- Internal quality: the code is simple, clear, cohesive, easy to reason about,
  and straightforward to change.
- Observable quality: the implementation is correct, reliable, accessible,
  secure, performant, and well integrated where those qualities are relevant.

Neither dimension is a substitute for the other. Improve every material issue
supported by the evidence, then stop rather than manufacturing churn.

## Establish the real boundary

- Treat the user's named surface or change set as the selection boundary. Do not
  replace it with a repository-wide search for a different opportunity.
- Interpret that boundary semantically. A page or feature can include its
  application code, components, HTML or templates, CSS, scripts, tests, types,
  configuration, and data flow. A named file can require inspecting its callers,
  dependencies, contracts, and relevant history before judging it responsibly.
- For a change set, review both the diff and the resulting source state. Look for
  regressions, incomplete migrations, stale parallel approaches, and whether the
  new whole is better than the code it replaces.
- Change adjacent files only when they belong to the same supplied surface or
  are necessary to complete, simplify, integrate, or verify its improvement.
  Preserve unrelated worktree changes and repository concerns.
- Infer a coherent boundary from the task and repository context. Ask only when
  materially different interpretations would produce meaningfully different
  work.

Unless the user explicitly requests review-only findings, implement supported
improvements within that boundary. For review-only work, make no edits and
report only material findings.

## Review the implementation as a whole

Use the following as connected lenses, not a box-ticking sequence:

- **Structure and ownership.** Assess file, module, component, function, and
  style boundaries; cohesion; responsibility placement; proximity of related
  logic; coupling; and whether each important fact has a clear source of truth.
- **Readability and local reasoning.** Assess names, control flow, state and data
  flow, side effects, conditions, interfaces, and comments. Prefer code that can
  be understood without tracing avoidable indirection across the repository.
- **Simplicity and proportionality.** Find unnecessary layers, abstractions,
  wrappers, configuration, defensive machinery, semantic duplication, and
  incidental complexity. Do not confuse more architecture with better code.
- **Maintainability and completeness.** Consider the next realistic changes the
  code is likely to receive, opportunities for drift, brittle coupling, and
  obsolete or superseded code, styles, compatibility paths, comments, tests, or
  configuration that should disappear from the improved end state.
- **Behaviour and integration.** Check intended behaviour, realistic edge and
  failure cases, callers, dependencies, routes, data contracts, external
  interfaces, browser or runtime behaviour, and consistency with the rest of
  the selected surface.
- **Relevant technical qualities.** Apply accessibility, semantic markup,
  responsive behaviour, security, privacy, performance, reliability,
  testability, and appropriate language, platform, and framework use when the
  reviewed code actually engages them.
- **Tests and verification.** Judge whether tests provide useful confidence in
  observable behaviour and important contracts, miss a material risk, duplicate
  one another, or freeze implementation shape so tightly that safe improvement
  becomes difficult.

Judge each medium on its own terms. For example, component code has composition,
state, and effect concerns; HTML has structure and semantics; CSS has ownership,
cascade, responsive behaviour, and dead-rule concerns; scripts have data flow,
side effects, and failure behaviour; tests have confidence and brittleness
concerns. Do not reduce a mixed-surface review to the functional behaviour of its
primary programming language.

A functional defect does not end the pass: correct it, then continue assessing
the internal design. Conversely, do not rewrite clear working code merely to
express a subjective preference or fashionable pattern.

## Keep improvements proportionate

This repository is a small site maintained by one developer. Judge architecture,
defensive code, and coverage against that operating model rather than assuming
multi-team coordination, enterprise extensibility, generalized administration,
or safeguards against other maintainers.

- Solve demonstrated current problems and realistic near-term needs, not
  hypothetical future requirements.
- Prefer deleting, combining, flattening, moving responsibility to its natural
  owner, or making a direct local correction over adding another layer, helper,
  option, dependency, or framework.
- Introduce an abstraction only when it clarifies a real contract, consolidates
  genuinely shared semantics, or materially improves local reasoning. Small,
  readable duplication can be better than premature generalization.
- Scale protection to realistic likelihood and consequence. Untrusted input,
  authentication, privacy, destructive actions, and production data can justify
  strong boundaries even on a single-developer site.
- Protect a high-impact invariant at its clearest authoritative boundary. Add
  defence-in-depth only when another layer addresses a distinct realistic
  failure mode; do not repeat equivalent environment, permission, or data guards
  merely to prevent the sole maintainer from intentionally changing the code.
- Prefer focused behavioural and contract tests over collections that duplicate
  the same protection, exhaust hypothetical misuse of internal helpers, or make
  safe refactoring artificially difficult.
- Before removing an existing guard or test, confirm that it does not protect a
  separate trust boundary, regression, failure mode, or irreversible effect.
- Preserve intended public behaviour, visual direction, copy, routes, data
  contracts, and external interfaces unless the task authorizes a change or the
  review establishes a clear defect. Keep feature work and visual redesign out
  of scope unless the user includes them.

Every edit must have a concrete quality benefit that can be named. The objective
is not minimal diff size, maximal change, stylistic uniformity, or theoretical
purity; it is the best proportionate implementation of the current requirements.

## Complete the pass

Implement the coherent set of justified improvements rather than stopping after
the first finding. Update necessary callers, styles, tests, types, configuration,
and documentation inside the selected boundary, and remove superseded code
instead of leaving parallel approaches behind.

Then inspect the complete resulting state, not only the edits. Confirm that:

- the code is easier to understand and change;
- complexity was removed rather than displaced;
- responsibilities and sources of truth are clearer;
- behaviour and integration remain sound; and
- the pass did not introduce speculative machinery or unrelated scope.

Verify in proportion to the affected surface and risk using the most relevant
static checks, tests, build checks, or rendered inspection. Inspect the complete
diff and run `git diff --check`. Fix regressions caused by the pass without
expanding into unrelated pre-existing problems.

Stop when no material evidence-backed improvement remains inside the supplied
boundary. There is no requirement to change every file or pursue stylistic
perfection. Report the boundary reviewed, material improvements made, structural
or behavioural reasoning behind them, and verification performed. Mention any
important issue deliberately left unchanged because it was outside scope,
unsupported by evidence, or required a user decision.
