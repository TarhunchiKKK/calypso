import type { MediaSelectionViewState } from "./view-state";

export function switchToMediaSelection(): MediaSelectionViewState {
    return {
        type: "media-selection"
    };
}
