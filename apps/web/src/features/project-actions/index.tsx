import type { ProjectWithCreator, ProjectWithType } from "@repo/common";
import { EllipsisVertical, ImageIcon, InfoIcon, PencilIcon } from "lucide-react";
import { preventDefaultHandler } from "@/shared/lib/events";
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/shared/ui/kit";
import { ProjectDetailsDialog } from "./dialogs/project-details.dialog";
import { RenameProjectDialog } from "./dialogs/rename-project.dialog";
import { SelectProjectThumbnailModal } from "./dialogs/select-project-thumbnail.dialog";
import { ProjectLinkDropdownGroup } from "./dropdown/project-link.dropdown-group";
import { DuplicateProjectDropdownItem, RemoveProjectDropdownItem } from "./dropdown/projects-crud.dropdown-items";

export type Props = {
    project: ProjectWithCreator<ProjectWithType>;
};

export function ProjectActions({ project }: Props) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <EllipsisVertical />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-48" align="start">
                <ProjectLinkDropdownGroup project={project} />

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                    <DuplicateProjectDropdownItem project={project} />

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
                    <RemoveProjectDropdownItem project={project} />
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
