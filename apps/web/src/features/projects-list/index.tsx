import type { ProjectWithCreator, ProjectWithType } from "@repo/common";
import { useProjectsFilters } from "./hooks/use-projects-filters.hook";
import { ProjectsFilters } from "./ui/projects-filters";
import { ProjectsTable } from "./ui/projects-table.component";

type Props = {
    projects: ProjectWithCreator<ProjectWithType>[];
};

export function ProjectsList({ projects }: Props) {
    const { filteredProjects, filters, setFilters } =
        useProjectsFilters(projects);

    return (
        <div className="flex flex-col justify-between gap-8">
            <ProjectsFilters filters={filters} onChange={setFilters} />

            <ProjectsTable projects={filteredProjects} />
        </div>
    );
}
