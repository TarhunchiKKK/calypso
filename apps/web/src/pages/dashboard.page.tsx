import { MockProjects } from "@/dev";
import { DashboardHeader } from "@/features/header";
import { CreateProjectButton } from "@/features/project-creating";
import { ProjectsList } from "@/features/projects-list";

function DashBoardPage() {
    return (
        <>
            <DashboardHeader />

            <div className="container mx-auto mt-8">
                <div className="flex flex-row justify-between items-center mb-6">
                    <span className="text-xl">Your projects</span>

                    <CreateProjectButton />
                </div>

                <ProjectsList projects={MockProjects} />
            </div>
        </>
    );
}

export const Component = DashBoardPage;
