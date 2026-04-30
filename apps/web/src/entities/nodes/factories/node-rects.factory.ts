import type { ArrowNode, NodeBase, ShapeNode, StickerNode, TextNode } from "@repo/boards-common";
import type { Rect } from "@repo/common";
import { Geometry } from "@/shared/lib/geometry";

export class NodeRectsFactory {
    public static rect(node: NodeBase): Rect {
        switch (node.type) {
            case "sticker":
                return { ...(node as StickerNode).rect };
            case "arrow":
                return Geometry.rectFromPoints((node as ArrowNode).start, (node as ArrowNode).end);
            case "text":
                return { ...(node as TextNode).rect };
            case "shape":
                return { ...(node as ShapeNode).rect };
            case "media":
                return { ...(node as ShapeNode).rect };
            default:
                throw new Error(`Unknown node type: ${node}`);
        }
    }
}
