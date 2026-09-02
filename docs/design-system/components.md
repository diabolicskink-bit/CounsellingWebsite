# Supported Components

This catalogue contains every React component currently approved for deliberate reuse.

## Action Controls

### `<Button />`

- `Contract`: Closed, high-confidence public action control that renders an internal React Router link when `href` is supplied and a native button otherwise. `primary` is the clearest decision or submission action; `secondary` is an alternative with lower visual weight. The component owns its minimum target size, material hierarchy, hover, active, keyboard-focus, disabled, and reduced-motion states, including contrast-adjusted treatments inside `.site-hero-background`.
- `Boundary`: Use for a visitor action that should read as a deliberate choice, not for ordinary text links, open editorial navigation rows, icon-only controls, disclosures, toggles, external destinations, or phone and data blocks. Link instances support internal routes only and cannot be disabled; native instances support `button` and `submit` types. Consumers may own placement, content, icon direction, typography, and contextual width or height, but must preserve the primary/secondary hierarchy and the closed action surface.
- `Implementation`: `Button` in `src/components/Button.tsx` with `.button`, `.button--primary`, `.button--secondary`, and dark-hero adaptations in `src/design-system/components.css`.
- `Verified consumers`: Shared desktop header; Home, Working with Joel, Inclusive counselling hub, Kink and BDSM, ENM and polyamory, and LGBTQIA+ page actions; Contact enquiry submission; `<ContactInvitation />`; and the Not Found recovery actions.
- `Promoted`: 2026-09-01 — owner-authorized site-wide action-system pass after visual and responsive verification across public action contexts.

## Contact Invitations

### `<ContactInvitation />`

- `Contract`: Canonical closing invitation that gives a public content page one clear transition into the Contact journey.
- `Boundary`: Owns its section semantics, fixed heading and explanatory copy, Contact destination and action label, warm-section surface, responsive layout, focus treatment, and reduced-motion behaviour. Consumers own placement only. It accepts no props, appears at most once as the final section of a public page, and is not intended for Contact or development routes.
- `Implementation`: `ContactInvitation` in `src/components/ContactInvitation.tsx`, composed with the supported `<Button />`, and `.contact-invitation*` styles in `src/design-system/components.css`.
- `Verified consumers`: Home, Working with Joel, and the Kink and BDSM, ENM and polyamory, and LGBTQIA+ child Inclusion pages, each as the final section before the shared footer.
- `Promoted`: 2026-08-05 — owner-authorized shared-component extraction ahead of the planned non-Contact public-page rollout under `DEBT-37`.
