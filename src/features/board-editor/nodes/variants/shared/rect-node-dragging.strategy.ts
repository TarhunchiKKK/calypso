import { Geometry, type Offset } from "@/features/board-editor/core";
import { NodeDraggingStrategy } from "@/features/board-editor/modules/dragging";
import type { StickerNodeWrapper } from "../sticker/sticker.wrapper";

export class RectNodeDraggingStrategy extends NodeDraggingStrategy {
    public override updateNodePosition(wrapper: StickerNodeWrapper, offset: Offset) {
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
