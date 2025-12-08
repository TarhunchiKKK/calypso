import { describe, test, expect } from "vitest";
import { NodesFactory } from "@/features/board-editor/nodes/compose/nodes-factory";
import { AnyNode } from "@/features/board-editor/nodes/compose/types";
import { Sticker } from "@/features/board-editor/nodes/variants/sticker";

describe("NodesFactory", () => {
    describe("create", () => {
        test("should create a node with given type and properties", () => {
            const nodes = [
                {
                    input: {
                        type: "sticker",
                        id: "node1",
                        x: 100,
                        y: 150,
                        width: 200,
                        height: 100,
                        text: "Sample Sticker"
                    },
                    expectedClass: Sticker
                }
            ];

            for (const { input, expectedClass } of nodes) {
                const node = NodesFactory.create(input as AnyNode);

                expect(node).toBeInstanceOf(expectedClass);
                expect(node.id).toBe(input.id);
            }
        });
    });
});
