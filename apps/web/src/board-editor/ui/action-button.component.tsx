import type { PropsWithChildren } from "react";
import { Button } from "@/shared/ui/kit/button";

type Props = PropsWithChildren<{
    isActive?: boolean;

    onClick?: React.MouseEventHandler;
}>;

export function ActionButton({ isActive, onClick, children }: Props) {
    return (
        <Button
            variant="ghost"
            size="icon"
            className={isActive ? "bg-blue-500/30 hover:bg-blue-600/30 text-blue-500 hover:text-blue-600" : ""}
            onClick={onClick}
        >
            {children}
        </Button>
    );
}
