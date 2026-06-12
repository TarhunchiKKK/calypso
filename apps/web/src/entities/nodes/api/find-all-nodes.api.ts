import type { NodeBase } from "@lib/boards";
import type { Id } from "@lib/common";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { ApiInstance } from "@/shared/api";
import { queryKeys } from "./api.lib";

export function findAllNodesOptions(boardId: Id) {
    return queryOptions({
        queryKey: queryKeys.findAll(boardId),
        queryFn: async () => {
            return await ApiInstance.get<NodeBase[]>("/boards/nodes");
        },
        enabled: !!boardId
    });
}

export function useFindAllNodes(boardId: Id) {
    return useQuery(findAllNodesOptions(boardId));
}
