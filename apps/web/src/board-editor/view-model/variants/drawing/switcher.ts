import type { DrawingViewState } from "./view-state";

export function switchToDrawing(): DrawingViewState {
    return {
        type: "drawing"
    };
}
