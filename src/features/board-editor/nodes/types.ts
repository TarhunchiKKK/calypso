import { ReactNode } from "react";

export type NodeTypes = "sticker" | "arrow" | "notes";

export type NodeBase = {
    id: string;

    type: NodeTypes;
};

export abstract class NodeImpl {
    protected isSelected = false;

    public constructor(protected node: NodeBase) {}

    public abstract render(): ReactNode;
}
