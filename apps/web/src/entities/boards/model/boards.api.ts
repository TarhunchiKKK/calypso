import type { Board, CreateBoardDto, UpdateBoardDto } from "@lib/boards";
import type { Id } from "@lib/common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProjectsQueryKeys } from "@/entities/projects";
import type { CommonMutationOptions } from "@/shared/api";
import { ApiInstance } from "@/shared/model";

function useCreate(options: CommonMutationOptions = {}) {
    const queryClient = useQueryClient();

    return useMutation({
        ...options,
        mutationFn: async (dto: CreateBoardDto) => {
            return await ApiInstance.post<Board>("/boards/management", dto);
        },
        onSuccess: (data, variables, result, context) => {
            queryClient.invalidateQueries({ queryKey: ProjectsQueryKeys.base });

            options.onSuccess?.(data, variables, result, context);
        }
    });
}

function useUpdate(options: CommonMutationOptions = {}) {
    const queryClient = useQueryClient();

    return useMutation({
        ...options,
        mutationFn: async (dto: UpdateBoardDto & { id: Id }) => {
            const { id, ...data } = dto;

            return await ApiInstance.patch<void>(`/boards/management/${id}`, data);
        },
        onSuccess: (data, variables, result, context) => {
            queryClient.invalidateQueries({ queryKey: ProjectsQueryKeys.base });

            options.onSuccess?.(data, variables, result, context)
        }
    });
}

export const BoardsApi = {
    useCreate,
    useUpdate
};
