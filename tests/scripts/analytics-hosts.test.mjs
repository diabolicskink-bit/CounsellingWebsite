import assert from "node:assert/strict";
import test from "node:test";

import {
  isHostnameAllowed,
  normalizeHostname,
} from "../../src/utils/hostnameAllowlist.ts";

test("analytics host allowlists support explicit and wildcard hosts", () => {
  const allowedHostnames = new Set([
    "vivecounselling.com.au",
    "www.vivecounselling.com.au",
    "localhost",
    normalizeHostname("*.VERCEL.app"),
  ]);

  assert.equal(isHostnameAllowed(allowedHostnames, "vivecounselling.com.au"), true);
  assert.equal(isHostnameAllowed(allowedHostnames, "www.vivecounselling.com.au"), true);
  assert.equal(isHostnameAllowed(allowedHostnames, "localhost"), true);
  assert.equal(isHostnameAllowed(allowedHostnames, "branch-preview.vercel.app"), true);
  assert.equal(isHostnameAllowed(allowedHostnames, "vercel.app"), false);
  assert.equal(isHostnameAllowed(allowedHostnames, "branch-preview.vercel.app.example.com"), false);
});
