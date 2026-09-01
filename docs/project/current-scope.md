# Current Project Scope

This is the factual current-state inventory for the Vive Counselling website and supporting application. Executable behaviour, tests, configuration, generated output, and source remain authoritative when an exact detail differs from this summary.

Approved reusable UI is maintained separately in the current-only catalogues under `docs/design-system/`. Source-backed inherited implementation may be recorded under `docs/design-system-legacy/`, but neither production use nor a legacy record grants design-system approval.

## Application And Routes

- Vite, React, and TypeScript power the application.
- Nine metadata-backed public routes are implemented: `/`, `/working-with-joel`, `/inclusive-counselling`, `/kink-bdsm-counselling`, `/polyamory-enm-counselling`, `/lgbtqia-affirming-counselling`, `/contact`, `/crisis-support`, and `/privacy-policy`. Unknown paths render the public Not Found page.
- Vercel permanently redirects `/about` to `/working-with-joel`, `/fees` to `/contact`, and `/inclusion` to `/inclusive-counselling`.
- Desktop navigation exposes Home, Working with Joel, Inclusion and its three topic pages, and Fees, with a separate Get in touch action. Mobile navigation exposes Fees and Contact separately.
- Shared Fees links target `/contact` without a fee anchor but carry a virtual `/fees` analytics path; ordinary Contact and enquiry links report `/contact`. The shared footer includes Crisis Support and Privacy alongside contact details, hours, social profiles, and copyright.

### Development-Only Routes

- `/design-system`, `/design-system/foundations`, `/design-system/components`, `/design-system/patterns`, `/documents`, `/codex-tb`, and `/opus-tb` are registered only in Vite development builds.
- The design-system workspace renders supported specimens without becoming authority itself. The Documents page is a Markdown reader for checklists, reports, research, page plans, working plans, and current and legacy design-system records.
- The Codex and Opus test beds are currently empty development shells.

### Private Deployed Routes

- `/analytics`, `/analytics/pages`, `/analytics/keywords`, `/analytics/enquiries`, and `/analytics/excluded` are unlisted private routes included in deployed builds. They use an analytics-owned shell without the public navigation or footer.
- Vercel Routing Middleware protects the private routes and `/api/analytics` namespace with HTTP Basic Authentication from environment-specific `ANALYTICS_USERNAME` and `ANALYTICS_PASSWORD` values. Protected responses are non-cacheable and no-indexed; missing credentials fail closed.
- Production and Preview use separate credentials and databases. Local Vite development bypasses the platform middleware and has no analytics database.
- Each private route receives a dedicated no-index first-response shell. Client navigation from a public document that has already loaded Google Analytics or Clarity forces a clean document request before private content renders.

## Public Content

- Public copy is under active owner-led revision. Page source records current implementation, not an approved voice corpus or editorial precedent. Stable practice direction lives in `docs/project/practice-direction.md`; public-writing policy lives in `docs/project/writing-direction.md`.
- Home introduces Joel's online practice, general counselling, trauma and relationship work, then routes visitors to the three specialist areas and the Contact journey.
- Working with Joel covers background, credentials, psychodynamic, attachment-informed and integrative approaches, and common counselling concerns. All three approach explanations are present before hydration and become tabs after enhancement.
- The Inclusion hub opens with “Known before you arrive. Not learned as you go.” and introduces the Kink and BDSM, ENM and polyamory, and LGBTQIA+ topic routes as separate editorial chapters.
- The Kink and BDSM route is organised around not needing to translate, common therapeutic misreadings, and work beyond kink. The ENM and polyamory route covers reasons for seeking counselling, how relationship structure relates to the work, and a non-prescriptive position on monogamy. The LGBTQIA+ route covers differing relevance of sexuality or gender, therapist assumptions, and disclosure without treating greater disclosure as the default goal.
- Home, Working with Joel, and all three Inclusion topic routes end with the canonical Contact invitation.
- Contact combines fees and practical details with the enquiry paths described below.
- Crisis Support provides immediate-danger guidance, national crisis services, and state or territory public mental-health assessment contacts. It links to official sources and publishes its service review date in visible content and structured data.
- Privacy Policy covers website analytics, enquiries, counselling and health information, browser storage, service providers and overseas processing, retention, access and correction, and complaints. It is linked from the shared footer and beside the enquiry submission action.

## Discoverability And Metadata

