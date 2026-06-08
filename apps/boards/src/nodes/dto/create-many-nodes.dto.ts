import type { NodeBase } from "@lib/boards";
import type { Id } from "@lib/common";

export type CreateManyNodesDto = {
    boardId: Id;

    nodes: NodeBase[];
};
