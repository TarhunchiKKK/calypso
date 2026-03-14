import type { Offset, Point, Rect } from "@/shared/lib/geometry";

export class Geometry {
    public static pointFromEvent(e: Pick<React.MouseEvent, "clientX" | "clientY">): Point {
        return { x: e.clientX, y: e.clientY };
    }

    public static pointsDistance(a: Point, b: Point): number {
        return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);
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
}
