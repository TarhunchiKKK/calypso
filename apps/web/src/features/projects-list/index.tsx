import { useState } from "react";
import { DEFAULT_PROJECTS_QUERY_COUNT, DefaultProjectFilters, ProjectsApi } from "@/entities/projects";
import { useIntersection } from "@/shared/lib/dom";
import { Spinner } from "@/shared/ui/kit";
import { ProjectsListSkeleton } from "./skeletons/projects-list.skeleton";
import { ProjectsFilters } from "./ui/projects-filters";
import { ProjectsTable } from "./ui/projects-table.component";

export function ProjectsList() {
    const [filters, setFilters] = useState(DefaultProjectFilters);

    const {
        data: projects,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = ProjectsApi.useFindAll({
        ...filters,
        count: DEFAULT_PROJECTS_QUERY_COUNT
    });

    const cursorRef = useIntersection(() => {
        fetchNextPage();
    });

    return (
        <>
            {projects && (
                <div className="flex flex-col justify-between gap-8">
                    <ProjectsFilters filters={filters} onChange={setFilters} />

                    <ProjectsTable projects={projects} />

                    {hasNextPage && (
                        <div ref={cursorRef} className="flex flex-row justify-center items-center">
                            {isFetchingNextPage && <Spinner />}
                        </div>
                    )}
                </div>
            )}

            {!projects && <ProjectsListSkeleton />}
        </>
    );
}
