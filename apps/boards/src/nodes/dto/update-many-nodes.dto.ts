import type { NodeBase } from "@lib/boards";
import type { Id } from "@lib/common";

export type UpdateManyNodesDto = {
    boardId: Id;

    nodes: NodeBase[];
};
