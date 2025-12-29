import { Rect, Point } from "../../lib/geometry/types";
import { ResizeDirection } from "./types";

export function applyResizing(rect: Rect, point: Point, direction: ResizeDirection): Rect {
    const right = rect.x + rect.width;
    const bottom = rect.y + rect.height;

    switch (direction) {
        case "n": {
            const y = Math.min(point.y, bottom);
            const height = Math.max(0, bottom - y);
            return { ...rect, y, height };
        }
        case "s": {
            const height = Math.max(0, point.y - rect.y);
            return { ...rect, height };
        }
        case "w": {
            const x = Math.min(point.x, right);
            const width = Math.max(0, right - x);
            return { ...rect, x, width };
        }
        case "e": {
            const width = Math.max(0, point.x - rect.x);
            return { ...rect, width };
        }
        case "ne": {
            const y = Math.min(point.y, bottom);
            const height = Math.max(0, bottom - y);
            const width = Math.max(0, point.x - rect.x);
            return { ...rect, y, height, width };
        }
        case "nw": {
            const x = Math.min(point.x, right);
            const width = Math.max(0, right - x);
            const y = Math.min(point.y, bottom);
            const height = Math.max(0, bottom - y);
            return { ...rect, x, y, width, height };
        }
        case "se": {
            const width = Math.max(0, point.x - rect.x);
            const height = Math.max(0, point.y - rect.y);
            return { ...rect, width, height };
        }
        case "sw": {
            const x = Math.min(point.x, right);
            const width = Math.max(0, right - x);
            const height = Math.max(0, point.y - rect.y);
            return { ...rect, x, width, height };
        }
        default:
            throw new Error(`Unknown resize direction: ${direction}`);
    }
}
