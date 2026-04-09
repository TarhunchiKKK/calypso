import { CurrentUi } from "@/dev";
import { Providers } from "./compose/providers.component";

export function App() {
    return (
        <Providers>
            {/* <RouterProvider router={Router} /> */}

            <CurrentUi />
        </Providers>
    );
}
