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

function escapeXml(value) {
  return escapeHtml(value).replaceAll("'", "&apos;");
}

function normalizeSiteOrigin(rawOrigin) {
  const withProtocol = rawOrigin.includes("://") ? rawOrigin : `https://${rawOrigin}`;
  const url = new URL(withProtocol);

  return url.origin;
}

function getSiteOrigin(siteMetadata) {
  if (process.env.SITE_URL) {
    return normalizeSiteOrigin(process.env.SITE_URL);
  }

  if (process.env.VERCEL_URL) {
    if (process.env.VERCEL_ENV === "production") {
      console.warn("TODO: Set SITE_URL to the canonical production domain. Using VERCEL_URL for this build.");
    }

    return normalizeSiteOrigin(process.env.VERCEL_URL);
  }

  return normalizeSiteOrigin(siteMetadata.defaultOrigin);
}

function getAbsoluteUrl(siteOrigin, routePath) {
  return routePath === "/" ? `${siteOrigin}/` : `${siteOrigin}${routePath}`;
}

function getAssetUrl(siteOrigin, assetPath) {
  return `${siteOrigin}${assetPath.startsWith("/") ? assetPath : `/${assetPath}`}`;
}

function getSeoTags(routePath, routeMetadata, siteMetadata, siteOrigin) {
  const pageUrl = getAbsoluteUrl(siteOrigin, routePath);
  const imageUrl = getAssetUrl(siteOrigin, siteMetadata.socialImage);
  const title = `<title>${escapeHtml(routeMetadata.title)}</title>`;
  const description = `<meta name="description" content="${escapeHtml(routeMetadata.description)}" />`;

  return [
    "<!-- SEO metadata generated at build time -->",
    title,
    description,
    `<link rel="canonical" href="${escapeHtml(pageUrl)}" />`,
    `<meta property="og:site_name" content="${escapeHtml(siteMetadata.name)}" />`,
    '<meta property="og:type" content="website" />',
    `<meta property="og:url" content="${escapeHtml(pageUrl)}" />`,
    `<meta property="og:title" content="${escapeHtml(routeMetadata.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(routeMetadata.description)}" />`,
    `<meta property="og:image" content="${escapeHtml(imageUrl)}" />`,
    '<meta property="og:image:width" content="1200" />',
    '<meta property="og:image:height" content="630" />',
    `<meta property="og:image:alt" content="${escapeHtml(siteMetadata.socialImageAlt)}" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${escapeHtml(routeMetadata.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(routeMetadata.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(imageUrl)}" />`,
    `<meta name="twitter:image:alt" content="${escapeHtml(siteMetadata.socialImageAlt)}" />`,
    '<link rel="icon" href="/favicon.svg" type="image/svg+xml" />',
    '<link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />',
    '<link rel="apple-touch-icon" href="/apple-touch-icon.png" />',
    '<link rel="manifest" href="/site.webmanifest" />',
    `<meta name="theme-color" content="${escapeHtml(siteMetadata.themeColor)}" />`,
    "<!-- /SEO metadata generated at build time -->",
  ].join("\n    ");
}

function applyMetadata(html, routePath, routeMetadata, siteMetadata, siteOrigin) {
  const seoTags = getSeoTags(routePath, routeMetadata, siteMetadata, siteOrigin);

  return html
    .replace(/\s*<!-- SEO metadata generated at build time -->.*?<!-- \/SEO metadata generated at build time -->/s, "")
    .replace(/\s*<title>.*?<\/title>/s, "")
    .replace(/\s*<meta\s+name="description"\s+content="[^"]*"\s*\/?>/s, "")
    .replace("</head>", `    ${seoTags}\n  </head>`);
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

const { routes, site } = JSON.parse(metadataJson);
const siteOrigin = getSiteOrigin(site);

for (const [routePath, routeMetadata] of Object.entries(routes)) {
  const routeHtml = applyMetadata(templateHtml, routePath, routeMetadata, site, siteOrigin);

  for (const outputPath of getRouteOutputPaths(routePath)) {
    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, routeHtml);
  }
}

const sitemapXml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...Object.keys(routes).map((routePath) => `  <url><loc>${escapeXml(getAbsoluteUrl(siteOrigin, routePath))}</loc></url>`),
  "</urlset>",
  "",
].join("\n");

const robotsTxt = [
  "User-agent: *",
  "Allow: /",
  "",
  `Sitemap: ${getAssetUrl(siteOrigin, "/sitemap.xml")}`,
  "",
].join("\n");

await Promise.all([
  writeFile(path.join(distDir, "sitemap.xml"), sitemapXml),
  writeFile(path.join(distDir, "robots.txt"), robotsTxt),
]);

console.log(`Prerendered metadata for ${Object.keys(routes).length} public routes.`);
