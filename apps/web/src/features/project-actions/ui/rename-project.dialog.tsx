import type { ProjectWithType } from "@repo/common";
import { RenameProjectForm } from "@/entities/projects/ui/rename-project.form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/ui/kit";

type Props = {
    project: ProjectWithType;

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
