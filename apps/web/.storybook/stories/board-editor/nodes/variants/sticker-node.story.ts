import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { JSX } from "react";
import { centered } from "#/lib/decorators";
import { DecoratableNodeBuilder } from "@/board-editor/nodes/compose/lib/decoratable-node.builder";
import { NodeWrappersFactory } from "@/board-editor/nodes/compose/lib/node-wrappers.factory";
import { StickerComponent } from "@/board-editor/nodes/variants/sticker/component";
import { NodesFactory } from "@/entities/nodes";

const sticker = NodesFactory.sticker({ point: { x: 0, y: 0 } });
const wrapper = NodeWrappersFactory.wrap([], sticker);

const defaultArgs = {
    node: sticker,
    handlers: {},
    uiSettings: {
        noPointerEvents: false,
        showContent: true
    }
};

const meta = {
    title: "Board Editor/Nodes/Variants/Sticker",
    component: StickerComponent
} satisfies Meta<typeof StickerComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    decorators: centered,
    args: defaultArgs,
    render: () => wrapper.render()
};

export const Selected: Story = {
    decorators: centered,
    args: defaultArgs,
    render: () => DecoratableNodeBuilder.from(wrapper).selection().build().render() as JSX.Element
};

const lockedNodeWrapper = NodeWrappersFactory.wrap([], { ...sticker, locked: true });

export const Lockced: Story = {
    decorators: centered,
    args: defaultArgs,
    render: () => DecoratableNodeBuilder.from(lockedNodeWrapper).selection().build().render() as JSX.Element
};

export const Editing: Story = {
    decorators: centered,
    args: defaultArgs,
    render: () =>
        DecoratableNodeBuilder.from(wrapper)
            .selection()
            .editing({ change: () => {}, end: () => {} })
            .build()
            .render() as JSX.Element
};

export const Resizable: Story = {
    decorators: centered,
    args: defaultArgs,
    render: () =>
        DecoratableNodeBuilder.from(wrapper)
            .selection()
            .resizable(() => {})
            .build()
            .render() as JSX.Element
};

export const Bindable: Story = {
    decorators: centered,
    args: defaultArgs,
    render: () => DecoratableNodeBuilder.from(wrapper).bindable({}, false).build().render() as JSX.Element
};

export const BindableActive: Story = {
    decorators: centered,
    args: defaultArgs,
    render: () => DecoratableNodeBuilder.from(wrapper).bindable({}, true).build().render() as JSX.Element
};
