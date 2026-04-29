# Repository Guidance for AI Agents

Consult [docs/design-system/README.md](docs/design-system/README.md) before making any visual, layout, or component changes.

For UI work in this repository:

- Treat `src/styles.css` as the source of truth for tokens, shared classes, and visual rhythm.
- Start with existing shared React components from `src/components`, but create a new component when the existing options would weaken the content, UX, accessibility, responsiveness, or maintainability.
- Prefer extending patterns already documented in `src/pages/design-system` when they are a close fit; prefer a new page-specific composition or reusable pattern when the design need is meaningfully different.
- Follow the decision rules in [docs/design-system/ai-rules.md](docs/design-system/ai-rules.md) so reuse is intentional and new design work is deliberate.

When changing the design system itself:

- Update the relevant file in `docs/design-system/`.
- Update `docs/design-system/current-scope.md` when design-system work changes what exists, what is partial, what is legacy, or what is out of scope.
- Keep examples aligned with the real shared classes and components already in the app.
- Document any new reusable pattern in the design-system showcase pages under `src/pages/design-system`.
- Keep one-off explorations page-scoped until they prove useful beyond a single context.
