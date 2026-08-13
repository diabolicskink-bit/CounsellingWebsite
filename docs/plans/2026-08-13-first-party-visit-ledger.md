# First-Party Visit Ledger Plan

**Status:** In progress  
**Created:** 2026-08-13  
**Branch:** `work/local-analytics`

## What We Are Building

A small first-party analytics system that records visits to the Vive Counselling website and recognizes when the same anonymous browser returns for another visit.

It will record ordinary visits as well as paid-ad visits. Advertising information will be attached to a visit when it is available rather than kept in a separate ad-only system.

The first version will not have a website dashboard. Records will be viewed through a clear reporting view in Neon.

## Overall Architecture

```text
Visitor opens the website
        |
        v
React recovers or creates an anonymous browser ID
        |
        v
React creates or recovers the current visit ID
        |
        v
React records the landing details and each page viewed
        |
        v
POST /api/visit
        |
        v
Vercel Function validates and normalizes the record
        |
        v
Neon Postgres stores browser IDs, visits and page views
        |
        v
A Neon reporting view shows the visit ledger
```

The data is divided into three related concepts:

- An **anonymous visitor** represents one browser profile that retains the site's local storage.
- A **visit** represents one browser-tab session.
- A **page view** represents a page opened during that visit.

Each visit can therefore show where someone arrived and the sequence of pages they viewed. Visits carrying the same anonymous browser ID can be shown as repeat visits.

This recognizes a browser, not a known person. Another browser or device appears as a different visitor; clearing site data creates a new identity; and multiple people using the same browser may appear as one visitor.

## Visit Information

The visit record will contain:

- Anonymous visitor ID
- Visit ID
- Visit start and latest activity time
- Landing page
- Full referrer URL exactly as the browser provides it
- A normalized referrer hostname for easier reporting
- GCLID when present
- Ad identifier when present
- Advertising network when present
- Matched advertising keyword when present
- Match type when present

The GCLID will not be treated as the visitor or visit identity. A GCLID identifies advertising attribution, the persistent anonymous visitor ID connects visits from the same browser profile, and the visit ID identifies one website visit.

The application will not intentionally add IP addresses, user-agent strings, device fingerprints, enquiry content, or arbitrary query parameters to this ledger.

## Visit And Duplicate Behaviour

- The browser creates a random anonymous visitor ID and keeps it in first-party `localStorage` so later visits from that browser can be recognized.
- The browser creates a random visit ID and keeps it in `sessionStorage`.
- The same tab keeps the same visit ID while navigating and refreshing.
- Closing the tab normally ends the practical visit session.
- An inactivity rule prevents a tab left open for a long period from remaining one visit indefinitely.
- A visit on another day receives a new visit ID but retains the anonymous visitor ID, allowing it to be marked as a return visit.
- Each page view has its own ID.
- Database uniqueness prevents the same visit or page-view request being inserted twice when React repeats an effect or a request is retried.
- A refresh is another page view in the existing visit.
- A genuinely new browser-tab session is a new visit, even if it contains a previously seen GCLID.

"All visits" here means visits where the site's JavaScript runs and the recording request is not blocked. It does not mean every raw request received by Vercel.

## Implementation Slices

Each slice is intended to be completed in one future prompt. Complete only the requested slice and stop before beginning the next one.

### 1. Build The Database Foundation

Add the Neon dependency, the anonymous-visitor relationship, visits and page-views schema, the migration, and the small server-side database access layer.

**Status:** Complete. The repository foundation exists. Slice 7 later provisioned the non-production Neon resource and applied the migrations.

**Prompt:** Complete slice 1 of the first-party visit ledger plan, update the plan, and stop.

### 2. Build The Visit API

Add the write-only Vercel endpoint that accepts a visit/page-view observation, validates it, and stores it idempotently.

**Status:** Complete. The endpoint and its server-side validation exist, but no browser code calls it and collection remains inactive.

**Prompt:** Complete slice 2 of the first-party visit ledger plan, update the plan, and stop.

### 3. Record The Initial Visit

