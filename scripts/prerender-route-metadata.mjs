import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { getSiteOrigin } from "./route-metadata-origin.mjs";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(rootDir, "dist");
const indexPath = path.join(distDir, "index.html");
const metadataPath = path.join(rootDir, "src", "data", "routeMetadata.json");
const serverEntryPath = path.join(rootDir, ".prerender", "server", "entry-server.js");
const noindexDirective = "noindex, nofollow";
const prerenderedRoutePaths = [
  "/",
  "/working-with-joel",
  "/inclusive-counselling",
  "/kink-bdsm-counselling",
  "/polyamory-enm-counselling",
  "/lgbtqia-affirming-counselling",
  "/contact",
];
const indexableRoutePaths = prerenderedRoutePaths;
const prerenderedRouteSmokeFragments = {
  "/": ['<main class="site-page home-page">', "Counselling and Psychotherapy"],
  "/working-with-joel": [
    '<main class="site-page working-with-joel-page">',
    "Working with Joel",
    'src="/joel-griffiths-working-with-joel-portrait.jpg"',
  ],
  "/inclusive-counselling": [
    '<main class="site-page inclusion-page">',
    "Inclusive counselling",
    'class="inclusion-hub__panels"',
  ],
  "/kink-bdsm-counselling": [
    '<main class="site-page kink-page">',
    "Kink-aware counselling and therapy",
    'class="kink-page__knowledge-grid"',
    'class="site-faq-list"',
  ],
  "/polyamory-enm-counselling": [
    '<main class="site-page enm-page">',
    "Polyamory and ethical non-monogamy counselling and therapy",
    'class="hero-section hero-bg--default enm-page__hero"',
    'class="enm-page__reasons"',
    'class="enm-page__reasons-panel"',
  ],
  "/lgbtqia-affirming-counselling": [
    '<main class="site-page inclusion-page lgbtqia-page">',
    "LGBTQIA+ affirming counselling",
    'class="hero-section hero-bg--default lgbtqia-page__hero"',
    'class="lgbtqia-page__recognition-flow"',
    'class="lgbtqia-page__disclosure-heading"',
  ],
  "/contact": [
    '<main class="site-page contact-page">',
    "Contact and fees",
    'class="site-fee-card contact-page__fee-card"',
    "Mon to Fri, 9.30am to 5.00pm AWST",
    'data-timezone-notes-source="prerendered"',
    'class="site-form"',
    'action="/api/enquiry"',
    'data-clarity-mask="true"',
    'href="mailto:joel@vivecounselling.com.au"',
    'class="site-faq-list"',
  ],
};
const prerenderedRouteSmokeForbiddenFragments = {
  "/contact": [
    'id="contact-timing"',
    'id="contact-state"',
    'id="contact-availability"',
    'id="contact-timezone"',
  ],
};
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

function getStructuredDataIds(siteMetadata, siteOrigin) {
  const homepageUrl = getAbsoluteUrl(siteOrigin, "/");
  const profileUrl = getAbsoluteUrl(siteOrigin, siteMetadata.person.url);

  return {
    homepageUrl,
    organizationId: `${homepageUrl}#organization`,
    personId: `${profileUrl}#joel-griffiths`,
    profilePageId: `${profileUrl}#profile-page`,
    profileUrl,
    serviceId: `${homepageUrl}#counselling-service`,
    websiteId: `${homepageUrl}#website`,
  };
}

function getPersonNode(
  siteMetadata,
  siteOrigin,
  ids,
  { includeCredentials = false, mainEntityOfPage } = {},
) {
  const person = siteMetadata.person;

  return {
    "@type": "Person",
    "@id": ids.personId,
    name: person.name,
    url: ids.profileUrl,
    image: getAssetUrl(siteOrigin, person.image),
    description: person.description,
    jobTitle: person.jobTitle,
    worksFor: { "@id": ids.organizationId },
    sameAs: person.sameAs,
    knowsAbout: person.knowsAbout,
    ...(mainEntityOfPage ? { mainEntityOfPage: { "@id": mainEntityOfPage } } : {}),
    ...(includeCredentials
      ? {
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
        }
      : {}),
  };
}

function getStructuredDataTag(structuredData) {
  return `<script type="application/ld+json">${escapeJsonForHtml(JSON.stringify(structuredData))}</script>`;
}

function getServiceChannelNode(service, siteOrigin) {
  return {
    "@type": "ServiceChannel",
    name: service.deliveryChannel.name,
    serviceUrl: getAbsoluteUrl(siteOrigin, service.deliveryChannel.url),
  };
}

function getServiceOfferNode(service, siteOrigin) {
  return {
    "@type": "Offer",
    name: service.offer.name,
    price: service.offer.price,
    priceCurrency: service.offer.priceCurrency,
    url: getAbsoluteUrl(siteOrigin, service.offer.url),
  };
}

