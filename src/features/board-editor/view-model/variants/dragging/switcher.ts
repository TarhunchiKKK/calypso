import type { Point } from "@/features/board-editor/core";
import type { DraggingViewState } from "./view-state";

type Params = {
    startPoint: Point;

    selectedIds?: Set<string>;
};

export function switchToDragging({ startPoint, selectedIds }: Params): DraggingViewState {
    return {
        type: "dragging",
        startPoint: startPoint,
        selectedIds: selectedIds ?? new Set()
    };
}
