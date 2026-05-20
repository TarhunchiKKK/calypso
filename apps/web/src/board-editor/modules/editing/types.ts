import type { NodeBase } from "@repo/boards";

export type NodeEditingHandlers = {
    change: (node: NodeBase) => void;

    end: () => void;
};
