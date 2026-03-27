import type { Boards, Rect } from "@repo/common";
import type { Decoratable } from "../types/decorators.types";
import type { Renderable } from "../types/ui.types";

export type NodeHandlers = {
    onMouseDown?: React.MouseEventHandler;

    onMouseUp?: (e: React.MouseEvent) => void;
};

export abstract class NodeWrapper<T extends Boards.NodeBase = Boards.NodeBase> implements Renderable, Decoratable<T> {
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

    public abstract get rect(): Rect;

    public abstract clone(data?: Partial<T>): NodeWrapper<T>;

    public abstract render(children?: React.ReactNode): React.ReactNode;
}
