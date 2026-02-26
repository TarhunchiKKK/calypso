import { describe, expect, test } from "vitest";
import { HotKeyUtils } from "@/shared/lib/hot-keys";

describe("`HotKeyUtils` class", () => {
    test("`is` method", () => {
        const dataset = [
            {
                // equal ht keys
                input: {
                    hotKey: { key: "s", shiftKey: false, ctrlKey: false },
                    another: { key: "s", shiftKey: false, ctrlKey: false }
                },
                output: true
            },
            {
                // `another` hot key is in `hotKey` array
                input: {
                    hotKey: [
                        { key: "s", shiftKey: false, ctrlKey: true },
                        { key: "s", shiftKey: false, ctrlKey: false }
                    ],
                    another: { key: "s", shiftKey: false, ctrlKey: false }
                },
                output: true
            },
            {
                // `key` field differs
                input: {
                    hotKey: { key: "s", shiftKey: false, ctrlKey: false },
                    another: { key: "e", shiftKey: false, ctrlKey: false }
                },
                output: false
            },
            {
                // `shiftKey` field differs
                input: {
                    hotKey: { key: "s", shiftKey: false, ctrlKey: false },
                    another: { key: "s", shiftKey: true, ctrlKey: false }
                },
                output: false
            },
            {
                // `ctrlKey` field differs
                input: {
                    hotKey: { key: "s", shiftKey: false, ctrlKey: false },
                    another: { key: "s", shiftKey: false, ctrlKey: true }
                },
                output: false
            }
        ];

        for (const data of dataset) {
            const result = HotKeyUtils.is(data.input.hotKey, data.input.another);

            expect(result).toEqual(data.output);
        }
    });

    test("`stringify` method", () => {
        const dataset = [
            {
                input: { key: "s", shiftKey: true, ctrlKey: true },
                output: "Ctrl+Shift+S"
            },
            {
                input: { key: "s", shiftKey: false, ctrlKey: true },
                output: "Ctrl+S"
            },
            {
                input: { key: "s", shiftKey: true, ctrlKey: false },
                output: "Shift+S"
            },
            {
                input: { key: "s", shiftKey: false, ctrlKey: false },
                output: "S"
            }
        ];

        for (const data of dataset) {
            const result = HotKeyUtils.stringify(data.input);

            expect(result).toEqual(data.output);
        }
    });
});
