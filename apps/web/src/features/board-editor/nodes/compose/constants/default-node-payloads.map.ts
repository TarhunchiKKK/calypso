import type { Point, StickerNode, TextNode } from "@repo/common";

export const NodeCreatorsMap = {
    sticker: (point: Point, id?: string): StickerNode => {
        return {
            id: id ?? crypto.randomUUID(),
            boardId: "1",
            type: "sticker",
            blocked: false,
            text: "Hello",
            rect: {
                ...point,
                width: 100,
                height: 100
            },
            styles: {
                backgroundColor: "orange",
                borderColor: "none",
                borderStyle: "dashed",
                color: "black",
                fontStyle: "normal",
                fontSize: 14,
                textAlign: "center",
                borderRadius: 8,
                fontFamily: "sans-serif",
                fontWeight: 400,
                textDecoration: "none"
            }
        };
    },
    text: (point: Point, id?: string): TextNode => {
        return {
            id: id ?? crypto.randomUUID(),
            boardId: "1",
            type: "text",
            blocked: false,
            text: [] as unknown as string,
            rect: {
                ...point,
                width: 100,
                height: 100
            },
            styles: {
                backgroundColor: "orange",
                borderColor: "none",
                borderStyle: "dashed",
                color: "black",
                fontStyle: "normal",
                fontSize: 14,
                textAlign: "center",
                borderRadius: 8,
                fontFamily: "sans-serif",
                fontWeight: 400,
                textDecoration: "none"
            }
        };
    }
};
