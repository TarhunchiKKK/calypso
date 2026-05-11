import { RouterProvider } from "react-router-dom";
import { Providers } from "./compose/providers.component";
import { Router } from "./compose/routing.constants";

export function App() {
    return (
        <Providers>
            <RouterProvider router={Router} />

            {/*<CurrentUi />*/}
        </Providers>
    );
}
