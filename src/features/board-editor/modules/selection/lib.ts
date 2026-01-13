import type { NodesSelectionMode } from "./types";

export function selectNodes(nodeIds: string[], mode: NodesSelectionMode, currentSelection: Set<string>): Set<string> {
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
