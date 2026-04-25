# Current Design System Scope

This is the live inventory of the design system. Keep it factual and update it when the system changes.

## Included

- Production colour tokens are defined in `src/styles.css`, including paper, surface, text, cedar, accent, line, radius, shadow, and max-width variables.
- Production typography tokens are defined in `src/styles.css`, including font stacks, named type roles, and leading variables.
- Layout and surface rules exist through shared section classes such as `.site-grid`, `.site-highlight`, `.site-split`, `.site-content-stack`, and `.site-copy-panel`.
- The active shared production class layer uses `site-*` classes for public-page sections, cards, panels, lists, forms, footer, FAQ, CTA, trust, detail, and contact patterns.
- The active shared hero system uses `hero-*` classes, including `.hero-section`, `.hero-bg--default`, `.hero-top`, `.hero-display`, `.hero-intro`, `.hero-copy-panel`, `.hero-deck`, `.hero-support-tagline`, `.hero-media-note`, `.hero-principles-strip`, and `.hero-detail-stack`.
- Existing non-prefixed shared component classes remain active where they back real components, including `.container`, `.button`, `.card`, `.section-heading`, `.rich-text`, `.check-item`, and `.icon-box`.
- Shared `Container`, `Button`, `Card`, `SectionHeading`, and `SplitSection` components exist in `src/components/`.
- Shared `Layout` implements the production header, navigation, mobile navigation, shared chrome detection, and footer.
- Shared `FaqSection` exists with accordion state, ARIA wiring, reduced-motion handling, and `site-faq-*` styling.
- Shared `FaqSchema` exists for FAQ structured data.
- Shared `EnquiryForm` exists with data-driven content, progressive enquiry choices, success/error states, direct submit behaviour, and `.site-form*` styling.
- Shared `DevPageHero`, `DesignSystemSidebar`, and `DocumentsSidebar` exist for dev/design-system/documentation routes.
- The active FAQ pattern exists as the `FaqSection` component and is demonstrated on the Components page.
- The active CTA pattern exists as `.site-cta-block` and is demonstrated on the Patterns page.
- The active trust-strip pattern exists as `.site-trust-list` and `.site-trust-list--highlight-last`.
- The active hero support-strip pattern exists as `.hero-support-tagline`.
- The active topic-card pattern exists as `.site-topic-grid`, `.site-topic-card`, and topic-card modifiers.
- The active detail-stack pattern exists as `.site-detail-stack` and `.site-detail-stack--linked`.
- The active check-panel pattern exists as `.site-check-panel` and `.site-check-panel--grid`.
- The active contact-strip pattern exists as `.site-contact-strip` and `.site-contact-item`.
- The active fee-card pattern exists as `.site-fee-card`.
- The active footer pattern exists in `Layout` and is demonstrated on the Components page.
- The design-system overview route exists at `/design-language` as an editorial index for system routes, visual language cues, principles, implementation order, and active/partial/legacy status.
- The Foundations design-system page exists at `/design-language/foundations` and demonstrates core visual foundations.
- The Components design-system page exists at `/design-language/components` and demonstrates shared components and UI pieces.
- The Heroes design-system page exists at `/design-language/heroes` and documents the canonical hero system.
- The Patterns design-system page exists at `/design-language/patterns` and demonstrates page-level compositions.
- Design-system navigation exists through the dev-only `Dev` nav group in `src/data/site.ts` and the `DesignSystemSidebar` component.
- Written design principles exist in `docs/design-system/principles.md`.
- Written token guidance exists in `docs/design-system/tokens.md`.
- Written component and pattern guidance exists in `docs/design-system/components.md`.
- AI editing rules exist in `docs/design-system/ai-rules.md`.
- Cleanup sweep guidance exists in `docs/design-system/cleanup-sweeps.md`.
- Type-scale direction exists in `docs/design-system/type-scale-plan.md`, and the first type-role implementation slice is documented as complete.
- Architecture documentation exists in `docs/design-system/architecture.md`.
- Current-scope documentation exists in this file.

## Partially Included / In Progress

