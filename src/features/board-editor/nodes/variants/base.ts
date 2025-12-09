import { OmitFields } from "@/shared/lib/typescript";
import { ReactNode } from "react";
import { Point, Rect } from "../../domain/geometry";
import { NodeBase } from "../types";

export type NodeHandlers = {
    onClick?: React.MouseEventHandler;

    onMouseDown?: React.MouseEventHandler;

    onResize?: () => void;
};

export abstract class NodeImpl {
    protected isSelected = false;

    protected resizable = false;

    public constructor(
        protected node: OmitFields<NodeBase, "type">,
        protected handlers: NodeHandlers = {}
    ) {}

    public get id() {
        return this.node.id;
    }

    public setOnClick(onClick?: React.MouseEventHandler) {
        this.handlers.onClick = onClick;
        return this;
    }

    public setOnMouseDown(onMouseDown?: React.MouseEventHandler) {
        this.handlers.onMouseDown = onMouseDown;
        return this;
    }

    public abstract moveTo(point: Point): NodeImpl;

    public select(resizable: boolean = true) {
        this.isSelected = true;
        this.resizable = resizable;
        return this;
    }

    public abstract rect(): Rect;

    public abstract clone(): NodeImpl;

    public abstract render(): ReactNode;
}
