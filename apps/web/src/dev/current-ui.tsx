import { BoardEditorSkeleton } from "@/board-editor";
import { ThemeSwitch } from "@/features/dark-mode";
import { BoardHeader } from "@/features/header";

export function CurrentUi() {
    return (
        <div className="min-h-screen flex flex-col">
            <BoardEditorSkeleton>
                <div className="absolute w-full px-6 top-4 left-0 flex flex-row justify-between items-center">
                    <BoardHeader.LeftPanel boardName="Your board" />

                    <BoardHeader.RightPanel>
                        <ThemeSwitch />
                    </BoardHeader.RightPanel>
                </div>
            </BoardEditorSkeleton>
        </div>
    );
}
