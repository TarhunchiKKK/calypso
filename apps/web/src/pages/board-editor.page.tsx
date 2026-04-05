import { BoardEditor } from "@/board-editor";
import { MockNodes } from "@/dev";
import { useDefaultBoard } from "@/entities/boards";
import { NodesMongoApi } from "@/entities/nodes";
import { ThemeSwitch } from "@/features/dark-mode";
import { BoardHeader } from "@/features/header";

// TODO:
// * nodes fetching
// * real api
export function BoardEditorPage() {
    const { board } = useDefaultBoard();

    return (
        <div className="min-h-screen flex flex-col">
            <BoardEditor nodes={MockNodes} boardId="1" api={NodesMongoApi}>
                <div className="absolute w-full px-6 top-4 left-0 flex flex-row justify-between items-center">
                    <BoardHeader.LeftPanel boardName={board.id} />

                    <BoardHeader.RightPanel>
                        <ThemeSwitch />
                    </BoardHeader.RightPanel>
                </div>
            </BoardEditor>
        </div>
    );
}
