import type { Meta, StoryObj } from "@storybook/react-vite";
import type { JSX } from "react";
import { applyDecorators, centered, relative, withDots } from "#/lib/decorators";
import { DecoratableNodeBuilder } from "@/board-editor/nodes/compose/lib/decoratable-node.builder";
import { NodeWrappersFactory } from "@/board-editor/nodes/compose/lib/node-wrappers.factory";
import { ArrowNodeComponent } from "@/board-editor/nodes/variants/arrow/component";
import { NodesFactory } from "@/entities/nodes";

const absolutePosition = {
    start: { x: 0, y: 0 },
    end: { x: 100, y: 0 }
};

const node = {
    ...NodesFactory.arrow({ point: { x: 50, y: 0 } }),
    absolutePosition: absolutePosition
};
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
    title: "Board Editor/Nodes/Variants/Arrow/Strategies",
    component: ArrowNodeComponent
} satisfies Meta<typeof ArrowNodeComponent>;

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

export const Resizable: Story = {
    decorators: decorators,
    args: defaultArgs,
    render: () =>
        DecoratableNodeBuilder.from(wrapper)
            .selection()
            .resizable(() => {})
            .build()
            .render() as JSX.Element
};
