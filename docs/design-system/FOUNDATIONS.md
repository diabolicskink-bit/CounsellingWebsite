# Supported Foundations

This catalogue contains the promoted foundation contracts. For permission to use specific inherited identity tokens and global defaults, see the [compatibility baseline](../guidance/DESIGN.md#public-identity-compatibility-baseline). Those items remain outside the promoted system.

## Typography Foundations

### `.site-reading`

- `Contract`: Default long-form reading role for public-page prose: the Inter-first `--font-sans` stack, responsive `1.005–1.04rem` size, weight `400`, line-height `1.63`, and `--body` as the supported light-surface foreground.
- `Boundary`: Use for substantive paragraphs that need comfortable continuous reading, not headings, labels, navigation, buttons, captions, metadata, form controls, or compact supporting text. A consumer on a dark or otherwise incompatible surface may override only the foreground colour with a contrast-appropriate contextual value; the family, size, weight, and line-height remain part of the role. The underlying `--font-sans` token is not separately promoted by this contract.
- `Implementation`: `.site-reading` in `src/design-system/foundations.css`.
- `Verified consumers`: Home About narrative, inclusive copy, and `<ContactInvitation />` copy; Working with Joel introduction, approach overview, and active tab copy; Inclusion hub hero support and chapter overviews; Kink and BDSM chapter prose; ENM and polyamory reasons, focus, and position prose; LGBTQIA+ recognition, assumptions, and disclosure prose; `<ArticleHero />` abstracts; Crisis Support emergency guidance and section introductions; Privacy Policy body copy; Contact first-message and crisis-support prose.
- `Promoted`: 2026-08-05 — owner-authorized reading-role promotion under `DEBT-20` and `DEBT-21`.

### `.site-reading--lead`

- `Contract`: Lead-paragraph modifier for one opening or summary paragraph within a reading group. Used together with `.site-reading`, it keeps the same family, responsive `1.005–1.04rem` size, and `1.63` line-height while changing the foreground to `--ink` and the weight to `500`.
- `Boundary`: It is a restrained paragraph-level hierarchy step, not an inline bold utility, heading substitute, general emphasis class, or dark-surface treatment. Apply it only with `.site-reading` where the darker ink remains appropriate and accessible.
- `Implementation`: `.site-reading.site-reading--lead` in `src/design-system/foundations.css`; consumers apply the public `.site-reading--lead` modifier alongside `.site-reading`.
- `Verified consumers`: Home About opening paragraph and Working with Joel introduction opening paragraph.
- `Promoted`: 2026-08-05 — owner-authorized lead-reading promotion under `DEBT-20` and `DEBT-21`.

## Colour And Material Foundations

Every public-site colour comes from the palette on `:root` in `src/design-system/foundations.css`; page and component stylesheets reference these tokens instead of colour literals. A colour that is also used translucently has a channel token, `--name-rgb`, holding its space-separated red, green and blue values. Consumers write a translucent use as `rgb(var(--name-rgb) / 0.22)` and own the opacity. A channel token belongs to its colour's contract rather than being a separate colour. Near-identical colours were consolidated into this palette; add a new token only for a colour that is visibly distinct and has a real role.

Outside this palette: the private dashboard owns its visual tokens under [Analytics](../guidance/ANALYTICS.md); development-only pages may use the inherited `--faint` and `--cedar-soft`; owner-notification emails keep inline literals because email clients do not support custom properties; and `src/data/routeMetadata.json` keeps literal theme and background colours for document metadata.

### `--ink`, `--body`, `--muted`

- `Contract`: Text colours for light surfaces. `--ink` (`#1f231f`, channel `--ink-rgb`) is the shared heading colour and strongest text, and the base for neutral shadows and rules; `--body` (`#3f493f`) is paragraph copy; `--muted` (`#505a51`) is supporting copy, labels and navigation.
- `Boundary`: Light surfaces only; dark surfaces use `--chalk`, `--mist` and the sage foregrounds. `.site-page` maps `--color-heading` to `--ink` and `--color-text` to `--body`. On `--paper`, ink has 14.73:1, body 8.68:1 and muted 6.65:1 contrast; muted has 6.26:1 on `--section-warm`.
- `Implementation`: Defined on `:root` in `src/design-system/foundations.css`.
- `Verified consumers`: Global document and `.site-page` defaults; shared header, navigation, footer and buttons; `.site-reading`; Home, Working with Joel, Articles, Contact, Crisis Support and Privacy Policy copy; and `<ContactInvitation />`.
- `Promoted`: 2026-10-17 — owner-authorized site palette promotion under `DEBT-37`.

### `--chalk`

- `Contract`: Off-white (`#fcfcfa`, channel `--chalk-rgb`) for the lightest surfaces, such as form fields, cards and light actions, and for the strongest text and icons on dark surfaces. Translucent chalk forms highlights, washes, hover fills and rules over dark materials.
- `Boundary`: It stands in for pure white across the public site; do not reintroduce `#fff` for a difference the eye cannot see. Ink on chalk has 15.51:1 contrast; chalk has 11.14:1 on `--cedar-dark`.
- `Implementation`: Defined on `:root` in `src/design-system/foundations.css`.
- `Verified consumers`: `.site-hero` foreground and dark specialist section titles; shared header button, buttons and mobile navigation; Contact form fields and cards; the Articles index cards and article ground; Crisis Support actions; Home and Working with Joel portrait, topic and hero treatments; and `<ContactInvitation />` actions.
- `Promoted`: 2026-10-17 — owner-authorized site palette promotion under `DEBT-37`.

### `--paper`

- `Contract`: Root canvas (`#f7f6f2`) for the document and `.site-page`, and for quiet alternate washes on light pages.
- `Boundary`: It is lighter than `--section-warm` and is not an editorial section material. It absorbed the former `--surface-muted` wash and the article page paper.
- `Implementation`: Defined on `:root` in `src/design-system/foundations.css`.
- `Verified consumers`: `body` and `.site-page`; the Contact success panel; article page paper; and Crisis Support and Working with Joel light regions.
- `Promoted`: 2026-10-17 — owner-authorized site palette promotion under `DEBT-37`.

### `--section-warm`

- `Contract`: Flat warm paper (`#f2efe8`) for the shared site chrome and for public editorial page backings, sections, and content materials.
- `Boundary`: It is distinct from the lighter root `--paper` canvas. Dark `#1f231f` ink has a 13.87:1 contrast ratio, `#3f493f` body text 8.18:1 and `--muted` 6.26:1 on the surface. Use `.site-section-warm` when the complete supported section pattern is intended. It absorbed the former `--site-chrome` alias.
- `Implementation`: Defined on `:root` in `src/design-system/foundations.css`; consumers may use the token as a material or `.site-section-warm` for the complete pattern.
- `Verified consumers`: `.site-header`, `.nav-submenu` and `.site-footer`; Documents workspace; Home, Working with Joel, Inclusion, Kink and BDSM, ENM and polyamory, LGBTQIA+, and Privacy Policy page backings or editorial sections; the not-found page action; and Contact enquiry task.
- `Promoted`: 2026-08-05 — shared warm-section promotion under `DEBT-37`; extended 2026-10-17 to the site chrome.

### `--section-warm-deep`

- `Contract`: Deeper warm paper (`#f1ece2`) for a second warm material that must separate from an adjacent `--paper` or `--section-warm` surface.
- `Boundary`: Ink has 13.53:1 contrast on it. It is a material, not a hover state or text colour.
- `Implementation`: Defined on `:root` in `src/design-system/foundations.css`.
- `Verified consumers`: The Home ENM and polyamory topic card and the article page's deep paper.
- `Promoted`: 2026-10-17 — owner-authorized site palette promotion under `DEBT-37`.

### `--line`

- `Contract`: The single neutral line colour (`#c5cdc3`) for light surfaces: quiet editorial separators, panel and table borders, secondary and disabled button borders, and text-field boundaries.
- `Boundary`: It is the average of the former `--line`, `--field-border` and `--section-rule` (cedar at 22% over `--section-warm`), which it replaced. As a field boundary it is an open accessibility gap: it has 1.59:1 contrast on `--chalk` against the 3:1 non-text guideline, so visible labels and the focus ring carry the field's essential cues. It must not be the sole cue to content structure. A consumer may keep a quieter page-owned line beneath it, as the Contact hours table does for its interior rules. Dark surfaces use `--section-dark-rule`.
- `Implementation`: Defined on `:root` in `src/design-system/foundations.css` and used by `.site-section-warm`.
- `Verified consumers`: `.button--secondary` and `.button:disabled`; supported warm sections; Documents boundaries and Markdown content; Crisis Support service and region separators; Privacy Policy section separators; Contact form fields, success panel, direct-contact, hours-table frame, crisis-note, and fee separators; `<ContactInvitation />` section, action, and fee separators; and editorial rules across Working with Joel, Inclusion, Kink and BDSM, ENM and polyamory, and LGBTQIA+.
- `Promoted`: 2026-08-05 as `--section-rule` — shared warm-section pattern promotion under `DEBT-37`; consolidated 2026-10-17 at the owner's direction.

### `--field-placeholder`

- `Contract`: Placeholder text (`#727c73`) in form fields.
- `Boundary`: An inherited value recorded as an open accessibility gap: it has 4.22:1 contrast on `--chalk` against the 4.5:1 text guideline. Visible labels carry the field's meaning; do not extend it to new roles.
- `Implementation`: Defined on `:root` in `src/design-system/foundations.css`.
- `Verified consumers`: Contact form fields.
- `Promoted`: 2026-10-17 — owner-authorized site palette promotion under `DEBT-37`.

### `--cedar`

- `Contract`: Primary brand accent (`#234b3d`, channel `--cedar-rgb`) for action surfaces, strong interactive or editorial emphasis, focus and boundary cues on verified light site surfaces, and the light endpoint of dark editorial gradients. Translucent cedar forms the site's quiet rules, underlines, washes and focus rings on light surfaces.
- `Boundary`: Light text `#fcfcfa` on cedar has a 9.53:1 contrast ratio and cedar on `--paper` has a 9.05:1 ratio. Do not assume the same contrast on photographs or dark-green surfaces. Pressed and hover states use `--cedar-dark`.
- `Implementation`: Defined on `:root` in `src/design-system/foundations.css`.
- `Verified consumers`: `.site-header .header-button`, `.button--primary`, `.site-footer a:focus-visible`, Working with Joel's active-tab rule, article links and focus treatments, Privacy Policy content links, list markers, and focus states, Contact form labels, controls, links, and focus states, `<ContactInvitation />` editorial emphasis and primary action, and the gradient endpoints of `.site-hero-surface`, mobile navigation, specialist dark sections, Home inclusive practice and Working with Joel topics.
- `Promoted`: 2026-08-03 — first colour promotion under `DEBT-37`; extended 2026-10-17 with its channel token and the former `--section-dark-soft` gradient role.

### `--cedar-dark`

- `Contract`: The site's darkest green (`#1d4034`, channel `--cedar-dark-rgb`). It is the dark editorial surface, the dark start of every dark-surface gradient toward `--cedar`, the hover and pressed state of cedar actions, strong green text and links on light surfaces, and the base for shadows and borders on or beneath dark materials.
- `Boundary`: Light `#fcfcfa` text has an 11.14:1 contrast ratio on it, `--mist` 10.28:1, `--section-sage` 9.11:1 and `--sage` 7.77:1. As a foreground it has 10.58:1 on `--paper`, 9.96:1 on `--section-warm`, 9.11:1 on `--section-sage`, 7.00:1 on `--sage-deep` and 5.38:1 on `--earth-tan`. Headings stay `--ink` on light surfaces. It absorbed the former `--forest-deep`, `--forest` and `--section-dark`.
- `Implementation`: Defined on `:root` in `src/design-system/foundations.css`.
- `Verified consumers`: Shared button and header-button states; `.site-hero-surface`, mobile navigation, specialist dark sections, Home inclusive practice and Working with Joel topics gradients; mobile navigation and desktop submenu shadows; Home inclusive-practice and topic foregrounds and shadows; Working with Joel method and topic treatments; Inclusion and LGBTQIA+ foregrounds; the not-found page; Contact enquiry, fee, hours and success treatments; Crisis Support contact and directory actions; `<ContactInvitation />` action states and link underlines; and the development Documents and article-editor tools.
- `Promoted`: 2026-10-17 — owner-authorized site palette promotion under `DEBT-37`; extended the same day with its channel token and the dark-surface roles of `--forest-deep`, `--forest` and `--section-dark`.

### `--section-sage`

- `Contract`: Pale sage (`#dfe8dc`, channel `--section-sage-rgb`) for editorial fields, sections and supporting fills, and as the emphasis and active foreground on dark surfaces.
- `Boundary`: It is not a generic success colour, an unrestricted control state, or authority for every similar green tint. Dark `#1f231f` ink has a 12.68:1 contrast ratio and `#3f493f` body text has a 7.47:1 ratio on the surface; as a foreground it has 9.11:1 on `--cedar-dark`.
- `Implementation`: Defined on `:root` in `src/design-system/foundations.css`.
- `Verified consumers`: Documents workspace and table headings; Working with Joel topic close and tab panel; Inclusion, Kink and BDSM, ENM and polyamory, and LGBTQIA+ editorial fields; the Home Kink and BDSM topic card; Contact essentials and submission mark; `.site-hero` emphasis; mobile navigation active links; the not-found page; and development design-system workspace framing.
- `Promoted`: 2026-08-14 — owner-authorized editorial-material consolidation under `DEBT-37`.

### `--sage`, `--sage-deep`, `--sage-glow`

- `Contract`: Mid sages. `--sage` (`#c8d9cc`, channel `--sage-rgb`) is the eyebrow and emphasis foreground on dark heroes and a translucent highlight; `--sage-deep` (`#b9d0c0`) is a stronger sage material; `--sage-glow` (`#87ac91`, channel `--sage-glow-rgb`) is the hue of the radial glows over dark surfaces and is used only translucently.
- `Boundary`: `--sage` has 7.77:1 contrast on `--cedar-dark`; `--cedar-dark` has 7.00:1 on `--sage-deep`. `--sage-glow` is decorative and never carries text.
- `Implementation`: Defined on `:root` in `src/design-system/foundations.css`.
- `Verified consumers`: `.site-hero` eyebrows; `<ArticleHero />` link underlines; the desktop submenu active state; Home inclusive emphasis, LGBTQIA+ topic card and hub link icon; and the glows of `.site-hero-surface`, mobile navigation, specialist dark sections, Home inclusive practice and Working with Joel topics.
- `Promoted`: 2026-10-17 — owner-authorized site palette promotion under `DEBT-37`.

### `--mist`

- `Contract`: Pale green-white (`#eff4f0`, channel `--mist-rgb`) for supporting text, quiet rules and focus rings on dark surfaces.
- `Boundary`: It has 10.28:1 contrast on `--cedar-dark`; supporting copy normally uses it at 0.86 opacity, which gives 8.09:1. It is not a light-surface colour.
- `Implementation`: Defined on `:root` in `src/design-system/foundations.css`.
- `Verified consumers`: `.site-hero` supporting foreground; specialist dark-section copy; Home hero and inclusive practice; Working with Joel hero actions and topics; mobile navigation; the Privacy Policy hero; and `<ArticleHero />` focus.
- `Promoted`: 2026-10-17 — owner-authorized site palette promotion under `DEBT-37`.

### `--section-dark-rule`

- `Contract`: Pale translucent boundary (`rgb(var(--mist-rgb) / 0.2)`) for quiet separators over supported dark editorial and hero materials.
- `Boundary`: It is decorative, not a text colour, a light-surface rule, or the sole cue to content structure. Over `--cedar-dark` it composites to approximately `#47645a`.
- `Implementation`: Defined on `:root` in `src/design-system/foundations.css`.
- `Verified consumers`: Specialist counselling hero actions; Home inclusive-practice topics; Working with Joel dark topics; Inclusion, Kink and BDSM, ENM and polyamory, and LGBTQIA+ dark editorial regions; and the Documents hero.
- `Promoted`: 2026-08-14 — owner-authorized editorial-material consolidation under `DEBT-37`.

### `--earth-tan`

- `Contract`: Warm earth tan (`#c7ae8f`, channel `--earth-tan-rgb`) for the closing invitation surface and warm decorative tints.
- `Boundary`: Ink has 7.49:1 and `--cedar-dark` 5.38:1 contrast on it. It is not a general page background.
- `Implementation`: Defined on `:root` in `src/design-system/foundations.css`.
- `Verified consumers`: `<ContactInvitation />` and the Home ENM and polyamory topic orb.
- `Promoted`: 2026-10-17 — owner-authorized site palette promotion under `DEBT-37`.

### `--portrait-panel`

- `Contract`: Dark chocolate portrait material (`#6b5146`) for the outer frame around identified-person media.
- `Boundary`: It is not a generic brown surface, action colour, or substitute for the site's green action tokens. Light text `#fcfcfa` on the panel has a 7.07:1 contrast ratio.
- `Implementation`: Defined on `:root` in `src/design-system/foundations.css`.
- `Verified consumers`: Home `.home-about__portrait` and Working with Joel `.working-with-joel-page__intro-note`.
- `Promoted`: 2026-08-05 — shared portrait-colour promotion under `DEBT-37`.

### `--portrait-frame`

- `Contract`: Pale warm backing (`#e4d9cc`) immediately around identified-person imagery inside `--portrait-panel`.
- `Boundary`: It is a non-text media material rather than a general page, card, or content surface.
- `Implementation`: Defined on `:root` in `src/design-system/foundations.css`.
- `Verified consumers`: Home `.home-about__portrait-frame` and Working with Joel `.working-with-joel-page__portrait-frame`.
- `Promoted`: 2026-08-05 — shared portrait-colour promotion under `DEBT-37`.

### `--portrait-shadow`

- `Contract`: Deep chocolate (`#201511`, channel `--portrait-shadow-rgb`) used only translucently for the borders, rings, shadows and interaction tints of portrait media.
- `Boundary`: It belongs to the portrait materials and is not a general shadow colour; dark-green surfaces use `--cedar-dark` and light surfaces `--ink`.
- `Implementation`: Defined on `:root` in `src/design-system/foundations.css`.
- `Verified consumers`: Home `.home-about__portrait`, its frame and link; and Working with Joel `.working-with-joel-page__intro-note` and its portrait frame.
- `Promoted`: 2026-10-17 — owner-authorized site palette promotion under `DEBT-37`.

### `--portrait-footer-tint`

- `Contract`: Translucent chocolate tint (`rgb(var(--portrait-shadow-rgb) / 0.12)`) for a footer or action band directly over `--portrait-panel`.
- `Boundary`: Do not treat the tint as an opaque colour or apply it over unrelated surfaces. Over the supported panel it composites to approximately `#624a40`, where light text `#fcfcfa` has a 7.95:1 contrast ratio. Home's stronger interaction tint remains page-local.
- `Implementation`: Defined on `:root` in `src/design-system/foundations.css`.
- `Verified consumers`: Home `.home-about__portrait-link` and Working with Joel `.working-with-joel-page__intro-note-details`.
- `Promoted`: 2026-08-05 — shared portrait-colour promotion under `DEBT-37`.

### `--emergency`, `--emergency-ink`, `--emergency-hover`, `--emergency-active`, `--emergency-surface`

- `Contract`: The crisis alert palette. `--emergency` (`#60221d`, channel `--emergency-rgb`) colours the alert heading, the emergency call action and its focus outline; `--emergency-ink` (`#47201c`) is alert body text; `--emergency-hover` (`#481815`) and `--emergency-active` (`#36110f`) are the call action's states; `--emergency-surface` (`#f1dfda`) is the alert panel.
- `Boundary`: Reserve it for genuine emergency guidance, never decoration or ordinary errors. Light `#fcfcfa` text has 11.72:1 contrast on `--emergency`; on the surface, `--emergency-ink` has 10.94:1 and `--emergency` 9.35:1.
- `Implementation`: Defined on `:root` in `src/design-system/foundations.css`.
- `Verified consumers`: The Crisis Support emergency panel and call action.
- `Promoted`: 2026-10-17 — owner-authorized site palette promotion under `DEBT-37`.

### `--error-rule`, `--error-surface`, `--error-ink`

- `Contract`: Form error messages: `--error-rule` (`#a84332`) for the leading rule, `--error-surface` (`#f8eae6`) for the message panel, and `--error-ink` (`#7b2f25`) for its text.
- `Boundary`: `--error-ink` has 7.87:1 contrast on the surface. Colour never carries the error alone; the message text states it.
- `Implementation`: Defined on `:root` in `src/design-system/foundations.css`.
- `Verified consumers`: The Contact enquiry form error.
- `Promoted`: 2026-10-17 — owner-authorized site palette promotion under `DEBT-37`.

## Layout Foundations

### `--site-anchor-offset`

- `Contract`: Distance an in-page scroll target keeps clear of the sticky site header, for `scroll-margin-top` on anchored sections and jump targets. It derives from the header rather than fixing a pixel value, so it follows the header down to its narrow-screen height: `96px` above 700px and `90px` at or below it.
- `Boundary`: It owns the header clearance only. Consumers own which elements are scroll targets, their focus treatment, and any additional breathing room a composition needs; it is not a general spacing, padding, or sticky-offset token and must not be assumed to be a fixed number of pixels.
- `Implementation`: Defined on `:root` in `src/design-system/foundations.css` as `calc(var(--site-header-height) + 24px)`, over the header height in `src/styles.css`.
- `Verified consumers`: Contact enquiry, confirmation and fees anchors; article citation targets; Crisis Support service and region anchors; Privacy Policy section anchors; the Working with Joel topics anchor; and the development design-system workspace.
- `Promoted`: 2026-09-16 — owner-authorized anchor-offset reconciliation.
