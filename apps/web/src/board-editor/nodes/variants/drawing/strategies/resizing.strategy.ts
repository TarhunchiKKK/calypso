import type { DrawingNode } from "@lib/boards";
import type { Point, Rect } from "@repo/common";
import type { Decoratable } from "@/board-editor/core";
import { NodeResizingStrategy } from "@/board-editor/modules/resizing";

export class DrawingNodeResizingStrategy extends NodeResizingStrategy {
    public override updateNodeSizes(node: Decoratable<DrawingNode>, size: Rect) {
        node.data = {
            ...node.data,
            rect: size,
            points: this.scalePoints(node.data.points, node.data.rect, size)
        };
    }

    private scalePoints(points: Point[], oldRect: Rect, newRect: Rect): Point[] {
        const scale = {
            x: oldRect.width === 0 ? newRect.width / oldRect.width : 1,
            y: oldRect.height === 0 ? newRect.height / oldRect.height : 1
        };

        return points.map((point) => ({
            x: newRect.x + (point.x - oldRect.x) * scale.x,
            y: newRect.y + (point.y - oldRect.y) * scale.y
        }));
    }
}
