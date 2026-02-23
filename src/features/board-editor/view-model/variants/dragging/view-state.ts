import type { Point } from "@/shared/lib/geometry";

export type DraggingViewState = {
    type: "dragging";

    selectedIds: Set<string>;

    startPoint: Point;
};
