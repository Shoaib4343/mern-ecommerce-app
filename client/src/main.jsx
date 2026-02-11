import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { AddToCartContextProvider } from "./context/AddToCartContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <AddToCartContextProvider>
      <BrowserRouter>
        <StrictMode>
          <App />
        </StrictMode>
      </BrowserRouter>
    </AddToCartContextProvider>
  </AuthProvider>,
);
