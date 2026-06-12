import type { RemoveManyNodesDto } from "@lib/boards";
import { useMutation } from "@tanstack/react-query";
import type { CommonMutationOptions } from "@/shared/api";
import { ApiInstance } from "@/shared/api";

export function useRemoveManyNodes(options: CommonMutationOptions = {}) {
    return useMutation({
        ...options,
        mutationFn: async (dto: RemoveManyNodesDto) => {
            return await ApiInstance.delete("/boards/nodes", {
                data: dto
            });
        }
    });
}
