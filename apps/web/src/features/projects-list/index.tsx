import type { ProjectWithType } from "@repo/common";
import { ProjectsTable } from "./projects-table.component";

type Props = {
    projects: ProjectWithType[];
};

export function ProjectsList({ projects }: Props) {
    return <ProjectsTable projects={projects} />;
}
