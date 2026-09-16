import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const vercelConfig = JSON.parse(await readFile(new URL("../../../vercel.json", import.meta.url), "utf8"));

test("Vercel config does not use a blanket SPA catch-all rewrite", () => {
  const hasBlanketSpaRewrite = (vercelConfig.rewrites ?? []).some(({ source, destination }) => (
    ["/(.*)", "/:path*"].includes(source)
    || destination === "/index.html"
  ));

  assert.equal(hasBlanketSpaRewrite, false);
});

test("Vercel packages the complete source tree with every serverless function", () => {
  assert.equal(vercelConfig.functions["api/**/*.ts"].includeFiles, "src/**");
});

test("Vercel schedules visit retention cleanup", () => {
  const retention = vercelConfig.crons.find(({ path }) => path === "/api/visit-retention");
  assert.ok(retention?.schedule.trim());
});
