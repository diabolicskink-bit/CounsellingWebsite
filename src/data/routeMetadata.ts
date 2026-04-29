import metadata from "./routeMetadata.json";

export type RouteMetadata = {
  title: string;
  description: string;
};

export type SiteMetadata = {
  name: string;
  defaultOrigin: string;
  themeColor: string;
  backgroundColor: string;
  socialImage: string;
  socialImageAlt: string;
};

export type PublicRoutePath = keyof typeof metadata.routes;

export const siteMetadata = metadata.site satisfies SiteMetadata;
export const routeMetadata = metadata.routes satisfies Record<string, RouteMetadata>;

export function getRouteMetadata(path: PublicRoutePath): RouteMetadata {
  return routeMetadata[path];
}
