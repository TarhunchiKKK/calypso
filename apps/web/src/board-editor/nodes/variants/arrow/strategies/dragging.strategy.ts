import type { Offset } from "@repo/common";
import type { Decoratable } from "@/board-editor/core";
import type { ResolvedArrow } from "@/board-editor/modules/arrows-resolution";
import { NodeDraggingStrategy } from "@/board-editor/modules/dragging";
import { NodeWrappersFactory } from "@/board-editor/nodes/compose/lib/node-wrappers.factory";
import { Geometry } from "@/shared/lib/geometry";

export class ArrowDraggingStrategy extends NodeDraggingStrategy {
    public override updateNodePosition(node: Decoratable<ResolvedArrow>, offset: Offset) {
        if (node.data.start.relativeTo || node.data.end.relativeTo) {
            return;
        }

        if (!NodeWrappersFactory.is(node.wrapper, "arrow")) {
            throw new Error(`Wrapper for node with id=${node.id} is not instance of ArrowNodeWrapper`);
        }

        const newPosition = {
            start: Geometry.applyOffset(node.data.start, offset),
            end: Geometry.applyOffset(node.data.end, offset)
        };

        node.data = {
            ...node.data,
            absolutePosition: newPosition
        };
    }
}
