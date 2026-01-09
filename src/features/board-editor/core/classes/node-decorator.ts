import { Decoratoratable } from "../types/decorators";
import { NodeBase } from "../types/node";
import { Renderable } from "../types/ui";

export abstract class NodeDecorator<T extends NodeBase> implements Renderable, Decoratoratable<T> {
    public constructor(private readonly wrapper: Decoratoratable<T>) {}

    public get id() {
        return this.wrapper.id;
    }

    public get type() {
        return this.wrapper.type;
    }

    public get data() {
        return this.wrapper.data;
    }

    public abstract render(): React.ReactNode;
}
