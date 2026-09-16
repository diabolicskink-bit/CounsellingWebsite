# Tests

Tests are grouped by how they run, then by the subject they cover.

| Folder | What belongs here | Requirements |
| --- | --- | --- |
| `node/` | Direct function, handler, repository and source/configuration checks. External services are substituted. | Installed project dependencies; no database credentials or running site. |
| `browser/public-site/` | Visitor-facing behaviour in Playwright. | A local site build served at the configured base URL and installed Chrome. |
| `browser/analytics.spec.ts` | Analytics collection, private-route boundaries and the existing report scenario. | The isolated builds managed by `npm run qa:analytics`. |
| `database/` | Reporting SQL executed by PostgreSQL against synthetic fixtures. | The separate Preview database configured in `.env.preview.local`. |

Within `node/`, `analytics/`, `enquiry/` and `visits/` own their domain checks.
`site/` covers article content, routes and metadata; `tooling/` covers local
tools, migrations, deployment configuration and SQL source contracts. The SQL
source checks in `node/tooling/` inspect files; the checks in `database/` execute SQL.

Use `*.test.mjs` for Node and database tests and `*.spec.ts` for Playwright.
Keep names tied to the behaviour or source under test. Keep fixtures and helpers
in their test file unless several files need the same setup.

## Commands

Run commands from the repository root. The scripts in
[package.json](../package.json) own the exact selections.

| Command | Selection |
| --- | --- |
| `npm run test:node` | All local Node tests. |
| `npm run test:api` | The analytics, enquiry and visit domain tests. |
| `npm run test:analytics` | The API/domain tests plus migration and ledger SQL source checks. |
| `npm run typecheck:tests` | Playwright TypeScript checks. |
| `npm run test:e2e` | Public-site browser tests against an already running local build. |
| `npm run qa:site` | Public-site build, static checks and managed browser run. |
| `npm run qa:analytics` | Isolated analytics builds and browser scenarios, preceded by local checks. |
| `npm run test:database` | The opt-in PostgreSQL fixture tests. |
| `npm run qa` | Local Node checks, build and public browser suite; excludes database and analytics browser tests. |

For a focused local check, pass a file or folder glob directly:

```powershell
node --test tests/node/analytics/referrers.test.mjs
node --test "tests/node/site/*.test.mjs"
```

Database tests read Preview's `.env.preview.local` directly, so an ambient
`DATABASE_URL` does not select a different database. Prepare that ignored file
using the [database environment procedure](../database/README.md). Missing
configuration fails the explicit database command; ordinary checks never need it.
The referrer test supplies every report source inside its query and neither reads
nor changes retained visitor data. It checks SQL behaviour, not deployed API
authentication or dashboard presentation.

Test-folder changes can be checked with `npm run typecheck:tests` and
`npx playwright test --list` without launching browsers.
[AGENTS.md](../AGENTS.md#private-analytics) owns when dashboard browser checks are
authorized; the presence of a test is not a requirement to run it.
