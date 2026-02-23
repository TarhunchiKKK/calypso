import type { Point } from "@/shared/lib/geometry";
import type { ShapeNode, ShapeVariants } from "../../variants/shape/shape-node.type";
import type { StickerNode } from "../../variants/sticker/sticker.type";
import type { TextNode } from "../../variants/text/text-node.type";

// REFACTOR: move this into `NodesFactory` class
// DELETE
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
                fontSize: 14,
                textAlign: "center",
                borderRadius: 8,
                fontFamily: "sans-serif"
            }
        };
    },
    text: (point: Point, id?: string): TextNode => {
        return {
            id: id ?? crypto.randomUUID(),
            boardId: "1",
            type: "text",
            blocked: false,
            text: [],
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
                fontSize: 14,
                textAlign: "center",
                borderRadius: 8,
                fontFamily: "sans-serif"
            }
        };
    },
    shape: (point: Point, variant: ShapeVariants, id?: string): ShapeNode => {
        return {
            id: id ?? crypto.randomUUID(),
            boardId: "1",
            type: "shape",
            blocked: false,
            variant: variant,
            rect: {
                ...point,
                width: 100,
                height: 100
            },
            styles: {
                backgroundColor: "orange",
                borderColor: "green",
                borderStyle: "dashed",
                color: "green",
                fontSize: 14,
                textAlign: "center",
                borderRadius: 8,
                fontFamily: "sans-serif"
            }
        };
    }
};
