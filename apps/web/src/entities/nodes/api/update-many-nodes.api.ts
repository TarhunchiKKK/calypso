import type { NodeBase, UpdateManyNodesDto } from "@lib/boards";
import type { OmitFields } from "@lib/common";
import { useMutation } from "@tanstack/react-query";
import type { CommonMutationOptions } from "@/shared/api";
import { ApiInstance } from "@/shared/model";

export function useUpdateManyNodes(options: CommonMutationOptions = {}) {
    return useMutation({
        ...options,
        mutationFn: async (dto: OmitFields<UpdateManyNodesDto, "nodes"> & { nodes: NodeBase[] }) => {
            dto.nodes;
            return await ApiInstance.patch("/boards/nodes", dto);
        }
    });
}
