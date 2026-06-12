import type { CreateManyNodesDto, NodeBase } from "@lib/boards";
import type { OmitFields } from "@lib/common";
import { useMutation } from "@tanstack/react-query";
import type { CommonMutationOptions } from "@/shared/api";
import { ApiInstance } from "@/shared/model";

export function useCreateManyNodes(options: CommonMutationOptions = {}) {
    return useMutation({
        ...options,
        mutationFn: async (dto: OmitFields<CreateManyNodesDto, "nodes"> & { nodes: NodeBase[] }) => {
            return await ApiInstance.post("/boards/nodes", dto);
        }
    });
}