Add the React-side visitor and visit session. Create or recover the persistent anonymous visitor ID, create and retain the visit ID, capture the landing page and original referrer URL, collect any recognized ad parameters, and send the initial observation.

**Status:** Complete. The versioned browser identity and visit session now send one initial page-view observation when first-party visit analytics is explicitly enabled on an allowed host. Collection remains disabled by default; React route-change recording remains Slice 4.

**Prompt:** Complete slice 3 of the first-party visit ledger plan, update the plan, and stop.

### 4. Record Page Views

Extend the browser recorder so subsequent React route changes and page refreshes are attached to the same visit with duplicate-safe page-view IDs.

**Status:** Complete. Each distinct pathname reached in the active document and each full page refresh now sends a new page-view ID under the current visit. Consecutive duplicate React effects and hash/query-only changes do not create extra page views, while revisiting a prior pathname does.

**Prompt:** Complete slice 4 of the first-party visit ledger plan, update the plan, and stop.

### 5. Build The Visit Ledger

Add the Neon reporting view and useful saved queries so visits can be inspected newest first, marked as new or returning, grouped by anonymous browser, summarized by source or ad, and opened to see their page sequence.

**Status:** Complete. A read-only `visit_ledger` view and five repository-owned Neon query templates now cover the newest-first ledger, anonymous-browser grouping, today's overview, 30-day source/ad reporting, and an individual visit's ordered page sequence. Slice 7 later applied the view to the non-production Neon database.

**Prompt:** Complete slice 5 of the first-party visit ledger plan, update the plan, and stop.

### Retention Decision

Keep visit and page-view records for 12 months. Keep the anonymous browser identifier for 12 months before replacing it with a new identifier.

### 6. Add Retention

Add automated cleanup for visit and page-view records older than 12 months and replace browser identifiers after 12 months.

**Status:** Complete. Browser identifiers now rotate on their 12-month calendar anniversary. A `CRON_SECRET`-protected Vercel Function removes visits older than Postgres `INTERVAL '12 months'` and their cascading page views; Vercel is configured to call it daily at 18:15 UTC. Slice 7 later configured and exercised the function in Preview; the scheduled job remains inactive until a production deployment is explicitly connected.

**Prompt:** Complete slice 6 of the first-party visit ledger plan, update the plan, and stop.

### Your Action Before Slice 7 - Authorize Neon Setup If Needed

If Vercel requires an account sign-in, Marketplace plan selection, billing acceptance, or another owner-only confirmation, complete that authorization when I ask. I will handle the technical configuration wherever the available access permits and will tell you the exact action if Vercel requires you to do it. Do not send me database passwords or other credentials.

### 7. Connect A Preview Environment

Provision or connect Neon through Vercel, apply the schema outside production, and test the complete visit flow using controlled preview visits.

**Status:** Complete. Vercel now manages a Neon resource connected only to Development and Preview. The two versioned migrations are applied through the checksum-tracked `npm run db:migrate` command. A protected branch-scoped preview recorded two controlled visits from one anonymous browser, marked the second as returning, retained the exact controlled referrer and paid attribution, stored an ordered two-page first visit, and successfully exercised the protected retention function. Production has no Neon connection and first-party collection remains disabled there.

**Prompt:** Complete slice 7 of the first-party visit ledger plan, update the plan, and stop.

### Your Action Before Slice 8 - Approve Production Collection

Review the preview ledger and confirm that you want visit recording enabled on the live website. This is the explicit go-ahead to begin collecting production visitor records; a preview test does not imply that approval.

### 8. Enable Production Collection

After explicit approval, connect the production database, enable collection on the live host, confirm the ledger receives the expected records, and update the project documentation.

**Prompt:** Complete slice 8 of the first-party visit ledger plan, update the plan, and stop.

## Not Part Of The First Version

- A website analytics dashboard
- Admin accounts or authentication
- Identifying a known person
- Recognizing the same person across different browsers or devices
- Linking visits to enquiry form contents
- Linking visits to Clarity recordings
- Importing Google Ads API data
- Recreating GA4 or Clarity
- Drafting, reviewing, or publishing privacy-policy or analytics-notice wording
