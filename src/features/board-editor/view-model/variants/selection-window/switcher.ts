import { Point } from "@/features/board-editor/core";
import { NodesSelectionMode } from "@/features/board-editor/modules/selection";
import { SelectionWindowViewState } from "./view-state";

type Params = {
    selectedIds?: Set<string>;

    startPoint: Point;

    selectionMode: NodesSelectionMode;
};

export function switchToSelectionWindow({ selectedIds, startPoint, selectionMode }: Params): SelectionWindowViewState {
    return {
        type: "selection-window",
        startPoint: startPoint,
        selectedIds: selectedIds ?? new Set(),
        selectionMode: selectionMode
    };
}
