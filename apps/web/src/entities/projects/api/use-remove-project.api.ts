import type { RemoveProjectDto } from "@lib/projects";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CommonMutationOptions } from "@/shared/api";
import { ApiInstance } from "@/shared/model";
import { queryKeys } from "./api.lib";

export function useRemoveProject(options: CommonMutationOptions = {}) {
    const queryClient = useQueryClient();

    return useMutation({
        ...options,
        mutationFn: async (dto: RemoveProjectDto) => {
            return await ApiInstance.delete("/projects", {
                data: dto
            });
        },
        onSuccess: (data, variables, result, context) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.base });

            options.onSuccess?.(data, variables, result, context);
        }
    });
}
