import assert from "node:assert/strict";
import test from "node:test";

import { chromium } from "playwright";

import { withVisualSession } from "../../scripts/visual-session.mjs";

test("requires a callback before starting managed resources", async () => {
  await assert.rejects(withVisualSession(), {
    name: "TypeError",
    message: "withVisualSession requires a callback.",
  });
});

test("explains Chrome launch failures and preserves the diagnostic cause", async (t) => {
  const launchError = new Error("spawn EPERM");
  t.mock.method(chromium, "launch", async () => {
    throw launchError;
  });

  await assert.rejects(
    withVisualSession({}, () => assert.fail("A failed launch must not run the callback.")),
    (error) => {
      assert.match(error.message, /Could not launch installed Google Chrome/);
      assert.match(error.message, /needs no Playwright Chromium download/);
      assert.equal(error.cause, launchError);
      return true;
    },
  );
});

test("rejects routes that can escape or misrepresent the local URL path", async () => {
  const unreachableCallback = () => {
    assert.fail("Invalid routes must be rejected before the callback runs.");
  };

  for (const route of [
    "contact",
    "https://example.com/contact",
    "//example.com/contact",
    "/\\\\example.com/contact",
    "/\t/example.com/contact",
  ]) {
    await assert.rejects(withVisualSession({ route }, unreachableCallback), {
      name: "TypeError",
      message:
        "route must be a local URL path beginning with a single '/' and using forward slashes.",
    });
  }
});
