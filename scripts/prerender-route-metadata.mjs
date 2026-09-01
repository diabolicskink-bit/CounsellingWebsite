import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { getSiteOrigin } from "./route-metadata-origin.mjs";
import {
  getAbsoluteUrl,
  getAssetUrl,
  renderRouteStructuredDataTag,
  validateIsoDate,
} from "./route-structured-data.mjs";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(rootDir, "dist");
const indexPath = path.join(distDir, "index.html");
const metadataPath = path.join(rootDir, "src", "data", "routeMetadata.json");
const serverEntryPath = path.join(rootDir, ".prerender", "server", "entry-server.js");
const metadataBlockStart = "<!-- Document metadata -->";
const metadataBlockEnd = "<!-- /Document metadata -->";
const privateShellRoutePaths = [
  "/analytics",
  "/analytics/enquiries",
  "/analytics/excluded",
  "/analytics/keywords",
  "/analytics/pages",
];
const publicRouteContracts = {
  "/": {
    expectedMainClass: "site-page home-page",
    structuredDataType: "home",
  },
  "/working-with-joel": {
    expectedMainClass: "site-page working-with-joel-page",
    structuredDataType: "profile",
  },
  "/inclusive-counselling": {
    expectedMainClass: "site-page inclusion-hub-page",
    structuredDataType: null,
  },
  "/kink-bdsm-counselling": {
    expectedMainClass: "site-page kink-page",
    structuredDataType: "specialist-service",
  },
  "/polyamory-enm-counselling": {
    expectedMainClass: "site-page enm-page",
    structuredDataType: "specialist-service",
  },
  "/lgbtqia-affirming-counselling": {
    expectedMainClass: "site-page lgbtqia-page",
    structuredDataType: "specialist-service",
  },
  "/blog": {
    expectedMainClass: "site-page blog-index",
    structuredDataType: "collection",
  },
  "/crisis-support": {
    expectedMainClass: "site-page crisis-support-page",
    structuredDataType: "crisis-support",
  },
  "/contact": {
    expectedMainClass: "site-page contact-page",
    structuredDataType: null,
  },
  "/privacy-policy": {
    expectedMainClass: "site-page privacy-policy-page",
    structuredDataType: null,
  },
};
const faviconTags = [
  '<link rel="icon" href="/favicon.ico" sizes="any" />',
  '<link rel="icon" href="/favicon.svg" type="image/svg+xml" />',
  '<link rel="icon" href="/icon-192.png" sizes="192x192" type="image/png" />',
  '<link rel="apple-touch-icon" href="/apple-touch-icon.png" />',
  '<link rel="manifest" href="/site.webmanifest" />',
];

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

function renderDocumentMetadata(tags, siteMetadata) {
  return [
    metadataBlockStart,
    ...tags,
    ...faviconTags,
    `<meta name="theme-color" content="${escapeHtml(siteMetadata.themeColor)}" />`,
    metadataBlockEnd,
  ].join("\n    ");
}

function renderPublicDocumentMetadata(
  routePath,
  routeMetadata,
  routeContract,
  siteMetadata,
  siteOrigin,
) {
  const pageUrl = getAbsoluteUrl(siteOrigin, routePath);
  const imageUrl = getAssetUrl(siteOrigin, siteMetadata.socialImage);
  const structuredDataTag = renderRouteStructuredDataTag({
    routeMetadata,
    routePath,
    siteMetadata,
    siteOrigin,
    structuredDataType: routeContract.structuredDataType,
  });
  const isArticle = routeMetadata.pageType === "article";
  const articleMetadataTags = isArticle
    ? [
        `<meta property="article:published_time" content="${escapeHtml(routeMetadata.publishedAt)}" />`,
        `<meta property="article:modified_time" content="${escapeHtml(
          routeMetadata.modifiedAt ?? routeMetadata.publishedAt,
        )}" />`,
        `<meta property="article:section" content="${escapeHtml(routeMetadata.articleSection)}" />`,
      ]
    : [];

  return renderDocumentMetadata(
    [
      `<title>${escapeHtml(routeMetadata.title)}</title>`,
      `<meta name="description" content="${escapeHtml(routeMetadata.description)}" />`,
      ...(routeMetadata.robots
        ? [`<meta name="robots" content="${escapeHtml(routeMetadata.robots)}" />`]
        : []),
      `<link rel="canonical" href="${escapeHtml(pageUrl)}" />`,
      `<meta property="og:site_name" content="${escapeHtml(siteMetadata.name)}" />`,
      `<meta property="og:type" content="${isArticle ? "article" : "website"}" />`,
      `<meta property="og:url" content="${escapeHtml(pageUrl)}" />`,
      `<meta property="og:title" content="${escapeHtml(routeMetadata.title)}" />`,
      `<meta property="og:description" content="${escapeHtml(routeMetadata.description)}" />`,
      `<meta property="og:image" content="${escapeHtml(imageUrl)}" />`,
      '<meta property="og:image:width" content="1200" />',
      '<meta property="og:image:height" content="630" />',
      `<meta property="og:image:alt" content="${escapeHtml(siteMetadata.socialImageAlt)}" />`,
      ...articleMetadataTags,
      '<meta name="twitter:card" content="summary_large_image" />',
      `<meta name="twitter:title" content="${escapeHtml(routeMetadata.title)}" />`,
      `<meta name="twitter:description" content="${escapeHtml(routeMetadata.description)}" />`,
      `<meta name="twitter:image" content="${escapeHtml(imageUrl)}" />`,
      `<meta name="twitter:image:alt" content="${escapeHtml(siteMetadata.socialImageAlt)}" />`,
      ...(structuredDataTag ? [structuredDataTag] : []),
    ],
    siteMetadata,
  );
}

