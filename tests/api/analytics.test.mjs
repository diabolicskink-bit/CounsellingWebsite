import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import { createAnalyticsHandler } from "../../api/analytics.ts";

const originalConsoleError = console.error;

afterEach(() => {
  console.error = originalConsoleError;
});

function createResponse() {
  const result = { body: undefined, headers: {}, statusCode: 200 };
  const response = {
    json(body) {
      result.body = body;
      return result;
    },
    setHeader(name, value) {
      result.headers[name.toLowerCase()] = value;
    },
    status(statusCode) {
      result.statusCode = statusCode;
      return response;
    },
  };

  return { response, result };
}

async function invoke(handler, request) {
  const { response, result } = createResponse();
  const returned = await handler(request, response);

  return returned ?? result;
}

test("requests selected daily analytics through the injected reader", async () => {
  const selections = [];
  const handler = createAnalyticsHandler(async (selection) => {
    selections.push(selection);
    return { visits: [] };
  });

  const result = await invoke(handler, {
    method: "GET",
    query: { date: "2026-08-14" },
  });

  assert.deepEqual(selections, [{ type: "daily", date: "2026-08-14" }]);
  assert.equal(result.statusCode, 200);
  assert.equal(result.headers["cache-control"], "private, no-store");
  assert.deepEqual(result.body, { data: { visits: [] } });
});

test("requests all enquiry visits for a selected calendar month", async () => {
  const selections = [];
  const handler = createAnalyticsHandler(async (selection) => {
    selections.push(selection);
    return { visits: [] };
  });

  const result = await invoke(handler, {
    method: "GET",
    query: { month: "2026-08" },
  });

  assert.deepEqual(selections, [{ type: "monthly", month: "2026-08" }]);
  assert.equal(result.statusCode, 200);
});

test("requests one aggregated page-view breakdown for a bounded date range", async () => {
  const selections = [];
  const handler = createAnalyticsHandler(
    async (selection) => {
      selections.push(selection);
      return { routes: [] };
    },
    () => new Date("2026-08-16T04:00:00.000Z"),
  );

  const result = await invoke(handler, {
    method: "GET",
    query: { bots: "include", end: "2026-08-16", start: "2026-08-01" },
  });

  assert.deepEqual(selections, [{
    endDate: "2026-08-16",
    includeBots: true,
    startDate: "2026-08-01",
    type: "pageViews",
  }]);
  assert.equal(result.statusCode, 200);
});

test("requests keyword journeys for a bounded date range", async () => {
  const selections = [];
  const handler = createAnalyticsHandler(
    async (selection) => {
      selections.push(selection);
      return { keywords: [] };
    },
    () => new Date("2026-08-16T04:00:00.000Z"),
  );

  const result = await invoke(handler, {
    method: "GET",
    query: {
      end: "2026-08-16",
      report: "keywords",
      start: "2026-07-18",
    },
  });

  assert.deepEqual(selections, [{
    endDate: "2026-08-16",
    includeBots: false,
    startDate: "2026-07-18",
    type: "keywords",
  }]);
  assert.equal(result.statusCode, 200);
});

test("defaults a daily request to the current Australia/Perth date", async () => {
  const selections = [];
  const handler = createAnalyticsHandler(
    async (selection) => {
      selections.push(selection);
      return {};
    },
    () => new Date("2026-08-13T16:30:00.000Z"),
  );

  await invoke(handler, { method: "GET", query: {} });

  assert.deepEqual(selections, [{ type: "daily", date: "2026-08-14" }]);
});

test("requests a complete visitor history by anonymous visitor ID", async () => {
  const visitorId = "7a2f0000-0000-4000-8000-000000000004";
  const selections = [];
  const handler = createAnalyticsHandler(async (selection) => {
    selections.push(selection);
    return { visits: [] };
  });

  const result = await invoke(handler, {
    method: "GET",
    query: { visitor: visitorId },
  });

  assert.deepEqual(selections, [{ type: "visitor", visitorId }]);
  assert.equal(result.statusCode, 200);
});

test("rejects writes and invalid or ambiguous report selections before reading", async () => {
  let readCalls = 0;
  const handler = createAnalyticsHandler(
    async () => {
      readCalls += 1;
      return {};
    },
    () => new Date("2026-08-16T04:00:00.000Z"),
  );

  const write = await invoke(handler, { method: "POST", query: {} });
  const invalidDate = await invoke(handler, { method: "GET", query: { date: "2026-02-31" } });
  const invalidMonth = await invoke(handler, { method: "GET", query: { month: "2026-13" } });
  const ambiguous = await invoke(handler, {
    method: "GET",
    query: {
      date: "2026-08-14",
      visitor: "7a2f0000-0000-4000-8000-000000000004",
    },
  });
  const ambiguousMonth = await invoke(handler, {
    method: "GET",
    query: { date: "2026-08-14", month: "2026-08" },
  });
  const unknown = await invoke(handler, { method: "GET", query: { limit: "100" } });
  const incompleteRange = await invoke(handler, {
    method: "GET",
    query: { start: "2026-08-01" },
  });
  const incompleteKeywordRange = await invoke(handler, {
    method: "GET",
    query: { report: "keywords" },
  });
  const unknownReport = await invoke(handler, {
    method: "GET",
    query: { end: "2026-08-14", report: "sources", start: "2026-08-01" },
  });
  const reversedRange = await invoke(handler, {
    method: "GET",
    query: { end: "2026-08-01", start: "2026-08-02" },
  });
  const futureRange = await invoke(handler, {
    method: "GET",
    query: { end: "2027-08-01", start: "2027-08-01" },
  });
  const oversizedRange = await invoke(handler, {
    method: "GET",
    query: { end: "2026-08-14", start: "2025-08-13" },
  });

  assert.equal(write.statusCode, 405);
  assert.equal(write.headers.allow, "GET");
  assert.equal(invalidDate.statusCode, 400);
  assert.equal(invalidMonth.statusCode, 400);
  assert.equal(ambiguous.statusCode, 400);
  assert.equal(ambiguousMonth.statusCode, 400);
  assert.equal(unknown.statusCode, 400);
  assert.equal(incompleteRange.statusCode, 400);
  assert.equal(incompleteKeywordRange.statusCode, 400);
  assert.equal(unknownReport.statusCode, 400);
  assert.equal(reversedRange.statusCode, 400);
  assert.equal(futureRange.statusCode, 400);
  assert.equal(oversizedRange.statusCode, 400);
  assert.equal(readCalls, 0);
});

test("missing database configuration fails closed with a generic response", async () => {
  console.error = () => {};
  const handler = createAnalyticsHandler();

  const result = await invoke(handler, { method: "GET", query: {} });

  assert.equal(result.statusCode, 503);
  assert.deepEqual(result.body, { error: "Analytics data is unavailable." });
});
