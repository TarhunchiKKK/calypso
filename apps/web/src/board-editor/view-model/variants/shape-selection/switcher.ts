import type { Point } from "@repo/common";
import type { ShapeSelectionViewState } from "./view-state";

export function switchToShapeSelection(clickPoint: Point): ShapeSelectionViewState {
    return {
        type: "shape-selection",
        clickPoint: clickPoint
    };
}
