import type { Board, CreateBoardDto, UpdateBoardDto } from "@lib/boards";
import type { Id } from "@lib/common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProjectsQueryKeys } from "@/entities/projects";
import { ApiInstance } from "@/shared/model";

function useCreate() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (dto: CreateBoardDto) => {
            return await ApiInstance.post<Board>("/boards/management", dto);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ProjectsQueryKeys.base });
        }
    });
}

function useUpdate() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (dto: UpdateBoardDto & { id: Id }) => {
            const { id, ...data } = dto;

            return await ApiInstance.patch<void>(`/boards/management/${id}`, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ProjectsQueryKeys.base });
        }
    });
}

export const BoardsApi = {
    useCreate,
    useUpdate
};