- `src/data/routeMetadata.json` owns site, public-route, and Not Found metadata. Page components apply runtime title and description values; the build generator uses the same source for first-response metadata and generated crawl artifacts.
- All nine public routes are indexable and appear in `sitemap.xml`. Not Found and private analytics responses are no-indexed. `robots.txt` allows public crawling and references the sitemap.
- Production metadata defaults to `https://vivecounselling.com.au`; `SITE_URL` can set an intentional alternate origin, while Preview can fall back to its `VERCEL_URL`. The deployed apex returns the site and `www` redirects permanently to the apex.
- Homepage structured data links the `WebSite`, `Organization`, `Person`, and umbrella counselling `Service`. Working with Joel adds a `ProfilePage`; each specialist topic route adds a route-specific `Service`; Crisis Support adds a reviewed `MedicalWebPage` and breadcrumb trail. No graph publishes a private or inferred street address or address-dependent `LocalBusiness` data.
- Route `lastModified` values feed sitemap dates; Crisis Support also publishes `lastReviewed` in visible content and structured data, while Privacy Policy displays its last-modified date.
- Google Business Profile verification is complete.

## Rendering, Build, And Deployment

- The public site is live at `https://vivecounselling.com.au`.
- Browser and server rendering share the same application tree. `npm run build` typechecks `src`, `api`, and `middleware.ts`, creates the client and temporary SSR bundles, and prerenders every metadata-backed public route.
- Generated public HTML contains the rendered header, page, navigation, and footer in the first response. Contact includes the complete native form before hydration.
- The build also generates route metadata, structured data, `sitemap.xml`, `robots.txt`, five private analytics shells, and the controlled `404.html` fallback. It fails if a metadata-backed public route is missing from the prerender route set.
- Suitable prerendered documents hydrate in the browser; development roots, stale or mismatched artifacts, unknown paths, and `404.html` use client rendering.
- `vercel.json` defines clean URLs, trailing-slash policy, public aliases, serverless source packaging, BotID proxy rewrites, and the daily retention schedule.

## Enquiry Flow And API

- Contact offers three paths: make an appointment, request a free 15-minute consult, or make a general enquiry. After hydration it reveals only fields relevant to the selected path; the server-rendered form exposes the complete field set for JavaScript-disabled use.
- Practical details show fixed Perth business hours in AWST and browser-refreshed interstate comparisons. Consult timezone choices come from the current Australian timezone set when needed.
- Successful JavaScript submissions replace the form with a focused confirmation that Joel usually replies within 24 hours. Native submissions return equivalent success or failure HTML.
- Public contact and fallback messaging use `joel@vivecounselling.com.au`.
- The form submits JSON or URL-encoded native posts to `POST /api/enquiry`. The endpoint validates structured enquiry and booking fields, builds the email server-side, and sends through Resend when configured.
- The endpoint rejects unsupported content types, multipart posts, declared bodies above 25 KB, and explicit cross-site fetch, origin, or referrer signals before validation or delivery. A honeypot provides basic spam filtering.
- Public failures remain generic while configuration, provider, and runtime diagnostics stay in server logs.

## Analytics

### First-Party Collection

- A Neon/Postgres visit ledger stores anonymous visitors, visits, page views, referrer and supported ad-attribution data, visible-page active time, controlled enquiry events, bot observations, and bounded client diagnostics.
- Collection is independently gated by `VITE_VISIT_ANALYTICS_ENABLED` and a hostname allowlist. The source default is off. Production is limited to the canonical apex and `www`; Preview accepts Vercel preview hostnames and writes only to its separate database.
- A versioned anonymous visitor ID in `localStorage` rotates after 12 months. A session-scoped visit restarts after 30 minutes of inactivity, a new external arrival, or changed tagged attribution.
- Initial documents, restored documents, and distinct React pathnames receive duplicate-safe page views; query-only and hash-only changes do not. Stored paths are canonicalized to lower case, and Fees links record `/fees` without changing the visible `/contact` URL.
- Engagement updates are cumulative, ownership-checked, and idempotent, and count only time while the page is visible.
- `POST /api/visit`, `POST /api/page-engagement`, and `POST /api/visit-event` are write-only public endpoints with bounded validation, cross-site signal checks, generic failures, and idempotent storage. Visit recording also derives device type and bounded User-Agent data and records Vercel BotID Basic observations without blocking visitors.
- The private analytics subtree is excluded case-insensitively from first-party, GA4, and Clarity collection. The visit endpoint rejects private paths as a backstop.

### Reporting And Retention

