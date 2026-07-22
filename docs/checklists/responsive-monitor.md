# Responsive Monitor

This is the owner-directed manual monitor for the site's responsive layout state. It replaces the incomplete launch checklist without acting as a launch gate or a scheduled review.

Update this document only when the owner explicitly directs a review. Existing automated overflow and navigation tests provide regression context, but they do not create manual `Pass` statuses here.

## How To Use

- `Last checked` records the date when every item in that section received a deliberate review using the review standard below. Use `Not recorded` until that has happened.
- `Note` is optional. Use it only for a durable exception, a deliberate departure from the review standard, or a linked `SITE-*` / `DEBT-*` gap that would otherwise be easy to lose.
- Recheck and update a section only when the owner directs it. There is no automatic or calendar-based review cadence.

## Status Labels

- `Not checked`: No applicable manual review is currently recorded.
- `Pass`: The condition was checked and was acceptable at the recorded section review.
- `Partial`: The condition was checked, but an accepted or separately tracked gap remains.
- `Fail`: The condition was checked and needs action.
- `N/A`: The condition does not apply.

## Review Standard

Review every item in a section at the following fixed viewports:

- Common mobile: 390x844.
- Tablet: 820x1180.
- Wide desktop: 1440x1000.

Resize continuously through the widths between those samples and across relevant breakpoints. Fixed viewport samples alone can miss intermediate overflow, overlap, clipping, and awkward layout transitions. Also check 200 percent browser zoom or an equivalent narrow CSS viewport where the section includes reflow behaviour.

Use a real browser for interaction-dependent states such as navigation, tabs, FAQs, and conditional form fields. Record a concrete visitor-facing gap as `SITE-*` work or a technical and maintainability gap as `DEBT-*` work rather than expanding the monitor into a backlog.

## Global Shared Shell

- **Last checked:** `Not recorded`

- `Not checked` Public pages avoid horizontal document overflow across the review standard.

- `Not checked` Public pages reflow at 200 percent zoom or an equivalent narrow CSS viewport without horizontal document scrolling.

- `Not checked` Layouts remain stable during the continuous width sweep without intermediate overflow, overlap, clipping, or abrupt spacing failures.

- `Not checked` Header navigation remains readable and usable as it changes between mobile and desktop layouts.

- `Not checked` Mobile navigation opens, closes, scrolls when needed, and fits within the viewport without hiding essential controls.

- `Not checked` Inclusion navigation remains usable when its parent and child links wrap or stack.

- `Not checked` Shared buttons, text links, navigation labels, and focus indicators remain visible when text wraps.

- `Not checked` Footer content stacks cleanly and keeps contact and navigation links readable.

- `Not checked` Sticky, fixed, or layered elements do not obscure headings, focused controls, form fields, or calls to action.

- `Not checked` Long words, email addresses, URLs, and route labels wrap without breaking the page layout.

## `/` - Home

- **Last checked:** `Not recorded`

- `Not checked` Hero copy remains readable without overlap, clipping, excessive line length, or awkward heading wraps.

- `Not checked` Hero support content and calls to action remain visible, reachable, and neatly wrapped.

- `Not checked` Hero portrait keeps an intentional crop and does not crowd or obscure the copy.

- `Not checked` Topic content reflows without clipped text, cramped cells, or uneven reading order.

- `Not checked` The workroom introduction and Joel card collapse into a clear, balanced reading order.

- `Not checked` Inclusion copy and linked detail list remain visually connected and easy to scan as the layout changes.

- `Not checked` The closing call to action remains visible and does not collide with surrounding sections.

- `Not checked` Section spacing avoids orphaned headings, excessive gaps, cramped controls, or content detached from its heading.

## `/working-with-joel` - Working with Joel

- **Last checked:** `Not recorded`

- `Not checked` Hero heading, support copy, and credentials remain readable without overlap, clipping, or awkward wrapping.

- `Not checked` Hero actions and supporting elements remain visible, reachable, and neatly wrapped.

- `Not checked` Introduction copy and portrait reflow into a clear reading order without an awkward media crop.

- `Not checked` The approach introduction remains readable without excessive line length or cramped spacing.

- `Not checked` Approach tabs remain usable and do not overflow, clip, or become visually ambiguous.

- `Not checked` The active approach panel remains readable and visually connected to its tabs.

- `Not checked` Focus topics wrap and stack without clipped text, uneven columns, or broken list rhythm.

- `Not checked` Section spacing avoids orphaned headings, excessive gaps, cramped controls, or content detached from its heading.

## `/inclusive-counselling` - Inclusive Counselling

- **Last checked:** `Not recorded`

- `Not checked` Hero copy remains readable without overlap, clipping, excessive line length, or awkward heading wraps.

- `Not checked` Hero topic links remain visible, reachable, and neatly wrapped or stacked.

