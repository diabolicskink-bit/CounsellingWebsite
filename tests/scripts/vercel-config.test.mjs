import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const vercelConfig = JSON.parse(await readFile(new URL("../../vercel.json", import.meta.url), "utf8"));

test("Vercel config keeps clean URLs and extensionless trailing-slash policy", () => {
  assert.equal(vercelConfig.cleanUrls, true);
  assert.equal(vercelConfig.trailingSlash, false);
});

test("Vercel config does not use a blanket SPA catch-all rewrite", () => {
  const hasBlanketSpaRewrite = (vercelConfig.rewrites ?? []).some(({ source, destination }) => (
    ["/(.*)", "/:path*"].includes(source)
    || destination === "/index.html"
  ));

  assert.equal(hasBlanketSpaRewrite, false);
});

test("Vercel packages each serverless function's external TypeScript modules", () => {
  assert.deepEqual(vercelConfig.functions, {
    "api/enquiry.ts": {
      includeFiles: "src/{data/enquiryContract.ts,data/visitEventContract.ts,server/enquiry/**,server/visit-events/**,server/visits/repository.ts,utils/timeZones.ts}",
    },
    "api/visit-retention.ts": {
      includeFiles: "src/server/visits/**",
    },
    "api/analytics.ts": {
      includeFiles: "src/{data/analyticsContract.ts,server/reporting/**,server/visits/repository.ts}",
    },
    "api/visit.ts": {
      includeFiles: "src/server/visits/**",
    },
    "api/visit-event.ts": {
      includeFiles: "src/{data/visitEventContract.ts,server/visit-events/**,server/visits/repository.ts}",
    },
  });
});

test("Vercel schedules one daily visit retention cleanup", () => {
  assert.deepEqual(vercelConfig.crons, [
    {
      path: "/api/visit-retention",
      schedule: "15 18 * * *",
    },
  ]);
});

test("Vercel config keeps public alias redirects", () => {
  assert.deepEqual(vercelConfig.redirects, [
    {
      source: "/about",
      destination: "/working-with-joel",
      permanent: true,
    },
    {
      source: "/fees",
      destination: "/contact",
      permanent: true,
    },
    {
      source: "/inclusion",
      destination: "/inclusive-counselling",
      permanent: true,
    },
  ]);
});
