import type { Point } from "@/features/board-editor/core";
import type { NodesSelectionMode } from "@/features/board-editor/modules/selection";

export type SelectionWindowViewState = {
    type: "selection-window";

    startPoint: Point;

    selectedIds: Set<string>;

    selectionMode: NodesSelectionMode;
};
