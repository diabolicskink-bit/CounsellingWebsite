# Components

This catalogue inventories currently implemented React components and component-backed behaviour. During the temporary open-design period, it does not require fresh work to use their existing visual treatment or composition. A file existing in `src/components/` is not automatically shared API.

## Active Shared Components

- `Container`
  Major page width containment.
- `Button`
  Current shared action component with `primary`, `secondary`, and `tertiary` variants.
- `SectionHeading`
  Repeated section heading structure.
- `FaqSection`
  Current shared FAQ accordion. The component owns the standard "Frequently asked questions" heading; question, answer, and intro content remain data-driven at page level. Fresh work may use another accessible disclosure or content structure when the selected direction or information does not suit this component.
- `FaqSchema`
  FAQ structured data helper.
- `BroadTabPanel`
  Compact sets of three to five related labels where each tab opens paragraph-length content in one broad panel. Owns ARIA tab semantics, roving focus, responsive stacking, reduced-motion handling, and `site-broad-tabs*` styling.
- `EnquiryForm`
  The production contact/enquiry form. Its behaviour and `src/data/enquiry.ts` contract should stay aligned when retained; its current styling is not visual authority.
- `Layout`
  Production shell, navigation, shared chrome detection, and footer. Its mobile menu owns Escape handling, body scroll locking and restoration, and focus return to the toggle.
- `DevPageHero`, `DesignSystemSidebar`, `DocumentsSidebar`
  Dev/documentation support components.

## Legacy Component Boundary

- The old `src/components/Card.tsx` component has been removed and is not active card API for new work.
- Generic `.card`, `.card-grid`, and `.card-kicker` production selectors have been removed. Do not reintroduce them as compatibility aliases.
- The old `src/components/SplitSection.tsx` component has been removed after review found no source call sites. Existing pages use explicit composition with `.site-grid` or `.site-highlight`, `Container`, `.site-split`, `SectionHeading`, and `.rich-text`; this is implementation history, not a required replacement recipe.
- New card-like production UI may reuse current `site-*` patterns or use a different page-scoped treatment according to the selected direction.

## Component Selection After Direction

- Establish the visual and content direction before selecting components.
- Preserve existing functional components when their semantics, accessibility, data flow, or tested behaviour serve the task and can support the direction.
- Restyle, compose around, replace, or create components when the existing visual or structural contract would weaken the selected direction.
- Do not force a page into a component when the match is only superficial or primarily visual.
- A new page-scoped component does not need promotion. Document it here only when the task deliberately makes it shared API.
