import type { NodeBase } from "@repo/boards-common";
import type { Id } from "@repo/common";

export type UpdateManyNodesDto = {
    boardId: Id;

    nodes: NodeBase[];
};
