import type { Id } from "@repo/common";
import type { NodesSelectionMode } from "./types";

export function selectNodes(nodeIds: Id[], mode: NodesSelectionMode, currentSelection: Set<Id>): Set<Id> {
    switch (mode) {
        case "replace": {
            return new Set(nodeIds);
        }
        case "add": {
            const newSelection = new Set(currentSelection);
            nodeIds.forEach(id => void newSelection.add(id));
            return newSelection;
        }
        case "toggle": {
            const newSelection = new Set(currentSelection);
            nodeIds.forEach(id => {
                if (newSelection.has(id)) {
                    newSelection.delete(id);
                } else {
                    newSelection.add(id);
                }
            });
            return newSelection;
        }
    }
}
