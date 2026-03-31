import type { NodeWrapper } from "@/board-editor/core";
import { NodeDraggingStrategy } from "@/board-editor/modules/dragging";
import { Geometry } from "@/shared/lib/geometry";
import type { Boards, Offset } from "@repo/common";

export class RectNodeDraggingStrategy extends NodeDraggingStrategy {
    public override updateNodePosition(wrapper: NodeWrapper<Boards.RectNode>, offset: Offset) {
        const newPoint = Geometry.applyOffset(wrapper.rect, offset);

        wrapper.data = {
            ...wrapper.data,
            rect: {
                ...wrapper.data.rect,
                ...newPoint
            }
        };
    }
}
