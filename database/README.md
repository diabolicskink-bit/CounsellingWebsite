# Database

Versioned SQL migrations for the first-party visit ledger live in
`database/migrations/` and are applied in filename order with `npm run
db:migrate:production`. Before running it, intentionally pull the Production
environment into the ignored `.env.production.local` file:

```powershell
npx vercel env pull .env.production.local --environment=production --yes
npm run db:migrate:production
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

The Vercel-managed Neon resource and all of its generated connection variables
are scoped to Production only. Development and Preview deployments receive no
Neon project identifiers, hosts, usernames, passwords, or connection strings;
their database-backed functions therefore fail closed. The first two
migrations are current in Production, and visit recording is enabled only on
the canonical Vive hostnames. Migration `0003` adds nullable BotID verdict and
verified-bot identity fields; apply it before deploying the classification
code.

`visit_ledger` is the read-only reporting view created by migration `0002` and
extended by migration `0003`. It marks the earliest retained visit for an
anonymous browser ID as `new`, marks later retained visits as `returning`,
classifies traffic, adds page-view totals, and exposes the nullable BotID
verdict and verified name/category. The private `/analytics` interface reads it
only through the Basic Authentication-protected, read-only `GET /api/analytics`
function.

Repository-owned Neon saved-query templates live in `database/queries/`. The
queries apply explicit ordering and Australia/Perth reporting dates; a view does
not guarantee its own row order. Full referrer URLs and identifiers are private
operational data and remain confined to Neon and the protected analytics route.

Browser identifiers rotate on their 12-month calendar anniversary. Vercel calls
the protected `GET /api/visit-retention` function daily at 18:15 UTC (02:15 in
Australia/Perth) and supplies the server-only `CRON_SECRET` authorization. The
cleanup deletes visits whose start time is older than Postgres `INTERVAL '12
months'`; the foreign key removes their page views through `ON DELETE CASCADE`.
Vercel Cron schedules run only on production deployments; the protected
retention function was also exercised directly during preview setup.
