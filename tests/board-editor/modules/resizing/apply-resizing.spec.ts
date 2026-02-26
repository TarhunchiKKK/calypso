import { describe, expect, test } from "vitest";
import type { ResizeDirection } from "@/board-editor/modules/resizing";
import { applyResizing } from "@/board-editor/modules/resizing";
import type { Rect } from "@/shared/lib/geometry";

describe("`applyResizing` function", () => {
    test("applies resizing for rectangle", () => {
        const dataset: {
            input: { rect: Rect; point: { x: number; y: number }; direction: ResizeDirection };
            output: Rect;
        }[] = [
            {
                input: {
                    rect: { x: 10, y: 10, width: 20, height: 30 },
                    point: { x: 15, y: 5 },
                    direction: "n"
                },
                output: { x: 10, y: 5, width: 20, height: 35 }
            },
            {
                input: {
                    rect: { x: 10, y: 10, width: 20, height: 30 },
                    point: { x: 15, y: 20 },
                    direction: "n"
                },
                output: { x: 10, y: 20, width: 20, height: 20 }
            },
            {
                input: {
                    rect: { x: 10, y: 10, width: 20, height: 30 },
                    point: { x: 15, y: 50 },
                    direction: "s"
                },
                output: { x: 10, y: 10, width: 20, height: 40 }
            },
            {
                input: {
                    rect: { x: 10, y: 10, width: 20, height: 30 },
                    point: { x: 15, y: 20 },
                    direction: "s"
                },
                output: { x: 10, y: 10, width: 20, height: 10 }
            },
            {
                input: {
                    rect: { x: 10, y: 10, width: 20, height: 30 },
                    point: { x: 5, y: 15 },
                    direction: "w"
                },
                output: { x: 5, y: 10, width: 25, height: 30 }
            },
            {
                input: {
                    rect: { x: 10, y: 10, width: 20, height: 30 },
                    point: { x: 20, y: 15 },
                    direction: "w"
                },
                output: { x: 20, y: 10, width: 10, height: 30 }
            },
            {
                input: {
                    rect: { x: 10, y: 10, width: 20, height: 30 },
                    point: { x: 40, y: 15 },
                    direction: "e"
                },
                output: { x: 10, y: 10, width: 30, height: 30 }
            },
            {
                input: {
                    rect: { x: 10, y: 10, width: 20, height: 30 },
                    point: { x: 20, y: 15 },
                    direction: "e"
                },
                output: { x: 10, y: 10, width: 10, height: 30 }
            },
            {
                input: {
                    rect: { x: 10, y: 10, width: 20, height: 30 },
                    point: { x: 40, y: 5 },
                    direction: "ne"
                },
                output: { x: 10, y: 5, width: 30, height: 35 }
            },
            {
                input: {
                    rect: { x: 10, y: 10, width: 20, height: 30 },
                    point: { x: 20, y: 20 },
                    direction: "ne"
                },
                output: { x: 10, y: 20, width: 10, height: 20 }
            }
        ];

        for (const data of dataset) {
            const result = applyResizing(data.input.rect, data.input.point, data.input.direction);

            expect(result).toStrictEqual(data.output);
        }
    });
});
