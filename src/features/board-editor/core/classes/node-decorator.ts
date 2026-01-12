import React from "react";
import { Decoratable } from "../types/decorators";
import { NodeBase } from "../types/node";
import { Renderable } from "../types/ui";

export abstract class NodeDecorator<T extends NodeBase> implements Renderable, Decoratable<T> {
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

    public abstract render(children?: React.ReactNode): React.ReactNode;
}
