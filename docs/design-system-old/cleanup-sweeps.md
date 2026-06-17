# UI Cleanup Sweeps For AI

Use this file when the goal is not to redesign the site, but to steadily simplify the UI system and reduce maintenance cost.

This repo has a lot of CSS, a long history, and a mix of older and newer layers. Cleanup work should usually happen as a series of small, named sweeps rather than one large refactor.

Cleanup does not only mean CSS. It can include:

- simplifying page structure when several pages solve the same UI problem in different ways
- reducing unnecessary wrapper markup or nested class chains
- converging repeated page-level implementations into shared components or shared classes
- reducing route/layout duplication when UI behaviour depends on repeated route decisions
- making shared outcomes use one shared pattern instead of several page-specific versions

## Authoritative Command

Use this as the single default command:

- `Do a cleanup run.`

Meaning of `Do a cleanup run.`:

1. Inspect the codebase for one high-value maintainability cleanup.
2. Consider CSS, page structure, repeated page patterns, nested class complexity, shared component opportunities, and route/layout duplication.
3. Choose one focused, low-risk improvement only.
4. Prefer simplification of the shared system over page-specific restyling.
5. Verify with `npm run build` when code changes are made.

## Default Cleanup Behaviour

When asked to do a cleanup sweep, the AI should:

1. Pick one focused cleanup target.
2. Prefer shared-system simplification over visual change.
3. Reuse the current authoritative system: `site-*`, `hero-*`, shared tokens, and `src/styles-dev.css` for `ds-*`.
4. Consider CSS, markup shape, page-level duplication, nested class depth, and shared component opportunities.
5. Avoid redesigning layouts or changing content hierarchy unless explicitly asked.
6. Remove duplication or indirection only when the result is clearly simpler.
7. Keep edits small enough to verify with `npm run build`.
8. Preserve behaviour and tone; cleanup is not a permission slip to restyle the site.

## What To Look For

### 0. Cleanup Run Sweep

This is the default sweep for broad prompts such as `Do a cleanup run.`

Look for:

- one shared pattern that is more complex than it needs to be
- one page-level repetition that should be shared
- one overly nested class/markup structure that can be flattened safely
- one repeated outcome implemented differently across pages
- one route/layout decision expressed in a repetitive way

Good outcome:

- one concrete maintainability improvement
- lower complexity without broad redesign

Say this:

- `Do a cleanup run.`
- `Do one cleanup sweep.`
- `Do one more maintainability improvement.`

### 1. Token Alignment Sweep

Look for:

- hard-coded radii, shadows, borders, or colours where an existing token already exists
- older alias variables where the authoritative token can be used directly
- repeated RGBA borders or surfaces that should map to `--line`, `--surface`, `--surface-strong`, `--cedar`, `--body`, or `--muted`

Good outcome:

- fewer raw values
- more direct use of the authoritative token system
- easier global tuning later

Say this:

- `Do a token alignment sweep.`
- `Do one CSS token cleanup.`

### 2. Duplicate Pattern Sweep

Look for:

- two or more blocks that create the same card, panel, strip, note, or grid treatment
- near-identical spacing or border treatments repeated across multiple selectors
- repeated demo/dev shell patterns that should live in one shared stylesheet

Good outcome:

- one shared pattern instead of multiple lookalikes
- less copy-paste CSS

Say this:

- `Do a duplicate pattern sweep.`
- `Find one duplicated CSS pattern and consolidate it.`

### 3. Legacy Alias Sweep

Look for:

- older variable aliases that only wrap current tokens
- old design-system layers still referenced where current shared classes exist
- style rules that still depend on a transitional naming layer after the shared system is established

Good outcome:

- fewer unnecessary aliases
- a more legible dependency chain between component styles and tokens

Say this:

- `Do a legacy alias sweep.`
- `Replace one old style alias with the current shared system.`

### 4. Override Chain Sweep

Look for:

- selectors that are immediately overridden later
- page-scoped rules that undo a shared rule and then get undone again
- repeated media-query overrides for the same property chain
- places where the final rule can be expressed more directly

Good outcome:

- fewer override layers
- simpler cascade
- easier debugging

Say this:

- `Do an override chain sweep.`
- `Find one over-overridden CSS area and simplify it.`

### 5. Selector Simplification Sweep

Look for:

- selectors that are more specific than necessary
- repeated descendant chains when a class could carry the styling more directly
- brittle selectors that depend too heavily on markup shape

Good outcome:

- lower specificity
- easier reuse
- fewer cascade surprises

Say this:

- `Do a selector simplification sweep.`
- `Simplify one brittle CSS selector chain.`

### 6. Markup And Class Complexity Sweep

Look for:

- deeply nested wrappers that do not add layout or semantic value
- large stacks of page-scoped classes where a shared class or component would do
- markup whose structure exists only to satisfy overly specific selectors
- page sections where several nested classes create maintenance friction without a clear benefit

Good outcome:

- flatter, easier-to-read markup
- less brittle CSS coupling
- clearer ownership between structure and styling

Say this:

- `Do a markup and class complexity sweep.`
- `Simplify one overly nested page section.`

### 7. Shared Outcome Convergence Sweep

Look for:

- different pages solving the same UI outcome with different structures
- multiple page-level implementations of the same kind of trust strip, card group, info panel, or hero-side pattern
- one-off page treatments that have effectively become shared patterns

Good outcome:

- one shared solution for one repeated outcome
- less page drift
- easier future edits across related pages

