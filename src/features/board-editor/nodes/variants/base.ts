import React from "react";
import { NodeBase } from "../types";
import { ResizeDirection } from "../../modules/resizing";
import { Point, Rect } from "../../lib/geometry";

export type NodeHandlers = {
    onClick?: (e: React.MouseEvent) => void;

    onMouseDown?: React.MouseEventHandler;

    onMouseUp?: (e: React.MouseEvent) => void;

    onResizeStart?: (nodeId: string, direction: ResizeDirection) => void;

    onDoubleClick?: (e: React.MouseEvent) => void;

    onEditingEnd?: (node: NodeImpl) => void;
};

export abstract class NodeImpl<T extends NodeBase = NodeBase> {
    protected isSelected = false;

    protected resizable = false;

    protected isEditing = false;

    public constructor(
        protected node: T,
        protected handlers: NodeHandlers = {}
    ) {}

    public get id() {
        return this.node.id;
    }

    public abstract moveTo(point: Point): NodeImpl<T>;

    public abstract resize(rect: Rect): NodeImpl<T>;

    public select(resizable: boolean = false) {
        this.isSelected = true;
        this.resizable = resizable;
        return this;
    }

    public setEditing() {
        this.isEditing = true;
        return this;
    }

    public setHandler<Key extends keyof NodeHandlers>(key: Key, handler: NodeHandlers[Key] | undefined) {
        this.handlers[key] = handler;
        return this;
    }

    public abstract rect(): Rect;

    public abstract clone(): NodeImpl<T>;

    public abstract render(): React.ReactNode;
}
