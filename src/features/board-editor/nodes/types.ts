import { OmitFields } from "@/shared/lib/typescript";
import { ReactNode } from "react";

type NodeTypes = "sticker" | "arrow" | "notes";

export type NodeBase = {
    id: string;

    type: NodeTypes;
};

export abstract class NodeImpl {
    protected isSelected = false;

    public constructor(
        protected node: OmitFields<NodeBase, "type">,
        protected onClick?: React.MouseEventHandler
    ) {}

    public get id() {
        return this.node.id;
    }

    public setOnClick(onClick: React.MouseEventHandler) {
        this.onClick = onClick;
        return this;
    }

    public abstract toSelected(): NodeImpl;

    public abstract render(): ReactNode;
}
