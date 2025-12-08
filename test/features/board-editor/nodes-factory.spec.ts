import { describe, test, expect } from "vitest";
import { NodesFactory } from "@/features/board-editor/nodes/compose/nodes-factory";
import { AnyNode } from "@/features/board-editor/nodes/compose/types";
import { Sticker } from "@/features/board-editor/nodes/variants/sticker";

describe("NodesFactory", () => {
    describe("create", () => {
        test("should create a node with given type and properties", () => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const nodes: { input: AnyNode; expectedClass: new (...args: any[]) => object }[] = [
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

    describe("sticker", () => {
        test("should create a sticker node with correct properties", () => {
            const inputNode: AnyNode = {
                type: "sticker",
                id: "sticker1",
                x: 50,
                y: 75,
                width: 150,
                height: 80,
                text: "Hello Sticker"
            };

            const node = NodesFactory.create(inputNode);

            expect(node).toBeInstanceOf(Sticker);
            expect(node.id).toBe(inputNode.id);
        });
    });
});
