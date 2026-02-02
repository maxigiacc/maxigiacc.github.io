import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { App } from "./App";

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <HashRouter>
      <App />
    </HashRouter>
  );
}
