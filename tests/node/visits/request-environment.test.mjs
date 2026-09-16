import assert from "node:assert/strict";
import { test } from "node:test";
import { getVisitClientIp, getVisitRequestEnvironment } from "../../../src/server/visits/request.ts";

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
  assert.equal(getVisitRequestEnvironment({
    headers: { "user-agent": "Googlebot/2.1\r\nInjected: value" },
  }).userAgent, null);
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

test("uses only a single Vercel-injected IP, never caller body or alternate headers", () => {
  const env = { VERCEL: "1" };
  const ip = "203.0.113.9";
  const ipv6 = "2001:db8::9";
  assert.equal(getVisitClientIp({ headers: { "X-Vercel-Forwarded-For": ip } }, env), ip);
  assert.equal(getVisitClientIp({ headers: { "x-vercel-forwarded-for": ipv6 } }, env), ipv6);
  assert.equal(getVisitClientIp({ headers: { "x-vercel-forwarded-for": ip } }, {}), null);
  assert.equal(getVisitClientIp({ body: { ip }, headers: { "x-forwarded-for": ip } }, env), null);
  for (const value of [ip + ", 192.0.2.1", [ip, "192.0.2.1"], ip + ":80", "unknown", "fe80::1%eth0"]) {
    assert.equal(getVisitClientIp({ headers: { "x-vercel-forwarded-for": value } }, env), null);
  }
});
