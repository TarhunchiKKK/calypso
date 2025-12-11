import { Point } from "@/features/board-editor/domain/geometry";
import { NodesSelectionMode } from "@/features/board-editor/domain/selection";

export type SelectionWindowViewState = {
    type: "selection-window";

    startPoint: Point;

    selectedIds: Set<string>;

    selectionMode: NodesSelectionMode;
};
