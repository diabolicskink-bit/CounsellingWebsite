import { BrowserRouter } from "react-router-dom";
import App, { type AppProps } from "./App";
import { AppRoot } from "./AppRoot";
import { browserBlogPages } from "./content/blog/browserPages";

type BrowserAppProps = Pick<AppProps, "initialRenderAt">;

export function BrowserApp({ initialRenderAt }: BrowserAppProps) {
  return (
    <AppRoot>
      <BrowserRouter>
        <App blogPages={browserBlogPages} initialRenderAt={initialRenderAt} />
      </BrowserRouter>
    </AppRoot>
  );
}
