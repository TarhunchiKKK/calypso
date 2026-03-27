import type { Id } from "@repo/common";

export type RemoveManyNodesDto = {
    ids: Id[];

    boardId: Id;
};
