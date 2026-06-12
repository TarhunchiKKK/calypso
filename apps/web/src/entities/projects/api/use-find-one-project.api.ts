import type { FindOneProjectDto, Project } from "@lib/projects";
import { useQuery } from "@tanstack/react-query";
import { ApiInstance } from "@/shared/model";
import { queryKeys } from "./api.lib";

export function useFindOneProject<T extends Project = Project>(dto: FindOneProjectDto) {
    return useQuery({
        queryKey: queryKeys.singleProject(dto.id),
        queryFn: async () => {
            return await ApiInstance.get<T>("/projects/one", {
                data: dto
            });
        }
    });
}
