import type { ArrowNode, NodeBase, RectNode } from "@repo/boards-common";
import type { Rect } from "@repo/common";
import { Geometry } from "@/shared/lib/geometry";

export class NodeRectsFactory {
    public static rect(node: NodeBase): Rect {
        switch (node.type) {
            case "sticker":
            case "text":
            case "shape":
            case "media":
            case "note":
            case "drawing":
                return { ...(node as RectNode).rect };
            case "arrow":
                return Geometry.rectFromPoints((node as ArrowNode).start, (node as ArrowNode).end);
            default:
                throw new Error(`Unknown node type: ${node.type satisfies never}`);
        }
    }
}
