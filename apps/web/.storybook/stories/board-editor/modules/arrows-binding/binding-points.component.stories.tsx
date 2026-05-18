import type { Meta, StoryObj } from "@storybook/react-vite";
import { applyDecorators, centered, relative } from "#/lib/decorators";
import { BindingPoints } from "@/board-editor/modules/arrows-binding/ui/binding-points.component";

const meta = {
    title: "Board Editor/Modules/Arrows Binding/Binding Points",
    component: BindingPoints
} satisfies Meta<typeof BindingPoints>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    decorators: applyDecorators(centered, relative),
    args: {
        referencePoints: [
            { x: 0, y: 0 },
            { x: 0.5, y: 0 },
            { x: 1, y: 0 },
            { x: 1, y: 0.5 },
            { x: 1, y: 1 },
            { x: 0.5, y: 1 },
            { x: 0, y: 1 },
            { x: 0, y: 0.5 }
        ],
        rect: {
            x: 0,
            y: 0,
            width: 100,
            height: 100
        },
        onMouseUp: () => {}
    }
};
