import { Button } from "@/shared/ui/kit/button";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Center } from "../common/center";

const meta = {
    title: "ui/kit/Button",
    component: Button
} satisfies Meta<typeof Button>;

export default meta;

export const Primary: StoryObj<typeof meta> = {
    args: {
        type: "button",
        size: "lg",
        children: "Button"
    },
    decorators: Story => {
        return (
            <Center>
                <Story />
            </Center>
        );
    }
};
