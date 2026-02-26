import type { NodeBase } from "@/entities/nodes";

export const MockNodes = [
    {
        id: "1",
        locked: false,
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
        locked: false,
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
        locked: false,
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
