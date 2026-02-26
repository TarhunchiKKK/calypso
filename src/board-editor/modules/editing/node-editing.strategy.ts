import type { NodeBase } from "@/entities/nodes";

export abstract class NodeEditingStrategy {
    public constructor(protected readonly handler: (node: NodeBase) => void) {}

    public abstract ui(node: NodeBase): React.ReactNode;
}
