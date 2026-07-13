# Static Prerendering And Hydration Plan

Date: 2026-07-13

Branch: `work/prerendering`

Related tracker items: `DEBT-32`, `DEBT-33`, `DEBT-8`, `DEBT-27`, `LAUNCH-3`

## Status And Review Outcome

This plan has been technically reviewed against the current Vite, React, React Router, route-generation, analytics, form, timezone, test, and deployment code.

The broad direction remains correct: use build-time static prerendering and React hydration without migrating frameworks or introducing request-time SSR. Implementation must not begin with route rendering alone, however. Render-time determinism, the production server-bundle pipeline, partial-rollout boot behaviour, and the special 404 path must be established first or the migration can produce hydration mismatches that only appear after deployment, a daylight-saving transition, or an unknown-route fallback.

## Problem

The public site is a Vite/React app that currently builds route-specific HTML files with generated metadata, sitemap, robots output, and a minimal static H1/description shell. That shell gives simple non-JavaScript SEO tools something to read, but it is not the real rendered page.

In the first HTML response, crawlers and tools that do not run JavaScript cannot currently see the full page body, header navigation links, footer links, contextual internal links, or form structure. Google can render JavaScript, but not every crawler, preview tool, scanner, or indexing system reliably does so.

The shell also creates duplicate content ownership. Route H1 values live in `src/data/routeMetadata.json` for the shell while the real page headings live in React page components. That is useful as a temporary mitigation, but it can drift and should not become the long-term rendering model.

## Broad Direction

Keep the site static. Do not migrate to request-time SSR, a CMS, a new framework, or a broader redesign for this work.

The intended direction is build-time static prerendering:

- render the existing React public route tree during `npm run build`
- write real route-specific page markup into each generated public HTML file
- keep generated route metadata, sitemap, robots, redirects, clean URLs, and the app-powered 404 behaviour aligned
- hydrate generated route markup in the browser instead of replacing it
- preserve current public copy, routes, layout, visual design, enquiry form behaviour, analytics behaviour, and serverless `/api/enquiry` behaviour
- retain a deliberate client-render fallback for development, mismatched hosting fallbacks, and the special 404 artifact

Visitors and crawlers should receive meaningful HTML immediately, while React still activates client-side routing, mobile navigation, form state, focus behaviour, analytics route tracking, FAQs, and other browser interactions.

## Pre-Start Decisions

The following decisions are part of this plan, not open implementation questions. Record any reason for changing them before code work proceeds.

### Decision 1 - Use A Vite-Built Production Render Bundle

Use Vite's SSR build mode to compile a Node-compatible render entry. Do not call TSX directly from the current Node script, use a standalone TypeScript emit path, or depend on a Vite development server during the production build.

Expected build shape:

1. validate environment configuration
2. run TypeScript checks
3. create the normal client build in `dist`
4. create a Vite SSR build for `src/entry-server.tsx` in a disposable directory outside `dist`, such as `.prerender/server`
5. import the generated server bundle from the prerender script
6. render and write route HTML, metadata, sitemap, robots, and `404.html`

The server build must not empty, overwrite, or become part of the deployable client `dist` output. Disable unnecessary public-asset copying for the server build if Vite would otherwise duplicate assets. Add the disposable directory to `.gitignore` and ensure repeated builds cannot consume a stale render bundle.

An SSR manifest is not required for the first implementation because public route components are currently synchronously imported and the client HTML already owns the app entry and CSS asset links. Reassess this if public routes later become code-split.

### Decision 2 - Use One Shared Route Tree With Two Router Wrappers

Extract an environment-neutral application/route boundary from `App.tsx`.

- The browser wrapper uses `BrowserRouter`.
- The static render wrapper uses React Router's `StaticRouter` for a requested path.
- Public route components, layout, redirects, not-found routing, and route order remain defined once.
- Development-only routes remain excluded from production client and server builds through the existing production environment conditions.

Do not create a duplicate prerender-only component route map. An explicit list of paths to generate may remain in the build tooling because generation policy, metadata policy, navigation, and route component definitions do not all share the same data shape.

### Decision 3 - Keep Publication Facts Static And Seed DST Content From The Build

