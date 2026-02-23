import type { Point } from "@/shared/lib/geometry";
import type { ShapeNode, ShapeVariants } from "../../variants/shape/shape-node.type";
import type { StickerNode } from "../../variants/sticker/sticker.type";
import type { TextNode } from "../../variants/text/text-node.type";

export class NodesFactory {
    public static sticker(point: Point): StickerNode {
        return {
            id: crypto.randomUUID(),
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
    }

    public static text(point: Point): TextNode {
        return {
            id: crypto.randomUUID(),
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
    }

    public static shape(point: Point, variant: ShapeVariants): ShapeNode {
        return {
            id: crypto.randomUUID(),
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
}
