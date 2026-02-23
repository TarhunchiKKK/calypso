import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app";
import { ThemeProvider } from "./features/dark-mode";
import "./index.css";

const root = document.getElementById("root");

if (!root) {
    throw new Error("Root element not found");
}

createRoot(root).render(
    <StrictMode>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </StrictMode>
);
