import { Point } from "./point";
import { Rect } from "./rect";

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
}
