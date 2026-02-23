import type { PropsWithChildren } from "react";
import type { NodeHandlers } from "@/board-editor/core";
import type { ShapeNode } from "./shape-node.type";

type Props = PropsWithChildren<{
    node: ShapeNode;

    handlers: NodeHandlers;
}>;

export function ShapeNodeComponent({ children }: Props) {
    return children;
}
