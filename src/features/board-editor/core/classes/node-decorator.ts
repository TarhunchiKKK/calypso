import { Decoratoratable } from "../types/decorators";
import { NodeBase } from "../types/node";
import { Renderable } from "../types/ui";

export abstract class NodeDecorator<T extends NodeBase> implements Renderable, Decoratoratable<T> {
    public constructor(private readonly entry: Decoratoratable<T>) {}

    public get id() {
        return this.entry.id;
    }

    public get type() {
        return this.entry.type;
    }

    public get data() {
        return this.entry.data;
    }

    public abstract render(): React.ReactNode;
}
