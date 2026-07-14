# Site Backlog Archive

This file preserves implemented and superseded `SITE-*` items moved out of the [active site backlog](../site-backlog.md). Stable IDs remain searchable, but archived items are supporting history rather than active requirements.

### SITE-20 - Contact enquiry form semantic heading

Implemented on 2026-07-14. The visible "Enquiry" label is now a peer `h2` that names the control-bearing form through `aria-labelledby` across prerendered, no-JavaScript, hydrated, sending, and error states. Successful submission replaces the form with a non-form status section containing one relevant success `h2`, while preserving status focus, payload behaviour, native fallback, and Clarity masking. Desktop and mobile Playwright coverage and the serious-impact axe smoke check pass.

### SITE-12 - Crisis and immediate-support resource block

Implemented on 2026-07-08. The Contact/Fees FAQ now states that Vive Counselling is not an emergency service, warns that enquiries may not be seen straight away, and gives concrete immediate-support steps: call `000` for immediate danger, or contact Lifeline on `13 11 14` or Suicide Call Back Service on `1300 659 467` for crisis support.

### SITE-23 - Enable launch indexing on the final domain

Implemented on 2026-07-08. Home, Working with Joel, Inclusion, and Contact/Fees are configured as indexable on `https://vivecounselling.com.au`; the temporary site-wide `noindex, nofollow` meta/header layer was removed; `sitemap.xml` now advertises only those approved URLs; and `robots.txt` points crawlers to the sitemap. Draft Inclusion child pages remain excluded from production links, sitemap output, and indexing through route-level `noindex, nofollow`.

### SITE-10 - Public contact identity and branded email decision

Implemented on 2026-06-27. Public contact display, footer/contact form source data, and enquiry API fallback/failure messaging now use `joel@vivecounselling.com.au` as the branded Vive address. Production delivery configuration hardening remains tracked separately under `DEBT-11`, including the need to keep `ENQUIRY_TO_EMAIL` and `ENQUIRY_FROM_EMAIL` intentional.

### SITE-1 - Launch accessibility checklist

Superseded by `LAUNCH-1`. The working checklist remains at `docs/checklists/accessibility-launch.md`; concrete visitor-facing gaps found during that review should be tracked as `SITE-*` or `DEBT-*` items.

### SITE-2 - Responsive QA matrix

Superseded by `LAUNCH-2`. Responsive route review is now launch-readiness work rather than a concrete SITE change card.

### SITE-3 - Public SEO and metadata QA matrix

Superseded by `LAUNCH-3`. Metadata review is now tracked as a launch-readiness gate; concrete metadata fixes should be tracked separately.

### SITE-4 - Performance and image delivery review

Superseded by `LAUNCH-4`. Performance and media delivery review is now tracked as a launch-readiness gate; concrete follow-up work should be linked from that review.

### SITE-5 - Analytics and local/test policy

Superseded by `LAUNCH-5`. Analytics environment policy is now tracked as launch-readiness work, with technical follow-up linked separately.

### SITE-6 - Enquiry form public-flow QA

Superseded by `LAUNCH-6`. Public enquiry-flow review is now tracked as launch-readiness work; concrete form changes remain in active SITE cards where needed.

### SITE-8 - Shared portrait/media hero treatment

Implemented on 2026-06-23. Home and Working with Joel now use the shared `.hero-media-note--portrait` modifier and `.hero-media-note__tag`, with the portrait frame/tag treatment documented in the hero system and shown on the rendered hero design-system page.

### SITE-13 - Final public copy and ethical-claims proofread

Superseded by `LAUNCH-7`. Final cross-route copy proofing is now launch-readiness work; concrete copy changes remain as active `SITE-*` items.

### SITE-18 - Custom launch domain and canonical public identity

Superseded by `LAUNCH-8`. Domain and canonical identity sign-off is now tracked as launch-readiness work rather than a SITE change card.
