# Accessibility Monitor

This is the owner-directed manual monitor for the site's accessibility state. It replaces the former incomplete checklist without acting as a launch gate, a scheduled review, or a claim of formal WCAG conformance.

Update this document only when the owner explicitly directs a review. Existing automated accessibility and browser tests provide regression context, but they do not create manual `Pass` statuses here.

## How To Use

- `Last checked` records the date when every item in that section received a deliberate review using the review standard below. Use `Not recorded` until that has happened.
- `Note` is optional. Use it only for a durable exception, intentional decision, or linked `SITE-*` / `DEBT-*` gap that would otherwise be easy to lose.
- Recheck and update a section only when the owner directs it. There is no automatic or calendar-based review cadence.

## Status Labels

- `Not checked`: No applicable manual review is currently recorded.
- `Pass`: The condition was checked and was acceptable at the recorded item review.
- `Partial`: The condition was checked or independently evidenced, but an accepted or separately tracked gap remains.
- `Fail`: The condition was checked and needs action.
- `N/A`: The condition does not apply.

## Review Standard

Use [WCAG 2.2 Level AA](https://www.w3.org/TR/WCAG22/) as a practical review lens rather than treating this monitor as a conformance assessment.

- Review keyboard access, focus order, visible focus, focus not obscured, landmarks, headings, reading order, accessible names, roles, states, and status messages in a real browser.
- Inspect the browser accessibility tree and source where they help confirm semantic relationships. A screen-reader pass is not required by this monitor.
- Check text contrast, non-text contrast, use of colour, and WCAG 2.2 minimum target-size expectations, including applicable spacing exceptions.
- Test text resizing at 200 percent separately from [reflow at a width equivalent to 320 CSS pixels](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html). Do not treat a 200 percent zoom proxy as a complete reflow check.
- Review forms, validation, conditional controls, success and error states, media alternatives, and reduced-motion behaviour where applicable.
- Use axe or equivalent automated results as supporting context. A passing automated scan does not complete a section or replace keyboard and browser-semantic review.
- Record a concrete visitor-facing gap as `SITE-*` work or a technical and maintainability gap as `DEBT-*` work rather than expanding the monitor into a backlog.

## Global Shared Shell

- **Last checked:** `Not recorded`

- `Not checked` Header navigation and Inclusion subnavigation are operable with keyboard alone.

- `Not checked` Mobile navigation opens, closes, and remains usable with keyboard alone.

- `Not checked` Mobile navigation does not trap focus or leave focus inside hidden content when it closes.

- `Partial` Shared navigation exposes an intentional name, role, state, and disclosure model.
  - **Note:** Desktop submenu disclosure semantics and the remaining mobile focus-order expectations are tracked under `DEBT-30`.

- `Not checked` Current-page or current-section state is conveyed visually and programmatically where relevant.

- `Partial` Visitors can bypass repeated navigation, and client-side route changes provide an appropriate focus and orientation cue.
  - **Note:** The missing skip-link and route-focus baseline remains tracked under `DEBT-29`.

- `Not checked` Shared header, footer, navigation, links, and buttons have visible focus states.

- `Not checked` Focused controls are not obscured by sticky, fixed, clipped, hidden, or layered content.

- `Not checked` Shared interactive targets meet WCAG 2.2 minimum target-size expectations or an applicable spacing exception.

- `Partial` Shared scrolling, transitions, and interactions respect reduced-motion preferences.
  - **Note:** The incomplete global reduced-motion baseline remains tracked under `SITE-7`.

- `Not checked` Shared icon-only controls have accessible names, and decorative icons are hidden appropriately.

- `Not checked` Shared links and buttons have names that make sense in context.

- `Not checked` Automated accessibility scans for reviewed public routes have no unresolved serious or critical violations.

## Redirect Aliases

Redirect aliases `/about`, `/fees`, and `/inclusion` are covered by `docs/checklists/seo-metadata-monitor.md`. Accessibility review begins at their destination pages unless a redirect-specific visitor-facing issue appears.

## `/` - Home

- **Last checked:** `Not recorded`

- `Pass` Page has one clear main content landmark.

- `Pass` Page has one clear page-level heading that matches the page purpose.

- `Pass` Heading order supports scanning and assistive navigation.

- `Pass` Hero, topic content, workroom content, Inclusion links, and closing call to action appear in a sensible reading order.

- `Pass` Page-specific links and buttons have meaningful accessible names.

- `Pass` Focus is visible on page-specific links and calls to action.

- `Pass` Reviewed text, non-text interface elements, and focus states meet WCAG AA contrast expectations.

- `Not checked` Page-specific interactive targets meet WCAG 2.2 minimum target-size expectations or an applicable spacing exception.

- `Not checked` Text can be resized to 200 percent without loss of content or functionality.

- `Not checked` Content reflows at a width equivalent to 320 CSS pixels without two-dimensional scrolling, loss of information, or loss of functionality.

- `Pass` Portrait and repeated visible identity treatment have intentional accessible text and decorative handling.

## `/working-with-joel` - Working with Joel

- **Last checked:** `Not recorded`

- `Not checked` Page has one clear main content landmark.

- `Not checked` Page has one clear page-level heading and a coherent heading order.

- `Not checked` Hero, introduction, approach content, and focus topics appear in a sensible reading order.

- `Not checked` Page-specific links, buttons, and tab controls have meaningful accessible names.

- `Not checked` Focus order and visible focus remain clear across page links and approach tabs.

- `Not checked` Approach tabs expose appropriate roles, selected state, relationships, and keyboard behaviour after hydration.

- `Partial` Every approach explanation remains available and understandable before or without JavaScript.
  - **Note:** Pre-JavaScript access to the inactive Attachment and Integrative explanations remains tracked under `DEBT-35`.

- `Not checked` Reviewed text, non-text interface elements, and focus states meet WCAG AA contrast expectations.

- `Not checked` Page-specific interactive targets meet WCAG 2.2 minimum target-size expectations or an applicable spacing exception.

- `Not checked` Text can be resized to 200 percent without loss of content or functionality.

- `Not checked` Content reflows at a width equivalent to 320 CSS pixels without two-dimensional scrolling, loss of information, or loss of functionality.

- `Not checked` Portrait and repeated visible identity treatment have intentional accessible text and decorative handling.

## `/inclusive-counselling` - Inclusive Counselling

- **Last checked:** `Not recorded`

- `Not checked` Page has one clear main content landmark.

- `Not checked` Page has one clear page-level heading and a coherent heading order.

- `Not checked` Hero topic links, hub introduction, Inclusion panels, and FAQ appear in a sensible reading order.

- `Not checked` Page-specific links, buttons, and FAQ controls have meaningful accessible names.

- `Not checked` Focus order and visible focus remain clear across topic links, panel actions, and FAQ controls.

- `Not checked` FAQ controls expose expanded state, control the intended answer, and work with keyboard alone.

- `Not checked` FAQ answers have an appropriate relationship to their questions and hidden answers are not exposed as active content.

- `Not checked` Reviewed text, non-text interface elements, use of colour, and focus states meet WCAG AA expectations.

- `Not checked` Page-specific interactive targets meet WCAG 2.2 minimum target-size expectations or an applicable spacing exception.

- `Not checked` Text can be resized to 200 percent without loss of content or functionality.

- `Not checked` Content reflows at a width equivalent to 320 CSS pixels without two-dimensional scrolling, loss of information, or loss of functionality.

## `/kink-bdsm-counselling` - Kink and BDSM Counselling

- **Last checked:** `Not recorded`

- `Not checked` Page has one clear main content landmark.

- `Not checked` Page has one clear page-level heading and a coherent heading order.

- `Not checked` Hero, knowledge content, language field, closing support, and FAQ appear in a sensible reading order.

- `Not checked` Page-specific links, buttons, and FAQ controls have meaningful accessible names.

- `Not checked` Focus order and visible focus remain clear across page actions and FAQ controls.

- `Partial` The language field remains understandable without relying on cell colour alone, and meaningful visual distinctions meet non-text contrast expectations.
  - **Note:** The unresolved purpose and contrast of the language-field cell colours remain tracked under `SITE-19`.

- `Not checked` Language-field content is exposed as coherent grouped content rather than decorative fragments.

- `Not checked` FAQ controls expose expanded state, control the intended answer, and work with keyboard alone.

- `Not checked` FAQ answers have an appropriate relationship to their questions and hidden answers are not exposed as active content.

- `Not checked` Reviewed text, non-text interface elements, and focus states meet WCAG AA contrast expectations.

- `Not checked` Page-specific interactive targets meet WCAG 2.2 minimum target-size expectations or an applicable spacing exception.

- `Not checked` Text can be resized to 200 percent without loss of content or functionality.

- `Not checked` Content reflows at a width equivalent to 320 CSS pixels without two-dimensional scrolling, loss of information, or loss of functionality.

## `/polyamory-enm-counselling` - ENM and Polyamory Counselling

- **Last checked:** `Not recorded`

- `Not checked` Page has one clear main content landmark.

- `Not checked` Page has one clear page-level heading and a coherent heading order.

- `Not checked` Hero, reasons content, focus content, and position card appear in a sensible reading order.

- `Not checked` Page-specific links and actions have meaningful accessible names.

- `Not checked` Focus order and visible focus remain clear across page-specific links and actions.

- `Not checked` Cards, grouped content, and expressive typography retain coherent semantics and reading order.

- `Not checked` Reviewed text, non-text interface elements, use of colour, and focus states meet WCAG AA expectations.

- `Not checked` Page-specific interactive targets meet WCAG 2.2 minimum target-size expectations or an applicable spacing exception.

- `Not checked` Text can be resized to 200 percent without loss of content or functionality.

- `Not checked` Content reflows at a width equivalent to 320 CSS pixels without two-dimensional scrolling, loss of information, or loss of functionality.

## `/lgbtqia-affirming-counselling` - LGBTQIA+ Affirming Counselling

- **Last checked:** `Not recorded`

- `Not checked` Page has one clear main content landmark.

- `Not checked` Page has one clear page-level heading and a coherent heading order.

- `Not checked` Hero, recognition flow, fluency content, and disclosure content appear in a sensible reading order.

- `Not checked` Page-specific links and actions have meaningful accessible names.

- `Not checked` Focus order and visible focus remain clear across page-specific links and actions.

- `Not checked` Recognition steps, fluency examples, and disclosure details retain meaningful list, grouping, and heading semantics.

- `Not checked` Decorative markers and expressive visual treatments are hidden appropriately or have intentional alternatives.

- `Not checked` Reviewed text, non-text interface elements, use of colour, and focus states meet WCAG AA expectations.

- `Not checked` Page-specific interactive targets meet WCAG 2.2 minimum target-size expectations or an applicable spacing exception.

- `Not checked` Text can be resized to 200 percent without loss of content or functionality.

- `Not checked` Content reflows at a width equivalent to 320 CSS pixels without two-dimensional scrolling, loss of information, or loss of functionality.

## `/contact` - Contact and Fees

- **Last checked:** `Not recorded`

- `Pass` Page has one clear main content landmark.

- `Pass` Page has one clear page-level heading that matches the page purpose.

- `Pass` Heading order supports scanning and assistive navigation, including the labelled enquiry form and success section.

- `Pass` Hero, fee card, contact details, practical notes, enquiry form, and FAQ appear in a sensible reading order.

- `Pass` Email link, form controls, submit button, and FAQ controls have meaningful accessible names.

- `Pass` Focus is visible on page links, form controls, radio choices, selects, submit button, and FAQ controls.

- `Pass` Every visitor-facing form field has a visible label or group legend.

- `Partial` Required fields and required choices are clear before submission.
  - **Note:** Visible required-field and required-choice clarity remains tracked under `SITE-21`.

- `Not checked` Validation errors identify the affected fields or groups.

- `Not checked` Validation errors are programmatically associated with the relevant controls.

- `Not checked` Validation errors are announced or focused where visitors can find them.

- `Not checked` Failed validation preserves entered visitor content.

- `Pass` Radio groups and conditional fields have clear group labels and control labels.

- `Pass` Conditional fields appear in a logical keyboard order.

- `Pass` The enquiry form can be completed with keyboard alone.

- `Pass` Submit, sending, success, and server-failure states are clear.

- `Pass` Successful submission is announced and focused so visitors know the form was sent.

- `Pass` Server-failure state is announced where visitors can find it.

- `Pass` Server-failure copy gives a safe next step without exposing technical detail.

- `Pass` FAQ controls expose expanded state, control the intended answer, and work with keyboard alone.

- `Pass` FAQ answers have an appropriate relationship to their questions and hidden answers are not exposed as active content.

- `Pass` Reviewed text, non-text interface elements, and focus states meet WCAG AA contrast expectations.

- `Not checked` Page-specific interactive targets meet WCAG 2.2 minimum target-size expectations or an applicable spacing exception.

- `Not checked` Text can be resized to 200 percent without loss of content or functionality.

- `Not checked` Content reflows at a width equivalent to 320 CSS pixels without two-dimensional scrolling, loss of information, or loss of functionality.

## Not-Found Behaviour

- **Last checked:** `Not recorded`

- `Not checked` Not-found page has one clear main content landmark.

- `Not checked` Not-found page has one clear page-level heading and a coherent heading order.

- `Not checked` Requested address, recovery actions, and useful route links appear in a sensible reading order.

- `Not checked` Recovery links and actions have meaningful accessible names.

- `Not checked` Focus order and visible focus remain clear across recovery links and actions.

- `Not checked` The decorative 404 mark is hidden from assistive technology.

- `Not checked` Long or malformed requested addresses wrap without loss of content or two-dimensional scrolling.

- `Not checked` Reviewed text, non-text interface elements, and focus states meet WCAG AA contrast expectations.

- `Not checked` Interactive targets meet WCAG 2.2 minimum target-size expectations or an applicable spacing exception.

- `Not checked` Text can be resized to 200 percent without loss of content or functionality.

- `Not checked` Content reflows at a width equivalent to 320 CSS pixels without two-dimensional scrolling, loss of information, or loss of functionality.

Use a sample unknown URL such as `/missing-accessibility-check` when reviewing not-found behaviour.
