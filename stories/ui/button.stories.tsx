import { Button } from "@/shared/ui/kit/button";
import { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
    title: "Ui/Kit/Button",
    component: Button
} satisfies Meta<typeof Button>;

export default meta;

export const Primary: StoryObj<typeof meta> = {
    args: {
        type: "button",
        size: "lg",
        children: "Button"
    }
};
