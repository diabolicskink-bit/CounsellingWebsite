import { StrictMode } from "react";
import { StaticRouter } from "react-router-dom/server";
import App, { type AppProps, type ArticlePageComponents } from "./App";
import ArticlePage from "../pages/articles/ArticlePage";
import ArticleIndex from "../pages/articles/ArticleIndex";

const staticArticlePages = {
  Index: ArticleIndex,
  Page: ArticlePage,
} satisfies ArticlePageComponents;

export type StaticAppProps = Pick<AppProps, "initialRenderAt"> & {
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
