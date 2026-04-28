import type { NodeBase } from "@repo/boards-common";
import type React from "react";
import type { Decoratable } from "@/board-editor/core";

export abstract class NodeBindingStrategy<T extends NodeBase = NodeBase> {
    public abstract updateNode(entry: Decoratable): void;

    public abstract ui(node: T): React.ReactNode;
}
