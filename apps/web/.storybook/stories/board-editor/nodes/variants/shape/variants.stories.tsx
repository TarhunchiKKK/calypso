import type { ShapeNode } from "@lib/boards";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { applyDecorators, centered, relative, withDots } from "#/lib/decorators";
import { ShapeNodeComponent } from "@/board-editor/nodes/variants/shape/component";
import { NodesFactory } from "@/entities/nodes";

const point = {
    x: 0,
    y: 0
};

const decorators = applyDecorators(withDots, centered, relative);

function getArgs(variant: ShapeNode["variant"]) {
    return {
        node: NodesFactory.shape({ point: point, variant: variant }),
        handlers: {},
        uiSettings: {
            noPointerEvents: false,
            showContent: true
        }
    };
}

const meta = {
    title: "Board Editor/Nodes/Variants/Shape/Variants",
    component: ShapeNodeComponent
} satisfies Meta<typeof ShapeNodeComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Rectangle: Story = {
    decorators: decorators,
    args: getArgs("rectangle")
};

export const Circle: Story = {
    decorators: decorators,
    args: getArgs("circle")
};

export const Triangle: Story = {
    decorators: decorators,
    args: getArgs("triangle")
};

export const Diamond: Story = {
    decorators: decorators,
    args: getArgs("diamond")
};

export const Star: Story = {
    decorators: decorators,
    args: getArgs("star")
};

export const Hexagon: Story = {
    decorators: decorators,
    args: getArgs("hexagon")
};
