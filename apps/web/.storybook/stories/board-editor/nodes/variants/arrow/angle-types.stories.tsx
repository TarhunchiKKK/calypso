import type { NodeStyles } from "@repo/boards";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { applyDecorators, centered, relative, withDots } from "#/lib/decorators";
import { ArrowNodeComponent } from "@/board-editor/nodes/variants/arrow/component";
import { NodesFactory } from "@/entities/nodes";

const absolutePosition = {
    start: { x: 0, y: 0 },
    end: { x: 100, y: 0 }
};

const node = {
    ...NodesFactory.arrow({ point: { x: 50, y: 0 } }),
    ...absolutePosition
};
const decorators = applyDecorators(withDots, centered, relative);

function getArgs(angleType: NodeStyles["angleType"]) {
    return {
        node: {
            ...node,
            styles: {
                ...node.styles,
                angleType: angleType
            }
        },
        handlers: {},
        uiSettings: {
            noPointerEvents: false,
            showContent: true
        },
        absolutePosition: absolutePosition
    };
}

const meta = {
    title: "Board Editor/Nodes/Variants/Arrow/Angle Types",
    component: ArrowNodeComponent
} satisfies Meta<typeof ArrowNodeComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Corner: Story = {
    decorators: decorators,
    args: getArgs("corner")
};

export const Triangle: Story = {
    decorators: decorators,
    args: getArgs("triangle")
};

export const TriangleFilled: Story = {
    decorators: decorators,
    args: getArgs("triangle-filled")
};

export const Kite: Story = {
    decorators: decorators,
    args: getArgs("kite")
};

export const KiteFilled: Story = {
    decorators: decorators,
    args: getArgs("kite-filled")
};
