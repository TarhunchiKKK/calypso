import type { FindOneProjectDto, Project } from "@repo/common";
import { useQuery } from "@tanstack/react-query";
import { ProjectsQueryKeys } from "./use-projects-api.hook";

// TODO: implement token extraction
// const token = "mock-token";

export function useFindOneProject<T extends Project = Project>(dto: FindOneProjectDto) {
    return useQuery({
        queryKey: ProjectsQueryKeys.singleProject(dto.id),
        queryFn: async () => {
            // return await axios.get<T>(`${Env.api.url}/projects/one`, {
            //     headers: {
            //         Authorization: `Bearer ${token}`
            //     },
            //     data: dto
            // });

            return await Promise.resolve(dto as T);
        }
    });
}
