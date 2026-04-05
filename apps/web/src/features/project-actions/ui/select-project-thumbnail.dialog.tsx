import type { Project } from "@repo/common";
import { ProjectThumbnailSelector } from "@/entities/projects";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/ui/kit";

export type Props = {
    project: Project;

    trigger: React.ReactNode;
};

export function SelectProjectThumbnailModal({ project, trigger }: Props) {
    return (
        <Dialog>
            <DialogTrigger>{trigger}</DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Choose thumbnail</DialogTitle>
                </DialogHeader>

                <ProjectThumbnailSelector projectId={project.id} />
            </DialogContent>
        </Dialog>
    );
}
