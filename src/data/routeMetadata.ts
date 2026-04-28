import metadata from "./routeMetadata.json";

export type RouteMetadata = {
  title: string;
  description: string;
};

export type PublicRoutePath = keyof typeof metadata.routes;

export const routeMetadata = metadata.routes satisfies Record<string, RouteMetadata>;

export function getRouteMetadata(path: PublicRoutePath): RouteMetadata {
  return routeMetadata[path];
}
