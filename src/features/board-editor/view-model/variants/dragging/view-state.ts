import { Point } from "@/features/board-editor/core";

export type DraggingViewState = {
    type: "dragging";

    selectedIds: Set<string>;

    startPoint: Point;
};
