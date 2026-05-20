import type { PropsWithChildren } from "react";
import { Kbd, Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/kit";
import { Button } from "@/shared/ui/kit/button";

type Props = PropsWithChildren<{
    active?: boolean;

    disabled?: boolean;

    onClick?: React.MouseEventHandler;

    title: string;

    shortcut?: string;
}>;

export function ActionButton({ active, onClick, disabled, title, shortcut, children }: Props) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon-sm"
                    disabled={disabled}
                    className={active ? "bg-blue-500/30 hover:bg-blue-600/30 text-blue-500 hover:text-blue-600" : ""}
                    onClick={onClick}
                >
                    {children}
                </Button>
            </TooltipTrigger>

            <TooltipContent side="right">
                {title} {shortcut && <Kbd>{shortcut}</Kbd>}
            </TooltipContent>
        </Tooltip>
    );
}
