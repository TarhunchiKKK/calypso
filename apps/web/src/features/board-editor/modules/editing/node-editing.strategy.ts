import type { NodeBase } from "@repo/common";
import type React from "react";

export abstract class NodeEditingStrategy {
    public constructor(protected readonly handler: (node: NodeBase) => void) {}

    public abstract ui(node: NodeBase): React.ReactNode;
}
