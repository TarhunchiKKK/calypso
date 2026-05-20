import type { ViewModelParams } from "@/board-editor/view-model/types";
import { HotKeyUtils } from "@/shared/lib/hot-keys";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger
} from "@/shared/ui/kit";
import { Items } from "./ui.constants";

type Props = {
    setViewState: ViewModelParams["setViewState"];
};

export function ShapeSelector({ setViewState }: Props) {
    return (
        <DropdownMenu open={true} modal={false}>
            <DropdownMenuTrigger className="bg-transparent p-0 h-0"></DropdownMenuTrigger>

            <DropdownMenuContent className="absolute -translate-y-1/2">
                {Items.map((group, index) => (
                    <>
                        <DropdownMenuGroup>
                            {group.map((item, index) => (
                                <DropdownMenuItem key={index} onClick={setViewState.bind(null, item.value)}>
                                    {item.icon}

                                    {item.label}

                                    {item.hotKey && <DropdownMenuShortcut>{HotKeyUtils.stringify(item.hotKey)}</DropdownMenuShortcut>}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuGroup>

                        {index !== Items.length - 1 && <DropdownMenuSeparator />}
                    </>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
