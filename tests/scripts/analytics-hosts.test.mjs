import assert from "node:assert/strict";
import { after, test } from "node:test";
import { createServer } from "vite";

import { isHostnameAllowed } from "../../src/utils/hostnameAllowlist.ts";

const vite = await createServer({
  appType: "custom",
  logLevel: "silent",
  server: { middlewareMode: true },
});
const { createAnalyticsHostAllowlist } = await vite.ssrLoadModule(
  "/src/utils/analyticsHosts.ts",
);

after(() => vite.close());

test("analytics host allowlists combine site defaults with configured hosts", () => {
  const allowedHostnames = createAnalyticsHostAllowlist(
    " localhost, *.VERCEL.app, PREVIEW.example.com ",
  );

  assert.equal(isHostnameAllowed(allowedHostnames, "vivecounselling.com.au"), true);
  assert.equal(isHostnameAllowed(allowedHostnames, "www.vivecounselling.com.au"), true);
  assert.equal(isHostnameAllowed(allowedHostnames, "localhost"), true);
  assert.equal(isHostnameAllowed(allowedHostnames, "branch-preview.vercel.app"), true);
  assert.equal(isHostnameAllowed(allowedHostnames, "preview.example.com"), true);
  assert.equal(isHostnameAllowed(allowedHostnames, "vercel.app"), false);
  assert.equal(isHostnameAllowed(allowedHostnames, "branch-preview.vercel.app.example.com"), false);
});
