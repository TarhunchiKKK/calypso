import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { Providers } from "./providers.component";
import { Router } from "./routing.constants";

const root = document.getElementById("root");

if (!root) {
    throw new Error("Root element not found");
}

createRoot(root).render(
    <StrictMode>
        <Providers>
            <RouterProvider router={Router} />

            {/* <CurrentUi /> */}
        </Providers>
    </StrictMode>
);
