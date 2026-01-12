import React from "react";
import { Decoratable } from "../types/decorators";
import { Renderable } from "../types/ui";

export abstract class NodeDecorator implements Renderable, Decoratable {
    public constructor(protected readonly entry: Decoratable) {}

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
