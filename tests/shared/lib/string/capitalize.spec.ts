import { describe } from "node:test";
import { expect, test } from "vitest";
import { capitalize } from "@/shared/lib/string";

describe("`capitalize` function", () => {
    test("capitalizes string", () => {
        const dataset = [
            {
                input: "",
                output: ""
            },
            {
                input: "a",
                output: "A"
            },
            {
                input: "word",
                output: "Word"
            },
            {
                input: "two words",
                output: "Two words"
            }
        ];

        for (const data of dataset) {
            const result = capitalize(data.input);

            expect(result).toEqual(data.output);
        }
    });
});
