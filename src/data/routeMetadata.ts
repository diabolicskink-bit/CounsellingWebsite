import metadata from "./routeMetadata.json";

export type RouteMetadata = {
  h1: string;
  title: string;
  description: string;
  robots?: string;
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
  socialImage: string;
  socialImageAlt: string;
};

export type PublicRoutePath = keyof typeof metadata.routes;

export const siteMetadata = metadata.site satisfies SiteMetadata;
export const routeMetadata = metadata.routes satisfies Record<string, RouteMetadata>;

export function getRouteMetadata(path: PublicRoutePath): RouteMetadata {
  return routeMetadata[path];
}
