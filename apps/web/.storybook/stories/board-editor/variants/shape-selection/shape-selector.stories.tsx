import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { centered } from "#/lib/decorators";
import { ShapeSelector } from "@/board-editor/view-model/variants/shape-selection/ui/shape-selector.component";

const meta = {
    title: "Board Editor/View Models/Shape Selection/Shape Selector",
    component: ShapeSelector
} satisfies Meta<typeof ShapeSelector>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        onSelect: () => {},
        style: {}
    },
    decorators: centered
};
