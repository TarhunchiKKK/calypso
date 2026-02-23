import type { Offset, Point, Rect } from "@/shared/lib/geometry";

/**
 * A utility class that provides a collection of static methods for geometric calculations.
 * It is used throughout the board editor to handle operations related to points, rectangles, and transformations.
 * This class centralizes the geometry logic, making it easier to maintain and reuse.
 */
export class Geometry {
    /**
     * Calculates the Euclidean distance between two points.
     * @param a - The first point.
     * @param b - The second point.
     * @returns The distance between the two points.
     */
    public static pointsDistance(a: Point, b: Point): number {
        return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);
    }

    /**
     * Creates a rectangle from two points, which are treated as opposite corners.
     * @param a - The first corner point.
     * @param b - The second corner point.
     * @returns A `Rect` object that encompasses the two points.
     */
    public static rectFromPoints(a: Point, b: Point): Rect {
        const x = Math.min(a.x, b.x);
        const y = Math.min(a.y, b.y);

        const width = Math.abs(b.x - a.x);
        const height = Math.abs(b.y - a.y);

        return { x, y, width, height };
    }

    /**
     * Checks if two rectangles are intersecting.
     * @param a - The first rectangle.
     * @param b - The second rectangle.
     * @returns `true` if the rectangles intersect, `false` otherwise.
     */
    public static rectsIntersecting(a: Rect, b: Rect): boolean {
        return !(a.x > b.x + b.width || a.x + a.width < b.x || a.y > b.y + b.height || a.y + a.height < b.y);
    }

    /**
     * Calculates the offset (dx, dy) between a start and an end point.
     * @param start - The starting point.
     * @param end - The ending point.
     * @returns An `Offset` object representing the change in x and y.
     */
    public static calculateOffset(start: Point, end: Point): Offset {
        return {
            dx: end.x - start.x,
            dy: end.y - start.y
        };
    }

    /**
     * Applies an offset to a point, returning a new point with the updated coordinates.
     * @param point - The original point.
     * @param offset - The offset to apply.
     * @returns A new point with the offset applied.
     */
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
