import type { ProjectTypes } from "@lib/projects";
import { type PropsWithChildren, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/ui/kit";
import { ProjectFormsMap } from "./ui.constants";

type Props = PropsWithChildren<{
    type: ProjectTypes;
}>;

export function CreateProjectDialog({ type, children }: Props) {
    const [open, setOpen] = useState(false);

    const renderForm = ProjectFormsMap[type];

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>{children}</DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create new project</DialogTitle>
                </DialogHeader>

                {renderForm(() => setOpen(false))}
            </DialogContent>
        </Dialog>
    );
}
