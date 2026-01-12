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

    // DELETE: this handler should be in decorator/proxy
    onEditingEnd?: (node: AnyNode) => void;
};

export abstract class NodeWrapper<T extends NodeBase = AnyNode> implements Renderable, Decoratable<T> {
    // DELETE: this field should be in decorator/proxy
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

    public abstract moveTo(point: Point): NodeWrapper<T>;

    public setEditing() {
        this.isEditing = true;
        return this;
    }

    public setHandler<Key extends keyof NodeHandlers>(key: Key, handler: NodeHandlers[Key] | undefined) {
        this.handlers[key] = handler;
        return this;
    }

    public abstract rect(): Rect;

    public abstract clone(data?: Partial<T>): NodeWrapper<T>;

    public abstract render(children?: React.ReactNode): React.ReactNode;
}
