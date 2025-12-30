import { Offset, Point, Rect } from "../../../lib/geometry";

export function applyLayoutShift(point: Point, canvasRect?: Rect): Point {
    if (!canvasRect) {
        return point;
    }

    return {
        x: point.x - canvasRect.x,
        y: point.y - canvasRect.y
    };
}

export function applyLayoutDimensions(point: Point, canvasRect: Rect | undefined, windowShift: Offset, zoom: number) {
    if (!canvasRect) {
        return point;
    }

    return {
        x: (point.x - canvasRect.x) / zoom + windowShift.dx,
        y: (point.y - canvasRect.y) / zoom + windowShift.dy
    };
}
