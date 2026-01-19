import type { PropsWithChildren } from "react";
import { Logo } from "@/shared/ui";

type Props = {
    LeftPanel: {
        boardName: string;
    };
    RightPanel: PropsWithChildren;
};

export const BoardHeader = {
    LeftPanel: ({ boardName }: Props["LeftPanel"]) => {
        return (
            <div className="w-min h-[52px] px-4 flex flex-row justify-between items-center gap-6 bg-white dark:bg-gray-900 rounded-md shadow-lg dark:shadow-amber-50 dark:shadow-sm">
                <Logo />

                <div className="w-max">{boardName}</div>
            </div>
        );
    },
    RightPanel: ({ children }: Props["RightPanel"]) => {
        return (
            <div className="w-min h-[52px] px-4 flex flex-row justify-between items-center gap-6 bg-white dark:bg-gray-900 rounded-md shadow-lg dark:shadow-amber-50 dark:shadow-sm">
                {children}
            </div>
        );
    }
};
