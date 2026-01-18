import { Logo } from "@/shared/ui";

type Props = {
    LeftPanel: {
        boardName: string;
    };
    RightPanel: {};
};

export const BoardHeader = {
    LeftPanel: ({ boardName }: Props["LeftPanel"]) => {
        return (
            <div className="p-4 w-min flex flex-row justify-between items-center gap-6 bg-white rounded-md shadow-lg">
                <Logo />

                <div className="w-max">{boardName}</div>
            </div>
        );
    },
    RightPanel: ({}: Props["RightPanel"]) => {
        return <div className="bg-white rounded-md shadow">Right Panel</div>;
    }
};
