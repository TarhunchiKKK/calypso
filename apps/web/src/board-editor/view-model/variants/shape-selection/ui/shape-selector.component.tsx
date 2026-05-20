import type { ShapeVariants } from "@repo/boards";
import { HotKeyUtils } from "@/shared/lib/hot-keys";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuShortcut, DropdownMenuTrigger } from "@/shared/ui/kit";
import { ShapeSelectorItems } from "./ui.constants";

type Props = {
    onSelect: (variant: ShapeVariants) => void;
};

export function ShapeSelector({ onSelect }: Props) {
    return (
        <DropdownMenu open={true} modal={false}>
            <DropdownMenuTrigger className="bg-transparent p-0 h-0"></DropdownMenuTrigger>

            <DropdownMenuContent className="absolute -translate-y-1/2">
                {ShapeSelectorItems.map((item, index) => (
                    <DropdownMenuItem key={index} onClick={onSelect.bind(null, item.value)}>
                        {item.icon}

                        {item.label}

                        {item.hotKey && <DropdownMenuShortcut>{HotKeyUtils.stringify(item.hotKey)}</DropdownMenuShortcut>}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
