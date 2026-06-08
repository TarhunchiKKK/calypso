import type { CreateManyNodesDto, NodeBase, RemoveManyNodesDto, UpdateManyNodesDto } from "@lib/boards";
import type { Id, OmitFields } from "@lib/common";
import { queryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiInstance } from "@/shared/model";

const queryKeys = {
    findAll: (boardId: Id) => ["board-nodes", boardId]
};

function useCreateMany() {
    return useMutation({
        mutationFn: async (dto: OmitFields<CreateManyNodesDto, "nodes"> & { nodes: NodeBase[] }) => {
            return await ApiInstance.post("/boards/nodes", dto);
        }
    });
}

function findAllOptions(boardId: Id) {
    return queryOptions({
        queryKey: queryKeys.findAll(boardId),
        queryFn: async () => {
            return await ApiInstance.get<NodeBase[]>("/boards/nodes");
        },
        enabled: !!boardId
    });
}

function useFindAll(boardId: Id) {
    return useQuery(findAllOptions(boardId));
}

function useUpdateMany() {
    return useMutation({
        mutationFn: async (dto: OmitFields<UpdateManyNodesDto, "nodes"> & { nodes: NodeBase[] }) => {
            dto.nodes;
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

function useInvalidateCache() {
    const queryClient = useQueryClient();

    return (boardId: Id) => {
        queryClient.invalidateQueries({ queryKey: queryKeys.findAll(boardId) });
    };
}

export const NodesApi = {
    options: {
        findAll: findAllOptions
    },
    useCreateMany,
    useFindAll,
    useUpdateMany,
    useRemoveMany,
    useInvalidateCache
};
