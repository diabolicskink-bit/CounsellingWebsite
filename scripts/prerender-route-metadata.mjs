import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getSiteOrigin } from "./route-metadata-origin.mjs";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(rootDir, "dist");
const indexPath = path.join(distDir, "index.html");
const metadataPath = path.join(rootDir, "src", "data", "routeMetadata.json");
const noindexDirective = "noindex, nofollow";
const indexableRoutePaths = ["/", "/working-with-joel", "/inclusion", "/contact"];
const staticShellStart = "<!-- Static route shell generated at build time -->";
const staticShellEnd = "<!-- /Static route shell generated at build time -->";
const staticShellRootPattern =
  /<div id="root">\s*<!-- Static route shell generated at build time -->.*?<!-- \/Static route shell generated at build time -->\s*<\/div>/s;
const notFoundFallback = {
  h1: "That page isn't here.",
  description: "This page could not be found on the Vive Counselling website.",
};

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

function escapeJsonForHtml(value) {
  return value.replaceAll("<", "\\u003c");
}

function getAbsoluteUrl(siteOrigin, routePath) {
  return routePath === "/" ? `${siteOrigin}/` : `${siteOrigin}${routePath}`;
}

function getAssetUrl(siteOrigin, assetPath) {
  return `${siteOrigin}${assetPath.startsWith("/") ? assetPath : `/${assetPath}`}`;
}

function getFaviconTags() {
  return [
    '<link rel="icon" href="/favicon.ico" sizes="any" />',
    '<link rel="icon" href="/favicon.svg" type="image/svg+xml" />',
    '<link rel="icon" href="/icon-192.png" sizes="192x192" type="image/png" />',
    '<link rel="apple-touch-icon" href="/apple-touch-icon.png" />',
    '<link rel="manifest" href="/site.webmanifest" />',
  ];
}

function getHomeStructuredDataTag(siteMetadata, siteOrigin) {
  const homepageUrl = getAbsoluteUrl(siteOrigin, "/");
  const websiteId = `${homepageUrl}#website`;
  const organizationId = `${homepageUrl}#organization`;
  const personId = `${homepageUrl}#joel-griffiths`;
  const serviceId = `${homepageUrl}#counselling-service`;
  const organization = siteMetadata.organization;
  const person = siteMetadata.person;
  const service = siteMetadata.service;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: siteMetadata.name,
        url: homepageUrl,
        publisher: { "@id": organizationId },
      },
      {
        "@type": "Organization",
        "@id": organizationId,
        name: siteMetadata.name,
        url: homepageUrl,
        email: organization.email,
        description: organization.description,
        sameAs: organization.sameAs,
        founder: { "@id": personId },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "enquiries",
          email: organization.email,
          availableLanguage: "English",
        },
        logo: {
          "@type": "ImageObject",
          url: getAssetUrl(siteOrigin, organization.logo),
          width: organization.logoWidth,
          height: organization.logoHeight,
        },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: person.name,
        url: getAbsoluteUrl(siteOrigin, person.url),
        image: getAssetUrl(siteOrigin, person.image),
        description: person.description,
        jobTitle: person.jobTitle,
        worksFor: { "@id": organizationId },
        sameAs: person.sameAs,
        hasCredential: person.credentials.map((credential) => ({
          "@type": "EducationalOccupationalCredential",
          name: credential.name,
          credentialCategory: credential.credentialCategory,
          ...(credential.url ? { url: credential.url } : {}),
          recognizedBy: {
            "@type": credential.recognizedBy.type,
            name: credential.recognizedBy.name,
            url: credential.recognizedBy.url,
          },
        })),
      },
      {
        "@type": "Service",
        "@id": serviceId,
        name: service.name,
        serviceType: service.serviceType,
        url: getAbsoluteUrl(siteOrigin, service.url),
        description: service.description,
        provider: { "@id": organizationId },
        audience: {
          "@type": "PeopleAudience",
          audienceType: service.audience,
        },
        areaServed: {
          "@type": "Country",
          name: service.areaServed,
        },
      },
    ],
  };

  return `<script type="application/ld+json">${escapeJsonForHtml(JSON.stringify(structuredData))}</script>`;
}

