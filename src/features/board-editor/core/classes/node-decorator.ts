import React from "react";
import { Decoratoratable } from "../types/decorators";
import { NodeBase } from "../types/node";
import { Renderable } from "../types/ui";

export abstract class NodeDecorator<T extends NodeBase> implements Renderable, Decoratoratable<T> {
    public constructor(protected readonly entry: Decoratoratable<T>) {}

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
