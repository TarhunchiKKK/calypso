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
}
