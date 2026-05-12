import type { CreateManyNodesDto, NodeBase, RemoveManyNodesDto, UpdateManyNodesDto } from "@repo/boards-common";
import type { Id } from "@repo/common";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiInstance } from "@/shared/model";

const queryKeys = {
    findAll: (boardId: Id) => ["board-nodes", boardId]
};

function useCreateMany() {
    return useMutation({
        mutationFn: async (dto: CreateManyNodesDto) => {
            return await ApiInstance.post("/boards/nodes", dto);
        }
    });
}

function useFindAll(boardId: Id) {
    return useQuery({
        queryKey: queryKeys.findAll(boardId),
        queryFn: async () => {
            return await ApiInstance.get<NodeBase[]>("/boards/nodes");
        }
    });
}

function useUpdateMany() {
    return useMutation({
        mutationFn: async (dto: UpdateManyNodesDto) => {
            return await ApiInstance.patch("/boards/nodes", dto);
        }
    });
}

function useRemoveMany() {
    return useMutation({
        mutationFn: async (dto: RemoveManyNodesDto) => {
            return await ApiInstance.delete("/boards/nodes", {
                data: dto
            });
        }
    });
}

function useInvalidateCache(boardId: Id) {
    const queryClient = useQueryClient();

    return () => {
        queryClient.invalidateQueries({ queryKey: queryKeys.findAll(boardId) });
    };
}

export const NodesApi = {
    useCreateMany,
    useFindAll,
    useUpdateMany,
    useRemoveMany,
    useInvalidateCache
};
