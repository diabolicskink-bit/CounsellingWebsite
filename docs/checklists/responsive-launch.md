# Launch Responsive Checklist

This is the working checklist artifact for `LAUNCH-2`.

Each item starts with a status label. The item describes the launch condition that should be true for visitors across common mobile, tablet, desktop, and wide desktop viewports. The note is for what is known, what is unresolved, or which `SITE-*` / `DEBT-*` item owns a gap.

Do not use `Pass` to mean "looked at it." Use `Pass` only when the condition is true enough for launch.

## Status Labels

- `Not checked`: No review has been recorded yet.
- `Pass`: Checked and acceptable for launch.
- `Partial`: Checked, but one or more accepted or tracker-linked gaps remain.
- `Fail`: Checked and not acceptable for launch until resolved or linked.
- `N/A`: The condition does not apply.

## Review Standard

Use the viewport set below unless a note states why another viewport was used. Notes should name which viewport sizes were checked, and non-pass notes should link the relevant `SITE-*` / `DEBT-*` item or state explicit launch acceptance.

- Narrow mobile: 320x568.
- Common mobile: 390x844.
- Tablet: 768x1024.
- Desktop: 1280x900.
- Wide desktop: 1440x1000.

Resize through major breakpoints as part of review; fixed viewport samples can miss intermediate-width failures.

## Global Shared Shell

- `Not checked` Public pages avoid horizontal document overflow at common launch viewports.
  - Note:

- `Not checked` Public pages reflow at 200 percent zoom or an equivalent narrow CSS viewport without horizontal document scrolling.
  - Note:

- `Not checked` Layouts remain stable while resizing through header, navigation, hero, card-grid, tab, FAQ, and form breakpoints, without intermediate overflow, overlap, or clipping.
  - Note:

- `Not checked` Header navigation remains readable and usable across mobile, tablet, desktop, and wide desktop widths.
  - Note:

- `Not checked` Mobile navigation opens, closes, and fits within the viewport without hiding essential controls.
  - Note:

- `Not checked` Inclusion navigation remains usable when links wrap or stack.
  - Note:

- `Not checked` Shared buttons, text links, and navigation labels wrap without clipping or overlapping.
  - Note:

- `Not checked` Footer content stacks cleanly and keeps contact/navigation links readable.
  - Note:

- `Not checked` Sticky, fixed, or layered elements do not obscure headings, focused controls, form fields, or CTAs.
  - Note:

- `Not checked` Long words, email addresses, URLs, and route labels wrap without breaking the page layout.
  - Note:

## `/` - Home

- `Not checked` Hero copy remains readable with no overlap, clipping, excessive line length, or orphaned headings across launch viewports.
  - Note:

- `Not checked` Hero CTAs remain visible, reachable, and neatly wrapped at mobile widths.
  - Note:

- `Not checked` Hero portrait/media keeps its intended crop and does not crowd or obscure the copy.
  - Note:

- `Not checked` Topic list content stacks or wraps without clipped text or cramped spacing.
  - Note:

- `Not checked` Joel card and related content remain readable without awkward column collapse.
  - Note:

- `Not checked` Inclusion links and supporting copy keep a clear reading order as the layout changes.
  - Note:

- `Not checked` Closing CTA remains visible and does not collide with surrounding sections.
  - Note:

- `Not checked` Page section spacing avoids orphaned headings, excessive vertical gaps, cramped controls, or sections detached from related content across launch viewports.
  - Note:

## `/working-with-joel` - Working with Joel

- `Not checked` Hero copy remains readable with no overlap, clipping, excessive line length, or orphaned headings across launch viewports.
  - Note:

- `Not checked` Hero CTAs and support elements remain visible, reachable, and neatly wrapped at mobile widths.
  - Note:

- `Not checked` Portrait/media treatment keeps its intended crop and does not crowd or obscure the copy.
  - Note:

- `Not checked` Introduction and practical context content stack in a clear reading order.
  - Note:

- `Not checked` Approach tabs remain usable and do not overflow, clip, or become visually confusing.
  - Note:

- `Not checked` Approach panel content remains readable without excessive line length or cramped spacing.
  - Note:

- `Not checked` Focus list and supporting sections wrap without clipped text or uneven columns.
  - Note:

- `Not checked` Page section spacing avoids orphaned headings, excessive vertical gaps, cramped controls, or sections detached from related content across launch viewports.
  - Note:

## `/inclusion` - Inclusion Hub

- `Pass` Hero copy remains readable with no overlap, clipping, excessive line length, or orphaned headings across launch viewports.
  - Note: Checked `/inclusion` at 320x568, 390x844, 640x900, 768x1024, 1280x900, and 1440x1000, plus a width sweep from 320 to 1440. Hero title wrapped cleanly and stayed within the viewport at every sampled width.

- `Pass` Hero topic links remain visible, reachable, and neatly wrapped at mobile widths.
  - Note: Checked `/inclusion` at 320x568 and 390x844. The three hero topic links stacked as full-width rows, stayed visible and in-bounds, and had no clipped text.

- `Pass` Inclusion panels stack in a clear order without clipped text or cramped spacing.
  - Note: Checked all three inclusion panels across the launch viewport set. Panels stacked in source order on mobile and reflowed to wider layouts on tablet/desktop with no detected clipping or horizontal overflow.

- `Pass` Page-specific cards keep stable widths and do not force horizontal scrolling.
  - Note: Checked `.site-copy-panel` widths at 320, 390, 640, 768, 1280, and 1440px. Document, body, and main scroll widths matched the viewport at every sampled width.

- `Pass` FAQ controls and answers remain readable and contained at mobile widths.
  - Note: Checked FAQ buttons at 320x568 and 390x844. FAQ controls stayed contained within the viewport, with no clipping or horizontal overflow detected.

