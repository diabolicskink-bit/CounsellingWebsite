import { existsSync, readFileSync } from "node:fs";
import { spawn } from "node:child_process";

const url = process.argv[2] ?? "http://127.0.0.1:4287";
const reportBase = "lighthouse-report";
const reportJson = `${reportBase}.report.json`;
const reportHtml = `${reportBase}.report.html`;
const command = process.platform === "win32" ? ".\\node_modules\\.bin\\lighthouse.cmd" : "./node_modules/.bin/lighthouse";
const args = [
  url,
  "--quiet",
  "--preset=desktop",
  "--only-categories=performance,accessibility,best-practices,seo",
  "--output=html",
  "--output=json",
  `--output-path=./${reportBase}`,
];

function quoteForShell(value) {
  return `"${value.replaceAll('"', '\\"')}"`;
}

const child = process.platform === "win32"
  ? spawn([command, ...args].map(quoteForShell).join(" "), {
    shell: true,
    stdio: ["ignore", "pipe", "pipe"],
  })
  : spawn(command, args, {
    shell: false,
    stdio: ["ignore", "pipe", "pipe"],
  });

let combinedOutput = "";

child.stdout.on("data", (chunk) => {
  combinedOutput += chunk.toString();
});

child.stderr.on("data", (chunk) => {
  combinedOutput += chunk.toString();
});

child.on("close", (code) => {
  const reportsExist = existsSync(reportJson) && existsSync(reportHtml);
  const isWindowsTempCleanupError =
    process.platform === "win32" &&
    combinedOutput.includes("EPERM") &&
    combinedOutput.includes("lighthouse.") &&
    reportsExist;

  if (code !== 0 && !isWindowsTempCleanupError) {
    process.stderr.write(combinedOutput);
    process.exit(code ?? 1);
  }

  if (isWindowsTempCleanupError) {
    console.warn("Lighthouse reports were written; ignoring Windows temp cleanup EPERM after Chrome exit.");
  }

  const report = JSON.parse(readFileSync(reportJson, "utf8"));
  const scores = Object.entries(report.categories)
    .map(([key, category]) => `${key}: ${Math.round(category.score * 100)}`)
    .join(", ");

  console.log(`Lighthouse scores - ${scores}`);
  console.log(`Reports: ${reportHtml}, ${reportJson}`);
});