function replaceDocumentMetadata(html, documentMetadata) {
  const startCount = html.split(metadataBlockStart).length - 1;
  const endCount = html.split(metadataBlockEnd).length - 1;
  const blockStartIndex = html.indexOf(metadataBlockStart);
  const blockEndIndex = html.indexOf(metadataBlockEnd, blockStartIndex);

  if (startCount !== 1 || endCount !== 1 || blockEndIndex < blockStartIndex) {
    throw new Error(
      "HTML template must contain exactly one complete document metadata block.",
    );
  }

  return [
    html.slice(0, blockStartIndex),
    documentMetadata,
    html.slice(blockEndIndex + metadataBlockEnd.length),
  ].join("");
}

function replaceEmptyRoot(html, replacement, purpose) {
  const emptyRoot = '<div id="root"></div>';

  if (!html.includes(emptyRoot)) {
    throw new Error(`Unable to find the empty root element while ${purpose}.`);
  }

  return html.replace(emptyRoot, () => replacement);
}

function applyRenderedRouteRoot(html, renderedMarkup, routePath, prerenderedAt) {
  const renderedRoot = `<div id="root" data-render-mode="prerendered" data-prerendered-path="${escapeHtml(
    routePath,
  )}" data-prerendered-at="${escapeHtml(prerenderedAt)}">${renderedMarkup}</div>`;

  return replaceEmptyRoot(html, renderedRoot, "inserting the prerendered route markup");
}

function assertRenderedRouteMarkup(renderedMarkup, routePath, routeContract) {
  const expectedFragments = [
    '<header class="site-header">',
    `<main class="${routeContract.expectedMainClass}">`,
    '<footer class="site-footer">',
  ];

  for (const fragment of expectedFragments) {
    if (!renderedMarkup.includes(fragment)) {
      throw new Error(
        `Static render smoke check for ${routePath} is missing expected content: ${fragment}`,
      );
    }
  }

  const headings = [...renderedMarkup.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)];

  if (headings.length !== 1) {
    throw new Error(
      `Static render smoke check for ${routePath} expected one h1, found ${headings.length}.`,
    );
  }

  const headingText = headings[0][1]
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!headingText) {
    throw new Error(`Static render smoke check for ${routePath} found an empty h1.`);
  }

  if (
    renderedMarkup.includes("not-found-page") ||
    renderedMarkup.includes("data-not-found-fallback") ||
    renderedMarkup.includes("data-static-route-shell")
  ) {
    throw new Error(
      `Static render smoke check for ${routePath} unexpectedly contains fallback markup.`,
    );
  }
}

function renderNotFoundDocumentMetadata(notFoundMetadata, siteMetadata) {
  return renderDocumentMetadata(
    [
      `<title>${escapeHtml(notFoundMetadata.title)}</title>`,
      `<meta name="description" content="${escapeHtml(notFoundMetadata.description)}" />`,
      `<meta name="robots" content="${escapeHtml(notFoundMetadata.robots)}" />`,
    ],
    siteMetadata,
  );
}

