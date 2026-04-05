import type { DuplicateProjectDto, Id, RemoveProjectDto, UpdateProjectDto } from "@repo/common";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MockProjects } from "@/dev";

// TODO: implement token extraction
// const token = "mock-token";

export const ProjectsQueryKeys = {
    projects: ["projects"]
};

export function useProjectsApi() {
    const queryClient = useQueryClient();

    const duplicate = useMutation({
        mutationFn: async (dto: DuplicateProjectDto) => {
            // return await axios.post(`${Env.api.url}/projects/duplicate`, dto, {
            //     headers: {
            //         Authorization: `Bearer ${token}`
            //     }
            // });

            return await Promise.resolve(dto);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ProjectsQueryKeys.projects });
        }
    });

    const findAll = useQuery({
        queryKey: ProjectsQueryKeys.projects,
        queryFn: async () => {
            // return await axios.get<ProjectWithType[]>(`${Env.api.url}/projects`, {
            //     headers: {
            //         Authorization: `Bearer ${token}`
            //     }
            // });

            return await Promise.resolve(MockProjects);
        }
    });

    const update = useMutation({
        mutationFn: async (dto: UpdateProjectDto & { id: Id }) => {
            const { id, ...data } = dto;

            // return await axios.patch(`${Env.api.url}/projects/${id}`, data, {
            //     headers: {
            //         Authorization: `Bearer ${token}`
            //     }
            // });

            return await Promise.resolve({ id, data });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ProjectsQueryKeys.projects });
        }
    });

    const remove = useMutation({
        mutationFn: async (dto: RemoveProjectDto) => {
            // return await axios.delete(`${Env.api.url}/projects`, {
            //     headers: {
            //         Authorization: `Bearer ${token}`
            //     },
            //     data: dto
            // });

            return await Promise.resolve(dto);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ProjectsQueryKeys.projects });
        }
    });

    return { duplicate, findAll, update, remove };
}
