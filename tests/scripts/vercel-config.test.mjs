import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const vercelConfig = JSON.parse(await readFile(new URL("../../vercel.json", import.meta.url), "utf8"));

test("Vercel config keeps clean URLs and extensionless trailing-slash policy", () => {
  assert.equal(vercelConfig.cleanUrls, true);
  assert.equal(vercelConfig.trailingSlash, false);
});

test("Vercel config does not use a blanket SPA catch-all rewrite", () => {
  assert.equal(Object.hasOwn(vercelConfig, "rewrites"), false);
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
  ]);
});
