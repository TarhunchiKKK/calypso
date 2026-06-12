import { queryKeys } from "./api.lib";
import { useCreateManyNodes } from "./create-many-nodes.api";
import { findAllNodesOptions, useFindAllNodes } from "./find-all-nodes.api";
import { useInvalidateNodesCache } from "./invalidate-nodes-cache.api";
import { useRemoveManyNodes } from "./remove-many-nodes.api";
import { useUpdateManyNodes } from "./update-many-nodes.api";

export const NodesApi = {
    queryKeys,
    options: {
        findAll: findAllNodesOptions
    },
    useCreateMany: useCreateManyNodes,
    useFindAll: useFindAllNodes,
    useUpdateMany: useUpdateManyNodes,
    useRemoveMany: useRemoveManyNodes,
    useInvalidateCache: useInvalidateNodesCache
};
