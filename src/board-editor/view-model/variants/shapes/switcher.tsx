import type { ShapesViewState } from "./view-state";

export function switchToShapes(): ShapesViewState {
    return {
        type: "shapes"
    };
}
