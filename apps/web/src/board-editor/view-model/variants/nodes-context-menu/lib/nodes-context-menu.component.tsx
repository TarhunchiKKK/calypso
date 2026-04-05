import { HotKeyUtils } from "@/shared/lib/hot-keys";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger
} from "@/shared/ui/kit";
import type { ContextMenuOptionsGroup } from "./types";

type NodesContextMenuProps = {
    groups: ContextMenuOptionsGroup[];
};

export function NodesContextMenu({ groups }: NodesContextMenuProps) {
    return (
        <DropdownMenu open={true} modal={false}>
            <DropdownMenuTrigger className="bg-transparent p-0 h-0"></DropdownMenuTrigger>

            <DropdownMenuContent className="w-48" align="start">
                {groups.map((group, groupIndex) => (
                    <div key={groupIndex}>
                        <DropdownMenuGroup>
                            {group.label && <DropdownMenuLabel>{group.label}</DropdownMenuLabel>}

                            {group.options.map(option => (
                                <DropdownMenuItem key={option.label} className="cursor-pointer" onClick={option.onClick}>
                                    {option.label}

                                    {option.hotKey && <DropdownMenuShortcut>{HotKeyUtils.stringify(option.hotKey)}</DropdownMenuShortcut>}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuGroup>

                        {groupIndex < groups.length - 1 && <DropdownMenuSeparator />}
                    </div>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
