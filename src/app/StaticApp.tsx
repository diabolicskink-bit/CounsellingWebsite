import { StrictMode } from "react";
import { StaticRouter } from "react-router-dom/server";
import App, { type AppProps, type ArticlePageComponents } from "./App";
import ArticleIndex from "../pages/articles/ArticleIndex";
import ArticlePage from "../pages/articles/ArticlePage";

const staticArticlePages = {
  Index: ArticleIndex,
  Page: ArticlePage,
} satisfies ArticlePageComponents;

type StaticAppProps =Pick<AppProps, "initialRenderAt"> & {
  location: string;
};

export function StaticApp({ initialRenderAt, location }: StaticAppProps) {
  return (
    <StrictMode>
      <StaticRouter location={location}>
        <App articlePages={staticArticlePages} initialRenderAt={initialRenderAt} />
      </StaticRouter>
    </StrictMode>
  );
}
