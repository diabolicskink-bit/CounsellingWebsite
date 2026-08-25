# Database

Versioned SQL migrations for the first-party visit ledger live in
`database/migrations/` and are applied in filename order. Pull the intended
environment into its matching ignored file before running its migration command:

```powershell
npx vercel env pull .env.production.local --environment=production --yes
npm run db:migrate:production

npx vercel env pull .env.preview.local --environment=preview --yes
npm run db:migrate:preview
```

Do not pull Production into `.env.local` or `.env.preview.local`. Remove the
generated `.env.production.local` file after the migration when continued local
Production access is not required.

The migration command records each filename and checksum in
`visit_schema_migrations`, skips migrations already applied unchanged, and
refuses to continue if an applied migration file has been edited. Checksums use
canonical LF line endings while accepting equivalent legacy LF or CRLF hashes,
so applying from Windows and verifying from Linux does not create false drift.

The application connects to Neon through the server-only `DATABASE_URL`
environment variable. Never prefix this variable with `VITE_` or expose it to
browser code.

Production and Preview use separate Vercel-managed Neon resources. Each
resource and its generated connection variables are scoped only to its matching
Vercel environment; Development receives neither database. Apply migrations to
the database for an environment before deploying code that depends on them
there. Migration `0003` adds nullable BotID verdict and verified-bot identity
fields, `0004` adds visit-linked analytics events, `0005` adds the persistent
visitor exclusion list used by private reports, and `0006` adds bounded
cumulative visible-time seconds to each page view. Migration `0007` adds the
initial bounded user-agent, server-derived device type, and browser-reported
WebDriver flag to each visit. Its reporting and dashboard presentation are
intentionally deferred from the capture-and-storage change.

`visit_ledger` is the read-only reporting view created by migration `0002` and
extended by migration `0003`. It marks the earliest retained visit for an
anonymous browser ID as `new`, marks later retained visits as `returning`,
classifies traffic, adds page-view totals, and exposes the nullable BotID
verdict and verified name/category. The private analytics interfaces read it
through the Basic Authentication-protected `GET /api/analytics` function. The
separately protected `GET|PUT /api/analytics/exclusions` function lists and
updates visitor exclusions; it does not delete visit history.

Repository-owned Neon saved-query templates live in `database/queries/`. The
queries apply explicit ordering and Australia/Perth reporting dates; a view does
not guarantee its own row order. Full referrer URLs and identifiers are private
operational data and remain confined to Neon and the protected analytics route.

Browser identifiers rotate on their 12-month calendar anniversary. Vercel calls
the protected `GET /api/visit-retention` function daily at 18:15 UTC (02:15 in
Australia/Perth) and supplies the server-only `CRON_SECRET` authorization. The
cleanup deletes visits whose start time is older than Postgres `INTERVAL '12
months'`; the foreign key removes their page views through `ON DELETE CASCADE`.
The same cleanup removes exclusion markers after their final retained visit has
expired.
Vercel Cron schedules run only on production deployments; the protected
retention function was also exercised directly during preview setup.
