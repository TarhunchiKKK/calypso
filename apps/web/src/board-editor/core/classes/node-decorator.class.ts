import type { NodeBase } from "@repo/boards-common";
import type { Decoratable } from "../types/decorators.types";
import type { Renderable } from "../types/ui.types";

// DOCS: How decorators and strategies works
export abstract class NodeDecorator<T extends NodeBase = NodeBase> implements Renderable, Decoratable<T> {
    public constructor(protected readonly entry: Decoratable<T>) {}

    public get id() {
        return this.entry.id;
    }

    public get type() {
        return this.entry.type;
    }

    public get data() {
        return this.entry.data;
    }

    public set data(data: T) {
        this.entry.data = data;
    }

    public get wrapper() {
        return this.entry.wrapper;
    }

    public abstract render(children?: React.ReactNode): React.ReactNode;
}
