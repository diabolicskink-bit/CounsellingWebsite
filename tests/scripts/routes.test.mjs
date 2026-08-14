import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import {
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

test("private routes remain separate from public metadata routes", () => {
  assert.deepEqual(privateRoutePaths, { analytics: "/analytics" });
  assert.ok(!Object.values(publicRoutePaths).includes(privateRoutePaths.analytics));
  assert.ok(!Object.hasOwn(metadata.routes, privateRoutePaths.analytics));
});
