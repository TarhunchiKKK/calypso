import type { NodeBase } from "@lib/boards";
import type { Id } from "@repo/common";

export type UpdateManyNodesDto = {
    boardId: Id;

    nodes: NodeBase[];
};
