import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = process.cwd();

const ignoredDirectories = new Set([
  ".agents",
  ".claude",
  ".git",
  ".vercel",
  ".vite",
  "dist",
  "node_modules",
  "playwright-report",
  "test-results",
]);

const ignoredFilePrefixes = ["lighthouse-report."];

const textExtensions = new Set([
  ".css",
  ".html",
  ".js",
  ".json",
  ".md",
  ".mjs",
  ".svg",
  ".ts",
  ".tsx",
  ".txt",
  ".webmanifest",
  ".xml",
  ".yaml",
  ".yml",
]);

const extraTextFiles = new Set([
  ".env.example",
  ".gitignore",
  "AGENTS.md",
  "vercel.json",
]);

const markers = [
  { label: "latin-1 decoded UTF-8 marker", pattern: /[\u00c2\u00c3]/g },
  { label: "windows-1252 decoded UTF-8 marker", pattern: /\u00e2/g },
  { label: "replacement character", pattern: /\ufffd/g },
  { label: "replacement character mojibake", pattern: /\u00ef\u00bf\u00bd/g },
  { label: "emoji mojibake marker", pattern: /\u00f0\u0178/g },
];

function isTextFile(filePath) {
  const name = path.basename(filePath);

  if (ignoredFilePrefixes.some((prefix) => name.startsWith(prefix))) {
    return false;
  }

  return extraTextFiles.has(name) || textExtensions.has(path.extname(name).toLowerCase());
}

async function collectTextFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (ignoredDirectories.has(entry.name)) {
        continue;
      }

      files.push(...await collectTextFiles(path.join(directory, entry.name)));
      continue;
    }

    if (entry.isFile()) {
      const filePath = path.join(directory, entry.name);

      if (isTextFile(filePath)) {
        files.push(filePath);
      }
    }
  }

  return files;
}

function getLineAndColumn(text, index) {
  const preceding = text.slice(0, index);
  const line = preceding.split(/\r\n|\r|\n/).length;
  const lastLineBreak = Math.max(preceding.lastIndexOf("\n"), preceding.lastIndexOf("\r"));
  const column = index - lastLineBreak;

  return { line, column };
}

function getLineText(text, index) {
  const start = Math.max(text.lastIndexOf("\n", index), text.lastIndexOf("\r", index)) + 1;
  let end = text.indexOf("\n", index);

  if (end === -1) {
    end = text.length;
  }

  return text.slice(start, end).trim();
}

const findings = [];

for (const filePath of await collectTextFiles(root)) {
  const text = await readFile(filePath, "utf8");

  for (const marker of markers) {
    marker.pattern.lastIndex = 0;
    const match = marker.pattern.exec(text);

    if (match) {
      const { line, column } = getLineAndColumn(text, match.index);
      findings.push({
        file: path.relative(root, filePath),
        line,
        column,
        label: marker.label,
        snippet: getLineText(text, match.index),
      });
    }
  }
}

if (findings.length > 0) {
  console.error("Potential mojibake markers found:");

  for (const finding of findings) {
    console.error(`- ${finding.file}:${finding.line}:${finding.column} (${finding.label})`);
    console.error(`  ${finding.snippet}`);
  }

  process.exit(1);
}

console.log("No mojibake markers found.");
