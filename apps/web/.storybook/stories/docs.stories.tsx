import type { DrawingNode } from "@repo/boards-common";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { applyDecorators, centered, relative, withDots } from "#/lib/decorators";
import { DrawingNodeComponent } from "@/board-editor/nodes/variants/drawing/component";

const node: DrawingNode = {
    id: "id",
    type: "drawing",
    locked: false,
    rect: {
        x: 0,
        y: 0,
        width: 400,
        height: 500
    },
    styles: {
        lineColor: "black",
        lineWidth: 8
    },
    points: [
        { x: 0, y: 0 },
        { x: 10, y: 10 },
        { x: 50, y: 80 },
        { x: 100, y: 0 },
        { x: 150, y: 80 },
        { x: 200, y: 0 },
        { x: 350, y: 80 }
    ]
};

const meta = {
    title: "Docs",
    component: DrawingNodeComponent
} satisfies Meta<typeof DrawingNodeComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    decorators: applyDecorators(withDots, centered, relative),
    args: {
        node: node,
        handlers: {},
        uiSettings: {
            showContent: true,
            noPointerEvents: true
        }
    }
};
