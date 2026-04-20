# Repository Guidance for AI Agents

Consult [docs/design-system/README.md](docs/design-system/README.md) before making any visual, layout, or component changes.

For UI work in this repository:

- Treat `src/styles.css` as the source of truth for tokens, shared classes, and visual rhythm.
- Reuse existing shared React components from `src/components` before creating new primitives.
- Prefer extending patterns already documented in `src/pages/design-system` over inventing page-specific variants.
- Follow the strict implementation rules in [docs/design-system/ai-rules.md](docs/design-system/ai-rules.md).

When changing the design system itself:

- Update the relevant file in `docs/design-system/`.
- Keep examples aligned with the real shared classes and components already in the app.
- Document any new reusable pattern in the design-system showcase pages under `src/pages/design-system`.
