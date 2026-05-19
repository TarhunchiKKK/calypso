import type { ShapeSelectionViewState } from "./view-state";

export function switchToShapeSelection(): ShapeSelectionViewState {
    return {
        type: "shape-selection"
    };
}
