import type { ArrowNode, NodeBase, RectNode } from "@lib/boards";
import type { Offset } from "@repo/common";
import { Geometry } from "@/shared/lib/geometry";

export class NodeClonesFactory {
    public static clone(node: NodeBase, offset: Offset) {
        switch (node.type) {
            case "sticker":
            case "text":
            case "shape":
            case "media":
                return NodeClonesFactory.rectNode(node as RectNode, offset);
            case "arrow":
                return NodeClonesFactory.arrow(node as ArrowNode, offset);
            default:
                throw new Error(`Unknown node type: ${node.type}`);
        }
    }

    private static rectNode(node: RectNode, offset: Offset): RectNode {
        const point = Geometry.applyOffset(node.rect, offset);

        return {
            ...node,
            id: crypto.randomUUID(),
            rect: {
                ...node.rect,
                ...point
            }
        };
    }

    private static arrow(arrow: ArrowNode, offset: Offset): ArrowNode {
        if (arrow.start.relativeTo || arrow.end.relativeTo) {
            throw new Error(`Arrow should become without relative points.\nReceived: ${arrow}`);
        }

        const startPoint = Geometry.applyOffset(arrow.start, offset);
        const endPoint = Geometry.applyOffset(arrow.end, offset);

        return {
            ...arrow,
            id: crypto.randomUUID(),
            start: startPoint,
            end: endPoint
        };
    }
}
