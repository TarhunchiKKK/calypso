import type { Point } from "@/features/board-editor/core";
import type { NodesSelectionMode } from "@/features/board-editor/modules/selection";
import type { SelectionWindowViewState } from "./view-state";

type Params = {
    selectedIds: Set<string>;

    startPoint: Point;

    selectionMode: NodesSelectionMode;
};

export function switchToSelectionWindow({ selectedIds, startPoint, selectionMode }: Params): SelectionWindowViewState {
    return {
        type: "selection-window",
        startPoint: startPoint,
        selectedIds: selectionMode === "replace" ? new Set() : selectedIds,
        selectionMode: selectionMode
    };
}
