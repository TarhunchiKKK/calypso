import { StoryObj } from "@storybook/nextjs-vite";
import { PropsWithChildren } from "react";

export function Center({ children }: PropsWithChildren) {
    return <div className="w-full h-screen flex flex-col justify-center items-center">{children}</div>;
}

export const centered: StoryObj["decorators"] = Story => {
    return (
        <Center>
            <Story />
        </Center>
    );
};
