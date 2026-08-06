# Legacy Components Register

This is source-backed working evidence about React components outside the active design system. A component file or current consumer does not authorize new reuse.

## Current Production Components

### `Container`

- `Implementation`: `src/components/Container.tsx` with inherited `.container` styling in `src/styles.css`.
- `Known consumers`: Used across all public content routes, the shared `Layout` header and footer, `DevPageHero`, and the Documents route.
- `Legacy note`: Widely used current containment implementation; the header now composes it instead of duplicating its width and responsive gutters, but it is not yet promoted as a supported layout primitive or component contract.
- `Checked`: 2026-08-06 — second inherited selector review batch under `DEBT-13`.

### `Button`

- `Implementation`: `src/components/Button.tsx` with inherited `.button*` styling in `src/styles.css`.
- `Known consumers`: `Layout`, Home, Contact, and Not Found.
- `Legacy note`: Current variants are `primary`, `secondary`, and `tertiary`; props, states, styling boundary, and accessibility evidence have not completed promotion.
- `Checked`: 2026-08-05 — active/legacy catalogue separation under `DEBT-37`.

### `Layout`

- `Implementation`: `src/components/Layout.tsx` with navigation and footer support in `src/styles.css`.
- `Known consumers`: Parent shell for public routes and development routes that use shared chrome.
- `Legacy note`: Owns substantial navigation, mobile-menu, focus-return, scroll-lock, responsive dismissal, footer, and route behaviour. Its header now composes the inherited `Container` for containment while `.site-header__inner` owns grid composition. Its current importance does not make the whole component a supported design-system contract.
- `Checked`: 2026-08-06 — second inherited selector review batch under `DEBT-13`.

### `BroadTabPanel`

- `Implementation`: `src/components/BroadTabPanel.tsx` with inherited `.site-broad-tabs*` styling in `src/styles.css`.
- `Known consumers`: Working with Joel.
- `Legacy note`: Owns ARIA tab semantics, roving focus, responsive stacking, and reduced-motion handling, but currently has one verified page consumer.
- `Checked`: 2026-08-05 — active/legacy catalogue separation under `DEBT-37`.

### `SectionHeading`

- `Implementation`: `src/components/SectionHeading.tsx` with inherited `.section-heading*` styling in `src/styles.css`.
- `Known consumers`: No current import outside its own source was found in the 2026-08-05 source search.
- `Legacy note`: Consumer absence is a cleanup lead, not removal authority.
- `Checked`: 2026-08-05 — active/legacy catalogue separation under `DEBT-37`.

## Development Support

`DevPageHero`, `DocumentsSidebar`, and `DesignSystemSpecimen` support development routes. They are not production design-system components and do not need promotion or legacy migration merely because they live in `src/components/`.
