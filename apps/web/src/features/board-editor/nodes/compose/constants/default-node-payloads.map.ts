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
                textAlign: "center"
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
                color: "black",
                fontSize: 14,
                fontStyle: "normal",
                textAlign: "left"
            }
        };
    }
};