function getServiceNode({
  description,
  id,
  isRelatedTo,
  mainEntityOfPage,
  name,
  organizationId,
  service,
  serviceType,
  siteOrigin,
  url,
}) {
  return {
    "@type": "Service",
    "@id": id,
    name,
    serviceType,
    url,
    description,
    provider: { "@id": organizationId },
    audience: {
      "@type": "PeopleAudience",
      audienceType: service.audience,
    },
    areaServed: {
      "@type": "Country",
      name: service.areaServed,
    },
    availableChannel: getServiceChannelNode(service, siteOrigin),
    offers: getServiceOfferNode(service, siteOrigin),
    ...(mainEntityOfPage ? { mainEntityOfPage: { "@id": mainEntityOfPage } } : {}),
    ...(isRelatedTo ? { isRelatedTo: { "@id": isRelatedTo } } : {}),
  };
}

function getHomeStructuredDataTag(siteMetadata, siteOrigin) {
  const ids = getStructuredDataIds(siteMetadata, siteOrigin);
  const organization = siteMetadata.organization;
  const service = siteMetadata.service;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": ids.websiteId,
        name: siteMetadata.name,
        url: ids.homepageUrl,
        publisher: { "@id": ids.organizationId },
      },
      {
        "@type": "Organization",
        "@id": ids.organizationId,
        name: siteMetadata.name,
        url: ids.homepageUrl,
        email: organization.email,
        description: organization.description,
        sameAs: organization.sameAs,
        founder: { "@id": ids.personId },
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
      getPersonNode(siteMetadata, siteOrigin, ids),
      getServiceNode({
        description: service.description,
        id: ids.serviceId,
        name: service.name,
        organizationId: ids.organizationId,
        service,
        serviceType: service.serviceType,
        siteOrigin,
        url: getAbsoluteUrl(siteOrigin, service.url),
      }),
    ],
  };

  return getStructuredDataTag(structuredData);
}

function getProfileStructuredDataTag(routeMetadata, siteMetadata, siteOrigin) {
  const ids = getStructuredDataIds(siteMetadata, siteOrigin);
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": ids.profilePageId,
        url: ids.profileUrl,
        name: routeMetadata.title,
        isPartOf: { "@id": ids.websiteId },
        mainEntity: { "@id": ids.personId },
      },
      getPersonNode(siteMetadata, siteOrigin, ids, {
        includeCredentials: true,
        mainEntityOfPage: ids.profilePageId,
      }),
    ],
  };

  return getStructuredDataTag(structuredData);
}

function getSpecialistServiceStructuredDataTag(routePath, routeMetadata, siteMetadata, siteOrigin) {
  const ids = getStructuredDataIds(siteMetadata, siteOrigin);
  const service = siteMetadata.service;
  const specialistService = siteMetadata.specialistServices[routePath];
  const pageUrl = getAbsoluteUrl(siteOrigin, routePath);
  const pageId = `${pageUrl}#webpage`;
  const specialistServiceId = `${pageUrl}#service`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": pageId,
        url: pageUrl,
        name: routeMetadata.title,
        description: routeMetadata.description,
        isPartOf: { "@id": ids.websiteId },
        mainEntity: { "@id": specialistServiceId },
      },
      getServiceNode({
        description: routeMetadata.description,
        id: specialistServiceId,
        isRelatedTo: ids.serviceId,
        mainEntityOfPage: pageId,
        name: specialistService.name,
        organizationId: ids.organizationId,
        service,
        serviceType: specialistService.serviceType,
        siteOrigin,
        url: pageUrl,
      }),
    ],
  };

  return getStructuredDataTag(structuredData);
}

function getRouteStructuredDataTags(routePath, routeMetadata, siteMetadata, siteOrigin) {
  if (routePath === "/") {
    return [getHomeStructuredDataTag(siteMetadata, siteOrigin)];
  }

  if (routePath === "/working-with-joel") {
    return [getProfileStructuredDataTag(routeMetadata, siteMetadata, siteOrigin)];
  }

  if (siteMetadata.specialistServices[routePath]) {
    return [getSpecialistServiceStructuredDataTag(routePath, routeMetadata, siteMetadata, siteOrigin)];
  }

  return [];
}

