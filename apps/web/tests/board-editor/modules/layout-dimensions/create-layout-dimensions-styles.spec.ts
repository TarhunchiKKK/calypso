import { describe, expect, test } from "vitest";
import { createLayoutDimensionsStyles } from "@/board-editor/modules/layout-dimensions";

describe("`createLayoutDimensionsStyles` function", () => {
    test("creates styles", () => {
        const dataset = [
            {
                input: {
                    offset: { dx: 10, dy: 20 },
                    zoom: 0.5
                },
                output: {
                    "--x": "-5px",
                    "--y": "-10px",
                    "--zoom": 0.5
                }
            }
        ];

        for (const data of dataset) {
            const result = createLayoutDimensionsStyles(data.input.offset, data.input.zoom);

            expect(result).toStrictEqual(data.output);
        }
    });
});
