import type { UpdateBoardDto } from "@lib/boards";
import type { Id } from "@lib/common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProjectsApi } from "@/entities/projects";
import type { CommonMutationOptions } from "@/shared/api";
import { ApiInstance } from "@/shared/api";

export function useUpdateBoard(options: CommonMutationOptions = {}) {
    const queryClient = useQueryClient();

    return useMutation({
        ...options,
        mutationFn: async (dto: UpdateBoardDto & { id: Id }) => {
            const { id, ...data } = dto;

            return await ApiInstance.patch<void>(`/boards/management/${id}`, data);
        },
        onSuccess: (data, variables, result, context) => {
            queryClient.invalidateQueries({ queryKey: ProjectsApi.queryKeys.base });

            options.onSuccess?.(data, variables, result, context);
        }
    });
}
