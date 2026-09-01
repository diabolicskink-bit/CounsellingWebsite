# Legacy Components Register

This is source-backed working evidence about React components outside the active design system. A component file or current consumer does not authorize new reuse.

## Current Production Components

### `Container`

- `Implementation`: `src/components/Container.tsx` with inherited `.container` styling in `src/styles.css`.
- `Known consumers`: Used across all public content routes, the shared `Layout` header and footer, `DevPageHero`, and the Documents route.
- `Legacy note`: Widely used current containment implementation; the header now composes it instead of duplicating its width and responsive gutters, but it is not yet promoted as a supported layout primitive or component contract.
- `Checked`: 2026-08-06 — second inherited selector review batch under `DEBT-13`.

### `Layout`

- `Implementation`: `src/components/Layout.tsx` with navigation and footer support in `src/styles.css`.
- `Known consumers`: Parent shell for public routes and development routes that use shared chrome.
- `Legacy note`: Owns substantial navigation, mobile-menu, focus-return, scroll-lock, responsive dismissal, footer, and route behaviour. Its header now composes the inherited `Container` for containment while `.site-header__inner` owns grid composition. Its current importance does not make the whole component a supported design-system contract.
- `Checked`: 2026-08-06 — second inherited selector review batch under `DEBT-13`.

### `BroadTabPanel`

- `Implementation`: `src/components/BroadTabPanel.tsx` with inherited `.site-broad-tabs*` styling in `src/styles.css`.
- `Known consumers`: Working with Joel.
- `Legacy note`: Renders every panel as a headed reading section before JavaScript, then progressively applies connected ARIA tab semantics, inactive-panel hiding, roving focus, responsive stacking, and reduced-motion handling after hydration. It still has one verified page consumer and is not promoted reusable API.
- `Checked`: 2026-08-19 — holistic component review and `DEBT-35` progressive-enhancement resolution.

## Development Support

`DevPageHero`, `DocumentsSidebar`, and `DesignSystemSpecimen` support development routes. They are not production design-system components and do not need promotion or legacy migration merely because they live in `src/components/`.
