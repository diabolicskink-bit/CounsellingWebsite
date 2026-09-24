# Verification

Use this guide to choose checks, design useful tests and inspect rendered behaviour. [AGENTS.md](../../AGENTS.md) owns task authorization and Git permissions. [Analytics](ANALYTICS.md) owns the private-dashboard exceptions; [tests/README.md](../../tests/README.md) owns executable selections and test organisation.

## Choose Checks

- Choose the smallest set of checks that gives useful confidence in the change. Use the commands and limits in [tests/README.md](../../tests/README.md#commands); full QA suites, browser sweeps and Lighthouse audits are not routine completion requirements.
- For public visual or interaction changes, use focused rendered or browser inspection when needed to assess the affected behaviour. Limit it to relevant routes, states and viewports. In the Codex IDE, use the persistent `node_repl` JavaScript tool with repository Playwright and installed Chrome, following [IDE Browser Inspection](#ide-browser-inspection). This repository route takes precedence over plugin browser workflows; do not start with `agent-browser` or a Chromium download.
- Development-only presentation changes normally need source inspection and the smallest relevant static check. Changes to functional tools, such as article saving, still need focused checks of the affected behaviour. Do not turn those checks into a full visual, responsive or browser audit unless requested.
- Once relevant checks pass, stop. Broaden or repeat them only when a failure, subsequent change or unresolved concern justifies it. Avoid repeating checks already covered by a command that passed.
- Review the final diff. Report material changes, checks performed and any consequential verification still outstanding. Distinguish source inspection, mocked tests and local builds from evidence about deployed services.


New article publication has a specific [publication gate](ARTICLES.md#publishing-boundaries). Read that gate when publishing; it is not the default for other changes.

## Test Scope And Maintenance

- Reuse existing coverage first. Add or extend a test only when it protects a concrete, consequential failure or behavioural boundary and earns its ongoing maintenance cost. A code change does not automatically need a new test; test counts and coverage percentages are not goals.
- Prioritize enquiry delivery and failure handling, authentication/privacy, public input boundaries, data identity and deletion, report calculations and attribution, and safe article saving. Low traffic does not make these failures harmless.
- Do not lock routine copy, headings, service lists, layout, styling or documentation in place. Do not add tests merely to prove that an edit happened or removed content stays absent. Keep behavioural checks independent of exact editorial wording unless that wording is itself a required functional contract.
- Assert meaningful outcomes or narrow safety constraints. Avoid snapshots of whole pages or objects, inventories of current files, copied configuration, SQL formatting and internal call sequences. Preserve useful checks of actual database results and security boundaries.
- Prefer representative cases at the most useful test layer. Add permutations or checks at another layer only for a distinct failure risk; do not duplicate the same assertions across unit, mocked and browser tests. Keep fixtures and helpers simple and readable, without speculative frameworks or unnecessary file fragmentation.
- Update or remove obsolete tests when behaviour changes. Dashboard presentation and Preview verification follow the [private analytics policy](ANALYTICS.md).

## Shared Design Changes

- Documentation-only changes require reference and link searches that confirm the active/legacy boundary remains clear.
- Production CSS or supported component implementation changes require `npm run build` unless the task explicitly excludes it. Presentation-only changes to the development workspace follow the development-only policy above.
- Production visual or interaction changes require direct inspection of affected consumers; the workspace specimen is not a substitute for consumer testing.
- Removal requires source-consumer searches plus checks proportionate to the affected behaviour.

## IDE Browser Inspection

Use the persistent `node_repl` JavaScript tool, repository Playwright and installed Google Chrome. [scripts/dev/visual-session.mjs](../../scripts/dev/visual-session.mjs) starts an isolated local Vite server and closes its server, browser and context when the callback finishes or throws.

Starting a dev server does not require a browser audit.

### Start Here

Discover the `node_repl` tool named `js` if it is not already exposed. Run this code there from the repository root, with a tool timeout of 60 seconds:

```js
var visualTools = await import("./scripts/dev/visual-session.mjs");

await visualTools.withVisualSession({ route: "/" }, async ({ page, pageErrors }) => {
  await page.getByRole("heading", { level: 1 }).waitFor();
  await page.waitForFunction(() => document.fonts.status === "loaded");
  await nodeRepl.emitImage(await page.screenshot({ animations: "disabled" }));
  nodeRepl.write({ pageErrors });
});
```

Replace the route and readiness locator with the page or state being inspected. The helper waits for `DOMContentLoaded`; a React page or lazy article can still be loading at that point. Wait for the relevant content, then fonts when judging layout or typography. For image-dependent work, scroll the relevant image into view and wait for it to load successfully. Avoid fixed sleeps and a blanket `networkidle` wait. The screenshot option finishes finite CSS transitions so a menu is not captured halfway open; omit it when motion itself is the subject of the check.

The persistent runtime retains top-level bindings, so the examples use reusable `var` bindings. Keep browser actions inside the callback: its resources are closed afterward, even though the `visualTools` import remains usable.

### Capture What The Task Needs

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

### If It Fails

- **Node tool absent:** check the available tool catalogue once. If `node_repl` is unavailable, use a focused existing Playwright test when it answers the question; otherwise complete useful source/static checks and report the missing rendered check.
- **Chrome launch failure:** inspect the helper's error and cause. A missing installation and a process-permission denial need different fixes. Use the normal permission route for an actual denied launch when appropriate; do not repeat the unchanged call or search browser caches.
- **Page or locator timeout:** inspect the route, selector and captured errors. The helper defaults to 30 seconds for navigation and 10 seconds for actions, locators and screenshots. Increase `navigationTimeout` or `actionTimeout` only when the observed work warrants it; a blank page is not evidence that a different browser is needed.

After identifying and correcting a cause, retry the affected check. If the same environment failure persists, report it and finish independent work. Do not install `agent-browser`, run a Playwright browser installer, change permissions globally or cycle through browser tools to complete routine inspection.

### Browser Configuration And Scope

[.codex/config.toml](../../.codex/config.toml) disables the in-app Browser plugin and the four Vercel skills that prescribe the incompatible `agent-browser` workflow: `agent-browser`, `agent-browser-verify`, `verification` and `investigation-mode`. Other Vercel capabilities remain available. Skill overrides use names rather than machine-specific cache paths. Restart Codex after changing skill settings; an existing conversation may still contain the earlier skill catalogue. The repository browser route applies even when those skills appear in that catalogue.

Codex supports project configuration layers and per-skill enablement selectors; see the official [configuration basics](https://developers.openai.com/codex/config-basic) and [configuration schema](https://developers.openai.com/codex/config-schema.json).

Both this helper and [playwright.config.ts](../../playwright.config.ts) select installed Chrome with `channel: "chrome"`. Playwright calls the engine API `chromium`, and the existing test project retains that name; neither means a Chromium download is required. Chrome must already be installed wherever these checks run.

The helper serves Vite development output. It does not verify the production build, Vercel routing, serverless APIs, real email or database behaviour. Automated QA serves built output through its own managed preview server; choose those checks when that distinction matters.

Direct Playwright is available for a task the helper cannot support, such as inspecting a deployed URL. Use `channel: "chrome"`, a fresh context and `try/finally` cleanup. Keep any local server isolated from the owner's server and close resources you start. For ordinary local inspection, use the helper instead of recreating its setup.
