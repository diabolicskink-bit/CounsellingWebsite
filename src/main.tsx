import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserApp } from "./BrowserApp";
import "./styles.css";

function normalizePathname(pathname: string) {
  const normalizedPathname = pathname.replace(/\/+$/, "");
  return normalizedPathname || "/";
}

const rootElement = document.getElementById("root")!;
const prerenderedAt = rootElement.dataset.prerenderedAt;
const hasValidPrerenderTimestamp = Boolean(prerenderedAt && !Number.isNaN(Date.parse(prerenderedAt)));
const initialRenderAt =
  hasValidPrerenderTimestamp && prerenderedAt ? prerenderedAt : new Date().toISOString();
const prerenderedPath = rootElement.dataset.prerenderedPath;
const shouldHydrate =
  rootElement.dataset.renderMode === "prerendered" &&
  hasValidPrerenderTimestamp &&
  Boolean(prerenderedPath) &&
  normalizePathname(prerenderedPath ?? "") === normalizePathname(window.location.pathname);
const app = <BrowserApp initialRenderAt={initialRenderAt} />;

if (shouldHydrate) {
  rootElement.dataset.reactActivation = "hydrate";
  hydrateRoot(rootElement, app, {
    onRecoverableError(error, errorInfo) {
      console.error("[vive:hydration-recoverable]", error, errorInfo.componentStack);
    },
  });
} else {
  rootElement.dataset.reactActivation = "client-render";
  createRoot(rootElement).render(app);
}
