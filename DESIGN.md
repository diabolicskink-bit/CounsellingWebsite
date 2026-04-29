---
name: Vive Counselling
description: Plainspoken, distinctive online counselling across Australia.
colors:
  primary: "#234b3d"
  primary-deep: "#1d4034"
  accent: "#2d5946"
  accent-deep: "#173028"
  accent-soft: "#eaf2eb"
  cedar-soft: "#eef2ec"
  paper: "#f7f6f2"
  surface: "#eef2ec"
  surface-strong: "#fcfcfa"
  surface-muted: "#f4f6f2"
  ink: "#1f231f"
  body: "#3f493f"
  muted: "#505a51"
  faint: "#687268"
  line: "#ccd4ca"
typography:
  display:
    fontFamily: "Georgia, Times New Roman, serif"
    fontSize: "5.2rem"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "0"
  headline:
    fontFamily: "Georgia, Times New Roman, serif"
    fontSize: "3.1rem"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "0"
  title:
    fontFamily: "Georgia, Times New Roman, serif"
    fontSize: "1.45rem"
    fontWeight: 500
    lineHeight: 1.18
    letterSpacing: "0"
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "1.02rem"
    fontWeight: 400
    lineHeight: 1.58
    letterSpacing: "0"
  label:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "0.86rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "0"
rounded:
  base: "8px"
  card: "10px"
  faq: "16px"
  pill: "999px"
spacing:
  section: "40px"
  cta-section: "24px"
  card: "28px"
  panel: "34px"
  grid-gap: "22px"
  content-gap: "24px"
  form-gap: "20px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface-strong}"
    rounded: "{rounded.base}"
    padding: "0.78rem 1.08rem"
  button-primary-hover:
    backgroundColor: "{colors.primary-deep}"
    textColor: "{colors.surface-strong}"
    rounded: "{rounded.base}"
    padding: "0.78rem 1.08rem"
  button-secondary:
    backgroundColor: "{colors.surface-strong}"
    textColor: "{colors.ink}"
    rounded: "{rounded.base}"
    padding: "0.78rem 1.08rem"
  button-tertiary:
    backgroundColor: "{colors.cedar-soft}"
    textColor: "{colors.primary}"
    rounded: "{rounded.base}"
    padding: "0.78rem 1.08rem"
  card:
    backgroundColor: "{colors.surface-strong}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "28px"
  form-field:
    backgroundColor: "{colors.surface-strong}"
    textColor: "{colors.ink}"
    rounded: "{rounded.base}"
    padding: "13px 14px"
---

# Design System: Vive Counselling

## 1. Overview

**Creative North Star: "A Serious Way In"**

Vive should feel like a clear way into difficult material: direct, human, a little unexpected, and not embarrassed by its own point of view. The system is grounded on purpose: paper backgrounds, sage surfaces, cedar action colour, serif headings, practical body copy, visible borders, and modest depth. It should not ingratiate, over-soothe, or decorate around the work. It can still be bold, memorable, and quietly playful.

The site should carry the plain-spoken trust of Beyond Blue without copying its institutional tone. It must feel human, literate, specific, and adult, with enough bite to avoid therapy-directory sameness. The product context is explicit: "Make the room feel competent before it feels comforting." Visual decisions should do the same.

This system rejects AI wellness copy, vague "safe space" language, pastel counselling cliches, glossy startup therapy branding, floating positivity, solemn blandness, and any treatment that makes hard material look pre-solved.

**Key Characteristics:**

- Restrained paper-and-sage foundation with cedar used for action, emphasis, and controlled moments of bite.
- Serif-led editorial hierarchy with practical sans-serif body copy.
- Borders, spacing, and tonal shifts provide structure before shadow.
- Components feel calm, direct, and functional, but major public pages can still have one memorable editorial move.
- Inclusion is treated as ordinary competence, not badge language.

## 2. Colors

The palette is a grounded counselling palette: warm paper, quiet sage, and deep cedar. It is not pastel wellness, not teal healthcare default, and not glossy brand colour. The foundation is restrained; the composition does not have to be bland.

### Primary

- **Cedar Green**: Primary action, link emphasis, active navigation, hero emphasis, focus borders, and small proof points.
- **Deep Cedar**: Hover and active states where the primary action needs more certainty.

### Secondary

- **Ground Green**: Secondary green accent for limited emphasis and legacy compatible accents.
- **Deep Ground**: The deepest green, reserved for strong contrast or footer-adjacent emphasis.
- **Pale Green**: Soft accent wash where an emphasis needs to stay quiet without becoming beige.

