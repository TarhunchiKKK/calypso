import type { Boards } from "@repo/common";
import type { Decoratable } from "@/board-editor/core";

export abstract class NodeEditingStrategy {
    public constructor(protected readonly handler: (node: Boards.NodeBase) => void) {}

    public abstract ui(node: Decoratable<Boards.NodeBase>): React.ReactNode;
}
