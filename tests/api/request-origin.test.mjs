import assert from "node:assert/strict";
import { test } from "node:test";
import {
  enquiryOriginPolicy,
  getCrossSiteBlockReason,
  visitEventOriginPolicy,
  visitOriginPolicy,
} from "../../src/server/request-origin.ts";

test("public write APIs consistently reject malformed Origin headers", () => {
  const policies = [visitOriginPolicy, enquiryOriginPolicy, visitEventOriginPolicy];
  const malformedOrigins = [
    "vivecounselling.com.au",
    "https://vivecounselling.com.au/not-an-origin",
    "https://user:password@vivecounselling.com.au",
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