- The schema has seven ordered migrations through `0007_add_visit_client_environment.sql`. Production and Preview are recorded as current through that migration; Development receives no database configuration.
- Protected `GET /api/analytics` supports a Perth calendar day, calendar month, anonymous visitor history, page-view date range, or paid-keyword date range. Date ranges are inclusive and limited to 366 days. `GET` and `PUT` `/api/analytics/exclusions` list and change visitor exclusions without deleting retained data.
- The five private views cover daily traffic, route totals, paid matched-keyword journeys, monthly enquiry outcomes, and excluded visitors. Daily, enquiry, and exclusion records can open the visitor's complete retained history with interleaved page views and events.
- Reports cover source, page depth, active time, new or returning status, enquiry outcomes, ad attribution, bot and device observations, and retained visitor history. The keyword report treats the stored Google Ads matched keyword as attribution, not as the visitor's search query, and keeps paid visits without keyword data visible in coverage totals.
- Manual exclusions remove a visitor's past and future visits from ordinary daily, monthly, page, and keyword reports while retaining direct history and allowing restoration. Explicit bot verdicts are excluded by default; unclassified visits remain included, and a URL-backed control can include identified bots.
- Database and runtime errors remain generic to the client. The shared client rejects reports that do not match the requesting page's complete response contract.
- Anonymous visits older than 12 months are deleted by the authenticated Production retention function; related page views and events cascade, and orphaned exclusion markers are removed. Preview has no scheduled retention run.

### GA4 And Clarity

- `VITE_ANALYTICS_ENABLED`, the shared analytics hostname allowlist, and provider IDs gate Google Analytics and Microsoft Clarity. Vercel Web Analytics is not installed.
- GA4 sends manual public-route page views plus controlled enquiry-started, contact-option, email-link, and successful-lead events. Failed enquiries do not emit the conversion event.
- First-party events record contact-option selection, enquiry start, server-side submission attempt, successful delivery, and controlled failure outcomes. Event storage is best-effort and never changes the public delivery result.
- The enquiry request carries only optional active visit and page-view IDs as analytics context. The form is masked from Clarity with `data-clarity-mask="true"`.

## Testing And QA

- `tests/public-site/` is the single-Chromium public browser suite. It applies route-level rendering, accessibility, and compact-viewport baselines, with focused coverage for shared navigation, Crisis Support, Privacy Policy, Working with Joel tabs, the enhanced and native enquiry flows, metadata and crawl output, redirects, and Not Found behaviour.
- `tests/analytics.spec.ts` is the separate private-analytics browser boundary. It covers host gating, private-route isolation, first-party collection, Fees attribution, visitor-ID rotation, GA4 and Clarity behaviour, and a focused keyword-report journey.
- Direct Node tests under `tests/api/` cover analytics, enquiry, and visit endpoints and repositories. Tests under `tests/scripts/` cover route and metadata contracts, structured data, Vercel configuration, analytics hosts, migrations, reporting SQL, and the visual-session helper.
- `tests/tsconfig.json` typechecks both Playwright spec trees. `npm run qa:site` runs encoding, test typechecking, the build, and the public browser suite. `npm run qa` additionally runs direct script and API tests, but does not run the private analytics browser suite.
- `npm run test:analytics` runs the complete direct API suite plus analytics host, migration-runner, and reporting-SQL contracts. `npm run qa:analytics` adds blocked-host and enabled-host builds and runs only `tests/analytics.spec.ts` in the browser.
- There is no local analytics database. Database-backed analytics behaviour is verified on a pushed Vercel Preview deployment against the separate Preview database, with the owner as final verifier.
- Lighthouse audit tooling exists, but no performance budget is enforced. Codex visual inspection follows [visual-verification.md](visual-verification.md).

## Known Gaps

Detailed resolution records and ownership live in [project-debt.md](project-debt.md). The principal current gaps are:

- Public write endpoints have application-level validation but no Vercel Firewall or equivalent platform rate limit. Enquiry delivery configuration can also fall back to implicit recipient defaults (`DEBT-23`, `DEBT-11`; the equivalent analytics concern is noted under `DEBT-40`).
- Page views and events have no persisted cross-document causal sequence, and protected analytics reports are not paginated (`DEBT-39`, `DEBT-40`).
- Runtime client navigation updates title and description but can retain stale canonical, social, or robots metadata. Repeatable post-deployment smoke testing also remains manual (`DEBT-27`, `DEBT-24`).
- The public shell has no skip-link or route-change focus policy, and navigation disclosure semantics and remaining keyboard expectations are incomplete (`DEBT-29`, `DEBT-30`). Automated accessibility checks do not amount to a claim of WCAG conformance.
- Direct JavaScript tests, scripts, and most configuration remain outside TypeScript checking, and expected Node and package-manager versions are not pinned (`DEBT-9`, `DEBT-16`).

## Excluded Project Scope

The current application does not include:

- A CMS, blog, or article-publishing system.
- Online booking or scheduling, payments, a client portal, public visitor accounts, or general administration UI.
- A first-party cookie banner or local Microsoft Clarity Consent API flow.
- Dark mode, Storybook or another external component explorer, or visual-regression testing.

The following require a task that explicitly expands scope:

- A wholesale public-copy rewrite.
- A framework, Tailwind, or other CSS-framework migration.
- Turning development or test-bed routes into public pages.
