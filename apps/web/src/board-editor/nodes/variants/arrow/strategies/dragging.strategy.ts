import type { ArrowNode } from "@lib/boards";
import type { Offset } from "@lib/common";
import type { Decoratable } from "@/board-editor/core";
import { NodeDraggingStrategy } from "@/board-editor/modules/dragging";
import { Geometry } from "@/shared/lib/geometry";

export class ArrowDraggingStrategy extends NodeDraggingStrategy {
    public override updateNodePosition(node: Decoratable<ArrowNode>, offset: Offset) {
        if (node.data.start.relativeTo || node.data.end.relativeTo) {
            return;
        }

        const newPosition = {
            start: Geometry.applyOffset(node.data.start, offset),
            end: Geometry.applyOffset(node.data.end, offset)
        };

        node.data = {
            ...node.data,
            ...newPosition
        };
    }
}
