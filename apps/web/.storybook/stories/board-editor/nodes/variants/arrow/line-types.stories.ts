import type { NodeStyles } from "@repo/boards-common";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { applyDecorators, centered, relative } from "#/lib/decorators";
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
const decorators = applyDecorators(centered, relative);

function getArgs(lineType: NodeStyles["lineType"]) {
    return {
        node: {
            ...node,
            styles: {
                ...node.styles,
                lineType: lineType
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
    title: "Board Editor/Nodes/Variants/Arrow/Line Types",
    component: ArrowNodeComponent
} satisfies Meta<typeof ArrowNodeComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Solid: Story = {
    decorators: decorators,
    args: getArgs("solid")
};

export const Dotted: Story = {
    decorators: decorators,
    args: getArgs("dotted")
};

export const Dashed: Story = {
    decorators: decorators,
    args: getArgs("dashed")
};
