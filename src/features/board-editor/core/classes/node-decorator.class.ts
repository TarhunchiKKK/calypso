import { NodeBase } from "../types/node.types";
import { Renderable } from "../types/ui.types";
import { NodeWrapper } from "./node-wrappper.class";

export abstract class NodeDecorator<T extends NodeBase> implements Renderable {
    public constructor(private readonly wrapper: NodeWrapper<T>) {}

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
