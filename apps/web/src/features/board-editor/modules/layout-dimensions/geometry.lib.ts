import type { Offset, Point } from "@/features/board-editor/core";

export function applyLayoutDimensions(point: Point, offset: Offset, zoom: number) {
    return {
        x: point.x / zoom + offset.dx,
        y: point.y / zoom + offset.dy
    };
}
