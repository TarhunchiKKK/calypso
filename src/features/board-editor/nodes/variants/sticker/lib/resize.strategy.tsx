import { ResizeBorders, ResizeDirection, ResizeStrategy } from "@/features/board-editor/modules/resizing";
import React from "react";

export class StickerNodeResizeStrategy extends ResizeStrategy {
    public ui() {
        const resizeHandler = (direction: ResizeDirection, e: React.MouseEvent) => {
            e.stopPropagation();
            this.handler(this.nodeId, direction);
        };

        return <ResizeBorders main cross diagonal handleResizeStart={resizeHandler} />;
    }
}