### Neutral

- **Warm Paper**: Main page background. This is the default reading field.
- **Sage Wash**: Soft section surface, tertiary button background, and quiet alternate panels. This currently shares the same hex value as Cedar Soft, but its role is sectional rather than accent.
- **Clean Paper**: Card, form, and inset panel surface.
- **Pale Wash**: Muted alternate status and low-contrast section fill.
- **Green Black**: Headings and strongest text.
- **Reading Green Grey**: Paragraph text.
- **Muted Leaf**: Supporting copy.
- **Faint Olive**: Captions, metadata, and low-priority labels.
- **Soft Boundary**: Borders, dividers, and component outlines.

### Named Rules

**The Cedar Rarity Rule.** Cedar is not a background system. Use it for actions, focus, links, active states, ruled emphasis, and small proof points.

**The No Wellness Pastel Rule.** Sage can be soft, but it must stay grounded by ink, borders, and serious typography.

**The Paper First Rule.** Most of the page should remain paper or near-paper. Let the writing and hierarchy do the work.

**The Controlled Rupture Rule.** A major page can break the quiet with one deliberate move: scale, asymmetry, a sharper support panel, or a stronger cedar moment. Never use rupture as decoration.

## 3. Typography

**Display Font:** Georgia, with Times New Roman and generic serif fallbacks.

**Body Font:** Inter/system sans stack.

**Label/Mono Font:** Inter/system sans for labels; SFMono/Consolas stack only for code and technical references.

**Character:** The pairing is plain and editorial. Serif headings give the site gravity; sans body copy keeps it practical and readable. Playfulness should come through line breaks, phrasing, scale, and tension, not through precious literary styling or faux-magazine affect.

### Hierarchy

- **Display** (400, 5.2rem desktop / 2.85rem compact, 1.05): Page-opening hero statements only, usually through the canonical hero display pattern.
- **Headline** (500, 3.1rem desktop / 2.45rem compact, 1.1): Major section statements, FAQ titles, and closing calls to action.
- **Title** (500, 1.45rem, 1.18): Cards, grouped ideas, linked detail titles, and nested headings.
- **Body** (400, 1.02rem, 1.58): Default paragraphs, form labels, practical notes, and support copy. Keep ordinary reading copy around 65 to 75 characters where possible.
- **Label** (700, 0.86rem, uppercase only for short labels): Eyebrows, quiet metadata, form technical errors, and small captions.

### Named Rules

**The One Strong H1 Rule.** One page-opening H1 sets the emotional register. Do not stack competing hero statements.

**The Practical Body Rule.** Body copy is not where the brand performs. It should read cleanly, say the thing, and get out of the way.

**The Line Break Rule.** Hero and section line breaks can carry attitude. Use them deliberately instead of centering every message into a safe block.

**The Responsive Type Rule.** Type role variables compress at the 900px breakpoint. Never copy desktop display sizes into mobile-specific rules.

## 4. Elevation

The system is mostly flat and layered. Depth comes from paper/sage shifts, borders, ruled blocks, and restrained shadows. Shadows are ambient, never glossy or card-heavy. If a surface needs to feel important, first use spacing, border, position, and type; only then add the smallest useful shadow.

### Shadow Vocabulary

- **Ambient Low** (`0 8px 22px rgba(31, 35, 31, 0.055)`): Shared restrained floating-surface shadow for panels, forms, menus, and fee cards.
- **Card Lift** (`0 14px 30px rgba(31, 35, 31, 0.045)`): Light reusable card shadow where a panel needs separation from the paper.
- **Hover Lift** (`0 18px 36px rgba(31, 35, 31, 0.075)`): Hover-only lift for interactive cards.
- **Focus Ring** (`0 0 0 3px rgba(35, 75, 61, 0.12)`): Input and choice focus treatment.

### Named Rules

**The Border Before Shadow Rule.** Use borders and tonal layering first. Strong shadows make this site feel like a SaaS dashboard.

**The No Gloss Rule.** No glass, no blur, no shiny stacked cards, no decorative glow.

## 5. Components

Components should feel calm and capable. They are practical objects in a counselling site, not product UI widgets. The page around them can be more expressive than the controls themselves.

### Buttons

- **Shape:** Gently squared corners (8px radius), inline-flex layout, 9px icon gap, 650 font weight.
- **Primary:** Cedar background with deep cedar hover, surface-strong text, and a small cedar shadow.
- **Hover / Focus:** Hover translates up by 1px. Focus should remain visible and cedar-based.
- **Secondary:** Clean paper surface, soft boundary border, ink text.
- **Tertiary:** Sage/cedar-soft surface, cedar text, no shadow. Use for lower-pressure navigation and supporting actions.

