import { ReactNode } from "react";
import { ResizeDirection } from "../../modules/resizing";
import { AnyNode } from "../../nodes";
import { NodeBase } from "../types/node.types";
import { Renderable } from "../types/ui.types";
import { Point, Rect } from "../lib/geometry";

export type NodeHandlers = {
    onClick?: (e: React.MouseEvent) => void;

    onMouseDown?: React.MouseEventHandler;

    onMouseUp?: (e: React.MouseEvent) => void;

    // REFACTOR: this handler should be in decorator/proxy
    onResizeStart?: (nodeId: string, direction: ResizeDirection) => void;

    // REFACTOR: this handler should be in decorator/proxy
    onEditingEnd?: (node: AnyNode) => void;
};

export abstract class NodeWrapper<T extends NodeBase = AnyNode> implements Renderable {
    // REFACTOR: this field should be in decorator/proxy
    protected isSelected = false;

    // REFACTOR: this field should be in decorator/proxy
    protected resizable = false;

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

    public abstract resize(rect: Rect): NodeWrapper<T>;

    // REFACTOR: this method should be in decorator/proxy
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

    // DELETE: this method is not neccessary and should be deleted
    public abstract clone(): NodeWrapper<T>;

    public abstract render(): ReactNode;
}
