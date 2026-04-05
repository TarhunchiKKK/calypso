import type { ProjectWithType } from "@repo/common";
import { ProjectThumbnailSelector } from "@/entities/projects";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/ui/kit";

export type Props = {
    project: ProjectWithType;

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

                <ProjectThumbnailSelector project={project} />
            </DialogContent>
        </Dialog>
    );
}
