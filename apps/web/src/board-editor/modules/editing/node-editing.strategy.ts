import type { Boards } from "@repo/common";

export abstract class NodeEditingStrategy {
    public constructor(protected readonly handler: (node: Boards.NodeBase) => void) {}

    public abstract ui(node: Boards.NodeBase): React.ReactNode;
}
