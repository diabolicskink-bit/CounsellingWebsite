import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(rootDir, "dist");
const indexPath = path.join(distDir, "index.html");
const metadataPath = path.join(rootDir, "src", "data", "routeMetadata.json");

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function applyMetadata(html, routeMetadata) {
  const title = `<title>${escapeHtml(routeMetadata.title)}</title>`;
  const description = `<meta name="description" content="${escapeHtml(routeMetadata.description)}" />`;

  return html
    .replace(/<title>.*?<\/title>/s, title)
    .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/s, description);
}

function getRouteOutputPaths(routePath) {
  if (routePath === "/") {
    return [indexPath];
  }

  const routeFilePath = path.join(distDir, `${routePath.slice(1)}.html`);
  const routeIndexPath = path.join(distDir, routePath.slice(1), "index.html");

  return [routeFilePath, routeIndexPath];
}

const [templateHtml, metadataJson] = await Promise.all([
  readFile(indexPath, "utf8"),
  readFile(metadataPath, "utf8"),
]);

const { routes } = JSON.parse(metadataJson);

for (const [routePath, routeMetadata] of Object.entries(routes)) {
  const routeHtml = applyMetadata(templateHtml, routeMetadata);

  for (const outputPath of getRouteOutputPaths(routePath)) {
    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, routeHtml);
  }
}

console.log(`Prerendered metadata for ${Object.keys(routes).length} public routes.`);
