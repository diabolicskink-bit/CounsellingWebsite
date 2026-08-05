# Design System

This directory contains only the design system that is currently approved for deliberate reuse. It is intentionally small and grows one source-backed promotion at a time.

If a foundation, component, or pattern is absent from the active catalogues, it is not part of the design system, regardless of whether similar implementation exists in production or appeared in an earlier catalogue.

## Authority

1. `governance.md` defines ownership, scope, promotion, withdrawal, removal, verification, and update duties.
2. `foundations.md`, `components.md`, and `patterns.md` are the complete current reusable API.
3. Production source proves implementation and behaviour.
4. The development-only `/design-system` workspace renders supported items but does not approve them.

The catalogues do not contain candidates, page-local work, inherited implementation, development tooling, withdrawn items, or removal history.

## File Map

- [Governance](governance.md)
- [Foundations](foundations.md)
- [Components](components.md)
- [Patterns](patterns.md)

Inherited implementation is recorded separately in the non-authoritative [legacy design-system register](../design-system-legacy/README.md). Git and the project task log retain completed removal history.

## Working Rule

- Use an active catalogue item only within its documented boundary.
- Keep new implementation page-local unless the current task explicitly includes design-system promotion.
- Do not reuse or remove implementation merely because it exists, looks shared, or appears in the legacy register.
- On promotion, add the item to exactly one active catalogue and, when useful, render its real implementation in `/design-system`.
- On withdrawal, remove the item from the active catalogue and rendered workspace immediately. If source must remain for existing consumers, record it in the legacy register until a later migration or cleanup removes it.

Fresh visual creation and redesign remain content-led. The active design system constrains reuse; it does not require existing page layouts unless the task explicitly adopts a supported pattern.
