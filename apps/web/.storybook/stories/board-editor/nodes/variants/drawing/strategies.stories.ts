import type { Meta, StoryObj } from "@storybook/react-vite";
import type { JSX } from "react";
import { applyDecorators, centered, relative } from "#/lib/decorators";
import { DecoratableNodeBuilder } from "@/board-editor/nodes/compose/lib/decoratable-node.builder";
import { NodeWrappersFactory } from "@/board-editor/nodes/compose/lib/node-wrappers.factory";
import { DrawingNodeComponent } from "@/board-editor/nodes/variants/drawing/component";
import { NodesFactory } from "@/entities/nodes";

const node = NodesFactory.drawing({ point: { x: 0, y: 0 } });
const wrapper = NodeWrappersFactory.wrap([], node);

const decorators = applyDecorators(centered, relative);
const defaultArgs = {
    node: node,
    handlers: {},
    uiSettings: {
        noPointerEvents: false,
        showContent: true
    }
};

const meta = {
    title: "Board Editor/Nodes/Variants/Drawing/Strategies",
    component: DrawingNodeComponent
} satisfies Meta<typeof DrawingNodeComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    decorators: decorators,
    args: defaultArgs,
    render: () => wrapper.render()
};

export const Selected: Story = {
    decorators: decorators,
    args: defaultArgs,
    render: () => DecoratableNodeBuilder.from(wrapper).selection().build().render() as JSX.Element
};

const lockedNodeWrapper = NodeWrappersFactory.wrap([], { ...node, locked: true });

export const Locked: Story = {
    decorators: decorators,
    args: defaultArgs,
    render: () => DecoratableNodeBuilder.from(lockedNodeWrapper).selection().build().render() as JSX.Element
};

export const Resizable: Story = {
    decorators: decorators,
    args: defaultArgs,
    render: () =>
        DecoratableNodeBuilder.from(wrapper)
            .resizable(() => {})
            .selection()
            .build()
            .render() as JSX.Element
};
