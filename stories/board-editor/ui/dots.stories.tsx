import { Dots } from "@/features/board-editor/ui/dots.component";
import { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
    title: "Board Editor/ui/Dots",
    component: Dots
} satisfies Meta<typeof Dots>;

export default meta;

export const Default: StoryObj<typeof meta> = {
    args: {
        windowShift: {
            x: 0,
            y: 0
        }
    }
};
