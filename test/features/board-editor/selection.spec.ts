import { selectNodes } from "@/features/board-editor/domain/selection";
import { describe, test, expect } from "vitest";

describe("selectNodes", () => {
    test("should replace selection when mode is 'replace'", () => {
        const currentSelection = new Set(["node1", "node2"]);
        const newSelection = selectNodes(["node3", "node4"], "replace", currentSelection);
        expect(newSelection).toEqual(new Set(["node3", "node4"]));
    });

    test("should add nodes to selection when mode is 'add'", () => {
        const currentSelection = new Set(["node1", "node2"]);
        const newSelection = selectNodes(["node2", "node3"], "add", currentSelection);
        expect(newSelection).toEqual(new Set(["node1", "node2", "node3"]));
    });

    test("should toggle nodes in selection when mode is 'toggle'", () => {
        const currentSelection = new Set(["node1", "node2"]);
        const newSelection = selectNodes(["node2", "node3"], "toggle", currentSelection);
        expect(newSelection).toEqual(new Set(["node1", "node3"]));
    });
});
