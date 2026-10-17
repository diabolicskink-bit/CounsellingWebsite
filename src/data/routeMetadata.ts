import { getArticleRouteMetadata } from "../content/articles/manifest";
import metadata from "./routeMetadata.json";

export type RouteMetadata = {
  title: string;
  description: string;
  robots?: string;
  pageType?: "article" | "collection";
  lastModified?: string;
  lastReviewed?: string;
  // Article routes only.
  headline?: string;
  abstract?: string;
  authorName?: string;
  articleSection?: string;
  publishedAt?: string;
  modifiedAt?: string;
};

export type NotFoundMetadata = Pick<RouteMetadata, "description" | "title"> & {
  heading: string;
  robots: string;
};

export type SiteMetadata = {
  name: string;
  alternateName: string;
  defaultOrigin: string;
  themeColor: string;
  backgroundColor: string;
  organization: {
    email: string;
    logo: string;
    logoWidth: number;
    logoHeight: number;
    description: string;
    sameAs: string[];
  };
  person: {
    name: string;
    jobTitle: string;
    url: string;
    image: string;
    description: string;
    sameAs: string[];
    knowsAbout: string[];
    credentials: Array<{
      name: string;
      credentialCategory: string;
      url?: string;
      recognizedBy: {
        type: "Organization" | "CollegeOrUniversity";
        name: string;
        url: string;
      };
    }>;
  };
  service: {
    name: string;
    serviceType: string[];
    url: string;
    description: string;
    audience: string;
    areaServed: string;
    deliveryChannel: {
      name: string;
      url: string;
    };
    offer: {
      name: string;
      price: string;
      priceCurrency: string;
      url: string;
    };
  };
  specialistServices: Record<string, { name: string; serviceType: string[] }>;
  socialImage: string;
  socialImageAlt: string;
};

type JsonRoutes = typeof metadata.routes;
export type PublicRoutePath = keyof JsonRoutes;
// JSON widens pageType to string; parseRoutePageType narrows it.
type UncheckedRouteMetadata = Omit<RouteMetadata, "pageType"> & { pageType?: string };

type CredentialRecognizedByType = SiteMetadata["person"]["credentials"][number]["recognizedBy"]["type"];

function parseCredentialRecognizedByType(value: string): CredentialRecognizedByType {
  if (value === "Organization" || value === "CollegeOrUniversity") {
    return value;
  }

  throw new Error(`Unsupported credential recognizedBy type: ${value}`);
}

function parseRoutePageType(value: string | undefined): RouteMetadata["pageType"] {
  if (value === undefined || value === "article" || value === "collection") {
    return value;
  }

  throw new Error(`Unsupported route page type: ${value}`);
}

export const siteMetadata = {
  ...metadata.site,
  person: {
    ...metadata.site.person,
    credentials: metadata.site.person.credentials.map((credential) => ({
      ...credential,
      recognizedBy: {
        ...credential.recognizedBy,
        type: parseCredentialRecognizedByType(credential.recognizedBy.type),
      },
    })),
  },
} satisfies SiteMetadata;

export const notFoundMetadata = metadata.notFound satisfies NotFoundMetadata;

const jsonRoutes: Record<string, UncheckedRouteMetadata> = metadata.routes;
const publicRouteMetadata: Record<string, RouteMetadata> = Object.fromEntries(
  Object.entries(jsonRoutes).map(([path, route]): [string, RouteMetadata] => [
    path,
    { ...route, pageType: parseRoutePageType(route.pageType) },
  ]),
);

export const routeMetadata: Record<string, RouteMetadata> = {
  ...publicRouteMetadata,
  ...getArticleRouteMetadata(),
};

// Typing by the route's JSON entry guarantees page-specific fields, such as Crisis Support's review date.
export function getRouteMetadata<Path extends PublicRoutePath>(path: Path) {
  return publicRouteMetadata[path] as RouteMetadata & JsonRoutes[Path];
}
