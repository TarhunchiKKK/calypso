import type { Id } from "@repo/common";
import type { ProjectWithCreator, ProjectWithType } from "@repo/projects";
import { OwnerFilters, SortOrders } from "../types/filtering.types";

export const OwnerFilteringFunctions: Record<OwnerFilters, (project: ProjectWithCreator<ProjectWithType>, userId: Id) => boolean> = {
    [OwnerFilters.ANYONE]: () => true,
    [OwnerFilters.ME]: (project, userId) => project.creator.id === userId,
    [OwnerFilters.NOT_ME]: (project, userId) => project.creator.id !== userId
};

export const SortingFunctions: Record<SortOrders, (a: ProjectWithType, b: ProjectWithType) => number> = {
    [SortOrders.LAST_MODIFIED]: (a, b) => {
        if (!a.updatedAt && !b.updatedAt) {
            return 0;
        } else if (!a.updatedAt) {
            return 1;
        } else if (!b.updatedAt) {
            return -1;
        } else {
            return a.updatedAt.getTime() - b.updatedAt.getTime();
        }
    },
    [SortOrders.ALPHABETIC]: (a, b) => a.title.localeCompare(b.title),
    [SortOrders.LAST_CREATED]: (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
};
