import type { Id, Point } from "@repo/common";
import type { NodesSelectionMode } from "@/board-editor/modules/selection";

export type SelectionWindowViewState = {
    type: "selection-window";

    startPoint: Point;

    nodeIds: Set<Id>;

    mode: NodesSelectionMode;
};
