# Launch Accessibility Checklist

This is the working checklist artifact for `LAUNCH-1`.

Each item starts with a status label. The item describes the launch condition that should be true for visitors. The note is for what is known, what is unresolved, or which `SITE-*` / `DEBT-*` item owns a gap.

Do not use `Pass` to mean "looked at it." Use `Pass` only when the condition is true enough for launch.

## Status Labels

- `Not checked`: No review has been recorded yet.
- `Pass`: Checked and acceptable for launch.
- `Partial`: Checked, but one or more accepted or tracker-linked gaps remain.
- `Fail`: Checked and not acceptable for launch until resolved or linked.
- `N/A`: The condition does not apply.

## Review Standard

Use browser checks plus source inspection where useful. Notes should name the route, state, viewport, or interaction that was reviewed.

- Keyboard-only review covers the shared shell and page-specific interactive elements.
- Axe or equivalent automated checks show no unresolved serious or critical violations in the reviewed scope.
- Mobile and reflow checks include a narrow mobile viewport and a 200 percent zoom proxy.
- Non-pass notes link the relevant `SITE-*` / `DEBT-*` item or state explicit launch acceptance.

## Global Shared Shell

- `Not checked` Header navigation works with keyboard alone.
  - Note:

- `Not checked` Mobile navigation opens, closes, and remains usable with keyboard alone.
  - Note:

- `Not checked` Mobile navigation does not trap focus or leave focus in a hidden menu.
  - Note:

- `Not checked` Inclusion subnavigation is usable without a mouse.
  - Note:

- `Not checked` Current page or current section is clear visually and programmatically, such as with `aria-current` where relevant.
  - Note:

- `Not checked` Visitors can bypass repeated navigation.
  - Note:

- `Not checked` SPA route changes update title, focus, or another clear orientation cue for assistive-technology users.
  - Note:

- `Not checked` Shared header, footer, navigation, links, and buttons all have visible focus states.
  - Note:

- `Not checked` Focus never disappears behind sticky headers, hidden menus, clipped panels, or decorative layers.
  - Note:

- `Not checked` Shared motion is minimal or respects reduced-motion preferences.
  - Note:

- `Not checked` Shared icon-only controls have accessible names.
  - Note:

- `Not checked` Shared links and buttons have names that make sense out of context.
  - Note:

- `Not checked` Automated accessibility scans for reviewed routes have no unresolved serious or critical violations.
  - Note:

## Redirect Aliases

Redirect aliases `/about` and `/fees` are covered by `docs/checklists/seo-metadata-launch.md`; accessibility review begins at their destination pages unless a redirect-specific visitor-facing issue appears.

## `/` - Home

- `Pass` Page has one clear main content landmark.
  - Note: Checked on `/` in browser at 1280x900. The DOM exposes one visible `<main>` and Playwright finds one `main` landmark.

- `Pass` Page has one clear page-level heading that matches the page purpose.
  - Note: Checked on `/` in browser at 1280x900. The page has one visible `h1`, "Counselling and Psychotherapy", matching the Home page purpose while the document title carries the brand name.

- `Pass` Heading order supports scanning and screen-reader navigation.
  - Note: Checked on `/` in browser at desktop and mobile widths. The visible heading sequence is one `h1`, then section `h2`s, with topic and Joel-card `h3`s nested under their sections.

- `Pass` Hero, topic list, inclusion links, Joel card, and closing CTA appear in a sensible reading order.
  - Note: Checked on `/` in browser. DOM order is hero, topic list, workroom with Joel card, inclusion content and links, then closing CTA; this matches the page narrative and visible reading order.

- `Pass` Page-specific links and buttons have meaningful names.
  - Note: Checked main content links in browser. Names include "More about how I work", "Explore inclusive counselling", "Kink & BDSM counselling Learn more", "Polyamory & ENM counselling Learn more", "LGBTQIA+ inclusive Learn more", and "Get in touch".

- `Pass` Focus is visible on every page-specific link and CTA.
  - Note: Checked all six main content links in browser. CTA links receive the browser focus outline, and inclusion detail links receive a visible outlined focus state plus text colour change.

- `Pass` Text, non-text UI, and focus states meet WCAG AA contrast expectations.
  - Note: Checked `/` with axe scoped to `main`; no colour-contrast or other main-content violations were reported. Focused link and CTA states remained readable in sampled browser checks.

- `Pass` Page remains readable at mobile widths.
  - Note: Checked at 390x844. Content stacks cleanly, text remains readable, CTAs remain usable, and no horizontal page overflow was present.

