import type { Meta, StoryObj } from "@storybook/react-vite";
import type { JSX } from "react";
import { applyDecorators, centered, relative } from "#/lib/decorators";
import { DecoratableNodeBuilder } from "@/board-editor/nodes/compose/lib/decoratable-node.builder";
import { NodeWrappersFactory } from "@/board-editor/nodes/compose/lib/node-wrappers.factory";
import { ShapeNodeComponent } from "@/board-editor/nodes/variants/shape/component";
import { NodesFactory } from "@/entities/nodes";

const node = NodesFactory.shape({ point: { x: 0, y: 0 }, variant: "star" });
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
    title: "Board Editor/Nodes/Variants/Shape/Strategies",
    component: ShapeNodeComponent
} satisfies Meta<typeof ShapeNodeComponent>;

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

export const Bindable: Story = {
    decorators: decorators,
    args: defaultArgs,
    render: () => DecoratableNodeBuilder.from(wrapper).bindable({}, false).build().render() as JSX.Element
};

export const BindableActive: Story = {
    decorators: decorators,
    args: defaultArgs,
    render: () => DecoratableNodeBuilder.from(wrapper).bindable({}, true).build().render() as JSX.Element
};
