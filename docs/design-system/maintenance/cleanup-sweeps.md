# Cleanup Sweeps

Use this file when the goal is to improve the codebase through a small, focused, behaviour-preserving maintainability change.

A cleanup sweep is source-led. It can inspect any authored implementation surface, including CSS, TypeScript/TSX, JavaScript/MJS, React components and hooks, scripts, tests, route and API code, build tooling, and configuration. It is not limited to the visual system.

## Default Command

`Do a cleanup run.`

Meaning:

1. Inspect authored code directly for one high-value maintainability cleanup.
2. Choose one focused, low-risk improvement.
3. Prefer a clear architectural or maintenance gain over cosmetic churn.
4. Preserve public behaviour, copy, routes, and visual intent unless explicitly asked.
5. Verify with `npm run build` when code changes are made.

## Source-First Discovery Boundary

- Begin with executable source, styles, scripts, tests, and configuration. Use code searches, import and call-site traces, dependency relationships, test coverage, and local implementation evidence to find the target.
- Do not read `site-backlog.md`, `launch-readiness.md`, `project-debt.md`, current-scope documents, task logs, reports, plans, checklists, or archives to source or select cleanup work.
- Existing tracker items and prior reviews are not cleanup-sweep queues. Do not choose a target because a document already describes it.
- After a source-discovered target is selected, consult only the documentation needed to preserve a relevant contract or update factual scope affected by the completed change.
- The sole discovery-stage tracker exception is the too-large finding workflow below. Consult `project-debt.md` only after source inspection has independently exposed a worthwhile issue that cannot safely fit in the sweep.

## Findings Too Large For One Sweep

If source inspection exposes a worthwhile maintainability issue that is too broad, risky, ambiguous, or difficult to verify as one focused sweep:

1. Do not force the issue into the current cleanup.
2. Search `project-debt.md` narrowly for the same problem.
3. If an active `DEBT-*` item already tracks the same problem, add any materially new code evidence to that item rather than creating a duplicate.
4. Otherwise, add a new `DEBT-*` item automatically, using the tracker's next stable ID and normal fields. Set its source to the source-first cleanup sweep, cite the concrete files or code paths that exposed it, and give it a small, actionable next investigation or implementation step.
5. Continue looking in code for a smaller cleanup that can be completed safely in the current sweep.

Record only concrete, durable maintenance pressure. Do not create debt for a speculative concern, a stylistic preference, or an idea without implementation evidence.

## Sweep Rules

- Choose one meaningful cleanup target.
- Do not mix cleanup with new feature work unless asked.
- Do not introduce a new abstraction unless it removes real duplication.
- Do not convert working CSS into an abstraction maze.
- If a pattern is only used once, leave it alone unless it is clearly harmful.
- If visual risk is high, choose a different sweep.
- Update factual docs only when the completed cleanup changes the scope they own.

## Named Sweeps

### Cleanup Run Sweep

Default broad sweep. Inspect code for one repeated outcome, overly nested structure, unclear responsibility, brittle dependency, or shared pattern that can be simplified.

### Module And Component Boundary Sweep

Look for mixed responsibilities, avoidable coupling, repeated state or transformation logic, awkward prop threading, or module boundaries that make a small change unnecessarily difficult.

### Script And Tooling Sweep

Look for duplicated filesystem or route logic, inconsistent command behaviour, obsolete compatibility paths, fragile process assumptions, or scripts whose responsibilities can be made clearer without changing outputs.

### Test Architecture Sweep

Look for duplicated setup, brittle selectors, unclear fixtures, unnecessarily broad assertions, or missing shared helpers where repeated test intent is already evident.

### Duplicate Logic Sweep

Look for repeated validation, mapping, normalization, metadata, routing, or data-transformation logic that has one real shared contract.

### Token Alignment Sweep

Look for hard-coded radii, shadows, borders, colours, or repeated RGBA values where an existing token already fits.

### Duplicate Pattern Sweep

Look for multiple blocks creating the same card, panel, strip, note, grid, or docs shell treatment.

### Legacy Alias Sweep

Look for older variable aliases, transitional classes, or old layers that now have a current shared replacement.

### Override Chain Sweep

Look for selectors that are immediately overridden, repeated media-query fixes, or rules that can be expressed more directly.

### Selector Simplification Sweep

Look for selectors that are more specific than necessary or depend too heavily on markup shape.

### Markup And Class Complexity Sweep

Look for wrappers or class stacks that do not add layout, semantics, accessibility, or maintainability value.

### Shared Outcome Convergence Sweep

Look for different pages solving the same UI outcome with different structures.

### Shared Pattern Promotion Sweep

Look for page-scoped classes that now clearly represent a shared need.

### Dead CSS Sweep

Look for classes no longer referenced in source, demo-only rules left behind, or old route/test-bed CSS that is no longer used.

### Responsive Consistency Sweep

Look for repeated mobile fixes for the same pattern or duplicated media-query logic.

### Spacing Rhythm Sweep

Look for repeated panel/card spacing that should use the shared rhythm.

### Form System Sweep

Look for form, contact, and fee blocks drifting from the shared surface language.

### Docs Shell Sweep

Look for docs/dev styles that should live in `src/styles-dev.css` rather than production CSS.

### Route/Layout Config Sweep

Look for repeated route aliases, repeated layout decisions, or route-specific UI logic that should be centralized.

## Good Targets

- Shared patterns used in more than one place.
- Repeated logic with one clear behavioural contract.
- Modules or functions with avoidably mixed responsibilities.
- Scripts, configuration, or test setup with concrete duplication or brittleness.
- Repeated literals that already have tokens.
- Legacy layers with clear replacements.
- Duplicated mobile fixes.
- Repeated page outcomes with inconsistent implementations.
- Over-specific selectors and brittle class chains.

## Bad Targets

- Large redesigns disguised as cleanup.
- Purely stylistic preference changes.
- Broad renaming without maintainability gain.
- Refactors touching many pages without a tight verification path.
- Replacing simple CSS with complex abstractions.
- Flattening markup needed for semantics, accessibility, or layout.
- Work selected from a tracker, backlog, report, plan, or prior audit instead of discovered in code.

## Suggested Workflow

1. Inspect code and identify one cleanup opportunity.
2. Explain the exact simplification.
3. Make the smallest complete change.
4. Verify appropriately.
5. Record any independently discovered too-large finding as project debt.
6. Summarize the maintainability improvement and verification.
