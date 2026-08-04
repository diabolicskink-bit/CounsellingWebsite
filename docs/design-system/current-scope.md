# Current Design System Scope

This is the live factual inventory of the design system.

## Verified Lifecycle Summary

- The incremental lifecycle and its item-record requirements are active under `governance.md`.
- No pre-existing production token, selector family, component, or pattern was classified by the framework-adoption task. Existing catalogue entries remain `Unreviewed` until related work adds a source-backed item record.
- Only an explicit `Shared-supported` item record authorizes deliberate shared reuse. Production source and the retained inventory below establish implementation facts, not reusable status.
- The rendered `/design-language/*` catalogue, its archive components, and its `ds-*` / `design-language-*` styling are `Removed`. The separate Documents route now uses page-scoped `documents-*` styling.
- `--cedar` is the first `Shared-supported` production token. Its authoritative record in `foundations/tokens.md` limits reuse to the verified primary brand-accent role and does not promote adjacent colour tokens.
- `--portrait-panel`, `--portrait-frame`, and `--portrait-footer-tint` are `Shared-supported` only as the portrait-material set verified across Home and Working with Joel. The Home-only stronger interaction tint remains page-local.
- The `/design-system` route, `DesignSystemSpecimen`, and their page-scoped styling are `Historical/dev-only` workspace support. The route renders four source-backed Foundations specimens without becoming lifecycle authority itself.
- Future lifecycle changes are summarized here only after the relevant item record is updated in the token, component, or page-pattern catalogue.

## Creative-Within-Identity Authority Status

- The items below describe what is implemented, shared, partial, legacy, or missing; existing components and page patterns are not layout requirements for fresh creation or redesign.
- Established font families, type roles and scale, the colour palette and semantic colour roles, shared shell behaviour, and the accessibility baseline are the basic identity anchors unless the current task explicitly changes them.
- Fresh visual work should actively create content-shaped compositions beyond existing patterns. It may retain, restyle, replace, or bypass current layout and component treatments while preserving the basic identity anchors and functional contracts.

## Recorded Implementation Inventory

The following implementation summary predates item-level lifecycle records. Terms such as “active” and “shared” are retained descriptions of the recorded source structure, not `Shared-supported` classifications.

- Production colour, typography, spacing, radius, shadow, surface, and layout tokens are defined in `src/styles.css`; the supported portrait-material tokens replace duplicate Home and Working with Joel colour declarations without changing their rendered values.
- Standard paragraph-style copy uses `--type-body` and `--leading-body`; literal `p`, `.site-body-copy`, `.site-copy-flow`, and `.rich-text` are the shared body-copy paths.
- Production source contains `site-*` classes for public-page sections, cards, panels, lists, tabs, footer, FAQ, CTA, trust, detail, and contact patterns.
- Production source contains `hero-*` classes, including `.hero-section`, `.hero-bg--default`, `.hero-top`, `.hero-badge`, `.hero-display`, `.hero-intro`, `.hero-copy-panel`, `.hero-deck`, `.hero-support-tagline`, `.hero-media-note`, `.hero-media-note--portrait`, `.hero-media-note__tag`, `.hero-principles-strip`, and `.hero-detail-stack`. Adjacent `.hero-badge` and `.hero-display` elements use the recorded `--hero-badge-display-gap` value of 16px.
- Existing non-prefixed implementation includes `.container`, `.button`, `.section-heading`, `.rich-text`, `.check-item`, and `.icon-box`.
- Recorded React components include `Container`, `Button`, `SectionHeading`, `FaqSection`, `FaqSchema`, `BroadTabPanel`, `Layout`, `DevPageHero`, `DocumentsSidebar`, and the development-only `DesignSystemSpecimen` frame.
- The development Documents route composes `Container` with page-scoped `documents-*` styles; its production-aligned presentation is not promoted reusable page API.
- The development Design System route uses a page-scoped governance-ledger composition, links to authoritative Markdown records through Documents, and renders the four explicitly `Shared-supported` colour tokens in Foundations.
- The Codex and Opus test beds use `DevPageHero` with the page-scoped `.test-bed-page` shell in `src/styles-test-beds.css`; these clean development routes are not promoted reusable page API.
- The implemented `Layout` header uses a short warm editorial surface, single-line wordmark, desktop flyout navigation, dark cedar contact action, bottom-anchored active-route treatment, and a fixed dark full-viewport navigation index below the desktop breakpoint. The mobile index exposes separate Fees and Contact links; both open the Contact page at its top, matching the desktop Fees destination and shared footer. Mobile behaviour retains Escape dismissal, body scroll locking and restoration, focus return to the toggle, and automatic dismissal when responsive resizing crosses into the desktop layout so the page cannot remain scroll-locked behind a hidden menu. The outer shell stays in the document's root overflow flow so the complete footer remains part of the reachable scroll range.
- Recorded card classes include `.site-card`, `.site-card--link`, `.site-card__list`, `.site-card__action`, and `.site-card-grid`.
- Recorded topic-card classes include `.site-topic-grid`, `.site-topic-card`, and topic-card modifiers.
- Recorded detail-stack classes include `.site-detail-stack` and `.site-detail-stack--linked`.
- The implemented `BroadTabPanel` component uses `site-broad-tabs*` classes.
- Recorded panel and practical-info classes include `.site-copy-panel`, `.site-check-panel`, `.site-check-panel--grid`, `.site-contact-strip`, `.site-contact-item`, `.site-fee-card`, `.site-principles`, and `.site-principle`.
- Recorded CTA classes include `.site-cta-block` and related child classes.
- The implemented `Layout` footer is a compact warm utility bar that mirrors the header's material and height discipline. It contains the wordmark, short navigation, email, practice hours, understated Instagram and LinkedIn profile links, and copyright without owning a page-level CTA.
- The current enquiry/contact form is page-owned by `Contact.tsx`; it uses shared recipient and success content from `src/data/enquiry.ts` plus page-scoped `.codex-contact*` styles. There is no shared React form component or shared form CSS API.
- Written design-system guidance exists in `docs/design-system/README.md`, `governance.md`, this file, `foundations/`, and `patterns/`.

