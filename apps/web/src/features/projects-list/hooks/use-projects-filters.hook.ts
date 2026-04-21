import type { ProjectWithCreator, ProjectWithType } from "@repo/common";
import { useState } from "react";
import { OwnerFilteringFunctions, SortingFunctions } from "../constants/filtering-maps.constants";
import { type Filters, OwnerFilters, SortOrders } from "../types/filtering.types";

const defaultFilters: Filters = {
    typeFilter: null,
    ownerFilter: OwnerFilters.ANYONE,
    sortOrder: SortOrders.ALPHABETIC
};

// TODO: user id getting
const userId = "Mock id";

export function useProjectsFilters(projects: ProjectWithCreator<ProjectWithType>[]) {
    const [filters, setFilters] = useState(defaultFilters);

    const filteredProjects = projects
        .filter(project => (filters.title ? project.title.toLowerCase().includes(filters.title.toLowerCase()) : true))
        .filter(project => (filters.typeFilter ? project.type === filters.typeFilter : true))
        .filter(project => OwnerFilteringFunctions[filters.ownerFilter](project, userId))
        .sort(SortingFunctions[filters.sortOrder]);

    return { filters, setFilters, filteredProjects };
}
