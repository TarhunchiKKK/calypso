import type { NodeBase } from "@repo/boards-common";
import type { Decoratable } from "@/board-editor/core";

export abstract class NodeEditingStrategy {
    public abstract ui(node: Decoratable<NodeBase>, handler: (node: NodeBase) => void): React.ReactNode;
}
