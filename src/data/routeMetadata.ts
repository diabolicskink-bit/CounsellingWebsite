import { getBlogRouteMetadata } from "../content/blog/manifest";
import metadata from "./routeMetadata.json";

export type RouteMetadata = {
  abstract?: string;
  title: string;
  description: string;
  robots?: string;
  pageType?: "article" | "collection";
  publishedAt?: string;
  modifiedAt?: string;
  authorName?: string;
  articleSection?: string;
  headline?: string;
  lastModified?: string;
  lastReviewed?: string;
};

export type NotFoundMetadata = Pick<RouteMetadata, "description" | "title"> & {
  heading: string;
  robots: string;
};

export type SiteMetadata = {
  name: string;
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
  specialistServices: Record<
    string,
    {
      name: string;
      serviceType: string[];
    }
  >;
  socialImage: string;
  socialImageAlt: string;
};

export type PublicRoutePath = keyof typeof metadata.routes;

type CredentialRecognizedByType = SiteMetadata["person"]["credentials"][number]["recognizedBy"]["type"];

function getCredentialRecognizedByType(value: string): CredentialRecognizedByType {
  if (value === "Organization" || value === "CollegeOrUniversity") {
    return value;
  }

  throw new Error(`Unsupported credential recognizedBy type: ${value}`);
}

function getRoutePageType(value: string | undefined): RouteMetadata["pageType"] {
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
        type: getCredentialRecognizedByType(credential.recognizedBy.type),
      },
    })),
  },
} satisfies SiteMetadata;
export const notFoundMetadata = metadata.notFound satisfies NotFoundMetadata;
const rawRouteMetadata = metadata.routes as Record<
  string,
  Omit<RouteMetadata, "pageType"> & { pageType?: string }
>;
const baseRouteMetadata = Object.fromEntries(
  Object.entries(rawRouteMetadata).map(([path, route]) => [
    path,
    {
      ...route,
      pageType: getRoutePageType(route.pageType),
    },
  ]),
) as Record<string, RouteMetadata>;

export const routeMetadata: Record<string, RouteMetadata> = {
  ...baseRouteMetadata,
  ...getBlogRouteMetadata(),
};

export function getRouteMetadata<Path extends PublicRoutePath>(path: Path): (typeof routeMetadata)[Path] {
  return routeMetadata[path];
}
