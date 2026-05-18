import { Logo, Wrapper } from "@/shared/ui";
import { ThemeSwitch } from "../dark-mode";

type Props = {
    boardTitle: string;
};

export function BoardHeader({ boardTitle }: Props) {
    return (
        <div className="absolute w-full px-6 top-4 left-0 flex flex-row justify-between items-center">
            <Wrapper className="w-min h-13 px-4 flex flex-row justify-between items-center gap-6 dark:bg-gray-900!">
                <Logo />

                <div className="w-max">{boardTitle}</div>
            </Wrapper>

            <Wrapper className="w-min h-13 px-4 flex flex-row justify-between items-center gap-6 dark:bg-gray-900!">
                <ThemeSwitch />
            </Wrapper>
        </div>
    );
}