function getSeoTags(routePath, routeMetadata, siteMetadata, siteOrigin) {
  const pageUrl = getAbsoluteUrl(siteOrigin, routePath);
  const imageUrl = getAssetUrl(siteOrigin, siteMetadata.socialImage);
  const title = `<title>${escapeHtml(routeMetadata.title)}</title>`;
  const description = `<meta name="description" content="${escapeHtml(routeMetadata.description)}" />`;
  const robots = routeMetadata.robots
    ? [`<meta name="robots" content="${escapeHtml(routeMetadata.robots)}" />`]
    : [];
  const structuredData = routePath === "/" ? [getHomeStructuredDataTag(siteMetadata, siteOrigin)] : [];

  return [
    "<!-- SEO metadata generated at build time -->",
    title,
    description,
    ...robots,
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
    ...structuredData,
    ...getFaviconTags(),
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

function getStaticRouteShell(routePath, routeMetadata) {
  if (!routeMetadata.h1?.trim()) {
    throw new Error(`Route is missing static H1 content: ${routePath}`);
  }

  return [
    `<main data-static-route-shell="${escapeHtml(routePath)}">`,
    `  <h1>${escapeHtml(routeMetadata.h1)}</h1>`,
    `  <p>${escapeHtml(routeMetadata.description)}</p>`,
    "</main>",
  ].join("\n      ");
}

function applyStaticRouteShell(html, routePath, routeMetadata) {
  const staticShell = getStaticRouteShell(routePath, routeMetadata);
  const renderedRoot = `<div id="root">\n      ${staticShellStart}\n      ${staticShell}\n      ${staticShellEnd}\n    </div>`;

  if (staticShellRootPattern.test(html)) {
    return html.replace(staticShellRootPattern, renderedRoot);
  }

  if (html.includes('<div id="root"></div>')) {
    return html.replace('<div id="root"></div>', renderedRoot);
  }

  throw new Error(`Unable to find root element while adding static route shell: ${routePath}`);
}

function getNotFoundTags(siteMetadata) {
  return [
    "<!-- SEO metadata generated at build time -->",
    "<title>Page not found | Vive Counselling</title>",
    '<meta name="description" content="This page could not be found on the Vive Counselling website." />',
    `<meta name="robots" content="${escapeHtml(noindexDirective)}" />`,
    ...getFaviconTags(),
    `<meta name="theme-color" content="${escapeHtml(siteMetadata.themeColor)}" />`,
    "<!-- /SEO metadata generated at build time -->",
  ].join("\n    ");
}

function applyNotFoundMetadata(html, siteMetadata) {
  const seoTags = getNotFoundTags(siteMetadata);

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

function getSitemapEntries(routes, siteOrigin) {
  return indexableRoutePaths.map((routePath) => {
    const routeMetadata = routes[routePath];

    if (!routeMetadata) {
      throw new Error(`Indexable route is missing from route metadata: ${routePath}`);
    }

    if (routeMetadata.robots) {
      throw new Error(`Indexable route has robots metadata: ${routePath}`);
    }

    return `  <url><loc>${escapeXml(getAbsoluteUrl(siteOrigin, routePath))}</loc></url>`;
  });
}

const [templateHtml, metadataJson] = await Promise.all([
  readFile(indexPath, "utf8"),
  readFile(metadataPath, "utf8"),
]);

const { routes, site } = JSON.parse(metadataJson);
const siteOrigin = getSiteOrigin(site);
const sitemapEntries = getSitemapEntries(routes, siteOrigin);

for (const [routePath, routeMetadata] of Object.entries(routes)) {
  const routeHtml = applyStaticRouteShell(
    applyMetadata(templateHtml, routePath, routeMetadata, site, siteOrigin),
    routePath,
    routeMetadata,
  );

  for (const outputPath of getRouteOutputPaths(routePath)) {
    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, routeHtml);
  }
}

const sitemapXml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...sitemapEntries,
  "</urlset>",
  "",
].join("\n");

const robotsTxt = [
  "User-agent: *",
  "Allow: /",
  "",
  `Sitemap: ${siteOrigin}/sitemap.xml`,
  "",
].join("\n");

await Promise.all([
  writeFile(
    path.join(distDir, "404.html"),
    applyStaticRouteShell(applyNotFoundMetadata(templateHtml, site), "/404.html", notFoundFallback),
  ),
  writeFile(path.join(distDir, "sitemap.xml"), sitemapXml),
  writeFile(path.join(distDir, "robots.txt"), robotsTxt),
]);

console.log(`Prerendered metadata for ${Object.keys(routes).length} public routes.`);
