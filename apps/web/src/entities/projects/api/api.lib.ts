import type { Id, OmitFields } from "@lib/common";
import type { FindAllProjectsQuery } from "@lib/projects";

export const queryKeys = {
    base: ["projects"],
    projectsList: (params: OmitFields<FindAllProjectsQuery, "page">) => [...queryKeys.base, "list", params],
    singleProject: (projectId: Id) => [...queryKeys.base, projectId]
};
