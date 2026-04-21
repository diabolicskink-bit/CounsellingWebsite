# AI Rules For UI Changes

Use this file as a strict checklist before changing visual code.

## Always

- Read `src/styles.css` before adding or changing shared visual styles.
- Reuse existing components in `src/components` before creating a new primitive.
- Reuse documented shared classes before adding page-specific ones.
- Treat `site-*` classes and the documented shared hero classes as the authoritative design-system API for production pages.
- Keep the palette centered on paper backgrounds, soft green surfaces, and cedar accents.
- Keep headings serif-led and body copy practical.
- Use spacing, borders, and layout rhythm as the primary visual tools.
- Preserve calm, readable forms and trust-building information hierarchy.
- Update these docs when adding a new reusable pattern or rule.

## Never

- Introduce ad hoc colours when an existing token already fits.
- Add loud gradients, glossy effects, glassmorphism, or highly decorative UI.
- Turn public pages into app-style dashboards or marketing landing pages.
- Use strong shadows where subtle borders already provide separation.
- Create one-off card, hero, or panel classes when a shared pattern is already close.
- Use `design-language-*` classes on production pages when a `site-*` or shared hero pattern exists for the same job.
- Use `site-hero` classes on public pages if the shared public hero system is the correct fit.
- Add multiple competing CTA styles in the same section.
- Replace calm editorial hierarchy with dense microcopy or cramped layouts.

## Preferred Implementation Order

1. Reuse an existing React component.
2. Reuse an existing shared CSS class or pattern.
3. Extend a shared pattern in `src/styles.css`.
4. Only then introduce a new reusable pattern and document it.

## Questions To Resolve Before Inventing A New Pattern

- Is there already a documented example in `src/pages/design-system`?
- Can this be solved by composing `Container`, `SectionHeading`, `Button`, `Card`, or an existing site class?
- Is this truly reusable across at least two pages?
- Does it preserve the current tone of calm, grounded editorial trust?

If any answer suggests reuse, prefer reuse.
