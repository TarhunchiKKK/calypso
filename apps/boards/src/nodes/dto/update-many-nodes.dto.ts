import type { NodeBase } from "@lib/boards";
import type { Id } from "@lib/common";

// DELETE: corresponding type exists in `@li/boards`
export type UpdateManyNodesDto = {
    boardId: Id;

    nodes: NodeBase[];
};
