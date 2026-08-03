# Current Design System Scope

This is the live factual inventory of the design system.

## Creative-Within-Identity Authority Status

- The items below describe what is implemented, shared, partial, legacy, or missing; existing components and page patterns are not layout requirements for fresh creation or redesign.
- Established font families, type roles and scale, the colour palette and semantic colour roles, shared shell behaviour, and the accessibility baseline are the basic identity anchors unless the current task explicitly changes them.
- Fresh visual work should actively create content-shaped compositions beyond existing patterns. It may retain, restyle, replace, or bypass current layout and component treatments while preserving the basic identity anchors and functional contracts.

## Included

- Production colour, typography, spacing, radius, shadow, surface, and layout tokens are defined in `src/styles.css`.
- Standard paragraph-style copy uses `--type-body` and `--leading-body`; literal `p`, `.site-body-copy`, `.site-copy-flow`, and `.rich-text` are the shared body-copy paths.
- The active shared production class layer uses `site-*` classes for public-page sections, cards, panels, lists, tabs, footer, FAQ, CTA, trust, detail, and contact patterns.
- The active shared hero system uses `hero-*` classes, including `.hero-section`, `.hero-bg--default`, `.hero-top`, `.hero-badge`, `.hero-display`, `.hero-intro`, `.hero-copy-panel`, `.hero-deck`, `.hero-support-tagline`, `.hero-media-note`, `.hero-media-note--portrait`, `.hero-media-note__tag`, `.hero-principles-strip`, and `.hero-detail-stack`. Adjacent `.hero-badge` and `.hero-display` elements use the shared `--hero-badge-display-gap` value of 16px.
- Existing non-prefixed shared component classes remain active where they back current promoted components or patterns: `.container`, `.button`, `.section-heading`, `.rich-text`, `.check-item`, and `.icon-box`.
- Active shared React components include `Container`, `Button`, `SectionHeading`, `FaqSection` with its standard FAQ heading, `FaqSchema`, `BroadTabPanel`, `Layout`, `DevPageHero`, `DesignSystemSidebar`, and `DocumentsSidebar`.
- The development Documents route composes `Container`, the shared hero wrapper and identity tokens with page-scoped `documents-*` styles; its flat, production-aligned presentation is not promoted reusable page API.
- The Codex and Opus test beds use `DevPageHero` with the page-scoped `.test-bed-page` shell in `src/styles-test-beds.css`; these clean development routes are not promoted reusable page API.
- The active `Layout` header uses a short warm editorial surface, single-line wordmark, desktop flyout navigation, dark cedar contact action, bottom-anchored active-route treatment, and a fixed dark full-viewport navigation index below the desktop breakpoint. The mobile index exposes separate Fees and Contact links, with Fees targeting the fee section and Contact opening the page at the top. Mobile behaviour retains Escape dismissal, body scroll locking and restoration, focus return to the toggle, and automatic dismissal when responsive resizing crosses into the desktop layout so the page cannot remain scroll-locked behind a hidden menu. The outer shell stays in the document's root overflow flow so the complete footer remains part of the reachable scroll range.
- The active general card pattern is `.site-card`, `.site-card--link`, `.site-card__list`, `.site-card__action`, and `.site-card-grid`.
- The active topic-card pattern is `.site-topic-grid`, `.site-topic-card`, and topic-card modifiers.
- The active detail-stack pattern is `.site-detail-stack` and `.site-detail-stack--linked`.
- The active broad-tab pattern is the `BroadTabPanel` component with `site-broad-tabs*` classes.
- Active panel and practical-info patterns include `.site-copy-panel`, `.site-check-panel`, `.site-check-panel--grid`, `.site-contact-strip`, `.site-contact-item`, `.site-fee-card`, `.site-principles`, and `.site-principle`.
- The active CTA pattern is `.site-cta-block` and related child classes.
- The active `Layout` footer is a compact warm utility bar that mirrors the header's material and height discipline. It contains the wordmark, short navigation, email, practice hours, understated Instagram and LinkedIn profile links, and copyright without owning a page-level CTA. It is demonstrated on the Components page.
- The current enquiry/contact form is page-owned by `Contact.tsx`; it uses production recipient and success content from `src/data/enquiry.ts` plus page-scoped `.codex-contact*` styles. There is no shared React form component or shared form CSS API.
- Design-system routes exist at `/design-language`, `/design-language/foundations`, `/design-language/components`, `/design-language/heroes`, and `/design-language/patterns`.
- Written design-system guidance exists in `docs/design-system/README.md`, `governance.md`, this file, `foundations/`, `patterns/`, and `maintenance/`.

## Partially Included / In Progress

- Rendered design-system pages still depend on `ds-*` documentation scaffolding and some older `design-language-*` support classes.
- `ds-*` is still used for docs/dev scaffolding in `src/styles-dev.css`, rendered design-system pages, and design-system support components. The Documents route no longer depends on that shell.
- The Patterns page is mixed: it includes active `site-*` and `hero-*` examples plus older `design-language-*` candidate/reference examples.
- The hero system is implemented and shared by current pages, but is not canonical for fresh work. Existing pages still layer page-scoped hero classes on top for composition-specific needs.
- Type roles exist and are documented, but page-specific type overrides and older experimental styles still need periodic audit.
- Page pattern consolidation is partial; repeated public-page compositions are not all promoted or catalogued.
- Inclusion-oriented layouts exist on public pages, but inclusion panels are mostly page-specific rather than a fully promoted reusable subsystem.
- Page-scoped form styling supports the production contact/enquiry flow, but there is no shared or general-purpose form component library.
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
- The former shared `EnquiryForm` component, rendered design-system form specimen, and test-bed form candidates have been removed. Production enquiry behaviour is owned solely by `Contact.tsx`.
- The former `.site-form*` production CSS API has been removed. Contact owns its form styling, and the remaining foundations-page field sample is docs-scoped.
- `design-language-*` exists as older design-language/demo/reference styling in `src/styles-dev.css`; it is not part of the production or preferred future layer.
- `legacy-*`, old `opus-*`, and old `inc-lab-*` layers are retired or reference only. The current `.test-bed-page` shell is page-scoped development support rather than legacy or shared API.
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

## Still Outside Ordinary Scope Unless Requested

- Tailwind or CSS framework migration.
- Dark mode.
- Animation framework.
- CMS integration.
- Storybook-style tooling.
- New class prefix system.
- Expanding `ds-*` as active production or preferred future layer.
- Generic template components not used by this site.
