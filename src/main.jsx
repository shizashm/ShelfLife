import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { BooksProvider } from "./context/BooksContext.jsx";
import { PreferencesProvider } from "./context/PreferencesContext.jsx";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <BooksProvider>
        <PreferencesProvider>
          <App />
        </PreferencesProvider>
      </BooksProvider>
    </BrowserRouter>
  </StrictMode>
);
