import type React from "react";
import type { NodeBase } from "../../core";

export abstract class NodeEditingStrategy {
    public constructor(protected readonly handler: (node: NodeBase) => void) {}

    public abstract ui(node: NodeBase): React.ReactNode;
}
