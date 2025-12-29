import { Point } from "@/features/board-editor/lib/geometry";

export type DraggingViewState = {
    type: "dragging";
    selectedIds: Set<string>;
    startPoint: Point;
};
