# Current System

This is the agent's working map of the Vive Counselling application: what it does, how its parts connect, which boundaries affect changes, and where to investigate further. Read the orientation first, then the sections relevant to the task. Detail belongs here when it helps an incoming agent understand, change, or verify the system.

This document describes the current repository implementation and deployment model. Source, configuration, tests, and generated output settle exact implementation questions. A checked-out feature is not proof that it has reached Production; environment-specific observations below are dated and must be rechecked when they affect a release.

[AGENTS.md](../../AGENTS.md) owns working rules and task authorization. [Practice context](practice-context.md) provides background facts about Vive and Joel; [writing direction](writing-direction.md) owns public-copy policy. The [project map](README.md) routes other documentation. This guide does not establish public wording, visual direction, or reusable design-system API.

After [orientation](#orientation), use the [implementation map](#find-the-relevant-implementation), [routes](#surfaces-and-routes), [rendering](#rendering-routing-and-discoverability), [enquiries](#enquiries-and-contact), [articles](#articles-and-publishing), [analytics](#analytics-and-data-meaning), [runtime/configuration](#runtime-configuration-and-deployment), or [local verification](#working-locally-and-verifying-changes) section.

## Orientation

Vive is a public counselling website with an enquiry service, code-managed articles, and a private reporting tool for its owner. Visitors can learn about the practice, read articles and support information, and contact Joel. Appointment and consultation requests are enquiries that Joel follows up; the application does not reserve appointments, take payments, or manage counselling records.

The application uses React, React Router, TypeScript, and Vite. Vercel serves generated public HTML and runs the TypeScript handlers in `api/`. Resend delivers enquiry email. A separate first-party analytics pipeline writes to Neon/Postgres and supplies the private `/analytics` reports. GA4 and Microsoft Clarity are additional, independently configured integrations; they do not supply those reports.

There are three distinct application surfaces:

| Surface | Availability | Purpose |
| --- | --- | --- |
| Public website | Local development and deployed builds | Service information, articles, contact and fees, crisis-support resources, privacy information. |
| Private analytics | Included in deployed builds; protected by Vercel middleware | One owner's traffic, page, paid-keyword, enquiry, and visitor-exclusion reporting. Its UI can render locally, but local Vite supplies neither the reporting API nor its authentication boundary. |
| Development tools | Vite development mode only | Local article editing, a Markdown document viewer, design-system inspection, and the Codex/Opus test beds. These routes and their Dev navigation are absent from built previews and Production. |

The main flows are:

```text
Page source + route/article metadata -> build-time rendering -> HTML/assets -> browser hydration
Contact form -> /api/enquiry -> Resend -> Joel's email
Browser observations -> visit/event/engagement APIs -> Neon -> protected reporting API -> analytics UI
Local article editor -> Vite-only write endpoint -> article source file -> next build
```

Useful boundaries to know before starting:

- Public content and the native enquiry form are present in generated HTML before JavaScript runs. The server render happens during the build; this is not a request-time React rendering server.
- `npm run dev` serves the UI and the local article-editor endpoint. `npm run preview` serves built output. Neither command runs the Vercel `api/` handlers, routing middleware, production redirects, or cron jobs.
- There is no local analytics database. Preview and Production use separate databases, and database migrations are a separate operation from builds and deployments.
- Enquiry delivery does not depend on successful analytics recording. A working UI, a successful local test, or a ready deployment alone does not verify email delivery or live database behaviour.
- Public page content lives in source. The local article editor changes existing article bodies and references; it is not a deployed CMS or a draft-publishing system.

## Find The Relevant Implementation

These are investigation entry points, not an exhaustive file inventory. Paths in code spans are relative to the repository root.

| Concern | Start here | What it owns |
| --- | --- | --- |
| Application and route composition | [src/App.tsx](../../src/App.tsx), [src/data/routes.ts](../../src/data/routes.ts) | Route components, public/private/dev separation, route constants, browser aliases, and the special Fees tracking path. |
| Browser activation and build-time rendering | [src/main.tsx](../../src/main.tsx), [src/BrowserApp.tsx](../../src/BrowserApp.tsx), [src/StaticApp.tsx](../../src/StaticApp.tsx), [prerender script](../../scripts/prerender-route-metadata.mjs) | Hydration or client rendering, shared app composition, generated route documents and validation. |
| Public pages and navigation | [src/pages/](../../src/pages), [Layout.tsx](../../src/components/Layout.tsx), [src/data/site.ts](../../src/data/site.ts) | Page content, shared header/footer, navigation data and social destinations. |
| Metadata and discoverability | [routeMetadata.json](../../src/data/routeMetadata.json), [routeMetadata.ts](../../src/data/routeMetadata.ts), [structured-data generator](../../scripts/route-structured-data.mjs) | Core page and business metadata, article metadata composition, canonical/social tags, JSON-LD and sitemap inputs. |
| Contact and email | [Contact.tsx](../../src/pages/Contact.tsx), [enquiryContract.ts](../../src/data/enquiryContract.ts), [api/enquiry.ts](../../api/enquiry.ts), [src/server/enquiry/](../../src/server/enquiry) | UI, shared options/limits, request validation, native/JSON responses, email construction and delivery. |
| Articles | [manifest.ts](../../src/content/articles/manifest.ts), [articles.ts](../../src/content/articles/articles.ts), [article templates](../../src/content/articles/articleTemplates), [article-publishing.md](article-publishing.md) | Publication metadata, typed content pairing, Markdown bodies/references, and publishing procedure. |
| First-party collection | [VisitRecorder.tsx](../../src/components/VisitRecorder.tsx), [visitSession.ts](../../src/utils/visitSession.ts), [visitEventContract.ts](../../src/data/visitEventContract.ts) | Page observation, browser identity/session lifecycle, attribution and allowed events; follow their imports into the write APIs and repositories. |
| Private reporting | [src/pages/analytics/](../../src/pages/analytics), [analyticsContract.ts](../../src/data/analyticsContract.ts), [src/server/reporting/](../../src/server/reporting) | Report controls and summaries, runtime response contracts, request selection, SQL and exclusions. |
| Storage and environment boundaries | [database/README.md](../../database/README.md), [database migrations](../../database/migrations), [middleware.ts](../../middleware.ts), [vercel.json](../../vercel.json) | Migration procedure/schema, private authentication, deployment routing, function packaging and retention schedule. |
| Local tools and verification | [vite.config.ts](../../vite.config.ts), [articleEditorPlugin.ts](../../scripts/articleEditorPlugin.ts), [package.json](../../package.json), [visual-verification.md](visual-verification.md) | Development server integration, local article writes, executable check commands and the supported IDE browser workflow. |

`api/` contains HTTP entry points. Domain validation, delivery and database work live under `src/server/`; browser/server contracts live under `src/data/`. Although server code sits beneath `src/`, it is server-owned: public code should consume the shared contracts rather than import database or delivery modules. Handlers and repositories expose dependencies that direct tests can replace without real email or database services.

## Surfaces And Routes

### Public website

| Routes | Functional role |
| --- | --- |
| `/`, `/working-with-joel` | Introduce the practice, practitioner and approach, and help visitors judge fit. |
| `/inclusive-counselling` | Hub for the three specialist/inclusion routes. |
| `/kink-bdsm-counselling`, `/polyamory-enm-counselling`, `/lgbtqia-affirming-counselling` | Dedicated service information for each topic. |
| `/articles`, `/articles/:slug` | Publication index and individual published articles; slugs come from the article manifest. |
| `/contact` | Direct phone/email, session fees, and appointment, consultation or general enquiries. |
| `/crisis-support` | Australian urgent-support resources, official service links and a visible service-check date. Vive is not the crisis-response service. |
| `/privacy-policy` | Public explanation of website tracking, enquiry and counselling information handling. |
| Unknown paths | Not Found, with a generated `404.html` fallback for hosting. |

Public and development pages use the shared layout; private reports render outside the public navigation/footer. The ordinary public information is authored in page components. Contact details and success/failure messages are shared through [src/data/enquiry.ts](../../src/data/enquiry.ts). Fees and service statements also appear in page/closing-invitation copy and structured metadata, so a change to an offer needs a consumer search rather than assuming one central pricing record.

`/about`, `/fees`, and `/inclusion` redirect to `/working-with-joel`, `/contact`, and `/inclusive-counselling`. The former article slug `kink-affirming-therapy` redirects to `kink-aware-therapy`. Browser aliases and Vercel redirects are maintained in different sources and must agree.

Fees-labelled navigation and footer links deliberately open `/contact` while passing router state that records a virtual `/fees` page view. The navigation's active state follows that tracked path. A direct Contact visit remains `/contact`; a plain `/fees` redirect does not itself carry the navigation state. Preserve this distinction when changing navigation or attribution.

### Private reporting

| Route | What the owner can do |
| --- | --- |
| `/analytics` | Inspect a Perth calendar day's traffic and visit journeys, including sources, activity and diagnostic context. |
| `/analytics/pages` | Compare routes by views, visits and active time over a selected date range. |
| `/analytics/keywords` | Compare paid visits by stored matched keyword, including coverage, engagement, returning visits and enquiry attribution. |
| `/analytics/enquiries` | Inspect monthly successful form sends, phone-click enquiry signals and failed form outcomes. |
| `/analytics/excluded` | Review and restore manually excluded visitors. Exclusion actions are also available while inspecting visits. |

Daily visits, monthly enquiry entries and exclusions can open the visitor's complete retained history. Reports support date selection, refresh/retry and empty/error states. There is no client-management workflow, enquiry inbox, user/role administration or account-registration system behind these views.

### Development tools

- `/article-editor` edits existing article Markdown and structured references. Saving sends `PUT /__dev/article-editor/:slug` to the Vite plugin, which validates an allowlisted slug and rewrites that article's source template. The write endpoint rejects non-localhost Host values and exists only on the Vite development server. Metadata and article registration remain source edits.
- `/documents` renders selected Markdown libraries from `docs/`. Its import globs in `src/pages/dev/Documents.tsx` decide what appears; it is not a complete repository browser or document editor.
- `/codex-tb` and `/opus-tb` are development-only places for page experiments. Their current contents are not public routes or approved future page implementations.
- `/design-system` and its catalogue subroutes provide development inspection; their authority and maintenance are owned by the separate [design-system documentation](../design-system/README.md).

## Rendering, Routing And Discoverability

### From source to a browser document

`npm run build` validates the configured third-party analytics IDs, typechecks the application/API source, builds browser assets into `dist/`, builds a disposable server bundle into `.prerender/server/`, then runs `scripts/prerender-route-metadata.mjs`. The server bundle is a build tool, not a separately deployed application service.

`BrowserApp` uses `BrowserRouter`; `StaticApp` uses `StaticRouter`. Both compose the same `App` within the shared Strict Mode boundary. Article pages are lazy-loaded in the browser and supplied synchronously for build-time rendering so their content is present in the first response.

The prerender script combines core metadata with article-derived routes, renders public page markup, verifies route contracts, and writes page HTML, canonical/social/structured metadata, `sitemap.xml`, `robots.txt`, private analytics shells and `404.html`. `dist/` and `.prerender/` are generated and ignored by Git; changes belong in their source inputs.

The browser hydrates only when the root's prerender marker, normalized route and build timestamp are valid and agree with the requested path. Otherwise it client-renders. The same initial timestamp is passed into the first server and browser renders so time-dependent Contact content agrees; current timezone information can then refresh in the browser. Browser APIs and current-time values introduced during rendering can therefore break more than local development even when the page looks correct there.

Private shells contain no report data. Their content loads through the protected API after browser activation. The generic `404.html` also uses the client-render path rather than attempting to hydrate another public page's markup.

### Route and metadata ownership

A route change can touch several contracts:

- `src/App.tsx` determines which component renders, and `src/data/routes.ts` supplies application route names and public aliases.
- `src/data/routeMetadata.json` supplies core public-page and business metadata. `routeMetadata.ts` adds article-derived metadata for runtime consumers. Article publishing uses its own manifest rather than requiring each article in the core route file.
- `scripts/prerender-route-metadata.mjs` owns public rendering checks and the private-shell route list. The build rejects an unsupported core metadata route.
- `vercel.json` owns HTTP redirects and clean-URL/trailing-slash behaviour. React redirects do not replace hosting redirects.
- Browser route coverage has its own contract inventory under `tests/public-site/`; direct route tests check public constants against metadata.

This means adding a React route alone does not complete a public-route change. Check its first-response HTML, metadata, links, hosting behaviour and appropriate coverage. For article additions, follow [article-publishing.md](article-publishing.md), which describes the manifest/template path through those concerns.

All currently published public content routes are indexable. Private reports and Not Found use no-index metadata; development routes are absent from builds. Canonical origin selection lives in [route-metadata-origin.mjs](../../scripts/route-metadata-origin.mjs): an explicit `SITE_URL` wins, Production otherwise uses the canonical site origin, and a Vercel Preview otherwise uses `VERCEL_URL`. Local builds fall back to the canonical origin. A local canonical pointing to the public site does not prove the page is being served from Production.

The structured-data generator expresses the business/practitioner/services and relevant profile, article, collection, breadcrumb and crisis-support entities. Business metadata and visible claims must agree. A private street address is not part of that public metadata. The Crisis Support check date also feeds structured data and its sitemap date; article publication/revision dates feed article metadata and sitemap entries.

Client navigation updates title, description and robots through `useDocumentMetadata`; canonical/social tags and JSON-LD are generated for the initial document and are not fully replaced by that hook. Direct navigation and in-app navigation are therefore distinct verification cases. The remaining metadata limitation is tracked as `DEBT-27`.

## Enquiries And Contact

The Contact form offers an appointment request, a free 15-minute consultation request, and a general enquiry. All collect name, email and message. Appointment/consultation paths require availability and timezone, and a consultation also requires a mobile number. [enquiryContract.ts](../../src/data/enquiryContract.ts) owns option values and field limits shared by browser and server. [timeZones.ts](../../src/utils/timeZones.ts) owns Australian timezone choices and conversions from Perth business hours.

The complete native form is prerendered with conditional fields explained in their labels. JavaScript progressively shows the relevant fields, submits JSON, prevents duplicate in-flight submission, and focuses the confirmation on success. Without JavaScript the form submits URL-encoded data and receives a standalone HTML success or failure response. Changes must account for both paths.

`POST /api/enquiry` checks request shape and cross-site signals, validates the fields, builds the email server-side, and calls Resend. It accepts JSON and native form posts, rejects unsupported/multipart or oversized requests, and rejects overlong fields rather than silently truncating them. Honeypot submissions receive a success response without email delivery. User-facing delivery failures remain generic; operational diagnostics stay in server logs.

Delivery requires `RESEND_API_KEY` and `ENQUIRY_FROM_EMAIL`. `ENQUIRY_TO_EMAIL` overrides the shared public email destination; when absent, delivery falls back to `enquiryEmail` in `src/data/enquiry.ts`. Preview email is not automatically a sandbox: if a Preview deployment is configured with real delivery credentials and that recipient, submitting a real form can send real mail. Local browser tests intercept the request instead.

The application does not persist enquiry names, email addresses, mobile numbers, availability or message bodies in the analytics database. It sends those details in the email. Optional visit/page-view IDs connect a submission to analytics, where the server records controlled attempt/sent/failed events without the form contents. Those writes run as best-effort background work through Vercel `waitUntil`; their failure does not change the email result. A form can therefore succeed without a corresponding analytics entry, and `enquiry_sent` describes provider-accepted sending rather than confirmed mailbox delivery or a booked session.

## Articles And Publishing

Articles use two connected sources. `src/content/articles/manifest.ts` supplies lightweight publication metadata, slugs, ordering and article-derived route metadata. Each module under `src/content/articles/articleTemplates/` supplies a Markdown body and structured reference list. `articles.ts` pairs the manifest and templates with TypeScript coverage for the required slugs. Shared metadata consumers can use the manifest without importing article bodies into every public route.

`ArticleIndex` lists publications newest first; `ArticlePage` resolves the slug and renders the common publication shell, Markdown and source ledger. A reference stores citation text, a DOI or stable URL, and an optional anchor ID for linking from the body. APA 7 formatting and bibliographic verification are editorial responsibilities, not an automated compliance layer. Unknown article slugs resolve to Not Found. Public media lives under `public/`; there is no article-media upload service.

Every registered article is published and indexable in a deployed build. A future `publishedAt` date does not schedule or hide an article, and there is no draft/sample switch. Adding an article requires its manifest entry and matching template registration; the build then derives its route HTML and sitemap/metadata entries. Local editor saves change source in the working tree, so they still need the normal build and release process. The editor does not create articles, change publication metadata, or publish directly.

Use [article-publishing.md](article-publishing.md) for the exact schema, reference conventions and publishing checks. This workflow currently has no CMS, author login or database-backed content store.

## Analytics And Data Meaning

### Collection and persistence

First-party analytics and GA4/Clarity use separate browser enable flags and host additions. They share hostname-matching utilities, but enabling one pipeline does not enable the other. Both are off unless their enable flag is exactly `true`.

The first-party model has four main records:

| Record | Meaning |
| --- | --- |
| Visitor ID | A random browser identifier persisted in versioned `localStorage` and rotated after 12 calendar months. It is not a person/account ID; clearing storage or using another browser changes identity. There is no separate visitor-profile table. |
| `site_visits` | A session-like journey tied to that visitor, with landing/referrer/ad attribution, timestamps and bounded diagnostic observations. Browser visit state uses `sessionStorage`; a new external arrival, changed tagged attribution or more than 30 minutes' inactivity starts another visit. |
| `site_page_views` | Individual recorded page observations belonging to a visit, including cumulative visible active time. |
| `site_visit_events` | Allowlisted actions/outcomes belonging to a visit and, when available, one of its page views. |

`analytics_excluded_visitors` stores manual reporting exclusions. The SQL view `visit_ledger` derives reporting facts over retained visits, including traffic source and visit order; it is not another independent collection store. [database/migrations/](../../database/migrations) defines the schema and [src/server/visits/repository.ts](../../src/server/visits/repository.ts) owns the shared Neon connection and visit persistence.

The browser captures arrival parameters `gclid`, `ad`, `net`, `kw` and `mt`, plus the initial referrer. A stored matched keyword is ad attribution supplied through that URL, not a retrieved Google search query or keyword-volume measurement. Traffic-source classification is local to the ledger's SQL rules and should not be assumed to match GA4 acquisition categories.

Initial document loads, distinct tracked pathnames and browser-restored documents receive page views. Query-only and hash-only changes do not create additional first-party page views. Paths are normalized for storage; the special Fees intent described above is preserved. GA4 has its own page-view effect, including query-string changes, so the systems need not produce identical totals.

`VisitRecorder`, `visitSession`, `visitEvents`, `pageEngagement` and `visitAnalyticsQueue` coordinate browser observations. Writes are serialized within a document and are best-effort. The write repositories use stable IDs and relationship checks to avoid counting retries twice or attaching a page view to another visit. Engagement updates take a cumulative maximum instead of adding each retry's duration; they count time while the page is visible, not proof of attention or the entire elapsed visit duration. There is no durable browser delivery queue or persisted cross-document causal ordering.

The server derives bounded User-Agent/device context and coarse location from Vercel request headers. Australian location retains a state/territory code; overseas location retains country only; invalid or unavailable location stays unknown. Raw IP, city, postcode and coordinates are not stored in this ledger. BotID Basic supplies bot observations rather than blocking visitors; unavailable classification remains unknown. The WebDriver flag is a separate browser observation, not an equivalent bot verdict.

### Reporting semantics

Dates use `Australia/Perth`. Page and keyword ranges are inclusive and limited to 366 days. The main distinctions are:

- **Daily traffic, Pages and Keywords select visits by visit start date.** Their page/activity totals describe the selected visits' retained journeys; they do not simply count all page-view events that happened between two clock boundaries. Keywords further selects paid visits and keeps visits without keyword data visible in coverage totals.
- **Monthly Enquiries selects enquiry events by occurrence month.** A visit may have started earlier. Successful form sends and Contact-page phone clicks are enquiry signals; failed forms are separate. A phone click proves neither that a call was placed nor that Joel answered. Email/social clicks remain separate outbound actions.
- **Returning means a later retained visit for the browser ID.** It does not establish a returning client or person, and rotation, storage loss and retention affect that interpretation.
- **Exclusion is a reporting filter, not deletion or collection opt-out.** It removes a visitor's past and future visits from ordinary reports while preserving direct retained-history access and allowing restoration.
- **Identified bots are hidden by default; unclassified visits remain included.** The interface can include identified bots. Bot filtering and manual exclusion are separate concepts.

The report API uses a discriminator and complete nested response contracts from `src/data/analyticsContract.ts`. `src/server/reporting/request.ts` parses report selection; `reader.ts` supplies queries and maps database results; page-level reporting code computes relevant display summaries. `useAnalyticsReport.ts` rejects malformed or wrong-type reports and handles cancellation, retry and refresh. A report-shape change must agree across those boundaries.

Reports are based on the visits and outcomes the system actually captured. Browser blocking, disabled collection, failed writes and submissions without visit context make the enquiry view an analytics report rather than an authoritative inbox or total practice-enquiry register.

### Privacy and retention

The entire `/analytics` subtree is excluded from first-party, GA4 and Clarity collection. Direct private visits receive a dedicated no-index shell. If in-app navigation reaches a private report after GA4 or Clarity has initialized, `App.tsx` forces a fresh document before rendering report content so those scripts do not remain active over private data.

Enquiry events accept a small allowlist of properties, and server outcome events cannot be submitted as client event types. The Contact form is masked from Clarity. Full retained referrers, ad identifiers and diagnostics remain private operational data even though the ledger does not store enquiry message contents.

Production retention deletes visits older than 12 months, cascades to their page views/events, and removes exclusion markers with no remaining visits. `vercel.json` schedules `GET /api/visit-retention` daily at 18:15 UTC (02:15 Perth). It uses Bearer `CRON_SECRET` authentication, separate from analytics Basic Authentication. Preview has no scheduled retention run.

### GA4 and Clarity

`SiteAnalytics.tsx` loads the configured providers only on allowed hosts outside private routes. GA4's automatic initial page-view emission is disabled in favour of app-managed page views. Controlled events cover enquiry intent, contact choices, email/Contact-phone clicks and successful leads; failed submissions do not emit the success conversion. Clarity supplies behavioural recording with the form masked. There is no first-party cookie banner or local Clarity Consent API flow, and Vercel Web Analytics is not installed.

## Runtime, Configuration And Deployment

### Environment boundaries

| Environment | What runs and where data goes |
| --- | --- |
| Local Vite development | UI with hot reload and development tools. No Vercel API/middleware/cron emulation and no configured local database. Use direct or mocked tests for those boundaries. |
| Local Vite preview | Built static output without development routes. Useful for first-response/browser checks; API calls still need interception or a separately provided runtime. It is not the Vercel Preview environment. |
| Vercel Preview | Non-production Git deployments with platform functions and middleware, separate Preview credentials and a separate Neon database. Working branches allow isolated review; `staging` is the combined release candidate. |
| Vercel Production | `master` deployment, public canonical domain, Production secrets/database and the scheduled retention job. |

The canonical public origin is `https://vivecounselling.com.au`, with `www` redirected to the apex. The Git/release procedure lives in [AGENTS.md](../../AGENTS.md); inspect the target deployment/commit when verifying remote behaviour rather than equating the current branch with Production.

Vercel middleware protects `/analytics` and `/api/analytics` (including descendants) with HTTP Basic Authentication. Missing credentials fail closed. Private responses use no-store/no-index headers. Authentication is enforced at this platform boundary, not independently inside every reporting handler or React component; direct handler tests and a local Vite page do not exercise it.

`vercel.json` also owns redirects, BotID proxy rewrites, the cron schedule, and serverless packaging. Its `api/**/*.ts` rule includes `src/**` so server-domain imports reach deployed functions. Local UI checks do not verify those platform behaviours.

### HTTP interfaces

| Endpoint | Access and responsibility |
| --- | --- |
| `POST /api/enquiry` | Public enquiry delivery; accepts JSON or native URL-encoded form data and returns the corresponding JSON/HTML response. |
| `POST /api/visit` | Public, write-only visit/page-view collection; validates observation IDs and attribution, adds server diagnostics and BotID observations. |
| `POST /api/page-engagement` | Public, write-only cumulative active-time update for the supplied visitor/visit/page-view relationship. |
| `POST /api/visit-event` | Public, write-only allowlisted client actions. Server-authored enquiry outcomes use the repository from the enquiry handler instead. |
| `GET /api/analytics` | Protected report selection by day, month, visitor or page/keyword date range. Returns a typed report in a `data` envelope. |
| `GET`, `PUT /api/analytics/exclusions` | Protected listing and mutation of visitor exclusion markers. |
| `GET /api/visit-retention` | Bearer-secret-protected deletion of expired analytics data. This GET has a destructive effect; it is not a read-only health check. |

The public collection endpoints validate bounded payloads, reject explicit cross-site signals and return generic errors; successful collection writes return no report data. Their browser IDs and relationship checks support data consistency, not authenticated visitor accounts. The local article-editor endpoint is separate from these deployed APIs and exists only in the Vite plugin described above.

### Configuration ownership

Use the intended environment's configuration; do not place actual secret values in documentation. The relevant names are:

| Configuration | Role |
| --- | --- |
| `RESEND_API_KEY`, `ENQUIRY_FROM_EMAIL`, `ENQUIRY_TO_EMAIL` | Server-side email credentials and delivery destinations. The recipient has the fallback described in Enquiries. |
| `DATABASE_URL` | Server-only Neon connection used by collection, reporting, exclusions and retention. Never expose it through a `VITE_` variable or browser import. |
| `ANALYTICS_USERNAME`, `ANALYTICS_PASSWORD` | Environment-specific private-report Basic Authentication. |
| `CRON_SECRET` | Server-side retention-job authorization. |
| `VITE_VISIT_ANALYTICS_ENABLED`, `VITE_VISIT_ANALYTICS_ALLOWED_HOSTS` | Build-time first-party collection switch and extra allowed hosts. |
| `VITE_VISIT_BOT_DETECTION_ENABLED` | Browser BotID initialization switch; defaults on when visit collection runs unless set to `false`. |
| `VITE_ANALYTICS_ENABLED`, `VITE_ANALYTICS_ALLOWED_HOSTS`, `VITE_GA_MEASUREMENT_ID`, `VITE_CLARITY_PROJECT_ID` | Build-time third-party analytics switch, extra hosts and public provider IDs. |
| `SITE_URL`, Vercel-provided URL/environment values | Generated canonical origin and relevant server request-origin checks. |

Both browser allowlists include the canonical apex and `www` by default. Extra hosts are configured separately for each pipeline; the Preview setup permits Vercel preview hostnames for first-party collection against the Preview database. Do not assume a Preview build has the same collection settings as Production. Client `VITE_` settings are consumed during the build, so changing them requires rebuilt assets.

`.env*` files and `.vercel/` are ignored. The database procedure uses `.env.preview.local` and `.env.production.local` explicitly; Development receives neither database. The build's analytics preflight validates provider-ID formats, not successful Resend delivery, database schema readiness or deployed authentication.

### Database changes and verification

Follow [database/README.md](../../database/README.md) for environment selection and migration commands. Migrations run in filename order and are recorded with checksums in `visit_schema_migrations`; edited applied migrations are rejected. Add a new forward migration for a schema change. `npm run build` and a Git-triggered deployment do not apply migrations.

For code that depends on schema changes, establish the intended environment's schema readiness before deploying that code. Preview migrations affect the shared Preview database used by non-production deployments, so compatibility with other active Preview code matters. Verify database-backed changes through the separate Preview environment and give the owner the exact deployment's `/analytics` URL and focused checks, following `AGENTS.md`. Production is not a development-verification database.

**Recorded release dependency:** the 2026-09-09 migration record says Preview has `0010_add_phone_link_event.sql`, while Production remains at `0009_add_visit_location.sql` until release. This is a retained operational observation, not a fresh database check. Confirm it before releasing phone-event-dependent code; update or remove this note when the difference is resolved. The [dated task entry](task-log.md#2026-09-09---contact-phone-analytics-added) retains the history.

## Working Locally And Verifying Changes

Use the checked-in npm lockfile (`npm ci` when installing dependencies). Node and npm versions are not pinned by the repository; direct Node tests import TypeScript source, so the runtime must support those imports. The executable commands in [package.json](../../package.json) are authoritative. On Windows PowerShell, use `npm.cmd` for the same commands if execution policy blocks the `npm.ps1` launcher; no policy change is needed.

| Command | Purpose and limits |
| --- | --- |
| `npm run dev` | Local Vite development UI, including development routes and the article editor. No API-service verification. |
| `npm run build` | App/API typecheck, client/server bundles and generated-route checks. No live database or email check. |
| `npm run preview` | Serve the most recent built output locally. It does not build first. |
| `npm run check:encoding` | Repository text-encoding check, useful for documentation and copy edits. |
| `npm run typecheck:tests` | Separate strict typecheck for Playwright specs. |
| `npm run test:api` | Direct Node tests for enquiry, collection, reporting, exclusions and retention handlers/repositories with substituted dependencies. |
| `npm run test:scripts` | Direct script/build-contract tests, including routes, metadata, migrations and local tooling. |
| `npm run qa:site` | Encoding and test typechecks, build, then the public-site Playwright suite against local built output. |
| `npm run test:analytics` | Fast API suite plus selected analytics-host, migration and ledger-SQL contracts. |
| `npm run qa:analytics` | Test typecheck and fast analytics tests, followed by builds/browser tests with collection hosts blocked and enabled. Real database behaviour remains outside this command. |
| `npm run qa` | Encoding, test typecheck, all direct script tests, build, API tests and public browser suite. It does not run the separate analytics browser scenarios. |
| `npm run audit:lighthouse` | Build and local Lighthouse reports; no enforced performance budget. |

Public Playwright tests live under `tests/public-site/`; private/collection browser coverage lives in `tests/analytics.spec.ts`. The configured browser project is Chromium, with mobile viewports exercised where relevant. Browser API/provider responses are intercepted for the relevant scenarios, and direct repository tests substitute query results or inspect SQL contracts. These checks establish local behaviour and contract consistency, not deployed email, real SQL execution, Vercel middleware or all-browser coverage.

QA uses managed local preview servers on port 4287 for the public suite and 4288 for analytics. The analytics command rebuilds `dist/` with test collection settings; rerun an ordinary build before treating that output as a normal site build. Commands that rebuild the same output directory should run sequentially.

For ad-hoc browser inspection in the Codex IDE, follow [visual-verification.md](visual-verification.md): repository Playwright with system Chrome and a managed server/browser lifecycle. It is separate from the automated QA browser setup. Changes confined to development pages follow the proportionate verification rule in `AGENTS.md`; the existence of a browser tool does not make every edit a full visual audit.

Known implementation limits worth accounting for during related work:

- Public write endpoints validate requests but have no configured platform rate limit (`DEBT-23` and related analytics pressure); successful validation is not comprehensive abuse protection.
- Visit/event timelines have no persisted cross-document causal order, and private reports are not paginated (`DEBT-39`, `DEBT-40`).
- Runtime canonical/social metadata does not fully follow client navigation (`DEBT-27`).
- Shared navigation and route-focus accessibility remain incomplete; automated axe checks are not a conformance claim (`DEBT-29`, `DEBT-30`).
- Node/package-manager versions and direct JavaScript/script type coverage remain incomplete (`DEBT-16`, `DEBT-9`).

Use [project-debt.md](project-debt.md) for the current evidence and next actions when a limitation is relevant. This list does not select additional work. Functional absences such as booking/payment services, public accounts, a deployed CMS, scheduling and article drafts are current system boundaries, not a backlog of implied features.

## Maintaining This Guide

Update the section that owns a capability, significant behaviour, data flow, runtime boundary, source responsibility or verification method when that understanding changes. Explain the resulting system and the connections an incoming agent needs. Replace superseded explanations instead of appending a change narrative.

Ordinary wording, visual composition, control placement, CSS values and implementation minutiae belong in their source or domain documentation unless they change system understanding. Keep exact field lists, code APIs, publishing procedures and test cases with their authoritative owners and link to them. Record history in the task log, unresolved work in the appropriate tracker, and public-writing direction in its owner documents.

Keep enough detail to make consequential behaviour clear; length is not a target. Date any retained remote-state observation and distinguish it from facts verified in source. Recheck affected links and commands when their owners move. A useful entry helps the next agent orient itself or avoid a mistaken assumption without requiring a second parallel specification of the implementation.
