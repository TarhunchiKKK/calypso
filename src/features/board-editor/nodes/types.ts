import { OmitFields } from "@/shared/lib/typescript";
import { HTMLAttributes, ReactNode } from "react";
import { Point, Rect } from "../domain/geometry";

type NodeTypes = "sticker" | "arrow" | "notes";

export type NodeBase = {
    id: string;

    type: NodeTypes;
};

export type NodeHandlers = Pick<HTMLAttributes<HTMLDivElement>, "onClick" | "onMouseDown">;

export abstract class NodeImpl {
    protected isSelected = false;

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

    public select() {
        this.isSelected = true;
        return this;
    }

    public abstract rect(): Rect;

    public abstract clone(): NodeImpl;

    public abstract render(): ReactNode;
}
