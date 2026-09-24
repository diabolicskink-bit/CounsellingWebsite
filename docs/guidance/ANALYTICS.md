# Private Analytics

Use this guide for the private dashboard, its reporting UI, and working-branch Preview verification. [AGENTS.md](../../AGENTS.md) owns general permissions; [SYSTEM.md](../reference/SYSTEM.md#analytics-and-data-meaning) explains collection, report meanings, privacy and source ownership.

## Product Boundary

- Treat the entire private analytics surface—`/analytics`, every route beneath it, and its reporting UI—as an owner-only internal product surface, not as part of the public site's visual identity or design system. Do not broaden this surface into a multi-user administration product, generalized dashboard framework, or reusable public-site pattern unless the current task explicitly requests that scope.
- Keep analytics visually independent in direction: the dashboard does not need to look or feel like the public website and may own its CSS, visual tokens, assets, and UI components. This does not require a separate browser entry, isolated bundles, or zero shared global styles or generic foundations. Do not change public presentation merely to accommodate analytics, promote analytics presentation as public design-system API, or use either surface as the default visual direction for the other unless the current task requests it. Nonvisual types, data contracts, domain utilities, and public tracking infrastructure may also be shared when they represent a genuine functional boundary.

## Local Verification

- Routine dashboard browser testing belongs to the owner. Agents may perform focused browser or real-data checks when the task explicitly requests them, or when substantial analytics changes cannot be adequately verified locally and warrant direct verification through a Preview. This covers `/analytics` and every dashboard subroute. There is no local analytics database.
- Use focused local source, type, unit or mocked checks where useful. Prioritize report/data correctness, migrations, API contracts, authentication/privacy boundaries and concrete regressions. Avoid routine dashboard browser assertions, speculative coverage and broad test runs. Local checks do not verify deployed data behaviour.

This policy takes precedence over general browser-review guidance, including skill defaults.

## Preview Verification

- An explicit working-branch Preview request, or substantial analytics work meeting the verification condition above, authorizes committing and pushing the relevant changes for a working-branch Vercel Preview. Routine wording, styling or small changes do not qualify merely because there is no local database.
- For Preview verification, check any required Preview migration using [database/README.md](../../database/README.md), find the deployment for the relevant commit, and wait for it to become ready. Perform the focused checks warranted by the task, or provide the Preview for the owner's checks when that is the request. Use the separate Preview database; never use Production for development verification.
- Report the Preview's exact `/analytics` URL (or relevant dashboard subroute), what was verified and any checks remaining for the owner. Where a Preview is not warranted, report any verification left to the owner. Keep the work on its working branch until the owner directs integration or promotion.

## Public Tracking And Privacy

- Public tracking and shared privacy boundaries are separate from dashboard browser testing: verify changes to collection, attribution or private-route tracking exclusion where affected. Use focused non-browser analytics checks such as `npm run test:analytics` when relevant; `npm run qa:analytics` includes browser scenarios and is not the default for dashboard work. Keep routine private-dashboard cases out of public-site QA.
