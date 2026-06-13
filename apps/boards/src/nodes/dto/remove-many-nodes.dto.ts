import type { Id } from "@lib/common";

// DELETE: corresponding type exists in `@lib/boards`
export type RemoveManyNodesDto = {
    ids: Id[];

    boardId: Id;
};
