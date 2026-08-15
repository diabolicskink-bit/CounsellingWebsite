import { spawn } from "node:child_process";
import net from "node:net";
import path from "node:path";

const previewHost = "127.0.0.1";
const previewPort = 4288;
const previewUrl = `http://${previewHost}:${previewPort}`;
const baseAnalyticsEnv = {
  ...process.env,
  PLAYWRIGHT_BASE_URL: previewUrl,
  VITE_ANALYTICS_ENABLED: "true",
  VITE_CLARITY_PROJECT_ID: "testclarity1",
  VITE_GA_MEASUREMENT_ID: "G-TEST12345",
  VITE_VISIT_ANALYTICS_ENABLED: "true",
  VITE_VISIT_BOT_DETECTION_ENABLED: "false",
};
const blockedHostAnalyticsEnv = {
  ...baseAnalyticsEnv,
  VITE_ANALYTICS_ALLOWED_HOSTS: "",
  VITE_VISIT_ANALYTICS_ALLOWED_HOSTS: "",
};
const allowedHostAnalyticsEnv = {
  ...baseAnalyticsEnv,
  VITE_ANALYTICS_ALLOWED_HOSTS: "127.0.0.1",
  VITE_VISIT_ANALYTICS_ALLOWED_HOSTS: "127.0.0.1",
};
const playwrightCli = path.join("node_modules", "playwright", "cli.js");
const viteCli = path.join("node_modules", "vite", "bin", "vite.js");

function run(command, args, env) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      env,
      stdio: "inherit",
    });

    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`${command} ${args.join(" ")} exited with code ${code ?? "unknown"}.`));
    });

    child.on("error", reject);
  });
}

function wait(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

function previewIsReady() {
  return new Promise((resolve) => {
    const socket = net.createConnection({
      host: previewHost,
      port: previewPort,
    });
    let settled = false;
    const finish = (isReady) => {
      if (settled) {
        return;
      }

      settled = true;
      socket.destroy();
      resolve(isReady);
    };

    socket.setTimeout(1_000);
    socket.once("connect", () => finish(true));
    socket.once("error", () => finish(false));
    socket.once("timeout", () => finish(false));
  });
}

async function waitForPreview(previewProcess) {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    if (previewProcess.exitCode !== null) {
      throw new Error(`Vite preview exited with code ${previewProcess.exitCode}.`);
    }

    if (await previewIsReady()) {
      return;
    }

    await wait(250);
  }

  throw new Error(`Vite preview did not become ready at ${previewUrl}.`);
}

function waitForExit(child, timeout) {
  if (child.exitCode !== null) {
    return Promise.resolve(true);
  }

  return new Promise((resolve) => {
    const timeoutId = setTimeout(() => {
      child.off("exit", handleExit);
      resolve(false);
    }, timeout);
    const handleExit = () => {
      clearTimeout(timeoutId);
      resolve(true);
    };

    child.once("exit", handleExit);
  });
}

async function stopPreview(previewProcess) {
  if (previewProcess.exitCode !== null) {
    return;
  }

  previewProcess.kill("SIGTERM");

  if (!(await waitForExit(previewProcess, 5_000))) {
    previewProcess.kill("SIGKILL");
    await waitForExit(previewProcess, 5_000);
  }
}

async function runPreviewTests(testPattern, env) {
  if (await previewIsReady()) {
    throw new Error(`${previewUrl} is already in use.`);
  }

  const previewProcess = spawn(
    process.execPath,
    [
      viteCli,
      "preview",
      "--host",
      previewHost,
      "--port",
      String(previewPort),
      "--strictPort",
    ],
    {
      env,
      stdio: "inherit",
    },
  );

  try {
    await waitForPreview(previewProcess);
    await run(
      process.execPath,
      [playwrightCli, "test", "--grep", testPattern],
      env,
    );
  } finally {
    await stopPreview(previewProcess);
  }
}

if (!process.env.npm_execpath) {
  throw new Error("npm_execpath is required. Run this helper through npm run qa:analytics.");
}

await run(process.execPath, [process.env.npm_execpath, "run", "build"], blockedHostAnalyticsEnv);
await runPreviewTests(
  "analytics providers stay blocked on unallowed configured hosts",
  blockedHostAnalyticsEnv,
);

await run(process.execPath, [process.env.npm_execpath, "run", "build"], allowedHostAnalyticsEnv);
await runPreviewTests(
  "Google Analytics sends route-change page views when enabled|confirmed enquiry submissions emit conversion analytics|Google Analytics contact-intent events contain no visitor data|Microsoft Clarity loads when configured|first-party visit recorder records SPA route changes and refreshes in the active visit|first-party visit recorder recognizes a return visit and rotates an expired browser ID|private analytics routes do not record or load analytics providers|private analytics routes force a clean document after an SPA transition|private analytics dashboard renders stored reports and complete visitor history",
  allowedHostAnalyticsEnv,
);
