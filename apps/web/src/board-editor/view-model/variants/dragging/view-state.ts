import type { Id, Point } from "@lib/common";

export type DraggingViewState = {
    type: "dragging";

    nodeIds: Set<Id>;

    startPoint: Point;
};
