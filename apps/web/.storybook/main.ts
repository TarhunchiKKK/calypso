import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const config: StorybookConfig = {
    stories: ["./stories/**/*.stories.tsx"],
    addons: ["@chromatic-com/storybook", "@storybook/addon-a11y", "@storybook/addon-docs"],
    framework: "@storybook/react-vite",
    typescript: {
        reactDocgen: "react-docgen-typescript",
        reactDocgenTypescriptOptions: {
            tsconfigPath: "./tsconfig.storybook.json"
        }
    },
    async viteFinal(config) {
        return mergeConfig(config, {
            plugins: [
                tsconfigPaths({
                    projects: ["./tsconfig.storybook.json"]
                })
            ]
        });
    }
};
export default config;
