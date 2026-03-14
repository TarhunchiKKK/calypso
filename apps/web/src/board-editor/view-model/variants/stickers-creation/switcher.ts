import type { StickersCreationViewState } from "./view-state";

export function switchToStickersCreation(): StickersCreationViewState {
    return {
        type: "stickers-creation"
    };
}
