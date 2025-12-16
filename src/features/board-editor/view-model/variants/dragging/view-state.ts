import { Point } from "@/features/board-editor/domain/geometry";

export type DraggingViewState = {
    type: "dragging";
    selectedIds: Set<string>;
    startPoint: Point;
};
