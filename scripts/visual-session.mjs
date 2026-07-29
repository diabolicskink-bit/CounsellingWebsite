import net from "node:net";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { chromium } from "playwright";
import { createServer as createViteServer } from "vite";

const HOST = "127.0.0.1";
const PROJECT_ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);

function findAvailablePort() {
  return new Promise((resolve, reject) => {
    const probe = net.createServer();

    probe.unref();
    probe.once("error", reject);
    probe.listen({ host: HOST, port: 0, exclusive: true }, () => {
      const address = probe.address();

      if (!address || typeof address === "string") {
        probe.close();
        reject(new Error("Could not allocate a local port for visual verification."));
        return;
      }

      probe.close((error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(address.port);
      });
    });
  });
}

/**
 * Run a finite visual-verification callback against a managed local session.
 *
 * @template Result
 * @param {{
 *   route?: string;
 *   viewport?: { width: number; height: number };
 *   navigationTimeout?: number;
 * }} options
 * @param {(session: {
 *   page: import("playwright").Page;
 *   context: import("playwright").BrowserContext;
 *   browser: import("playwright").Browser;
 *   server: import("vite").ViteDevServer;
 *   origin: string;
 *   url: string;
 *   response: import("playwright").Response | null;
 * }) => Promise<Result>} run
 * @returns {Promise<Result>}
 *
 * @example
 * await withVisualSession({ route: "/" }, async ({ page }) => {
 *   await nodeRepl.emitImage(await page.screenshot({ fullPage: true }));
 * });
 */
export async function withVisualSession(
  {
    route = "/",
    viewport,
    navigationTimeout = 30_000,
  } = {},
  run,
) {
  if (typeof run !== "function") {
    throw new TypeError("withVisualSession requires an async callback.");
  }

  if (typeof route !== "string" || !route.startsWith("/")) {
    throw new TypeError("route must be a local path beginning with '/'.");
  }

  let browser;
  let context;
  let server;
  let primaryError;

  try {
    // Launch first so a missing system browser fails before a server is started.
    browser = await chromium.launch({ channel: "chrome", headless: true });

    const port = await findAvailablePort();
    server = await createViteServer({
      root: PROJECT_ROOT,
      logLevel: "error",
      server: {
        host: HOST,
        port,
        strictPort: true,
      },
    });
    await server.listen();

    const origin = `http://${HOST}:${port}`;
    const url = new URL(route, `${origin}/`).href;

    context = await browser.newContext(viewport ? { viewport } : {});
    const page = await context.newPage();
    page.setDefaultNavigationTimeout(navigationTimeout);
    const response = await page.goto(url, { waitUntil: "domcontentloaded" });

    return await run({
      page,
      context,
      browser,
      server,
      origin,
      url,
      response,
    });
  } catch (error) {
    primaryError = error;
    throw error;
  } finally {
    const cleanupErrors = [];
    const resources = [
      ["browser context", context],
      ["browser", browser],
      ["Vite server", server],
    ];

    for (const [label, resource] of resources) {
      if (!resource) {
        continue;
      }

      try {
        await resource.close();
      } catch (error) {
        cleanupErrors.push(new Error(`Could not close ${label}.`, { cause: error }));
      }
    }

    if (!primaryError && cleanupErrors.length > 0) {
      throw new AggregateError(
        cleanupErrors,
        "Visual-verification session cleanup failed.",
      );
    }
  }
}
