import type { PropsWithChildren } from "react";
import { Button } from "@/shared/ui/kit/button";

type Props = PropsWithChildren<{
    active?: boolean;

    disabled?: boolean;

    onClick?: React.MouseEventHandler;
}>;

export function ActionButton({ active, onClick, disabled, children }: Props) {
    return (
        <Button
            variant="ghost"
            size="icon"
            disabled={disabled}
            className={active ? "bg-blue-500/30 hover:bg-blue-600/30 text-blue-500 hover:text-blue-600" : ""}
            onClick={onClick}
        >
            {children}
        </Button>
    );
}