Use one narrow, serializable build timestamp rather than a site-wide render snapshot or serialized timezone-note payload. Store that ISO timestamp on the generated root, pass it through the shared app boundary, and use it for both the server and browser's initial timezone calculations.

Use the narrower solution appropriate to the current UI:

- Keep the footer copyright notice at the fixed website publication year, `2026`. It is a publication notice, not a live clock.
- Treat `Mon to Fri, 9.30am to 5.00pm AWST` as stable business information rather than recalculating it from the current date.
- Render the DST-sensitive interstate comparison notes through a small component whose server and initial browser render are derived from the same build timestamp.
- After hydration, calculate the current interstate notes once and replace the build-time values only if daylight-saving differences have changed since deployment. A redeploy refreshes the useful no-JavaScript/build-time values.
- Move enquiry-form timezone-option calculation away from module evaluation. The timezone select is currently conditional and absent from the initial form tree, so current browser values can be calculated when that field is needed without affecting hydration.

If a timezone select later becomes visible in the initial tree, render the same stable placeholder option on the server and the browser's first render, then populate current options after hydration.

Do not create a separate nested React root for this small client-enhanced region. Keep it inside the normal application tree with identical server/initial state. Do not use broad `suppressHydrationWarning` attributes to hide differences. The future static render entry must receive the exact timestamp written to `data-prerendered-at`.

### Decision 4 - Mark The Generated Route And Select Hydration Explicitly

Generated React roots must carry an explicit marker containing their normalized route path, for example:

```html
<div id="root" data-render-mode="prerendered" data-prerendered-path="/contact">
```

The browser entry hydrates only when:

- the root is marked as genuinely prerendered React markup, and
- the normalized `data-prerendered-path` matches `window.location.pathname`

Otherwise it uses `createRoot` and client-renders the current browser route. This protects:

- normal Vite development, where the root is empty
- the staged rollout, while some routes still have temporary shells
- SPA-style hosts or local preview servers that return prerendered Home HTML for an unknown URL
- the controlled `404.html` fallback
- emergency or stale artifact mismatches

Do not choose hydration based only on `root.hasChildNodes()`: the temporary fallback shell is non-empty but is not valid React route markup.

### Decision 5 - Keep `404.html` As A Controlled Special Case

Do not hydrate a route rendered with static location `/404.html` when that artifact may be served at an arbitrary browser location such as `/missing-page`. `NotFound` displays the requested pathname, so those trees are intentionally different.

For this migration:

- preserve a useful generic, noindex static 404 fallback
- mark it as fallback rather than hydratable route markup
- use `createRoot` to activate the actual browser pathname
- keep `404.html` metadata, favicon, asset, and app-powered behaviour tests
- exclude the 404 artifact from the acceptance statement that all generated public route markup hydrates

A later task may make the initial NotFound tree pathname-independent and populate the requested path after hydration. That is not required for the public-route SEO migration.

### Decision 6 - Retire Duplicate Public Route H1 Metadata

After every metadata-backed public route has real component-rendered HTML, remove the temporary static shell path and remove `h1` fields from `routeMetadata.json` and its TypeScript contract unless a separate documented consumer genuinely requires them.

Tests should assert one meaningful, non-empty component-rendered H1 and stable route structure. They should not preserve duplicate heading ownership solely to compare page copy against a second metadata value.

The narrow generic 404 fallback may keep its script-owned H1 and description because it is a controlled build artifact rather than duplicated public page content.

### Decision 7 - Make Hydration Failures Observable In Production QA

Pass an `onRecoverableError` handler to `hydrateRoot` that makes recoverable hydration errors observable to the production-preview test harness. Keep the existing browser console and failed-request diagnostics, but do not assume React will always surface every production hydration recovery through the default console path.

Raw HTML tests should use stable structural contracts and a small number of route-specific content markers, not complete copy snapshots.

## Acceptance Contract

### Generated Public HTML

Every metadata-backed public route must:

