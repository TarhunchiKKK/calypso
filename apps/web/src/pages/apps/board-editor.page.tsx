import { BoardEditor } from "@/board-editor";
import { MockNodes } from "@/dev";
import { BoardHeader } from "@/features/header";

function BoardEditorPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <BoardEditor nodes={MockNodes} boardId="1">
                <BoardHeader boardTitle="Your board" />
            </BoardEditor>
        </div>
    );
}

export const Component = BoardEditorPage;
