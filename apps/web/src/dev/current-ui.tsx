import type { ProjectWithType } from "@repo/common";
import { ProjectsList } from "@/features/projects-list";

const projects: ProjectWithType[] = [
    {
        id: "1",
        type: "board",
        title: "Title",
        description: "Description",
        creator: {
            id: "creator",
            email: "creator@email.com"
        },
        createdAt: new Date(),
        updatedAt: new Date()
    }
];

export function CurrentUi() {
    return (
        <div className="container mx-auto">
            <ProjectsList projects={projects} />
        </div>
    );
}
