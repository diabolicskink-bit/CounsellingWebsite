import { renderToString } from "react-dom/server";
import { getArticleRouteMetadata } from "./content/articles/manifest";
import { StaticApp } from "./StaticApp";

export type RenderRouteOptions = {
  initialRenderAt: string;
};

export function renderRoute(pathname: string, { initialRenderAt }: RenderRouteOptions): string {
  return renderToString(<StaticApp initialRenderAt={initialRenderAt} location={pathname} />);
}

export function getAdditionalPrerenderRouteMetadata() {
  return getArticleRouteMetadata();
}
