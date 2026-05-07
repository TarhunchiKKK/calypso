import type { Meta, StoryObj } from "@storybook/react-vite";
import { applyDecorators, centered, relative } from "#/lib/decorators";
import { SelectionWindow } from "@/board-editor/modules/selection";

const meta = {
    title: "Board Editor/Modules/Selection/Selection Window",
    component: SelectionWindow
} satisfies Meta<typeof SelectionWindow>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    decorators: applyDecorators(centered, relative),
    args: {
        rect: {
            x: 0,
            y: 0,
            width: 300,
            height: 200
        }
    }
};
