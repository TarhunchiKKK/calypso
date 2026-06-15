import type { ArrowNode, DrawingNode, MediaNode, NoteNode, ShapeNode, StickerNode, TextNode } from "@lib/boards";

export const MockNodes = {
    sticker: {
        id: crypto.randomUUID(),
        type: "sticker",
        locked: false,
        rect: {
            x: 0,
            y: 0,
            width: 100,
            height: 100
        },
        styles: {} as any,
        text: "Sticker"
    } satisfies StickerNode,
    arrow: {
        id: crypto.randomUUID(),
        type: "arrow",
        locked: false,
        styles: {} as any,
        start: {
            x: 0,
            y: 0,
            relativeTo: crypto.randomUUID()
        },
        end: {
            x: 100,
            y: 100,
            relativeTo: crypto.randomUUID()
        }
    } satisfies ArrowNode,
    text: {
        id: crypto.randomUUID(),
        type: "text",
        locked: false,
        rect: {
            x: 0,
            y: 0,
            width: 100,
            height: 100
        },
        styles: {} as any,
        content: []
    } satisfies TextNode,
    shape: {
        id: crypto.randomUUID(),
        type: "shape",
        variant: "circle",
        locked: false,
        rect: {
            x: 0,
            y: 0,
            width: 100,
            height: 100
        },
        styles: {} as any
    } satisfies ShapeNode,
    media: {
        id: crypto.randomUUID(),
        type: "media",
        locked: false,
        rect: {
            x: 0,
            y: 0,
            width: 100,
            height: 100
        },
        styles: {} as any,
        url: "media-url.png"
    } satisfies MediaNode,
    note: {
        id: crypto.randomUUID(),
        type: "note",
        locked: false,
        rect: {
            x: 0,
            y: 0,
            width: 100,
            height: 100
        },
        styles: {} as any,
        content: []
    } satisfies NoteNode,
    drawing: {
        id: crypto.randomUUID(),
        type: "drawing",
        locked: false,
        rect: {
            x: 0,
            y: 0,
            width: 100,
            height: 100
        },
        styles: {} as any,
        points: []
    } satisfies DrawingNode
};

export const MockNodesArray = [MockNodes.sticker, MockNodes.arrow, MockNodes.text, MockNodes.shape, MockNodes.media, MockNodes.note, MockNodes.drawing];
