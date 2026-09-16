import assert from "node:assert/strict";
import { test } from "node:test";
import { getVisitRequestEnvironment } from "../../../src/server/visits/request.ts";

const desktopUserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/145.0.0.0 Safari/537.36";

test("derives bounded device and user-agent values from request headers", () => {
  const mobileUserAgent = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_6 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 Safari/604.1";
  const tabletUserAgent = "Mozilla/5.0 (Linux; Android 15; Tablet) AppleWebKit/537.36 Chrome/145.0.0.0 Safari/537.36";

  assert.deepEqual(
    getVisitRequestEnvironment({ headers: {
      "sec-ch-ua-mobile": "?1",
      "user-agent": mobileUserAgent,
    } }),
    {
      deviceType: "mobile",
      locationCountryCode: null,
      locationRegionCode: null,
      userAgent: mobileUserAgent,
    },
  );
  assert.deepEqual(
    getVisitRequestEnvironment({ headers: {
      "sec-ch-ua-mobile": "?0",
      "user-agent": tabletUserAgent,
    } }),
    {
      deviceType: "tablet",
      locationCountryCode: null,
      locationRegionCode: null,
      userAgent: tabletUserAgent,
    },
  );
  assert.deepEqual(
    getVisitRequestEnvironment({ headers: { "user-agent": desktopUserAgent } }),
    {
      deviceType: "desktop",
      locationCountryCode: null,
      locationRegionCode: null,
      userAgent: desktopUserAgent,
    },
  );
  assert.deepEqual(
    getVisitRequestEnvironment({ headers: {} }),
    {
      deviceType: "unknown",
      locationCountryCode: null,
      locationRegionCode: null,
      userAgent: null,
    },
  );
  assert.deepEqual(
    getVisitRequestEnvironment({ headers: { "user-agent": "x".repeat(1025) } }),
    {
      deviceType: "unknown",
      locationCountryCode: null,
      locationRegionCode: null,
      userAgent: "x".repeat(1024),
    },
  );
});

test("keeps Australian state, overseas country, and unknown request locations", () => {
  assert.deepEqual(
    getVisitRequestEnvironment({ headers: {
      "x-vercel-ip-city": "Perth",
      "x-vercel-ip-country": "au",
      "x-vercel-ip-country-region": "wa",
      "x-vercel-ip-latitude": "-31.9523",
      "x-vercel-ip-longitude": "115.8613",
      "x-vercel-ip-postal-code": "6000",
    } }),
    {
      deviceType: "unknown",
      locationCountryCode: "AU",
      locationRegionCode: "WA",
      userAgent: null,
    },
  );
  assert.deepEqual(
    getVisitRequestEnvironment({ headers: {
      "x-vercel-ip-country": "nz",
      "x-vercel-ip-country-region": "auk",
    } }),
    {
      deviceType: "unknown",
      locationCountryCode: "NZ",
      locationRegionCode: null,
      userAgent: null,
    },
  );

  for (const headers of [
    {},
    { "x-vercel-ip-country": "Australia", "x-vercel-ip-country-region": "WA" },
    { "x-vercel-ip-country": "AU" },
    { "x-vercel-ip-country": "AU", "x-vercel-ip-country-region": "Western Australia" },
  ]) {
    assert.deepEqual(
      getVisitRequestEnvironment({ headers }),
      {
        deviceType: "unknown",
        locationCountryCode: null,
        locationRegionCode: null,
        userAgent: null,
      },
    );
  }
});
