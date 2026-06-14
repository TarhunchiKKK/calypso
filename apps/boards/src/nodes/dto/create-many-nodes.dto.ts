import type { NodeBase } from "@lib/boards";
import type { Id } from "@lib/common";

// DELETE: corresponding type exists in `@li/boards`
export type CreateManyNodesDto = {
    boardId: Id;

    nodes: NodeBase[];
};
