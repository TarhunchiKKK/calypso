import { describe, expect, test } from "vitest";
import { Geometry } from "@/shared/lib/geometry";

describe("`Geometry` class", () => {
    test("`pointFromEvent` method", () => {
        const dataset = [
            {
                input: { clientX: 10, clientY: 10 },
                output: { x: 10, y: 10 }
            }
        ];

        for (const data of dataset) {
            const result = Geometry.pointFromEvent(data.input);

            expect(result).toStrictEqual(data.output);
        }
    });

    test("`pointsDistance` method", () => {
        const dataset = [
            {
                input: {
                    a: { x: 0, y: 0 },
                    b: { x: 3, y: 4 }
                },
                output: 5
            },
            {
                input: {
                    a: { x: 10, y: 10 },
                    b: { x: 10, y: 10 }
                },
                output: 0
            }
        ];

        for (const data of dataset) {
            const result = Geometry.pointsDistance(data.input.a, data.input.b);

            expect(result).toBe(data.output);
        }
    });

    test("`rectFromPoints` method", () => {
        const dataset = [
            {
                input: {
                    a: { x: 10, y: 10 },
                    b: { x: 30, y: 40 }
                },
                output: { x: 10, y: 10, width: 20, height: 30 }
            },
            {
                input: {
                    a: { x: 30, y: 40 },
                    b: { x: 10, y: 10 }
                },
                output: { x: 10, y: 10, width: 20, height: 30 }
            }
        ];

        for (const data of dataset) {
            const result = Geometry.rectFromPoints(data.input.a, data.input.b);

            expect(result).toStrictEqual(data.output);
        }
    });

    test("`rectsIntersecting` method", () => {
        const dataset = [
            {
                input: {
                    a: { x: 0, y: 0, width: 10, height: 10 },
                    b: { x: 5, y: 5, width: 10, height: 10 }
                },
                output: true
            },
            {
                input: {
                    a: { x: 0, y: 0, width: 10, height: 10 },
                    b: { x: 10, y: 10, width: 10, height: 10 }
                },
                output: true
            },
            {
                input: {
                    a: { x: 0, y: 0, width: 10, height: 10 },
                    b: { x: 11, y: 11, width: 10, height: 10 }
                },
                output: false
            }
        ];

        for (const data of dataset) {
            const result = Geometry.rectsIntersecting(data.input.a, data.input.b);

            expect(result).toBe(data.output);
        }
    });

    test("`calculateOffset` method", () => {
        const dataset = [
            {
                input: {
                    start: { x: 10, y: 10 },
                    end: { x: 25, y: 35 }
                },
                output: { dx: 15, dy: 25 }
            },
            {
                input: {
                    start: { x: 10, y: 10 },
                    end: { x: 10, y: 10 }
                },
                output: { dx: 0, dy: 0 }
            }
        ];

        for (const data of dataset) {
            const result = Geometry.calculateOffset(data.input.start, data.input.end);

            expect(result).toStrictEqual(data.output);
        }
    });

    test("`applyOffset` method", () => {
        const dataset = [
            {
                input: {
                    point: { x: 10, y: 10 },
                    offset: { dx: 5, dy: -5 }
                },
                output: { x: 15, y: 5 }
            },
            {
                input: {
                    point: { x: 10, y: 10 },
                    offset: { dx: 0, dy: 0 }
                },
                output: { x: 10, y: 10 }
            },
            {
                input: {
                    point: { x: 10, y: 10 }
                },
                output: { x: 10, y: 10 }
            }
        ];

        for (const data of dataset) {
            const result = Geometry.applyOffset(data.input.point, data.input.offset);

            expect(result).toStrictEqual(data.output);
        }
    });
});
