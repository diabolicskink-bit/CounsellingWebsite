# Components

This catalogue lists active React components and component-backed API. A file existing in `src/components/` is not automatically active design-system API.

## Active Shared Components

- `Container`
  Major page width containment.
- `Button`
  Shared action styles. Use existing variants: `primary`, `secondary`, and `tertiary`.
- `SectionHeading`
  Repeated section heading structure.
- `FaqSection`
  Shared FAQ accordion. Content remains data-driven at page level. The component is surface-neutral and should be paired with an explicit section surface or deliberate page-scoped section.
- `FaqSchema`
  FAQ structured data helper.
- `BroadTabPanel`
  Compact sets of three to five related labels where each tab opens paragraph-length content in one broad panel. Owns ARIA tab semantics, roving focus, responsive stacking, reduced-motion handling, and `site-broad-tabs*` styling.
- `EnquiryForm`
  The production contact/enquiry form. Use with `src/data/enquiry.ts` so form flow, subject lines, fields, and direct-submit behaviour stay aligned.
- `Layout`
  Production shell, navigation, shared chrome detection, and footer.
- `DevPageHero`, `DesignSystemSidebar`, `DocumentsSidebar`
  Dev/documentation support components.

## Legacy Component Boundary

- The old `src/components/Card.tsx` component has been removed and is not active card API for new work.
- Generic `.card`, `.card-grid`, and `.card-kicker` production selectors have been removed. Do not reintroduce them as compatibility aliases.
- The old `src/components/SplitSection.tsx` component has been removed after review found no source call sites. Use explicit section composition with `.site-grid` or `.site-highlight`, `Container`, `.site-split`, `SectionHeading`, and `.rich-text` instead of reintroducing the generic `.section` / `.split` layer.
- New card-like production UI should use active `site-*` card patterns or a page-scoped composition when the need is specific.

## Component Selection Rules

- Reuse an active component when it fits the content, interaction, accessibility, and responsive needs.
- Create or extend deliberately when reuse would make the page weaker, less clear, less accessible, or harder to maintain.
- Do not create a new component just to avoid a documented pattern that already fits.
- Do not force a page into a component when the match is only superficial.
- Document any newly promoted reusable component here and show it in the rendered design-system pages when visual.
