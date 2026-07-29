# IDE Visual Verification

This guide owns the access mechanism for ad-hoc visual inspection from Codex in the VS Code extension. It does not decide when visual inspection is required, what an agent should assess, or which routes and viewport sizes belong to a task.

## Supported Route

- Use the persistent Node runtime with the repository's Playwright installation.
- `scripts/visual-session.mjs` is an optional convenience helper for the common case, not a required abstraction or application API. It launches installed system Chrome, starts Vite on an isolated local port, and closes the browser and server after the callback succeeds or fails.
- Agents may use Playwright directly when they need control the helper does not provide. Direct use must launch system Chrome with `channel: "chrome"`, keep any server it starts on an isolated explicit port, and close all resources after success or failure.
- Do not use the in-app Browser or `agent-browser` in the VS Code extension.
- Do not install or commit a browser binary for this workflow.
- Do not leave a detached development server or browser behind.

The automated Playwright QA projects remain separate from this IDE inspection route.

## Use The Helper

Run the following in the persistent Node runtime from the repository root. Change the route and callback actions to suit the current task.

```js
var visualTools = await import("./scripts/visual-session.mjs");

await visualTools.withVisualSession({ route: "/" }, async ({ page }) => {
  await nodeRepl.emitImage(await page.screenshot());
});
```

`page.screenshot()` captures the current viewport. The helper does not choose a viewport; pass one only when the current task needs it:

```js
await visualTools.withVisualSession(
  {
    route: "/",
    viewport: { width: 390, height: 844 },
  },
  async ({ page }) => {
    await nodeRepl.emitImage(await page.screenshot());
  },
);
```

## Inspect Beyond The Initial Viewport

The callback receives a normal Playwright `page`, so navigation, scrolling, interaction, current-viewport captures, element captures, and clipped captures remain available.

Capture the viewport around the middle of a page:

```js
await visualTools.withVisualSession({ route: "/" }, async ({ page }) => {
  await page.evaluate(() => {
    window.scrollTo(0, document.documentElement.scrollHeight / 2);
  });
  await nodeRepl.emitImage(await page.screenshot());
});
```

Capture one relevant element at useful detail:

```js
await visualTools.withVisualSession({ route: "/" }, async ({ page }) => {
  var target = page.locator("main section").nth(1);
  await target.scrollIntoViewIfNeeded();
  await nodeRepl.emitImage(await target.screenshot());
});
```

Use full-page screenshots only when the whole-page composition is relevant. Current-viewport or element captures usually preserve more inspectable detail.

## Lifecycle

Keep all browser work inside the `withVisualSession` callback. The `page`, browser, and server are closed when that callback finishes and must not be reused afterward.