- contain full header, route-specific main, and footer component markup in the first response
- contain real `<a href="...">` header, footer, and contextual navigation links
- contain meaningful route content beyond an H1 and metadata description
- contain exactly one main landmark and one meaningful H1
- retain the expected title, description, canonical, Open Graph, Twitter, favicon, theme, and robots output
- preserve sitemap inclusion only for approved indexable routes
- preserve `noindex, nofollow` and sitemap exclusion for draft inclusion child routes

### Hydrated Browser Behaviour

Every generated public route must:

- hydrate without recoverable hydration errors, mismatch warnings, duplicate markup, or console errors
- preserve its current visual layout without a shell-to-page flash
- retain client-side navigation, mobile menu, FAQs/tabs, focus behaviour, and form behaviour
- preserve analytics route tracking when enabled through the analytics QA harness
- preserve one visible main landmark and the existing accessibility contract

### Fallback Behaviour

- Vite development must continue to client-render an empty root.
- A generated route/path marker mismatch must client-render the browser path without attempting hydration.
- `404.html` must remain generic, noindex, asset-complete, and app-powered.
- Unknown routes must show the correct browser pathname after React starts without hydration warnings.

### Regression Coverage

- Tests fail if generated public HTML returns to an empty app shell or the temporary public H1 shell.
- Tests exercise production-preview hydration, not only development rendering.
- Tests prove that DST-sensitive content is absent or stable during initial hydration and is populated safely afterward.
- At least the four indexable routes receive a no-JavaScript browser check in addition to raw-response assertions.

## Implementation Plan

### Phase 1 - Capture The Baseline And Audit Render Safety

Before changing the rendering boundary:

- run the current build and focused public-site QA
- record current generated file paths and root shell markers
- confirm the current browser diagnostics are clean
- audit all production-rendered components for browser globals, layout reads, nondeterministic values, locale-sensitive formatting, random values, generated IDs, portals, and render-time side effects

Known initial audit results:

- `useDocumentMetadata`, `ScrollToTop`, `Layout` event handling, NotFound robots handling, and enquiry focus/fetch behaviour use browser APIs inside effects or handlers and are generally server-render safe
- `SiteAnalytics` guards hostname access and should render no HTML on the server, but analytics-enabled hydration still requires its existing QA harness
- `FaqSection` and `BroadTabPanel` use `useId`; they require the server and initial client trees to remain identical
- the copyright year is now a fixed `2026` publication notice
- the conditional enquiry timezone options are absent from the initial rendered form tree and therefore do not currently create a hydration mismatch
- the visible Contact timezone comparison notes remain DST-sensitive and must be client-enhanced after hydration

Do not update current-scope documentation during this baseline phase.

#### Notes

- Status: Completed 2026-07-13.
- Agent notes:
  - Baseline captured from commit `ac45474` using Node `v24.14.1`, npm `11.11.0`, and Vite `8.0.8`.
  - `npm run build` passed and generated metadata/shell HTML for seven public routes, plus `404.html`, `sitemap.xml`, and `robots.txt`.
  - Every metadata-backed route currently has a top-level `.html` artifact and, except Home, a corresponding nested `index.html` artifact. Each observed pair has the same byte size at this baseline.
  - Raw generated route roots contain only the temporary `main`/H1/description shell. They contain no component-rendered header, footer, navigation, or route body. Generated public HTML sizes are approximately 3.0-3.5 KB before the shared client assets load.
  - The initial `ac45474` baseline exposed a pre-existing Home H1 drift in both browser projects: generated metadata expected `Online counselling across Australia`, while the hydrated component H1 was `Counselling and Psychotherapy`. This confirmed the duplicate-content risk without indicating a hydration or browser runtime error.
  - After aligning `work/prerendering` with the metadata fix from `master` (`2a779c7`), `npm run qa:site` completed cleanly with 140 passing tests and 6 expected analytics skips. The raw shell and hydrated Home component now both use `Counselling and Psychotherapy`.
  - Independent browser verification of the aligned production preview passed: Home loaded meaningful content, exposed one main landmark, showed no Vite overlay, and produced no page errors or console messages. The annotated visual baseline showed the expected header, hero, portrait, content sections, navigation, and footer.
  - Browser globals in `useDocumentMetadata`, `ScrollToTop`, Layout menu handling, NotFound robots handling, enquiry submission/focus behaviour, and analytics injection are confined to effects, handlers, or explicit `typeof window` guards.
  - `SiteAnalytics` is server-safe at the markup boundary: the server hostname guard returns `null`, and the enabled analytics components also return no DOM while installing scripts through effects.
  - `FaqSection` and `BroadTabPanel` use `useId`; their IDs are safe only while the static and browser trees retain identical order and structure. Their remaining browser access occurs in effects, ref commits, or keyboard handlers.
  - `FaqSchema` emits deterministic JSON-LD from static page data and does not require a browser API during render.
  - The fixed `2026` copyright publication notice is deterministic. The permanent Perth hours can be made static. Visible Contact timezone comparison notes remain the only confirmed date-sensitive initial DOM. Conditional enquiry timezone options are calculated at module evaluation but are not present in the initial form tree.
  - `NotFound` derives visible content from the active pathname, confirming that a `/404.html` build location cannot be hydrated safely when the artifact is served for a different missing browser path.
  - Production `import.meta.env.DEV` branches exclude development routes consistently from the current client build; the future server bundle must use the same production mode.
  - Phase 1 changed no shipped rendering behaviour. Current-scope and task-log documents therefore remain unchanged.

