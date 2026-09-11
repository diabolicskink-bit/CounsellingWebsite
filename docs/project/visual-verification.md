# IDE Visual Verification

Use the persistent `node_repl` JavaScript tool, repository Playwright and installed Google Chrome. [scripts/visual-session.mjs](../../scripts/visual-session.mjs) starts an isolated local Vite server and closes its server, browser and context when the callback finishes or throws.

This guide explains browser access and capture. [AGENTS.md](../../AGENTS.md#engineering-and-verification) and the current task determine whether inspection is useful and what to check. Starting a dev server does not require a browser audit.

## Start Here

Discover the `node_repl` tool named `js` if it is not already exposed. Run this code there from the repository root, with a tool timeout of 60 seconds:

```js
var visualTools = await import("./scripts/visual-session.mjs");

await visualTools.withVisualSession({ route: "/" }, async ({ page, pageErrors }) => {
  await page.getByRole("heading", { level: 1 }).waitFor();
  await page.waitForFunction(() => document.fonts.status === "loaded");
  await nodeRepl.emitImage(await page.screenshot({ animations: "disabled" }));
  nodeRepl.write({ pageErrors });
});
```

Replace the route and readiness locator with the page or state being inspected. The helper waits for `DOMContentLoaded`; a React page or lazy article can still be loading at that point. Wait for the relevant content, then fonts when judging layout or typography. For image-dependent work, scroll the relevant image into view and wait for it to load successfully. Avoid fixed sleeps and a blanket `networkidle` wait. The screenshot option finishes finite CSS transitions so a menu is not captured halfway open; omit it when motion itself is the subject of the check.

The persistent runtime retains top-level bindings, so the examples use reusable `var` bindings. Keep browser actions inside the callback: its resources are closed afterward, even though the `visualTools` import remains usable.

## Capture What The Task Needs

The default viewport is Playwright's 1280 × 720. Set an explicit `viewport` option or call `page.setViewportSize()` when a different size matters. A narrow viewport checks responsive layout; it does not emulate a phone's touch input, device scale or browser engine.

Group related captures and interactions in one callback. The normal Playwright page supports navigation, clicks, scrolling and viewport changes:

```js
await visualTools.withVisualSession({ route: "/" }, async ({ page }) => {
  await page.getByRole("heading", { level: 1 }).waitFor();
  await page.waitForFunction(() => document.fonts.status === "loaded");
  await nodeRepl.emitImage(await page.screenshot({ animations: "disabled" }));

  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Open navigation" }).click();
  await nodeRepl.emitImage(await page.screenshot({ animations: "disabled" }));
});
```

These are examples, not a required desktop/mobile checklist. For a section further down the page, use its locator with `scrollIntoViewIfNeeded()` and capture the viewport or the element. Full-page captures help assess overall composition; viewport and element captures preserve more detail. Inspect the returned images before claiming visual verification.

The callback also receives `origin`, `url`, the initial navigation `response`, `consoleErrors` and `pageErrors`. Error arrays collect from before the first navigation through the callback, so startup errors are available. Use them when diagnosing rendering or interactions; an HTTP response alone does not prove the UI works.

## If It Fails

- **Node tool absent:** check the available tool catalogue once. If `node_repl` is unavailable, use a focused existing Playwright test when it answers the question; otherwise complete useful source/static checks and report the missing rendered check.
- **Chrome launch failure:** inspect the helper's error and cause. A missing installation and a process-permission denial need different fixes. Use the normal permission route for an actual denied launch when appropriate; do not repeat the unchanged call or search browser caches.
- **Page or locator timeout:** inspect the route, selector and captured errors. The helper defaults to 30 seconds for navigation and 10 seconds for actions, locators and screenshots. Increase `navigationTimeout` or `actionTimeout` only when the observed work warrants it; a blank page is not evidence that a different browser is needed.

After identifying and correcting a cause, retry the affected check. If the same environment failure persists, report it and finish independent work. Do not install `agent-browser`, run a Playwright browser installer, change permissions globally or cycle through browser tools to complete routine inspection.

## Browser Configuration And Scope

[.codex/config.toml](../../.codex/config.toml) disables the in-app Browser plugin and the four Vercel skills that prescribe the incompatible `agent-browser` workflow: `agent-browser`, `agent-browser-verify`, `verification` and `investigation-mode`. Other Vercel capabilities remain available. Skill overrides use names rather than machine-specific cache paths. Restart Codex after changing skill settings; an existing conversation may still contain the earlier skill catalogue. The repository browser route applies even when those skills appear in that catalogue.

Codex supports project configuration layers and per-skill enablement selectors; see the official [configuration basics](https://developers.openai.com/codex/config-basic) and [configuration schema](https://developers.openai.com/codex/config-schema.json).

Both this helper and [playwright.config.ts](../../playwright.config.ts) select installed Chrome with `channel: "chrome"`. Playwright calls the engine API `chromium`, and the existing test project retains that name; neither means a Chromium download is required. Chrome must already be installed wherever these checks run.

The helper serves Vite development output. It does not verify the production build, Vercel routing, serverless APIs, real email or database behaviour. Automated QA serves built output through its own managed preview server; choose those checks when that distinction matters.

Direct Playwright is available for a task the helper cannot support, such as inspecting a deployed URL. Use `channel: "chrome"`, a fresh context and `try/finally` cleanup. Keep any local server isolated from the owner's server and close resources you start. For ordinary local inspection, use the helper instead of recreating its setup.
