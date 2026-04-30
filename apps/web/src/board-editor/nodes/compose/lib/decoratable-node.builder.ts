import type { NodeBase } from "@repo/boards-common";
import type { Offset, Rect } from "@repo/common";
import type { Decoratable } from "@/board-editor/core";
import type { BindingNodeHandlers } from "@/board-editor/modules/arrows-binding";
import type { ResizeHandler } from "@/board-editor/modules/resizing";
import { NodeDecoratorsFactory } from "./node-decorators.factory";

export class DecoratableNodeBuilder {
    private constructor(private node: Decoratable) {}

    public static from(node: Decoratable) {
        return new DecoratableNodeBuilder(node);
    }

    public selection() {
        this.node = NodeDecoratorsFactory.selection(this.node);
        return this;
    }

    public dragging(offset?: Offset) {
        this.node = NodeDecoratorsFactory.dragging(this.node, offset);
        return this;
    }

    public editing(handler: (node: NodeBase) => void) {
        this.node = NodeDecoratorsFactory.editing(this.node, handler);
        return this;
    }

    public resizable(handler: ResizeHandler) {
        this.node = NodeDecoratorsFactory.resizable(this.node, handler);
        return this;
    }

    public resizing(size?: Rect) {
        this.node = NodeDecoratorsFactory.resizing(this.node, size);
        return this;
    }

    public bindable(handlers: BindingNodeHandlers, active: boolean) {
        this.node = NodeDecoratorsFactory.bindable(this.node, handlers, active);
        return this;
    }

    public binding() {
        this.node = NodeDecoratorsFactory.binding(this.node);
        return this;
    }

    public build() {
        return this.node;
    }
}