### Phase 2 - Isolate DST-Sensitive Client Enhancement

Keep the already-static copyright publication year and refactor the remaining timezone behaviour:

- make the primary Perth hours stable content rather than date-derived output
- add a focused Contact comparison-notes component whose initial state is derived from the generated build timestamp on both server and browser
- populate current interstate comparison notes once after hydration, retaining the prerendered values when they are still current
- move enquiry timezone-option calculation away from the module-level content constant and calculate it only when the conditional field needs current browser values

Add focused coverage proving:

- dates on both sides of Australian daylight-saving transitions produce the expected distinct comparison data
- server rendering and the browser's initial render expose the same Contact notes state
- the post-hydration update introduces the current notes without console errors or repeated updates
- the conditional timezone select still receives current options when opened

Do not expand the single serialized build timestamp into a general render provider or larger document payload unless a later phase identifies another initial-render value that genuinely requires it.

#### Notes

- Status: Complete.
- Agent notes:
  - The generated root now carries one ISO `data-prerendered-at` value shared by every route artifact and `404.html` in a build.
  - `main.tsx` validates that seed, falls back to the current browser time for development or legacy shells, and passes the serializable value through `App` to Contact. Phase 4 must pass the same value into the future server render.
  - Contact's permanent hours are literal AWST business information. Its page-scoped comparison component initially derives notes from the build seed, then performs one current-time comparison and updates only when the note set differs.
  - Enquiry timezone options no longer evaluate in the module-level content object. They are calculated only while the consult-request fields are active.
  - Focused browser coverage fixes the clock on both sides of Australian daylight-saving behaviour, verifies retained and refreshed note states, verifies conditional current timezone options, and checks the shared generated timestamp contract.

### Phase 3 - Create The Shared App And Router Boundaries

Refactor the current application into:

- a shared route/application tree
- a browser entry wrapper using `BrowserRouter`
- a static render wrapper using `StaticRouter`

Keep `React.StrictMode` in a shared, intentionally equivalent position so the server and browser trees do not drift. Preserve production exclusion of development-only routes.

Add a small route-render smoke test before changing generated HTML if that can be done without introducing a second throwaway build path.

#### Notes

- Status: Complete.
- Agent notes:
  - `App.tsx` remains the single route/application tree and continues to own layout, redirects, not-found routing, analytics, development-route gating, and the `initialRenderAt` flow.
  - `BrowserApp` and `StaticApp` wrap that same tree with `BrowserRouter` and `StaticRouter` respectively. Both use the shared `AppRoot`, which keeps `React.StrictMode` in the same outer position around the router.
  - `StaticApp` accepts only `location` and `initialRenderAt`; it owns no rendering, metadata, output-path, or generation policy.
  - `main.tsx` now reads the generated timestamp and mounts `BrowserApp`. Generated HTML remains on the existing temporary static-shell path and the browser still uses `createRoot` until Phase 5.
  - Direct component-render smoke coverage remains deferred to Phase 4 because the server bundle introduced there provides the first durable execution path without a throwaway TSX runner or new test dependency.

