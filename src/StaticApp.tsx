import { StaticRouter } from "react-router-dom/server";
import App, { type AppProps, type ArticlePageComponents } from "./App";
import { AppRoot } from "./AppRoot";
import ArticlePage from "./pages/ArticlePage";
import ArticleIndex from "./pages/ArticleIndex";

const staticArticlePages = {
  Index: ArticleIndex,
  Page: ArticlePage,
} satisfies ArticlePageComponents;

export type StaticAppProps = Pick<AppProps, "initialRenderAt"> & {
  location: string;
};

export function StaticApp({ initialRenderAt, location }: StaticAppProps) {
  return (
    <AppRoot>
      <StaticRouter location={location}>
        <App articlePages={staticArticlePages} initialRenderAt={initialRenderAt} />
      </StaticRouter>
    </AppRoot>
  );
}
