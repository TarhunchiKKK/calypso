import { NodeDraggingStrategy } from "@/board-editor/modules/dragging";
import { Geometry, type Offset } from "@/shared/lib/geometry";
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