function getPrivateShellMetadata(siteMetadata) {
  return {
    title: `Analytics | ${siteMetadata.name}`,
    description: `Private first-party visit analytics for ${siteMetadata.name}.`,
    robots: "noindex, nofollow",
  };
}

function renderPrivateDocumentMetadata(privateMetadata, siteMetadata) {
  return renderDocumentMetadata(
    [
      `<title>${escapeHtml(privateMetadata.title)}</title>`,
      `<meta name="description" content="${escapeHtml(privateMetadata.description)}" />`,
      `<meta name="robots" content="${escapeHtml(privateMetadata.robots)}" />`,
    ],
    siteMetadata,
  );
}

function assertPrivateRouteShell(html, privateMetadata) {
  const expectedFragments = [
    `<title>${escapeHtml(privateMetadata.title)}</title>`,
    `<meta name="description" content="${escapeHtml(privateMetadata.description)}" />`,
    `<meta name="robots" content="${escapeHtml(privateMetadata.robots)}" />`,
    '<div id="root"></div>',
    'script type="module"',
    "/assets/",
  ];

  for (const fragment of expectedFragments) {
    if (!html.includes(fragment)) {
      throw new Error(`Private analytics shell is missing expected content: ${fragment}`);
    }
  }

  if (
    html.includes('<link rel="canonical"')
    || html.includes('data-render-mode="prerendered"')
  ) {
    throw new Error("Private analytics shell unexpectedly contains public-route metadata.");
  }
}

function applyNotFoundFallbackRoot(html, notFoundMetadata, prerenderedAt) {
  const fallbackMarkup = [
    '<main data-not-found-fallback="true">',
    `  <h1>${escapeHtml(notFoundMetadata.heading)}</h1>`,
    `  <p>${escapeHtml(notFoundMetadata.description)}</p>`,
    "</main>",
  ].join("\n      ");
  const fallbackRoot = `<div id="root" data-prerendered-at="${escapeHtml(
    prerenderedAt,
  )}">\n      ${fallbackMarkup}\n    </div>`;

  return replaceEmptyRoot(html, fallbackRoot, "adding the generic 404 fallback");
}

function assertNotFoundFallback(html, notFoundMetadata, prerenderedAt) {
  const expectedFragments = [
    `<title>${escapeHtml(notFoundMetadata.title)}</title>`,
    `<meta name="robots" content="${escapeHtml(notFoundMetadata.robots)}" />`,
    `<div id="root" data-prerendered-at="${escapeHtml(prerenderedAt)}">`,
    '<main data-not-found-fallback="true">',
    `<h1>${escapeHtml(notFoundMetadata.heading)}</h1>`,
    `<p>${escapeHtml(notFoundMetadata.description)}</p>`,
    'script type="module"',
    "/assets/",
  ];

  for (const fragment of expectedFragments) {
    if (!html.includes(fragment)) {
      throw new Error(`404 fallback smoke check is missing expected content: ${fragment}`);
    }
  }

  if (
    html.includes('data-render-mode="prerendered"') ||
    html.includes("data-prerendered-path=") ||
    html.includes('<link rel="canonical"') ||
    html.includes("data-static-route-shell") ||
    html.includes("Static route shell generated at build time")
  ) {
    throw new Error(
      "404 fallback smoke check found prerender metadata or retired public-shell markup.",
    );
  }
}

function getRouteOutputPaths(routePath) {
  if (routePath === "/") {
    return [indexPath];
  }

  const routeFilePath = path.join(distDir, `${routePath.slice(1)}.html`);
  const routeIndexPath = path.join(distDir, routePath.slice(1), "index.html");

  return [routeFilePath, routeIndexPath];
}

function getPublicRouteEntries(routes) {
  const routeEntries = Object.entries(routes);

  for (const [routePath, routeMetadata] of routeEntries) {
    const isBlogArticle = routePath.startsWith("/blog/")
      && routeMetadata.pageType === "article";

    if (!Object.hasOwn(publicRouteContracts, routePath) && !isBlogArticle) {
      throw new Error(`Metadata route is missing its prerender contract: ${routePath}`);
    }
  }

  for (const routePath of Object.keys(publicRouteContracts)) {
    if (!Object.hasOwn(routes, routePath)) {
      throw new Error(`Prerendered route is missing from route metadata: ${routePath}`);
    }
  }

  return routeEntries.map(([routePath, routeMetadata]) => {
    const routeContract = publicRouteContracts[routePath]
      ?? {
        expectedMainClass: "site-page blog-article",
        structuredDataType: "article",
      };

    return { routeContract, routeMetadata, routePath };
  });
}

