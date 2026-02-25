import { ThemeProvider } from "@/features/dark-mode";
import { BoardEditorPage } from "./pages";

export function App() {
    return (
        <ThemeProvider>
            <BoardEditorPage />

            {/* <CurrentUi /> */}
        </ThemeProvider>
    );
}
