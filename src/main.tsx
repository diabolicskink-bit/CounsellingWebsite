import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles.css";

const rootElement = document.getElementById("root")!;
const prerenderedAt = rootElement.dataset.prerenderedAt;
const initialRenderAt =
  prerenderedAt && !Number.isNaN(Date.parse(prerenderedAt)) ? prerenderedAt : new Date().toISOString();

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App initialRenderAt={initialRenderAt} />
    </BrowserRouter>
  </React.StrictMode>,
);
