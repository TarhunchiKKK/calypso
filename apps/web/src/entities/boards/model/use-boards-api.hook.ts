import type { CreateBoardDto, UpdateBoardDto } from "@repo/boards-common";
import type { Id } from "@repo/common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProjectsQueryKeys } from "@/entities/projects/model/use-projects-api.hook";

// TODO: implement token extraction
const token = "mock-token";

export function useBoardsApi() {
    const queryClient = useQueryClient();

    const create = useMutation({
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

    const update = useMutation({
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

    return { create, update };
}
