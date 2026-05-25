import type { Meta, StoryObj } from "@storybook/react-vite";
import type { JSX } from "react";
import { applyDecorators, centered, relative, withDots } from "#/lib/decorators";
import { DecoratableNodeBuilder } from "@/board-editor/nodes/compose/lib/decoratable-node.builder";
import { NodeWrappersFactory } from "@/board-editor/nodes/compose/lib/node-wrappers.factory";
import { TextNodeComponent } from "@/board-editor/nodes/variants/text/component";
import { NodesFactory } from "@/entities/nodes";

const node = NodesFactory.text({ point: { x: 0, y: 0 } });
const wrapper = NodeWrappersFactory.wrap(node);

const decorators = applyDecorators(withDots, centered, relative);
const defaultArgs = {
    node: node,
    handlers: {},
    uiSettings: {
        noPointerEvents: false,
        showContent: true
    }
};

const meta = {
    title: "Board Editor/Nodes/Variants/Text/Strategies",
    component: TextNodeComponent
} satisfies Meta<typeof TextNodeComponent>;

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

const lockedNodeWrapper = NodeWrappersFactory.wrap({ ...node, locked: true });

export const Locked: Story = {
    decorators: decorators,
    args: defaultArgs,
    render: () => DecoratableNodeBuilder.from(lockedNodeWrapper).selection().build().render() as JSX.Element
};

export const Editing: Story = {
    decorators: decorators,
    args: defaultArgs,
    render: () =>
        DecoratableNodeBuilder.from(wrapper)
            .editing({ change: () => {}, end: () => {} })
            .selection()
            .build()
            .render() as JSX.Element
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
