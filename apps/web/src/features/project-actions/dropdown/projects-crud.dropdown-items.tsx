import type { ProjectWithType } from "@lib/projects";
import { CopyIcon, TrashIcon } from "lucide-react";
import { toast } from "sonner";
import { ProjectsApi } from "@/entities/projects";
import { DropdownMenuItem } from "@/shared/ui/kit";

type Props = {
    project: ProjectWithType;
};

export function DuplicateProjectDropdownItem({ project }: Props) {
    const duplicate = ProjectsApi.useDuplicate({
        onSuccess: () => {
            toast.success("Project duplicated");
        },
        onError: () => {
            toast.error("Cannot duplicate project");
        }
    });

    const onSelect = async () => {
        await duplicate.mutateAsync({
            id: project.id,
            type: project.type,
            title: `${project.title} (Copy)`
        });
    };

    return (
        <DropdownMenuItem onSelect={onSelect}>
            <CopyIcon />
            Duplicate
        </DropdownMenuItem>
    );
}

export function RemoveProjectDropdownItem({ project }: Props) {
    const remove = ProjectsApi.useRemove();

    const onSelect = async () => {
        await remove.mutateAsync({ id: project.id, type: project.type });
    };

    return (
        <DropdownMenuItem variant="destructive" onSelect={onSelect}>
            <TrashIcon />
            Delete
        </DropdownMenuItem>
    );
}
