import type { CreateBoardDto, UpdateBoardDto } from "@repo/boards-common";
import type { Id } from "@repo/common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProjectsQueryKeys } from "@/entities/projects";

function useCreate() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (dto: CreateBoardDto) => {
            // return axios.post(`${Env.api.url}/boards`, dto, {
            //     headers: {
            //         Authorization: `Bearer ${token}`
            //     }
            // });

            return Promise.resolve(dto);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ProjectsQueryKeys.projects });
        }
    });
}

function useUpdate() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (dto: UpdateBoardDto & { id: Id }) => {
            // const { id, ...data } = dto;

            // return axios.put(`${Env.api.url}/boards/${id}`, data, {
            //     headers: {
            //         Authorization: `Bearer ${token}`
            //     }
            // });

            return Promise.resolve(dto);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ProjectsQueryKeys.projects });
        }
    });
}

export const BoardsApi = {
    useCreate,
    useUpdate
};
