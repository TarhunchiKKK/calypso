import type {
    DuplicateProjectDto,
    FindOneProjectDto,
    Id,
    Project,
    ProjectWithCreator,
    ProjectWithType,
    RemoveProjectDto,
    UpdateProjectDto
} from "@repo/common";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiInstance } from "@/shared/model";

export const ProjectsQueryKeys = {
    projects: ["projects"],
    singleProject: (projectId: Id) => ["projects", projectId]
};

function useDuplicate() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (dto: DuplicateProjectDto) => {
            return await ApiInstance.post<void>("/projects/duplicate", dto);
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
            return await ApiInstance.get<ProjectWithCreator<ProjectWithType>[]>("/projects/all");
        },
        select: (projects) =>
            projects.map((project) => ({
                ...project,
                createdAt: new Date(project.createdAt),
                updatedAt: project.updatedAt ? new Date(project.updatedAt) : undefined
            }))
    });
}

function useFindOne<T extends Project = Project>(dto: FindOneProjectDto) {
    return useQuery({
        queryKey: ProjectsQueryKeys.singleProject(dto.id),
        queryFn: async () => {
            return await ApiInstance.get<T>("/projects/one", {
                data: dto
            });
        }
    });
}

function useUpdate() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (dto: UpdateProjectDto & { id: Id }) => {
            const { id, ...data } = dto;

            return await ApiInstance.patch<void>(`/projects/${id}`, data);
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
            return await ApiInstance.delete("/projects", {
                data: dto
            });
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
