import { DefaultProjectFilters } from "@/entities/projects";
import { ProjectsFilters } from "../ui/projects-filters";
import { ProjectsTableSkeleton } from "./projects-table.skeleton";

export function ProjectsListSkeleton() {
    return (
        <div className="flex flex-col justify-between gap-8">
            <ProjectsFilters filters={DefaultProjectFilters} onChange={() => {}} />

            <ProjectsTableSkeleton />
        </div>
    );
}
