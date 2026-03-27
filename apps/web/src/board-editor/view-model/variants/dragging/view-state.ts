import type { Id, Point } from "@repo/common";

export type DraggingViewState = {
    type: "dragging";

    selectedIds: Set<Id>;

    startPoint: Point;
};
