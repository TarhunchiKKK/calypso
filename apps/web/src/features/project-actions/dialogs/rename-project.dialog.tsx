import type { ProjectWithType } from "@lib/projects";
import { useState } from "react";
import { RenameProjectForm } from "@/entities/projects/ui/rename-project.form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/ui/kit";

type Props = {
    project: ProjectWithType;

    trigger: React.ReactNode;
};

export function RenameProjectDialog({ project, trigger }: Props) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>{trigger}</DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Rename project</DialogTitle>
                </DialogHeader>

                <RenameProjectForm project={project} afterSubmit={setOpen.bind(null, false)} />
            </DialogContent>
        </Dialog>
    );
}
