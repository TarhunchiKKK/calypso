import React, { ReactNode } from "react";
import { Point, Rect } from "../../domain/geometry";
import { NodeBase } from "../types";
import { ResizeDirection } from "../../domain/dom";

export type NodeHandlers = {
    onClick?: React.MouseEventHandler;

    onMouseDown?: React.MouseEventHandler;

    onResizeStart?: (nodeId: string, direction: ResizeDirection) => void;

    onDoubleClick?: (e: React.MouseEvent) => void;
};

export abstract class NodeImpl<T extends NodeBase = NodeBase> {
    protected isSelected = false;

    protected resizable = false;

    protected updateOne?: (node: NodeImpl) => void;

    public constructor(
        protected node: T,
        protected handlers: NodeHandlers = {}
    ) {}

    public get id() {
        return this.node.id;
    }

    public abstract moveTo(point: Point): NodeImpl<T>;

    public abstract resize(rect: Rect): NodeImpl<T>;

    public select(resizable: boolean = true) {
        this.isSelected = true;
        this.resizable = resizable;
        return this;
    }

    public setUpdateOne(updateOne: typeof this.updateOne) {
        this.updateOne = updateOne;
        return this;
    }

    public setHandler<Key extends keyof NodeHandlers>(key: Key, handler: NodeHandlers[Key] | undefined) {
        this.handlers[key] = handler;
        return this;
    }

    public abstract rect(): Rect;

    public abstract clone(): NodeImpl<T>;

    public abstract render(): ReactNode;
}
