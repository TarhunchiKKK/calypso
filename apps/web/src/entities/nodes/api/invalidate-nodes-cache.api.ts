import type { Id } from "@lib/common";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "./api.lib";

export function useInvalidateNodesCache() {
    const queryClient = useQueryClient();

    return (boardId: Id) => {
        queryClient.invalidateQueries({ queryKey: queryKeys.findAll(boardId) });
    };
}
