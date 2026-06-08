import type { NodeBase } from "@lib/boards";
import type { Id } from "@repo/common";

export type CreateManyNodesDto = {
    boardId: Id;

    nodes: NodeBase[];
};
