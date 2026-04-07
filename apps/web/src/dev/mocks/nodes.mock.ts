import type { ArrowNode } from "@repo/boards-common";

export const MockNodes = [
    // {
    //     id: "sticker-1",
    //     locked: false,
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
    //         textAlign: "left",
    //         textColor: "black"
    //     }
    // } satisfies StickerNode,
    // {
    //     id: "sticker-2",
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
    //         textAlign: "left",
    //         textColor: "black"
    //     }
    // } satisfies StickerNode,
    // {
    //     id: "sticker-3",
    //     type: "sticker",
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
    //         textAlign: "left",
    //         textColor: "black"
    //     }
    // } satisfies StickerNode,
    {
        id: "arrow-1",
        type: "arrow",
        locked: false,
        styles: {
            angleType: "corner",
            lineColor: "red",
            lineType: "solid",
            lineWidth: 2
        },
        // start: { x: 10, y: 10, relativeTo: "sticker-1" },
        // end: { x: 10, y: 10, relativeTo: "sticker-2" }
        start: { x: 10, y: 10 },
        end: { x: 130, y: 30 }
    } satisfies ArrowNode
    // {
    //     id: "arrow-2",
    //     type: "arrow",
    //     locked: false,
    //     styles: {
    //         angleType: "triangle",
    //         lineColor: "black",
    //         lineType: "dashed",
    //         lineWidth: 2
    //     },
    //     start: { x: 300, y: 400 },
    //     end: { x: 500, y: 400 }
    // } as ArrowNode,
    // {
    //     id: "arrow-3",
    //     type: "arrow",
    //     locked: false,
    //     styles: {
    //         angleType: "triangle-filled",
    //         lineColor: "black",
    //         lineType: "solid",
    //         lineWidth: 2
    //     },
    //     start: { x: 300, y: 500 },
    //     end: { x: 500, y: 500 }
    // } as ArrowNode,
    // {
    //     id: "arrow-4",
    //     type: "arrow",
    //     locked: false,
    //     styles: {
    //         angleType: "kite",
    //         lineColor: "black",
    //         lineType: "dotted",
    //         lineWidth: 2
    //     },
    //     start: { x: 300, y: 600 },
    //     end: { x: 500, y: 600 }
    // } as ArrowNode,
    // {
    //     id: "arrow-5",
    //     type: "arrow",
    //     locked: false,
    //     styles: {
    //         angleType: "kite-filled",
    //         lineColor: "black",
    //         lineType: "solid",
    //         lineWidth: 2
    //     },
    //     start: { x: 300, y: 700 },
    //     end: { x: 500, y: 700 }
    // } as ArrowNode,
    // {
    //     id: "shape-1",
    //     type: "shape",
    //     locked: false,
    //     styles: {
    //         backgroundColor: "red",
    //         borderColor: "black"
    //     },
    //     rect: {
    //         x: 400,
    //         y: 400,
    //         width: 100,
    //         height: 100
    //     },
    //     variant: "rectangle"
    // } satisfies ShapeNode,
    // {
    //     id: "shape-2",
    //     type: "shape",
    //     locked: false,
    //     styles: {
    //         backgroundColor: "red",
    //         borderColor: "black"
    //     },
    //     rect: {
    //         x: 550,
    //         y: 400,
    //         width: 100,
    //         height: 100
    //     },
    //     variant: "circle"
    // } satisfies ShapeNode,
    // {
    //     id: "shape-3",
    //     type: "shape",
    //     locked: false,
    //     styles: {
    //         backgroundColor: "red",
    //         borderColor: "black"
    //     },
    //     rect: {
    //         x: 700,
    //         y: 400,
    //         width: 100,
    //         height: 100
    //     },
    //     variant: "triangle"
    // } satisfies ShapeNode,
    // {
    //     id: "shape-4",
    //     type: "shape",
    //     locked: false,
    //     styles: {
    //         backgroundColor: "red",
    //         borderColor: "black"
    //     },
    //     rect: {
    //         x: 400,
    //         y: 550,
    //         width: 100,
    //         height: 100
    //     },
    //     variant: "diamond"
    // } satisfies ShapeNode,
    // {
    //     id: "shape-5",
    //     type: "shape",
    //     locked: false,
    //     styles: {
    //         backgroundColor: "red",
    //         borderColor: "black"
    //     },
    //     rect: {
    //         x: 550,
    //         y: 550,
    //         width: 100,
    //         height: 100
    //     },
    //     variant: "star"
    // } satisfies ShapeNode,
    // {
    //     id: "shape-6",
    //     type: "shape",
    //     locked: false,
    //     styles: {
    //         backgroundColor: "red",
    //         borderColor: "black"
    //     },
    //     rect: {
    //         x: 700,
    //         y: 550,
    //         width: 100,
    //         height: 100
    //     },
    //     variant: "hexagon"
    // } satisfies ShapeNode
];
