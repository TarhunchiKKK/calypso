import type { Id } from "@lib/common";

export const queryKeys = {
    findAll: (boardId: Id) => ["board-nodes", boardId]
};