### Chips

- **Style:** Use pill rows for short non-navigational tags. They sit on cedar-soft with ink text, soft boundary borders, and 8px radius.
- **State:** Tags are descriptive, not filters. Do not make them look like app controls unless the interaction actually exists.

### Cards / Containers

- **Corner Style:** Standard cards use 10px radius; forms and panels use 8px radius.
- **Background:** Cards, panels, and forms use Clean Paper over Warm Paper or Sage Wash.
- **Shadow Strategy:** Ambient and low only. Interactive cards can lift by 4px on hover.
- **Border:** Soft Boundary by default. Cedar border only when the element is genuinely active, focused, or positioned as a key emphasis.
- **Ruled accents:** Thin editorial rules are welcome for copy rails and reflective paragraphs. Do not add new thick coloured side stripes to ordinary cards or panels.
- **Internal Padding:** Cards use 28px; larger panels and forms use 34px.

### Inputs / Fields

- **Style:** Clean paper background, 1px soft boundary border, 8px radius, 13px by 14px internal padding, 50px minimum height.
- **Focus:** Cedar border with a soft cedar focus ring.
- **Error / Disabled:** Use muted surfaces and clear text. Do not rely on colour alone.

### Navigation

Desktop navigation is text-led, medium weight, and quiet. Active states use cedar text plus a 1px underline. Dropdowns use sage surfaces, soft boundary borders, 8px radius, low shadow, and short translate/opacity transitions. Mobile navigation should preserve the same restraint: no product-app chrome, no decorative menu overlay.

### Signature Component: Public Hero

The hero system is canonical. Use a full-width hero section with a continuous paper/sage background, a large serif display heading, optional cedar emphasis, a ruled copy panel, and quiet support details. Extend it intentionally when a page needs stronger art direction; document the extension instead of inventing an untracked skin.

### Signature Component: Enquiry Form

The enquiry form is a low-friction practical object. It uses a clean paper panel, a two-column grid where space allows, cedar focus states, radio choices with clear selected states, and a complete success state after submission. Do not rebuild this form with page-scoped classes.

## 6. Do's and Don'ts

### Do:

- **Do** reuse the shared `site-*` and `hero-*` systems before creating page-specific styling.
- **Do** keep pages grounded in Warm Paper, Sage Wash, Clean Paper, Green Black, and Cedar Green.
- **Do** use borders, ruled paragraphs, split layouts, and spacing to create hierarchy.
- **Do** keep ruled accents thin and editorial unless a legacy component already owns a thicker treatment.
- **Do** give major public pages one memorable editorial move when the subject calls for it.
- **Do** use controlled asymmetry, strong line breaks, and sharp supporting details to keep the site authored.
- **Do** make practical details easy to scan: fees, format, availability, contact expectations, and limits.
- **Do** write visual examples and copy with the PRODUCT.md line in mind: "Make the room feel competent before it feels comforting."
- **Do** preserve semantic HTML, visible focus states, keyboard-friendly controls, reduced-motion care, and readable contrast.
- **Do** treat WCAG AA as the working accessibility floor.

### Don't:

- **Don't** use AI wellness copy, vague "safe space" language, waffly therapy generalities, pastel counselling cliches, inspirational fluff, clinical coldness, glossy startup therapy branding, over-explaining, euphemism, or copy that sounds generated.
- **Don't** make inclusion feel like badge language. Kink, ENM, polyamory, and LGBTQIA+ competence should read as ordinary practice knowledge.
- **Don't** add floating blobs, soft-focus positivity, generic stock calm, glassmorphism, loud gradients, or glossy effects.
- **Don't** turn public pages into app-style dashboards, SaaS/product-launch templates, or pressure-heavy sales funnels.
- **Don't** introduce ad hoc colours when an existing token already fits.
- **Don't** use `ds-*`, `design-language-*`, `legacy-*`, `test-bed-*`, `opus-*`, or `inc-lab-*` classes on production pages.
- **Don't** add page-specific cards, heroes, panels, or CTA styles when a shared pattern is already close.
- **Don't** confuse seriousness with blandness, institutional caution, or therapy-directory sameness.
- **Don't** add new 4px coloured side stripes to cards, panels, callouts, or alerts. Use thin rules, full borders, background shifts, or typographic emphasis instead.
