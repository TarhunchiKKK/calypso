import type { NodesSelectionMode } from "@/board-editor/modules/selection";
import type { Point } from "@/shared/lib/geometry";

export type SelectionWindowViewState = {
    type: "selection-window";

    startPoint: Point;

    selectedIds: Set<string>;

    selectionMode: NodesSelectionMode;
};
