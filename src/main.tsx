import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AuthProvider } from "./context/AuthProvider";
import App from "./App.tsx";

import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider><CartProvider>
        <App />
      </CartProvider></AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
