import { queryKeys } from "./api.lib";
import { findAllProjectsOptions, useFindAllProjects } from "./find-all-projects.api";
import { useDuplicateProject } from "./use-duplicate-project.api";
import { useFindOneProject } from "./use-find-one-project.api";
import { useRemoveProject } from "./use-remove-project.api";
import { useUpdateProject } from "./use-update-project.api";

export const ProjectsApi = {
    queryKeys,
    options: {
        findAll: findAllProjectsOptions
    },
    useDuplicate: useDuplicateProject,
    useFindAll: useFindAllProjects,
    useFindOne: useFindOneProject,
    useUpdate: useUpdateProject,
    useRemove: useRemoveProject
};
