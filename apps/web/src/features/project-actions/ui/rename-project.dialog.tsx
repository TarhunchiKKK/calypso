import type { Project } from "@repo/common";
import { RenameProjectForm } from "@/entities/projects/ui/rename-project.form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/ui/kit";

type Props = {
    project: Project;

    trigger: React.ReactNode;
};

export function RenameProjectDialog({ project, trigger }: Props) {
    return (
        <Dialog>
            <DialogTrigger>{trigger}</DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Rename project</DialogTitle>
                </DialogHeader>

                <RenameProjectForm project={project} />
            </DialogContent>
        </Dialog>
    );
}
