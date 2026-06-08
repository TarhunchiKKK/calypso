import type { Id } from "@lib/common";

export const NodesCacheKeys = {
    byBoardId: (boardId: Id) => `nodes:by-board:${boardId}`
};

export const NodesCacheTtls = {
    byBoardId: 500
};
