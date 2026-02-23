import { BoardEditor } from "@/features/board-editor";
import { ThemeProvider, ThemeSwitch } from "@/features/dark-mode";
import { BoardHeader } from "@/features/header";
import type { NodeBase } from "./features/board-editor/core";

const mockNodes = [
    {
        id: "1",
        blocked: false,
        boardId: "1",
        type: "sticker",
        rect: { x: 100, y: 100, width: 100, height: 100 },
        text: "Hello 1",
        styles: {
            fontFamily: "sans-serif",
            fontSize: 14,
            backgroundColor: "orange",
            color: "black",
            borderColor: "black",
            borderStyle: "dashed",
            borderRadius: 4,
            textAlign: "left"
        }
    } as NodeBase,
    {
        id: "2",
        boardId: "1",
        blocked: false,
        type: "sticker",
        rect: { x: 220, y: 220, width: 150, height: 150 },
        text: "Hello 2",
        styles: {
            fontFamily: "sans-serif",
            fontSize: 14,
            backgroundColor: "orange",
            color: "black",
            borderColor: "black",
            borderStyle: "dashed",
            borderRadius: 4,
            textAlign: "left"
        }
    } as NodeBase,
    {
        id: "3",
        type: "sticker",
        boardId: "1",
        blocked: false,
        rect: { x: 460, y: 180, width: 100, height: 100 },
        text: "Hello 3",
        styles: {
            fontFamily: "sans-serif",
            fontSize: 14,
            backgroundColor: "orange",
            color: "black",
            borderColor: "black",
            borderStyle: "dashed",
            borderRadius: 4,
            textAlign: "left"
        }
    } as NodeBase
];

export function App() {
    return (
        <ThemeProvider>
            <div className="min-h-screen flex flex-col">
                <BoardEditor nodes={mockNodes}>
                    <div className="absolute w-full px-6 top-4 left-0 flex flex-row justify-between items-center">
                        <BoardHeader.LeftPanel boardName="New board" />

                        <BoardHeader.RightPanel>
                            <ThemeSwitch />
                        </BoardHeader.RightPanel>
                    </div>
                </BoardEditor>
            </div>
        </ThemeProvider>
    );
}
