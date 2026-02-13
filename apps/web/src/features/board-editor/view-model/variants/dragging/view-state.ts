import type { Point } from "@repo/common";

export type DraggingViewState = {
    type: "dragging";

    selectedIds: Set<string>;

    startPoint: Point;
};
