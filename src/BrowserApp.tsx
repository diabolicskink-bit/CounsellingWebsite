import { BrowserRouter } from "react-router-dom";
import App from "./App";
import type { AppProps } from "./App";
import { AppRoot } from "./AppRoot";

export function BrowserApp({ initialRenderAt }: AppProps) {
  return (
    <AppRoot>
      <BrowserRouter>
        <App initialRenderAt={initialRenderAt} />
      </BrowserRouter>
    </AppRoot>
  );
}
