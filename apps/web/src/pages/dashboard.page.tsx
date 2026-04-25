import { ProjectsApi } from "@/entities/projects";
import { DashboardHeader } from "@/features/header";
import { CreateProjectButton } from "@/features/project-creating";
import { ProjectsList, ProjectsListSkeleton } from "@/features/projects-list";

function DashBoardPage() {
    const { data: projects } = ProjectsApi.useFindAll();

    return (
        <>
            <DashboardHeader />

            <div className="container mx-auto mt-8">
                <div className="flex flex-row justify-between items-center mb-6">
                    <span className="text-xl">Your projects</span>

                    <CreateProjectButton />
                </div>

                {projects && <ProjectsList projects={projects} />}

                {!projects && <ProjectsListSkeleton />}
            </div>
        </>
    );
}

export const Component = DashBoardPage;
