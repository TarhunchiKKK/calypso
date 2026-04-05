import type { ProjectTypes } from "@repo/common";
import { PlusIcon } from "lucide-react";
import { preventDefaultHandler } from "@/shared/lib/events";
import type { DropdownItem } from "@/shared/ui";
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/ui/kit";
import { CreateProjectDialog } from "./create-project.dialog";

const options: DropdownItem<ProjectTypes>[] = [
    {
        label: "Board",
        value: "board"
    },
    {
        label: "Note",
        value: "note"
    }
];

export function CreateProjectButton() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button variant="outline" size="icon" title="Create project">
                    <PlusIcon />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                {options.map(option => (
                    <DropdownMenuItem key={option.value} onSelect={preventDefaultHandler}>
                        <CreateProjectDialog type={option.value}>{option.label}</CreateProjectDialog>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
