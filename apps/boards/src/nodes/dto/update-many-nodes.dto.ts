import type { Boards, Id } from "@repo/common";

export type UpdateManyNodesDto = {
    boardId: Id;

    nodes: Boards.NodeBase[];
};
