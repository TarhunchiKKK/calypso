import { describe, expect, test } from "vitest";
import { formatFontFamilyName } from "@/board-editor/modules/styling/elements/font/constants";

describe("`formatFontFamilyName` function", () => {
    test("formats font family name", () => {
        const dataset = [
            {
                input: "",
                output: ""
            },
            {
                input: "roboto-mono",
                output: "Roboto Mono"
            },
            {
                input: "arial",
                output: "Arial"
            },
            {
                input: "times-new-roman",
                output: "Times New Roman"
            }
        ];

        for (const data of dataset) {
            const result = formatFontFamilyName(data.input);

            expect(result).toEqual(data.output);
        }
    });
});
