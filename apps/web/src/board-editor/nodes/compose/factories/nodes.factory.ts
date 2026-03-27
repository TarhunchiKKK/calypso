import { DefaultNodeStyles } from "@/entities/nodes";
import type { Boards, Point } from "@repo/common";

export class NodesFactory {
    public static sticker(data: { point: Point }): Boards.StickerNode {
        return {
            id: crypto.randomUUID(),
            type: "sticker",
            locked: false,
            text: "Hello",
            rect: {
                ...data.point,
                width: 100,
                height: 100
            },
            styles: DefaultNodeStyles
        };
    }

    public static text(data: { point: Point }): Boards.TextNode {
        return {
            id: crypto.randomUUID(),
            type: "text",
            locked: false,
            // FIX: type casting
            text: [] as any,
            rect: {
                ...data.point,
                width: 100,
                height: 100
            },
            styles: DefaultNodeStyles
        };
    }

    public static shape(data: Pick<Boards.ShapeNode, "variant"> & { point: Point }): Boards.ShapeNode {
        return {
            id: crypto.randomUUID(),
            type: "shape",
            locked: false,
            variant: data.variant,
            rect: {
                ...data.point,
                width: 100,
                height: 100
            },
            styles: DefaultNodeStyles
        };
    }
}
