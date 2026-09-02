function escapeJsonForHtml(value) {
  return value.replaceAll("<", "\\u003c");
}

export function getAbsoluteUrl(siteOrigin, routePath) {
  return routePath === "/" ? `${siteOrigin}/` : `${siteOrigin}${routePath}`;
}

export function getAssetUrl(siteOrigin, assetPath) {
  return `${siteOrigin}${assetPath.startsWith("/") ? assetPath : `/${assetPath}`}`;
}

export function validateIsoDate(value, label) {
  if (typeof value !== "string") {
    throw new Error(`${label} must be an ISO date.`);
  }

  const parsedDate = new Date(`${value}T00:00:00.000Z`);
  const normalizedDate = Number.isNaN(parsedDate.valueOf())
    ? ""
    : parsedDate.toISOString().slice(0, 10);

  if (normalizedDate !== value) {
    throw new Error(`${label} must be an ISO date.`);
  }

  return value;
}

function createStructuredDataIds(siteMetadata, siteOrigin) {
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

function createPersonNode(
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

function createServiceNode({
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
    availableChannel: {
      "@type": "ServiceChannel",
      name: service.deliveryChannel.name,
      serviceUrl: getAbsoluteUrl(siteOrigin, service.deliveryChannel.url),
    },
    offers: {
      "@type": "Offer",
      name: service.offer.name,
      price: service.offer.price,
      priceCurrency: service.offer.priceCurrency,
      url: getAbsoluteUrl(siteOrigin, service.offer.url),
    },
    ...(mainEntityOfPage ? { mainEntityOfPage: { "@id": mainEntityOfPage } } : {}),
    ...(isRelatedTo ? { isRelatedTo: { "@id": isRelatedTo } } : {}),
  };
}

function renderStructuredDataTag(structuredData) {
  return `<script type="application/ld+json">${escapeJsonForHtml(JSON.stringify(structuredData))}</script>`;
}

function renderHomeStructuredData(siteMetadata, siteOrigin) {
  const ids = createStructuredDataIds(siteMetadata, siteOrigin);
  const organization = siteMetadata.organization;
  const service = siteMetadata.service;

  return renderStructuredDataTag({
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
      createPersonNode(siteMetadata, siteOrigin, ids),
      createServiceNode({
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
  });
}

function renderProfileStructuredData(routeMetadata, siteMetadata, siteOrigin) {
  const ids = createStructuredDataIds(siteMetadata, siteOrigin);

  return renderStructuredDataTag({
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
      createPersonNode(siteMetadata, siteOrigin, ids, {
        includeCredentials: true,
        mainEntityOfPage: ids.profilePageId,
      }),
    ],
  });
}

function renderSpecialistServiceStructuredData(
  routePath,
  routeMetadata,
  siteMetadata,
  siteOrigin,
) {
  const specialistService = siteMetadata.specialistServices[routePath];

  if (!specialistService) {
    throw new Error(`Specialist route is missing service metadata: ${routePath}`);
  }

  const ids = createStructuredDataIds(siteMetadata, siteOrigin);
  const service = siteMetadata.service;
  const pageUrl = getAbsoluteUrl(siteOrigin, routePath);
  const pageId = `${pageUrl}#webpage`;
  const specialistServiceId = `${pageUrl}#service`;

  return renderStructuredDataTag({
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
      createServiceNode({
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
  });
}

function renderCrisisSupportStructuredData(routeMetadata, siteMetadata, siteOrigin) {
  const ids = createStructuredDataIds(siteMetadata, siteOrigin);
  const pageUrl = getAbsoluteUrl(siteOrigin, "/crisis-support");
  const pageId = `${pageUrl}#webpage`;
  const breadcrumbId = `${pageUrl}#breadcrumb`;

  return renderStructuredDataTag({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        "@id": pageId,
        url: pageUrl,
        name: routeMetadata.title,
        description: routeMetadata.description,
        inLanguage: "en-AU",
        dateModified: validateIsoDate(
          routeMetadata.lastModified,
          "Crisis Support lastModified",
        ),
        lastReviewed: validateIsoDate(
          routeMetadata.lastReviewed,
          "Crisis Support lastReviewed",
        ),
        isPartOf: { "@id": ids.websiteId },
        author: { "@id": ids.organizationId },
        publisher: { "@id": ids.organizationId },
        breadcrumb: { "@id": breadcrumbId },
      },
      {
        "@type": "BreadcrumbList",
        "@id": breadcrumbId,
        name: "Crisis support breadcrumb trail",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: ids.homepageUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Crisis support",
            item: pageUrl,
          },
        ],
      },
    ],
  });
}

function renderCollectionStructuredData(routePath, routeMetadata, siteMetadata, siteOrigin) {
  const ids = createStructuredDataIds(siteMetadata, siteOrigin);
  const pageUrl = getAbsoluteUrl(siteOrigin, routePath);

  return renderStructuredDataTag({
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${pageUrl}#articles`,
    url: pageUrl,
    name: routeMetadata.title,
    description: routeMetadata.description,
    isPartOf: { "@id": ids.websiteId },
    publisher: { "@id": ids.organizationId },
    author: { "@id": ids.personId },
  });
}

function renderArticleStructuredData(routePath, routeMetadata, siteMetadata, siteOrigin) {
  const ids = createStructuredDataIds(siteMetadata, siteOrigin);
  const pageUrl = getAbsoluteUrl(siteOrigin, routePath);
  const pageId = `${pageUrl}#webpage`;
  const articleId = `${pageUrl}#article`;
  const breadcrumbId = `${pageUrl}#breadcrumb`;
  const publishedAt = validateIsoDate(routeMetadata.publishedAt, `Article publishedAt (${routePath})`);
  const modifiedAt = validateIsoDate(
    routeMetadata.modifiedAt ?? publishedAt,
    `Article modifiedAt (${routePath})`,
  );

  return renderStructuredDataTag({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": pageId,
        url: pageUrl,
        name: routeMetadata.title,
        description: routeMetadata.description,
        isPartOf: { "@id": ids.websiteId },
        mainEntity: { "@id": articleId },
        breadcrumb: { "@id": breadcrumbId },
      },
      {
        "@type": "Article",
        "@id": articleId,
        url: pageUrl,
        headline: routeMetadata.headline ?? routeMetadata.title,
        ...(routeMetadata.abstract ? { abstract: routeMetadata.abstract } : {}),
        description: routeMetadata.description,
        datePublished: publishedAt,
        dateModified: modifiedAt,
        articleSection: routeMetadata.articleSection,
        author: {
          "@type": "Person",
          "@id": ids.personId,
          name: routeMetadata.authorName ?? siteMetadata.person.name,
          url: ids.profileUrl,
        },
        publisher: {
          "@type": "Organization",
          "@id": ids.organizationId,
          name: siteMetadata.name,
          url: ids.homepageUrl,
        },
        image: getAssetUrl(siteOrigin, siteMetadata.socialImage),
        mainEntityOfPage: { "@id": pageId },
      },
      {
        "@type": "BreadcrumbList",
        "@id": breadcrumbId,
        name: `${routeMetadata.headline ?? routeMetadata.title} breadcrumb trail`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Articles",
            item: getAbsoluteUrl(siteOrigin, "/articles"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: routeMetadata.articleSection,
            item: pageUrl,
          },
        ],
      },
    ],
  });
}

export function renderRouteStructuredDataTag({
  routeMetadata,
  routePath,
  siteMetadata,
  siteOrigin,
  structuredDataType,
}) {
  switch (structuredDataType) {
    case null:
      return null;
    case "home":
      return renderHomeStructuredData(siteMetadata, siteOrigin);
    case "profile":
      return renderProfileStructuredData(routeMetadata, siteMetadata, siteOrigin);
    case "specialist-service":
      return renderSpecialistServiceStructuredData(
        routePath,
        routeMetadata,
        siteMetadata,
        siteOrigin,
      );
    case "crisis-support":
      return renderCrisisSupportStructuredData(routeMetadata, siteMetadata, siteOrigin);
    case "collection":
      return renderCollectionStructuredData(routePath, routeMetadata, siteMetadata, siteOrigin);
    case "article":
      return renderArticleStructuredData(routePath, routeMetadata, siteMetadata, siteOrigin);
    default:
      throw new Error(
        `Unsupported structured-data type for ${routePath}: ${structuredDataType}`,
      );
  }
}
