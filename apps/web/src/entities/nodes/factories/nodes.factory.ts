import type { ArrowNode, DrawingNode, MediaNode, NodeBase, NodeTypes, NodeTypesMap, NoteNode, ShapeNode, StickerNode, TextNode } from "@repo/boards";
import type { Point } from "@repo/common";
import type { ResolvedArrow } from "@/board-editor/modules/arrows-resolution";
import { pickFields } from "@/shared/lib/js";
import { DefaultNodeStyles } from "../constants/default-node-styles.constants";

type TypesMap = NodeTypesMap & {
    arrow: ResolvedArrow;
};

export class NodesFactory {
    public static is<T extends NodeTypes>(node: NodeBase, type: T): node is TypesMap[T] {
        return node.type === type;
    }

    public static are<T extends NodeTypes>(nodes: NodeBase[], type: T): nodes is TypesMap[T][] {
        return nodes.every((node) => node.type === type);
    }

    public static sticker(data: { point: Point }): StickerNode {
        return {
            id: crypto.randomUUID(),
            type: "sticker",
            locked: false,
            text: "Hello",
            rect: {
                x: data.point.x - 50,
                y: data.point.y - 50,
                width: 100,
                height: 100
            },
            styles: pickFields(DefaultNodeStyles, ["backgroundColor", "fontFamily", "textColor", "borderColor", "borderRadius", "borderStyle", "textAlign"])
        };
    }

    public static arrow(data: { point: Point }): ArrowNode {
        return {
            id: crypto.randomUUID(),
            type: "arrow",
            locked: false,
            styles: pickFields(DefaultNodeStyles, ["lineColor", "lineType", "lineWidth", "angleType"]),
            start: {
                x: data.point.x - 50,
                y: data.point.y - 50
            },
            end: {
                x: data.point.x + 50,
                y: data.point.y + 50
            }
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
                x: data.point.x - 100,
                y: data.point.y - 20,
                width: 200,
                height: 40
            },
            styles: pickFields(DefaultNodeStyles, ["fontFamily", "fontSize", "textColor", "textAlign"])
        };
    }

    public static shape(data: Pick<ShapeNode, "variant"> & { point: Point }): ShapeNode {
        return {
            id: crypto.randomUUID(),
            type: "shape",
            locked: false,
            variant: data.variant,
            rect: {
                x: data.point.x - 50,
                y: data.point.y - 50,
                width: 100,
                height: 100
            },
            styles: pickFields(DefaultNodeStyles, ["backgroundColor", "borderColor"])
        };
    }

    public static media(data: Pick<MediaNode, "url"> & { point: Point }): MediaNode {
        return {
            id: crypto.randomUUID(),
            type: "media",
            locked: false,
            url: data.url,
            rect: {
                x: data.point.x - 150,
                y: data.point.y - 150,
                width: 300,
                height: 300
            },
            styles: pickFields(DefaultNodeStyles, ["borderColor", "borderRadius"])
        };
    }

    public static note(data: { point: Point }): NoteNode {
        return {
            id: crypto.randomUUID(),
            type: "note",
            locked: false,
            rect: {
                x: data.point.x - 150,
                y: data.point.y - 350,
                width: 300,
                height: 700
            },
            styles: pickFields(DefaultNodeStyles, ["backgroundColor", "borderColor"]),
            content: [
                {
                    type: "h1",
                    children: [{ text: "Title" }]
                }
            ]
        };
    }

    public static drawing(data: { point: Point }): DrawingNode {
        return {
            id: crypto.randomUUID(),
            type: "drawing",
            locked: false,
            rect: {
                ...data.point,
                width: 0,
                height: 0
            },
            styles: pickFields(DefaultNodeStyles, ["lineColor", "lineWidth"]),
            points: [data.point]
        };
    }
}
