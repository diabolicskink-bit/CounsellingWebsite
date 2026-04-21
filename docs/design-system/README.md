# Design System Documentation

This site uses a calm, editorial design system for a counselling practice. The overall feeling should be grounded, clear, and emotionally steady rather than promotional, clinical, or startup-like.

Read these files together:

- `principles.md`: the tone and decision-making rules behind the system
- `tokens.md`: the shared visual tokens and baseline layout rules
- `components.md`: the reusable building blocks to prefer in implementation
- `ai-rules.md`: the short, strict checklist AI tools should follow during edits

Primary implementation sources:

- `src/styles.css`
- `src/components`
- `src/pages/design-system/DS_Foundations.tsx`
- `src/pages/design-system/DS_Components.tsx`
- `src/pages/design-system/DS_Patterns.tsx`
- `src/pages/design-system/DS_Heroes.tsx`

## Authoritative Shared Prefixes

- `site-*` classes are the current authoritative shared system for production UI.
- Shared page-opening hero classes are also authoritative: `hero-*` and the documented hero primitives used in `src/styles.css`.
- `site-hero-*` belongs to an older design-system shell and should be treated as legacy/demo scaffolding.
- `design-language-*` classes come from an older v1 design-system layer and should be treated as legacy/demo scaffolding unless a specific pattern has been promoted into a `site-*` class.
- When reusing or extending a shared pattern for real page work, prefer the `site-*` or shared hero class rather than introducing a new `design-language-*` dependency.

## What This System Is Trying To Do

- Make sensitive information feel calm, contained, and readable.
- Use typography, spacing, and section rhythm as the main design tools.
- Keep colour disciplined: paper background, soft green surfaces, cedar accents.
- Support trust and clarity without sounding corporate, salesy, or overly polished.
- Let shared patterns repeat so pages feel related.

## How To Use These Docs

- Start with `principles.md` if you are making a judgment call about tone or hierarchy.
- Check `tokens.md` before introducing any new colour, spacing, radius, or shadow.
- Check `components.md` before creating new layout or card patterns.
- Use `ai-rules.md` as the final pre-commit checklist for UI changes.

## Update Rule

If you add a new reusable component, layout pattern, token, or major visual rule, update these docs in the same change so future AI edits stay aligned.