- `Pass` Long inclusion-language phrases wrap without breaking cards, buttons, or headings.
  - Note: Checked long hero, panel, CTA, and FAQ text across the launch viewport set and breakpoint sweep. No important text element was clipped, offscreen, or wider than the viewport.

- `N/A` Closing content and CTAs remain visible and do not collide with surrounding sections.
  - Note: `/inclusion` does not have a separate closing content block or closing CTA. Panel CTAs are covered by the inclusion-panel and card-width checks above.

- `Pass` Page section spacing avoids orphaned headings, excessive vertical gaps, cramped controls, or sections detached from related content across launch viewports.
  - Note: Checked `/inclusion` across the launch viewport set and breakpoint sweep. Hero, hub intro, panels, and FAQ retained their intended order, spacing, and containment without overlap or detached controls.

## `/inclusion/kink-bdsm` - Kink and BDSM

- `Not checked` Hero copy remains readable with no overlap, clipping, excessive line length, or orphaned headings across launch viewports.
  - Note:

- `Not checked` Hero CTAs and support elements remain visible, reachable, and neatly wrapped at mobile widths.
  - Note:

- `Not checked` Language field content wraps as grouped readable content rather than scattered fragments.
  - Note:

- `Not checked` Context panels stack in a clear order without clipped text or cramped spacing.
  - Note:

- `Not checked` Page-specific cards keep stable widths and do not force horizontal scrolling.
  - Note:

- `Not checked` FAQ controls and answers remain readable and contained at mobile widths.
  - Note:

- `Not checked` Long kink/BDSM wording wraps without breaking cards, buttons, or headings.
  - Note:

- `Not checked` Page section spacing avoids orphaned headings, excessive vertical gaps, cramped controls, or sections detached from related content across launch viewports.
  - Note:

## `/inclusion/enm-polyamory` - ENM and polyamory

- `Not checked` Hero copy remains readable with no overlap, clipping, excessive line length, or orphaned headings across launch viewports.
  - Note:

- `Not checked` Hero CTAs and support elements remain visible, reachable, and neatly wrapped at mobile widths.
  - Note:

- `Not checked` Position blocks stack in a clear order without clipped text or cramped spacing.
  - Note:

- `Not checked` Gap cards keep stable widths and do not force horizontal scrolling.
  - Note:

- `Not checked` Topic list and approach sections remain readable as columns collapse or stack.
  - Note:

- `Not checked` Individual support section remains readable without excessive line length or cramped spacing.
  - Note:

- `Not checked` FAQ controls and answers remain readable and contained at mobile widths.
  - Note:

- `Not checked` Long ENM/polyamory wording wraps without breaking cards, buttons, or headings.
  - Note:

- `Not checked` Page section spacing avoids orphaned headings, excessive vertical gaps, cramped controls, or sections detached from related content across launch viewports.
  - Note:

## `/inclusion/lgbtqia` - LGBTQIA+

- `Not checked` Hero copy remains readable with no overlap, clipping, excessive line length, or orphaned headings across launch viewports.
  - Note:

- `Not checked` Breadcrumbs remain readable and wrap without causing horizontal overflow.
  - Note:

- `Not checked` Hero CTAs and support elements remain visible, reachable, and neatly wrapped at mobile widths.
  - Note:

- `Not checked` Stance section and check panel stack in a clear order without clipped text or cramped spacing.
  - Note:

- `Not checked` Individual support section remains readable without excessive line length or cramped spacing.
  - Note:

- `Not checked` FAQ controls and answers remain readable and contained at mobile widths.
  - Note:

- `Not checked` Long LGBTQIA+ wording wraps without breaking cards, buttons, or headings.
  - Note:

- `Not checked` Closing CTA remains visible and does not collide with surrounding sections.
  - Note:

- `Not checked` Page section spacing avoids orphaned headings, excessive vertical gaps, cramped controls, or sections detached from related content across launch viewports.
  - Note:

## `/contact` - Contact/Fees

- `Not checked` Hero copy remains readable with no overlap, clipping, excessive line length, or orphaned headings across launch viewports.
  - Note:

- `Not checked` Fee card remains readable and contained, with no clipped fee or session details.
  - Note:

- `Not checked` Contact rail content stacks cleanly without clipping email, fee, or practical detail text.
  - Note:

- `Not checked` Practical notes remain readable without excessive line length or cramped spacing.
  - Note:

- `Not checked` Enquiry form fields, labels, radios, selects, textarea, and submit button fit neatly at mobile widths.
  - Note:

- `Not checked` Conditional form fields appear without causing layout jumps that hide the active field or submit button.
  - Note:

- `Not checked` Success and error states remain readable, contained, and close to the form context.
  - Note:

- `Not checked` FAQ controls and answers remain readable and contained at mobile widths.
  - Note:

- `Not checked` Page section spacing avoids orphaned headings, excessive vertical gaps, cramped controls, or sections detached from related content across launch viewports.
  - Note:

## Not-Found Route

- `Not checked` Not-found page copy remains readable with no overlap, clipping, excessive line length, or orphaned headings across launch viewports.
  - Note:

- `Not checked` Requested address text wraps without creating horizontal overflow.
  - Note:

- `Not checked` Recovery CTAs remain visible, reachable, and neatly wrapped at mobile widths.
  - Note:

- `Not checked` Useful route links stack or wrap without clipped text or cramped spacing.
  - Note:

- `Not checked` Decorative 404 treatment does not crowd, obscure, or overpower recovery content.
  - Note:

- `Not checked` Page section spacing avoids orphaned headings, excessive vertical gaps, cramped controls, or sections detached from related content across launch viewports.
  - Note:

Use a sample unknown URL such as `/missing-launch-check` when recording not-found route notes.
