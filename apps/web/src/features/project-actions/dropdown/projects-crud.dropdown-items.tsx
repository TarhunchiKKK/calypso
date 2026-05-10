import type { ProjectWithType } from "@repo/common";
import { CopyIcon, TrashIcon } from "lucide-react";
import { ProjectsApi } from "@/entities/projects";
import { DropdownMenuItem } from "@/shared/ui/kit";

 type Props = {
    project: ProjectWithType;
};

export function DuplicateProjectDropdownItem({ project }: Props) {
    const duplicate = ProjectsApi.useDuplicate();

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