Say this:

- `Do a shared outcome convergence sweep.`
- `Find one repeated page outcome being solved differently and unify it.`

### 8. Shared Pattern Promotion Sweep

Look for:

- page-scoped classes that now clearly represent a shared need
- repeated page-specific styling that should become `site-*` or `hero-*`
- dev/doc shells that belong in `src/styles-dev.css` rather than `src/styles.css`

Good outcome:

- more consistent shared primitives
- fewer one-off implementations

Say this:

- `Do a shared pattern promotion sweep.`
- `Promote one repeated page-specific pattern into the shared system.`

### 9. Dead CSS Sweep

Look for:

- classes no longer referenced in `src/`
- demo-only rules left behind after a refactor
- old route/test-bed CSS that is no longer used

Good outcome:

- fewer unused rules
- smaller mental surface area

Say this:

- `Do a dead CSS sweep.`
- `Find one unused style block and remove it.`

### 10. Responsive Consistency Sweep

Look for:

- repeated mobile fixes for the same pattern
- shared components that use slightly different mobile fallbacks in different places
- desktop-first rules where the responsive logic can be expressed once more cleanly

Good outcome:

- one consistent responsive behaviour per shared pattern
- fewer duplicated media-query fixes

Say this:

- `Do a responsive consistency sweep.`
- `Simplify one repeated mobile CSS pattern.`

### 11. Spacing Rhythm Sweep

Look for:

- nearly identical padding or gap values used for the same kind of component
- repeated panel/card spacing that should be standardized
- local spacing values that drift from the shared rhythm for no clear reason

Good outcome:

- more consistent visual rhythm
- fewer arbitrary spacing values

Say this:

- `Do a spacing rhythm sweep.`
- `Normalize one repeated spacing pattern.`

### 12. Form System Sweep

Look for:

- forms, contact panels, and fee blocks using slightly different shared surface treatments
- input wrappers or helper blocks that can reuse existing shared form/panel patterns
- mismatched radii, shadows, or borders within the form system

Good outcome:

- one clearer form surface language
- less drift between contact-related components

Say this:

- `Do a form system sweep.`
- `Simplify one shared form or contact styling pattern.`

### 13. Docs Shell Sweep

Look for:

- `ds-*` rules sitting in `src/styles.css`
- dev/docs page shell styles living in multiple files unnecessarily
- design-system documentation helpers that should be grouped together in `src/styles-dev.css`

Good outcome:

- cleaner separation between production UI and dev/docs shell CSS
- easier maintenance of the docs experience

Say this:

- `Do a docs shell sweep.`
- `Move one dev/docs styling concern into the shared dev stylesheet.`

### 14. Route/Layout Config Sweep

This is not CSS-only, but it is useful for maintainability when styling behaviour depends on route groups.

Look for:

- repeated route aliases
- repeated layout decisions keyed off long path chains
- places where route config can replace repetitive conditionals

Good outcome:

- simpler layout logic
- easier future page additions

Say this:

- `Do a route/layout maintainability sweep.`

## Sweep Rules

When doing one of these sweeps:

- prefer one meaningful cleanup over many tiny unrelated edits
- do not mix cleanup with new feature work unless asked
- do not introduce a new abstraction unless it removes real duplication
- do not convert working CSS into an abstraction maze
- if a pattern is only used once, leave it alone unless it is clearly harmful
- if visual risk is high, choose a different sweep

## Good Targets

Good targets are:

- shared patterns used in 2 or more places
- repeated literals that already have tokens
- legacy layers that now have a clear replacement
- duplicated mobile fixes
- repeated page outcomes with inconsistent implementations
- overly nested markup or class structures
- over-specific selectors that make edits fragile

## Bad Targets

Bad targets are:

- large redesigns disguised as cleanup
- purely stylistic preference changes
- broad renaming without a strong maintainability gain
- refactors that touch many pages without a tight verification path
- replacing simple CSS with complex abstractions for their own sake
- flattening markup that is needed for semantics, accessibility, or layout

## Suggested Workflow For AI

1. Identify one cleanup opportunity.
2. Explain the exact simplification being made.
3. Make the smallest complete change that improves the system.
4. Verify with `npm run build`.
5. Summarize the maintainability improvement, not just the file change.

## Useful User Prompts

You can invoke this file with prompts like:

- `Do a cleanup run.`
- `Do one cleanup sweep.`
- `Do one CSS cleanup.`
- `Do one UI cleanup.`
- `Find one more simplification to improve maintainability.`
- `Pick one good CSS or style-system cleanup and do it.`
- `Do one more maintainability improvement.`
- `Simplify one overly nested page section.`
- `Find one repeated page outcome being solved differently and unify it.`
- `Do a token alignment sweep.`
- `Do a duplicate pattern sweep.`
- `Do a dead CSS sweep.`
- `Do a docs shell sweep.`
- `Do a spacing rhythm sweep.`
- `Do a selector simplification sweep.`
- `Find one over-overridden CSS area and simplify it.`
- `Promote one repeated page-specific pattern into the shared system.`
- `Find one duplicated CSS pattern and consolidate it.`

If no sweep type is specified, default to the safest high-value cleanup available.

Default interpretation for broad prompts:

- choose one focused cleanup only
- prefer shared-system simplification over visual change
- prefer low-risk, high-repeat-value targets
- consider page structure and component reuse, not just CSS literals
- avoid broad refactors unless the user explicitly asks for a larger sweep
