import type { Boards } from "@repo/common";
import type { Decoratable } from "../types/decorators.types";
import type { Renderable } from "../types/ui.types";

export abstract class NodeDecorator<T extends Boards.NodeBase = Boards.NodeBase> implements Renderable, Decoratable<T> {
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

    public get wrapper() {
        return this.entry.wrapper;
    }

    public abstract render(children?: React.ReactNode): React.ReactNode;
}
