import { createRoot } from "react-dom/client";
import { App } from "./App";

const rootElement = document.getElementById("root");

if (rootElement) {
  const page = document.body.dataset.page || "home";
  createRoot(rootElement).render(<App page={page} />);
}
