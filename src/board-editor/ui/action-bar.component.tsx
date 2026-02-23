import type { PropsWithChildren } from "react";
import { Wrapper } from "@/shared/ui";
import { Button } from "@/shared/ui/kit/button";

type ActionsBarProps = PropsWithChildren;

export function ActionsBar({ children }: ActionsBarProps) {
    return <Wrapper className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">{children}</Wrapper>;
}

type ActionButtonProps = PropsWithChildren<{
    isActive?: boolean;

    onClick?: React.MouseEventHandler;
}>;

export function ActionButton({ isActive, onClick, children }: ActionButtonProps) {
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
