import React from "react";
import { Decoratable } from "../types/decorators";
import { Renderable } from "../types/ui";
import { NodeBase } from "../types/node";

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

    public get wrapper() {
        return this.entry.wrapper;
    }

    public abstract render(children?: React.ReactNode): React.ReactNode;
}
