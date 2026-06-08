import type { ProjectWithType } from "@lib/projects";
import { LinkIcon, SquareArrowOutUpRightIcon } from "lucide-react";
import { Routes } from "@/shared/config";
import { DropdownMenuGroup, DropdownMenuItem } from "@/shared/ui/kit";

type Props = {
    project: ProjectWithType;
};

export function ProjectLinkDropdownGroup({ project }: Props) {
    const copyProjectLink = () => {
        const link = Routes.apps[project.type].get(project.id);

        navigator.clipboard.writeText(`${window.location.origin}/${link}`);
    };

    const openInNewTab = () => {
        const link = Routes.apps[project.type].get(project.id);

        window.open(`${window.location.origin}/${link}`);
    };

    return (
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
    );
}
