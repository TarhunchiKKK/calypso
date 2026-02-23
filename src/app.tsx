import { BoardEditor } from "@/board-editor";
import { MockNodes } from "@/dev";
import { BoardHeader } from "@/features/board-header";
import { ThemeSwitch } from "@/features/dark-mode";

export function App() {
    return (
        <div className="min-h-screen flex flex-col">
            <BoardEditor nodes={MockNodes}>
                <div className="absolute w-full px-6 top-4 left-0 flex flex-row justify-between items-center">
                    <BoardHeader.LeftPanel boardName="New board" />

                    <BoardHeader.RightPanel>
                        <ThemeSwitch />
                    </BoardHeader.RightPanel>
                </div>
            </BoardEditor>
        </div>
    );
}
