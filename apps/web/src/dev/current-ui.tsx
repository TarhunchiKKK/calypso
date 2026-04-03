import { RenameProjectForm } from "@/entities/projects";

export function CurrentUi() {
    return (
        <div className="container mx-auto">
            <RenameProjectForm
                project={{
                    id: "id",
                    title: "Project name",
                    createdAt: new Date(),
                    creator: {
                        id: "creator",
                        email: "email"
                    }
                }}
            />
        </div>
    );
}
