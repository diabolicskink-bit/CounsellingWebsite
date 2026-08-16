# Supported Components

This catalogue contains every React component currently approved for deliberate reuse.

## Contact Invitations

### `<ContactInvitation />`

- `Contract`: Canonical closing invitation that gives a public content page one clear transition into the Contact journey.
- `Boundary`: Owns its section semantics, fixed heading and explanatory copy, Contact destination and action label, warm-section surface, responsive layout, focus treatment, and reduced-motion behaviour. Consumers own placement only. It accepts no props, appears at most once as the final section of a public page, and is not intended for Contact or development routes.
- `Implementation`: `ContactInvitation` in `src/components/ContactInvitation.tsx` with `.contact-invitation*` styles in `src/design-system/components.css`.
- `Verified consumers`: Home, Working with Joel, and the Kink and BDSM, ENM and polyamory, and LGBTQIA+ child Inclusion pages, each as the final section before the shared footer.
- `Promoted`: 2026-08-05 — owner-authorized shared-component extraction ahead of the planned non-Contact public-page rollout under `DEBT-37`.