- `Pass` Page remains usable at 200 percent browser zoom without horizontal scrolling.
  - Note: Checked with a 640px CSS viewport as the 200 percent zoom proxy. Content reflowed into a single column where needed, CTAs stayed reachable, and document scroll width matched viewport width.

- `Pass` Portrait/media treatment is intentionally accessible, either decorative or meaningfully named.
  - Note: Checked hero portrait in browser and source. The image now uses concise identity alt text, while the repeated visible name tag is hidden from assistive technology to avoid duplicate announcement.

## `/working-with-joel` - Working with Joel

- `Not checked` Page has one clear main content landmark.
  - Note:

- `Not checked` Page has one clear page-level heading that matches the page purpose.
  - Note:

- `Not checked` Heading order supports scanning and screen-reader navigation.
  - Note:

- `Not checked` Hero, introduction, approach tabs, and focus list appear in a sensible reading order.
  - Note:

- `Not checked` Page-specific links, buttons, and tab controls have meaningful names.
  - Note:

- `Not checked` Focus is visible on every page-specific link, button, and tab control.
  - Note:

- `Not checked` Approach tabs expose correct tab, selected, and panel behaviour.
  - Note:

- `Not checked` Approach tab content remains reachable and understandable with keyboard alone.
  - Note:

- `Not checked` Text, non-text UI, and focus states meet WCAG AA contrast expectations.
  - Note:

- `Not checked` Page remains readable at mobile widths.
  - Note:

- `Not checked` Page remains usable at 200 percent browser zoom without horizontal scrolling.
  - Note:

- `Not checked` Portrait/media treatment is intentionally accessible, either decorative or meaningfully named.
  - Note:

## `/inclusion` - Inclusion Hub

- `Pass` Page has one clear main content landmark.
  - Note: Checked on `/inclusion` in browser at 1280x900. The DOM exposes one visible `<main>` and Playwright finds one `main` landmark.

- `Pass` Page has one clear page-level heading that matches the page purpose.
  - Note: Checked on `/inclusion` in browser. The page has one visible `h1`, "Inclusive counselling". The adjacent "Inclusive counselling for diverse lives" line is an expressive paragraph rather than a second heading.

- `Pass` Heading order supports scanning and screen-reader navigation.
  - Note: Checked on `/inclusion` in browser. Heading order is one `h1`, then section `h2`s, with inclusion-panel and FAQ question `h3`s nested under their sections.

- `Pass` Hero topic links, inclusion panels, and FAQ appear in a sensible reading order.
  - Note: Checked rendered DOM and source. Reading order is hero title and topic links, hub introduction, three inclusion panels with CTAs, then FAQ.

- `Pass` Page-specific links, buttons, and FAQ controls have meaningful names.
  - Note: Checked main content controls in browser. Topic links are named "Kink & BDSM", "ENM & Polyamory", and "LGBTQIA+"; panel CTAs name their destination topics; FAQ buttons use the full question text.

- `Pass` Focus is visible on every page-specific link, button, and FAQ control.
  - Note: Checked keyboard Tab through 11 main controls. Hero topic links, panel CTA links, and FAQ buttons all exposed visible outline or outline plus box-shadow focus treatment.

- `Pass` FAQ controls expose expanded and collapsed state.
  - Note: Checked in browser. FAQ buttons expose `aria-expanded` and `aria-controls`; pressing Enter on the first FAQ changed `aria-expanded` from `false` to `true`.

- `Pass` FAQ answers remain associated with their questions.
  - Note: Checked in browser and source. Answer regions use `role="region"` and `aria-labelledby` pointing to the matching question button, and closed answers are hidden and inert.

- `Pass` Text, non-text UI, and focus states meet WCAG AA contrast expectations.
  - Note: Checked `/inclusion` with axe scoped to `main`; no violations were reported. Sampled focused topic links, CTA links, and FAQ buttons retained visible focus treatment.

- `Pass` Page remains readable at mobile widths.
  - Note: Checked at 390x844. Document, body, and main scroll widths matched the viewport width, with no horizontal page overflow.

- `Pass` Page remains usable at 200 percent browser zoom without horizontal scrolling.
  - Note: Checked with a 640px CSS viewport as the 200 percent zoom proxy. Document, body, and main scroll widths matched the viewport width, with no horizontal page overflow.

## `/inclusion/kink-bdsm` - Kink and BDSM

- `Not checked` Page has one clear main content landmark.
  - Note:

- `Not checked` Page has one clear page-level heading that matches the page purpose.
  - Note:

- `Not checked` Heading order supports scanning and screen-reader navigation.
  - Note:

