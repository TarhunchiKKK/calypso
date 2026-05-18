import type { Preview } from "@storybook/react-vite";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { initialize, mswLoader } from "msw-storybook-addon";
import { BrowserRouter } from "react-router-dom";
import { ThemeSwitch } from "../src/features/dark-mode";
import "../src/app/index.css";

initialize();

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i
            }
        }
    },
    loaders: [mswLoader],
    decorators: [
        (Story) => (
            <QueryClientProvider client={new QueryClient()}>
                <BrowserRouter>
                    <Story />

                    <div className="fixed top-4 right-4">
                        <ThemeSwitch />
                    </div>
                </BrowserRouter>
            </QueryClientProvider>
        )
    ]
};

export default preview;
