// @ts-check

import net from "node:net";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { chromium } from "playwright";
import { createServer as createViteServer } from "vite";

const HOST = "127.0.0.1";
const LOCAL_ROUTE_ERROR =
  "route must be a local URL path beginning with a single '/' and using forward slashes.";
const ROUTE_VALIDATION_ORIGIN = "http://visual-session.invalid";
const PROJECT_ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);

/** @returns {Promise<number>} */
function findAvailablePort() {
  return new Promise((resolve, reject) => {
    const probe = net.createServer();

    probe.once("error", (error) => {
      reject(
        new Error("Could not allocate a local port for visual verification.", {
          cause: error,
        }),
      );
    });
    probe.listen({ host: HOST, port: 0, exclusive: true }, () => {
      const address = probe.address();

      probe.close((error) => {
        if (error) {
          reject(
            new Error("Could not release the local port probe.", {
              cause: error,
            }),
          );
          return;
        }

        if (!address || typeof address === "string") {
          reject(new Error("Could not allocate a local port for visual verification."));
          return;
        }

        resolve(address.port);
      });
    });
  });
}

/**
 * @param {unknown} route
 * @returns {string}
 */
function resolveLocalRoute(route) {
  if (
    typeof route !== "string" ||
    !route.startsWith("/") ||
    route.startsWith("//") ||
    route.includes("\\")
  ) {
    throw new TypeError(LOCAL_ROUTE_ERROR);
  }

  const url = new URL(route, `${ROUTE_VALIDATION_ORIGIN}/`);

  if (url.origin !== ROUTE_VALIDATION_ORIGIN) {
    throw new TypeError(LOCAL_ROUTE_ERROR);
  }

  return `${url.pathname}${url.search}${url.hash}`;
}

/**
 * @param {import("vite").ViteDevServer} server
 * @returns {number}
 */
function getListeningPort(server) {
  const address = server.httpServer?.address();

  if (!address || typeof address === "string") {
    throw new Error("Could not determine the visual-verification server port.");
  }

  return address.port;
}

/**
 * @param {{
 *   context?: import("playwright").BrowserContext;
 *   browser?: import("playwright").Browser;
 *   server?: import("vite").ViteDevServer;
 * }} resources
 * @returns {Promise<Error[]>}
 */
async function closeSessionResources({ context, browser, server }) {
  const cleanupErrors = [];
  /** @type {Array<[string, { close: () => Promise<unknown> } | undefined]>} */
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

  return cleanupErrors;
}

/**
 * Run a finite visual-verification callback against a managed local session.
 *
 * @template Result
 * @param {{
 *   route?: string;
 *   viewport?: { width: number; height: number };
 *   navigationTimeout?: number;
 *   actionTimeout?: number;
 * }} options
 * @param {(session: {
 *   page: import("playwright").Page;
 *   context: import("playwright").BrowserContext;
 *   browser: import("playwright").Browser;
 *   server: import("vite").ViteDevServer;
 *   origin: string;
 *   url: string;
 *   response: import("playwright").Response | null;
 *   consoleErrors: string[];
 *   pageErrors: string[];
 * }) => Result | Promise<Result>} run
 * @returns {Promise<Result>}
 *
 * @example
 * await withVisualSession({ route: "/" }, async ({ page }) => {
 *   await page.getByRole("heading", { level: 1 }).waitFor();
 *   await page.waitForFunction(() => document.fonts.status === "loaded");
 *   await nodeRepl.emitImage(await page.screenshot({ animations: "disabled" }));
 * });
 */
export async function withVisualSession(
  {
    route = "/",
    viewport,
    navigationTimeout = 30_000,
    actionTimeout = 10_000,
  } = {},
  run,
) {
  if (typeof run !== "function") {
    throw new TypeError("withVisualSession requires a callback.");
  }

  const localRoute = resolveLocalRoute(route);

  let browser;
  let context;
  let server;
  let sessionError;
  let sessionFailed = false;

  try {
    // Launch before Vite so a missing system browser does not start its watchers or server.
    try {
      browser = await chromium.launch({ channel: "chrome", headless: true });
    } catch (error) {
      throw new Error(
        "Could not launch installed Google Chrome for visual verification. " +
          "This workflow uses channel: 'chrome' and needs no Playwright Chromium download. " +
          "Check the cause for missing Chrome or a process-permission failure.",
        { cause: error },
      );
    }

    const requestedPort = await findAvailablePort();
    server = await createViteServer({
      root: PROJECT_ROOT,
      logLevel: "error",
      server: {
        host: HOST,
        port: requestedPort,
        // Recover if another process claims the probed port before Vite binds.
        strictPort: false,
      },
    });
    await server.listen();

    const origin = `http://${HOST}:${getListeningPort(server)}`;
    const url = new URL(localRoute, `${origin}/`).href;

    context = await browser.newContext(viewport ? { viewport } : {});
    const page = await context.newPage();
    page.setDefaultNavigationTimeout(navigationTimeout);
    page.setDefaultTimeout(actionTimeout);
    /** @type {string[]} */
    const consoleErrors = [];
    /** @type {string[]} */
    const pageErrors = [];
    // Attach before navigation so startup failures remain available to the callback.
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });
    page.on("pageerror", (error) => pageErrors.push(error.message));
    const response = await page.goto(url, { waitUntil: "domcontentloaded" });

    return await run({
      page,
      context,
      browser,
      server,
      origin,
      url,
      response,
      consoleErrors,
      pageErrors,
    });
  } catch (error) {
    sessionFailed = true;
    sessionError = error;
    throw error;
  } finally {
    const cleanupErrors = await closeSessionResources({ context, browser, server });

    if (cleanupErrors.length > 0) {
      if (sessionFailed) {
        throw new AggregateError(
          [sessionError, ...cleanupErrors],
          "Visual-verification session failed and cleanup was incomplete.",
          { cause: sessionError },
        );
      }

      throw new AggregateError(cleanupErrors, "Visual-verification session cleanup failed.");
    }
  }
}
