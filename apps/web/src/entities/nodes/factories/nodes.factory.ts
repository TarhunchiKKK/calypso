import type { ArrowNode, MediaNode, NodeBase, NodeTypes, NodeTypesMap, ShapeNode, StickerNode, TextNode } from "@repo/boards-common";
import type { Point } from "@repo/common";
import { DefaultNodeStyles } from "../constants/default-node-styles.constants";

export class NodesFactory {
    public static is<T extends NodeTypes>(node: NodeBase, type: T): node is NodeTypesMap[T] {
        return node.type === type;
    }

    public static are<T extends NodeTypes>(nodes: NodeBase[], type: T): nodes is NodeTypesMap[T][] {
        return nodes.every(node => node.type === type);
    }

    public static sticker(data: { point: Point }): StickerNode {
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

    public static arrow(data: Pick<ArrowNode, "start" | "end">): ArrowNode {
        return {
            id: crypto.randomUUID(),
            type: "arrow",
            locked: false,
            styles: DefaultNodeStyles,
            ...data
        };
    }

    public static text(data: { point: Point }): TextNode {
        return {
            id: crypto.randomUUID(),
            type: "text",
            locked: false,
            content: [
                {
                    type: "p",
                    children: [{ text: "Type anything..." }]
                }
            ],
            rect: {
                ...data.point,
                width: 100,
                height: 100
            },
            styles: DefaultNodeStyles
        };
    }

    public static shape(data: Pick<ShapeNode, "variant"> & { point: Point }): ShapeNode {
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

    public static media(data: Pick<MediaNode, "url"> & { point: Point }): MediaNode {
        return {
            id: crypto.randomUUID(),
            type: "media",
            locked: false,
            url: data.url,
            rect: {
                ...data.point,
                width: 100,
                height: 100
            },
            styles: {}
        };
    }
}
