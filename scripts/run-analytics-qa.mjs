import { spawn } from "node:child_process";
import path from "node:path";

const baseAnalyticsEnv = {
  ...process.env,
  VITE_ANALYTICS_ENABLED: "true",
  VITE_CLARITY_PROJECT_ID: "testclarity1",
  VITE_GA_MEASUREMENT_ID: "G-TEST12345",
};
const blockedHostAnalyticsEnv = {
  ...baseAnalyticsEnv,
  VITE_ANALYTICS_ALLOWED_HOSTS: "",
};
const allowedHostAnalyticsEnv = {
  ...baseAnalyticsEnv,
  VITE_ANALYTICS_ALLOWED_HOSTS: "127.0.0.1",
};
const startServerAndTestScript = path.join("node_modules", "start-server-and-test", "src", "bin", "start.js");

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

if (!process.env.npm_execpath) {
  throw new Error("npm_execpath is required. Run this helper through npm run qa:analytics.");
}

await run(process.execPath, [process.env.npm_execpath, "run", "build"], blockedHostAnalyticsEnv);
await run(
  process.execPath,
  [
    startServerAndTestScript,
    "preview:qa",
    "http://127.0.0.1:4287",
    "playwright test --grep \"analytics providers stay blocked on unallowed configured hosts\"",
  ],
  blockedHostAnalyticsEnv,
);

await run(process.execPath, [process.env.npm_execpath, "run", "build"], allowedHostAnalyticsEnv);
await run(process.execPath, [
  startServerAndTestScript,
  "preview:qa",
  "http://127.0.0.1:4287",
  "playwright test --grep \"Google Analytics sends route-change page views when enabled|confirmed enquiry submissions emit conversion analytics|anonymous contact-intent events contain no visitor data|Microsoft Clarity loads when configured\"",
], allowedHostAnalyticsEnv);
