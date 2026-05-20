import { describe, expect, test } from "vitest";
import type { NodesSelectionMode } from "@/board-editor/modules/selection";
import { selectNodes } from "@/board-editor/modules/selection";

describe("`selectNodes` function", () => {
    test("selects nodes", () => {
        const dataset: {
            input: { nodeIds: string[]; mode: NodesSelectionMode; currentSelection: Set<string> };
            output: Set<string>;
        }[] = [
            {
                input: {
                    nodeIds: ["2", "3"],
                    mode: "replace",
                    currentSelection: new Set(["1", "2"])
                },
                output: new Set(["2", "3"])
            },
            {
                input: {
                    nodeIds: ["1"],
                    mode: "replace",
                    currentSelection: new Set()
                },
                output: new Set(["1"])
            },
            {
                input: {
                    nodeIds: ["2", "3"],
                    mode: "add",
                    currentSelection: new Set(["1"])
                },
                output: new Set(["1", "2", "3"])
            },
            {
                input: {
                    nodeIds: ["1", "2"],
                    mode: "add",
                    currentSelection: new Set(["1", "3"])
                },
                output: new Set(["1", "2", "3"])
            },
            {
                input: {
                    nodeIds: ["1"],
                    mode: "add",
                    currentSelection: new Set()
                },
                output: new Set(["1"])
            },
            {
                input: {
                    nodeIds: ["1", "2"],
                    mode: "toggle",
                    currentSelection: new Set(["1", "3"])
                },
                output: new Set(["2", "3"])
            },
            {
                input: {
                    nodeIds: ["1"],
                    mode: "toggle",
                    currentSelection: new Set(["1"])
                },
                output: new Set([])
            },
            {
                input: {
                    nodeIds: ["2"],
                    mode: "toggle",
                    currentSelection: new Set(["1"])
                },
                output: new Set(["1", "2"])
            }
        ];
        for (const data of dataset) {
            const result = selectNodes(data.input.nodeIds, data.input.mode, data.input.currentSelection);

            expect(result).toStrictEqual(data.output);
        }
    });
});
