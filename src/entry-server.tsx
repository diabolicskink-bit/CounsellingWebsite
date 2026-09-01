import { renderToString } from "react-dom/server";
import { getBlogRouteMetadata } from "./content/blog/manifest";
import { StaticApp } from "./StaticApp";

export type RenderRouteOptions = {
  initialRenderAt: string;
};

export function renderRoute(pathname: string, { initialRenderAt }: RenderRouteOptions): string {
  return renderToString(<StaticApp initialRenderAt={initialRenderAt} location={pathname} />);
}

export function getAdditionalPrerenderRouteMetadata() {
  return getBlogRouteMetadata();
}
