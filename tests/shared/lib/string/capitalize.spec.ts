import { expect, test } from "vitest";
import { capitalize } from "@/shared/lib/string";

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
        expect(capitalize(data.input)).toEqual(data.output);
    }
});