- `Not checked` Hero, language field, context panels, and FAQ appear in a sensible reading order.
  - Note:

- `Not checked` Page-specific links, buttons, and FAQ controls have meaningful names.
  - Note:

- `Not checked` Focus is visible on every page-specific link, button, and FAQ control.
  - Note:

- `Not checked` Language field reads as grouped content rather than as stray decorative fragments.
  - Note:

- `Not checked` FAQ controls expose expanded and collapsed state.
  - Note:

- `Not checked` FAQ answers remain associated with their questions.
  - Note:

- `Not checked` Text, non-text UI, and focus states meet WCAG AA contrast expectations.
  - Note:

- `Not checked` Page remains readable at mobile widths.
  - Note:

- `Not checked` Page remains usable at 200 percent browser zoom without horizontal scrolling.
  - Note:

## `/inclusion/enm-polyamory` - ENM and polyamory

- `Not checked` Page has one clear main content landmark.
  - Note:

- `Not checked` Page has one clear page-level heading that matches the page purpose.
  - Note:

- `Not checked` Heading order supports scanning and screen-reader navigation.
  - Note:

- `Not checked` Hero, position blocks, gap cards, topic list, approach section, individual section, FAQ, and CTA appear in a sensible reading order.
  - Note:

- `Not checked` Page-specific links, buttons, and FAQ controls have meaningful names.
  - Note:

- `Not checked` Focus is visible on every page-specific link, button, and FAQ control.
  - Note:

- `Not checked` FAQ controls expose expanded and collapsed state.
  - Note:

- `Not checked` FAQ answers remain associated with their questions.
  - Note:

- `Not checked` Text, non-text UI, and focus states meet WCAG AA contrast expectations.
  - Note:

- `Not checked` Page remains readable at mobile widths.
  - Note:

- `Not checked` Page remains usable at 200 percent browser zoom without horizontal scrolling.
  - Note:

- `Not checked` Visible labels, headings, instructions, and link text are complete enough to support the reviewed interactions.
  - Note:

## `/inclusion/lgbtqia` - LGBTQIA+

- `Not checked` Page has one clear main content landmark.
  - Note:

- `Not checked` Page has one clear page-level heading that matches the page purpose.
  - Note:

- `Not checked` Heading order supports scanning and screen-reader navigation.
  - Note:

- `Not checked` Breadcrumbs, hero CTAs, stance section, check panel, individual section, FAQ, and closing CTA appear in a sensible reading order.
  - Note:

- `Not checked` Page-specific links, buttons, breadcrumbs, and FAQ controls have meaningful names.
  - Note:

- `Not checked` Focus is visible on every page-specific link, button, breadcrumb link, and FAQ control.
  - Note:

- `Not checked` Check icons are decorative or otherwise intentionally handled.
  - Note:

- `Not checked` FAQ controls expose expanded and collapsed state.
  - Note:

- `Not checked` FAQ answers remain associated with their questions.
  - Note:

- `Not checked` Text, non-text UI, and focus states meet WCAG AA contrast expectations.
  - Note:

- `Not checked` Page remains readable at mobile widths.
  - Note:

- `Not checked` Page remains usable at 200 percent browser zoom without horizontal scrolling.
  - Note:

## `/contact` - Contact/Fees

- `Pass` Page has one clear main content landmark.
  - Note: Checked on `/contact` in browser at 1280x900. The DOM exposes one visible `<main>` and Playwright finds one `main` landmark.

- `Pass` Page has one clear page-level heading that matches the page purpose.
  - Note: Checked on `/contact` in browser. The page has one visible `h1`, "Contact and fees", matching the route purpose and document title.

- `Pass` Heading order supports scanning and screen-reader navigation.
  - Note: Verified on `/contact` at desktop and mobile widths. The visible "Enquiry" label is a peer `h2` and names the control-bearing form through `aria-labelledby`; after successful submission, the form is replaced by a non-form status section with one relevant success `h2`. The wider sequence remains one `h1`, then section `h2`s and FAQ `h3`s. `SITE-20` is complete.

- `Pass` Hero, fee card, contact rail, practical notes, enquiry form, and FAQ appear in a sensible reading order.
  - Note: Checked on `/contact` in browser. DOM and visual order are hero with fee card, contact rail, practical details, enquiry form, then FAQ.

- `Pass` Email link, form controls, submit button, and FAQ controls have meaningful names.
  - Note: Checked in browser. The email link exposes the address, user-facing fields have labels or legends, the submit button is named "Send enquiry", and FAQ buttons use the question text.

