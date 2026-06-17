# Cleanup Sweeps

Use this file when the goal is to simplify the UI system, reduce maintenance cost, or remove ambiguity without redesigning the site.

Cleanup can include CSS, page structure, repeated page patterns, nested class complexity, shared component opportunities, route/layout decisions, and docs/dev shell separation.

## Default Command

`Do a cleanup run.`

Meaning:

1. Inspect the codebase for one high-value maintainability cleanup.
2. Choose one focused, low-risk improvement.
3. Prefer shared-system simplification over page-specific restyling.
4. Preserve public behaviour, copy, routes, and visual intent unless explicitly asked.
5. Verify with `npm run build` when code changes are made.

## Sweep Rules

- Choose one meaningful cleanup target.
- Do not mix cleanup with new feature work unless asked.
- Do not introduce a new abstraction unless it removes real duplication.
- Do not convert working CSS into an abstraction maze.
- If a pattern is only used once, leave it alone unless it is clearly harmful.
- If visual risk is high, choose a different sweep.
- Update docs when cleanup changes design-system scope.

## Named Sweeps

### Cleanup Run Sweep

Default broad sweep. Look for one repeated outcome, one overly nested structure, one brittle selector area, or one shared pattern that can be simplified.

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

## Suggested Workflow

1. Identify one cleanup opportunity.
2. Explain the exact simplification.
3. Make the smallest complete change.
4. Verify appropriately.
5. Summarize the maintainability improvement.
