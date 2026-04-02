import type { NodesSelectionMode } from "@/board-editor/modules/selection";
import type { Id, Point } from "@repo/common";

export type SelectionWindowViewState = {
    type: "selection-window";

    startPoint: Point;

    selectedIds: Set<Id>;

    selectionMode: NodesSelectionMode;
};
