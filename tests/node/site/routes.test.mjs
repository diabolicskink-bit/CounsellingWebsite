import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import {
  feesRoutePath,
  getTrackedPagePath,
  isPrivateRoutePath,
  normalizeRoutePath,
  privateRoutePaths,
  publicRoutePaths,
  usesSharedChromePath,
} from "../../../src/data/routes.ts";

const metadata = JSON.parse(
  await readFile(new URL("../../../src/data/routeMetadata.json", import.meta.url), "utf8"),
);

test("public route constants match the metadata-backed route set", () => {
  assert.deepEqual(
    Object.values(publicRoutePaths).sort(),
    Object.keys(metadata.routes).sort(),
  );
});

test("Fees link state records a virtual Fees page without changing the Contact route", () => {
  assert.equal(
    getTrackedPagePath("/contact", { trackedPagePath: feesRoutePath }),
    feesRoutePath,
  );
  assert.equal(getTrackedPagePath("/contact", null), "/contact");
  assert.equal(getTrackedPagePath("/contact", { trackedPagePath: "/other" }), "/contact");
  assert.equal(getTrackedPagePath("/", { trackedPagePath: feesRoutePath }), "/");
});

test("route matching normalizes case and trailing slashes", () => {
  assert.equal(normalizeRoutePath("/"), "/");
  assert.equal(normalizeRoutePath("/CONTACT/"), "/contact");
  assert.equal(usesSharedChromePath("/CONTACT/"), true);
  assert.equal(usesSharedChromePath("/ARTICLES/AN-ARTICLE/"), true);
  assert.equal(usesSharedChromePath("/"), false);
  assert.equal(
    getTrackedPagePath("/CONTACT/", { trackedPagePath: feesRoutePath }),
    feesRoutePath,
  );
});

test("private routes remain separate from public metadata routes", () => {
  for (const privatePath of Object.values(privateRoutePaths)) {
    assert.equal(isPrivateRoutePath(privatePath), true);
    assert.ok(!Object.values(publicRoutePaths).includes(privatePath));
    assert.ok(!Object.hasOwn(metadata.routes, privatePath));
  }
  const root = privateRoutePaths.analytics;
  assert.equal(isPrivateRoutePath(root.toUpperCase() + "/new-report"), true);
  assert.equal(isPrivateRoutePath(root + "-other"), false);
  assert.equal(isPrivateRoutePath(publicRoutePaths.contact), false);
});
