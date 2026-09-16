import assert from "node:assert/strict";
import { test } from "node:test";
import {
  enquiryOriginPolicy,
  getBlockedRequestLogDetails,
  getCrossSiteBlockReason,
  getHeader,
  visitEventOriginPolicy,
  visitOriginPolicy,
} from "../../../src/server/request-origin.ts";

test("public write APIs consistently reject malformed Origin headers", () => {
  const policies = [visitOriginPolicy, enquiryOriginPolicy, visitEventOriginPolicy];
  const malformedOrigins = [
    "vivecounselling.com.au",
    "https://vivecounselling.com.au/not-an-origin",
    "https://user:password@vivecounselling.com.au",
    "https:vivecounselling.com.au",
    "https:///vivecounselling.com.au",
    "https://\\vivecounselling.com.au",
    "https://vive\tcounselling.com.au",
    "https://vivecounselling.com.au/.",
    "https://vivecounselling.com.au\u0000",
    "https://vivecounselling.com.au?",
    "https://vivecounselling.com.au#",
    "null",
  ];

  for (const policy of policies) {
    for (const origin of malformedOrigins) {
      assert.equal(
        getCrossSiteBlockReason({
          headers: {
            host: "vivecounselling.com.au",
            origin,
            "x-forwarded-proto": "https",
          },
        }, {}, policy),
        "mismatched_origin",
      );
    }
  }
});

test("header lookup combines every case-insensitive match", () => {
  assert.equal(getHeader({ headers: {
    Origin: "https://vivecounselling.com.au",
    origin: ["https://attacker.example", "https://second.example"],
    ORIGIN: undefined,
  } }, "ORIGIN"), "https://vivecounselling.com.au, https://attacker.example, https://second.example");
  assert.equal(getHeader({}, "origin"), "");

  for (const policy of [visitOriginPolicy, enquiryOriginPolicy, visitEventOriginPolicy]) {
    assert.equal(getCrossSiteBlockReason({ headers: {
      host: "vivecounselling.com.au",
      Origin: "https://vivecounselling.com.au",
      origin: "https://attacker.example",
    } }, {}, policy), "mismatched_origin");
  }
});

test("public write APIs consistently require an HTTP(S) Referer URL", () => {
  const invalidReferers = [
    "vivecounselling.com.au/contact",
    "blob:https://vivecounselling.com.au/id",
    "https://user:password@vivecounselling.com.au/contact",
    "https:///vivecounselling.com.au/contact",
    "https://vive\tcounselling.com.au/contact",
  ];

  for (const policy of [visitOriginPolicy, enquiryOriginPolicy, visitEventOriginPolicy]) {
    for (const referer of invalidReferers) {
      assert.equal(getCrossSiteBlockReason({ headers: {
        host: "vivecounselling.com.au", referer,
      } }, {}, policy), "mismatched_referer", referer);
    }
  }
});

test("preserves same-origin, configured-preview, and missing-header behavior", () => {
  const environment = {
    SITE_URL: "https://www.vivecounselling.com.au/contact",
    VERCEL_URL: "deployment.example",
    VERCEL_BRANCH_URL: "branch.example",
  };
  const host = "vivecounselling.com.au";

  for (const policy of [visitOriginPolicy, enquiryOriginPolicy, visitEventOriginPolicy]) {
    assert.equal(getCrossSiteBlockReason({}, {}, policy), null);
    for (const origin of [
      "https://vivecounselling.com.au",
      "HTTPS://VIVECOUNSELLING.COM.AU:443",
      "https://www.vivecounselling.com.au",
      "https://deployment.example",
      "https://branch.example",
    ]) {
      assert.equal(getCrossSiteBlockReason({ headers: { host, origin } }, environment, policy), null, origin);
    }
    assert.equal(getCrossSiteBlockReason({ headers: {
      host, referer: "https://vivecounselling.com.au/contact?example=1",
    } }, {}, policy), null);
    assert.equal(getCrossSiteBlockReason({ headers: {
      host, origin: "https://attacker.example", referer: "https://vivecounselling.com.au/contact",
    } }, {}, policy), "mismatched_origin");
    assert.equal(getCrossSiteBlockReason({ headers: {
      host, origin: "https://vivecounselling.com.au", "sec-fetch-site": "cross-site",
    } }, {}, policy), "cross_site_fetch_site");
  }
});

test("keeps each endpoint's local loopback allowances", () => {
  for (const policy of [visitOriginPolicy, enquiryOriginPolicy, visitEventOriginPolicy]) {
    for (const host of ["localhost:4287", "127.0.0.1:4287"]) {
      assert.equal(getCrossSiteBlockReason({ headers: { host, origin: `http://${host}` } }, {}, policy), null);
    }
  }
  const request = { headers: { host: "[::1]:4287", origin: "http://[::1]:4287" } };
  assert.equal(getCrossSiteBlockReason(request, {}, visitOriginPolicy), null);
  assert.equal(getCrossSiteBlockReason(request, {}, enquiryOriginPolicy), null);
  assert.equal(getCrossSiteBlockReason(request, {}, visitEventOriginPolicy), "mismatched_origin");
});

test("omits URL paths, queries, and credentials from origin log fields", () => {
  const block = { reason: "mismatched_origin", status: 403 };
  const details = getBlockedRequestLogDetails({ headers: {
    origin: "https://attacker.example/private?secret=value#fragment",
    referer: "https://vivecounselling.com.au/private?secret=value#fragment",
  } }, block);
  assert.equal(details.origin, "https://attacker.example");
  assert.equal(details.refererOrigin, "https://vivecounselling.com.au");
  assert.doesNotMatch(JSON.stringify(details), /private|secret|fragment/);

  const invalidDetails = getBlockedRequestLogDetails({ headers: {
    origin: "https://user:password@attacker.example",
    referer: "not a URL with private details",
  } }, block);
  assert.equal(invalidDetails.origin, "invalid");
  assert.equal(invalidDetails.refererOrigin, "invalid");
});
