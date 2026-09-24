import { StrictMode, lazy } from "react";
import { BrowserRouter } from "react-router-dom";
import App, { type AppProps, type ArticlePageComponents } from "./App";

const browserArticlePages = {
  Index: lazy(() => import("../pages/articles/ArticleIndex")),
  Page: lazy(() => import("../pages/articles/ArticlePage")),
} satisfies ArticlePageComponents;

type BrowserAppProps = Pick<AppProps, "initialRenderAt">;

export function BrowserApp({ initialRenderAt }: BrowserAppProps) {
  return (
    <StrictMode>
      <BrowserRouter>
        <App articlePages={browserArticlePages} initialRenderAt={initialRenderAt} />
      </BrowserRouter>
    </StrictMode>
  );
}
