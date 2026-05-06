import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { applyDecorators, centered, relative } from "#/common/lib";
import { SelectionWindow } from "@/board-editor/modules/selection";

const meta = {
    title: "Board Editor/Modules/Selection/SelectionWindow",
    component: SelectionWindow
} satisfies Meta<typeof SelectionWindow>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        rect: {
            x: 0,
            y: 0,
            width: 300,
            height: 200
        }
    },
    decorators: applyDecorators(relative, centered)
};
