import { BoardEditorPage } from "../pages";
import { Providers } from "./providers.component";

export function App() {
    return (
        <Providers>
            <BoardEditorPage />

            {/* <CurrentUi /> */}
        </Providers>
    );
}
