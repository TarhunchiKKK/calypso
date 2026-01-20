import type { PropsWithChildren } from "react";
import { Logo, Wrapper } from "@/shared/ui";

type Props = {
    LeftPanel: {
        boardName: string;
    };
    RightPanel: PropsWithChildren;
};

// TODO: Implement `Wrapper` component
export const BoardHeader = {
    LeftPanel: ({ boardName }: Props["LeftPanel"]) => {
        return (
            <Wrapper className="w-min h-[52px] px-4 flex flex-row justify-between items-center gap-6">
                <Logo />

                <div className="w-max">{boardName}</div>
            </Wrapper>
        );
    },
    RightPanel: ({ children }: Props["RightPanel"]) => {
        return <Wrapper className="w-min h-[52px] px-4 flex flex-row justify-between items-center gap-6">{children}</Wrapper>;
    }
};