function renderSitemapEntries(publicRoutes, siteOrigin) {
  return publicRoutes
    .filter(({ routeMetadata }) => !routeMetadata.robots)
    .map(({ routeMetadata, routePath }) => {
      const lastModified = routeMetadata.lastModified;

      if (lastModified) {
        validateIsoDate(lastModified, `Indexable route lastModified (${routePath})`);
      }

      const lastModifiedElement = lastModified
        ? `<lastmod>${escapeXml(lastModified)}</lastmod>`
        : "";

      const routeUrl = escapeXml(getAbsoluteUrl(siteOrigin, routePath));

      return `  <url><loc>${routeUrl}</loc>${lastModifiedElement}</url>`;
    });
}

async function writeOutputFile(outputPath, contents) {
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, contents);
}

const [templateHtml, metadataJson] = await Promise.all([
  readFile(indexPath, "utf8"),
  readFile(metadataPath, "utf8"),
]);

const { notFound: notFoundMetadata, routes: baseRoutes, site } = JSON.parse(metadataJson);
const siteOrigin = getSiteOrigin(site);
const prerenderedAt = new Date().toISOString();

process.env.NODE_ENV = "production";
const serverEntry = await import(pathToFileURL(serverEntryPath).href);

if (typeof serverEntry.renderRoute !== "function") {
  throw new Error(`Server render bundle does not export renderRoute: ${serverEntryPath}`);
}

const additionalRoutes = typeof serverEntry.getAdditionalPrerenderRouteMetadata === "function"
  ? serverEntry.getAdditionalPrerenderRouteMetadata()
  : {};
const routes = { ...baseRoutes, ...additionalRoutes };
const publicRoutes = getPublicRouteEntries(routes);
const sitemapEntries = renderSitemapEntries(publicRoutes, siteOrigin);

const publicRouteOutputs = publicRoutes.flatMap(({
  routeContract,
  routeMetadata,
  routePath,
}) => {
  const renderedMarkup = serverEntry.renderRoute(routePath, {
    initialRenderAt: prerenderedAt,
  });

  assertRenderedRouteMarkup(renderedMarkup, routePath, routeContract);

  const routeTemplate = replaceDocumentMetadata(
    templateHtml,
    renderPublicDocumentMetadata(
      routePath,
      routeMetadata,
      routeContract,
      site,
      siteOrigin,
    ),
  );
  const routeHtml = applyRenderedRouteRoot(
    routeTemplate,
    renderedMarkup,
    routePath,
    prerenderedAt,
  );

  return getRouteOutputPaths(routePath).map((outputPath) => ({
    contents: routeHtml,
    outputPath,
  }));
});

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

const privateMetadata = getPrivateShellMetadata(site);
const notFoundHtml = applyNotFoundFallbackRoot(
  replaceDocumentMetadata(
    templateHtml,
    renderNotFoundDocumentMetadata(notFoundMetadata, site),
  ),
  notFoundMetadata,
  prerenderedAt,
);
const privateRouteHtml = replaceDocumentMetadata(
  templateHtml,
  renderPrivateDocumentMetadata(privateMetadata, site),
);

assertNotFoundFallback(notFoundHtml, notFoundMetadata, prerenderedAt);
assertPrivateRouteShell(privateRouteHtml, privateMetadata);

const outputFiles = [
  ...publicRouteOutputs,
  { contents: notFoundHtml, outputPath: path.join(distDir, "404.html") },
  { contents: sitemapXml, outputPath: path.join(distDir, "sitemap.xml") },
  { contents: robotsTxt, outputPath: path.join(distDir, "robots.txt") },
  ...privateShellRoutePaths.flatMap((privateRoutePath) => (
    getRouteOutputPaths(privateRoutePath).map((outputPath) => ({
      contents: privateRouteHtml,
      outputPath,
    }))
  )),
];

await Promise.all(
  outputFiles.map(({ contents, outputPath }) => writeOutputFile(outputPath, contents)),
);

const buildSummary = `Prerendered ${publicRoutes.length} public routes`
  + ` and generated ${privateShellRoutePaths.length} private route shells.`;

console.log(buildSummary);
