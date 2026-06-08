import type { FindAllProjectsGrpcRequest } from "@api/contracts";
import type { Id } from "@lib/common";

export const BoardsCacheKeys = {
    byCreator: (creatorId: Id) => `boards:${creatorId}:*`,
    byId: (userId: Id, boardId: Id) => `boards:${userId}:${boardId}`,
    byFilters: ({ userId, filters, pagination }: FindAllProjectsGrpcRequest) => `boards:${userId}:${JSON.stringify(filters)}:${JSON.stringify(pagination)}`
};

export const BoardsCacheTtls = {
    byFilters: 600,
    byId: 500
};
