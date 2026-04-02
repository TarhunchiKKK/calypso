import type { Rect } from "@repo/common";
import type { Decoratable } from "../types/decorators.types";
import type { Renderable } from "../types/ui.types";
import type { NodeBase } from "@repo/boards-common";

// FIX: set same types for event names
export type NodeHandlers = {
    onMouseDown?: React.MouseEventHandler;

    onMouseUp?: (e: React.MouseEvent) => void;
};

export abstract class NodeWrapper<T extends NodeBase = NodeBase> implements Renderable, Decoratable<T> {
    protected showContent = true;

    protected handlers: NodeHandlers = {};

    public constructor(protected node: T) {}

    public get id() {
        return this.node.id;
    }

    public get type() {
        return this.node.type;
    }

    public get data() {
        return this.node;
    }

    public set data(node: T) {
        this.node = node;
    }

    public get wrapper() {
        return this;
    }

    public hideContent() {
        this.showContent = false;
        return true;
    }

    public setHandlers(handlers: NodeHandlers) {
        this.handlers = handlers;
        return this;
    }

    // DELETE
    public abstract get rect(): Rect;

    // DELETE
    public abstract clone(data?: Partial<T>): NodeWrapper<T>;

    public abstract render(children?: React.ReactNode): React.ReactNode;
}