### Phase 4 - Add The Vite Server Bundle And Static Render Entry

Add `src/entry-server.tsx` exporting a function shaped approximately as:

```ts
renderRoute(pathname): string
```

The entry should use `react-dom/server` and React Router's `StaticRouter`. It must not own head metadata, output paths, sitemap policy, redirects, or file writes.

Add the Vite server-build configuration and package scripts needed to produce the disposable server bundle. Keep client assets in `dist` and server artifacts outside it.

Update the prerender script to import the built render entry. Use an explicit HTML outlet/root replacement and a replacement callback when injecting React HTML so replacement-string tokens in rendered content cannot be interpreted by `String.replace`.

#### Notes

- Status: Not started.
- Agent notes:

### Phase 5 - Complete A Home Vertical Slice Including Hydration

Home is the first vertical slice because it is indexable, SEO-important, visually representative, and does not contain the Contact page's date-sensitive form content.

This phase must include both server rendering and the client boot decision; Home is not considered proven if `createRoot` still replaces its generated markup.

Implement:

- real Home component markup in `dist/index.html`
- the explicit prerendered route/path marker
- client `hydrateRoot` for a matching Home artifact
- `createRoot` fallback for empty, legacy-shell, 404, and path-mismatched roots
- observable recoverable hydration errors

Acceptance checks:

- `dist/index.html` contains real Home header, main sections, internal links, and footer
- it does not contain the temporary public static-shell marker
- browser hydration produces no console or recoverable errors
- Home layout and interactions remain visually unchanged
- navigating from Home to another route still works during the partial rollout
- navigating directly to an unknown route under Vite preview does not attempt to hydrate Home markup
- metadata, sitemap, robots, redirect, and 404 artifact checks remain intact

Do not remove the fallback shell from unconverted public routes yet.

#### Notes

- Status: Not started.
- Agent notes:

### Phase 6 - Expand Through Stable Public Routes

After Home passes, convert the simpler public routes in this order:

1. `/working-with-joel`
2. `/inclusion`
3. `/inclusion/kink-bdsm`
4. `/inclusion/enm-polyamory`
5. `/inclusion/lgbtqia`

For every route, verify both clean output forms currently produced by the build, such as `/inclusion.html` and `/inclusion/index.html`, carry the correct route marker and equivalent component markup.

The draft inclusion child routes must remain directly reviewable, absent from production navigation and sitemap output, and marked `noindex, nofollow`.

#### Notes

- Status: Not started.
- Agent notes:

### Phase 7 - Convert Contact With Deterministic Data

Convert `/contact` only after the DST-sensitive client enhancement and simpler routes are proven.

Acceptance checks must cover:

- permanent Perth business hours are present in raw HTML
- DST-sensitive comparison notes have identical server and initial browser state
- current comparison notes appear after hydration without console errors
- conditional timezone options are current when the visitor reveals that form field
- the client enhancement does not reset form state
- enquiry-type and booking-type conditional fields still work
- form success focus behaviour remains intact
- the form remains masked for Clarity
- submission still uses the unchanged `/api/enquiry` contract

Run timezone tests with fixed dates on both sides of Australian daylight-saving transitions, not only the current date.

#### Notes

- Status: Not started.
- Agent notes:

### Phase 8 - Finalize The 404 And Hosting Fallback Contract

Keep `404.html` on the controlled fallback path defined in Pre-Start Decision 5.

Verify separately:

- direct `/404.html` artifact metadata and content
- a browser visit to an unknown route under local preview
- the canonical deployed host's unknown-route response after deployment, because Vite preview and Vercel may not select fallback artifacts identically
- the requested pathname shown by the activated NotFound component
- no hydration attempt occurs when the served artifact's route marker does not match the browser pathname

Do not broaden this phase into a hosting or routing redesign unless live verification exposes a real deployment fault.

#### Notes

- Status: Not started.
- Agent notes:

### Phase 9 - Retire The Temporary Public H1 Shell

