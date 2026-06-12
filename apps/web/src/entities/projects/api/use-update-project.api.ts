import type { Id } from "@lib/common";
import type { UpdateProjectDto } from "@lib/projects";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CommonMutationOptions } from "@/shared/api";
import { ApiInstance } from "@/shared/api";
import { queryKeys } from "./api.lib";

export function useUpdateProject(options: CommonMutationOptions = {}) {
    const queryClient = useQueryClient();

    return useMutation({
        ...options,
        mutationFn: async (dto: UpdateProjectDto & { id: Id }) => {
            const { id, ...data } = dto;

            return await ApiInstance.patch<void>(`/projects/${id}`, data);
        },
        onSuccess: (data, variables, result, context) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.base });

            options.onSuccess?.(data, variables, result, context);
        }
    });
}
