import { ProjectsList } from "@/features/projects-list";
import { MockProjects } from "./mock-projects.constants";

export function CurrentUi() {
    return (
        <div className="container mx-auto">
            <ProjectsList projects={MockProjects} />
        </div>
    );
}
