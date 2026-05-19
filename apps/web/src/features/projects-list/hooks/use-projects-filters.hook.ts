import type { ProjectWithCreator, ProjectWithType } from "@repo/projects";
import { useState } from "react";
import { AuthApi } from "@/features/auth";
import { OwnerFilteringFunctions, SortingFunctions } from "../constants/filtering-maps.constants";
import { type Filters, OwnerFilters, SortOrders } from "../types/filtering.types";

const defaultFilters: Filters = {
    typeFilter: null,
    ownerFilter: OwnerFilters.ANYONE,
    sortOrder: SortOrders.ALPHABETIC
};

export function useProjectsFilters(projects: ProjectWithCreator<ProjectWithType>[]) {
    const [filters, setFilters] = useState(defaultFilters);

    const { data: profile } = AuthApi.useProfile();

    const filteredProjects = projects
        .filter((project) => (filters.title ? project.title.toLowerCase().includes(filters.title.toLowerCase()) : true))
        .filter((project) => (filters.typeFilter ? project.type === filters.typeFilter : true))
        .filter((project) => (profile?.id ? OwnerFilteringFunctions[filters.ownerFilter](project, profile.id) : true))
        .sort(SortingFunctions[filters.sortOrder]);

    return { filters, setFilters, filteredProjects };
}
