import { Point } from "@/features/board-editor/lib/geometry";
import { NodesSelectionMode } from "@/features/board-editor/modules/selection";

export type SelectionWindowViewState = {
    type: "selection-window";

    startPoint: Point;

    selectedIds: Set<string>;

    selectionMode: NodesSelectionMode;
};
