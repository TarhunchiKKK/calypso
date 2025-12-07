import { OmitFields } from "@/shared/lib/typescript";
import { ReactNode } from "react";

type NodeTypes = "sticker" | "arrow" | "notes";

export type NodeBase = {
    id: string;

    type: NodeTypes;
};

export abstract class NodeImpl {
    protected isSelected = false;

    public constructor(protected node: OmitFields<NodeBase, "type">) {}

    public abstract render(): ReactNode;
}
