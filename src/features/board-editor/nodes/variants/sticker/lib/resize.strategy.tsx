import { getNodeId } from "@/features/board-editor/core";
import { ResizeBorders, ResizeDirection, ResizeStrategy } from "@/features/board-editor/modules/resizing";
import React from "react";

export class StickerNodeResizeStrategy extends ResizeStrategy {
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
