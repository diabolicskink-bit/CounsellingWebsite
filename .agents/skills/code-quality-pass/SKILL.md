---
name: code-quality-pass
description: Review and improve a specified implementation or change set as a very senior programmer, making it well designed and well written while identifying and correcting defects. Use for code reviews, quality passes, and requests to improve or refactor named code, components, pages, styles, scripts, tests, configuration, or diffs. Implement justified improvements unless the user requests findings only. Repository-wide cleanup sweeps use their separate skill.
---

# Code Quality Pass

Review the implementation as a very senior programmer taking responsibility for
its quality. Assess whether it is written in the best way for its actual purpose
and context, and implement the improvements that judgment supports. Examine both
the overall engineering choices and the craftsmanship of individual lines.

Making code better written is a central outcome of the pass. Actively improve
working code where a better implementation is justified. A functional defect,
failing test, or anticipated future bug is not a prerequisite for improving its
design, organisation, simplicity, or expression. Identify and correct defects
alongside that work, and verify the resulting behaviour.

## Establish purpose and scope

Read the governing repository guidance and enough of the current implementation
to understand its responsibilities, real consumers, intended behaviour, and
maintenance needs. Inspect relevant callers, dependencies, styles, tests, and
configuration. Source and executable contracts establish implementation facts;
plans and historical notes provide supporting context.

Treat the user's named surface or change set as the selection boundary. A page
or feature can span several files; a named file may need adjacent changes to
complete its improvement. For a diff, assess both the changes and the resulting
implementation. Preserve unrelated working-tree changes and keep feature work
and repository-wide cleanup outside the review.

Implement justified improvements unless the user requests review-only findings.
In review-only mode, assess the same engineering and craftsmanship questions and
report recommended improvements and defects without editing. Follow repository
rules for verification, project memory, and Git actions.

Calibrate decisions to the real product and operator. In this repository, use
`AGENTS.md` and the relevant project guidance for the public counselling site,
owner-only analytics, shared infrastructure, and their different risk and
verification boundaries. The small operating model favours direct, maintainable
solutions. Data correctness, enquiry delivery, authentication, and privacy still
warrant careful treatment wherever the selected implementation engages them.

## Judge the engineering choices

Form a view of the implementation as a whole before settling on local changes.
Ask how well its design expresses the problem it solves:

- **Responsibilities and boundaries:** Are modules, components, functions, and
  styles cohesive? Does each responsibility live with the code that naturally
  owns it? Is related logic easy to understand together?
- **Representation and contracts:** Do the data structures, types, parameters,
  return values, and interfaces express the domain and its constraints clearly?
  Do callers have a straightforward contract to work with?
- **Control and data flow:** Are decisions, transformations, state, mutation,
  effects, and errors easy to follow? Is the important sequence of work visible?
- **Abstractions and dependencies:** Do helpers and shared layers clarify real
  responsibilities? Is useful logic buried in indirection, or is an important
  concept repeatedly reimplemented? Would combining, separating, moving, or
  removing code make the whole easier to maintain?
- **Implementation approach:** Are algorithms, language features, and framework
  mechanisms well chosen for the work? Does the solution carry avoidable
  complexity, duplicated sources of truth, brittle coupling, or obsolete paths?

Consider practical alternatives where the current arrangement can be improved.
Existing structure is open to revision within the selected scope. Choose the
form that best serves current requirements and realistic maintenance, including
meaningful restructuring when that produces a better implementation.

Apply this judgment to every medium in the selected surface. CSS has selector,
cascade, ownership, and responsive concerns; markup has semantic structure and
accessible relationships; scripts have sequencing and failure behaviour; tests
have readable scenarios, useful contracts, and understandable failure messages.

## Review the individual lines

Perform a deliberate craftsmanship pass over the selected implementation even
when its architecture and behaviour are sound. Read the code in the order a
maintainer encounters it, and assess how well each part communicates its work:

- Names should express meaning, role, units, and lifecycle accurately. Review
  vague, misleading, overlong, or unnecessarily abbreviated names in context.
- Functions and blocks should have a coherent shape, a clear sequence, and an
  appropriate level of detail. Keep related operations together and make their
  dependencies apparent.
- Conditions, expressions, transformations, and return paths should be direct
  and easy to reason about. Choose intermediate values, branches, early returns,
  or language idioms where they make the logic clearer.
- Parameters, destructuring, defaults, types, and error handling should make the
  contract legible. Remove ceremony and repeated work that obscure it.
- Comments should preserve useful intent, constraints, and non-obvious reasons.
  Improve the code where it can explain itself; retain or add comments where
  the reason belongs in words. Remove stale or purely narrating comments.
- Organisation, grouping, and local conventions should help the reader follow
  the implementation. Assess awkward details as well as large structural choices.

Use the form that communicates the work best. An explicit branch or intermediate
value can improve concise but difficult code; a direct expression can improve
needlessly elaborate code. Line count alone does not establish quality.

## Exercise judgment and complete the improvements

For each change, be able to explain the concrete engineering or craftsmanship
benefit. Clearer meaning, less mental translation, stronger cohesion, simpler
reasoning, and easier modification are sufficient benefits in their own right.
Use comparative judgment about the actual code; a personal preference without a
clear benefit does not justify replacing an equally good implementation.

Let the improvement determine the necessary extent of the edit. This may be a
precise local refinement or a substantial reorganisation of the named surface.
Complete the coherent set of improvements, update affected consumers and
contracts, and remove superseded implementation. Reassess the result so that
individual edits form a well-written whole.

Keep architecture proportionate to demonstrated needs. Add an abstraction when
it clarifies a real concept or shared responsibility; combine or remove one
when it obscures them. Scale guards and tests to actual failure consequences,
and understand the protection they provide before removing them. Preserve
intended behaviour, public copy, visual direction, routes, and external contracts
unless the task authorizes a change or the review establishes a defect.

## Check correctness and integration throughout

Trace the implementation's relevant behaviour, including realistic edge cases,
failure paths, callers, and side effects. Address correctness, accessibility,
security, privacy, reliability, and performance where the surface warrants them.
Resolve defects discovered during either the design or craftsmanship review and
continue assessing the quality of the implementation as a whole.

Use focused verification suited to what changed and to repository policy.
Prefer relevant existing coverage. Add or update tests for changed behavioural
contracts, meaningful regressions, consequential side effects, or data/security
boundaries. Routine naming and organisation improvements usually need existing
checks and source review; tests should provide confidence in behaviour and
contracts without freezing incidental implementation details.

When a substantial or complex review warrants independent perspectives and
delegation is authorized, use bounded reviewers for engineering choices,
line-level craftsmanship, or behaviour and failure modes. Resolve their
recommendations against the source and product context; the primary reviewer
owns the integrated result.

## Judge the finished implementation

Reread the complete resulting surface after editing, including a fresh line-level
pass over rewritten code. Assess whether the design choices work together,
whether the code is well organised and well expressed, and whether behaviour
and integration remain sound. Passing tests establishes only part of that
assessment; the writing and engineering still require judgment.

Finish when the selected implementation has received both levels of review,
the worthwhile improvements you can justify are complete, and the relevant
checks pass or their limitations are clearly identified. Already well-written
code may need no edits. There is no target diff size or required finding count.
Inspect the final diff and run `git diff --check` when changes were made.

Report how the implementation became better designed or better written and why
those changes help, together with defects corrected and verification performed.
Explain consequential tradeoffs or remaining issues. If no changes were justified,
say so and describe the basis for that assessment.
