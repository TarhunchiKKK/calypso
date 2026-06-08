import type { NodeBase } from "@lib/boards";

export type NodeEditingHandlers = {
    change: (node: NodeBase) => void;

    end: () => void;
};