- `Not checked` Hub introduction content keeps a clear hierarchy and comfortable line length.

- `Not checked` Inclusion panels reflow in source order without clipped text, cramped spacing, or unstable widths.

- `Not checked` Panel actions remain visible and connected to the related panel content.

- `Not checked` FAQ controls and answers remain readable and contained at mobile and intermediate widths.

- `Not checked` Long inclusion-language phrases wrap without breaking panels, links, buttons, or headings.

- `Not checked` Section spacing avoids orphaned headings, excessive gaps, cramped controls, or content detached from its heading.

## `/kink-bdsm-counselling` - Kink and BDSM Counselling

- **Last checked:** `Not recorded`

- `Not checked` Hero copy remains readable without overlap, clipping, excessive line length, or awkward heading wraps.

- `Not checked` Hero actions remain visible, reachable, and neatly wrapped or stacked.

- `Not checked` Knowledge copy and the language field reflow as coherent grouped content rather than scattered fragments.

- `Not checked` Language-field items wrap without clipping or forcing horizontal scrolling.

- `Not checked` Closing introduction and support card stack in a clear order without cramped content or unstable widths.

- `Not checked` FAQ controls and answers remain readable and contained at mobile and intermediate widths.

- `Not checked` Long kink and BDSM wording wraps without breaking cards, links, buttons, or headings.

- `Not checked` Section spacing avoids orphaned headings, excessive gaps, cramped controls, or content detached from its heading.

## `/polyamory-enm-counselling` - ENM and Polyamory Counselling

- **Last checked:** `Not recorded`

- `Not checked` Hero copy remains readable without overlap, clipping, excessive line length, or awkward heading wraps.

- `Not checked` Hero actions remain visible, reachable, and neatly wrapped or stacked.

- `Not checked` Reasons content remains readable and contained as its panel changes width.

- `Not checked` Focus copy and the "Where I stand" card reflow into a clear reading order without cramped content.

- `Not checked` Cards and content containers keep stable widths and do not force horizontal scrolling.

- `Not checked` Long ENM and polyamory wording wraps without breaking links, buttons, cards, or headings.

- `Not checked` Section spacing avoids orphaned headings, excessive gaps, cramped controls, or content detached from its heading.

## `/lgbtqia-affirming-counselling` - LGBTQIA+ Affirming Counselling

- **Last checked:** `Not recorded`

- `Not checked` Hero copy remains readable without overlap, clipping, excessive line length, or awkward heading wraps.

- `Not checked` Hero actions remain visible, reachable, and neatly wrapped or stacked.

- `Not checked` Recognition steps maintain their intended sequence and remain readable as the composition collapses.

- `Not checked` Fluency introduction and example field stack cleanly without clipped or scattered list content.

- `Not checked` Disclosure heading, position statement, and detail content retain a clear reading order.

- `Not checked` Cards and content containers keep stable widths and do not force horizontal scrolling.

- `Not checked` Long LGBTQIA+ wording wraps without breaking lists, links, buttons, cards, or headings.

- `Not checked` Section spacing avoids orphaned headings, excessive gaps, cramped controls, or content detached from its heading.

## `/contact` - Contact and Fees

- **Last checked:** `Not recorded`

- `Not checked` Hero copy remains readable without overlap, clipping, excessive line length, or awkward heading wraps.

- `Not checked` Fee card remains readable and contained, with no clipped fee or session details.

- `Not checked` Contact and practical-detail rail content stacks cleanly without clipping email, fee, or supporting text.

- `Not checked` Practical notes remain readable without excessive line length or cramped spacing.

- `Not checked` Enquiry form fields, labels, radios, selects, textarea, and submit button fit neatly at mobile and intermediate widths.

- `Not checked` Conditional form fields appear without layout shifts that hide the active field or submit button.

- `Not checked` Sending, success, validation, and error states remain readable, contained, and close to the form context.

- `Not checked` FAQ controls and answers remain readable and contained at mobile and intermediate widths.

- `Not checked` Section spacing avoids orphaned headings, excessive gaps, cramped controls, or content detached from its heading.

## Not-Found Behaviour

- **Last checked:** `Not recorded`

- `Not checked` Not-found copy remains readable without overlap, clipping, excessive line length, or awkward heading wraps.

- `Not checked` The requested address wraps without creating horizontal overflow.

- `Not checked` Recovery actions remain visible, reachable, and neatly wrapped or stacked.

- `Not checked` Useful route links stack or wrap without clipped text or cramped spacing.

- `Not checked` The decorative 404 treatment does not crowd, obscure, or overpower the recovery content.

- `Not checked` Section spacing avoids orphaned headings, excessive gaps, cramped controls, or content detached from its heading.

Use a sample unknown URL such as `/missing-responsive-check` when reviewing not-found behaviour.
