import type { NodeBase } from "@repo/boards-common";

export type NodeEditingHandlers = {
    change: (node: NodeBase) => void;

    end: () => void;
};
