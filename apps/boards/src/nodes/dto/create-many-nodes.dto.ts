import type { NodeBase } from "@repo/boards-common";
import type { Id } from "@repo/common";

export type CreateManyNodesDto = {
    boardId: Id;

    nodes: NodeBase[];
};
