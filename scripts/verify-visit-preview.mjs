import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { neon } from "@neondatabase/serverless";
import { chromium } from "playwright";

const accessUrlValue = process.env.PREVIEW_ACCESS_URL?.trim();
const databaseUrl = process.env.DATABASE_URL?.trim();
const retentionSecret = process.env.CRON_SECRET?.trim();

if (!accessUrlValue || !databaseUrl) {
  throw new Error("PREVIEW_ACCESS_URL and DATABASE_URL are required.");
}

const accessUrl = new URL(accessUrlValue);
const previewOrigin = accessUrl.origin;
const testMarker = `slice7-${randomUUID()}`;
const controlledReferrer = "https://preview-referrer.example/controlled?source=slice-7";
const attributedPath = "/polyamory-enm-counselling";

function createAttributedUrl(includeAccessToken) {
  const url = new URL(attributedPath, previewOrigin);

  if (includeAccessToken) {
    for (const [name, value] of accessUrl.searchParams) {
      url.searchParams.set(name, value);
    }
  }

  url.searchParams.set("ad", "slice7");
  url.searchParams.set("net", "g");
  url.searchParams.set("kw", "controlled preview visit");
  url.searchParams.set("mt", "e");
  url.searchParams.set("gclid", testMarker);

  return url.href;
}

async function waitForRecordedNavigation(page, navigate) {
  const responsePromise = page.waitForResponse((response) => (
    response.url() === `${previewOrigin}/api/visit`
      && response.request().method() === "POST"
  ));

  await navigate();

  const response = await responsePromise;

  assert.equal(response.status(), 204, `Visit endpoint returned ${response.status()}.`);
}

const browser = await chromium.launch({ channel: "chrome", headless: true });

try {
  const context = await browser.newContext();
  const firstPage = await context.newPage();

  await waitForRecordedNavigation(firstPage, () => firstPage.goto(
    createAttributedUrl(true),
    { referer: controlledReferrer, waitUntil: "domcontentloaded" },
  ));

  await waitForRecordedNavigation(firstPage, () => firstPage
    .getByRole("link", { name: "Get in touch" })
    .first()
    .click());

  await firstPage.close();

  const returnPage = await context.newPage();

  await waitForRecordedNavigation(returnPage, () => returnPage.goto(
    createAttributedUrl(false),
    { referer: controlledReferrer, waitUntil: "domcontentloaded" },
  ));

  const sql = neon(databaseUrl);
  const ledgerRows = await sql.query(`
    SELECT
      visit_id,
      visitor_id,
      visitor_status,
      landing_path,
      referrer_url,
      referrer_host,
      traffic_source,
      ad_code,
      network_code,
      matched_keyword,
      match_type,
      page_view_count
    FROM visit_ledger
    WHERE gclid = $1
    ORDER BY started_at, visit_id
  `, [testMarker]);

  assert.equal(ledgerRows.length, 2, "Expected two controlled visits in the preview ledger.");
  assert.equal(ledgerRows[0].visitor_id, ledgerRows[1].visitor_id);
  assert.equal(ledgerRows[0].visitor_status, "new");
  assert.equal(ledgerRows[1].visitor_status, "returning");
  assert.equal(ledgerRows[0].landing_path, attributedPath);
  assert.equal(ledgerRows[0].referrer_url, controlledReferrer);
  assert.equal(ledgerRows[0].referrer_host, "preview-referrer.example");
  assert.equal(ledgerRows[0].traffic_source, "paid");
  assert.equal(ledgerRows[0].ad_code, "slice7");
  assert.equal(ledgerRows[0].network_code, "g");
  assert.equal(ledgerRows[0].matched_keyword, "controlled preview visit");
  assert.equal(ledgerRows[0].match_type, "e");
  assert.equal(ledgerRows[0].page_view_count, 2);
  assert.equal(ledgerRows[1].page_view_count, 1);

  const firstVisitPageViews = await sql.query(`
    SELECT path
    FROM site_page_views
    WHERE visit_id = $1
    ORDER BY viewed_at, id
  `, [ledgerRows[0].visit_id]);

  assert.deepEqual(
    firstVisitPageViews.map((pageView) => pageView.path),
    [attributedPath, "/contact"],
  );

  let retentionEndpoint = "not-run";

  if (retentionSecret) {
    const retentionResponse = await context.request.get(`${previewOrigin}/api/visit-retention`, {
      headers: {
        Authorization: `Bearer ${retentionSecret}`,
      },
    });

    assert.equal(retentionResponse.status(), 200);
    assert.deepEqual(await retentionResponse.json(), {
      ok: true,
      pageViewsDeleted: 0,
      visitsDeleted: 0,
    });
    retentionEndpoint = "ok";
  }

  console.log(JSON.stringify({
    firstVisitPageViews: 2,
    marker: testMarker,
    returningVisitRecognized: true,
    retentionEndpoint,
    visits: ledgerRows.length,
  }));
} finally {
  await browser.close();
}
