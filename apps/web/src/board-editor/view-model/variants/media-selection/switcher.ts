import type { Point } from "@repo/common";
import type { MediaSelectionViewState } from "./view-state";

export function switchToMediaSelection(clickPoint: Point): MediaSelectionViewState {
    return {
        type: "media-selection",
        clickPoint: clickPoint
    };
}