function getSeoTags(routePath, routeMetadata, siteMetadata, siteOrigin) {
  const pageUrl = getAbsoluteUrl(siteOrigin, routePath);
  const imageUrl = getAssetUrl(siteOrigin, siteMetadata.socialImage);
  const title = `<title>${escapeHtml(routeMetadata.title)}</title>`;
  const description = `<meta name="description" content="${escapeHtml(routeMetadata.description)}" />`;
  const robots = routeMetadata.robots
    ? [`<meta name="robots" content="${escapeHtml(routeMetadata.robots)}" />`]
    : [];
  const structuredData = getRouteStructuredDataTags(routePath, routeMetadata, siteMetadata, siteOrigin);

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

function applyRenderedRouteRoot(html, renderedMarkup, routePath, prerenderedAt) {
  const emptyRoot = '<div id="root"></div>';

  if (!html.includes(emptyRoot)) {
    throw new Error("Unable to find the empty root element while validating the static render entry.");
  }

  const renderedRoot = `<div id="root" data-render-mode="prerendered" data-prerendered-path="${escapeHtml(
    routePath,
  )}" data-prerendered-at="${escapeHtml(prerenderedAt)}">${renderedMarkup}</div>`;

  return html.replace(emptyRoot, () => renderedRoot);
}

function assertRenderedRouteSmoke(html, routePath) {
  const routeFragments = prerenderedRouteSmokeFragments[routePath];

  if (!routeFragments) {
    throw new Error(`Prerendered route is missing a smoke-test contract: ${routePath}`);
  }

  const expectedFragments = [
    '<header class="site-header">',
    ...routeFragments,
    '<footer class="site-footer">',
  ];

  for (const fragment of expectedFragments) {
    if (!html.includes(fragment)) {
      throw new Error(`Static render smoke check for ${routePath} is missing expected content: ${fragment}`);
    }
  }

  for (const fragment of prerenderedRouteSmokeForbiddenFragments[routePath] ?? []) {
    if (html.includes(fragment)) {
      throw new Error(`Static render smoke check for ${routePath} contains deferred content: ${fragment}`);
    }
  }

  if (html.includes("data-not-found-fallback") || html.includes("data-static-route-shell")) {
    throw new Error(`Static render smoke check for ${routePath} unexpectedly contains fallback markup.`);
  }
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

function applyNotFoundFallbackRoot(html, prerenderedAt) {
  const emptyRoot = '<div id="root"></div>';

  if (!html.includes(emptyRoot)) {
    throw new Error("Unable to find the empty root element while adding the generic 404 fallback.");
  }

  const fallbackMarkup = [
    '<main data-not-found-fallback="true">',
    `  <h1>${escapeHtml(notFoundFallback.h1)}</h1>`,
    `  <p>${escapeHtml(notFoundFallback.description)}</p>`,
    "</main>",
  ].join("\n      ");
  const fallbackRoot = `<div id="root" data-prerendered-at="${escapeHtml(prerenderedAt)}">\n      ${fallbackMarkup}\n    </div>`;

  return html.replace(emptyRoot, () => fallbackRoot);
}

function assertNotFoundFallback(html, prerenderedAt) {
  const expectedFragments = [
    "<title>Page not found | Vive Counselling</title>",
    `<meta name="robots" content="${noindexDirective}" />`,
    `<div id="root" data-prerendered-at="${escapeHtml(prerenderedAt)}">`,
    '<main data-not-found-fallback="true">',
    "<h1>That page isn't here.</h1>",
    "<p>This page could not be found on the Vive Counselling website.</p>",
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
    throw new Error("404 fallback smoke check found prerender metadata or retired public-shell markup.");
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
const prerenderedAt = new Date().toISOString();

for (const routePath of prerenderedRoutePaths) {
  if (!routes[routePath]) {
    throw new Error(`Prerendered route is missing from route metadata: ${routePath}`);
  }
}

process.env.NODE_ENV = "production";
const serverEntry = await import(pathToFileURL(serverEntryPath).href);

if (typeof serverEntry.renderRoute !== "function") {
  throw new Error(`Server render bundle does not export renderRoute: ${serverEntryPath}`);
}

const renderedRouteMarkup = new Map(
  prerenderedRoutePaths.map((routePath) => [
    routePath,
    serverEntry.renderRoute(routePath, { initialRenderAt: prerenderedAt }),
  ]),
);

for (const [routePath, routeMetadata] of Object.entries(routes)) {
  const routeTemplate = applyMetadata(templateHtml, routePath, routeMetadata, site, siteOrigin);
  const renderedMarkup = renderedRouteMarkup.get(routePath);

  if (!renderedMarkup) {
    throw new Error(`Metadata route is missing from the component prerender set: ${routePath}`);
  }

  const routeHtml = applyRenderedRouteRoot(routeTemplate, renderedMarkup, routePath, prerenderedAt);

  assertRenderedRouteSmoke(routeHtml, routePath);

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

const notFoundHtml = applyNotFoundFallbackRoot(applyNotFoundMetadata(templateHtml, site), prerenderedAt);

assertNotFoundFallback(notFoundHtml, prerenderedAt);

await Promise.all([
  writeFile(path.join(distDir, "404.html"), notFoundHtml),
  writeFile(path.join(distDir, "sitemap.xml"), sitemapXml),
  writeFile(path.join(distDir, "robots.txt"), robotsTxt),
]);

console.log(
  `Prerendered ${prerenderedRoutePaths.length} routes and validated metadata for ${Object.keys(routes).length} public routes.`,
);
