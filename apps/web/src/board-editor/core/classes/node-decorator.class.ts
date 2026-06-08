import type { NodeBase } from "@lib/boards";
import type { Decoratable } from "../types/decorators.types";
import type { Renderable } from "../types/ui.types";

/**
 * This class represents contract for all node decorator classes.
 *
 * @template T Type of the decorated node.
 */
export abstract class NodeDecorator<T extends NodeBase = NodeBase> implements Renderable, Decoratable<T> {
    public constructor(protected readonly entry: Decoratable<T>) {}

    public get id() {
        return this.entry.id;
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
