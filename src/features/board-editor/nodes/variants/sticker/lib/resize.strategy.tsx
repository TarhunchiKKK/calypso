import { getNodeId, type Rect } from "@/features/board-editor/core";
import { ResizeBorders, type ResizeDirection, ResizeStrategy } from "@/features/board-editor/modules/resizing";
import type React from "react";
import type { StickerNodeWrapper } from "../wrapper";

export class StickerNodeResizeStrategy extends ResizeStrategy {
    public override updateNode(wrapper: StickerNodeWrapper, size: Rect): void {
        wrapper.data = { ...wrapper.data, rect: size };
    }

    public override ui() {
        const onResizeStart = (direction: ResizeDirection, e: React.MouseEvent) => {
            e.stopPropagation();

            const nodeId = getNodeId(e);

            if (!nodeId) {
                throw new Error("Node id not found");
            }

            this.handler?.(nodeId, direction);
        };

        return <ResizeBorders main cross diagonal onResizeStart={onResizeStart} />;
    }
}
