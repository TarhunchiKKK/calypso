import React from "react";
import { NodeBase } from "../types/node";
import { Renderable } from "../types/ui";
import { Point, Rect } from "../lib/geometry";
import { Decoratable } from "../types/decorators";

export type NodeHandlers = {
    onClick?: (e: React.MouseEvent) => void;

    onMouseDown?: React.MouseEventHandler;

    onMouseUp?: (e: React.MouseEvent) => void;
};

export abstract class NodeWrapper<T extends NodeBase = NodeBase> implements Renderable, Decoratable<T> {
    protected showContent = true;

    protected handlers: NodeHandlers = {};

    public constructor(protected node: T) {}

    public get id() {
        return this.node.id;
    }

    public get type() {
        return this.node.type;
    }

    public get data() {
        return this.node;
    }

    public set data(node: T) {
        this.node = node;
    }

    public get wrapper() {
        return this;
    }

    public abstract get rect(): Rect;

    public hideContent() {
        this.showContent = false;
        return true;
    }

    public setHandler<Key extends keyof NodeHandlers>(key: Key, handler: NodeHandlers[Key] | undefined) {
        this.handlers[key] = handler;
        return this;
    }

    public abstract clone(data?: Partial<T>): NodeWrapper<T>;

    public abstract moveTo(point: Point): NodeWrapper<T>;

    public abstract render(children?: React.ReactNode): React.ReactNode;
}
