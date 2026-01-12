import React from "react";
import { AnyNode } from "../../nodes";
import { NodeBase } from "../types/node";
import { Renderable } from "../types/ui";
import { Point, Rect } from "../lib/geometry";
import { Decoratable } from "../types/decorators";

export type NodeHandlers = {
    onClick?: (e: React.MouseEvent) => void;

    onMouseDown?: React.MouseEventHandler;

    onMouseUp?: (e: React.MouseEvent) => void;

    // CURRENT: this handler should be in decorator
    onEditingEnd?: (node: AnyNode) => void;
};

export abstract class NodeWrapper<T extends NodeBase = NodeBase> implements Renderable, Decoratable<T> {
    // CURRENT: this field should be in decorator
    protected isEditing = false;

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

    // CURRENT: this method should be in decorator
    public setEditing() {
        this.isEditing = true;
        return this;
    }

    public setHandler<Key extends keyof NodeHandlers>(key: Key, handler: NodeHandlers[Key] | undefined) {
        this.handlers[key] = handler;
        return this;
    }

    public abstract clone(data?: Partial<T>): NodeWrapper<T>;

    // REFACTOR: this method should be switched to getter
    public abstract rect(): Rect;

    public abstract setRect(rect: Rect): NodeWrapper<T>;

    public abstract moveTo(point: Point): NodeWrapper<T>;

    public abstract render(children?: React.ReactNode): React.ReactNode;
}
