# Repository Guidance for AI Agents

Start with [docs/project/README.md](docs/project/README.md) for project-level guidance, current scope, product direction, tracked debt, backlog, and task-log expectations.

For all work in this repository:

- Read [docs/project/product-direction.md](docs/project/product-direction.md) before changing public copy, content hierarchy, inclusion language, enquiry flow, or visitor-facing positioning.
- Check [docs/project/current-scope.md](docs/project/current-scope.md) when a task changes or depends on current public routes, app behaviour, API/form behaviour, deployment assumptions, tests, or documentation structure.
- Check [docs/project/project-debt.md](docs/project/project-debt.md) before technical, routing, API, security, deployment, test, or maintainability work.
- Check [docs/project/site-backlog.md](docs/project/site-backlog.md) before adding new visitor-facing scope, SEO/accessibility/performance work, or public-form improvements.
- Update [docs/project/task-log.md](docs/project/task-log.md) only when durable project state changes; do not turn it into a full changelog.

Consult [docs/design-system/README.md](docs/design-system/README.md) before making any visual, layout, component, shared CSS, or design-system documentation changes.

For UI work in this repository:

- Treat `src/styles.css` as the source of truth for tokens, shared classes, and visual rhythm.
- Start with existing shared React components from `src/components`, but create a new component when the existing options would weaken the content, UX, accessibility, responsiveness, or maintainability.
- Prefer extending patterns already documented in `src/pages/dev/design-system` when they are a close fit; prefer a new page-specific composition or reusable pattern when the design need is meaningfully different.
- Follow the decision rules in [docs/design-system/ai-rules.md](docs/design-system/ai-rules.md) so reuse is intentional and new design work is deliberate.

When changing the design system itself:

- Update the relevant file in `docs/design-system/`.
- Update `docs/design-system/current-scope.md` when design-system work changes what exists, what is partial, what is legacy, or what is out of scope.
- Keep examples aligned with the real shared classes and components already in the app.
- Document any new reusable pattern in the design-system showcase pages under `src/pages/dev/design-system`.
- Keep one-off explorations page-scoped until they prove useful beyond a single context.

When changing project scope or project governance:

- Update `docs/project/current-scope.md` when current public-site, API, test, deployment, or documentation scope changes.
- Add or update `DEBT-*` items in `docs/project/project-debt.md` when technical pressure should remain visible across future sessions.
- Add or update `SITE-*` items in `docs/project/site-backlog.md` when meaningful visitor-facing work is deferred.
- Keep project trackers and design-system trackers separate; use `docs/design-system/current-scope.md` only for the visual/component system.
