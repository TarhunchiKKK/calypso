import { StoryObj } from "@storybook/nextjs-vite";

export const centered: StoryObj["decorators"] = Story => {
    return (
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <Story />
        </div>
    );
};
