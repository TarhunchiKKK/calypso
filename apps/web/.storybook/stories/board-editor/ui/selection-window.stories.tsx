import type { Meta, StoryObj } from "@storybook/react-vite";
import { SelectionWindow } from "../../../../src/board-editor/modules/selection";

const meta = {
    title: "Board Editor/ui/Selection Window",
    component: SelectionWindow
} satisfies Meta<typeof SelectionWindow>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        rect: { x: 100, y: 100, width: 200, height: 200 }
    }
};
