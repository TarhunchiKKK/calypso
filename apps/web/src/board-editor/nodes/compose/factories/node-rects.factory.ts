import { Geometry } from "@/shared/lib/geometry";
import type { Boards, Rect } from "@repo/common";

export class NodeRectsFactory {
    public static rect(node: Boards.NodeBase): Rect {
        switch (node.type) {
            case "sticker":
                return { ...(node as Boards.StickerNode).rect };
            case "arrow":
                return Geometry.rectFromPoints((node as Boards.ArrowNode).start, (node as Boards.ArrowNode).end);
            case "text":
                return { ...(node as Boards.TextNode).rect };
            case "shape":
                return { ...(node as Boards.ShapeNode).rect };
            default:
                throw new Error(`Unknown node type: ${node}`);
        }
    }
}
