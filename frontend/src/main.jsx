import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";
import App from "./App.jsx";
import AppState from "./context/AppState.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppState>
      <App />
    </AppState>
  </StrictMode>
);
