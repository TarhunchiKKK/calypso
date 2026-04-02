import type { Decoratable } from "@/board-editor/core";
import { NodeDecoratorsFactory } from "../factories/node-decorators.factory";
import type { Rect } from "@repo/common";
import type { ResizeHandler } from "@/board-editor/modules/resizing";
import type { BindingNodeHandlers } from "@/board-editor/modules/arrows-binding";
import type { NodeBase } from "@repo/boards-common";

// TODO: implement this class in other files
export class DecoratableNodeBuilder {
    private constructor(private node: Decoratable) {}

    public static from(node: Decoratable) {
        return new DecoratableNodeBuilder(node);
    }

    public selection() {
        this.node = NodeDecoratorsFactory.selectable(this.node);
        return this;
    }

    public dragging() {
        this.node = NodeDecoratorsFactory.draggable(this.node);
        return this;
    }

    public editing(handler: (node: NodeBase) => void) {
        this.node = NodeDecoratorsFactory.editable(this.node, handler);
        return this;
    }

    public resizing(size?: Rect, handler?: ResizeHandler) {
        this.node = NodeDecoratorsFactory.resizable(this.node, size, handler);
        return this;
    }

    public bindable(handlers: BindingNodeHandlers) {
        this.node = NodeDecoratorsFactory.bindable(this.node, handlers);
        return this;
    }

    public build() {
        return this.node;
    }
}
