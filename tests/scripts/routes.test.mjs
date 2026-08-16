import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import {
  feesRoutePath,
  getTrackedPagePath,
  isPrivateRoutePath,
  privateRoutePaths,
  publicRedirectRoutes,
  publicRoutePaths,
} from "../../src/data/routes.ts";

const metadata = JSON.parse(
  await readFile(new URL("../../src/data/routeMetadata.json", import.meta.url), "utf8"),
);

test("public route constants match the metadata-backed route set", () => {
  assert.deepEqual(
    Object.values(publicRoutePaths).sort(),
    Object.keys(metadata.routes).sort(),
  );
});

test("public redirects use absolute source and destination paths", () => {
  for (const { path, to } of publicRedirectRoutes) {
    assert.match(path, /^\//);
    assert.ok(Object.values(publicRoutePaths).includes(to));
  }
});

test("Fees link state records a virtual Fees page without changing the Contact route", () => {
  assert.equal(feesRoutePath, "/fees");
  assert.equal(
    getTrackedPagePath("/contact", { trackedPagePath: feesRoutePath }),
    feesRoutePath,
  );
  assert.equal(getTrackedPagePath("/contact", null), "/contact");
  assert.equal(getTrackedPagePath("/contact", { trackedPagePath: "/other" }), "/contact");
  assert.equal(getTrackedPagePath("/", { trackedPagePath: feesRoutePath }), "/");
});

test("private routes remain separate from public metadata routes", () => {
  assert.deepEqual(privateRoutePaths, {
    analytics: "/analytics",
    analyticsEnquiries: "/analytics/enquiries",
    analyticsExcluded: "/analytics/excluded",
    analyticsPageViews: "/analytics/pages",
  });
  for (const privatePath of Object.values(privateRoutePaths)) {
    assert.ok(!Object.values(publicRoutePaths).includes(privatePath));
    assert.ok(!Object.hasOwn(metadata.routes, privatePath));
  }
  assert.equal(isPrivateRoutePath("/analytics"), true);
  assert.equal(isPrivateRoutePath("/analytics/enquiries"), true);
  assert.equal(isPrivateRoutePath("/analytics/excluded"), true);
  assert.equal(isPrivateRoutePath("/analytics/pages"), true);
  assert.equal(isPrivateRoutePath("/analytics/visitor"), true);
  assert.equal(isPrivateRoutePath("/Analytics"), true);
  assert.equal(isPrivateRoutePath("/ANALYTICS/pages"), true);
  assert.equal(isPrivateRoutePath("/analytics-other"), false);
  assert.equal(isPrivateRoutePath("/Analytics-other"), false);
  assert.equal(isPrivateRoutePath("/contact"), false);
});
