import { Geometry } from "@/features/board-editor/domain/geometry";
import { describe, test, expect } from "vitest";

describe("Geometry", () => {
    describe("recalculatePosition", () => {
        test("should return the same point if no canvasRect is provided", () => {
            const point = { x: 10, y: 20 };

            const result = Geometry.recalculatePosition(point);

            expect(result).toEqual(point);
        });

        test("should recalculate point position based on canvasRect", () => {
            const point = { x: 50, y: 70 };
            const canvasRect = { x: 10, y: 20, width: 100, height: 100 };

            const result = Geometry.recalculatePosition(point, canvasRect);

            expect(result).toEqual({ x: 40, y: 50 });
        });
    });

    describe("pointsDistance", () => {
        test("should calculate the distance between two points", () => {
            const pointA = { x: 0, y: 0 };
            const pointB = { x: 3, y: 4 };

            const result = Geometry.pointsDistance(pointA, pointB);

            expect(result).toBe(5);
        });
    });

    describe("rectFromPoints", () => {
        test("should create a rectangle from two points", () => {
            const pointA = { x: 1, y: 1 };
            const pointB = { x: 4, y: 5 };

            const result = Geometry.rectFromPoints(pointA, pointB);

            expect(result).toEqual({ x: 1, y: 1, width: 3, height: 4 });
        });
    });
});
