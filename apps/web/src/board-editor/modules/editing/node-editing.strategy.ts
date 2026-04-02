import type { NodeBase } from "@repo/boards-common";
import type { Decoratable } from "@/board-editor/core";

export abstract class NodeEditingStrategy {
    public constructor(protected readonly handler: (node: NodeBase) => void) {}

    public abstract ui(node: Decoratable<NodeBase>): React.ReactNode;
}
