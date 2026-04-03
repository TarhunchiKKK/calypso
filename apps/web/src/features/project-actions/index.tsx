import type { ProjectWithType } from "@repo/common";
import {
    CopyIcon,
    EllipsisVertical,
    ImageIcon,
    InfoIcon,
    LinkIcon,
    PencilIcon,
    SquareArrowOutUpRightIcon,
    TrashIcon,
} from "lucide-react";
import {
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/shared/ui/kit";
import { ProjectDetailsDialog } from "./ui/project-details.dialog";
import { RenameProjectDialog } from "./ui/rename-project.dialog";
import { SelectProjectThumbnailModal } from "./ui/select-project-thumbnail.dialog";

export type Props = {
    project: ProjectWithType;
};

const preventDefaultEventHandler = (e: Event) => e.preventDefault();

export function ProjectActions({ project }: Props) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <EllipsisVertical />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-48" align="start">
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <LinkIcon />
                        Copy link
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                        <SquareArrowOutUpRightIcon />
                        Open in new tab
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <CopyIcon />
                        Duplicate
                    </DropdownMenuItem>

                    <DropdownMenuItem onSelect={preventDefaultEventHandler}>
                        <PencilIcon />

                        <RenameProjectDialog
                            project={project}
                            trigger="Rename"
                        />
                    </DropdownMenuItem>

                    <DropdownMenuItem onSelect={preventDefaultEventHandler}>
                        <ImageIcon />

                        <SelectProjectThumbnailModal
                            project={project}
                            trigger="Change thumbnail"
                        />
                    </DropdownMenuItem>

                    <DropdownMenuItem onSelect={preventDefaultEventHandler}>
                        <InfoIcon />

                        <ProjectDetailsDialog
                            project={project}
                            trigger="Project details"
                        />
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                    <DropdownMenuItem variant="destructive">
                        <TrashIcon />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
