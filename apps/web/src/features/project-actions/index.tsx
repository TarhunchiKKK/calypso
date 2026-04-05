import type { ProjectWithType } from "@repo/common";
import { CopyIcon, EllipsisVertical, ImageIcon, InfoIcon, LinkIcon, PencilIcon, SquareArrowOutUpRightIcon, TrashIcon } from "lucide-react";
import { useProjectsApi } from "@/entities/projects";
import { Routes } from "@/shared/config";
import { preventDefaultHandler } from "@/shared/lib/events";
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/shared/ui/kit";
import { ProjectDetailsDialog } from "./ui/project-details.dialog";
import { RenameProjectDialog } from "./ui/rename-project.dialog";
import { SelectProjectThumbnailModal } from "./ui/select-project-thumbnail.dialog";

export type Props = {
    project: ProjectWithType;
};

export function ProjectActions({ project }: Props) {
    const projectsApi = useProjectsApi();

    const copyProjectLink = () => {
        const link = Routes.apps[project.type](project.id);

        navigator.clipboard.writeText(`${window.location.origin}/${link}`);
    };

    const openInNewTab = () => {
        const link = Routes.apps[project.type](project.id);

        window.open(`${window.location.origin}/${link}`);
    };

    const duplicateBoard = async () => {
        await projectsApi.duplicate.mutateAsync({
            id: project.id,
            type: project.type,
            title: `${project.title} (Copy)`
        });
    };

    const removeBoard = async () => {
        await projectsApi.remove.mutateAsync({ id: project.id, type: project.type });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <EllipsisVertical />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-48" align="start">
                <DropdownMenuGroup>
                    <DropdownMenuItem onSelect={copyProjectLink}>
                        <LinkIcon />
                        Copy link
                    </DropdownMenuItem>

                    <DropdownMenuItem onSelect={openInNewTab}>
                        <SquareArrowOutUpRightIcon />
                        Open in new tab
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                    <DropdownMenuItem onSelect={duplicateBoard}>
                        <CopyIcon />
                        Duplicate
                    </DropdownMenuItem>

                    <DropdownMenuItem onSelect={preventDefaultHandler}>
                        <PencilIcon />

                        <RenameProjectDialog project={project} trigger="Rename" />
                    </DropdownMenuItem>

                    <DropdownMenuItem onSelect={preventDefaultHandler}>
                        <ImageIcon />

                        <SelectProjectThumbnailModal project={project} trigger="Change thumbnail" />
                    </DropdownMenuItem>

                    <DropdownMenuItem onSelect={preventDefaultHandler}>
                        <InfoIcon />

                        <ProjectDetailsDialog project={project} trigger="Project details" />
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                    <DropdownMenuItem variant="destructive" onSelect={removeBoard}>
                        <TrashIcon />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
