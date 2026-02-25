import type { Point } from "@/shared/lib/geometry";
import type { ShapeNode } from "../../variants/shape/shape-node.type";
import type { StickerNode } from "../../variants/sticker/sticker.type";
import type { TextNode } from "../../variants/text/text-node.type";

// REFACTOR:
// * get styles from constants in styling module

export class NodesFactory {
    public static sticker(data: Pick<StickerNode, "boardId"> & { point: Point }): StickerNode {
        return {
            id: crypto.randomUUID(),
            boardId: data.boardId,
            type: "sticker",
            locked: false,
            text: "Hello",
            rect: {
                ...data.point,
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

    public static text(data: Pick<TextNode, "boardId"> & { point: Point }): TextNode {
        return {
            id: crypto.randomUUID(),
            boardId: data.boardId,
            type: "text",
            locked: false,
            text: [],
            rect: {
                ...data.point,
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

    public static shape(data: Pick<ShapeNode, "boardId" | "variant"> & { point: Point }): ShapeNode {
        return {
            id: crypto.randomUUID(),
            boardId: data.boardId,
            type: "shape",
            locked: false,
            variant: data.variant,
            rect: {
                ...data.point,
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
