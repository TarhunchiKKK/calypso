import type { Boards, Id } from "@repo/common";

export type CreateManyNodesDto = {
    boardId: Id;

    nodes: Boards.NodeBase[];
};
