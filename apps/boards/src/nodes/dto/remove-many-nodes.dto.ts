import type { Id } from "@lib/common";

export type RemoveManyNodesDto = {
    ids: Id[];

    boardId: Id;
};
