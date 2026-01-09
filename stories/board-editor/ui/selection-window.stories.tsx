import { SelectionWindow } from "@/features/board-editor/modules/selection";
import { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
    title: "Board Editor/ui/Selection Window",
    component: SelectionWindow
} satisfies Meta<typeof SelectionWindow>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: StoryObj<Story> = {
    args: {
        x: 100,
        y: 100,
        width: 200,
        height: 200
    }
};
