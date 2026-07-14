# Current Design System Scope

This is the live factual inventory of the design system.

## Included

- Production colour, typography, spacing, radius, shadow, surface, and layout tokens are defined in `src/styles.css`.
- Standard paragraph-style copy uses `--type-body` and `--leading-body`; literal `p`, `.site-body-copy`, `.site-copy-flow`, and `.rich-text` are the shared body-copy paths.
- The active shared production class layer uses `site-*` classes for public-page sections, cards, panels, lists, tabs, forms, footer, FAQ, CTA, trust, detail, and contact patterns.
- The active shared hero system uses `hero-*` classes, including `.hero-section`, `.hero-bg--default`, `.hero-top`, `.hero-badge`, `.hero-display`, `.hero-intro`, `.hero-copy-panel`, `.hero-deck`, `.hero-support-tagline`, `.hero-media-note`, `.hero-media-note--portrait`, `.hero-media-note__tag`, `.hero-principles-strip`, and `.hero-detail-stack`.
- Existing non-prefixed shared component classes remain active where they back current promoted components or patterns: `.container`, `.button`, `.section-heading`, `.rich-text`, `.check-item`, and `.icon-box`.
- Active shared React components include `Container`, `Button`, `SectionHeading`, `FaqSection` with its standard FAQ heading, `FaqSchema`, `BroadTabPanel`, `EnquiryForm`, `Layout`, `DevPageHero`, `DesignSystemSidebar`, and `DocumentsSidebar`.
- The active general card pattern is `.site-card`, `.site-card--link`, `.site-card__list`, `.site-card__action`, and `.site-card-grid`.
- The active topic-card pattern is `.site-topic-grid`, `.site-topic-card`, and topic-card modifiers.
- The active detail-stack pattern is `.site-detail-stack` and `.site-detail-stack--linked`.
- The active broad-tab pattern is the `BroadTabPanel` component with `site-broad-tabs*` classes.
- Active panel and practical-info patterns include `.site-copy-panel`, `.site-check-panel`, `.site-check-panel--grid`, `.site-contact-strip`, `.site-contact-item`, `.site-fee-card`, `.site-principles`, and `.site-principle`.
- The active CTA pattern is `.site-cta-block` and related child classes.
- The active footer pattern exists in `Layout` and is demonstrated on the Components page.
- The current enquiry/contact form uses `EnquiryForm`, `src/data/enquiry.ts`, and `.site-form*` classes.
- Design-system routes exist at `/design-language`, `/design-language/foundations`, `/design-language/components`, `/design-language/heroes`, and `/design-language/patterns`.
- Written design-system guidance exists in `docs/design-system/README.md`, `governance.md`, this file, `foundations/`, `patterns/`, and `maintenance/`.

## Partially Included / In Progress

- Rendered design-system pages still depend on `ds-*` documentation scaffolding and some older `design-language-*` support classes.
- `ds-*` is still used for docs/dev scaffolding in `src/styles-dev.css`, design-system pages, the Documents page, and design-system support components.
- The Patterns page is mixed: it includes active `site-*` and `hero-*` examples plus older `design-language-*` candidate/reference examples.
- The hero system is active and canonical, but some public pages still layer page-scoped hero classes on top for composition-specific needs.
- Type roles exist and are documented, but page-specific type overrides and older experimental styles still need periodic audit.
- Page pattern consolidation is partial; repeated public-page compositions are not all promoted or catalogued.
- Inclusion-oriented layouts exist on public pages, but inclusion panels are mostly page-specific rather than a fully promoted reusable subsystem.
- Form styling and `EnquiryForm` are production-ready for the current contact/enquiry flow, but there is no general-purpose form component library.
- Icons are used through `lucide-react`, `.icon-box`, and `site-card__icon`, but there is no formal icon system.
- Focus states, FAQ semantics, form states, and reduced-motion handling exist in places, but there is no complete accessibility audit matrix.
- Responsive CSS exists across shared and page-scoped styles, but there is no responsive QA matrix.
- The production header and navigation are implemented, but they are not yet represented as a dedicated design-system page section.
- The design-system route name is still `/design-language`.

## Legacy / Deprecated / Reference Only

- `ds-*` is docs/dev-page support styling, not a production system.
- The old `src/components/Card.tsx` component and generic `.card`, `.card-grid`, `.card-kicker`, and card-specific responsive selectors have been removed from source; active replacements are catalogued in `patterns/components.md` and `patterns/page-patterns.md`.
- The old `src/components/SplitSection.tsx` component and generic `.section`, `.section--surface`, and `.split` production selectors have been removed from source; current split sections use `.site-grid` or `.site-highlight`, `Container`, `.site-split`, `.section-heading`, and `.rich-text`.
- The old `.issues-section`, `.issues-section__inner`, `.topic-grid`, and `.topic-card` production selectors have been removed; the active topic system uses `.site-topic-grid` and `.site-topic-card`.
- The old generic `.stack` production helper has been removed; current purpose-specific replacements include `.site-content-stack` and `.site-detail-stack`.
- The unused `.site-highlight__box` selector has been removed. `.site-highlight` remains the active alternate section band.
- The unused `.site-spotlight*` composition and its responsive hook have been removed after a source audit found no runtime or development-page consumers.
- `design-language-*` exists as older design-language/demo/reference styling in `src/styles-dev.css`; it is not part of the production or preferred future layer.
- `legacy-*`, old `test-bed-*`, old `opus-*`, and old `inc-lab-*` layers are retired or reference only.
- No active `site-hero-*` source usage was found during the latest pass; the documented `hero-*` system supersedes it.
- Raw design export files, historical icon candidate export folders, and the old type-scale plan are not active design-system docs in the rebuilt structure. Historical icon candidates have been removed; durable guidance has been folded into the canonical docs.

## Not Included Yet

- Formal icon system.
- Full general-purpose form component library.
- Complete accessibility status matrix.
- Responsive QA matrix.
- Visual regression testing.
- Storybook or equivalent external component explorer.
- Dark mode; `src/styles.css` declares `color-scheme: light`.
- Animation or motion system beyond small transitions and existing reduced-motion handling.
- CMS content component model.
- Complete component status labelling system.
- Design decision log.
- Full public page pattern catalogue.
- App-consumed machine-readable token source beyond `src/styles.css`.

## Explicitly Out Of Scope Unless Requested

- Full redesign.
- Major palette change.
- New typefaces.
- Tailwind or CSS framework migration.
- Dark mode.
- Animation framework.
- Full component-library rewrite.
- CMS integration.
- Storybook-style tooling.
- New class prefix system.
- Broad visual experimentation on production pages.
- Expanding `ds-*` as active production or preferred future layer.
- Generic template components not used by this site.
