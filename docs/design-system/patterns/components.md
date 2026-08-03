# Components

This catalogue inventories React components and component-backed behaviour recorded before the lifecycle framework. Under the creative-within-identity policy, fresh work should actively explore content-shaped composition and is not required to use these components' existing visual treatment or layout. The site's font families, type roles and scale, colour palette and semantic roles remain identity anchors. A file existing in `src/components/` is not automatically shared API.

## Incremental Status Rule

This inventory has not been item-by-item reconciled. Every entry without an adjacent source-backed lifecycle record is `Unreviewed`, regardless of its section heading or earlier description. Unreviewed entries authorize neither new reuse nor removal; only an explicit `Shared-supported` record authorizes deliberate reuse.

When related work verifies or changes an item, add the record required by [governance](../governance.md): identifier, status, semantic role and boundary, source evidence and current public consumers, replacement or migration note, and review date/task. Do not classify unrelated entries during that work.

## Recorded Components

- `Container`
  Major page width containment.
- `Button`
  Recorded action component with `primary`, `secondary`, and `tertiary` variants.
- `SectionHeading`
  Repeated section heading structure.
- `FaqSection`
  Recorded FAQ accordion. The component owns the standard "Frequently asked questions" heading; question, answer, and intro content remain data-driven at page level.
- `FaqSchema`
  FAQ structured data helper.
- `BroadTabPanel`
  Compact sets of three to five related labels where each tab opens paragraph-length content in one broad panel. Owns ARIA tab semantics, roving focus, responsive stacking, reduced-motion handling, and `site-broad-tabs*` styling.
- `EnquiryForm`
  The production contact/enquiry form. Its behaviour and `src/data/enquiry.ts` contract should stay aligned when retained; its current styling is not visual authority.
- `Layout`
  Production shell, navigation, shared chrome detection, and footer. The shared header uses a short warm editorial surface, single-line wordmark, desktop flyout navigation, and a dark cedar contact action. Below the desktop breakpoint, navigation becomes a fixed dark full-viewport index with separate Fees and Contact destinations; its mobile menu owns Escape handling, body scroll locking and restoration, focus return to the toggle, and desktop-breakpoint dismissal during responsive resizing. The outer shell remains in the root document overflow flow rather than globally clipping it. The shared footer mirrors the header's warm material and compact discipline, presenting the wordmark, short navigation, email, hours, understated social-profile links, and copyright so page-level CTA content can remain separate.
- `DevPageHero`, `DesignSystemSidebar`, `DocumentsSidebar`
  Dev/documentation support components.

## Legacy Component Boundary

- The old `src/components/Card.tsx` component is `Removed` and is not API for new work.
- Generic `.card`, `.card-grid`, and `.card-kicker` production selectors have been removed. Do not reintroduce them as compatibility aliases.
- The old `src/components/SplitSection.tsx` component has been removed after review found no source call sites. Existing pages use explicit composition with `.site-grid` or `.site-highlight`, `Container`, `.site-split`, `SectionHeading`, and `.rich-text`; this is implementation history, not a required replacement recipe.
- New card-like production UI stays `Page-local` according to the selected direction unless an explicitly authorized shared-system task promotes it. Existing `site-*` implementation may be reused only when its adjacent record explicitly marks it `Shared-supported`.

## Component Selection After Direction

- Establish the visual and content direction before selecting components.
- Preserve existing functional components when their semantics, accessibility, data flow, or tested behaviour serve the task and can support the direction.
- Restyle, compose around, replace, or create components when the existing visual or structural contract would weaken the selected direction.
- Do not force a page into a component when the match is only superficial or primarily visual.
- A new page-scoped component does not need promotion. Document it here only when an explicitly authorized task changes its lifecycle or deliberately makes it `Shared-supported`.
