import type { StorybookConfig } from "@storybook/nextjs-vite";

const config: StorybookConfig = {
    stories: ["./stories/**/*.stories.tsx"],
    addons: ["@chromatic-com/storybook", "@storybook/addon-a11y", "@storybook/addon-docs"],
    framework: "@storybook/nextjs-vite"
};
export default config;
