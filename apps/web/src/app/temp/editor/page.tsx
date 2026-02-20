"use client";

import type { AnyNode, StickerNode } from "@repo/common";
import { BoardEditor } from "@/features/board-editor";
import { ThemeSwitch } from "@/features/dark-mode";
import { BoardHeader } from "@/features/header";

const mockNodes: AnyNode[] = [
    {
        id: "1",
        blocked: false,
        boardId: "1",
        type: "sticker",
        rect: { x: 100, y: 100, width: 100, height: 100 },
        text: "Hello 1",
        styles: {
            backgroundColor: "orange",
            borderColor: "black",
            borderStyle: "dashed",
            color: "black"
        }
    } as StickerNode,
    {
        id: "2",
        boardId: "1",
        blocked: false,
        type: "sticker",
        rect: { x: 220, y: 220, width: 150, height: 150 },
        text: "Hello 2",
        styles: {
            backgroundColor: "orange",
            borderColor: "black",
            borderStyle: "dashed",
            color: "black"
        }
    } as StickerNode,
    {
        id: "3",
        type: "sticker",
        blocked: false,
        rect: { x: 460, y: 180, width: 100, height: 100 },
        text: "Hello 3",
        styles: {
            backgroundColor: "orange",
            borderColor: "black",
            borderStyle: "dashed",
            color: "black"
        }
    } as StickerNode
];

export default function TempPage() {
    return (
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
    );
}
