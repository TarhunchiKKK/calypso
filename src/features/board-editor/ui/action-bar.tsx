import { Button } from "@/shared/ui/kit/button";
import { PropsWithChildren } from "react";

type ActionsBarProps = PropsWithChildren;

export function ActionsBar({ children }: ActionsBarProps) {
    return (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 bg-white p-1 rounded-md shadow">
            {children}
        </div>
    );
}

type ActionButtonProps = PropsWithChildren<{
    isActive: boolean;

    onClick: React.MouseEventHandler;
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