Once every metadata-backed public route has real rendered component markup:

- remove `getStaticRouteShell` and the public static-shell injection path
- remove public shell markers and shell-only regex replacement logic
- remove route `h1` metadata and associated types if no non-shell consumer remains
- update tests to assert real component markup and one meaningful H1
- retain only the documented narrow generic 404 fallback path

Resolve `DEBT-33` only after tests prove no public route can regress to an empty root without failure.

#### Notes

- Status: Not started.
- Agent notes:

### Phase 10 - Strengthen Raw HTML, No-JavaScript, And Hydration Tests

Add or update focused coverage for:

- full raw generated route markup, using stable structural selectors/markers and limited route-specific content
- header, footer, and contextual `<a href>` links in raw HTML
- exactly one main landmark and one meaningful H1
- matching route markers across `.html` and `/index.html` outputs
- sitemap inclusion only for approved indexable routes
- draft route `noindex, nofollow` metadata
- the special 404 fallback and unknown-path client activation
- production hydration recoverable errors and console diagnostics
- DST-sensitive Contact-note client enhancement and conditional form timezone options
- four indexable routes with JavaScript disabled
- mobile navigation, FAQs/tabs, client navigation, Contact form, accessibility, and analytics behaviour after hydration

Keep assertions focused on rendering guarantees rather than broad copy snapshots.

#### Notes

- Status: Not started.
- Agent notes:

### Phase 11 - Run Verification Gates

Run the smallest relevant checks after each phase, then the broader gates after all routes are converted.

Expected gates:

- TypeScript and focused timezone/render tests during refactoring
- `npm run build`
- `npm run qa:site`
- `npm run qa`
- `npm run qa:analytics` when the hydrated route tree or analytics mounting changes
- browser visual verification on desktop and mobile after Home, Contact, and the complete route set
- canonical-domain unknown-route smoke verification after deployment

Inspect generated source directly as part of verification. A successful build alone does not prove that meaningful HTML was emitted or hydrated.

#### Notes

- Status: Not started.
- Agent notes:

### Phase 12 - Update Project Memory

When implementation changes shipped behaviour:

- update `docs/project/current-scope.md` to describe full public-route static prerendering and hydration
- update `docs/project/project-debt.md` to resolve `DEBT-32`, resolve the public-shell portion of `DEBT-33`, and document the deliberate 404 exception
- update `DEBT-8` notes if route-generation parity coverage changes
- update `DEBT-27` only if metadata ownership changes materially
- update `docs/project/launch-readiness.md` with new SEO/rendering evidence
- add a `docs/project/task-log.md` entry for the completed rendering migration as a durable project milestone

Do not update current-scope or close debt for a Home-only prototype that has not changed the complete shipped rendering contract.

#### Notes

- Status: Not started.
- Agent notes:

## Non-Goals

- Do not migrate the site to request-time SSR.
- Do not migrate frameworks.
- Do not introduce a CMS.
- Do not redesign public pages.
- Do not rewrite public copy.
- Do not change public routes unless required for static rendering and documented.
- Do not change the enquiry API contract unless the migration exposes a real bug that requires a separately explained fix.
- Do not add draft inclusion child routes to production navigation or the sitemap.
- Do not solve runtime head-metadata consolidation unless the rendering boundary requires a small compatible adjustment.
- Do not make the NotFound page fully hydratable at arbitrary browser paths as part of the public-route SEO migration.

## Completion Definition

This work is complete when:

- every metadata-backed public route ships real component-rendered first-response HTML
- matching generated routes hydrate without mismatches or recoverable hydration errors
- development, unknown-path, stale/mismatched artifact, and 404 cases take the deliberate client-render fallback path
- publication facts are static and DST-sensitive content is safely client-enhanced after hydration
- temporary public H1 shell generation and duplicate public H1 metadata are removed
- metadata, sitemap, robots, redirects, clean URLs, analytics, accessibility, and enquiry behaviour remain correct
- raw HTML, no-JavaScript, production hydration, and browser interaction tests pass
- the relevant project scope, debt, launch-readiness, and task-log documents reflect the final shipped state