## Partially Included / In Progress

- Current pages consume parts of the `hero-*` implementation and layer page-scoped hero classes on top for composition-specific needs. This does not assign `Shared-supported` status.
- Type roles exist and are documented, but page-specific type overrides and older experimental styles still need periodic audit.
- Page pattern consolidation is partial; repeated public-page compositions are not all promoted or catalogued.
- Inclusion-oriented layouts exist on public pages, but inclusion panels are mostly page-specific rather than a fully promoted reusable subsystem.
- Contact owns the current enquiry form and page-scoped form styling; there is no shared or general-purpose form component library.
- Icons are used through `lucide-react`, `.icon-box`, and `site-card__icon`, but there is no formal icon system.
- Focus states, FAQ semantics, form states, and reduced-motion handling exist in places, but there is no complete accessibility audit matrix.
- Responsive CSS exists across shared and page-scoped styles, but there is no responsive QA matrix.
- The production header and navigation are implemented, but they are not yet represented as a dedicated design-system page section.

## Recorded Legacy And Removed History

These descriptions also predate item-level lifecycle records unless governance or an adjacent catalogue record explicitly assigns a status.

- The former `ds-*` and `design-language-*` development support styling was removed with the rendered catalogue.
- The five `/design-language/*` routes, their page modules, `DesignSystemArchiveLayout`, `DesignSystemSidebar`, archive navigation, and archive-only `ds-*` / `design-language-*` styling were removed on 2026-08-03. Their concise `Removed` records live in `patterns/components.md` and `patterns/page-patterns.md`.
- The old `src/components/Card.tsx` component and generic `.card`, `.card-grid`, `.card-kicker`, and card-specific responsive selectors have been removed from source; newer recorded card implementation is inventoried in `patterns/components.md` and `patterns/page-patterns.md`.
- The old `src/components/SplitSection.tsx` component and generic `.section`, `.section--surface`, and `.split` production selectors have been removed from source; current split sections use `.site-grid` or `.site-highlight`, `Container`, `.site-split`, `.section-heading`, and `.rich-text`.
- The old `.issues-section`, `.issues-section__inner`, `.topic-grid`, and `.topic-card` production selectors have been removed; production source contains `.site-topic-grid` and `.site-topic-card`.
- The old generic `.stack` production helper has been removed; current purpose-specific replacements include `.site-content-stack` and `.site-detail-stack`.
- The unused `.site-highlight__box` selector has been removed. `.site-highlight` remains in production source.
- The unused `.site-spotlight*` composition and its responsive hook have been removed after a source audit found no runtime or development-page consumers.
- The former shared `EnquiryForm` component and `.site-form*` production CSS API have been removed. Production enquiry behaviour and styling are page-local to Contact, while shared recipient and success content remains in `src/data/enquiry.ts`.
- `legacy-*`, old `opus-*`, and old `inc-lab-*` layers are retired or reference only. The current `.test-bed-page` shell is page-scoped development support rather than legacy or shared API.
- A previous source search found no `site-hero-*` usage. That finding does not by itself authorize removal or assign lifecycle status.
- Raw design export files, historical icon candidate export folders, and the old type-scale plan are not part of the current written design-system guidance. Historical icon candidates have been removed.

## Not Included Yet

- Formal icon system.
- Full general-purpose form component library.
- Complete accessibility status matrix.
- Responsive QA matrix.
- Visual regression testing.
- Storybook or equivalent external component explorer.
- Supported specimens beyond the four promoted Foundations colour tokens; no other item has completed promotion under the current lifecycle.
- Dark mode; `src/styles.css` declares `color-scheme: light`.
- Animation or motion system beyond small transitions and existing reduced-motion handling.
- CMS content component model.
- Complete item-by-item lifecycle records across the written catalogues.
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
