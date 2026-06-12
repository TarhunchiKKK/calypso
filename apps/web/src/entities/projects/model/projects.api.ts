import type { Id, OmitFields } from "@lib/common";
import type {
    DuplicateProjectDto,
    FindAllProjectsQuery,
    FindOneProjectDto,
    Project,
    ProjectWithCreator,
    ProjectWithType,
    RemoveProjectDto,
    UpdateProjectDto
} from "@lib/projects";
import { infiniteQueryOptions, useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiInstance } from "@/shared/model";

export const ProjectsQueryKeys = {
    base: ["projects"],
    projectsList: (params: OmitFields<FindAllProjectsQuery, "page">) => [...ProjectsQueryKeys.base, "list", params],
    singleProject: (projectId: Id) => [...ProjectsQueryKeys.base, projectId]
};

function useDuplicate() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (dto: DuplicateProjectDto) => {
            return await ApiInstance.post<void>("/projects/duplicate", dto);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ProjectsQueryKeys.base });
        }
    });
}

function findAllOptions(params: OmitFields<FindAllProjectsQuery, "page">) {
    return infiniteQueryOptions({
        queryKey: ProjectsQueryKeys.projectsList(params),
        queryFn: async (meta) => {
            return await ApiInstance.get<ProjectWithCreator<ProjectWithType>[]>("/projects/all", {
                params: {
                    ...params,
                    page: meta.pageParam
                }
            });
        },
        initialPageParam: 0,
        getNextPageParam: (result, _, prevPage) => (result.length === 0 ? null : prevPage + 1),
        select: ({ pages }) =>
            pages.flat().map((project) => ({
                ...project,
                createdAt: new Date(project.createdAt),
                updatedAt: project.updatedAt ? new Date(project.updatedAt) : undefined
            }))
    });
}

function useFindAll(params: OmitFields<FindAllProjectsQuery, "page">) {
    return useInfiniteQuery(findAllOptions(params));
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
            queryClient.invalidateQueries({ queryKey: ProjectsQueryKeys.base });
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
            queryClient.invalidateQueries({ queryKey: ProjectsQueryKeys.base });
        }
    });
}

export const ProjectsApi = {
    options: {
        findAll: findAllOptions
    },
    useDuplicate,
    useFindAll,
    useFindOne,
    useUpdate,
    useRemove
};