- The design-system pages exist, but they still depend on `ds-*` documentation scaffolding and some older `design-language-*` wrappers.
- `ds-*` is still used for docs/dev scaffolding in `src/styles-dev.css`, the design-system pages, the Documents page, and design-system support components. It can remain where the need is truly docs-only and no shared production pattern fits, but it is not an active production layer.
- The Patterns page is mixed. It includes active `site-*` and `hero-*` examples, but it also shows older `design-language-*` candidate/reference patterns that should not be copied into production as-is.
- The hero system is active and canonical, but some pages still layer page-scoped hero classes on top of it for composition-specific needs.
- Type roles exist and are documented, but page-specific type overrides and older experimental styles have not all been audited.
- Foundations reference names exist in a table and on the rendered samples, but reference-name labelling has not been rolled out across all design-system pages.
- Page pattern consolidation is partial. Shared patterns exist, but not every repeated public-page composition has been promoted or catalogued.
- Topic/issue grids exist through `site-topic-grid`, `site-topic-card`, and page-specific topic layouts, but there is no separately named `issue-grid` component.
- Inclusion-oriented layouts exist on public pages, but inclusion panels are mostly page-specific rather than a fully promoted reusable design-system pattern.
- Form styling and the `EnquiryForm` are production-ready for the current contact/enquiry flow, but there is no general-purpose form component library.
- Icons are used through `lucide-react`, `.icon-box`, and `site-card__icon`, but there is no formal icon system.
- Focus states, FAQ semantics, form states, and reduced-motion handling exist in places, but there is no complete accessibility audit matrix.
- Responsive CSS exists across shared and page-scoped styles, but there is no responsive QA matrix.
- The production header and navigation are implemented, but they are not yet represented as a dedicated design-system page section.
- The Components sidebar does not currently link every section shown on the Components page, including Footer and FAQ accordion.
- The design-system route name is still `/design-language`, even though the docs now describe this as the design system.

## Legacy / Deprecated / Reference Only

- `ds-*` exists as docs/dev-page support styling, not as a production system and not as the preferred future architecture. Keep it narrow, docs-only, and only where the shared system should not be used.
- `design-language-*` exists as older design-language/demo/reference styling and should not be expanded for new production work.
- `legacy-*` CSS remnants exist in `src/styles.css` and should be treated as reference only.
- `test-bed-*` classes and test-bed routes exist as archive/test-bed material and should not be copied into production pages.
- `opus-*` hero/archive classes exist in `src/styles.css` and should not be treated as active hero-system work.
- `inc-lab-*` CSS remains in `src/styles.css` but no routed page usage was found during this pass; treat it as legacy or dead CSS unless a future task proves otherwise.
- No active `site-hero-*` source usage was found during this pass. If it appears in old docs or branches, treat it as superseded by `hero-*`.
- Old visual experiments should be promoted into `site-*`, `hero-*`, or shared components before production use.

## Not Included Yet

- No formal icon system exists.
- No full general-purpose form component library exists beyond the current enquiry/contact form and shared form CSS.
- No complete accessibility audit checklist or accessibility status matrix exists.
- No responsive QA matrix exists.
- No visual regression testing exists.
- No Storybook or equivalent external component explorer exists.
- No dark mode exists; `src/styles.css` declares `color-scheme: light`.
- No animation or motion system exists, beyond small transitions and FAQ reduced-motion handling.
- No CMS content component model exists.
- No complete component status labelling system exists.
- No design decision log exists.
- No formal migration tracker for legacy classes exists.
- No full public page pattern catalogue exists.
- No machine-readable token reference exists beyond the markdown docs and rendered Foundations examples.

## Explicitly Out Of Scope Unless Requested

- Full redesign.
- Major palette change.
- New typefaces.
- Tailwind migration.
- CSS framework migration.
- Dark mode.
- Animation framework.
- Full component-library rewrite.
- CMS integration.
- Storybook-style tooling.
- New class prefix system.
- Broad visual experimentation on production pages.
- Expanding `ds-*` as an active production or preferred future layer.
- Generic template components not used by the site.

## Update Rule

This file must be updated whenever design-system work changes what exists.

Update this file when:

- A new reusable component is added.
- A reusable component is removed.
- A pattern is promoted into the active system.
- A pattern is deprecated.
- A design-system page is added, removed, or renamed.
- Tokens are added or removed.
- A legacy layer is retired.
- A known missing area becomes implemented.
- A new missing area is discovered and relevant.
- A future task changes what is in Included, Partially Included, Legacy, Not Included Yet, or Out Of Scope.

Do not update this file for tiny implementation changes that do not change design-system scope.
