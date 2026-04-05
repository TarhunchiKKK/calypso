import type { Board } from "@repo/boards-common";
import type { Project, ProjectTypes, ProjectWithType } from "@repo/common";
import { useState } from "react";
import { BoardDetailsForm } from "@/entities/boards";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/ui/kit";

const formsMap: Record<ProjectTypes, (project: Project, afterSubmit: () => void) => React.ReactNode> = {
    board: (project, afterSubmit) => <BoardDetailsForm board={project as Board} afterSubmit={afterSubmit} />,
    note: () => null
};

type Props = {
    project: ProjectWithType;

    trigger: React.ReactNode;
};

export function ProjectDetailsDialog({ project, trigger }: Props) {
    const [open, setOpen] = useState(false);

    const renderForm = formsMap[project.type];

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>{trigger}</DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Project details</DialogTitle>
                </DialogHeader>

                {renderForm(project, setOpen.bind(null, false))}
            </DialogContent>
        </Dialog>
    );
}
