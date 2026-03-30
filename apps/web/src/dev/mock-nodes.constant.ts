import type { Boards } from "@repo/common";

export const MockNodes = [
    // {
    //     id: "1",
    //     locked: false,
    //     boardId: "1",
    //     type: "sticker",
    //     rect: { x: 100, y: 100, width: 100, height: 100 },
    //     text: "Hello 1",
    //     styles: {
    //         fontFamily: "sans-serif",
    //         fontSize: 14,
    //         backgroundColor: "orange",
    //         color: "black",
    //         borderColor: "black",
    //         borderStyle: "dashed",
    //         borderRadius: 4,
    //         textAlign: "left"
    //     }
    // } as Boards.NodeBase,
    // {
    //     id: "2",
    //     boardId: "1",
    //     locked: false,
    //     type: "sticker",
    //     rect: { x: 220, y: 220, width: 150, height: 150 },
    //     text: "Hello 2",
    //     styles: {
    //         fontFamily: "sans-serif",
    //         fontSize: 14,
    //         backgroundColor: "orange",
    //         color: "black",
    //         borderColor: "black",
    //         borderStyle: "dashed",
    //         borderRadius: 4,
    //         textAlign: "left"
    //     }
    // } as Boards.NodeBase,
    // {
    //     id: "3",
    //     type: "sticker",
    //     boardId: "1",
    //     locked: false,
    //     rect: { x: 460, y: 180, width: 100, height: 100 },
    //     text: "Hello 3",
    //     styles: {
    //         fontFamily: "sans-serif",
    //         fontSize: 14,
    //         backgroundColor: "orange",
    //         color: "black",
    //         borderColor: "black",
    //         borderStyle: "dashed",
    //         borderRadius: 4,
    //         textAlign: "left"
    //     }
    // } as Boards.NodeBase,
    {
        id: "arrow-1",
        type: "arrow",
        locked: false,
        styles: {
            angleType: "corner",
            lineColor: "black",
            lineType: "solid",
            lineWidth: 2
        },
        start: { x: 300, y: 300 },
        end: { x: 500, y: 300 }
    } as Boards.ArrowNode,
    {
        id: "arrow-2",
        type: "arrow",
        locked: false,
        styles: {
            angleType: "triangle",
            lineColor: "black",
            lineType: "dashed",
            lineWidth: 2
        },
        start: { x: 300, y: 400 },
        end: { x: 500, y: 400 }
    } as Boards.ArrowNode,
    {
        id: "arrow-3",
        type: "arrow",
        locked: false,
        styles: {
            angleType: "triangle-filled",
            lineColor: "black",
            lineType: "solid",
            lineWidth: 2
        },
        start: { x: 300, y: 500 },
        end: { x: 500, y: 500 }
    } as Boards.ArrowNode,
    {
        id: "arrow-4",
        type: "arrow",
        locked: false,
        styles: {
            angleType: "kite",
            lineColor: "black",
            lineType: "dotted",
            lineWidth: 2
        },
        start: { x: 300, y: 600 },
        end: { x: 500, y: 600 }
    } as Boards.ArrowNode,
    {
        id: "arrow-5",
        type: "arrow",
        locked: false,
        styles: {
            angleType: "kite-filled",
            lineColor: "black",
            lineType: "solid",
            lineWidth: 2
        },
        start: { x: 300, y: 700 },
        end: { x: 500, y: 700 }
    } as Boards.ArrowNode
];
