import React from "react";
import { ResizeDirection } from "../../modules/resizing";
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
    onResizeStart?: (nodeId: string, direction: ResizeDirection) => void;

    // DELETE: this handler should be in decorator/proxy
    onEditingEnd?: (node: AnyNode) => void;
};

export abstract class NodeWrapper<T extends NodeBase = AnyNode> implements Renderable, Decoratable<T> {
    // DELETE: this field should be in decorator/proxy
    protected resizable = false;

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

    // DELETE: this method should not exist here
    public get wrapper() {
        return this;
    }

    public abstract moveTo(point: Point): NodeWrapper<T>;

    // DELETE: this method should be moved to decorator/proxy
    public abstract resize(rect: Rect): NodeWrapper<T>;

    public setEditing() {
        this.isEditing = true;
        return this;
    }

    public setHandler<Key extends keyof NodeHandlers>(key: Key, handler: NodeHandlers[Key] | undefined) {
        this.handlers[key] = handler;
        return this;
    }

    // DELETE: this method is useless
    public getAdditionalUi(): React.ReactNode {
        return null;
    }

    public abstract rect(): Rect;

    // DELETE: this method is not neccessary and should be deleted
    public abstract clone(): NodeWrapper<T>;

    public abstract render(children?: React.ReactNode): React.ReactNode;
}
