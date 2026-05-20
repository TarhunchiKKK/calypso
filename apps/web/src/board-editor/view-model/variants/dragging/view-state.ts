import type { Id, Point } from "@repo/common";

export type DraggingViewState = {
    type: "dragging";

    nodeIds: Set<Id>;

    startPoint: Point;
};
