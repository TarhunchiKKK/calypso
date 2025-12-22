import { SelectionWindow } from "@/features/board-editor/ui/selection-window";
import { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
    title: "Board Editor/ui/Selection Window",
    component: SelectionWindow
} satisfies Meta<typeof SelectionWindow>;

export default meta;

export const Default: StoryObj<typeof meta> = {
    args: {
        x: 100,
        y: 100,
        width: 200,
        height: 200
    }
};
