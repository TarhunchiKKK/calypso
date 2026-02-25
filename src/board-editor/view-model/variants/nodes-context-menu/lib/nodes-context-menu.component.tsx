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
        <DropdownMenu open={true}>
            <DropdownMenuTrigger className="hidden">Open</DropdownMenuTrigger>

            <DropdownMenuContent className="w-40" align="start">
                {groups.map((group, groupIndex) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: `group.label` cannot be used as key because it's nullable
                    <div key={groupIndex}>
                        <DropdownMenuGroup>
                            {group.label && <DropdownMenuLabel>{group.label}</DropdownMenuLabel>}

                            {group.options.map(option => (
                                <DropdownMenuItem key={option.label}>
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
