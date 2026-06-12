import type { Board, CreateBoardDto } from "@lib/boards";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProjectsApi } from "@/entities/projects";
import type { CommonMutationOptions } from "@/shared/api";
import { ApiInstance } from "@/shared/api";

export function useCreateBoard(options: CommonMutationOptions = {}) {
    const queryClient = useQueryClient();

    return useMutation({
        ...options,
        mutationFn: async (dto: CreateBoardDto) => {
            return await ApiInstance.post<Board>("/boards/management", dto);
        },
        onSuccess: (data, variables, result, context) => {
            queryClient.invalidateQueries({ queryKey: ProjectsApi.queryKeys.base });

            options.onSuccess?.(data, variables, result, context);
        }
    });
}
