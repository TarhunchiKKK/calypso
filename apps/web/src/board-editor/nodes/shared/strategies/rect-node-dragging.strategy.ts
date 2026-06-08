import type { RectNode } from "@lib/boards";
import type { Offset } from "@lib/common";
import type { Decoratable } from "@/board-editor/core";
import { NodeDraggingStrategy } from "@/board-editor/modules/dragging";
import { Geometry } from "@/shared/lib/geometry";

export class RectNodeDraggingStrategy extends NodeDraggingStrategy {
    public override updateNodePosition(node: Decoratable<RectNode>, offset: Offset) {
        const newPoint = Geometry.applyOffset(node.data.rect, offset);

        node.data = {
            ...node.data,
            rect: {
                ...node.data.rect,
                ...newPoint
            }
        };
    }
}
