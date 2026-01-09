import { Point } from "@/features/board-editor/core";
import { NodesSelectionMode } from "@/features/board-editor/modules/selection";

export type SelectionWindowViewState = {
    type: "selection-window";

    startPoint: Point;

    selectedIds: Set<string>;

    selectionMode: NodesSelectionMode;
};
