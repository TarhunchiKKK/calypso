import type { Meta, StoryObj } from "@storybook/react-vite";
import { Dots } from "../../../../src/board-editor/ui/dots.component";

const meta = {
    title: "Board Editor/UI/Dots",
    component: Dots
} satisfies Meta<typeof Dots>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        offset: {
            dx: 0,
            dy: 0
        },
        zoom: 1.0
    }
};
