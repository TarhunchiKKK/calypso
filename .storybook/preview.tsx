import type { Preview } from "@storybook/nextjs-vite";
import "../src/app/globals.css";

const preview: Preview = {
    decorators: Story => {
        return (
            <div className="w-full h-screen flex flex-col justify-center items-center">
                <Story />
            </div>
        );
    },
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i
            }
        }
    }
};

export default preview;
