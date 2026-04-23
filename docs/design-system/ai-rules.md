# AI Rules For UI Changes

Use this file as a strict checklist before changing visual code.

## Always

- Read `src/styles.css` before adding or changing shared visual styles.
- Read `src/styles-dev.css` before adding or changing `ds-*` documentation-shell or dev-page styles.
- Read `docs/design-system/cleanup-sweeps.md` when the request is about simplification, deduplication, cleanup, overrides, page-pattern convergence, or maintainability rather than new UI.
- Reuse existing components in `src/components` before creating a new primitive.
- Reuse documented shared classes before adding page-specific ones.
- Treat `site-*` classes and the documented shared hero classes as the authoritative design-system API for production pages.
- Treat `hero-*` as a separate shared hero design system for production pages, not as a minor variant of `site-*` and not as legacy scaffolding.
- Treat `.hero-display` as the authoritative page-opening H1 pattern for production pages.
- Treat `ds-*` classes as design-system documentation shell classes, not as production UI primitives.
- Treat `design-language-*`, `legacy-*`, and `site-hero-*` as legacy/demo/reference layers unless a pattern has been explicitly promoted into the current shared system.
- Treat design-system documentation pages as consumers of the authoritative shared site system, not as a separate parallel design language.
- Keep the palette centered on paper backgrounds, soft green surfaces, and cedar accents.
- Keep headings serif-led and body copy practical.
- Use spacing, borders, and layout rhythm as the primary visual tools.
- Preserve calm, readable forms and trust-building information hierarchy.
- Update these docs when adding a new reusable pattern or rule.

## Class Prefix Rules

- Use `site-*` for shared production components, panels, layout helpers, and public-page patterns.
- Use `hero-*` for the shared public hero design system.
- Treat `site-*` and `hero-*` as two separate authoritative shared production layers: one general, one hero-specific.
- When a hero title only needs a different width, set `--hero-display-max-width` on the page scope before adding a page-specific title class.
- Use page-scoped classes only to extend production pages after shared `site-*` / `hero-*` reuse has been exhausted.
- Use `ds-*` only inside the design-system documentation experience and its support components such as doc layout, navigation, demo wrappers, and usage notes.
- Use `design-language-*` only when maintaining legacy/reference examples in design-system pages.
- Use `legacy-*` only for documentation-only legacy samples.

## How To Judge A Prefix Quickly

- If the class starts with `site-*` or `hero-*`, it is usually a candidate for production reuse.
- If the class starts with `ds-*`, it belongs to the docs/showcase shell.
- If the class starts with `design-language-*` or `legacy-*`, it is not production-safe by default.
- If the class is page-scoped, it may be production code but not automatically reusable as shared system API.
- If a docs page needs a new UI pattern that would also make sense elsewhere, it should usually become a shared `site-*` / `hero-*` pattern rather than a new `ds-*` one.

## Never

- Introduce ad hoc colours when an existing token already fits.
- Add loud gradients, glossy effects, glassmorphism, or highly decorative UI.
- Turn public pages into app-style dashboards or marketing landing pages.
- Use strong shadows where subtle borders already provide separation.
- Create one-off card, hero, or panel classes when a shared pattern is already close.
- Use `ds-*` classes on public pages.
- Add new `ds-*` documentation-shell rules to `src/styles.css`; keep them in `src/styles-dev.css`.
- Build a documentation page as if it has permission to invent a second visual system separate from the shared site system.
- Use `design-language-*` classes on production pages when a `site-*` or shared hero pattern exists for the same job.
- Use `legacy-*` classes on production pages under any circumstance.
- Treat `site-hero-*` as legacy/demo scaffolding when the shared `hero-*` system already fits the job.
- Add multiple competing CTA styles in the same section.
- Replace calm editorial hierarchy with dense microcopy or cramped layouts.

## When Working Near Legacy Design-System Code

- Preserve `ds-*`, `design-language-*`, and `legacy-*` classes when you are editing design-system docs or archived examples.
- Do not "clean up" legacy demo classes by moving them into production pages.
- Do not assume a visually attractive demo pattern is production-approved just because it exists in a design-system page.
- If you need a legacy pattern in production, re-implement it with current `site-*` / `hero-*` primitives and document the promoted version.
- If a docs page needs its own layout or shell CSS, put that CSS in a dedicated docs/page stylesheet rather than continuing to accumulate documentation-shell rules in `src/styles.css`.
- If a docs page needs a reusable component or pattern beyond the shell, add it to the shared site system and document it there.

## Preferred Implementation Order

1. Reuse an existing React component.
2. Reuse an existing shared `site-*` or `hero-*` class or pattern.
3. Extend a shared production pattern in `src/styles.css`.
4. Use a page-scoped class if the change is truly page-specific.
5. Only then introduce a new reusable shared pattern and document it.

For cleanup-only requests:

1. Prefer one named cleanup sweep from `cleanup-sweeps.md`.
2. Make one focused maintainability improvement at a time.
3. Consider page structure, repeated outcomes across pages, nested class complexity, shared components, and route/layout duplication as valid cleanup targets, not just raw CSS.
4. Avoid mixing cleanup with redesign or feature work unless asked.

For design-system documentation pages:

1. Reuse existing shared `site-*` / `hero-*` components and patterns for the showcased UI.
2. Use `ds-*` only for documentation shell/layout/supporting wrappers.
3. If the documentation needs a new reusable visual pattern, promote it into the shared site system first.
4. Put documentation-page-specific CSS in its own stylesheet when it does not belong in the shared production layer.

## Questions To Resolve Before Inventing A New Pattern

- Is there already a documented example in `src/pages/design-system`?
- Is that example a production `site-*` / `hero-*` pattern, or only a `ds-*`, `design-language-*`, or `legacy-*` reference?
- Can this be solved by composing `Container`, `SectionHeading`, `Button`, `Card`, or an existing site class?
- Is this a real shared site need, or only documentation-shell scaffolding?
- Is this truly reusable across at least two pages?
- Does it preserve the current tone of calm, grounded editorial trust?

If any answer suggests reuse, prefer reuse.
