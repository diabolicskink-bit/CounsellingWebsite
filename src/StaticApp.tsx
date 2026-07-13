import { StaticRouter } from "react-router-dom/server";
import App from "./App";
import type { AppProps } from "./App";
import { AppRoot } from "./AppRoot";

export type StaticAppProps = AppProps & {
  location: string;
};

export function StaticApp({ initialRenderAt, location }: StaticAppProps) {
  return (
    <AppRoot>
      <StaticRouter location={location}>
        <App initialRenderAt={initialRenderAt} />
      </StaticRouter>
    </AppRoot>
  );
}
