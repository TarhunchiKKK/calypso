import type { Point } from "@/shared/lib/geometry";
import type { ShapeSelectionViewState } from "./view-state";

export function switchTo(clickPoint: Point): ShapeSelectionViewState {
    return {
        type: "shape-selection",
        clickPoint: clickPoint
    };
}
