import { BrowserRouter } from "react-router-dom";
import App, { type AppProps } from "./App";
import { AppRoot } from "./AppRoot";
import { browserArticlePages } from "./content/articles/browserPages";

type BrowserAppProps = Pick<AppProps, "initialRenderAt">;

export function BrowserApp({ initialRenderAt }: BrowserAppProps) {
  return (
    <AppRoot>
      <BrowserRouter>
        <App articlePages={browserArticlePages} initialRenderAt={initialRenderAt} />
      </BrowserRouter>
    </AppRoot>
  );
}
