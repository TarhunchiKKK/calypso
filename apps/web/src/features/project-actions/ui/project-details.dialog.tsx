import type { Board } from "@repo/boards-common";
import type { Project, ProjectTypes, ProjectWithType } from "@repo/common";
import { BoardDetailsForm } from "@/entities/boards";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/shared/ui/kit";

const formsMap: Record<ProjectTypes, (project: Project) => React.ReactNode> = {
    board: (project) => <BoardDetailsForm board={project as Board} />,
    note: () => null,
};

type Props = {
    project: ProjectWithType;

    trigger: React.ReactNode;
};

export function ProjectDetailsDialog({ project, trigger }: Props) {
    const renderForm = formsMap[project.type];

    return (
        <Dialog>
            <DialogTrigger>{trigger}</DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Project details</DialogTitle>
                </DialogHeader>

                {renderForm(project)}
            </DialogContent>
        </Dialog>
    );
}
