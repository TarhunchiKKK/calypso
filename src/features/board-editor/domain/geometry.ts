import { ResizeDirection } from "./dom";

export type Point = {
    x: number;

    y: number;
};

export type Rect = {
    x: number;

    y: number;

    width: number;

    height: number;
};

export type Offset = {
    dx: number;

    dy: number;
};

export class Geometry {
    public static recalculatePosition(point: Point, canvasRect?: Rect): Point {
        if (!canvasRect) {
            return point;
        }

        return {
            x: point.x - canvasRect.x,
            y: point.y - canvasRect.y
        };
    }

    public static pointsDistance(a: Point, b: Point): number {
        return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
    }

    public static rectFromPoints(a: Point, b: Point): Rect {
        const x = Math.min(a.x, b.x);
        const y = Math.min(a.y, b.y);
        const width = Math.abs(b.x - a.x);
        const height = Math.abs(b.y - a.y);

        return { x, y, width, height };
    }

    public static rectsIntersecting(a: Rect, b: Rect): boolean {
        return !(a.x > b.x + b.width || a.x + a.width < b.x || a.y > b.y + b.height || a.y + a.height < b.y);
    }

    public static calculateOffset(start: Point, end: Point): Offset {
        return {
            dx: end.x - start.x,
            dy: end.y - start.y
        };
    }

    public static applyOffset(point: Point, offset?: Offset): Point {
        if (!offset) {
            return point;
        }

        return {
            x: point.x + offset.dx,
            y: point.y + offset.dy
        };
    }

    public static applyResizing(rect: Rect, point: Point, direction: ResizeDirection): Rect {
        const right = rect.x + rect.width;
        const bottom = rect.y + rect.height;

        switch (direction) {
            case "e": {
                const width = Math.max(0, point.x - rect.x);
                return { ...rect, width };
            }
            case "w": {
                const x = Math.min(point.x, right);
                const width = Math.max(0, right - x);
                return { ...rect, x, width };
            }
            case "s": {
                const height = Math.max(0, point.y - rect.y);
                return { ...rect, height };
            }
            case "n": {
                const y = Math.min(point.y, bottom);
                const height = Math.max(0, bottom - y);
                return { ...rect, y, height };
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
}
