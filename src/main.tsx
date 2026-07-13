import ReactDOM from "react-dom/client";
import { BrowserApp } from "./BrowserApp";
import "./styles.css";

const rootElement = document.getElementById("root")!;
const prerenderedAt = rootElement.dataset.prerenderedAt;
const initialRenderAt =
  prerenderedAt && !Number.isNaN(Date.parse(prerenderedAt)) ? prerenderedAt : new Date().toISOString();

ReactDOM.createRoot(rootElement).render(
  <BrowserApp initialRenderAt={initialRenderAt} />,
);
