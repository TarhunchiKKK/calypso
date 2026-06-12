import type { OmitFields } from "@lib/common";
import type { FindAllProjectsQuery, ProjectWithCreator, ProjectWithType } from "@lib/projects";
import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";
import { ApiInstance } from "@/shared/api";
import { queryKeys } from "./api.lib";

export function findAllProjectsOptions(params: OmitFields<FindAllProjectsQuery, "page">) {
    return infiniteQueryOptions({
        queryKey: queryKeys.projectsList(params),
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

export function useFindAllProjects(params: OmitFields<FindAllProjectsQuery, "page">) {
    return useInfiniteQuery(findAllProjectsOptions(params));
}
