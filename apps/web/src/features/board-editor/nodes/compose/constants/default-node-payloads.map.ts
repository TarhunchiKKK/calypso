import type { Point } from "@/features/board-editor/core";
import type { StickerNode } from "../../variants/sticker/sticker.type";
import type { TextNode } from "../../variants/text/text-node.type";

export const NodeCreatorsMap = {
    sticker: (point: Point, id?: string) => {
        return {
            id: id ?? crypto.randomUUID(),
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
                fontStyle: "normal"
            }
        } satisfies StickerNode;
    },
    text: (point: Point, id?: string) => {
        return {
            id: id ?? crypto.randomUUID(),
            type: "text",
            blocked: false,
            text: [],
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
        } satisfies TextNode;
    }
};
