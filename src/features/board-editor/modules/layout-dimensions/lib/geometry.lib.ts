import { Point, Rect, Offset } from "@/features/board-editor/core";

export function applyLayoutDimensions(point: Point, canvasRect: Rect | undefined, offset: Offset, zoom: number) {
    if (!canvasRect) {
        return point;
    }

    return {
        x: (point.x - canvasRect.x) / zoom + offset.dx,
        y: (point.y - canvasRect.y) / zoom + offset.dy
    };
}
