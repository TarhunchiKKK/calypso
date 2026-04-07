import type { DuplicateProjectDto, FindOneProjectDto, Id, Project, RemoveProjectDto, UpdateProjectDto } from "@repo/common";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MockProjects } from "@/dev";

export const ProjectsQueryKeys = {
    projects: ["projects"],
    singleProject: (projectId: Id) => ["projects", projectId]
};

function useDuplicate() {
    const queryClient = useQueryClient();

    return useMutation({
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
}

function useFindAll() {
    return useQuery({
        queryKey: ProjectsQueryKeys.projects,
        queryFn: async () => {
            // return await axios.get<ProjectWithType[]>(`${Env.api.url}/projects/all`, {
            //     headers: {
            //         Authorization: `Bearer ${token}`
            //     }
            // });

            return await Promise.resolve(MockProjects);
        }
    });
}

function useFindOne<T extends Project = Project>(dto: FindOneProjectDto) {
    return useQuery({
        queryKey: ProjectsQueryKeys.singleProject(dto.id),
        queryFn: async () => {
            // return await axios.get<T>(`${Env.api.url}/projects/one`, {
            //     headers: {
            //         Authorization: `Bearer ${token}`
            //     },
            //     data: dto
            // });

            return await Promise.resolve(dto as unknown as T);
        }
    });
}

function useUpdate() {
    const queryClient = useQueryClient();

    return useMutation({
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
}

function useRemove() {
    const queryClient = useQueryClient();

    return useMutation({
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
}

export const ProjectsApi = {
    useDuplicate,
    useFindAll,
    useFindOne,
    useUpdate,
    useRemove
};
