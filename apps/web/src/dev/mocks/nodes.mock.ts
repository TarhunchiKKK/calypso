import type { StickerNode } from "@repo/boards-common";

export const MockNodes = [
    {
        id: "sticker-1",
        locked: false,
        type: "sticker",
        rect: { x: 150, y: 150, width: 100, height: 100 },
        text: "Hello",
        styles: {
            fontFamily: "sans-serif",
            backgroundColor: "orange",
            borderColor: "black",
            borderStyle: "dashed",
            borderRadius: 4,
            textAlign: "center",
            textColor: "black"
        }
    } satisfies StickerNode,
    {
        id: "sticker-2",
        locked: false,
        type: "sticker",
        rect: { x: 520, y: 520, width: 150, height: 150 },
        text: "Hello",
        styles: {
            fontFamily: "sans-serif",
            backgroundColor: "orange",
            borderColor: "black",
            borderStyle: "dashed",
            borderRadius: 4,
            textAlign: "center",
            textColor: "black"
        }
    } satisfies StickerNode,
    {
        id: "sticker-3",
        type: "sticker",
        locked: false,
        rect: { x: 960, y: 180, width: 100, height: 100 },
        text: "Hello",
        styles: {
            fontFamily: "sans-serif",
            backgroundColor: "orange",
            borderColor: "black",
            borderStyle: "dashed",
            borderRadius: 4,
            textAlign: "center",
            textColor: "black"
        }
    } satisfies StickerNode
    // {
    //     id: "arrow-1",
    //     type: "arrow",
    //     locked: false,
    //     styles: {
    //         angleType: "triangle-filled",
    //         lineColor: "blue",
    //         lineType: "dotted",
    //         lineWidth: 2
    //     },
    //     start: { x: 1, y: 0.5, relativeTo: "sticker-1" },
    //     end: { x: 0, y: 0.5, relativeTo: "sticker-3" }
    //     // start: { x: 400, y: 400 },
    //     // end: { x: 300, y: 300 }
    // } satisfies ArrowNode,
    // {
    //     id: "arrow-2",
    //     type: "arrow",
    //     locked: false,
    //     styles: {
    //         angleType: "kite",
    //         lineColor: "black",
    //         lineType: "dashed",
    //         lineWidth: 2
    //     },
    //     start: { x: 0.5, y: 1, relativeTo: "sticker-3" },
    //     end: { x: 1, y: 0.5, relativeTo: "sticker-2" }
    //     // start: { x: 300, y: 400 },
    //     // end: { x: 500, y: 400 }
    // } satisfies ArrowNode,
    // {
    //     id: "media-1",
    //     type: "media",
    //     locked: false,
    //     rect: {
    //         x: 1270,
    //         y: 410,
    //         width: 300,
    //         height: 300
    //     },
    //     styles: {
    //         borderColor: "transparent",
    //         borderRadius: 9999
    //     },
    //     url: "https://github.com/shadcn.png"
    // } satisfies MediaNode
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
    // } satisfies ShapeNode
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
    // } satisfies ShapeNode,
    // {
    //     type: "text",
    //     id: "text-1",
    //     locked: false,
    //     rect: {
    //         x: 400,
    //         y: 400,
    //         width: 400,
    //         height: 200
    //     },
    //     styles: {
    //         fontFamily: "Sans Serif",
    //         fontSize: 18,
    //         textAlign: "center",
    //         textColor: "#cccccc"
    //     },
    //     content: [
    //         {
    //             children: [{ text: "With some " }, { bold: true, text: "bold", underline: true }, { text: " text for emphasis!" }],
    //             type: "p"
    //         }
    //     ]
    // } satisfies TextNode,
];