- `Pass` Focus is visible on every page-specific link, form field, radio choice, select, submit button, and FAQ control.
  - Note: Checked with keyboard Tab and direct form-state checks. Email link, submit button, radios, FAQ buttons, inputs, textarea, and conditional select fields all expose visible focus treatment.

- `Pass` Every form field has a visible label.
  - Note: Checked visible form controls in browser. Name, Email, Your message, conditional text inputs, conditional selects, and radio choices all have visible labels; the hidden honeypot is not visitor-facing.

- `Partial` Required fields are clear before submission.
  - Note: Required controls use native `required` attributes and browser validation, but the visible labels do not identify which fields or choices are required before a visitor submits. Tracked by `SITE-21`.

- `Not checked` Validation errors identify the affected fields or groups.
  - Note:

- `Not checked` Validation errors are associated with the relevant controls.
  - Note:

- `Not checked` Validation errors are announced or focused where visitors can find them.
  - Note:

- `Not checked` Failed validation preserves entered visitor content.
  - Note:

- `Pass` Radio groups and conditional fields have clear group labels.
  - Note: Checked in browser and source. Radio choices sit inside fieldsets with legends, including "What would you like to enquire about?" and the conditional booking-type group, and conditional fields have explicit labels.

- `Pass` Conditional fields appear in a logical keyboard order.
  - Note: Checked booking and consult paths. Appointment fields appear after booking type as Preferred timing then State or territory; consult fields appear as Availability then Timezone before the submit button.

- `Pass` The form can be completed with keyboard alone.
  - Note: Checked a mocked successful general enquiry using keyboard input, Tab, radio arrow-key selection, and Enter on the submit button.

- `Pass` Submit, sending, success, and failure states are clear.
  - Note: Checked with mocked API responses. Submit starts as "Send enquiry", sending changes to disabled "Sending...", success replaces the form with a thank-you state, and failure shows an inline error state.

- `Pass` Success state is announced or focused so visitors know the form submitted.
  - Note: Checked with a mocked success response. The success panel has `role="status"`, `tabIndex="-1"`, and receives focus after submission.

- `Pass` Error state is announced or placed where visitors can find it.
  - Note: Checked with a mocked failure response. The error message appears below the submit button and has `role="alert"`.

- `Pass` Error copy tells visitors what to do next without exposing technical detail.
  - Note: Checked failure copy. It tells visitors to email directly and does not expose stack traces, provider names, status codes, or other technical detail; the public email identity itself is tracked separately in `SITE-10`.

- `Pass` FAQ controls expose expanded and collapsed state.
  - Note: Checked in browser. FAQ buttons expose `aria-expanded` and `aria-controls`, and the first FAQ changed from collapsed to expanded with keyboard Enter.

- `Pass` FAQ answers remain associated with their questions.
  - Note: Checked in browser and source. Open answer regions use `role="region"` and `aria-labelledby` pointing back to the matching question button.

- `Pass` Text, non-text UI, and focus states meet WCAG AA contrast expectations.
  - Note: Checked `/contact` with axe scoped to `main`; no colour-contrast or other main-content violations were reported. Sampled focus, success, and error states remained readable.

- `Pass` Page remains readable at mobile widths.
  - Note: Checked at 390x844. Hero, fee card, contact details, practical notes, form, FAQ, and footer stack cleanly with no horizontal overflow.

- `Pass` Page remains usable at 200 percent browser zoom without horizontal scrolling.
  - Note: Checked with a 640px CSS viewport as the 200 percent zoom proxy. Content reflowed into one column where needed and document scroll width matched viewport width.

## Not-Found Route

- `Not checked` Page has one clear main content landmark.
  - Note:

- `Not checked` Page has one clear page-level heading that matches the page purpose.
  - Note:

- `Not checked` Heading order supports scanning and screen-reader navigation.
  - Note:

- `Not checked` Requested address, recovery CTAs, and useful route links appear in a sensible reading order.
  - Note:

- `Not checked` Recovery links and CTAs have meaningful names.
  - Note:

- `Not checked` Focus is visible on every recovery link and CTA.
  - Note:

- `Not checked` Decorative 404 mark is hidden from assistive technology.
  - Note:

- `Not checked` Long or malformed requested URLs wrap without breaking the layout.
  - Note:

- `Not checked` Text, non-text UI, and focus states meet WCAG AA contrast expectations.
  - Note:

- `Not checked` Page remains readable at mobile widths.
  - Note:

- `Not checked` Page remains usable at 200 percent browser zoom without horizontal scrolling.
  - Note:
