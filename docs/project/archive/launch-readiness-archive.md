# Launch Readiness Archive

This file preserves completed and superseded `LAUNCH-*` items moved out of the [active launch-readiness tracker](../launch-readiness.md). Stable IDs remain searchable, but archived items are supporting history rather than active requirements.

### LAUNCH-1 - Accessibility launch review

Closed on 2026-07-22 as a superseded launch gate after the site went live. The incomplete accessibility checklist was not declared passed. Its useful structure was refreshed into `docs/checklists/accessibility-monitor.md`, an owner-directed WCAG 2.2 AA-oriented manual monitor with section-level review dates and no automatic schedule or claim of formal conformance.

The former Home, `/inclusion`, and Contact assessments remain incomplete launch-era evidence. Defensible Home and Contact item statuses were retained without assigning either current section a review date. The `/inclusion` passes were not transferred because the route and page subsequently changed. Existing `SITE-7`, `SITE-19`, `SITE-21`, `DEBT-29`, `DEBT-30`, and `DEBT-35` items retain independent ownership; closing this gate does not resolve them.

### LAUNCH-2 - Responsive launch review

Closed on 2026-07-22 as a superseded launch gate after the site went live. The incomplete responsive checklist was not declared passed. Its useful review structure was refreshed for the current public routes in `docs/checklists/responsive-monitor.md`, an owner-directed manual monitor with section-level review dates and no automatic schedule.

The June review of the former `/inclusion` route is preserved here only as historical context. Its passes were not transferred because the route and page subsequently changed. Existing automated overflow and navigation coverage remains regression context rather than a substitute for manual monitor statuses. Existing `SITE-*` and `DEBT-*` items retain independent ownership; closing this gate does not resolve them.

### LAUNCH-3 - Public SEO and metadata launch review

Closed on 2026-07-22 as a superseded launch gate after the site went live. The incomplete launch checklist was not declared passed. Its useful statuses and route data were consolidated with the former metadata inventory and Google-style preview document into `docs/checklists/seo-metadata-monitor.md`, an owner-directed site monitor with section-level review dates and no automatic schedule.

Existing `SITE-*` and `DEBT-*` items retain independent ownership; closing this gate does not resolve them. Google Search Console submission remained unconfirmed at close-out and is preserved here as historical operational context rather than becoming part of the site-only monitor or a new tracker item. The exact public Google Business Profile identity URL remains recorded separately in current project scope.

### LAUNCH-4 - Performance and image delivery launch review

Closed on 2026-07-21 after the site went live. The current production site, direct public-asset delivery, and available Lighthouse tooling were accepted as the operating performance baseline without creating a continuing launch gate. Performance budgets, image-delivery refinements, and regressions discovered later remain ordinary `SITE-*` or `DEBT-*` work.

### LAUNCH-5 - Analytics and environment launch policy review

Closed on 2026-07-21 after the site went live. The current hostname-gated Vercel Analytics, GA4 route and conversion tracking, Clarity integration and form masking, analytics-quiet default QA, and opt-in analytics test path were accepted as the operating baseline. Future analytics administration, policy, privacy-notice, or testing changes remain ordinary operational, `SITE-*`, or `DEBT-*` work; `SITE-11` continues to track the public privacy and counselling-boundaries note.

### LAUNCH-6 - Enquiry form public-flow launch QA

Closed on 2026-07-21 after the site went live. The current desktop/mobile browser coverage and direct API tests were accepted as the live enquiry-flow baseline for conditional fields, payloads, sending semantics, success and failure states, no-JavaScript markup, and form semantics. Required-field clarity remains ordinary visitor-facing work under `SITE-21`; the completed direct API test baseline remains recorded under archived `DEBT-10`.

### LAUNCH-7 - Final public copy and ethical-claims proofread

Closed on 2026-07-21 as a superseded launch gate after the site went live. Public copy remains under active owner-led revision through `docs/project/writing-direction.md`, with confirmed concrete changes continuing as normal `SITE-*` work, including `SITE-15` and `SITE-17`; there is no longer a separate final-copy launch gate.

### LAUNCH-8 - Custom launch domain and canonical public identity readiness

Completed on 2026-07-21. Live checks confirmed that `https://vivecounselling.com.au` serves the public site, `www` redirects permanently to the apex, all seven public routes use apex canonical and social metadata, crawl artifacts and the shared social image use the apex origin, public aliases and clean URLs redirect correctly, and unknown paths serve the controlled noindex 404 fallback. `SITE-23` was already implemented; repeatable automated live-deployment smoke testing remains separately tracked under `DEBT-24` rather than blocking this completed domain gate.
