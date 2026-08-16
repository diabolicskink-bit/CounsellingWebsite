# Site Backlog Archive

This file preserves implemented and superseded `SITE-*` items moved out of the [active site backlog](../site-backlog.md). Stable IDs remain searchable, but archived items are supporting history rather than active requirements.

### SITE-24 - Vite security and maintenance update

Implemented on 2026-08-16. Vite moved from `8.0.8` to `8.2.1`, with PostCSS resolving to `8.5.26` and Nano ID to `3.3.18`; the Vite and related transitive advisories are no longer reported. Client and SSR builds, eight-route metadata prerendering, the production preview, and the public browser suite passed on the updated toolchain.

### SITE-25 - Lighthouse security and maintenance update

Implemented on 2026-08-16. Lighthouse moved from `13.1.0` to `13.4.1`, replacing the vulnerable Puppeteer, Sentry/OpenTelemetry, archive-extraction, and supporting dependency chain. The repository's full Lighthouse workflow completed against a fresh production build with scores of 100 for performance, accessibility, best practices, and SEO.

### SITE-27 - Axe Playwright accessibility-engine update

Implemented on 2026-08-17. `@axe-core/playwright` moved from `4.11.2` to `4.13.0`. The complete QA gate passed with all eight public routes retaining clean serious-impact Axe results; the newer engine surfaced no accessibility finding that required a source or monitor change.

### SITE-28 - Node type definitions update and runtime alignment

Implemented on 2026-08-17 by aligning the project to its actual Node 24 local and Vercel runtime instead of adopting Node-26 definitions. `@types/node` moved from `25.6.0` to the current Node-24 release `24.13.3`, `package.json` now declares Node `24.x` and npm `11.11.0`, application and test typechecks pass, and the linked `DEBT-16` runtime drift is resolved.

### SITE-29 - Vite React plugin maintenance update

Implemented on 2026-08-17. `@vitejs/plugin-react` moved from `6.0.1` to `6.0.5`. A real Vite development session rendered the complete homepage without console errors or an error overlay and injected the `/@react-refresh` runtime hook; client and SSR production builds also passed.

### SITE-32 - React 19 application and type migration

Implemented on 2026-08-17. React and React DOM moved together from `18.3.1` to `19.2.8`, with `@types/react` updated to `19.2.18` and `@types/react-dom` to `19.2.4`. The existing browser root, hydration, and server-rendering entry points already used React's current APIs, so no source migration was required. The complete site and analytics QA gates passed, and Lighthouse retained scores of 100 for performance, accessibility, best practices, and SEO.

### SITE-21 - Contact form required-field clarity

Implemented on 2026-07-27, with accessible required-label reinforcement on 2026-08-14. The progressive Contact form now requires an enquiry-path choice before exposing its submit flow, explains the required marker, marks each applicable visible field, provides screen-reader required text, and retains native validation.

### SITE-19 - Kink language table cell colour distinction

Superseded on 2026-07-27 when the terminology grid was removed and the Kink and BDSM page was restructured around three prose chapters. The former cell-colour distinction no longer has a source consumer.

### SITE-22 - Working With Joel hero support design polish

Superseded on 2026-07-17 when the former hero-support block was removed during the Working with Joel redesign. The current compact hero uses its title, Contact action, and credential list without the old “Life is complicated” support copy.

### SITE-9 - ENM and polyamory page copy completion

Implemented on 2026-07-18. The ENM/polyamory page now contains deliberately written public copy with no Latin placeholder paragraphs or visible encoding artifacts. The route passed the repository encoding check and was published with the other Inclusion child pages. Copy refinement continues through the owner-led writing process and concrete `SITE-*` work.

### SITE-20 - Contact enquiry form semantic heading

Implemented on 2026-07-14. The visible "Enquiry" label is now a peer `h2` that names the control-bearing form through `aria-labelledby` across prerendered, no-JavaScript, hydrated, sending, and error states. Successful submission replaces the form with a non-form status section containing one relevant success `h2`, while preserving status focus, payload behaviour, native fallback, and Clarity masking. Desktop and mobile Playwright coverage and the serious-impact axe smoke check pass.

### SITE-12 - Crisis and immediate-support resource block

Implemented on 2026-07-08. The Contact/Fees FAQ now states that Vive Counselling is not an emergency service, warns that enquiries may not be seen straight away, and gives concrete immediate-support steps: call `000` for immediate danger, or contact Lifeline on `13 11 14` or Suicide Call Back Service on `1300 659 467` for crisis support.

### SITE-23 - Enable indexing on the final domain

Implemented on 2026-07-08. Home, Working with Joel, Inclusion, and Contact/Fees are configured as indexable on `https://vivecounselling.com.au`; the temporary site-wide `noindex, nofollow` meta/header layer was removed; `sitemap.xml` now advertises only those approved URLs; and `robots.txt` points crawlers to the sitemap. Draft Inclusion child pages remain excluded from production links, sitemap output, and indexing through route-level `noindex, nofollow`.

### SITE-10 - Public contact identity and branded email decision

Implemented on 2026-06-27. Public contact display, footer/contact form source data, and enquiry API fallback/failure messaging now use `joel@vivecounselling.com.au` as the branded Vive address. Production delivery configuration hardening remains tracked separately under `DEBT-11`, including the need to keep `ENQUIRY_TO_EMAIL` and `ENQUIRY_FROM_EMAIL` intentional.

### SITE-1 - Accessibility checklist

The incomplete checklist was retired after the site went live without being described as passed. Owner-directed accessibility review now lives in `docs/checklists/accessibility-monitor.md`; concrete changes remain ordinary `SITE-*` or `DEBT-*` work.

### SITE-2 - Responsive QA matrix

The incomplete matrix was retired after the site went live without being described as passed. Owner-directed responsive review now lives in `docs/checklists/responsive-monitor.md`; concrete changes remain ordinary `SITE-*` or `DEBT-*` work.

### SITE-3 - Public SEO and metadata QA matrix

The incomplete matrix was retired after the site went live without being described as passed. Owner-directed site metadata review now lives in `docs/checklists/seo-metadata-monitor.md`; concrete changes remain ordinary `SITE-*` or `DEBT-*` work.

### SITE-4 - Performance and image delivery review

Closed after the site went live and the current performance posture was accepted as the operating baseline. Future performance and media-delivery improvements remain ordinary `SITE-*` or `DEBT-*` work.

### SITE-5 - Analytics and local/test policy

Closed after the site went live and the implemented analytics posture was accepted as the operating baseline. Future analytics, policy, privacy-notice, and testing changes remain ordinary operational, `SITE-*`, or `DEBT-*` work.

### SITE-6 - Enquiry form public-flow QA

Closed after the site went live and its current QA coverage was accepted as the baseline. Concrete form changes remain in active SITE cards where needed.

### SITE-8 - Shared portrait/media hero treatment

Implemented on 2026-06-23. Home and Working with Joel now use the shared `.hero-media-note--portrait` modifier and `.hero-media-note__tag`, with the portrait frame/tag treatment documented in the hero system and shown on the rendered hero design-system page.

### SITE-13 - Final public copy and ethical-claims proofread

Closed after the site went live. Ongoing owner-led copy refinement and concrete copy changes remain ordinary writing and `SITE-*` work.

### SITE-18 - Custom domain and canonical public identity

Completed after the live apex domain, redirects, crawl artifacts, social metadata, and controlled 404 behaviour were verified.
