import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const productionEnvFiles = [".env", ".env.local", ".env.production", ".env.production.local"];
const gaMeasurementIdPattern = /^G-[A-Z0-9]{6,}$/;

function stripOptionalQuotes(value) {
  const trimmedValue = value.trim();
  const firstCharacter = trimmedValue[0];
  const lastCharacter = trimmedValue[trimmedValue.length - 1];

  if (
    trimmedValue.length >= 2 &&
    ((firstCharacter === '"' && lastCharacter === '"') || (firstCharacter === "'" && lastCharacter === "'"))
  ) {
    return trimmedValue.slice(1, -1);
  }

  return trimmedValue;
}

function parseEnvFile(filePath) {
  const env = {};

  if (!existsSync(filePath)) {
    return env;
  }

  for (const rawLine of readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const line = rawLine.trim();

    if (!line || line.startsWith("#")) {
      continue;
    }

    const normalizedLine = line.startsWith("export ") ? line.slice("export ".length).trim() : line;
    const delimiterIndex = normalizedLine.indexOf("=");

    if (delimiterIndex === -1) {
      continue;
    }

    const key = normalizedLine.slice(0, delimiterIndex).trim();
    const value = stripOptionalQuotes(normalizedLine.slice(delimiterIndex + 1));

    if (key) {
      env[key] = value;
    }
  }

  return env;
}

const fileEnv = productionEnvFiles.reduce(
  (env, fileName) => ({
    ...env,
    ...parseEnvFile(path.join(rootDir, fileName)),
  }),
  {},
);
const env = { ...fileEnv, ...process.env };
const analyticsEnabled = env.VITE_ANALYTICS_ENABLED === "true";
const gaMeasurementId = env.VITE_GA_MEASUREMENT_ID?.trim() ?? "";

if (!analyticsEnabled) {
  console.log("Analytics preflight: disabled.");
  process.exit(0);
}

if (!gaMeasurementId) {
  console.error("Analytics preflight failed: VITE_GA_MEASUREMENT_ID is required when VITE_ANALYTICS_ENABLED=true.");
  process.exit(1);
}

if (!gaMeasurementIdPattern.test(gaMeasurementId)) {
  console.error("Analytics preflight failed: VITE_GA_MEASUREMENT_ID must look like G-XXXXXXXXXX.");
  process.exit(1);
}

console.log("Analytics preflight: enabled.");
