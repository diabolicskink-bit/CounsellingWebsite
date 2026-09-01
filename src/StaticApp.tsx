import { StaticRouter } from "react-router-dom/server";
import App, { type AppProps, type BlogPageComponents } from "./App";
import { AppRoot } from "./AppRoot";
import BlogArticle from "./pages/BlogArticle";
import BlogIndex from "./pages/BlogIndex";

const staticBlogPages = {
  Article: BlogArticle,
  Index: BlogIndex,
} satisfies BlogPageComponents;

export type StaticAppProps = Pick<AppProps, "initialRenderAt"> & {
  location: string;
};

export function StaticApp({ initialRenderAt, location }: StaticAppProps) {
  return (
    <AppRoot>
      <StaticRouter location={location}>
        <App blogPages={staticBlogPages} initialRenderAt={initialRenderAt} />
      </StaticRouter>
    </AppRoot>
  );
}
