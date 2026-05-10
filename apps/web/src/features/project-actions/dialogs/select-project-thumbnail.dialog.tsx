import type { ProjectWithType } from "@repo/common";
import { useState } from "react";
import { ProjectThumbnailSelector } from "@/entities/projects";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/ui/kit";

 type Props = {
    project: ProjectWithType;

    trigger: React.ReactNode;
};

export function SelectProjectThumbnailModal({ project, trigger }: Props) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>{trigger}</DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Choose thumbnail</DialogTitle>
                </DialogHeader>

                <ProjectThumbnailSelector project={project} afterSubmit={setOpen.bind(null, false)} />
            </DialogContent>
        </Dialog>
    );
}
